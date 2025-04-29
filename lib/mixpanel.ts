import mixpanel from "mixpanel-browser";

// Define event names as constants to prevent typos
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: "Page View",
  BUTTON_CLICK: "Button Click",
  FORM_SUBMIT: "Form Submit",
  USER_SIGNED_IN: "User Signed In",
  USER_SIGNED_UP: "User Signed Up",
  USER_SIGNED_OUT: "User Signed Out",
  // ... other events
};

// Initialize mixpanel
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

if (MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === "development",
    track_pageview: true,
    persistence: "localStorage",
    ignore_dnt: true,
  });
}

export const MixpanelAnalytics = {
  track: <T extends Record<string, any>>(eventName: string, properties?: T & any) => {
    try {
      if (MIXPANEL_TOKEN) {
        mixpanel.track(eventName, {
          ...properties,
          timestamp: Date.now(),
          path: typeof window !== "undefined" ? window.location.pathname : undefined,
        });
      }
    } catch (error) {
      console.error("Error tracking event:", error);
    }
  },

  pageView: (pageName: string, properties?: Record<string, any>) => {
    try {
      if (MIXPANEL_TOKEN) {
        MixpanelAnalytics.track(ANALYTICS_EVENTS.PAGE_VIEW, {
          page: pageName,
          ...properties,
        });
      }
    } catch (error) {
      console.error("Error tracking page view:", error);
    }
  },

  identifyKnownUser: (userId: string, userProperties?: Record<string, any>) => {
    try {
      mixpanel.identify(userId);
      if (userProperties) {
        mixpanel.people.set(userProperties);
      }
    } catch (error) {
      console.error("Error identifying user:", error);
    }
  },

  identifyUnknownUser: () => {
    try {
      const anonymousId =
        mixpanel.get_distinct_id() ||
        `anon-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      mixpanel.identify(anonymousId);
      mixpanel.people.set({
        $first_seen: new Date().toISOString(),
        user_type: "anonymous",
        platform: typeof window !== "undefined" ? window.navigator.platform : "unknown",
      });
    } catch (error) {
      console.error("Error initializing user:", error);
    }
  },
};
