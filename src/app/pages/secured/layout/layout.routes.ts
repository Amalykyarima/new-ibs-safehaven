// import { Routes } from '@angular/router';
// import { LayoutComponent } from './layout.component';
// import { DashboardComponent } from '../dashboard/dashboard.component';

// export const layoutRoutes: Routes = [
//   {
//     path: '',
//     component: .,
//     children: [

//       // Add more child routes as needed
//     ],
//   },
// ];

// export const routes: Routes = [
//   { path: '', component: DashboardComponent },
//   { path: 'accounts', component: DashboardComponent },
//   { path: 'transfers', component: DashboardComponent }
// ];

import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AccountComponent } from '../account/account.component';
import { TransferComponent } from '../transfer/transfer.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        title: 'Dashboard'
      },
      {
        path: 'account',
        component: AccountComponent,
        title: 'Account'
      },
      {
        path: 'transfer',
        component: TransferComponent,
        title: 'Transfer'
      },
      // { path: 'top-up', component: TopUpComponent, title: 'Top Up' },
      // { path: 'financial', component: FinancialComponent, title: 'Financial' },
      // { path: 'rewards', component: RewardComponent, title: 'Rewards' },
      // Add more child routes here as needed
    ]
  },
  // Add any non-layout routes here
];
