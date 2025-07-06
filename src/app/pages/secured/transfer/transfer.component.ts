import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SwitchComponent } from '../../../common/utilities/switch/switch.component';
import { InputComponent } from '../../../common/utilities/input/input.component';
import { AvatarIconComponent } from '../../../common/utilities/avatar-icon/avatar-icon.component';
import { ButtonFilledComponent } from '../../../common/utilities/button-filled/button-filled.component';
import { DisplayStore } from '../../../stores/display.store';
import { ModalComponent } from "../../../common/utilities/modal/modal.component";
import { ConfirmTransactionComponent } from "../../../components/modals/confirm-transaction/confirm-transaction.component";
import { TransactionPinComponent } from "../../../components/modals/transaction-pin/transaction-pin.component";
import { BankSelectComponent } from "../../../components/modals/bank-select/bank-select.component";
import { SuccessfulTransferComponent } from "../../../components/modals/successful-transfer/successful-transfer.component";
import { BeneficiariesListComponent } from "../../../components/modals/beneficiaries-list/beneficiaries-list.component";

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SwitchComponent,
    InputComponent,
    AvatarIconComponent,
    ButtonFilledComponent,
    ModalComponent,
    ConfirmTransactionComponent,
    TransactionPinComponent,
    BankSelectComponent,
    SuccessfulTransferComponent,
    BeneficiariesListComponent
],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss',
})
export class TransferComponent {
  readonly store = inject(DisplayStore);
  isToggled: boolean = false;
  transferSteps: number = 1;
  receivingSelected: boolean = false;
  sendingSelected: boolean = false;
  activePage: string = '';

  setActivePage(page: string) {
    this.activePage = page;
  }
  forward = () => {
    this.transferSteps++;
  };
  backward = () => {
    this.transferSteps--;
  };
  confirmTransaction = () => {
    this.store.openModal('confirm-transaction')
  }
  jumpToStep(step: number) {
    this.transferSteps = step;
  }
  toggleSending = () => {
    this.sendingSelected = !this.sendingSelected;
  };
  toggleReceiving = () => {
    this.receivingSelected = !this.receivingSelected;
  };
  activeModal = computed(() => {
    const modals = this.store.modals();
    return Object.keys(modals).find((key) => modals[key]);
  });

}
