import { Component } from '@angular/core';
import { HistoryTableComponent } from "../../../components/tables/history-table/history-table.component";
import { FilterComponent } from "../../../components/filter/filter.component";

@Component({
  selector: 'app-vas-history',
  standalone: true,
  imports: [HistoryTableComponent, FilterComponent],
  templateUrl: './vas-history.component.html',
  styleUrl: './vas-history.component.scss'
})
export class VasHistoryComponent {
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
