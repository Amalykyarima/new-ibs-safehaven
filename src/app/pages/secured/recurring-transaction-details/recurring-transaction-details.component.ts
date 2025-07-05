import { Component, computed, inject } from '@angular/core';
import { ButtonFilledComponent } from '../../../common/utilities/button-filled/button-filled.component';
import { AvatarIconComponent } from '../../../common/utilities/avatar-icon/avatar-icon.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../common/utilities/modal/modal.component';
import { DisplayStore } from '../../../stores/display.store';
import { ConfirmTransactionComponent } from '../../../components/modals/confirm-transaction/confirm-transaction.component';
import { ConfirmationComponent } from '../../../components/modals/confirmation/confirmation.component';
import { TransferRecordsComponent } from '../../../components/modals/transfer-records/transfer-records.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recurring-transaction-details',
  standalone: true,
  imports: [
    ButtonFilledComponent,
    AvatarIconComponent,
    CommonModule,
    ModalComponent,
    ConfirmationComponent,
    TransferRecordsComponent,
  ],
  templateUrl: './recurring-transaction-details.component.html',
  styleUrl: './recurring-transaction-details.component.scss',
})
export class RecurringTransactionDetailsComponent {
  readonly store = inject(DisplayStore);
  transferState: string = 'successful';
  constructor(private router: Router,){}
  endRecurringTransfer = () => {
    this.store.openModal('confirmation');
  };
  retryTransfer() {}
  routeBack() {
    this.router.navigate(['dashboard/recurring-transactions']);
  }
  activeModal = computed(() => {
    const modals = this.store.modals();
    return Object.keys(modals).find((key) => modals[key]);
  });
}
