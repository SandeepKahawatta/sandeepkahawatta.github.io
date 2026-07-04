import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent, slugify } from '../lib/analytics';

// Print-inspired motion: pages settle into place, stamps hit paper.
const settleIn = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  })
};

const stampIn = {
  hidden: { opacity: 0, scale: 0.6, rotate: -6 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 320, damping: 17, delay }
  })
};

const viewportOnce = { once: true, margin: '-60px' };

// How many article cards are visible before "Load more stories"
const PAGE_SIZE = 6;

// Newspaper "desks": broad groups derived from project categories
const DESKS = ['All Desks', 'Production & Clients', 'AI Research', 'Web Apps', 'Mobile'];

const deskOf = (project) => {
  switch (project.category) {
    case 'Production':
    case 'Client Work':
      return 'Production & Clients';
    case 'AI Research':
      return 'AI Research';
    case 'Mobile App':
      return 'Mobile';
    default:
      return 'Web Apps';
  }
};

const ProjectSection = ({ projects, onProjectClick }) => {
  const [activeDesk, setActiveDesk] = useState('All Desks');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Flagship stays pinned as the splash story; the rest fill the article grid
  const flagship = projects[0];

  const filtered = useMemo(() => {
    const rest = projects.slice(1);
    return activeDesk === 'All Desks' ? rest : rest.filter(p => deskOf(p) === activeDesk);
  }, [projects, activeDesk]);

  const articles = filtered.slice(0, visibleCount);
  const remaining = filtered.length - articles.length;

  const selectDesk = (desk) => {
    trackEvent(`desk-${slugify(desk)}`);
    setActiveDesk(desk);
    setVisibleCount(PAGE_SIZE); // fresh page per desk
  };

  return (
    <section id="projects" className="mb-20 border-t-8 border-black pt-4 scroll-mt-24">

      {/* SECTION MASTHEAD — consistent with Field Reports / Technical Review */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-black pb-2 mb-2 gap-4">
        <div>
          <h5 className="font-mono text-xs uppercase tracking-widest text-gray-600 mb-1">Section C</h5>
          <h3 className="text-5xl md:text-6xl font-black font-news uppercase tracking-tighter leading-none">
            Technical<br/>Gazette
          </h3>
        </div>
        <div className="text-left md:text-right font-serif italic text-sm text-gray-600 max-w-md">
          Headline stories from the project archive — open any article for the full technical supplement.
        </div>
      </div>

      {/* Edition strip */}
      <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-gray-500 border-b border-black pb-1 mb-8">
        <span>Late City Edition</span>
        <span className="hidden md:inline">Volume III • Project Archive</span>
        <span>Page C1</span>
      </div>

      {/* ============ FRONT-PAGE SPLASH: the flagship story ============ */}
      <motion.article
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={settleIn}
        onClick={() => onProjectClick(flagship)}
        className="group cursor-pointer mb-12 grid md:grid-cols-12 gap-6 md:gap-10"
      >
        {/* Image side */}
        <div className="md:col-span-7 relative border border-black/10 overflow-hidden">
          <img
            src={flagship.image}
            alt={`Screenshot of ${flagship.title}`}
            className="w-full h-full aspect-video md:aspect-auto object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gray-200/30 mix-blend-multiply pointer-events-none"></div>
          <motion.span
            variants={stampIn}
            custom={0.35}
            className="absolute top-4 left-4 bg-red-600 text-white text-[10px] md:text-xs font-black uppercase tracking-widest px-3 py-1 -rotate-3"
          >
            {flagship.category} — Special Report
          </motion.span>
        </div>

        {/* Story side */}
        <div className="md:col-span-5 flex flex-col">
          <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-3 border-b border-dashed border-gray-400 pb-2">
            Front Page • {flagship.role}
          </p>
          <h2 className="text-3xl md:text-4xl font-black leading-none tracking-tight mb-4 decoration-red-600 decoration-4 underline-offset-4 group-hover:underline">
            {flagship.title}
          </h2>

          {flagship.stats && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              {flagship.stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  variants={stampIn}
                  custom={0.15 + idx * 0.12}
                  className="border border-black p-2 text-center bg-[#fcfbf9] transition-transform duration-300 hover:-translate-y-1"
                >
                  <p className="text-lg md:text-xl font-black leading-none">{stat.value}</p>
                  <p className="text-[8px] md:text-[9px] font-mono uppercase tracking-wider mt-1 text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          )}

          <p className="font-serif text-sm leading-relaxed text-justify text-gray-800 line-clamp-5 mb-4">
            <span className="float-left text-4xl font-black mr-2 leading-none">{flagship.description.charAt(0)}</span>
            {flagship.description.slice(1)}
          </p>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {flagship.tech.slice(0, 6).map(t => (
                <span key={t} className="text-[9px] border border-black px-1.5 py-0.5 font-mono uppercase italic">{t}</span>
              ))}
            </div>
            <button className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 group-hover:text-red-600 group-hover:border-red-600 transition-colors">
              Read Full Article <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </button>
          </div>
        </div>
      </motion.article>

      {/* ============ DESK TABS (filter) ============ */}
      <div className="relative border-y-2 border-black mb-10">
      <span className="nav-fade" aria-hidden="true"></span>
      <div className="flex items-center gap-4 md:gap-8 overflow-x-auto whitespace-nowrap pl-1 pr-10 md:pr-1" role="group" aria-label="Filter projects by desk">
        <span className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-2 py-1 my-2 shrink-0 hidden md:inline">
          News Desks
        </span>
        {DESKS.map((desk) => (
          <button
            key={desk}
            onClick={() => selectDesk(desk)}
            aria-pressed={activeDesk === desk}
            className={`relative py-3 text-[11px] md:text-xs font-mono uppercase tracking-widest transition-colors ${
              activeDesk === desk ? 'text-red-600 font-bold' : 'text-gray-600 hover:text-black'
            }`}
          >
            {desk}
            {activeDesk === desk && (
              <motion.span
                layoutId="desk-underline"
                className="absolute left-0 right-0 bottom-2 h-[2px] bg-red-600"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      </div>

      {/* ============ ARTICLE GRID — flat editorial cards with column rules ============ */}
      {/* Negative margins offset the per-card padding so outer edges stay aligned,
          while vertical rules sit centered in each gutter like real newsprint columns */}
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:-mx-4 lg:-mx-6">
        <AnimatePresence mode="popLayout">
          {articles.map((project, idx) => (
            <motion.article
              layout
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { delay: (idx % 3) * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              onClick={() => onProjectClick(project)}
              className={`group cursor-pointer flex flex-col sm:px-4 lg:px-6 border-black/20 ${
                idx % 2 === 1 ? 'sm:border-l' : 'sm:border-l-0'
              } ${
                idx % 3 === 0 ? 'lg:border-l-0' : 'lg:border-l'
              }`}
            >
              {/* Image: grayscale print that colorizes on hover */}
              <div className="relative overflow-hidden mb-4 border border-black/10">
                <img
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  className="w-full aspect-[4/3] object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gray-200/30 mix-blend-multiply pointer-events-none"></div>
              </div>

              {/* Kicker: dot + category */}
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-800 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" aria-hidden="true"></span>
                {project.category}
              </p>

              <h4 className="font-black text-2xl leading-tight mb-2 font-news">
                <button
                  onClick={(e) => { e.stopPropagation(); onProjectClick(project); }}
                  className="text-left group-hover:underline focus:underline decoration-red-600 decoration-2 underline-offset-4"
                >
                  {project.title}
                </button>
              </h4>

              <p className="font-serif text-sm text-gray-700 leading-relaxed line-clamp-3 mb-4">
                {project.description}
              </p>

              <div className="mt-auto flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map(t => (
                  <span key={t} className="text-[10px] border border-black bg-white px-2 py-0.5 font-mono uppercase">{t}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ============ LOAD MORE / ARCHIVE ============ */}
      <div className="text-center mt-12 border-t border-black pt-6 flex flex-col items-center gap-4">
        {remaining > 0 ? (
          <button
            onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
            className="border-2 border-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
          >
            Load More Stories ({remaining} in the archive)
          </button>
        ) : (
          <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
            — End of the {activeDesk === 'All Desks' ? 'edition' : `${activeDesk} desk`} —
          </p>
        )}
        <a
          href="https://github.com/SandeepKahawatta?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-serif italic text-gray-600 hover:text-red-600 transition-colors"
        >
          Browse the full archive on GitHub &rarr;
        </a>
      </div>
    </section>
  );
};

export default ProjectSection;
