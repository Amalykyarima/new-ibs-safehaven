import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-small-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './small-button.component.html',
  styleUrl: './small-button.component.scss'
})
export class SmallButtonComponent {

  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() buttonClass: string = '';
  @Output() onClick = new EventEmitter<Event>();
  isActive: boolean = false;

  setActive(state: boolean): void {
    if (!this.disabled) {
      this.isActive = state;
    }
  }

  // Handle keyboard events for accessibility
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.disabled) {
      this.isActive = true;
      // Trigger click on Enter/Space
      this.onClick.emit(event);
    }
  }

  @HostListener('keyup.enter', ['$event'])
  @HostListener('keyup.space', ['$event'])
  handleKeyboardEventEnd(event: KeyboardEvent) {
    this.isActive = false;
  }
}
