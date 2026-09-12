import { Routes } from '@angular/router';
import { MateriasCupofComponent } from './materias-cupof/materias-cupof.component';

export const ACADEMICO_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'materias',
    pathMatch: 'full'
  },
  {
    path: 'materias',
    component: MateriasCupofComponent
  }
];
