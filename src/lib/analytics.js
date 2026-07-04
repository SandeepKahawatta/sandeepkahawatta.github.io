// Thin wrapper around GoatCounter custom events.
// Safe everywhere: no-ops if the script is blocked (ad blockers) or not loaded yet.

export const trackEvent = (name) => {
  if (typeof window !== 'undefined' && window.goatcounter?.count) {
    window.goatcounter.count({ path: name, title: name, event: true });
  }
};

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
