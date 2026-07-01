const HEADLINES = "RESEARCH: NOVEL AI SIGNAL CONTROL CUTS SIMULATED URBAN TRAFFIC WAITING TIME BY 81.8% — ELBER E-COMMERCE PLATFORM LIVE IN PRODUCTION — MULTI-ROLE LMS SHIPS WITH REAL-TIME CHAT & ANTI-FRAUD QR ATTENDANCE — NOW ACCEPTING FREELANCE & FULL-TIME OPPORTUNITIES —";

const BreakingNews = () => {
  return (
    <div className="w-full bg-black text-white overflow-hidden flex items-center h-10 border-b border-black relative z-20">
      {/* Fixed Label */}
      <div className="bg-[#ff0000] text-white px-4 h-full flex items-center justify-center font-bold uppercase tracking-widest text-sm z-10 shrink-0 font-sans">
        Breaking News
      </div>

      {/* Scrolling Text Container */}
      <div className="flex overflow-hidden w-full relative">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 py-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="text-sm font-mono tracking-wider">
              {HEADLINES}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
