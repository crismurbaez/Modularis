import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-roles-matriz',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './roles-matriz.component.html',
  styleUrls: ['./roles-matriz.component.css']
})
export class RolesMatrizComponent implements OnInit {
  roles = ['Admin', 'Directivo', 'Preceptor', 'Docente'];
  
  permisos = [
    { id: 'p1', modulo: 'Calificaciones', nombre: 'Ver Grillas', valores: { 'Admin': true, 'Directivo': true, 'Preceptor': true, 'Docente': true } },
    { id: 'p2', modulo: 'Calificaciones', nombre: 'Cargar Notas', valores: { 'Admin': true, 'Directivo': false, 'Preceptor': true, 'Docente': true } },
    { id: 'p3', modulo: 'Documentos', nombre: 'Imprimir Analítico', valores: { 'Admin': true, 'Directivo': true, 'Preceptor': true, 'Docente': false } },
    { id: 'p4', modulo: 'Seguridad', nombre: 'Gestionar Usuarios', valores: { 'Admin': true, 'Directivo': false, 'Preceptor': false, 'Docente': false } }
  ];

  ngOnInit(): void {}

  togglePermiso(permisoId: string, rol: string) {
    const permiso = this.permisos.find(p => p.id === permisoId);
    if (permiso) {
      // @ts-ignore
      permiso.valores[rol] = !permiso.valores[rol];
    }
  }

  guardarMatriz() {
    console.log('Guardando matriz de roles...', this.permisos);
  }
}
