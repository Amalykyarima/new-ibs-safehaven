import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CheckboxComponent } from "../../common/utilities/checkbox/checkbox.component";
import { CheckboxGroupComponent } from "../../common/utilities/checkbox-group/checkbox-group.component";
import { DatepickerComponent } from "../../common/utilities/datepicker/datepicker.component";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, CheckboxGroupComponent, DatepickerComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Input() filterItems: any[] = [];

  activeIndex: number | null = null;
  filterDropdown: boolean = false;
  @Output() itemsChange = new EventEmitter<any[]>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      // Respond to changes from the parent if needed
      console.log('Updated from parent:', this.filterItems);
    }
  }
  updateItem(index: number, newValue: number) {
    const updated = [...this.filterItems];
    updated[index].value = newValue;

    // Emit the new array to the parent
    this.itemsChange.emit(updated);
  }
  toggle(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
  openFilter(){
    this.filterDropdown = !this.filterDropdown
  }
  getCheckboxValues(title: string): string[] {
    const item = this.filterItems.find(
      (f) => f.title.toLowerCase() === title.toLowerCase() && f.type === 'checkbox'
    );
  
    return item?.values ?? [];
  }
  
}
