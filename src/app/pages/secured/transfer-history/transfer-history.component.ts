import { Component } from '@angular/core';
import { FilterComponent } from "../../../components/filter/filter.component";
import { HistoryTableComponent } from "../../../components/tables/history-table/history-table.component";

@Component({
  selector: 'app-transfer-history',
  standalone: true,
  imports: [FilterComponent, HistoryTableComponent],
  templateUrl: './transfer-history.component.html',
  styleUrl: './transfer-history.component.scss'
})
export class TransferHistoryComponent {

}
