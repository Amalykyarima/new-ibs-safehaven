import { Routes } from '@angular/router';
// import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

// export const layoutRoutes: Routes = [
//   {
//     path: '',
//     component: LayoutComponent,
//     children: [
//       {
//         path: 'dashboard',
//         loadComponent: () =>
//           import('../dashboard/dashboard.component').then(m => m.DashboardComponent),
//       },
//       {
//         path: 'settings',
//         loadComponent: () =>
//           import('../settings/settings.component').then(m => m.SettingsComponent),
//       },
//       // Add more child routes as needed
//     ],
//   },
// ];

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'accounts', component: DashboardComponent },
  { path: 'transfers', component: DashboardComponent }
];
