const Header = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="w-full border-b-[3px] border-black pt-6 pb-2 px-4 md:px-12 bg-paper relative z-10">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        <div className="w-full flex justify-between items-center text-xs md:text-sm font-bold border-b border-black pb-2 mb-4 uppercase tracking-widest font-mono">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base">calendar_month</span>
            <span>{currentDate}</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="material-symbols-outlined text-base">cloud</span>
            <span>100% chance of shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Vol. 404</span>
            <span>Issue No. 1</span>
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
