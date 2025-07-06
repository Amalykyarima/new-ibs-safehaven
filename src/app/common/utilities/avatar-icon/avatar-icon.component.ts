import { Component, Input } from '@angular/core';
import { AvatarComponent } from "../avatar/avatar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar-icon',
  standalone: true,
  imports: [AvatarComponent, CommonModule],
  templateUrl: './avatar-icon.component.html',
  styleUrl: './avatar-icon.component.scss'
})
export class AvatarIconComponent {
 @Input() height: string = '74';
  @Input() width: string = '74';
  getHalfAsString(value: string | number): string {
    const numericValue = typeof value === 'string' ? Number(value) : value;
  
    if (isNaN(numericValue)) {
      throw new Error('Invalid input: must be a number or numeric string');
    }
  
    const half = numericValue / 2;
    return half.toString();
  }

}
