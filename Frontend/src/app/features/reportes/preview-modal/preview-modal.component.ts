import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesService } from '../services/reportes.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-preview-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './preview-modal.component.html',
  styleUrl: './preview-modal.component.css'
})
export class PreviewModalComponent {
  @Input() tipoReporte: string = 'S.E.T. 4';
  @Input() idRelacionado: number = 1;

  reportesService = inject(ReportesService);
  isGeneratingPdf = false;
  previewData: any = null;

  ngOnInit() {
    this.cargarPreview();
  }

  cargarPreview() {
    this.reportesService.getPreviewData(this.tipoReporte, this.idRelacionado).subscribe({
      next: (data) => this.previewData = data,
      error: () => {
        // Mock data temporal si la API no está lista
        this.previewData = { titulo: `Reporte ${this.tipoReporte}`, contenido: 'Datos simulados del reporte...' };
      }
    });
  }

  descargarOficial() {
    this.isGeneratingPdf = true;
    
    this.reportesService.descargarPdf(this.tipoReporte, this.idRelacionado).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        // Abrir en ventana emergente según requerimiento del usuario
        const popup = window.open(url, 'DocumentoOficial', 'width=800,height=1000,toolbar=no,scrollbars=yes,resizable=yes');
        
        if (!popup) {
           alert('Por favor, permite las ventanas emergentes para ver el reporte PDF.');
        }

        // Limpiar URL después de un tiempo para no romper la ventana emergente si se revoca muy rápido
        setTimeout(() => window.URL.revokeObjectURL(url), 10000);
        this.isGeneratingPdf = false;
      },
      error: (err) => {
        console.error('Error al generar PDF', err);
        // Fallback: simulamos descarga para la UI demo
        setTimeout(() => {
          this.isGeneratingPdf = false;
          alert('[Modo Local] Simulación: PDF descargado exitosamente.');
        }, 1500);
      }
    });
  }
}
