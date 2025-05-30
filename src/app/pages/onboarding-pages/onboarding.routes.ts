// onboarding.routes.ts
import { Routes } from '@angular/router';
import { OnboardingPagesComponent } from './onboarding-pages.component';

export const onboardingRoutes: Routes = [
  {
    path: '',
    component: OnboardingPagesComponent,
    children: [
      {
        path: 'signin',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../../pages/public/login/login.component').then((m) => m.LoginComponent),
          },
          // {
          //   path: 'two-factor-authentication',
          //   loadChildren: () =>
          //     import('../two-fa/two-fa.module').then((m) => m.TwoFaModule),
          // },
        ],
      },
      // {
      //   path: 'create-account',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () =>
      //         import('../create-account/create-account.module').then(
      //           (m) => m.CreateAccountModule
      //         ),
      //     },
      //     {
      //       path: ':referral',
      //       loadChildren: () =>
      //         import('../create-account/create-account.module').then(
      //           (m) => m.CreateAccountModule
      //         ),
      //     },
      //   ],
      // },
      // {
      //   path: 'identity/:token',
      //   loadChildren: () =>
      //     import('../new-user-identity/new-user-identity.module').then(
      //       (m) => m.NewUserIdentityModule
      //     ),
      // },
      // {
      //   path: 'onboarding',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () =>
      //         import('../select-user-type/select-user-type.module').then(
      //           (m) => m.SelectUserTypeModule
      //         ),
      //     },
      //     {
      //       path: 'profile-setup/:user-credentials',
      //       loadChildren: () =>
      //         import('../profile-setup/profile-setup.module').then(
      //           (m) => m.ProfileSetupModule
      //         ),
      //     },
      //     {
      //       path: 'identity',
      //       loadChildren: () =>
      //         import('../select-id-type/select-id-type.module').then(
      //           (m) => m.SelectIdTypeModule
      //         ),
      //     },
      //     {
      //       path: 'validation',
      //       loadChildren: () =>
      //         import('../validate-id/validate-id.module').then(
      //           (m) => m.ValidateIdModule
      //         ),
      //     },
      //     {
      //       path: 'otp',
      //       loadChildren: () =>
      //         import('../otp/otp.module').then((m) => m.OtpModule),
      //     },
      //     {
      //       path: 'individual/signup',
      //       loadChildren: () =>
      //         import('../signup-individual/signup-individual.module').then(
      //           (m) => m.SignupIndividualModule
      //         ),
      //     },
      //     {
      //       path: 'company',
      //       children: [
      //         {
      //           path: 'signup',
      //           loadChildren: () =>
      //             import('../signup-company/signup-company.module').then(
      //               (m) => m.SignupCompanyModule
      //             ),
      //         },
      //         {
      //           path: '',
      //           redirectTo: '/onboarding/identity',
      //           pathMatch: 'full',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: 'forgot-password',
      //   loadChildren: () =>
      //     import('../forgot-password/forgot-password.module').then(
      //       (m) => m.ForgotPasswordModule
      //     ),
      // },
      // {
      //   path: 'reset-password/:token',
      //   loadChildren: () =>
      //     import('../reset-password/reset-password.module').then(
      //       (m) => m.ResetPasswordModule
      //     ),
      // },
      // {
      //   path: 'reset-password-with-otp',
      //   loadChildren: () =>
      //     import(
      //       '../reset-password-with-otp/reset-password-with-otp.module'
      //     ).then((m) => m.ResetPasswordWithOtpModule),
      // },
      // {
      //   path: 'invite/:userType/:token',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () =>
      //         import('../invite/invite.module').then((m) => m.InviteModule),
      //     },
      //     {
      //       path: 'validation',
      //       loadChildren: () =>
      //         import('../validate-id/validate-id.module').then(
      //           (m) => m.ValidateIdModule
      //         ),
      //     },
      //     {
      //       path: 'otp',
      //       loadChildren: () =>
      //         import('../otp/otp.module').then((m) => m.OtpModule),
      //     },
      //     {
      //       path: 'signup',
      //       loadChildren: () =>
      //         import('../signup-invite/signup-invite.module').then(
      //           (m) => m.SignupInviteModule
      //         ),
      //     },
      //   ],
      // },
      // {
      //   path: 'authorize',
      //   loadChildren: () =>
      //     import('../authorize/authorize.module').then(
      //       (m) => m.AuthorizeModule
      //     ),
      // },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'signin',
      },
    ],
  },
];
