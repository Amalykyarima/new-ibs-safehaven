import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvatarIconComponent } from '../../../common/utilities/avatar-icon/avatar-icon.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recurring-table',
  standalone: true,
  imports: [CommonModule, AvatarIconComponent],
  templateUrl: './recurring-table.component.html',
  styleUrl: './recurring-table.component.scss',
})
export class RecurringTableComponent {
  headerData: any[] = ['NAME', 'FREQUENCY', 'NEXT PAYMENT DATE', 'AMOUNT'];
  constructor(public router: Router) {}
  rowClick() {
    this.router.navigate(['/dashboard/recurring-transactions/details']);
  }
}
