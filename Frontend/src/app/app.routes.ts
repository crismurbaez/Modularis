import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // En el futuro, configuraremos AuthGuard en estas rutas
      {
        path: 'calificaciones',
        loadChildren: () => import('./features/calificaciones/calificaciones.routes').then(m => m.CALIFICACIONES_ROUTES)
      },
      {
        path: 'docentes',
        loadChildren: () => import('./features/docentes/docentes.routes').then(m => m.DOCENTES_ROUTES)
      },
      {
        path: 'reportes',
        loadChildren: () => import('./features/reportes/reportes.routes').then(m => m.REPORTES_ROUTES)
      },
      {
        path: 'seguridad',
        loadChildren: () => import('./features/seguridad/seguridad.routes').then(m => m.SEGURIDAD_ROUTES)
      },
      {
        path: 'academico',
        loadChildren: () => import('./features/academico/academico.routes').then(m => m.ACADEMICO_ROUTES)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '' // temporalmente, luego redirigiremos a dashboard o login
  }
];
