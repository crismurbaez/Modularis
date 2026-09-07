import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../shared/components/table/table.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { IconComponent } from '../../../shared/icons/lucide-icon.component';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule, TableComponent, BadgeComponent, ButtonComponent, IconComponent],
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {
  columns = [
    { key: 'username', label: 'Usuario' },
    { key: 'nombreCompleto', label: 'Nombre y Apellido' },
    { key: 'rol', label: 'Rol Asignado' },
    { key: 'estado', label: 'Estado' },
    { key: 'acciones', label: 'Acciones' }
  ];

  usuarios = [
    { id: 1, username: 'jperez', nombreCompleto: 'Juan Pérez', rol: 'Admin', estado: 'Activo' },
    { id: 2, username: 'mgomez', nombreCompleto: 'María Gómez', rol: 'Directivo', estado: 'Activo' },
    { id: 3, username: 'clopez', nombreCompleto: 'Carlos López', rol: 'Docente', estado: 'Inactivo' }
  ];

  ngOnInit(): void {}
}
