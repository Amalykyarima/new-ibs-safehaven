import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { ButtonFilledComponent } from '../../../common/utilities/button-filled/button-filled.component';
import { ModalComponent } from '../../../common/utilities/modal/modal.component';
import { DisplayStore } from '../../../stores/display.store';
import { AddAccountComponent } from "../../../components/modals/add-account/add-account.component";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonFilledComponent, ModalComponent, AddAccountComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  readonly store = inject(DisplayStore);
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
    },
  ];
  constructor(private router: Router) {}
  toDetails() {
    this.router.navigate(['/dashboard/accounts/details']);
  }
  openAddModal = () => {
    this.store.openModal('add-account');
  };
  activeModal = computed(() => {
    const modals = this.store.modals();
    return Object.keys(modals).find((key) => modals[key]);
  });
}
