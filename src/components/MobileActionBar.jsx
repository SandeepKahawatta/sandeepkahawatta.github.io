import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Mobile-only bottom action bar — a slim newsprint rule in the thumb zone,
 * not a floating island. Behavior rules:
 *  - appears only after the reader scrolls past the hero (intent exists)
 *  - hides while the Contact / Records / Footer areas are on screen
 *    (never advertise the thing the reader is already looking at)
 *  - desktop never sees it (the sticky nav's Hire Me pill covers that)
 */
const MobileActionBar = () => {
  const [pastHero, setPastHero] = useState(false);
  const [endZoneVisible, setEndZoneVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const targets = ['contact', 'records']
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const footer = document.querySelector('footer');
    if (footer) targets.push(footer);

    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = entry.target.id || 'footer';
          if (entry.isIntersecting) {
            visible.add(key);
          } else {
            visible.delete(key);
          }
        });
        setEndZoneVisible(visible.size > 0);
      },
      { rootMargin: '0px 0px -15% 0px' }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const show = pastHero && !endZoneVisible;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black text-white pb-[env(safe-area-inset-bottom)]"
        >
          <div className="flex items-stretch border-t-2 border-black">
            <a
              href="#contact"
              className="flex-grow flex items-center justify-center gap-2 py-3 text-[11px] font-mono font-bold uppercase tracking-widest hover:text-red-400 transition-colors"
            >
              ☏ Commission the Engineer — Hire Me
            </a>
            <a
              href="/resume.pdf"
              download="Sandeep_Kahawaththa_CV.pdf"
              className="shrink-0 flex items-center px-4 bg-red-600 text-white text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-red-700 transition-colors"
            >
              CV
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileActionBar;
