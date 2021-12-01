// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


const URL_CONSTANTS_DEV = {
  API_BASE_URL: 'http://localhost:8080/api/v1',
  CLIENT_BASE_URL: 'http://localhost:4200'
};

export const environment = {
  production: false,
  urls: {
    API_BASE_URL: URL_CONSTANTS_DEV.API_BASE_URL,
    CLIENT_BASE_URL: URL_CONSTANTS_DEV.CLIENT_BASE_URL,
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
