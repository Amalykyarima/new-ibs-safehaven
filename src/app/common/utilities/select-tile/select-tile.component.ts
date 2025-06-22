import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-tile.component.html',
  styleUrl: './select-tile.component.scss'
})
export class SelectTileComponent {
  selectedItem: string = '';
  @Input() label = '';
  @Input() items: any = [];
  @Input() value = '';
  @Input() title = '';
  @Input() error = '';
   @Output() selectedValue = new EventEmitter<any>();
   ngOnInit() {
    if (this.items.includes(this.value)) {
      this.selectedItem = this.value;
    }
  }

   setItem = (item: string) => {
    this.selectedItem = item;
    if (!this.title) {
      this.selectedValue.emit(item);
    } else {
      this.selectedValue.emit({ title: this.title, value: item });
    }
  };
}
