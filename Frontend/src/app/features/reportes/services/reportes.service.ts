import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api/reports';

  // Obtener datos crudos para la vista previa
  getPreviewData(tipoReporte: string, idRelacionado: number): Observable<any> {
    return this.http.get(`${this.API_URL}/preview/${tipoReporte}/${idRelacionado}`);
  }

  // Descargar el PDF procesado por Puppeteer
  descargarPdf(tipoReporte: string, idRelacionado: number): Observable<Blob> {
    return this.http.get(`${this.API_URL}/download/${tipoReporte}/${idRelacionado}`, {
      responseType: 'blob' // Esencial para archivos binarios
    });
  }
}
