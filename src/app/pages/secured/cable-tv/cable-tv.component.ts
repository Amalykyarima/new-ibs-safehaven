import { Component, computed, inject } from '@angular/core';
import { InputComponent } from "../../../common/utilities/input/input.component";
import { CommonModule } from '@angular/common';
import { SwitchComponent } from "../../../common/utilities/switch/switch.component";
import { ModalComponent } from "../../../common/utilities/modal/modal.component";
import { ConfirmTransactionComponent } from "../../../components/modals/confirm-transaction/confirm-transaction.component";
import { TransactionPinComponent } from "../../../components/modals/transaction-pin/transaction-pin.component";
import { SuccessfulTransferComponent } from "../../../components/modals/successful-transfer/successful-transfer.component";
import { SelectNetworkComponent } from "../../../components/modals/select-network/select-network.component";
import { SavedContactsComponent } from "../../../components/modals/saved-contacts/saved-contacts.component";
import { DisplayStore } from '../../../stores/display.store';
import { TvProvidersComponent } from "../../../components/modals/tv-providers/tv-providers.component";
import { SelectTileComponent } from "../../../common/utilities/select-tile/select-tile.component";
import { ButtonFilledComponent } from "../../../common/utilities/button-filled/button-filled.component";

@Component({
  selector: 'app-cable-tv',
  standalone: true,
  imports: [InputComponent, CommonModule, SwitchComponent, ModalComponent, ConfirmTransactionComponent, TransactionPinComponent, SuccessfulTransferComponent, SavedContactsComponent, TvProvidersComponent, SelectTileComponent, ButtonFilledComponent],
  templateUrl: './cable-tv.component.html',
  styleUrl: './cable-tv.component.scss'
})
export class CableTvComponent {
   readonly store = inject(DisplayStore);
step: number = 1;
inputNumber: string = '';
providerSelected: boolean = false;
cableSelected: boolean = false;
provider: string = '';
providerIcon: string = '';
packageSelected: boolean = false;
isRecurring: boolean = false;

collectInput(input: string){
  this.inputNumber = input;
  if(this.inputNumber.length == 8){
    this.step = 2;
  }
}
selectPackage(){
  this.packageSelected = !this.packageSelected;
}
selectProvider(){
  this.providerSelected = !this.providerSelected
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
