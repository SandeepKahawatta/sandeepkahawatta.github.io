import { useEffect, useState } from 'react';

const THEME_KEY = 'daily-dev-theme';

/**
 * Day / Night Edition switch. Defaults to the visitor's system preference,
 * persists their explicit choice, and drives the `dark` class on <html>
 * (which the Night Edition styles in index.css key off).
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = window.localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return [theme, toggleTheme];
};
