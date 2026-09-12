import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocentesService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api/staff';

  getDocentes(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  crearDocente(docente: any): Observable<any> {
    return this.http.post(this.API_URL, docente);
  }

  crearDesignacion(designacion: any): Observable<any> {
    return this.http.post(`${this.API_URL}/designaciones`, designacion);
  }

  getInasistenciasSet4(mes: number, anio: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/inasistencias/set4?mes=${mes}&anio=${anio}`);
  }
}
