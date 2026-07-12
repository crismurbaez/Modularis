import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
// El decorador permite asignar uno o varios códigos de permisos a una ruta
export const RequirePermissions = (...permissions: string[]) => SetMetadata(PERMISSIONS_KEY, permissions);
