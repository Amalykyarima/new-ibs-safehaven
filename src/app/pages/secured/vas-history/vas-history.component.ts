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

}
