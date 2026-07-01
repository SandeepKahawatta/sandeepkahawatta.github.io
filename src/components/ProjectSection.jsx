import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

  return (
    <section id="projects" className="mb-20 border-t-4 border-black pt-8 scroll-mt-24">
      {/* SECTION TITLE */}
      <div className="flex justify-between items-center mb-8 border-b border-black pb-2">
        <h3 className="text-4xl font-black font-news uppercase tracking-tighter">Technical Gazette</h3>
        <span className="font-serif italic text-sm">Volume III • Project Archive</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">

        {/* === LEFT: MAIN HEADLINE (Always Index 0 of our state) === */}
        <div className="lg:col-span-7 border-r border-black/10 pr-0 lg:pr-8">
          <motion.article
            layout
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="group cursor-pointer"
            onClick={() => onProjectClick(orderedProjects[0])}
          >
            <motion.div layoutId={`img-${orderedProjects[0].title}`} className="relative mb-4 overflow-hidden border border-black p-1 bg-white">
              <div className="relative">
                <img
                  src={orderedProjects[0].image}
                  alt={`Screenshot of ${orderedProjects[0].title}`}
                  className="w-full transition-all duration-700 aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-gray-200/30 mix-blend-multiply pointer-events-none"></div>
              </div>
            </motion.div>
            <span className="text-xs font-bold bg-red-600 text-white px-2 py-0.5 uppercase mb-2 inline-block">{orderedProjects[0].category || 'Special Report'}</span>
            <h2 className="text-4xl font-black leading-none mb-4 group-hover:underline">{orderedProjects[0].title}</h2>
            <p className="font-serif text-lg leading-relaxed mb-4 text-justify">
              <span className="float-left text-6xl font-black mr-3 mt-1 leading-none">T</span>
              {orderedProjects[0].description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
               {orderedProjects[0].tech.map(t => <span key={t} className="text-[10px] border border-black px-2 py-0.5 font-mono uppercase italic">{t}</span>)}
            </div>
            <button className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-red-600">
              Read Full Article &rarr;
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
                className="group border-b border-black/10 pb-6 last:border-0 cursor-pointer"
                onClick={() => onProjectClick(project)}
              >
                <motion.div layoutId={`img-${project.title}`} className="border border-black mb-3 p-1 relative">
                   <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                     <span className="bg-white text-[10px] font-bold px-2 py-1 uppercase border border-black">Read Article</span>
                   </div>
                   <div className="relative">
                     <img src={project.image} alt={`Screenshot of ${project.title}`} className="w-full transition-all aspect-square object-cover" />
                     <div className="absolute inset-0 bg-gray-200/30 mix-blend-multiply pointer-events-none"></div>
                   </div>
                </motion.div>
                {project.category && (
                  <span className="text-[11px] font-bold text-red-600 uppercase block mb-1">{project.category}</span>
                )}
                <h4 className="font-bold text-xl leading-tight mb-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); onProjectClick(project); }}
                    className="text-left group-hover:underline focus:underline"
                  >
                    {project.title}
                  </button>
                </h4>
                <p className="text-sm font-serif text-gray-700 line-clamp-3">{project.description}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); promoteToHeadline(actualIndex); }}
                  aria-label={`Move ${project.title} to the headline slot`}
                  className="mt-2 text-[11px] font-mono uppercase tracking-widest text-gray-600 hover:text-red-600 focus:text-red-600"
                >
                  ↺ Promote to headline
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
                  className="border-b border-dashed border-gray-400 pb-4 last:border-0 cursor-pointer group"
                  onClick={() => onProjectClick(project)}
                >
                  <p className="text-[11px] font-bold text-red-600 uppercase mb-1 flex items-center justify-between gap-1">
                    {project.category || 'Repository'}
                    <button
                      onClick={(e) => { e.stopPropagation(); promoteToHeadline(actualIndex); }}
                      aria-label={`Move ${project.title} to the headline slot`}
                      title="Promote to headline"
                      className="opacity-40 group-hover:opacity-100 focus:opacity-100 transition-opacity text-black hover:text-red-600"
                    >
                      ↺
                    </button>
                  </p>
                  <h6 className="font-bold text-sm leading-tight mb-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); onProjectClick(project); }}
                      className="text-left hover:underline focus:underline"
                    >
                      {project.title}
                    </button>
                  </h6>
                  <p className="text-xs font-serif italic text-gray-600 line-clamp-2">{project.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
