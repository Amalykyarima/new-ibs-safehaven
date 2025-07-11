import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-checkbox-group',
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  templateUrl: './checkbox-group.component.html',
  styleUrl: './checkbox-group.component.scss',
})
export class CheckboxGroupComponent {
  @Input() items: string[] = [];
  @Output() selectedChange = new EventEmitter<string>();
  selectedItem: string = '';

  // select = (item: string) => {
  //   console.log('item:', item, 'selectedItem:', this.selectedItem);
  //   this.selectedItem = item;
  //   console.log('item:', item, 'selectedItem:', this.selectedItem);
  //   console.log('check', item === this.selectedItem);

  //   this.selectedChange.emit(this.selectedItem);
  // };
  setChange(value: any){
    this.selectedItem = value;
    this.selectedChange.emit(this.selectedItem);
  }
  isItemChecked(item: string): boolean {
    return this.selectedItem === item;
  }
}
