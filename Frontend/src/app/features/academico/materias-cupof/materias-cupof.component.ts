import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
  selector: 'app-materias-cupof',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, ButtonComponent, InputComponent, TableComponent],
  templateUrl: './materias-cupof.component.html',
  styleUrls: ['./materias-cupof.component.css']
})
export class MateriasCupofComponent implements OnInit {
  materiaForm!: FormGroup;

  columns = [
    { key: 'nombre', label: 'Materia' },
    { key: 'pid', label: 'Código PID' },
    { key: 'orientacion', label: 'Orientación' },
    { key: 'cupof', label: 'CUPOF' }
  ];

  materiasList = [
    { id: 1, nombre: 'Matemática', pid: 'MAT3', orientacion: 'Común', cupof: '321654' },
    { id: 2, nombre: 'Informática Aplicada', pid: 'INF2', orientacion: 'Informática', cupof: '987456' },
    { id: 3, nombre: 'Sociología', pid: 'SOC1', orientacion: 'Ciencias Sociales', cupof: '456123' }
  ];

  orientaciones = [
    'Común',
    'Ciencias Sociales',
    'Economía y Administración',
    'Informática',
    'Agro y Ambiente',
    'Ciencias Naturales'
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.materiaForm = this.fb.group({
      nombre: ['', Validators.required],
      pid: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{3,5}$')]],
      orientacion: ['Común', Validators.required],
      cupof: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  guardar() {
    if (this.materiaForm.valid) {
      console.log('Guardando materia/CUPOF...', this.materiaForm.value);
      this.materiasList = [...this.materiasList, { id: Date.now(), ...this.materiaForm.value }];
      this.materiaForm.reset({ orientacion: 'Común' });
    } else {
      this.materiaForm.markAllAsTouched();
    }
  }
}
