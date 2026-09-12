import { Routes } from '@angular/router';
import { DocenteFormComponent } from './docente-form/docente-form.component';
import { DesignacionesComponent } from './designaciones/designaciones.component';
import { InasistenciasSet4Component } from './inasistencias-set4/inasistencias-set4.component';

export const DOCENTES_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'alta',
    pathMatch: 'full'
  },
  {
    path: 'alta',
    component: DocenteFormComponent
  },
  {
    path: 'designaciones',
    component: DesignacionesComponent
  },
  {
    path: 'inasistencias',
    component: InasistenciasSet4Component
  }
];
