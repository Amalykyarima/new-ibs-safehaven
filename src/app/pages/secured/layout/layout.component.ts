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



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, DropdownComponent],
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


  constructor(public router: Router) {}

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
    'Pay Utility Bill':'assets/icons/tv-active.svg',
    'Pay Utility Bill-active':'assets/icons/tv-active.svg',
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
    switch(type) {
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

setActive(item: string) {
  // console.log('item', item)
  if (item === 'Top Up') {
    this.topUpOptionsVisible = !this.topUpOptionsVisible;
    this.showTopUpOptions = !this.showTopUpOptions;
    this.showFinancialOptions = false;
    this.showSettingsOptions = false;
    this.showRewardOptions = false;
    console.log('top',item, this.showTopUpOptions)
  } if (item === 'Financial') {
    this.FinancialOptionsVisible = !this.FinancialOptionsVisible;
    this.showFinancialOptions = !this.showFinancialOptions;
    console.log('finan',item,this.showFinancialOptions)
    this.showTopUpOptions = false;
    this.showSettingsOptions = false;
    this.showRewardOptions = false;

  } if (item === 'Reward') {
    this.RewardOptionsVisible = !this.RewardOptionsVisible;
    this.showRewardOptions = !this.showRewardOptions;
    console.log('rew',item)
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
  this.activeItem = item;

}

}
