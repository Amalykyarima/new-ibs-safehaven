import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input() name = '';
  colors = ['#F1F1E6', '#EDEEFF', '#F4F5F7', '#F9FAFB', '#E5EDFF'];

  getAcronym = (name: string) => {
    let arr = name.split(' ');
    let val = '';
    arr.forEach((a) => {
      val = val + a[0];
    });
    return val.slice(0, 3);
  };

  getColor = () => {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    // console.log(randomIndex);

    return this.colors[1];
  };
}
