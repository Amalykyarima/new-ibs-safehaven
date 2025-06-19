import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { OnboardingReducer, onboardingFeatureKey } from './resources/store/onboarding/onboarding.reducer';
import { AuthGuard } from './resources/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  // {
  //   path: 'secured',
  //   loadChildren: () =>
  //     import('./pages/secured/layout/layout.routes').then(m => m.layoutRoutes),
  // },
  {
    path: 'signin',
    loadComponent: () =>
      import('./pages/public/login/login.component').then((m) => m.LoginComponent),
      providers: [
        provideState(onboardingFeatureKey, OnboardingReducer)
      ],
  },
  {
    path: 'identity',
    loadComponent: () =>
      import('./layouts/identity-verification-layout/identity-verification-layout.component').then((m) => m.IdentityVerificationLayoutComponent),

  },
  {
    path: 'create-account',
    loadComponent: () =>
      import('./pages/public/create-account/create-account.component').then((m) => m.CreateAccountComponent),

  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/public/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),

  },
  {
    path: 'two-factor-authentication',
    loadComponent: () =>
      import('./pages/secured/two-fa/two-fa.component').then((m) => m.TwoFaComponent),
      providers: [
        provideState(onboardingFeatureKey, OnboardingReducer)
      ],

  },
  {
    path: 'dashboard',
    loadComponent: () =>
    import('./pages/secured/layout/layout.component').then((m) => m.LayoutComponent),
    providers: [
      provideState(onboardingFeatureKey, OnboardingReducer)
    ],

  },
  // {
  //   path: 'setup-account',
  //   loadComponent: () =>
  //   import('./pages/secured/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  // },
  {
    path: 'setup-account-corporate',
    loadComponent: () =>
    import('./pages/public/setup-account/setup-account.component').then((m) => m.SetupAccountComponent),
    providers: [
      provideState(onboardingFeatureKey, OnboardingReducer)
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
