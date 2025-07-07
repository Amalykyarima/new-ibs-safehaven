import { Component } from '@angular/core';
import { FilterComponent } from '../../../components/filter/filter.component';
import { HistoryTableComponent } from '../../../components/tables/history-table/history-table.component';

@Component({
  selector: 'app-transfer-history',
  standalone: true,
  imports: [FilterComponent, HistoryTableComponent],
  templateUrl: './transfer-history.component.html',
  styleUrl: './transfer-history.component.scss',
})
export class TransferHistoryComponent {
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
  onFilterChanged(updatedArray: any[]) {
    this.filteredItems = updatedArray;
  }
}
