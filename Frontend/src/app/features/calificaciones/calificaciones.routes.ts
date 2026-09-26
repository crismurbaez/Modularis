import { Routes } from '@angular/router';
import { GrillaMasivaComponent } from './grilla-masiva/grilla-masiva.component';
import { unsavedChangesGuard } from '../../core/guards/unsaved-changes.guard';

export const CALIFICACIONES_ROUTES: Routes = [
  {
    path: '',
    component: GrillaMasivaComponent,
    canDeactivate: [unsavedChangesGuard]
  }
];
