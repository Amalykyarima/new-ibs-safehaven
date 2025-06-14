import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { GeneralService } from '../../../resources/services/general.service';
import { AccountsService } from '../../../resources/services/accounts.service';
import { TransferService } from '../../../resources/services/transfer.service';
import { SettingsService } from '../../../resources/services/settings.service';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../../components/dashboard/header/header.component";
import { DropdownComponent } from "../../../common/utilities/dropdown/dropdown.component";
import { Location } from '@angular/common';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, DropdownComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  activeDropdown: 'financial' | 'reward' | 'settings' | null = null;
  buttonPosition?: DOMRect;

  activeItem: string = ''; // or set default like 'Home'

  topUpOptionsVisible = false;
  FinancialOptionsVisible = false;
  RewardOptionsVisible = false;
  SettingsOptionsVisible = false;

  showTopUpOptions = false;
  showFinancialOptions = false;
  showRewardOptions = false;
  showSettingsOptions = false;

  environment: typeof environment = environment;
  fetchingData: boolean = true;
  currentUser: any = {};
  emailVerified: any;
  checkStatus: string = '';
  headerTitle: string = '';
  showHeaderBackButton: boolean = false;
  totalTransfersRequiringApproval: number = 0;
  openSideBar!: boolean;
  backUrl: string = '';
  urlQuery: any = {};
  processLoading: boolean = false;
  clientData: any = {};


  // constructor(public router: Router) {}
  constructor(
    public router: Router,
    // public message: NzMessageService,
    private titleService: Title,
    private generalService: GeneralService,
    private accountsService: AccountsService,
    private transferService: TransferService,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.titleService.setTitle('Dashboard | Safe Haven');
  }

  topUpItems = [
    { icon: 'mobile', label: 'Buy Airtime', active: false },
    { icon: 'wifi', label: 'Buy Data', active: false },
    { icon: 'tv', label: 'Cable TV', active: false },
    { icon: 'bills', label: 'Pay Utility Bills', active: false }
  ];

  financialItems = [
    { icon: 'card', label: 'Cards', active: false },
    { icon: 'loan', label: 'Loans', active: false },
    { icon: 'transfer', label: 'Transfer History', active: false },
    { icon: 'vas', label: 'Vas History', active: false },
    { icon: 'statement', label: 'Statements', active: false },
    { icon: 'recurring', label: 'Recurring Transactions', active: false }
  ];

  rewardItems = [
    { icon: 'daily', label: 'Daily Check-ins', active: false },
    { icon: 'promo', label: 'Promo Hub', active: false },
  ];


  iconMap = {
    'Buy Airtime': 'assets/icons/mobile.svg',
    'Buy Airtime-active': 'assets/icons/mobile-active.svg',
    'Buy Data': 'assets/icons/wifi.svg',
    'Buy Data-active': 'assets/icons/wifi-active.svg',
    'Cable TV': 'assets/icons/tv.svg',
    'Cable TV-active': 'assets/icons/tv-active.svg',
    'Pay Utility Bill': 'assets/icons/tv-active.svg',
    'Pay Utility Bill-active': 'assets/icons/tv-active.svg',
  };


  collapsibleMenuItems = [
    {
      icon: '/delivery-delivery--shipment.svg',
      label: 'Financial Tools',
      expanded: false
    },
    {
      icon: '/holidays-party-confetti.svg',
      label: 'Reward Center',
      expanded: false
    }
  ];

  ngOnInit(): void {
    this.getUserData();
    this.totalTransfersRequiringApproval = 0;
    // this.getTransfers();
    this.setTitle(this.location.path());
    this.location.onUrlChange((url) => {
      this.refreshUserData();
      // this.getTransfers();
      this.setTitle(url);
      if (window.innerWidth <= 768) {
        this.openSideBar = false;
      }
    });
  }



  toggleTopUpOptions() {
    this.showTopUpOptions = !this.showTopUpOptions;
  }


  toggleDropdown(type: 'financial' | 'reward' | 'settings', event: MouseEvent) {
    event.stopPropagation();
    const button = event.currentTarget as HTMLElement;
    this.buttonPosition = button.getBoundingClientRect();
    this.activeDropdown = this.activeDropdown === type ? null : type;
  }

  getItems(type: string): string[] {
    switch (type) {
      case 'financial': return ['Payment Options', 'Transaction History', 'Financial Reports'];
      case 'reward': return ['My Rewards', 'Available Offers', 'Reward History'];
      case 'settings': return ['Account Settings', 'Notifications', 'Privacy', 'Logout'];
      default: return [];
    }
  }

  onItemSelected(item: string) {
    console.log('Selected:', item);
    this.activeDropdown = null;
  }

  @HostListener('document:click')
  closeDropdown() {
    this.activeDropdown = null;
  }

  // setActive(item: string) {
  //   // console.log('item', item)
  //   if (item === 'Top Up') {
  //     this.topUpOptionsVisible = !this.topUpOptionsVisible;
  //     this.showTopUpOptions = !this.showTopUpOptions;
  //     this.showFinancialOptions = false;
  //     this.showSettingsOptions = false;
  //     this.showRewardOptions = false;
  //     console.log('top',item, this.showTopUpOptions)
  //   } if (item === 'Financial') {
  //     this.FinancialOptionsVisible = !this.FinancialOptionsVisible;
  //     this.showFinancialOptions = !this.showFinancialOptions;
  //     console.log('finan',item,this.showFinancialOptions)
  //     this.showTopUpOptions = false;
  //     this.showSettingsOptions = false;
  //     this.showRewardOptions = false;

  //   } if (item === 'Reward') {
  //     this.RewardOptionsVisible = !this.RewardOptionsVisible;
  //     this.showRewardOptions = !this.showRewardOptions;
  //     console.log('rew',item)
  //     this.showTopUpOptions = false;
  //     this.showSettingsOptions = false;
  //     this.showFinancialOptions = false;

  //   }
  //   else {
  //     this.topUpOptionsVisible = false;
  //     this.FinancialOptionsVisible = false;
  //     this.SettingsOptionsVisible = false;
  //     this.RewardOptionsVisible = false;
  //   }
  //   this.activeItem = item;

  // }

  setActive(item: string) {
    this.activeItem = item;

    // Map your menu items to route paths
    const routeMap: { [key: string]: string } = {
      'Dashboard': '',
      'Account': 'account',
      'Transfer': 'transfer',
      'Top Up': 'top-up',
      'Financial': 'financial',
      'Reward': 'rewards'
    };

    // Navigate to the corresponding route
    if (routeMap[item]) {
      this.router.navigate([routeMap[item]]);
    }

    // Keep your existing toggle logic if needed for UI effects
    if (item === 'Top Up') {
      this.topUpOptionsVisible = !this.topUpOptionsVisible;
      this.showTopUpOptions = !this.showTopUpOptions;
      this.showFinancialOptions = false;
      this.showSettingsOptions = false;
      this.showRewardOptions = false;
    }
    else if (item === 'Financial') {
      this.FinancialOptionsVisible = !this.FinancialOptionsVisible;
      this.showFinancialOptions = !this.showFinancialOptions;
      this.showTopUpOptions = false;
      this.showSettingsOptions = false;
      this.showRewardOptions = false;
    }
    else if (item === 'Reward') {
      this.RewardOptionsVisible = !this.RewardOptionsVisible;
      this.showRewardOptions = !this.showRewardOptions;
      this.showTopUpOptions = false;
      this.showSettingsOptions = false;
      this.showFinancialOptions = false;
    }
    else {
      this.topUpOptionsVisible = false;
      this.FinancialOptionsVisible = false;
      this.SettingsOptionsVisible = false;
      this.RewardOptionsVisible = false;
    }
  }


  // underDevelopment() {
  //   this.message.create(
  //     'error',
  //     `This page is under development. Thanks for your patience!`
  //   );
  // }
  getEnvironment = () => {
    return (
      window.location.href.includes('sandbox') ||
      window.location.href.includes('localhost')
    );
  };

  async getUserData() {
    this.fetchingData = true;
    this.currentUser = await this.generalService.refreshUserData();
    console.log(this.currentUser, 'this.currentUser')
    this.checkAccount();

    this.clientData = { ...this.currentUser };
    this.fetchingData = false;
  }

  async refreshUserData() {
    this.currentUser = await this.generalService.refreshUserData();
    this.checkAccount();
  }

  checkAccount() {
    this.checkStatus = this.currentUser.client.status;
  }

  async getTransfers() {
    let res: any = await this.transferService
      .transfers('', 0, 1, '', 'Initiated', new Date(0), '', '')
      .toPromise();
    this.totalTransfersRequiringApproval = res.pagination.total;
  }

  async openCompliance() {
    this.processLoading = true;
    let token = await this.fetchComplianceToken();
    this.processLoading = false;
    if (token == '') {
      return;
    }
    window.open(this.environment.complianceUrl + `?token=${token}`, '_blank');
  }

  async fetchComplianceToken() {
    try {
      let res: any = await this.settingsService
        .createComplianceToken(this.clientData.client._id)
        .toPromise();

      if (res.statusCode !== 200) {
        return '';
      }
      return res.data.jwtToken;
    } catch (e) {
      return '';
    }
  }

  setTitle(url: string) {
    if (
      url === '/dashboard' ||
      url === '/dashboard/' ||
      url === '/dashboard/home'
    ) {
      this.headerTitle = 'DASHBOARD';
      this.showHeaderBackButton = false;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (
      url === '/dashboard/accounts' ||
      url === '/dashboard/accounts/'
    ) {
      this.headerTitle = 'ACCOUNTS';
      this.showHeaderBackButton = false;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (
      url !== '/dashboard/accounts' &&
      url !== '/dashboard/accounts/' &&
      url.includes('/dashboard/accounts') &&
      !url.includes('/documents')
    ) {
      this.headerTitle = 'ACCOUNTS';
      this.showHeaderBackButton = true;
      this.backUrl = '/dashboard/accounts';
      this.urlQuery = {};
    } else if (
      url !== '/dashboard/accounts' &&
      url !== '/dashboard/accounts/' &&
      url.includes('/dashboard/accounts') &&
      url.includes('/documents')
    ) {
      this.headerTitle = 'ACCOUNTS';
      this.showHeaderBackButton = true;
      let check = url.split('/');
      this.backUrl = `/dashboard/accounts/${check[3]}`;
      this.urlQuery = { tab: 'documents' };
    } else if (url.includes('/dashboard/cards')) {
      this.headerTitle = 'CARDS';
      this.showHeaderBackButton = false;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (url.includes('/dashboard/statement')) {
      this.headerTitle = 'ACCOUNT STATEMENT';
      this.showHeaderBackButton = false;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (url.includes('/dashboard/sub-statement')) {
      this.headerTitle = 'SUB ACCOUNT STATEMENT';
      this.showHeaderBackButton = false;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (
      ['/dashboard/transfer', '/dashboard/transfer/'].includes(url) ||
      url == '/dashboard/transfer/bulk'
    ) {
      this.headerTitle = 'FUND TRANSFER';
      this.showHeaderBackButton = false;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (['/dashboard/audit'].includes(url)) {
      this.headerTitle = 'AUDIT LOGS';
      this.showHeaderBackButton = false;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (
      url === '/dashboard/settings' ||
      url === '/dashboard/settings/'
    ) {
      this.headerTitle = 'SETTINGS';
      this.showHeaderBackButton = false;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (url.includes('/dashboard/settings?tab=')) {
      this.headerTitle = 'SETTINGS';
      this.showHeaderBackButton = false;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (url.includes('settings/users')) {
      this.headerTitle = 'SETTINGS';
      this.showHeaderBackButton = true;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (url.includes('settings/directors')) {
      this.headerTitle = 'SETTINGS';
      this.showHeaderBackButton = true;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (url.includes('settings/referees')) {
      this.headerTitle = 'SETTINGS';
      this.showHeaderBackButton = true;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (url.includes('settings/app')) {
      this.headerTitle = 'SETTINGS';
      this.showHeaderBackButton = true;
      this.backUrl = '/dashboard/settings';
      this.urlQuery = { tab: 'oauth' };
    } else if (
      ['/dashboard/activate-account', '/dashboard/activate-account/'].includes(
        url
      )
    ) {
      this.headerTitle = 'ACTIVATE ACCOUNT';
      this.showHeaderBackButton = false;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (
      ['/dashboard/transfer-history', '/dashboard/transfer-history/'].includes(
        url
      )
    ) {
      this.headerTitle = 'TRANSFER HISTORY';
      this.showHeaderBackButton = false;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (
      [
        '/dashboard/approve-transaction',
        '/dashboard/approve-transaction/',
      ].includes(url)
    ) {
      this.headerTitle = 'APPROVE TRANSFERS';
      this.showHeaderBackButton = false;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (
      ['/dashboard/airtime-data', '/dashboard/airtime-data/'].includes(url)
    ) {
      this.headerTitle = 'AIRTIME & DATA';
      this.showHeaderBackButton = false;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (['/dashboard/bills', '/dashboard/bills/'].includes(url)) {
      this.headerTitle = 'BILL PAYMENTS';
      this.showHeaderBackButton = false;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (
      ['/dashboard/vas-history', '/dashboard/vas-history/'].includes(url)
    ) {
      this.headerTitle = 'TRANSACTION HISTORY';
      this.showHeaderBackButton = false;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (['/dashboard/webhooks', '/dashboard/webhooks/'].includes(url)) {
      this.headerTitle = 'WEBHOOKS';
      this.showHeaderBackButton = false;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (url === '/dashboard/loans' || url === '/dashboard/loans/') {
      this.headerTitle = 'LOANS';
      this.showHeaderBackButton = false;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (
      url.includes('loans') &&
      url.length > '/dashboard/loans/'.length
    ) {
      this.headerTitle = 'LOANS';
      this.showHeaderBackButton = true;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (
      url === '/dashboard/overdraft' ||
      url === '/dashboard/overdraft/'
    ) {
      this.headerTitle = 'OVERDRAFT';
      this.showHeaderBackButton = false;
      this.backUrl = '';
      this.urlQuery = {};
    } else if (url.length > '/dashboard/overdraft'.length) {
      this.headerTitle = 'OVERDRAFT';
      this.showHeaderBackButton = true;
      this.backUrl = '';
      this.urlQuery = {};
    }
  }

  validateAccessControlType = (accessControl: any[], type: string) => {
    if (accessControl.length === 0) return false;
    else {
      const isAllowed = accessControl.find(
        (a) =>
          a.accessType === type ||
          a.accessType === 'Admin' ||
          a.accessType === 'Owner'
      );
      if (isAllowed) return true;
      else return false;
    }
  };

}
