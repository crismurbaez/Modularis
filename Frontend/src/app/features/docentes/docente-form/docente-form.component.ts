import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';

// Simulated Async Validator for @abc.gob.ar
export function abcEmailValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = control.value;
    if (!value) return of(null);
    
    // Simulate network delay
    return of(value).pipe(
      delay(500),
      map(email => {
        return email.endsWith('@abc.gob.ar') ? null : { invalidAbcDomain: true };
      })
    );
  };
}

@Component({
  selector: 'app-docente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, ButtonComponent, InputComponent],
  templateUrl: './docente-form.component.html',
  styleUrls: ['./docente-form.component.css']
})
export class DocenteFormComponent implements OnInit {
  docenteForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.docenteForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{7,8}$')]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cuil: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      mail_abc: ['', [Validators.required, Validators.email], [abcEmailValidator()]],
      telefono: ['']
    });
  }

  get f() {
    return this.docenteForm.controls;
  }

  guardar() {
    if (this.docenteForm.valid) {
      console.log('Guardando docente...', this.docenteForm.value);
    } else {
      this.docenteForm.markAllAsTouched();
    }
  }
}
