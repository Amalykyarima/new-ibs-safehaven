import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-filled',
  standalone: true,
  imports: [],
  templateUrl: './button-filled.component.html',
  styleUrl: './button-filled.component.scss'
})
export class ButtonFilledComponent {
@Input() text: string = '';
@Input() loading: boolean = false;
@Input() action: (() => void)  = ()=>{};
}
