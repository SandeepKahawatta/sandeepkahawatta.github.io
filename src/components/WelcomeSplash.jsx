import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SPLASH_KEY = 'daily-dev-splash-seen';
const DURATION_MS = 2600;

/**
 * Newspaper intro splash: the front page spins in (classic newsreel style),
 * the headline lands, a red stamp hits, then the sheet lifts away.
 *
 * Guardrails: plays once per browser session, click-anywhere / Skip to dismiss,
 * skipped entirely for prefers-reduced-motion users.
 */
const WelcomeSplash = () => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    const seen = window.sessionStorage.getItem(SPLASH_KEY);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !seen && !reducedMotion;
  });

  const dismiss = () => {
    window.sessionStorage.setItem(SPLASH_KEY, '1');
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(dismiss, DURATION_MS);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="welcome-splash"
          exit={{ y: '-100%', transition: { duration: 0.55, ease: [0.65, 0, 0.35, 1] } }}
          onClick={dismiss}
          role="presentation"
          aria-hidden="true"
          className="fixed inset-0 z-[200] bg-[#fcfbf9] flex items-center justify-center overflow-hidden cursor-pointer"
        >
          {/* Halftone paper texture */}
          <div className="halftone-overlay absolute inset-0 opacity-40"></div>

          {/* The spinning front page */}
          <motion.div
            initial={{ scale: 0.05, rotate: -1080, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white border-4 border-black px-6 md:px-14 py-8 md:py-10 text-center max-w-xl mx-4"
          >
            <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] border-b border-black pb-2 mb-4 text-gray-600">
              {today} • Vol. 404 • Final Edition
            </p>

            <h1 className="font-news text-5xl md:text-7xl font-black tracking-tighter leading-none scale-y-90">
              The Daily Dev
            </h1>

            <div className="border-y-2 border-black my-4 md:my-5 py-3">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="font-news text-lg md:text-2xl font-black uppercase leading-tight"
              >
                Software Engineer Publishes AI Research
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.15, duration: 0.4 }}
                className="font-serif italic text-xs md:text-sm text-gray-600 mt-1"
              >
                Full-stack developer cuts simulated traffic waiting time by 81.8% — story inside
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="text-[9px] font-mono uppercase tracking-widest text-gray-500"
            >
              Sandeep Kahawaththa • Raddolugama, Sri Lanka
            </motion.p>

            {/* Red stamp slams on */}
            <motion.div
              initial={{ opacity: 0, scale: 2.4, rotate: -25 }}
              animate={{ opacity: 1, scale: 1, rotate: -12 }}
              transition={{ delay: 1.35, type: 'spring', stiffness: 400, damping: 16 }}
              className="absolute -top-4 -right-3 md:-top-5 md:-right-7 bg-red-600 text-white font-black uppercase text-[10px] md:text-sm px-3 md:px-4 py-1.5 md:py-2 tracking-widest border-2 border-white outline outline-2 outline-red-600"
            >
              Hot off the press
            </motion.div>
          </motion.div>

          {/* Press progress bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: DURATION_MS / 1000, ease: 'linear' }}
            style={{ originX: 0 }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-black"
          />

          {/* Skip affordance */}
          <button
            onClick={dismiss}
            className="absolute bottom-4 right-4 text-[10px] font-mono uppercase tracking-widest text-gray-500 hover:text-red-600 transition-colors"
          >
            Skip &rarr;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeSplash;
