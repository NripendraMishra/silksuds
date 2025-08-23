import { logEvent } from "firebase/analytics";
import { analytics } from "./firebaseConfig";

export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== 'undefined' && analytics) {
    logEvent(analytics, eventName, parameters);
  }
};

export const trackPageView = (pageName: string, pageTitle?: string) => {
  trackEvent('page_view', {
    page_title: pageTitle || pageName,
    page_location: window.location.href,
    page_path: window.location.pathname
  });
};

export const trackClick = (elementName: string, additionalData?: any) => {
  trackEvent('click', {
    element_name: elementName,
    ...additionalData
  });
};

export const trackAddToCart = (itemId: string, itemName: string, price: number, quantity: number = 1) => {
  trackEvent('add_to_cart', {
    currency: 'INR',
    value: price * quantity,
    items: [{
      item_id: itemId,
      item_name: itemName,
      price: price,
      quantity: quantity
    }]
  });
};

export const trackRemoveFromCart = (itemId: string, itemName: string, price: number, quantity: number = 1) => {
  trackEvent('remove_from_cart', {
    currency: 'INR',
    value: price * quantity,
    items: [{
      item_id: itemId,
      item_name: itemName,
      price: price,
      quantity: quantity
    }]
  });
};

export const trackPurchase = (transactionId: string, value: number, items: any[]) => {
  trackEvent('purchase', {
    transaction_id: transactionId,
    value: value,
    currency: 'INR',
    items: items
  });
};

export const trackLogin = (method: string) => {
  trackEvent('login', {
    method: method
  });
};

export const trackSignUp = (method: string) => {
  trackEvent('sign_up', {
    method: method
  });
};

export const trackSearch = (searchTerm: string) => {
  trackEvent('search', {
    search_term: searchTerm
  });
};