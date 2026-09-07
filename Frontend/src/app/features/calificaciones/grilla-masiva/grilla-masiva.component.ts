import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotaCeldaComponent } from '../components/nota-celda/nota-celda.component';
import { AlumnoCardMobileComponent } from '../components/alumno-card-mobile/alumno-card-mobile.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-grilla-masiva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotaCeldaComponent, AlumnoCardMobileComponent, ButtonComponent],
  templateUrl: './grilla-masiva.component.html',
  styleUrls: ['./grilla-masiva.component.css']
})
export class GrillaMasivaComponent implements OnInit {
  grillaForm!: FormGroup;
  expandedRowIndex: number = -1;

  // Mock data for UI demonstration
  alumnos = [
    { id: 1, nombre: 'Pérez, Juan', nota1: '7', faltas1: 2, nota2: '', faltas2: 0 },
    { id: 2, nombre: 'Gómez, María', nota1: '9', faltas1: 0, nota2: '', faltas2: 0 },
    { id: 3, nombre: 'López, Carlos', nota1: '2', faltas1: 5, nota2: '', faltas2: 0 }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.grillaForm = this.fb.group({
      filas: this.fb.array(this.alumnos.map(a => this.crearFila(a)))
    });
  }

  get filas() {
    return this.grillaForm.get('filas') as FormArray;
  }

  crearFila(alumno: any): FormGroup {
    return this.fb.group({
      id: [alumno.id],
      nombre: [alumno.nombre],
      // Validación: entre 1 y 10, o el texto "S/CALIFICAR"
      nota_cuat1: [alumno.nota1, [Validators.pattern('^([1-9]|10|S/CALIFICAR)$')]],
      faltas_cuat1: [alumno.faltas1, [Validators.min(0)]],
      nota_cuat2: [alumno.nota2, [Validators.pattern('^([1-9]|10|S/CALIFICAR)$')]],
      faltas_cuat2: [alumno.faltas2, [Validators.min(0)]]
    });
  }

  toggleRow(index: number) {
    if (this.expandedRowIndex === index) {
      this.expandedRowIndex = -1;
    } else {
      this.expandedRowIndex = index;
    }
  }

  guardar() {
    if (this.grillaForm.valid) {
      console.log('Guardando planilla...', this.grillaForm.value);
    } else {
      this.grillaForm.markAllAsTouched();
    }
  }
}
