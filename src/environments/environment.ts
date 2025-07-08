// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
//   apiUrl: 'https://api.sandbox.safehavenmfb.com/',
//   // apiUrl: 'https://api.safehavenmfb.com/',
//   // apiUrl: "https://ibs-api-feature-onboarding-streak-jhendcbria-ew.a.run.app/",
//   bankCode: '999240',
//   privateKey:
//     'bdcUzrwmP2WLxvUU5gepAFeGyh9APwkGcGMJfj64SDmhQrW8WjESj2jG9VLLAxE5',
//   complianceUrl: 'https://paygate-compliance-sandbox.herokuapp.com',
//   identityLivenessUrl: 'https://faceRek-test-sandbox.sudoafrica.site',
//   jwtTokenEncryptionKey: "FwqQrrPPxDe3apSQ8tvA5wZsYfQHUz8RKsgUnt6s3P9ZY3eqQrHnRqsxZfTmHjtP",

// };

export const environment = {
  production: true,
  apiUrl: "https://api.safehavenmfb.com/",
  bankCode: '090286',
  privateKey: 'bdcUzrwmP2WLxvUU5gepAFeGyh9APwkGcGMJfj64SDmhQrW8WjESj2jG9VLLAxE5',
  complianceUrl: 'https://compliance.sudo.africa',
  identityLivenessUrl: 'https://faceRek-test-sandbox.sudoafrica.site',
jwtTokenEncryptionKey: "FwqQrrPPxDe3apSQ8tvA5wZsYfQHUz8RKsgUnt6s3P9ZY3eqQrHnRqsxZfTmHjtP",

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
