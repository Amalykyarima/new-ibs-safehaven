import { Component } from '@angular/core';
import { FilterComponent } from "../../../components/filter/filter.component";
import { ButtonFilledComponent } from "../../../common/utilities/button-filled/button-filled.component";
import { CommonModule } from '@angular/common';
import { StatementTableComponent } from "../../../components/tables/statement-table/statement-table.component";

@Component({
  selector: 'app-statements',
  standalone: true,
  imports: [FilterComponent, ButtonFilledComponent, CommonModule, StatementTableComponent],
  templateUrl: './statements.component.html',
  styleUrl: './statements.component.scss'
})
export class StatementsComponent {
  activeFilters: any[] = [];
  filterItems: any[] = [
    {
      title: 'By Accounts',
      type: 'checkbox',
      values: [
        'Abasifreke Emm.../Main',
        'Abasifreke Emm.../Sub',
        'Abasifreke Emm.../Flex',
        'Abasifreke Emm.../Gift',
      ],
    },
    { title: 'By Date', type: 'date' },
    { title: 'By Date Range', type: 'date-range' },
    {
      title: 'By Type',
      type: 'checkbox',
      values: ['Airtime', 'Cable TV', 'Data', 'Utility Bills'],
    },
  ];
  filteredItems: any[] = [];
  handleFilter(updatedFilters: any[]) {
    this.filterItems = this.filterItems.map(item => {
      const updatedItem = updatedFilters.find(f => f.title === item.title);
  
      if (updatedItem) {
        return { ...item, selected: updatedItem.selected };
      }
  
      return { ...item, selected: undefined };
    });
  
    // console.log('Filtered (parent can only remove):', this.filterItems);
  }
}
