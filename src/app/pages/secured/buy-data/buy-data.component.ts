import { Component, Input, computed, inject } from '@angular/core';
import { SwitchComponent } from "../../../common/utilities/switch/switch.component";
import { DisplayStore } from '../../../stores/display.store';
import { CommonModule } from '@angular/common';
import { InputComponent } from "../../../common/utilities/input/input.component";
import { SelectTileComponent } from "../../../common/utilities/select-tile/select-tile.component";
import { ButtonFilledComponent } from "../../../common/utilities/button-filled/button-filled.component";
import { ModalComponent } from "../../../common/utilities/modal/modal.component";
import { ConfirmTransactionComponent } from "../../../components/modals/confirm-transaction/confirm-transaction.component";
import { SuccessfulTransferComponent } from "../../../components/modals/successful-transfer/successful-transfer.component";
import { TransactionPinComponent } from "../../../components/modals/transaction-pin/transaction-pin.component";
import { SelectNetworkComponent } from "../../../components/modals/select-network/select-network.component";
import { SavedContactsComponent } from "../../../components/modals/saved-contacts/saved-contacts.component";

@Component({
  selector: 'app-buy-data',
  standalone: true,
  imports: [SwitchComponent, CommonModule, InputComponent, SelectTileComponent, ButtonFilledComponent, ModalComponent, ConfirmTransactionComponent, SuccessfulTransferComponent, TransactionPinComponent, SelectNetworkComponent, SavedContactsComponent],
  templateUrl: './buy-data.component.html',
  styleUrl: './buy-data.component.scss'
})
export class BuyDataComponent {
 readonly store = inject(DisplayStore);
 network: string = 'Airtel';
 networkIcon: string = '../../../../assets/images/airtel.svg';
 packageSelected: boolean = false;
 isRecurring: boolean = false;
 @Input() inputSpinner: boolean = false;


 selectedNetwork(event: { name: string; icon: string }) {
  this.network = event.name;
  this.networkIcon = event.icon;
  this.store.closeModal('network');
}
recurringToggle(newValue: boolean) {
  this.isRecurring = newValue;
}
selectPackage(){
  this.packageSelected = !this.packageSelected;
}
  activeModal = computed(() => {
    const modals = this.store.modals();
    return Object.keys(modals).find((key) => modals[key]);
  });
}
