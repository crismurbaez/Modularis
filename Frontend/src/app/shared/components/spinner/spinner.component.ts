import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-overlay" *ngIf="fullScreen">
      <div class="spinner-container">
        <div class="spinner"></div>
        <p class="spinner-text" *ngIf="text">{{ text }}</p>
      </div>
    </div>
    
    <div class="spinner-inline" *ngIf="!fullScreen">
      <div class="spinner" [style.width.px]="size" [style.height.px]="size"></div>
    </div>
  `,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  @Input() fullScreen: boolean = false;
  @Input() text: string = '';
  @Input() size: number = 24;
}
