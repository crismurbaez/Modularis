import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nota-celda',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nota-celda.component.html',
  styleUrls: ['./nota-celda.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NotaCeldaComponent),
      multi: true
    }
  ]
})
export class NotaCeldaComponent implements ControlValueAccessor {
  @Input() placeholder: string = '-';
  @Input() disabled: boolean = false;
  @Input() hasError: boolean = false;

  value: string = '';
  
  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
