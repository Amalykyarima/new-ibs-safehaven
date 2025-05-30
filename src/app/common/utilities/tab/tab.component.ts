import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent {

  ngOnInit(): void {}

  @Input() type = '';
  @Input() types: any[] = [];
  @Output() switchType: EventEmitter<any> = new EventEmitter<any>();

  switchType_ = (t: string) => {
    if(t!==this.type){
    this.type = t;
    this.switchType.emit(t);}
  };
}
