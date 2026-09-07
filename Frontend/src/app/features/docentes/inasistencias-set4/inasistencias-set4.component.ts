import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../shared/components/table/table.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-inasistencias-set4',
  standalone: true,
  imports: [CommonModule, TableComponent, ButtonComponent],
  templateUrl: './inasistencias-set4.component.html',
  styleUrls: ['./inasistencias-set4.component.css']
})
export class InasistenciasSet4Component implements OnInit {
  columns = [
    { key: 'docente', label: 'Docente' },
    { key: 'enfermedad', label: 'Enfermedad' },
    { key: 'privadas', label: 'Causas Privadas' },
    { key: 'injustificadas', label: 'Injustificadas' },
    { key: 'total', label: 'Total Inasistencias' }
  ];

  datos = [
    { id: 1, docente: 'Gómez, María', enfermedad: 2, privadas: 0, injustificadas: 0, total: 2 },
    { id: 2, docente: 'Pérez, Juan', enfermedad: 0, privadas: 1, injustificadas: 1, total: 2 },
    { id: 3, docente: 'López, Carlos', enfermedad: 5, privadas: 0, injustificadas: 0, total: 5 }
  ];

  ngOnInit(): void {}
}
