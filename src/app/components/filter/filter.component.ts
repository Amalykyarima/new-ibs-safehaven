import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DatepickerComponent } from '../../common/utilities/datepicker/datepicker.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, DatepickerComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Input() filterItems: any[] = [];
  isChecked: boolean = false;
  activeIndex: number | null = null;
  filterDropdown: boolean = false;
  @Output() itemsChange = new EventEmitter<any[]>();
  selectedCheckbox: string = ''; 

  selectCheckbox(label: string) {
    this.selectedCheckbox = label;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterItems']) {
      // console.log('Updated from parent:', this.filterItems);
    }
  }

  updateItem(index: number, newValue: string) {
    // console.log('updateItem', index, newValue);
    const updated = [...this.filterItems];
    updated[index] = { ...updated[index], selected: newValue };
    this.itemsChange.emit(updated);
  }
  toggle(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
  openFilter() {
    this.filterDropdown = !this.filterDropdown;
  }
  getCheckboxValues(title: string): string[] {
    const item = this.filterItems.find(
      (f) =>
        f.title.toLowerCase() === title.toLowerCase() && f.type === 'checkbox'
    );

    return item?.values ?? [];
  }
  checkItem() {}
}
