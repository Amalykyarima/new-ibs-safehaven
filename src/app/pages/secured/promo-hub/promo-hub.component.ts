import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-promo-hub',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promo-hub.component.html',
  styleUrl: './promo-hub.component.scss',
})
export class PromoHubComponent {
  promoTypes: string[] = ['Active Promos', 'Expired Promos'];
  activePromos: any[] = [
    {
      id:'1',
      name: 'Save and Earn Cash ',
      description: 'Earn up to ₦5000 when you save ₦250,000 or more in your Safe Haven account for 30days. ',
      expiry: '24th June 2025',
      points: '0',
    },
    {
      id:'2',
      name: 'Earn on Onboarding Tasks',
      description: 'Complete onboarding tasks and earn points up to 500pts',
      expiry: '24th June 2025',
      points: '0',
    },
  ];
  activePromoType: string = 'Active Promos';
 constructor( private router: Router,
    private route: ActivatedRoute) {}
  setPromoType(promoType: string) {
    this.activePromoType = promoType;
  }
  navigateToDetails(id: string) {
    this.router.navigate(['dashboard/promo-hub/details']);
  }
}
