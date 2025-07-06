import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text: string = 'Click me';
  @Input() maxWidth: string = '100%';
  @Input() bgColor: string = '#3B82F6';
  @Input() action: () => void = () => {};

}
