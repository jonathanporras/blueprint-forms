// lib/mixpanel.js
const mixpanel = require("mixpanel-node");

const mixpanelClient = process.env.MIXPANEL_TOKEN
  ? mixpanel.init(process.env.MIXPANEL_TOKEN, {})
  : null;

export const trackEvent = <T extends Record<string, any>>(
  eventName: string,
  properties?: T & any
) => {
  if (mixpanelClient) {
    mixpanelClient.track(eventName, properties);
  } else {
    console.warn("Mixpanel token not configured. Event not tracked:", eventName);
  }
};

// export const identifyUser = (userId, properties) => {
//   if (mixpanelClient) {
//     mixpanelClient.people.set(userId, properties);
//   } else {
//     console.warn("Mixpanel token not configured. User not identified:", userId);
//   }
// };
