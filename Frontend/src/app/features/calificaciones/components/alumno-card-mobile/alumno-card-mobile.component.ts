import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NotaCeldaComponent } from '../nota-celda/nota-celda.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-alumno-card-mobile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotaCeldaComponent, CardComponent, BadgeComponent],
  templateUrl: './alumno-card-mobile.component.html',
  styleUrls: ['./alumno-card-mobile.component.css']
})
export class AlumnoCardMobileComponent {
  @Input() alumnoName: string = '';
  @Input() formGroup!: FormGroup;
  @Input() isExpanded: boolean = false;
  
  @Output() toggle = new EventEmitter<void>();

  onToggle() {
    this.toggle.emit();
  }
}
