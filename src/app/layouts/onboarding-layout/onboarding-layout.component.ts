import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';





@Component({
  selector: 'app-onboarding-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './onboarding-layout.component.html',
  styleUrl: './onboarding-layout.component.scss'
})

export class OnboardingLayoutComponent {
  @Input() accountType: 'Individual' | 'Corporate' = 'Individual';
  @Input() hideTab: boolean = false;
  @Input() hideNavigation: boolean = false;
  @Input() showSignIn: boolean = false;
  @Input() userInfo: any = {};
  @Output() switchAccountType: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private routes: ActivatedRoute) {}

  // path = window.location.href;
  path: string = '';



  ngOnInit(): void {
    this.routes.params.subscribe((paths:any)=>{

      this.accountType = paths && paths.params? paths.params.type: 'Individual';
    })
    if (typeof window !== 'undefined') {
      this.path = window.location.href;
    }
  }

  @Input() display: any = {
    title: '',
    label: '  ',
  };

  switchAccountType_ = (type: 'Individual' | 'Corporate') => {
    this.accountType = type;
    this.switchAccountType.emit(type);
  };

  navigate = () => {
    this.router.navigate(['/signin'], {
      queryParams: this.userInfo,
    });
  };
}
