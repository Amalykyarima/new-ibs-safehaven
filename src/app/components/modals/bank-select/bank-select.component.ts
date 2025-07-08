// import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchComponent } from "../../../common/utilities/search/search.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bank-select',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './bank-select.component.html',
  styleUrl: './bank-select.component.scss'
})
export class BankSelectComponent implements OnInit {
  filteredBanks: Array<any> = [];
  readonly featuredBanks = [
    {
      name: 'ACCESS BANK',
      alias: ['ACCESS BANK'],
      routingKey: '000014',
      logoImage: null,
      bankCode: '000014',
      categoryId: '2',
      nubanCode: null
    },
    {
      name: 'ZENITH BANK',
      alias: ['ZENITH BANK'],
      routingKey: '000015',
      logoImage: null,
      bankCode: '000015',
      categoryId: '2',
      nubanCode: null
    },
    {
      name: 'UBA',
      alias: ['UBA'],
      routingKey: '000016',
      logoImage: null,
      bankCode: '000016',
      categoryId: '2',
      nubanCode: null
    },
    {
      name: 'GTBANK',
      alias: ['GTBANK'],
      routingKey: '000017',
      logoImage: null,
      bankCode: '000017',
      categoryId: '2',
      nubanCode: null
    },
    {
      name: 'FIRST BANK',
      alias: ['FIRST BANK'],
      routingKey: '000018',
      logoImage: null,
      bankCode: '000018',
      categoryId: '2',
      nubanCode: null
    }
  ];

  filteredList: Array<any> = [];
  @Input() banks: Array<any> = [];
  @Input() toggleModal: boolean = false;
  @Output() toggleModalChange: EventEmitter<boolean> = new EventEmitter();
  // selectedBank: any = {};
  @Input() selectedBank: any;
  @Input() selectedBankCode: any = '';
  @Output() selectedBankCodeChange: EventEmitter<any> = new EventEmitter();
  @Output() selectedBankChange: EventEmitter<any> = new EventEmitter();
  bank: any;
  constructor() {

  }


  ngOnInit(): void {
    console.log('bank-list ngonit', this.banks)
  }

  ngOnChanges():void {
    this.filterBanks();
  }

//   filterBanks() {
//     this.filteredBanks = this.banks;
// }
filterBanks() {
  const featuredBanks = [
    {
      name: 'OPAY',
      alias: ['OPAY'],
      routingKey: '000018',
      logoImage: null,
      bankCode: '000018',
      categoryId: '2',
      nubanCode: null
    },
    {
      name: 'GTBANK',
      alias: ['GTBANK'],
      routingKey: '000017',
      logoImage:'../../../../assets/images/banks/gtbank.svg',
      bankCode: '000017',
      categoryId: '2',
      nubanCode: null
    },
    {
      name: 'ACCESS BANK',
      alias: ['ACCESS BANK'],
      routingKey: '000014',
      logoImage: '../../../../assets/images/banks/access.svg',
      bankCode: '000014',
      categoryId: '2',
      nubanCode: null
    },
    {
      name: 'UBA',
      alias: ['UBA'],
      routingKey: '000016',
      logoImage: '../../../../assets/images/banks/uba.svg',
      bankCode: '000016',
      categoryId: '2',
      nubanCode: null
    },


  ];

  // Remove duplicates by filtering out any banks that already exist in `this.banks`
  const remainingBanks = this.banks.filter(
    bank => !featuredBanks.find(fb => fb.bankCode === bank.bankCode)
  );

  this.filteredBanks = [...featuredBanks, ...remainingBanks];
}

  selectBank(bank: any) {
    console.log('selectBank', bank)

    this.selectedBank = bank;
    this.selectedBankChange.emit(this.selectedBank);
    // Close after a short while
    setTimeout(() => {
        this.handleCancel()
    }, 200);
}

  selectItem(item: any): void {
    this.selectedBank = item;
    this.selectedBankCode = item.bankCode;
    this.selectedBankCodeChange.emit(this.selectedBankCode);
    setTimeout(() => {
      this.toggleModal = false;
      this.toggleModalChange.emit(this.toggleModal);
    }, 200);
  }

  handleCancel(): void {
    this.toggleModal = false;
    this.toggleModalChange.emit();
  }

  filterList(event: any): void {
    let query = ((event.target as HTMLInputElement).value).toLowerCase();
    if (query == '') {
      this.filteredList = this.banks.filter((item: any) => {
        return item.bankCode != this.selectedBankCode;
      });
    }
    else {
      this.filteredList = this.banks.filter((item: any) => {
        let bank = item.name.toLowerCase();
        return bank.includes(query);
      })
    }
  }

}
