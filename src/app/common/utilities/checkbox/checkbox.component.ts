import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
@Input() label: string = '';
isChecked: boolean = false;
@Output() isCheckedChange = new EventEmitter<boolean>();

checkItem(){
  this.isChecked = !this.isChecked;
  this.isCheckedChange.emit(this.isChecked);
}
}
