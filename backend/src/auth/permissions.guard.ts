import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true; // No requiere permisos específicos
    }

    const { user } = context.switchToHttp().getRequest();
    
    // Si no hay usuario en el request (ej. olvidó poner el AuthGuard antes), denegar.
    if (!user || !user.permisos) {
      throw new ForbiddenException('Permisos insuficientes o no definidos');
    }

    // El permiso ACCESO_TOTAL (típico del Director) saltea cualquier validación
    if (user.permisos.includes('ACCESO_TOTAL')) {
      return true;
    }

    // Verifica que el usuario tenga AL MENOS UNO de los permisos requeridos por el decorador
    // (Opcionalmente se podría cambiar a "todos los permisos" usando .every)
    const hasPermission = requiredPermissions.some((perm) => user.permisos.includes(perm));
    
    if (!hasPermission) {
      throw new ForbiddenException(`Requiere los permisos: ${requiredPermissions.join(', ')}`);
    }

    return true;
  }
}
