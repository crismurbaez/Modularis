import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { IconComponent } from '../../icons/lucide-icon.component';

@Component({
  selector: 'app-print-preview-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, SpinnerComponent, IconComponent],
  templateUrl: './print-preview-modal.component.html',
  styleUrls: ['./print-preview-modal.component.css']
})
export class PrintPreviewModalComponent {
  @Input() title: string = 'Previsualización de Documento';
  @Input() documentType: string = 'A4';
  @Input() isOpen: boolean = false;
  
  @Output() onClose = new EventEmitter<void>();
  @Output() onDownload = new EventEmitter<void>();

  isGeneratingPDF: boolean = false;

  closeModal() {
    if (!this.isGeneratingPDF) {
      this.onClose.emit();
    }
  }

  handleDownload() {
    this.isGeneratingPDF = true;
    this.onDownload.emit();
    
    // Fake timeout for demo purposes to show the spinner
    setTimeout(() => {
      this.isGeneratingPDF = false;
      this.closeModal();
    }, 3000);
  }
}
