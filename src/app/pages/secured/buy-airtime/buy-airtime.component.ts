import { Component, Input, computed, inject } from '@angular/core';
import { DropdownComponent } from '../../../common/utilities/dropdown/dropdown.component';
import { SwitchComponent } from '../../../common/utilities/switch/switch.component';
import { AmountInputComponent } from '../../../common/utilities/amount-input/amount-input.component';
import { CommonModule } from '@angular/common';
import { SelectTileComponent } from '../../../common/utilities/select-tile/select-tile.component';
import { InputComponent } from '../../../common/utilities/input/input.component';
import { ButtonFilledComponent } from '../../../common/utilities/button-filled/button-filled.component';
import { DisplayStore } from '../../../stores/display.store';
import { ModalComponent } from '../../../common/utilities/modal/modal.component';
import { ConfirmTransactionComponent } from '../../../components/modals/confirm-transaction/confirm-transaction.component';
import { SuccessfulTransferComponent } from '../../../components/modals/successful-transfer/successful-transfer.component';
import { TransactionPinComponent } from '../../../components/modals/transaction-pin/transaction-pin.component';
import { AvatarComponent } from '../../../common/utilities/avatar/avatar.component';
import { AvatarIconComponent } from '../../../common/utilities/avatar-icon/avatar-icon.component';
import { CheckboxComponent } from '../../../common/utilities/checkbox/checkbox.component';
import { SelectNetworkComponent } from '../../../components/modals/select-network/select-network.component';
import { SavedContactsComponent } from "../../../components/modals/saved-contacts/saved-contacts.component";
import { SpinningLoaderComponent } from "../../../common/utilities/spinning-loader/spinning-loader.component";

@Component({
  selector: 'app-buy-airtime',
  standalone: true,
  imports: [
    SwitchComponent,
    AmountInputComponent,
    CommonModule,
    SelectTileComponent,
    InputComponent,
    ButtonFilledComponent,
    ModalComponent,
    ConfirmTransactionComponent,
    SuccessfulTransferComponent,
    TransactionPinComponent,
    SelectNetworkComponent,
    SavedContactsComponent,
],
  templateUrl: './buy-airtime.component.html',
  styleUrl: './buy-airtime.component.scss',
})
export class BuyAirtimeComponent {
  readonly store = inject(DisplayStore);
  isRewardPoints: boolean = false;
  isRecurring: boolean = false;
  amount: number = 0;
  network: string = 'Airtel';
  networkIcon: string = '../../../../assets/images/airtel.svg';
  @Input() inputSpinner: boolean = false;

  rewardPointsToggled(newValue: boolean) {
    this.isRewardPoints = newValue;
  }
  recurringToggle(newValue: boolean) {
    this.isRecurring = newValue;
  }
  selectedNetwork(event: { name: string; icon: string }) {
    this.network = event.name;
    this.networkIcon = event.icon;
    this.store.closeModal('network');
  }

  amountValueChange(value: number) {
    this.amount = value;
  }
  activeModal = computed(() => {
    const modals = this.store.modals();
    return Object.keys(modals).find((key) => modals[key]);
  });
}
