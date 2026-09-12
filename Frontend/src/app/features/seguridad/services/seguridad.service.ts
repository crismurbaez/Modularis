import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id_usuario: number;
  username: string;
  id_rol: number;
  activo: boolean;
  rol?: { nombre: string };
  personal?: { nombre: string, apellido: string };
}

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api/users';

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API_URL);
  }

  toggleEstadoUsuario(id: number, activo: boolean): Observable<any> {
    return this.http.patch(`${this.API_URL}/${id}/estado`, { activo });
  }

  getRolesYPermisos(): Observable<any> {
    return this.http.get('http://localhost:3000/api/auth/roles-permisos');
  }

  actualizarPermisos(idRol: number, permisosIds: number[]): Observable<any> {
    return this.http.put(`http://localhost:3000/api/auth/roles/${idRol}/permisos`, { permisos: permisosIds });
  }
}
