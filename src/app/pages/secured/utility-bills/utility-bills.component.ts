import { Component, Input, computed, inject } from '@angular/core';
import { InputComponent } from "../../../common/utilities/input/input.component";
import { CommonModule } from '@angular/common';
import { DisplayStore } from '../../../stores/display.store';
import { ModalComponent } from "../../../common/utilities/modal/modal.component";
import { ConfirmTransactionComponent } from "../../../components/modals/confirm-transaction/confirm-transaction.component";
import { TransactionPinComponent } from "../../../components/modals/transaction-pin/transaction-pin.component";
import { SuccessfulTransferComponent } from "../../../components/modals/successful-transfer/successful-transfer.component";
import { TvProvidersComponent } from "../../../components/modals/tv-providers/tv-providers.component";
import { SavedContactsComponent } from "../../../components/modals/saved-contacts/saved-contacts.component";
import { SwitchComponent } from "../../../common/utilities/switch/switch.component";
import { ButtonFilledComponent } from "../../../common/utilities/button-filled/button-filled.component";
import { SelectTileComponent } from "../../../common/utilities/select-tile/select-tile.component";
import { AmountInputComponent } from "../../../common/utilities/amount-input/amount-input.component";

@Component({
  selector: 'app-utility-bills',
  standalone: true,
  imports: [InputComponent, CommonModule, ModalComponent, ConfirmTransactionComponent, TransactionPinComponent, SuccessfulTransferComponent, TvProvidersComponent, SavedContactsComponent, SwitchComponent, ButtonFilledComponent, SelectTileComponent, AmountInputComponent],
  templateUrl: './utility-bills.component.html',
  styleUrl: './utility-bills.component.scss'
})
export class UtilityBillsComponent {
  @Input() inputSpinner: boolean = false;

 readonly store = inject(DisplayStore);
provider: string = '';
providerIcon: string = '';
cableSelected: boolean = false;
step: number = 1;
inputNumber: string = '';
packageSelected: boolean = false;
isRecurring: boolean = false;
amount: number = 0;

collectInput(input: string){
  this.inputNumber = input;
  if(this.inputNumber.length == 8){
    this.step = 2;
  }
}
amountValueChange(value: number) {
  this.amount = value;
}
selectPackage(){
  this.packageSelected = !this.packageSelected;
}
recurringToggle(newValue: boolean) {
  this.isRecurring = newValue;
}
 selectedProvider(event: { name: string; icon: string }) {
   this.provider = event.name;
   this.providerIcon = event.icon;
   this.cableSelected = true;
   this.store.closeModal('tv-providers');
 }
   activeModal = computed(() => {
     const modals = this.store.modals();
     return Object.keys(modals).find((key) => modals[key]);
   });
}
