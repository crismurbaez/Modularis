import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AlumnoNota {
  id_cursada: number;
  id_alumno: number;
  nombre_completo: string;
  dni: string;
  nota_cuat1: string | null;
  faltas_cuat1: number;
  nota_cuat2: string | null;
  faltas_cuat2: number;
  nota_final: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api/grades';

  // Obtener alumnos y notas de una materia y curso específico
  getAlumnosPorMateria(idMateria: number, idCurso: number, cicloLectivo: number): Observable<AlumnoNota[]> {
    return this.http.get<AlumnoNota[]>(`${this.API_URL}/materia/${idMateria}/curso/${idCurso}/ciclo/${cicloLectivo}`);
  }

  // Guardar calificaciones masivamente (Bulk Update)
  guardarCalificacionesMasivas(notas: Partial<AlumnoNota>[]): Observable<any> {
    return this.http.put(`${this.API_URL}/bulk-update`, { notas });
  }
}
