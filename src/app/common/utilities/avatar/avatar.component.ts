import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent implements OnInit {

  @Input() name = '';
  @Input() textStyle = '';
  @Input() ciruclar: boolean = false;
  @Input() height: string = '';
  @Input() width: string = '';
  colors = ['#EBF5FF', '#EBF5FF', '#EBF5FF', '#EBF5FF', '#EBF5FF'];

  ngOnInit(): void {
console.log('name', this.name)  }

  getAcronym = (name: string) => {
    let arr = name.split(' ');
    let val = '';
    arr.forEach((a) => {
      val = val + a[0];
    });
    return val.slice(0, 2);
  };

  getColor = () => {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    // console.log(randomIndex);

    return this.colors[1];
  };
}
