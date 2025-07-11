import { Component } from '@angular/core';
import { FilterComponent } from '../../../components/filter/filter.component';
import { HistoryTableComponent } from '../../../components/tables/history-table/history-table.component';
import { TransferService } from '../../../resources/services/transfer.service';

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
  transactions: any;
  page: number = 1;
  limit: number = 25;
  filter: string = '';
  status: string = '';
  fromDate: any = '';
  toDate: any = '';
  searchTerm: string = '';
 id: string = '67235d48cbe5410024a46f69';
  constructor(private transferService: TransferService,){
    this.fromDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    this.toDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );
    this.getTransfers();
  }
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
  getTransfers() {
    this.transferService.transfers(this.id, (this.page - 1), this.limit, this.filter, this.status, this.fromDate, this.toDate, this.searchTerm).subscribe({
        next: (res: any) => {
            this.transactions = res.data;
        },
        error: (error: any) =>{

        }
    })
}
}
