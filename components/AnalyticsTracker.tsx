'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView, trackClick } from '../lib/analytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  // Track page views
  useEffect(() => {
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  // Track all clicks globally
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const elementType = target.tagName.toLowerCase();
      const elementText = target.textContent?.trim() || '';
      const elementId = target.id || '';
      const elementClass = target.className || '';
      
      let elementName = elementType;
      if (elementId) elementName += `#${elementId}`;
      if (elementText && elementText.length < 50) elementName += `:${elementText}`;
      
      trackClick('global_click', {
        element_type: elementType,
        element_text: elementText.substring(0, 100),
        element_id: elementId,
        element_class: elementClass,
        page_path: window.location.pathname,
        timestamp: new Date().toISOString()
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}