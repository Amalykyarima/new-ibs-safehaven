import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SwitchComponent } from '../../../common/utilities/switch/switch.component';
import { InputComponent } from '../../../common/utilities/input/input.component';
import { AvatarIconComponent } from '../../../common/utilities/avatar-icon/avatar-icon.component';
import { ButtonFilledComponent } from '../../../common/utilities/button-filled/button-filled.component';
import { DisplayStore } from '../../../stores/display.store';
import { ModalComponent } from "../../../common/utilities/modal/modal.component";
import { ConfirmTransactionComponent } from "../../../components/modals/confirm-transaction/confirm-transaction.component";
import { TransactionPinComponent } from "../../../components/modals/transaction-pin/transaction-pin.component";
import { BankSelectComponent } from "../../../components/modals/bank-select/bank-select.component";
import { SuccessfulTransferComponent } from "../../../components/modals/successful-transfer/successful-transfer.component";
import { BeneficiariesListComponent } from "../../../components/modals/beneficiaries-list/beneficiaries-list.component";
import { environment } from '../../../../environments/environment';
import { NewTransfer } from '../../../resources/models/transfer';
import { GeneralService } from '../../../resources/services/general.service';
import { TransferService } from '../../../resources/services/transfer.service';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);


@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SwitchComponent,
    InputComponent,
    AvatarIconComponent,
    ButtonFilledComponent,
    ModalComponent,
    ConfirmTransactionComponent,
    TransactionPinComponent,
    BankSelectComponent,
    SuccessfulTransferComponent,
    BeneficiariesListComponent
  ],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss',
})
export class TransferComponent implements OnInit {
  readonly store = inject(DisplayStore);
  isToggled: boolean = false;
  transferSteps: number = 1;
  receivingSelected: boolean = false;
  sendingSelected: boolean = false;
  activePage: string = '';
  banks: any = [];

  // dsfsdf
  env = environment;
  selectedOption: number = 0;
  saveUser: boolean = false;
  modalToggle: boolean = false;
  sameBeneficiariesModalToggle: boolean = false;
  confirmTransferModal: boolean = false;
  transferSuccessModal: boolean = false;
  fetchingData: boolean = true;
  accounts: any = [];
  bankModalToggle: boolean = false;
  selectedBank: any = {};
  selectedSendingAccountNumber: any = '';
  selectedSendingAccount: any = {};
  beneficiaries: any = [];
  sameBankBeneficiaries: any = [];
  selectedBeneficiaryAccountNumber: any = '';
  selectedBeneficiaryAccount: any = {};
  selectedBeneficiary: any = {};
  beneficiarySelected: boolean = false;
  newTransfer: NewTransfer;
  nameEnquiry: any = {};
  transferDetails: any = {};
  selectedTransfer: any = {};
  bankErrorMessage: string = '';
  errorMessage: string = '';
  searchingAccount: boolean = false;
  processLoading: boolean = false;
  currentUser: any = {};

  sameAccountTransfer = false;

  hasTransferAccess = true;

  beneficiaryBankName: string = 'Select a Bank';
  beneficiaryBankLogoUrl: string = '';
  showBankModal: boolean = false;

  // Bankcodes
  bankCode: string = this.env.bankCode;

  @Input() inputSpinner: boolean = false;

  constructor(
    // private router: Router,
    // private accountsService: AccountsService,
    private transferService: TransferService,
    // private notification: NzNotificationService,
    private generalService: GeneralService,
    // private currencyPipe: CurrencyPipe
  ) {
    this.newTransfer = new NewTransfer();
    this.nameEnquiry.accountName = '';
  }


  ngOnInit(): void {
    this.getBanks();
    this.getBeneficiaries();
  }

