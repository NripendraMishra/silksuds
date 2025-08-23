export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (action: string, parameters: any) => {
  if (typeof window !== 'undefined') {
    window.gtag('event', action, parameters);
  }
};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}