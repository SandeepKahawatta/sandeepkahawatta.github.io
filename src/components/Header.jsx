const Header = ({ theme, onToggleTheme }) => {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="w-full border-b-[3px] border-black pt-6 pb-2 px-4 md:px-12 bg-paper relative z-10">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        <div className="w-full flex justify-between items-center gap-2 text-xs md:text-sm font-bold border-b border-black pb-2 mb-4 uppercase tracking-widest font-mono">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-base hidden sm:inline">calendar_month</span>
            <span className="truncate">{currentDate}</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="material-symbols-outlined text-base">cloud</span>
            <span>100% chance of shipping</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline">Vol. 404</span>
            <span className="hidden md:inline">Issue No. 1</span>
            {/* Edition toggle lives here on mobile (the nav row is too crowded) */}
            <button
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to day edition (light mode)' : 'Switch to night edition (dark mode)'}
              className="md:hidden border border-black px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest hover:text-red-600 transition-colors"
            >
              {theme === 'dark' ? '☀ Day' : '☾ Night'}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none w-full text-center scale-y-90 transform font-news">
            The Daily Dev
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
