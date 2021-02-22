// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: {
  production: boolean,

  cloudCms: {
    projectId: number,
    'subscription-key': string,
    url: string
  },

  submitUserDetails: {
    url: string,
    OcpApimSubscriptionKey: string
  }

  tealium: {
    _account: string,
    _environment: string,
    _profile: string
  }
} = {
  production: false,

  cloudCms: {
    // PROJECT ID THAT CORRESPONDS TO THE CONTENT NEEDED
    // 3110 : projectId for Customer HUB staging
    // 3120 : projectId for Customer HUB production
    projectId: 3110,
    'subscription-key': 'bc2ce3f9493d4fad835b08598a083661',
    url: 'https://dev3-custhub.lle.elevate.com/servicing-as/asdev/ccms/api/CloudCms/'
  },

  submitUserDetails: {
    url: 'https://dev2-custhub.lle.risecredit.com/originations/dev2/marketingcloudsvc/api/MarketingCloud/upsert',
    OcpApimSubscriptionKey: 'b32ee6c6e4f14ff28720c476af1a2f34'
  },

  tealium: {
    _account: 'elevate',
    _environment: 'dev',
    _profile: 'elevate'
  },

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
