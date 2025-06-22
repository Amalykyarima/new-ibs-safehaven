import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-amount-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './amount-input.component.html',
  styleUrl: './amount-input.component.scss'
})
export class AmountInputComponent {
  readonly currencySymbol = '₦';
  rawValue = '';
  @Output() valueChange = new EventEmitter<number>();

  get formattedAmount(): string {
    const number = parseFloat(this.rawValue || '0') / 100;
    return number.toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  emitValue() {
    const numericValue = parseFloat(this.rawValue || '0') / 100;
    this.valueChange.emit(numericValue);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault(); // block non-numeric input
      return;
    }

    this.rawValue += event.key;
    this.emitValue();
    event.preventDefault(); // prevent default input
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Backspace') {
      this.rawValue = this.rawValue.slice(0, -1);
      this.emitValue();
      event.preventDefault();
    }
  }

}
