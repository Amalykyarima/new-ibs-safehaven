import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  navItems: any = [
    {
      label: 'Home',
      icon: 'default-home.svg',
      iconActive: 'home-blue.svg',
      link: '',
    },
    {
      label: 'Accounts',
      icon: 'coins.svg',
      iconActive: 'account-blue.svg',
      link: 'accounts',
    },
    {
      label: 'Transfers',
      icon: 'Arrow, Forward.svg',
      iconActive: 'arrow-blue.svg',
      link: 'transfers',
    },
    {
      label: 'Top Up and Bills',
      icon: 'newtopup.svg',
      iconActive: 'topup-blue.svg',
      children: [
        {
          label: 'Buy Airtime',
          icon: 'airtime.svg',
          iconActive: 'airtime-active.svg',
          link: 'buy-airtime',
        },
        {
          label: 'Buy Data',
          icon: 'WiFi.svg',
          iconActive: 'WiFi-active.svg',
          link: 'buy-data',
        },
        {
          label: 'Cable TV',
          icon: 'tv.svg',
          iconActive: 'tv-active.svg',
          link: 'cable-tv',
        },
        {
          label: 'Pay Utility Bills',
          icon: 'utility.svg',
          iconActive: 'utility-active.svg',
          link: 'pay-utility-bills',
        },
      ],
    },
    {
      label: 'Financial Tools',
      icon: 'Delivery, Shipment.svg',
      iconActive: 'delivery-blue.svg',
      children: [
        {
          label: 'Cards',
          icon: 'cards.svg',
          iconActive: 'cards-active.svg',
          link: 'cards',
        },
        {
          label: 'Loan',
          icon: 'loan.svg',
          iconActive: 'loan-active.svg',
          link: 'loan',
        },
        {
          label: 'Transfer History',
          icon: 'transfer-history.svg',
          iconActive: 'transfer-history-active.svg',
          link: 'transfer-history',
        },
        {
          label: 'VAS History',
          icon: 'vas-history.svg',
          iconActive: 'vas-history-active.svg',
          link: 'vas-history',
        },
        {
          label: 'Statements',
          icon: 'statements.svg',
          iconActive: 'statements-active.svg',
          link: 'statements',
        },
        {
          label: 'Recurring Transactions',
          icon: 'recurring.svg',
          iconActive: 'recurring-active.svg',
          link: 'recurring-transactions',
        },
      ],
    },
    {
      label: 'Reward Center',
      icon: 'party-confetti.svg',
      iconActive: 'party-confetti-blue.svg',
      children: [
        {
          label: 'Promo Hub',
          icon: 'promo-hub.svg',
          iconActive: 'promo-hub-active.svg',
          link: 'promo-hub',
        },
      ],
    },
    {
      label: 'Settings',
      icon: 'newsetting.svg',
      iconActive: 'settings-blue.svg',
      link: 'settings',
    },
  ];
  activeItem: any = null;
  activeParent: string = '';
  openMap = new Map<any, boolean>();
  sideModalOpen: boolean = false;
  showModal = false;

  constructor(public router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.findUrl();
  }
  onAnimationEnd() {
    // When slide-out finishes, remove from DOM
    if (!this.sideModalOpen) {
      this.showModal = false;
    }
  }
  toggle(item: any) {
    this.activeItem = item.label;

    if (!item.children && item.link !== undefined) {
      const target =
        item.link === '' ? '/dashboard' : `/dashboard/${item.link}`;
      this.router.navigate([target]).then(() => {
        this.findUrl();
      });
    }
  }
  openSideModal() {
    this.showModal = true;
    this.sideModalOpen = true;
  }
  
  closeSideModal() {
    this.sideModalOpen = false;
  }
  setParent(label: string) {
    this.activeParent = label;
  }
  reverseFormatString(input: string): string {
    if (!input) return '';
    return input
      .split('-')
      .map((word, index) =>
        index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
      )
      .join(' ');
  }

  isOpen(item: any): boolean {
    return this.activeParent === item.label;
  }
  getActivePath = (label: string) => {
    return label === this.activeItem;
  };
  findUrl() {
    const pathSegments = location.pathname.split('/').filter(Boolean);

    const cleanedPath = pathSegments
      .filter((segment) => segment !== 'dashboard' && isNaN(Number(segment)));
  
    let matchedChildLabel: string | null = null;
    let matchedParentLabel: string | null = null;
  
    for (const item of this.navItems) {
      if (item.link === cleanedPath[0]) {
        matchedChildLabel = item.label;
        break;
      }
  
      if (item.children?.length) {
        const childMatch = item.children.find((child: any) => {
          return cleanedPath.includes(child.link);
        });
  
        if (childMatch) {
          matchedChildLabel = childMatch.label;
          matchedParentLabel = item.label;
          break;
        }
      }
    }
  
    this.activeItem = matchedChildLabel || 'Home';
    this.activeParent = matchedParentLabel || '';
  }
  
  

}
