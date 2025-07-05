import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { DisplayStore } from '../../../stores/display.store';
import { ModalComponent } from '../../../common/utilities/modal/modal.component';
import { ConfirmationComponent } from '../../../components/modals/confirmation/confirmation.component';
import { CardDetailsComponent } from '../../../components/modals/card-details/card-details.component';
import { NotificationComponent } from '../../../components/modals/notification/notification.component';
import { LinkCardComponent } from '../../../components/modals/link-card/link-card.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ConfirmationComponent,
    CardDetailsComponent,
    NotificationComponent,
    LinkCardComponent,
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  readonly store = inject(DisplayStore);
  cards: any[] = [
    { pan: '****2129', expiry: '02/27', type: 'PHYSICAL' },
    { pan: '****5768 ', expiry: '02/27', type: 'VIRTUAL' },
  ];
  cardRequests: any[] = [
    {
      name: 'Abasifreke Emm.../Flexing',
      accountNumber: '1021678900',
      type: 'Savings',
      duration: '2',
      scheme: 'Mastercard',
    },
    {
      name: 'Abasifreke Emm.../Flexing',
      accountNumber: '1021678900',
      type: 'Savings',
      duration: '2',
      scheme: 'Mastercard',
    },
  ];
  cardTypes: any[] = [
    { name: 'Physical', icon: '../../../../assets/icons/physical-card.svg' },
    { name: 'Virtual', icon: '../../../../assets/icons/virtual-card.svg' },
  ];
  activeCard: string = '****2129';
  cardFrozen: boolean = false;
  createCardDropdown: boolean = false;
  selectedCardType: string = '';
  cardRequestDropdown: boolean = false;

  constructor( private router: Router,
    private route: ActivatedRoute) {}
  setActiveCard(pan: string) {
    this.activeCard = pan;
  }
  freezeCard() {
    this.cardFrozen = !this.cardFrozen;
  }
  selectCardType(type: string) {
    this.selectedCardType = type;
    this.orderCard(type);
  }
  openCreateCardDropdown() {
    this.createCardDropdown = !this.createCardDropdown;
  }
  openCardRequestDropdown() {
    this.cardRequestDropdown = !this.cardRequestDropdown;
  }
  orderCard(type: string) {
    this.router.navigate(['order-card', type], { relativeTo: this.route });
  }
  activeModal = computed(() => {
    const modals = this.store.modals();
    return Object.keys(modals).find((key) => modals[key]);
  });
}
