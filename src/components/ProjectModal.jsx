import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent, slugify } from '../lib/analytics';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  // ESC to close + focus trap while open
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // lock background scroll

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} — project details`}
            layoutId={`project-${project.title}`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[85vh] bg-[#fcfbf9] border-4 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] overflow-y-auto overflow-x-hidden"
          >
            {/* Sticky masthead: label + close button — never overlaps content, always reachable */}
            <div className="sticky top-0 z-10 bg-[#fcfbf9] border-b-2 border-black px-4 md:px-12 py-3 flex items-center justify-between gap-4">
              <h2 className="text-[10px] md:text-sm font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] truncate">
                Special Technical Supplement
              </h2>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close project details"
                className="font-black text-sm md:text-lg hover:text-red-600 transition-colors whitespace-nowrap shrink-0"
              >
                [ CLOSE ]
              </button>
            </div>

            <div className="p-4 md:p-12">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-black uppercase leading-none mb-6 text-center tracking-tighter">
                {project.title}
              </h1>

              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-8 border-y border-black py-2 font-serif italic text-sm md:text-base">
                <span>By Sandeep Kahawaththa</span>
                <span className="hidden md:inline">•</span>
                <span>{project.role}</span>
                {project.category && (
                  <>
                    <span className="hidden md:inline">•</span>
                    <span>{project.category}</span>
                  </>
                )}
              </div>

              <div className="border-2 border-black p-1 mb-8 relative">
                <img src={project.image} alt={`Screenshot of ${project.title}`} className="w-full h-auto" />
                <div className="absolute inset-0 bg-gray-200/30 mix-blend-multiply pointer-events-none"></div>
              </div>

              {project.stats && (
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {project.stats.map((stat) => (
                    <div key={stat.label} className="border-2 border-black p-2 text-center bg-white">
                      <p className="text-lg md:text-2xl font-black leading-none">{stat.value}</p>
                      <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-wider mt-1 text-gray-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="columns-1 md:columns-2 gap-8 font-serif text-justify leading-relaxed">
                <p className="drop-cap text-lg mb-4">{project.description}</p>
                <div className="mt-6 p-4 bg-gray-100 border-l-4 border-black">
                   <span className="font-bold uppercase text-xs tracking-widest block mb-2">Technical Stack</span>
                   <span className="flex flex-wrap gap-2">
                     {project.tech.map(t => (
                       <span key={t} className="text-[10px] border border-black bg-white px-2 py-0.5 font-mono uppercase">{t}</span>
                     ))}
                   </span>
                </div>
                {(project.github || project.link) && (
                  <div className="mt-8 flex flex-col gap-4">
                    <h4 className="font-bold uppercase tracking-widest border-b border-black text-xs">Repository Access</h4>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent(`project-source-${slugify(project.title)}`)} className="bg-black text-white text-center py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-colors">
                        Visit Source Code &rarr;
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent(`project-demo-${slugify(project.title)}`)} className="border-2 border-black text-center py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                        View Live Demo &rarr;
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
