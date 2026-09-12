import { Routes } from '@angular/router';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { RolesMatrizComponent } from './roles-matriz/roles-matriz.component';

export const SEGURIDAD_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full'
  },
  {
    path: 'usuarios',
    component: UsuariosListComponent
  },
  {
    path: 'roles',
    component: RolesMatrizComponent
  }
];
