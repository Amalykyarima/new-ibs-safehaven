import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import {
  OnboardingReducer,
  onboardingFeatureKey,
} from './resources/store/onboarding/onboarding.reducer';
import { AuthGuard } from './resources/auth/auth.guard';
import { AccountComponent } from './pages/secured/account/account.component';
import { TransferComponent } from './pages/secured/transfer/transfer.component';
import { SettingsComponent } from './pages/secured/settings/settings.component';
import { BuyAirtimeComponent } from './pages/secured/buy-airtime/buy-airtime.component';
import { UtilityBillsComponent } from './pages/secured/utility-bills/utility-bills.component';
import { CableTvComponent } from './pages/secured/cable-tv/cable-tv.component';
import { BuyDataComponent } from './pages/secured/buy-data/buy-data.component';
import { CardsComponent } from './pages/secured/cards/cards.component';
import { OrderCardComponent } from './pages/secured/order-card/order-card.component';
import { StatementsComponent } from './pages/secured/statements/statements.component';
import { VasHistoryComponent } from './pages/secured/vas-history/vas-history.component';
import { TransferHistoryComponent } from './pages/secured/transfer-history/transfer-history.component';
import { LoanComponent } from './pages/secured/loan/loan.component';
import { PromoHubComponent } from './pages/secured/promo-hub/promo-hub.component';
import { RecurringTransactionDetailsComponent } from './pages/secured/recurring-transaction-details/recurring-transaction-details.component';
import { RecurringTransactionComponent } from './pages/secured/recurring-transaction/recurring-transaction.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  // {
  //   path: 'secured',
  //   loadChildren: () =>
  //     import('./pages/secured/layout/layout.routes').then(m => m.layoutRoutes),
  // },
  {
    path: 'signin',
    loadComponent: () =>
      import('./pages/public/login/login.component').then(
        (m) => m.LoginComponent
      ),
    providers: [provideState(onboardingFeatureKey, OnboardingReducer)],
  },
  {
    path: 'identity',
    loadComponent: () =>
      import(
        './layouts/identity-verification-layout/identity-verification-layout.component'
      ).then((m) => m.IdentityVerificationLayoutComponent),
    providers: [provideState(onboardingFeatureKey, OnboardingReducer)],
  },
  {
    path: 'create-account',
    loadComponent: () =>
      import('./pages/public/create-account/create-account.component').then(
        (m) => m.CreateAccountComponent
      ),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/public/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
    providers: [provideState(onboardingFeatureKey, OnboardingReducer)],
  },
  {
    path: 'two-factor-authentication',
    loadComponent: () =>
      import('./pages/secured/two-fa/two-fa.component').then(
        (m) => m.TwoFaComponent
      ),
    providers: [provideState(onboardingFeatureKey, OnboardingReducer)],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/secured/layout/layout.component').then(
        (m) => m.LayoutComponent
      ),
    providers: [provideState(onboardingFeatureKey, OnboardingReducer)],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/secured/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'accounts',
        component: AccountComponent,
        title: 'Account',
      },
      {
        path: 'transfers',
        component: TransferComponent,
        title: 'Transfer',
      },
      {
        path: 'settings',
        component: SettingsComponent,
        title: 'Settings',
      },
      {
        path: 'buy-airtime',
        component: BuyAirtimeComponent,
        title: 'Buy Airtime',
      },
      {
        path: 'buy-data',
        component: BuyDataComponent,
        title: 'Buy Data',
      },
      {
        path: 'cable-tv',
        component: CableTvComponent,
        title: 'Cable Tv',
      },
      {
        path: 'pay-utility-bills',
        component: UtilityBillsComponent,
        title: 'Utility Bills',
      },
      {
        path: 'cards',
        component: CardsComponent,
        title: 'Cards',
        children: [
          {
            path: '',
            component: CardsComponent,
            title: 'Cards',
          },
          {
            path: 'order-card/:type',
            component: OrderCardComponent,
            title: 'Order Card',
          },
        ],
      },
      {
        path: 'loan',
        component: LoanComponent,
        title: 'Loan',
      },
      {
        path: 'transfer-history',
        component: TransferHistoryComponent,
        title: 'Transfer History',
      },
      {
        path: 'vas-history',
        component: VasHistoryComponent,
        title: 'VAS History',
      },
      {
        path: 'statements',
        component: StatementsComponent,
        title: 'Statements',
      },
      {
        path: 'recurring-transaction',
        component: RecurringTransactionComponent,
        title: 'Recurring Transaction',
        children: [
          {
            path: '',
            component: RecurringTransactionComponent,
            title: 'Recurring Transaction',
          },
          {
            path: 'details',
            component: RecurringTransactionDetailsComponent,
            title: 'Recurring Transaction Details',
          },
        ],
      },
      {
        path: 'promo-hub',
        component: PromoHubComponent,
        title: 'Promo Hub',
      },
    ],
  },
  // {
  //   path: 'dashboard',
  //   loadComponent: () =>
  //   import('./pages/secured/layout/layout.component').then((m) => m.LayoutComponent),
  //   providers: [
  //     provideState(onboardingFeatureKey, OnboardingReducer)
  //   ],

  // },
  {
    path: 'setup-account-corporate',
    loadComponent: () =>
      import('./pages/public/setup-account/setup-account.component').then(
        (m) => m.SetupAccountComponent
      ),
    providers: [provideState(onboardingFeatureKey, OnboardingReducer)],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
