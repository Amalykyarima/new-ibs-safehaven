import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-box.component.html',
  styleUrl: './select-box.component.scss',
})
export class SelectBoxComponent {
  @Input() options: any;
  @Input() activeTab: string = '';
  @Output() selectedValue: EventEmitter<any> = new EventEmitter<any>();
  selectedItem: string = '';

  ngOnInit() {
    if (this.activeTab) {
      this.selectedItem = this.activeTab;
    }
  }
  selectOption(value: string) {
    this.selectedItem = value;
    this.selectedValue.emit(value);
  }
}
