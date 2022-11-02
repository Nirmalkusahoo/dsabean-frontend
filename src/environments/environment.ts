// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl:'http://localhost:8090/',
  register:'api/auth/signup',
  login:'api/v1/auth/login',
  validate:'api/v1/auth/validate',
  generateOtp:'api/v1/auth/generate/otp',
  deleteUser:'api/v1/auth/delete/',
  addCar:'api/v1/manufacturers/models/add',
  fetchManufacturers:'api/v1/manufacturers'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
