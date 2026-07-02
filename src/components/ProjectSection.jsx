import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

const ProjectSection = ({ projects, onProjectClick }) => {
  // Local state manages the visual order so any card can be promoted to the headline slot
  const [orderedProjects, setOrderedProjects] = useState(projects);

  useEffect(() => {
    setOrderedProjects(projects);
  }, [projects]);

  const promoteToHeadline = (indexToPromote) => {
    const newOrder = [...orderedProjects];
    [newOrder[0], newOrder[indexToPromote]] = [newOrder[indexToPromote], newOrder[0]];
    setOrderedProjects(newOrder);
  };

  const headline = orderedProjects[0];

  return (
    <section id="projects" className="mb-20 border-t-8 border-black pt-4 scroll-mt-24">

      {/* SECTION MASTHEAD — consistent with Field Reports / Technical Review */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-2 mb-2 gap-4">
        <div>
          <h5 className="font-mono text-xs uppercase tracking-widest text-gray-600 mb-1">Section C</h5>
          <h3 className="text-5xl md:text-6xl font-black font-news uppercase tracking-tighter leading-none">
            Technical<br/>Gazette
          </h3>
        </div>
        <div className="text-right font-serif italic text-sm text-gray-600 max-w-md">
          Headline stories from the project archive — tap any article for the full technical supplement.
        </div>
      </div>

      {/* Edition strip */}
      <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-gray-500 border-b border-black pb-1 mb-8">
        <span>Late City Edition</span>
        <span className="hidden md:inline">Volume III • Project Archive</span>
        <span>Page C1</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">

        {/* === LEFT: MAIN HEADLINE (Always Index 0 of our state) === */}
        <div className="lg:col-span-7 border-r border-black/10 pr-0 lg:pr-8">
          <motion.article
            layout
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={settleIn}
            className="group cursor-pointer"
            onClick={() => onProjectClick(headline)}
          >
            <motion.div layoutId={`img-${headline.title}`} className="relative mb-4 overflow-hidden border border-black p-1 bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={headline.image}
                  alt={`Screenshot of ${headline.title}`}
                  className="w-full transition-transform duration-700 aspect-video object-cover group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gray-200/30 mix-blend-multiply pointer-events-none"></div>
                {/* Corner stamp */}
                <motion.span
                  variants={stampIn}
                  custom={0.35}
                  className="absolute top-3 right-3 bg-red-600 text-white text-[10px] md:text-xs font-black uppercase tracking-widest px-3 py-1 -rotate-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)]"
                >
                  {headline.category || 'Special Report'}
                </motion.span>
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-black leading-none mb-4 tracking-tight decoration-red-600 decoration-4 underline-offset-4 group-hover:underline">
              {headline.title}
            </h2>

            {headline.stats && (
              <div className="grid grid-cols-3 gap-3 mb-5">
                {headline.stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    variants={stampIn}
                    custom={0.15 + idx * 0.12}
                    className="border-2 border-black p-2 text-center bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <p className="text-xl md:text-2xl font-black leading-none">{stat.value}</p>
                    <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-wider mt-1 text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            )}

            <p className="font-serif text-lg leading-relaxed mb-4 text-justify">
              <span className="float-left text-6xl font-black mr-3 mt-1 leading-none">T</span>
              {headline.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
               {headline.tech.map(t => <span key={t} className="text-[10px] border border-black px-2 py-0.5 font-mono uppercase italic">{t}</span>)}
            </div>
            <button className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 group-hover:text-red-600 group-hover:border-red-600 transition-colors">
              Read Full Article <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </button>
          </motion.article>
        </div>

        {/* === MIDDLE: SUB-STORIES (Index 1 & 2) === */}
        <div className="lg:col-span-3 flex flex-col gap-8 border-r border-black/10 pr-0 lg:pr-8">
          {orderedProjects.slice(1, 3).map((project, idx) => {
            const actualIndex = idx + 1;

            return (
              <motion.article
                layout
                key={project.title}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={settleIn}
                custom={0.1 + idx * 0.12}
                whileHover={{ y: -4 }}
                className="group border-b border-black/10 pb-6 last:border-0 cursor-pointer"
                onClick={() => onProjectClick(project)}
              >
                <motion.div layoutId={`img-${project.title}`} className="border border-black mb-3 p-1 relative">
                   <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                     <span className="bg-white text-[10px] font-bold px-2 py-1 uppercase border border-black">Read Article</span>
                   </div>
                   <div className="relative overflow-hidden">
                     <img src={project.image} alt={`Screenshot of ${project.title}`} className="w-full transition-transform duration-500 aspect-square object-cover group-hover:scale-105" />
                     <div className="absolute inset-0 bg-gray-200/30 mix-blend-multiply pointer-events-none"></div>
                   </div>
                </motion.div>
                {project.category && (
                  <span className="text-[11px] font-bold text-red-600 uppercase block mb-1">{project.category}</span>
                )}
                <h4 className="font-bold text-xl leading-tight mb-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); onProjectClick(project); }}
                    className="text-left group-hover:underline focus:underline decoration-red-600 decoration-2 underline-offset-2"
                  >
                    {project.title}
                  </button>
                </h4>
                <p className="text-sm font-serif text-gray-700 line-clamp-3">{project.description}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); promoteToHeadline(actualIndex); }}
                  aria-label={`Move ${project.title} to the headline slot`}
                  className="mt-2 text-[11px] font-mono uppercase tracking-widest text-gray-600 hover:text-red-600 focus:text-red-600 group/promote"
                >
                  <span className="inline-block transition-transform duration-500 group-hover/promote:-rotate-180">↺</span> Promote to headline
                </button>
              </motion.article>
            );
          })}
        </div>

        {/* === RIGHT: NEWS BRIEFS (Index 3+) === */}
        <div className="lg:col-span-2">
          <h5 className="font-black uppercase border-b-2 border-black mb-4 text-center bg-black text-white text-xs py-1">Code Briefs</h5>
          <div className="flex flex-col gap-6">
            {orderedProjects.slice(3).map((project, idx) => {
              const actualIndex = idx + 3;

              return (
                <motion.div
                  layout
                  key={project.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  variants={settleIn}
                  custom={Math.min(idx * 0.07, 0.35)}
                  whileHover={{ x: 3 }}
                  className="border-b border-dashed border-gray-400 pb-4 last:border-0 cursor-pointer group"
                  onClick={() => onProjectClick(project)}
                >
                  <p className="text-[11px] font-bold text-red-600 uppercase mb-1 flex items-center justify-between gap-1">
                    {project.category || 'Repository'}
                    <button
                      onClick={(e) => { e.stopPropagation(); promoteToHeadline(actualIndex); }}
                      aria-label={`Move ${project.title} to the headline slot`}
                      title="Promote to headline"
                      className="opacity-40 group-hover:opacity-100 focus:opacity-100 transition-all duration-500 text-black hover:text-red-600 hover:-rotate-180"
                    >
                      ↺
                    </button>
                  </p>
                  <div className="flex gap-3">
                    <div className="w-14 h-14 shrink-0 border border-black p-0.5 bg-white">
                      <img
                        src={project.image}
                        alt=""
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <div className="min-w-0">
                      <h6 className="font-bold text-sm leading-tight mb-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); onProjectClick(project); }}
                          className="text-left hover:underline focus:underline decoration-red-600 decoration-2 underline-offset-2"
                        >
                          {project.title}
                        </button>
                      </h6>
                      <p className="text-xs font-serif italic text-gray-600 line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Archive pointer */}
            <a
              href="https://github.com/SandeepKahawatta?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-serif italic text-gray-600 hover:text-red-600 transition-colors text-center border-t border-black pt-3"
            >
              — More stories in the archive, page C4 &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
