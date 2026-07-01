import React, { useState, useEffect, useRef } from 'react';
import profileImage from '../assets/my/profile.jpg';
import cleanCodeImage from '../assets/generated/clean_code_illustration.png';
import BreakingNews from './BreakingNews';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const useScrollReveal = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isRevealed];
};

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
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#fcfbf9] border-4 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] overflow-y-auto overflow-x-hidden p-6 md:p-12"
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-4 right-4 font-black text-2xl hover:text-red-600 transition-colors"
            >
              [ CLOSE ]
            </button>

            {/* Newspaper Header inside Modal */}
            <div className="text-center border-b-2 border-black pb-4 mb-8">
              <h2 className="text-sm font-mono uppercase tracking-[0.3em]">Special Technical Supplement</h2>
            </div>

            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-black uppercase leading-none mb-6 text-center tracking-tighter">
                {project.title}
              </h1>
              
              <div className="flex justify-center gap-4 mb-8 border-y border-black py-2 font-serif italic">
                <span>By Sandeep Kahawaththa</span>
                <span>•</span>
                <span>{project.role}</span>
                {project.category && (
                  <>
                    <span>•</span>
                    <span>{project.category}</span>
                  </>
                )}
              </div>

              <div className="border-2 border-black p-1 mb-8 relative">
                <img src={project.image} alt={`Screenshot of ${project.title}`} className="w-full h-auto" />
                <div className="absolute inset-0 bg-gray-200/30 mix-blend-multiply pointer-events-none"></div>
              </div>

              <div className="columns-1 md:columns-2 gap-8 font-serif text-justify leading-relaxed">
                <p className="drop-cap text-lg mb-4">{project.description}</p>
                <div className="mt-6 p-4 bg-gray-100 border-l-4 border-black">
                   <span className="font-bold uppercase text-xs tracking-widest block mb-1 not-italic">Technical Stack</span>
                   <span className="italic">{project.tech.join(' · ')}</span>
                </div>
                {(project.github || project.link) && (
                  <div className="mt-8 flex flex-col gap-4">
                    <h4 className="font-bold uppercase tracking-widest border-b border-black text-xs">Repository Access</h4>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="bg-black text-white text-center py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-colors">
                        Visit Source Code &rarr;
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="border-2 border-black text-center py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                        View Live Demo &rarr;
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ProjectSection = ({ projects, onProjectClick }) => {
  // 1. Local state to manage the visual order of projects
  const [orderedProjects, setOrderedProjects] = useState(projects);

  // Sync state if the prop changes (good practice)
  useEffect(() => {
    setOrderedProjects(projects);
  }, [projects]);

  // 2. The Swap Function
  const promoteToHeadline = (indexToPromote) => {
    // Create a copy of the array
    const newOrder = [...orderedProjects];
    
    // SWAP: The clicked project trades places with the Main Headline (Index 0)
    // This feels like shuffling papers on a desk
    [newOrder[0], newOrder[indexToPromote]] = [newOrder[indexToPromote], newOrder[0]];
    
    setOrderedProjects(newOrder);
  };

  return (
    <section id="projects" className="mb-20 border-t-4 border-black pt-8">
      {/* SECTION TITLE */}
      <div className="flex justify-between items-center mb-8 border-b border-black pb-2">
        <h3 className="text-4xl font-black font-news uppercase tracking-tighter">Technical Gazette</h3>
        <span className="font-serif italic text-sm">Volume III • Project Archive</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* === LEFT: MAIN HEADLINE (Always Index 0 of our state) === */}
        <div className="lg:col-span-7 border-r border-black/10 pr-0 lg:pr-8">
          <motion.article 
            layout // Enable automatic layout animation
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="group cursor-pointer"
            onClick={() => onProjectClick(orderedProjects[0])} // Click Main -> Open Modal
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
            <div className="flex gap-2 mb-4">
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
            // Calculate actual index in the ordered array (offset by 1)
            const actualIndex = idx + 1;

            return (
              <motion.article
                layout // Enable animation
                key={project.title} // Key must be unique to the data, not index!
                className="group border-b border-black/10 pb-6 last:border-0 cursor-pointer"
                onClick={() => onProjectClick(project)} // Click -> Open details (issue #12)
              >
                <motion.div layoutId={`img-${project.title}`} className="border border-black mb-3 p-1 relative">
                   {/* "Click to read" overlay */}
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
                  onClick={() => onProjectClick(project)} // Click -> Open details (issue #12)
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

const TechnicalSection = ({ cleanCodeRef, cleanCodeImage, skills }) => {
  const tagList = (category, count = 4) => (skills[category] || []).slice(0, count);

  return (
    <section id="skills" className="mb-20 border-t-8 border-black pt-4 scroll-mt-24">
      
      {/* SECTION MASTHEAD */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-2 mb-8 gap-4">
        <div>
          <h5 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-1">Section B</h5>
          <h3 className="text-5xl md:text-6xl font-black font-news uppercase tracking-tighter leading-none">
            Technical<br/>Review
          </h3>
        </div>
        <div className="text-right font-serif italic text-sm text-gray-600 max-w-md">
          "A deep dive into the architectural decisions, engineering principles, and core competencies driving modern software solutions."
        </div>
      </div>

      {/* 3-COLUMN NEWSPAPER LAYOUT */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* COLUMN 1: The "Op-Ed" (Clean Code Article) */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="border border-black p-1 relative">
             <img 
               ref={cleanCodeRef} 
               src={cleanCodeImage} 
               alt="Clean Code Architecture" 
               className="w-full h-auto grayscale contrast-125 hover:grayscale-0 transition-all duration-700" 
             />
             <div className="absolute bottom-0 right-0 bg-black text-white text-[10px] px-2 py-1 uppercase font-bold">
               Fig 1.2
             </div>
          </div>
          
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-2 block">Editorial Opinion</span>
            <h4 className="font-bold text-3xl leading-tight mb-3 font-news">The Art of<br/>Clean Code</h4>
            <div className="w-12 h-1 bg-black mb-4"></div>
            
            <div className="font-serif text-sm text-gray-800 text-justify leading-relaxed space-y-4">
              <p>
                <span className="float-left text-4xl font-black mr-2 mt-[-6px] leading-none">S</span>
                implicity is the soul of efficiency. Writing code that is not just functional but maintainable is a craft that requires constant refinement. It is about creating systems that are robust, scalable, and easy to understand.
              </p>
              <p>
                In an era of rapid deployment, the true cost of software is not in its writing, but in its reading. Clean code is the legacy we leave for our future selves and our teams.
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-black flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-gray-300"></div> {/* Author Avatar Placeholder */}
               <div className="text-[10px] uppercase leading-tight">
                  <p className="font-bold">Sandeep Kahawaththa</p>
                  <p className="text-gray-500">Software Engineer</p>
               </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: Engineering & Architecture Skills */}
        <div className="lg:col-span-1 lg:border-l border-black/20 lg:pl-8 flex flex-col gap-8">
           {/* Section Header */}
           <div className="border-b-2 border-black pb-1 mb-2">
              <h5 className="font-bold text-lg uppercase tracking-wider">Infrastructure</h5>
           </div>

           {/* Skill Block 1 */}
           <article>
              <h6 className="font-black text-xl mb-2 font-display">Engineering Bureau</h6>
              <p className="font-serif text-sm text-gray-700 text-justify leading-relaxed mb-3">
                 Specializing in scalable web systems and mobile applications. Proficiency in full-stack development ensures seamless integration between client-side interfaces and server-side logic.
              </p>
              <ul className="text-[11px] font-mono uppercase flex flex-wrap gap-2 text-gray-600">
                 {tagList('Frontend').map(s => <li key={s} className="border border-gray-300 px-1">{s}</li>)}
              </ul>
           </article>

           <div className="w-full border-t border-dashed border-gray-400"></div>

           {/* Skill Block 2 */}
           <article>
              <h6 className="font-black text-xl mb-2 font-display">Architecture Dept.</h6>
              <p className="font-serif text-sm text-gray-700 text-justify leading-relaxed mb-3">
                 Constructing robust backends and efficient database schemas (SQL/NoSQL). Designing API ecosystems that prioritize security, speed, and data integrity for enterprise-level needs.
              </p>
              <ul className="text-[11px] font-mono uppercase flex flex-wrap gap-2 text-gray-600">
                 {[...tagList('Backend', 3), ...tagList('Databases', 3)].map(s => <li key={s} className="border border-gray-300 px-1">{s}</li>)}
              </ul>
           </article>
        </div>

        {/* COLUMN 3: Problem Solving, Innovation, Design */}
        <div className="lg:col-span-1 lg:border-l border-black/20 lg:pl-8 flex flex-col gap-8">
           {/* Section Header */}
           <div className="border-b-2 border-black pb-1 mb-2">
              <h5 className="font-bold text-lg uppercase tracking-wider">R&D Division</h5>
           </div>

           {/* Skill Block 3 */}
           <article>
              <h6 className="font-black text-xl mb-2 font-display">Problem Solving</h6>
              <p className="font-serif text-sm text-gray-700 text-justify leading-relaxed">
                 Applying logical analysis and algorithmic efficiency to complex challenges. Optimization of performance metrics is standard procedure for all deployed solutions.
              </p>
           </article>

           <div className="w-full border-t border-dashed border-gray-400"></div>

           {/* Skill Block 4 */}
           <article>
              <h6 className="font-black text-xl mb-2 font-display">AI/ML Laboratory</h6>
              <p className="font-serif text-sm text-gray-700 text-justify leading-relaxed mb-3">
                 Published researcher in Multi-Agent Reinforcement Learning and Graph Neural Networks — applying deep learning to real-world control problems, from architecture design to benchmarked results.
              </p>
              <ul className="text-[11px] font-mono uppercase flex flex-wrap gap-2 text-gray-600">
                 {tagList('AI & ML').map(s => <li key={s} className="border border-gray-300 px-1">{s}</li>)}
              </ul>
           </article>

           <div className="w-full border-t border-dashed border-gray-400"></div>

           {/* Skill Block 5 */}
           <article>
              <h6 className="font-black text-xl mb-2 font-display">Design Studio</h6>
              <p className="font-serif text-sm text-gray-700 text-justify leading-relaxed">
                 Crafting dynamic user interfaces with a focus on User Experience (UX) and visual aesthetics. Because code should look as good as it runs.
              </p>
           </article>
        </div>

      </div>
    </section>
  );
};

const ExperienceSection = ({ experience }) => {
  const badgeStyles = {
    'Production': 'bg-red-600 text-white',
    'Client Work': 'bg-black text-white',
    'Research': 'border border-black text-black'
  };

  return (
    <section id="experience" className="mb-20 border-t-8 border-black pt-4 scroll-mt-24">
      <div className="flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-2 mb-8 gap-4">
        <div>
          <h5 className="font-mono text-xs uppercase tracking-widest text-gray-600 mb-1">Section A</h5>
          <h3 className="text-5xl md:text-6xl font-black font-news uppercase tracking-tighter leading-none">
            Field<br/>Reports
          </h3>
        </div>
        <div className="text-right font-serif italic text-sm text-gray-600 max-w-md">
          Dispatches from production systems, client engagements, and published research — real-world work, verified in the field.
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {experience.map((exp) => (
          <article key={exp.org} className="border border-black p-6 flex flex-col gap-3 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <span className={`text-[11px] font-bold uppercase tracking-widest px-2 py-0.5 w-max ${badgeStyles[exp.type] || 'border border-black'}`}>
              {exp.type}
            </span>
            <h4 className="font-black text-2xl leading-tight font-news">{exp.org}</h4>
            <p className="text-sm font-bold uppercase tracking-wide text-gray-700">{exp.role}</p>
            <p className="font-serif text-sm text-gray-700 leading-relaxed flex-grow">{exp.summary}</p>
            <ul className="text-[11px] font-mono uppercase flex flex-wrap gap-2 text-gray-600">
              {exp.stack.map(s => <li key={s} className="border border-gray-300 px-1">{s}</li>)}
            </ul>
            {exp.link && (
              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 w-max hover:text-red-600 focus:text-red-600"
              >
                Visit Live Site &rarr;
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

const ClassifiedsSection = ({ skills, profile }) => {
  // Your original icon mapping logic moved here for cleanliness
  const getSkillIcon = (name) => {
    const n = name.toLowerCase().trim();
    if (n.includes('react') && n.includes('native')) return 'devicon-react-original';
    if (n.includes('react')) return 'devicon-react-original';
    if (n.includes('next')) return 'devicon-nextjs-original';
    if (n.includes('angular')) return 'devicon-angularjs-plain';
    if (n.includes('html')) return 'devicon-html5-plain';
    if (n.includes('css')) return 'devicon-css3-plain';
    if (n.includes('bootstrap')) return 'devicon-bootstrap-plain';
    if (n.includes('tailwind')) return 'devicon-tailwindcss-original';
    if (n.includes('mui') || n.includes('material')) return 'devicon-materialui-plain';
    if (n.includes('figma')) return 'devicon-figma-plain';
    if (n.includes('node')) return 'devicon-nodejs-plain';
    if (n.includes('nest')) return 'devicon-nestjs-plain';
    if (n.includes('express')) return 'devicon-express-original';
    if (n.includes('php')) return 'devicon-php-plain';
    if (n.includes('laravel')) return 'devicon-laravel-original';
    if (n.includes('java') && !n.includes('script')) return 'devicon-java-plain';
    if (n.includes('python')) return 'devicon-python-plain';
    if (n.includes('c++')) return 'devicon-cplusplus-plain';
    if (n === 'c') return 'devicon-c-plain';
    if (n.includes('mongo')) return 'devicon-mongodb-plain';
    if (n.includes('mysql')) return 'devicon-mysql-plain';
    if (n.includes('postgres')) return 'devicon-postgresql-plain';
    if (n.includes('firebase')) return 'devicon-firebase-plain';
    if (n.includes('redis')) return 'devicon-redis-plain';
    if (n.includes('supabase')) return 'devicon-supabase-plain';
    if (n.includes('sql')) return 'devicon-mysql-plain';
    if (n.includes('github')) return 'devicon-github-original';
    if (n.includes('git')) return 'devicon-git-plain';
    if (n.includes('typescript')) return 'devicon-typescript-plain';
    if (n.includes('javascript')) return 'devicon-javascript-plain';
    if (n.includes('pytorch')) return 'devicon-pytorch-original';
    if (n.includes('flask')) return 'devicon-flask-original';
    if (n.includes('docker')) return 'devicon-docker-plain';
    if (n.includes('jest')) return 'devicon-jest-plain';
    return 'devicon-devicon-plain';
  };

  return (
    <section id="classifieds" className="border-t-4 border-black pt-2 relative mt-20 mb-20">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full border-t border-black mt-1"></div>

      {/* Header Row */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8 mt-6 border-b-2 border-black pb-2 px-2">
        <div className="flex flex-col">
          <h3 className="bg-black text-white text-4xl font-black px-4 py-2 font-display uppercase tracking-widest transform -skew-x-6 inline-block w-max">
            Classifieds
          </h3>
          <span className="text-xs font-serif italic mt-1 text-gray-600">
            "The finest collection of syntax and logic."
          </span>
        </div>
        <div className="flex gap-6 text-[10px] font-mono uppercase tracking-widest text-right">
          <div>
            <p className="font-bold">Rates</p>
            <p>$ Negotiable</p>
          </div>
          <div>
            <p className="font-bold">Deadline</p>
            <p>ASAP</p>
          </div>
          <div className="border border-black px-2 py-1">
            Vol. 1 • Sec. C
          </div>
        </div>
      </div>

      {/* Masonry Layout for Content */}
      <div className="columns-1 md:columns-2 lg:columns-4 gap-6 px-2 pb-12">
        
        {/* SKILLS CATEGORIES */}
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="break-inside-avoid mb-8">
            {/* Category Header */}
            <div className="border-b-2 border-black mb-2 flex justify-between items-end">
              <h4 className="font-bold text-sm uppercase tracking-wider">{category}</h4>
              <span className="text-[9px] font-bold bg-black text-white px-1 mb-1">{items.length} ITEMS</span>
            </div>

            {/* Dense List with Dotted Leaders */}
            <ul className="space-y-1">
              {items.flatMap(skill => skill.includes('/') ? skill.split('/') : [skill]).map((skillName, i) => (
                  <li key={i} className="flex items-end justify-between text-xs font-serif hover:bg-yellow-100 transition-colors cursor-default group">
                    <div className="flex items-center gap-2 bg-[#fcfbf9] z-10 pr-1 group-hover:bg-yellow-100">
                      {/* Ink-style Icon */}
                      <i className={`${getSkillIcon(skillName)} grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all text-sm`}></i>
                      <span className="font-bold uppercase tracking-tight">{skillName.trim()}</span>
                    </div>
                    {/* The "Dot Leader" Effect */}
                    <div className="flex-grow border-b-2 border-dotted border-gray-300 mb-1 mx-1"></div>
                    <span className="bg-[#fcfbf9] z-10 pl-1 text-[10px] italic text-gray-500 group-hover:bg-yellow-100">
                      Avail.
                    </span>
                  </li>
              ))}
            </ul>
          </div>
        ))}

        {/* THE "COUPON" (Contact Section) */}
        <div className="break-inside-avoid mb-8 relative group">
          <div className="border-2 border-dashed border-gray-800 p-4 bg-white relative hover:shadow-lg transition-shadow duration-300">
            {/* Scissor Icon for "Cut Here" effect */}
            <div className="absolute -top-3 -left-3 bg-[#fcfbf9] p-1 text-xl rotate-[-45deg]">✂️</div>
            <div className="absolute -bottom-3 -right-3 bg-[#fcfbf9] p-1 text-xl rotate-[135deg]">✂️</div>
            
            <div className="text-center border border-black p-2">
              <h5 className="font-black text-2xl uppercase leading-none mb-1">Help<br/>Wanted</h5>
              <p className="text-[10px] font-mono uppercase tracking-widest mb-4">Immediate Opening</p>
              
              <div className="font-serif text-xs italic leading-tight mb-4 text-gray-600">
                "Seeking visionary team for high-stakes engineering. Must appreciate clean code and strong coffee."
              </div>
              
              <div className="bg-black text-white p-2 mb-2 transform -rotate-1">
                <p className="text-sm font-bold uppercase">Call To Action</p>
                <p className="text-xs font-mono">{profile.contact.email}</p>
              </div>
              
              <a 
                href={`mailto:${profile.contact.email}`}
                className="block w-full border-2 border-black py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors"
              >
                Clip & Contact
              </a>
              
              <p className="text-[10px] uppercase mt-2 text-gray-500">Valid until hired</p>
            </div>
          </div>
        </div>

        {/* EXTRA: "Horoscope" / Fun Fact to fill space */}
        <div className="break-inside-avoid border-t border-b border-black py-4 mb-8">
            <h5 className="font-bold text-xs uppercase mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">auto_awesome</span>
                Engineering Horoscope
                <span className="text-[8px] border border-black px-1 font-mono">Satire</span>
            </h5>
            <p className="font-serif text-xs leading-relaxed text-justify">
                <strong>Today:</strong> Your div will center perfectly on the first try. A deployment will succeed without warnings. Expect good fortune in code reviews.
            </p>
        </div>

      </div>
    </section>
  );
};

const ContactSection = ({ profile }) => {
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  // No backend on GitHub Pages: compose the letter into a mailto link
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${senderName || 'your portfolio'}`);
    const body = encodeURIComponent(`${message}\n\n— ${senderName}`);
    window.location.href = `mailto:${profile.contact.email}?subject=${subject}&body=${body}`;
  };

  const services = [
    "Full-stack web applications (React, Next.js, NestJS, Node.js)",
    "Mobile applications (React Native)",
    "REST APIs, backends & database design",
    "AI/ML integrations & research collaboration"
  ];

  return (
    <section id="contact" className="border-t-8 border-black pt-4 mb-20 scroll-mt-24">
      <div className="flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-2 mb-8 gap-4">
        <div>
          <h5 className="font-mono text-xs uppercase tracking-widest text-gray-600 mb-1">Section D</h5>
          <h3 className="text-5xl md:text-6xl font-black font-news uppercase tracking-tighter leading-none">
            Letters to<br/>the Editor
          </h3>
        </div>
        <div className="text-right font-serif italic text-sm text-gray-600 max-w-md">
          {profile.availability}. Replies within 24 hours.
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Services / what you can commission */}
        <div className="border border-black p-6 md:p-8 bg-white">
          <span className="text-[11px] font-bold uppercase tracking-widest text-red-600 mb-2 block">Situations Wanted</span>
          <h4 className="font-black text-3xl leading-tight mb-4 font-news">Commission the Engineer</h4>
          <p className="font-serif text-sm text-gray-700 leading-relaxed mb-6">
            Available for freelance engagements and full-time software engineering roles. Current bureau services include:
          </p>
          <ul className="space-y-3 mb-8">
            {services.map(service => (
              <li key={service} className="flex items-start gap-3 font-serif text-sm text-gray-800">
                <span className="font-black text-red-600 leading-none mt-0.5" aria-hidden="true">■</span>
                {service}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.contact.email}?subject=${encodeURIComponent('Project inquiry')}`}
              className="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-colors"
            >
              Email the Editor
            </a>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="/resume.pdf"
              download="Sandeep_Kahawaththa_CV.pdf"
              className="border border-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Download CV
            </a>
          </div>
          <p className="mt-6 text-xs font-mono uppercase tracking-widest text-gray-600">
            {profile.contact.email} · {profile.contact.phone} · {profile.location}
          </p>
        </div>

        {/* Letter composer */}
        <form onSubmit={handleSubmit} className="border-2 border-dashed border-gray-800 p-6 md:p-8 bg-white flex flex-col gap-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-600">Compose a Letter</span>
          <label className="flex flex-col gap-1 text-xs font-bold uppercase tracking-widest">
            Your name
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              required
              placeholder="Jane Doe, Acme Corp"
              className="border border-black p-3 font-serif text-base font-normal normal-case tracking-normal focus:outline-2 focus:outline-red-600"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-bold uppercase tracking-widest flex-grow">
            Your message
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              placeholder="Dear Editor, we have a project in mind..."
              className="border border-black p-3 font-serif text-base font-normal normal-case tracking-normal flex-grow resize-y focus:outline-2 focus:outline-red-600"
            />
          </label>
          <button
            type="submit"
            className="bg-black text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-colors"
          >
            Send via your email client &rarr;
          </button>
          <p className="text-[11px] font-serif italic text-gray-600 text-center">
            Opens your mail app with the letter pre-filled — no data is stored on this site.
          </p>
        </form>
      </div>
    </section>
  );
};

const NewPortfolio = ({ projects, profile, skills, education, achievements, experience }) => {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Helper to get first 3 projects for the main stories
  const mainStories = projects.slice(0, 3);

  const [activeSection, setActiveSection] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  // Scroll Reveal Hooks
  const [profileRef, isProfileRevealed] = useScrollReveal();
  const [cleanCodeRef, isCleanCodeRevealed] = useScrollReveal();
  const [project1Ref, isProject1Revealed] = useScrollReveal();
  const [project2Ref, isProject2Revealed] = useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['editorial', 'experience', 'projects', 'classifieds', 'contact'];
      const scrollPosition = window.scrollY + 250; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-[#fcfbf9] text-[#0d121b] font-news selection:bg-black selection:text-white">

      {/* New Header Design */}
      <header className="w-full border-b-[3px] border-black dark:border-white pt-6 pb-2 px-4 md:px-12 bg-paper dark:bg-background-dark relative z-10">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
          <div className="w-full flex justify-between items-center text-xs md:text-sm font-bold border-b border-black dark:border-white/20 pb-2 mb-4 uppercase tracking-widest font-mono">
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

      {/* Sticky Navigation & Ticker */}
      <div className="sticky top-0 z-50 bg-[#fcfbf9] dark:bg-[#101622] border-b border-black dark:border-white/20">
        <div className="w-full border-t border-black dark:border-white/20 border-b border-black dark:border-white/20 py-2 px-4 flex items-center justify-start md:justify-center gap-6 md:gap-12 text-sm md:text-base font-bold uppercase tracking-wide font-sans bg-[#fcfbf9] dark:bg-[#101622] overflow-x-auto whitespace-nowrap">
          {[
            { id: 'editorial', label: 'About' },
            { id: 'experience', label: 'Experience' },
            { id: 'projects', label: 'Projects' },
            { id: 'classifieds', label: 'Skills' },
            { id: 'contact', label: 'Contact' }
          ].map(({ id, label }) => (
            <a
              key={id}
              className={`relative group transition-colors duration-300 ${activeSection === id ? 'text-red-600' : 'hover:text-red-600'}`}
              href={`#${id}`}
            >
              {label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${activeSection === id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </a>
          ))}
          <a
            href="#contact"
            className="bg-red-600 text-white px-4 py-1 text-xs md:text-sm hover:bg-black transition-colors"
          >
            Hire Me
          </a>
        </div>
        <BreakingNews />
      </div>

      <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        
        {/* Hero Section / Cover Story */}
        {/* Combined Hero & Skills Section */}
        <section id="editorial" className="mb-20">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN - Main Content */}
            <div className="lg:col-span-9 flex flex-col">
              
              {/* HERO CONTENT */}
              <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
                  {/* Text Column */}
                  <div className="flex flex-col justify-center">
                     <div className="flex items-center gap-2 mb-6 border-b border-black pb-2 w-max">
                        <span className="bg-black text-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest">Cover Story</span>
                        <span className="text-xs italic font-serif">By {profile.name}</span>
                     </div>

                     <h2 className="text-5xl md:text-6xl font-black leading-[0.9] mb-6 font-news uppercase tracking-tighter">
                        Full-Stack <br/> Developer <br/>
                        <span className="italic font-serif font-light">Publishes</span> <br/>
                        AI Research
                     </h2>

                     <div className="border-l-4 border-black pl-6 py-2 mb-8">
                        <p className="text-lg font-serif leading-relaxed text-gray-800">
                           {profile.role} — {profile.location}
                        </p>
                     </div>

                     <div className="prose prose-lg text-gray-700 mb-8 font-serif text-justify text-sm leading-relaxed">
                        <p className="drop-cap">
                           {profile.bio}
                        </p>
                     </div>

                     <div className="flex gap-4">
                        <a href="#contact" className="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-colors">
                           Hire Me
                        </a>
                        <a href="#projects" className="border border-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors">
                           View Projects
                        </a>
                     </div>
                  </div>

                  {/* Image Column */}
                  <div className="relative group">
                     <div ref={profileRef} className={`relative w-full aspect-[3/4] overflow-hidden border border-black dark:border-white contrast-125 brightness-110 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-1000 ease-out`}>
                        <img 
                           src={profileImage} 
                           alt="Portrait of a software engineer looking confident against a blurred city background" 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* CSS Halftone overlay */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
                        <div className="halftone-overlay absolute inset-0"></div>
                        <div className="absolute inset-0 bg-gray-200/30 mix-blend-multiply pointer-events-none"></div>
                     </div>
                     <div className="mt-2 text-xs font-mono text-gray-500 text-right uppercase tracking-widest">
                        Fig 1.1 — The Architect
                     </div>
                  </div>
              </div>

              {/* SKILLS CONTENT */}
              <TechnicalSection
                cleanCodeRef={cleanCodeRef}
                cleanCodeImage={cleanCodeImage}
                skills={skills}
              />

            </div>

            {/* RIGHT COLUMN - Sidebar */}
            <div className="lg:col-span-3 flex flex-col gap-8 border-t-4 border-black pt-8 mt-4 lg:border-t-0 lg:pt-0 lg:mt-0 lg:border-l lg:border-black lg:pl-8">
              
              {/* Education */}
              <div>
                <div className="border-b-2 border-black mb-4 pb-1 text-center">
                  <h4 className="font-news text-2xl font-bold">Academic Annals</h4>
                </div>
                <div className="space-y-6 font-serif">
                  {education.map((edu, index) => (
                    <div key={index}>
                      <h5 className="font-bold text-lg leading-tight">{edu.degree}</h5>
                      <p className="text-sm italic text-gray-600">{edu.institution}, {edu.year}</p>
                      <p className="text-xs mt-1 text-gray-500 leading-snug">
                        Specialization in Software Engineering.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Classifieds / Contact */}
              <div className="bg-[#2a2a2a] text-[#fcfbf9] p-6 text-center border-4 border-double border-[#fcfbf9] outline outline-1 outline-black">
                <h4 className="font-news text-2xl font-bold mb-1 uppercase tracking-widest border-b border-white/20 pb-2">Classifieds</h4>
                <p className="text-[10px] font-mono uppercase tracking-widest mb-4 text-gray-400">Help Wanted</p>
                <h5 className="text-xl font-bold leading-tight mb-2 font-serif">EXPERT ENGINEER FOR HIRE</h5>
                <p className="text-xs italic text-gray-400 mb-4">Proven track record. Will travel (remotely).</p>
                <a href="/resume.pdf" download="Sandeep_Kahawaththa_CV.pdf" className="inline-block border border-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors w-full">
                  Download Portfolio CV
                </a>
              </div>

              {/* Links */}
              <div className="grid grid-cols-2 gap-4">
                <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="border border-black p-2 text-center hover:bg-black hover:text-white transition-colors group">
                  <div className="mb-1 flex justify-center group-hover:scale-110 transition-transform"><Linkedin size={20} /></div>
                  <div className="text-[10px] font-bold uppercase tracking-widest">LinkedIn Registry</div>
                  <div className="text-[10px] font-serif italic">Connect Professionally</div>
                </a>
                <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="border border-black p-2 text-center hover:bg-black hover:text-white transition-colors group">
                  <div className="mb-1 flex justify-center group-hover:scale-110 transition-transform"><Github size={20} /></div>
                  <div className="text-[10px] font-bold uppercase tracking-widest">Github Repository</div>
                  <div className="text-[10px] font-serif italic">Inspect The Source</div>
                </a>
              </div>

              {/* Hall of Fame (Achievements) */}
              <div className="mt-8 border-t-2 border-black pt-8" id="achievements">
                 <div className="border-b-2 border-black mb-6 pb-1">
                    <h4 className="font-news text-xl font-bold">Hall of Fame</h4>
                 </div>
                 
                 <div className="space-y-6">
                   {achievements.map((achievement, index) => (
                     <article key={index} className="border-b border-gray-200 pb-4 last:border-0 group">
                       <div className="flex items-center gap-2 mb-2">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-black px-1">Recognition</span>
                         {achievement.year && (
                           <span className="text-[10px] text-gray-500 font-mono">{achievement.year}</span>
                         )}
                       </div>
                       <h5 className="font-bold text-sm leading-tight mb-2">{achievement.title}</h5>
                       <p className="text-xs font-serif text-gray-600 italic">
                          {achievement.org}
                       </p>
                     </article>
                   ))}
                 </div>
              </div>

            </div>
          </div>
        </section>

        {/* Experience / Field Reports */}
        <ExperienceSection experience={experience} />

        {/* Latest Stories / Projects */}
        <ProjectSection projects={projects} onProjectClick={setSelectedProject} />

        {/* Classifieds / Skills */}
        <ClassifiedsSection skills={skills} profile={profile} />

        {/* Contact / Letters to the Editor */}
        <ContactSection profile={profile} />

        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-[#fcfbf9] py-16 border-t-8 border-black double-border-top">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12 border-b border-gray-800 pb-12">
            
            {/* Column 1: Masthead */}
            <div className="md:col-span-4">
              <h2 className="text-4xl font-display font-black mb-4 tracking-tighter">The Daily Dev</h2>
              <p className="font-serif italic text-gray-400 mb-6 leading-relaxed">
                "All the code that's fit to commit."
              </p>
              <div className="text-xs font-mono text-gray-500 uppercase tracking-widest space-y-2">
                <p>Est. {new Date().getFullYear()}</p>
                <p>Published in Digital Space</p>
                <p>Vol. 404, Issue 1</p>
              </div>
            </div>

            {/* Column 2: Index (Navigation) */}
            <div className="md:col-span-3">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-700 pb-2 text-gray-300">Index</h3>
              <ul className="space-y-3 font-serif text-sm text-gray-400">
                <li><a href="#editorial" className="hover:text-white hover:underline decoration-1 underline-offset-4 transition-colors">About & Cover Story</a></li>
                <li><a href="#experience" className="hover:text-white hover:underline decoration-1 underline-offset-4 transition-colors">Experience (Field Reports)</a></li>
                <li><a href="#projects" className="hover:text-white hover:underline decoration-1 underline-offset-4 transition-colors">Projects (Latest Stories)</a></li>
                <li><a href="#classifieds" className="hover:text-white hover:underline decoration-1 underline-offset-4 transition-colors">Skills (Classifieds)</a></li>
                <li><a href="#contact" className="hover:text-white hover:underline decoration-1 underline-offset-4 transition-colors">Contact (Letters to the Editor)</a></li>
              </ul>
            </div>

            {/* Column 3: Syndication (Socials) */}
            <div className="md:col-span-3">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-700 pb-2 text-gray-300">Syndication</h3>
              <ul className="space-y-4">
                <li>
                  <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <span className="bg-white text-black w-6 h-6 flex items-center justify-center rounded-sm group-hover:scale-110 transition-transform">
                      <Github size={14} />
                    </span>
                    <span className="font-serif text-sm italic group-hover:underline decoration-1 underline-offset-4">Github Repository</span>
                  </a>
                </li>
                <li>
                  <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <span className="bg-[#0077b5] text-white w-6 h-6 flex items-center justify-center rounded-sm group-hover:scale-110 transition-transform">
                      <Linkedin size={14} />
                    </span>
                    <span className="font-serif text-sm italic group-hover:underline decoration-1 underline-offset-4">LinkedIn Registry</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${profile.contact.email}`} className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <span className="bg-gray-700 text-white w-6 h-6 flex items-center justify-center rounded-sm group-hover:scale-110 transition-transform">
                      <Mail size={14} />
                    </span>
                    <span className="font-serif text-sm italic group-hover:underline decoration-1 underline-offset-4">Letter to Editor</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Subscription / Extra */}
            <div className="md:col-span-2">
               <div className="border border-gray-700 p-4 text-center bg-[#222]">
                  <p className="font-display font-bold text-xl mb-2 text-white">Print Edition</p>
                  <p className="font-serif text-xs text-gray-400 mb-4 italic">Take a copy of the full record with you.</p>
                  <a href="/resume.pdf" download="Sandeep_Kahawaththa_CV.pdf" className="block w-full bg-white text-black text-[11px] font-bold uppercase tracking-widest py-2 hover:bg-gray-200 transition-colors">
                    Download CV
                  </a>
               </div>
            </div>

          </div>

          {/* Colophon */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-gray-600">
            <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
            <div className="flex gap-4">
               <span>Printed in HTML & CSS</span>
               <span>•</span>
               <span>Recycled Pixels</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
    </MotionConfig>
  );
};

export default NewPortfolio;
