import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-designaciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, ButtonComponent, InputComponent],
  templateUrl: './designaciones.component.html',
  styleUrls: ['./designaciones.component.css']
})
export class DesignacionesComponent implements OnInit, OnDestroy {
  designacionForm!: FormGroup;
  sub!: Subscription;
  showCuilReemplazado: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.designacionForm = this.fb.group({
      profesor: ['', Validators.required],
      materia_cupof: ['', Validators.required],
      situacion_revista: ['Titular', Validators.required],
      cuil_reemplazado: ['']
    });

    this.sub = this.designacionForm.get('situacion_revista')!.valueChanges.subscribe(val => {
      this.showCuilReemplazado = val === 'Suplente';
      
      const cuilCtrl = this.designacionForm.get('cuil_reemplazado');
      if (this.showCuilReemplazado) {
        cuilCtrl?.setValidators([Validators.required, Validators.pattern('^[0-9]{11}$')]);
      } else {
        cuilCtrl?.clearValidators();
        cuilCtrl?.setValue('');
      }
      cuilCtrl?.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  guardar() {
    if (this.designacionForm.valid) {
      console.log('Designación guardada', this.designacionForm.value);
    } else {
      this.designacionForm.markAllAsTouched();
    }
  }
}
