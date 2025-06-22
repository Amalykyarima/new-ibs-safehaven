import { Component } from '@angular/core';
import { DropdownComponent } from "../../../common/utilities/dropdown/dropdown.component";
import { SwitchComponent } from "../../../common/utilities/switch/switch.component";
import { AmountInputComponent } from "../../../common/utilities/amount-input/amount-input.component";
import { CommonModule } from '@angular/common';
import { SelectTileComponent } from "../../../common/utilities/select-tile/select-tile.component";
import { InputComponent } from "../../../common/utilities/input/input.component";
import { ButtonFilledComponent } from "../../../common/utilities/button-filled/button-filled.component";

@Component({
  selector: 'app-buy-airtime',
  standalone: true,
  imports: [DropdownComponent, SwitchComponent, AmountInputComponent, CommonModule, SelectTileComponent, InputComponent, ButtonFilledComponent],
  templateUrl: './buy-airtime.component.html',
  styleUrl: './buy-airtime.component.scss'
})
export class BuyAirtimeComponent {
  isRewardPoints: boolean = false;
  isRecurring: boolean = false;
  amount: number = 0;

  rewardPointsToggled(newValue: boolean) {
    this.isRewardPoints = newValue;
  }
  recurringToggle(newValue: boolean) {
    this.isRecurring = newValue;
  }
  amountValueChange(value: number){
    this.amount = value;
  }
}
