import React from 'react';

const BreakingNews = () => {
  return (
    <div className="w-full bg-black text-white overflow-hidden flex items-center h-10 border-b border-black dark:border-white/20 relative z-20">
      {/* Fixed Label */}
      <div className="bg-[#ff0000] text-white px-4 h-full flex items-center justify-center font-bold uppercase tracking-widest text-sm z-10 shrink-0 font-sans">
        Breaking News
      </div>
      
      {/* Scrolling Text Container */}
      <div className="flex overflow-hidden w-full relative">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 py-2">
          <span className="text-sm font-mono tracking-wider">
            LATEST DEPLOY: PORTFOLIO V2 IS LIVE — CRITICS CALL IT "PIXEL PERFECT" — 99.9% UPTIME ACHIEVED THIS QUARTER — NEW FRAMEWORK ADOPTED —
          </span>
          <span className="text-sm font-mono tracking-wider">
            LATEST DEPLOY: PORTFOLIO V2 IS LIVE — CRITICS CALL IT "PIXEL PERFECT" — 99.9% UPTIME ACHIEVED THIS QUARTER — NEW FRAMEWORK ADOPTED —
          </span>
          <span className="text-sm font-mono tracking-wider">
             LATEST DEPLOY: PORTFOLIO V2 IS LIVE — CRITICS CALL IT "PIXEL PERFECT" — 99.9% UPTIME ACHIEVED THIS QUARTER — NEW FRAMEWORK ADOPTED —
          </span>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
