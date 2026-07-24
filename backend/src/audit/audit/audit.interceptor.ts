import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;

    return next.handle().pipe(
      tap(async () => {
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
          const userId = req.user ? req.user.id_usuario : null;
          try {
             await this.prisma.historialCambios.create({
               data: {
                 modulo: url.substring(0, 100),
                 detalle: `Operación ${method} ejecutada`,
                 id_usuario: userId
               }
             });
          } catch(err) {
             console.error('Error registrando auditoría:', err);
          }
        }
      }),
    );
  }
}
