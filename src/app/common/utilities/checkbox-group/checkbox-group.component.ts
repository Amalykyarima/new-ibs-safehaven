import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox-group.component.html',
  styleUrl: './checkbox-group.component.scss'
})
export class CheckboxGroupComponent {
  @Output() selectedValue = new EventEmitter<string>();

@Input() items = ['Option 1', 'Option 2', 'Option 3'];
  selected: string | null = null;

  selectItem(item: string) {
    this.selected = item;
    this.selectedValue.emit(this.selected);
  }
}
