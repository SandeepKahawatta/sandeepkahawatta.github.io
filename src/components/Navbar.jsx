import { useEffect, useState } from 'react';
import BreakingNews from './BreakingNews';

const NAV_ITEMS = [
  { id: 'editorial', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'classifieds', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
];

const Navbar = ({ activeSection, theme, onToggleTheme }) => {
  // On phones the ticker hides once the reader is past the fold,
  // returning ~40px of the sticky header to content
  const [pastFold, setPastFold] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastFold(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-[#fcfbf9] border-b border-black">
      <div className="relative">
        <div className="w-full border-t border-black border-b border-black py-2 pl-4 pr-12 md:px-4 flex items-center justify-start md:justify-center gap-4 md:gap-12 text-sm md:text-base font-bold uppercase tracking-wide font-sans bg-[#fcfbf9] overflow-x-auto whitespace-nowrap">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              className={`relative group transition-colors duration-300 ${activeSection === id ? 'text-red-600' : 'hover:text-red-600'}`}
              href={`#${id}`}
            >
              {label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${activeSection === id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </a>
          ))}
          <a
            href="#contact"
            className="bg-red-600 text-white px-4 py-1 text-xs md:text-sm hover:bg-black transition-colors"
          >
            Hire Me
          </a>
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to day edition (light mode)' : 'Switch to night edition (dark mode)'}
            className="hidden md:inline-block border border-black px-3 py-1 text-[10px] md:text-xs font-mono uppercase tracking-widest hover:text-red-600 transition-colors shrink-0"
          >
            {theme === 'dark' ? '☀ Day Ed.' : '☾ Night Ed.'}
          </button>
        </div>
        {/* Scroll-affordance fade: hints that the nav row scrolls on phones */}
        <span className="nav-fade" aria-hidden="true"></span>
      </div>
      <div className={pastFold ? 'hidden md:block' : ''}>
        <BreakingNews />
      </div>
    </div>
  );
};

export default Navbar;