  getBanks() {
    console.log('getBanks',)

    this.fetchingData = true;
    this.transferService.bankList().subscribe((res: any) => {
      this.banks = res.data.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      );
      console.log('this.banks', this.banks)
      this.fetchingData = false;
    });
  }

  startLoadingInput() {
    this.inputSpinner = true;
    // setTimeout(() => this.inputSpinner = false, 2000);
  }

  bankChanged() {
    this.beneficiaryBankName = this.selectedBank?.name ?? 'Select a Bank';
    this.beneficiaryBankLogoUrl = this.selectedBank?.logoImage;
    console.log('bankChanged', this.beneficiaryBankName)
    // this.form.get('beneficiaryBankCode')!.setValue(this.selectedBank?.bankCode ?? '')
  }

  selectOption(n: number) {
    this.selectedOption = n;
    // Reset Variables
    this.newTransfer = new NewTransfer();
    this.nameEnquiry = {};
    this.nameEnquiry.accountName = '';
    this.bankErrorMessage = '';
    this.errorMessage = '';
    this.beneficiarySelected = false;
    this.selectedBeneficiary = {};
    // Set bank code for Safe Haven
    if (n === 1) {
      this.newTransfer.beneficiaryBankCode = this.bankCode;
      this.selectedSendingAccount = this.accounts[0];
      this.selectedBeneficiaryAccount =
        this.accounts.length > 1 ? this.accounts[1] : this.accounts[0];
    } else if (n === 2) {
      this.newTransfer.beneficiaryBankCode = this.bankCode;
      this.sameAccountTransfer = false;
    }
    if (n === 2 || n === 3) {
      this.getBeneficiaries();
    }
    this.sameAccountTransfer = false;
    gsap.to(window, { duration: 1, scrollTo: 150 });
  }

  getBeneficiaries() {
    this.beneficiarySelected = false;
    this.selectedBeneficiary = {};
    this.transferService.beneficiaries().subscribe((res: any) => {
      this.beneficiaries = res.data;
      this.sameBankBeneficiaries = this.beneficiaries.filter(
        (element: any) =>
          element.bankCode === this.newTransfer.beneficiaryBankCode
      );
      this.beneficiaries.forEach((element: any) => {
        let sameBank = this.banks.filter(
          (bank: any) => parseInt(bank.bankCode) === parseInt(element.bankCode)
        );
        // Add bank name
        if (sameBank.length === 1) {
          element.bank = sameBank[0].name;
        }
      });
      // this.fetchingData = false;
    });
    console.log('beneficiaries', this.beneficiaries, this.sameBankBeneficiaries)
  }


  deletedBeneficiary(event: any) {
    if (event.statusCode === 200) {
      // this.notification.success(
      //   'Beneficiary deleted successfully',
      //   event.message
      // );
      this.getBeneficiaries();
    }
  }

  async changeBeneficiary(event: any) {
    if (event._id != null) {
      this.beneficiarySelected = true;
      this.newTransfer.beneficiaryAccountNumber = event.accountNumber;
      this.newTransfer.beneficiaryBankCode = event.bankCode;
      await this.searchAccountNumber();
    } else {
      this.beneficiarySelected = false;
      this.newTransfer.beneficiaryAccountNumber = '';
      this.newTransfer.beneficiaryBankCode = '';
    }
  }

  checkFormat(event: any) {
    this.newTransfer.beneficiaryAccountNumber =
      this.newTransfer.beneficiaryAccountNumber.replace(/\D/g, '');
    this.newTransfer.beneficiaryAccountNumber =
      this.newTransfer.beneficiaryAccountNumber.replace(/ /g, '');
    this.newTransfer.beneficiaryAccountNumber =
      this.newTransfer.beneficiaryAccountNumber.trim();

    return /^\d+$/.test(event.key);
  }

  searchAccountNumber(event?: any) {
    console.log('searchAccountNumber', event)
    this.newTransfer.beneficiaryAccountNumber = event;
    this.newTransfer.beneficiaryAccountNumber = this.newTransfer.beneficiaryAccountNumber.trim();
    this.newTransfer.beneficiaryAccountNumber = this.newTransfer.beneficiaryAccountNumber + '';
    this.nameEnquiry = {};
    this.nameEnquiry.accountName = '';
    this.selectedBank = this.banks.find(
      (item: any) => item.bankCode == this.newTransfer.beneficiaryBankCode
    );
    console.log('searchAccountNumber', this.newTransfer.beneficiaryAccountNumber.length)

    if (
      this.newTransfer.beneficiaryAccountNumber.length === 10 &&
      this.newTransfer.beneficiaryBankCode !== ''
    ) {
      this.inputSpinner = true;
      if (this.selectedOption === 1) {
        this.searchAccount(
          this.newTransfer.beneficiaryBankCode,
          this.newTransfer.beneficiaryAccountNumber
        );
      } else if (this.selectedOption === 2) {
        this.searchAccount(
          this.newTransfer.beneficiaryBankCode,
          this.newTransfer.beneficiaryAccountNumber
        );
      } else if (this.selectedOption === 3) {
        this.searchAccount(
          this.newTransfer.beneficiaryBankCode,
          this.newTransfer.beneficiaryAccountNumber
        );
      }
    } else {
      this.beneficiarySelected = false;
      this.selectedBeneficiary = {};
    }
  }

  async searchAccount(bankCode: string, number: string) {
    this.bankErrorMessage = '';
    this.searchingAccount = true;
    let data = {
      bankCode: bankCode,
      accountNumber: number,
    };
    try {
      let res: any = await this.transferService.nameEnquiry(data).toPromise();
      if (res.statusCode === 200) {
        this.nameEnquiry = res.data;
        this.newTransfer.nameEnquiryReference = res.data.sessionId;
        this.transferDetails = { ...this.newTransfer };
        this.transferDetails.amount = parseFloat(
          this.newTransfer.amount.replace(/[^\d.]/g, '')
        );
        this.transferDetails.to = this.nameEnquiry.accountName;
        this.transferDetails.date = new Date();
        this.transferDetails.currency =
          this.selectedSendingAccount.currencyCode;
        this.transferDetails.bankName =
          this.selectedOption === 1 || this.selectedOption === 2
            ? 'Safe Haven MicroFinance Bank'
            : this.banks.find(
              (bank: any) =>
                bank.bankCode === this.newTransfer.beneficiaryBankCode
            ).name;
        this.searchingAccount = false;

        // Hide "Save Beneficiary if entered account number is already a beneficiary";
        let checkBeneficiariesList = this.beneficiaries.find((item: any) => {
          return item.accountNumber === number;
        });
        if (checkBeneficiariesList) {
          this.beneficiarySelected = true;
        }
      } else {
        this.bankErrorMessage = res.message;
        this.searchingAccount = false;
      }
    } catch (e) {
      this.bankErrorMessage = 'An error occured. Please try again';
      this.searchingAccount = false;
    }
  }

  setActivePage(page: string) {
    this.activePage = page;
  }
  forward = () => {
    this.transferSteps++;
  };
  backward = () => {
    this.transferSteps--;
  };
  confirmTransaction = () => {
    this.store.openModal('confirm-transaction')
  }
  jumpToStep(step: number) {
    this.transferSteps = step;
  }
  toggleSending = () => {
    this.sendingSelected = !this.sendingSelected;
  };
  toggleReceiving = () => {
    this.receivingSelected = !this.receivingSelected;
  };
  activeModal = computed(() => {
    const modals = this.store.modals();
    return Object.keys(modals).find((key) => modals[key]);
  });
  closeBankModal() {
    console.log('closeBank Modal')
    this.store.closeModal('bank-select')
  }

}
