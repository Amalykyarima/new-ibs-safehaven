import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InputComponent } from '../../../common/utilities/input/input.component';
import { CommonModule } from '@angular/common';
import { ButtonFilledComponent } from '../../../common/utilities/button-filled/button-filled.component';
import { SelectComponent } from '../../../common/utilities/select/select.component';
import { DisplayStore } from '../../../stores/display.store';
import { ModalComponent } from '../../../common/utilities/modal/modal.component';
import { CardOrderConfirmedComponent } from '../../../components/modals/card-order-confirmed/card-order-confirmed.component';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [
    InputComponent,
    CommonModule,
    ButtonFilledComponent,
    SelectComponent,
    ModalComponent,
    CardOrderConfirmedComponent,
  ],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
})
export class OrderCardComponent {
  readonly store = inject(DisplayStore);
  cardType: any = '';
  cardScehemes: any[] = [
    {
      name: 'Mastercard',
      imagePath: '../../../../assets/images/mastercard.svg',
    },
    { name: 'Visa', imagePath: '../../../../assets/images/visa.svg' },
    { name: 'Verve', imagePath: '../../../../assets/images/verve.svg' },
    { name: 'Afrigo', imagePath: '../../../../assets/images/afrigo.svg' },
  ];
  activeScheme: string = 'Mastercard';
  step: number = 1;
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.cardType = params.get('type');
    });
  }
  nextStep = () => {
    this.step++;
  };
  openModal = () => {
    this.store.openModal('card-order-confirmed');
  };
  backStep() {
    if (this.step == 2) this.step--;
    else this.router.navigate(['dashboard/cards']);
  }
  setActiveScheme(name: string) {
    this.activeScheme = name;
  }
  activeModal = computed(() => {
    const modals = this.store.modals();
    return Object.keys(modals).find((key) => modals[key]);
  });
}
