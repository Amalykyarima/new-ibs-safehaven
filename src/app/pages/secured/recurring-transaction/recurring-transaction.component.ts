import { Component } from '@angular/core';
import { RecurringTableComponent } from "../../../components/tables/recurring-table/recurring-table.component";

@Component({
  selector: 'app-recurring-transaction',
  standalone: true,
  imports: [RecurringTableComponent],
  templateUrl: './recurring-transaction.component.html',
  styleUrl: './recurring-transaction.component.scss'
})
export class RecurringTransactionComponent {

}
