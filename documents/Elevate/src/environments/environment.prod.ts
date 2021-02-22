export const environment: {
  production: boolean,

  cloudCms: {
    projectId: number,
    'subscription-key': string,
    url: string
  },

  tealium: {
    _account: string,
    _environment: string,
    _profile: string
  }

  submitUserDetails: {
    url: string,
    OcpApimSubscriptionKey: string
  }

} = {
  production: true,

  cloudCms: {
    // PROJECT ID THAT CORRESPONDS TO THE CONTENT NEEDED
    // 3110 : projectId for Customer HUB staging
    // 3120 : projectId for Customer HUB production
    projectId: 3120,
    'subscription-key': 'bc2ce3f9493d4fad835b08598a083661',
    url: 'https://dev3-custhub.lle.elevate.com/servicing-as/asdev/ccms/api/CloudCms/'
  },

  tealium: {
    _account: 'elevate',
    _environment: 'prod',
    _profile: 'elevate'
  },

  submitUserDetails: {
    url: 'https://dev2-custhub.lle.risecredit.com/originations/dev2/marketingcloudsvc/api/MarketingCloud/upsert',
    OcpApimSubscriptionKey: 'b32ee6c6e4f14ff28720c476af1a2f34'
  },
};
