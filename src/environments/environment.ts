// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    appName: 'Agube',
    googleMapsApiKey: '',
    // docker-compose.yml contains port config
    authBackendUrl: 'http://localhost:30004/api/v1/auth',
    subscriptionBackendUrl: 'http://localhost:30001/api/v1/subscription',
    contactBookBackendUrl: 'http://localhost:30002/api/v1/contact-book',
    agubeBackendUrl: 'http://localhost:30003/api/v1/agube',
    // taskBackendUrl: 'http://localhost:8004/api/v1/task',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
