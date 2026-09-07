import { Injectable, computed } from '@angular/core';
import { AuthService } from './auth.service';

// Tipos de roles (ajustables según la Base de Datos)
export enum RoleType {
  ADMIN = 1,
  DIRECTIVO = 2,
  PRECEPTOR = 3,
  DOCENTE = 4
}

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  
  constructor(private authService: AuthService) {}

  // Signal computado que reacciona a los cambios en AuthService
  readonly userRole = computed(() => this.authService.user()?.id_rol || null);

  readonly canEditGrades = computed(() => {
    const role = this.userRole();
    return role === RoleType.DOCENTE || role === RoleType.PRECEPTOR || role === RoleType.ADMIN;
  });

  readonly canManageUsers = computed(() => {
    const role = this.userRole();
    return role === RoleType.ADMIN;
  });

  readonly canPrintReports = computed(() => {
    const role = this.userRole();
    return role === RoleType.DIRECTIVO || role === RoleType.PRECEPTOR || role === RoleType.ADMIN;
  });

  hasRole(allowedRoles: RoleType[]): boolean {
    const role = this.userRole();
    if (!role) return false;
    return allowedRoles.includes(role);
  }
}
