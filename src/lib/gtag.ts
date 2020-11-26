export const GA_TRACKING_ID = 'G-SD89BPCQXS';

interface Window {
  gtag: any
}
declare var window: Window;

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    cookie_flags: 'max-age=7200;secure;samesite=none'
  });
}

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}