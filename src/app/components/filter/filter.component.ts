import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CheckboxComponent } from "../../common/utilities/checkbox/checkbox.component";
import { CheckboxGroupComponent } from "../../common/utilities/checkbox-group/checkbox-group.component";
import { DatepickerComponent } from "../../common/utilities/datepicker/datepicker.component";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, CheckboxComponent, CheckboxGroupComponent, DatepickerComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  filterItems: any[] = [
    {title: 'By Accounts',type:'checkbox',  values: ['Abasifreke Emm.../Main', 'Abasifreke Emm.../Sub', 'Abasifreke Emm.../Flex', 'Abasifreke Emm.../Gift']},
    {title: 'By Date', type: 'date'},
    {title: 'By Date Range', type: 'date-range'},
    {title: 'By Type',type:'checkbox', values: ['Airtime', 'Cable TV', 'Data', 'Utility Bills']}
  ]
  activeIndex: number | null = null;
  filterDropdown: boolean = false;

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
