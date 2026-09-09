declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void;
  }
}

export const GA_TRACKING_ID = 'G-9TG7JEDDCX';

// Skip Analytics during local development / debugging so those hits are not counted.
export const isAnalyticsEnabled = (): boolean => {
  if (process.env.NODE_ENV !== 'production') return false;
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host === '[::1]') return false;
  }
  return true;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (!isAnalyticsEnabled() || typeof window.gtag !== 'function') return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (!isAnalyticsEnabled() || typeof window.gtag !== 'function') return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
