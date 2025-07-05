import { Component } from '@angular/core';
import { InputComponent } from '../../../common/utilities/input/input.component';
import { CommonModule } from '@angular/common';
import { ButtonFilledComponent } from "../../../common/utilities/button-filled/button-filled.component";
import { SearchComponent } from "../../../common/utilities/search/search.component";

@Component({
  selector: 'app-link-card',
  standalone: true,
  imports: [InputComponent, CommonModule, ButtonFilledComponent, SearchComponent],
  templateUrl: './link-card.component.html',
  styleUrl: './link-card.component.scss',
})
export class LinkCardComponent {
  accounts: any[] = [
    {
      name: 'Abasifreke Emm.../Main',
      accountNumber: '1021678900',
      type: 'Savings',
      balance: '₦23,500.00',
    },
    {
      name: 'Kedonojo Ame.../Main',
      accountNumber: '1021678900',
      type: 'Current',
      balance: '₦23,500.00',
    }
  ];
  activeAccount: string = '';
  constructor(){
    this.activeAccount = this.accounts[0].name;
  }
  selectAccount(accountName: string){
    this.activeAccount = accountName
  }
}
