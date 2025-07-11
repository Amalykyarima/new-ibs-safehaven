import { Component } from '@angular/core';
import { InputComponent } from "../../../common/utilities/input/input.component";
import { ButtonFilledComponent } from "../../../common/utilities/button-filled/button-filled.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [InputComponent, ButtonFilledComponent, CommonModule],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.scss'
})
export class AddAccountComponent {
accountType: [string, string] = ['Savings', 'Current'];
selectedAccount: string = this.accountType[0];
setAccountType(type: string) {
  this.selectedAccount = type;
}
}
