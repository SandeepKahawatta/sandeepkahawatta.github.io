import React, { useState, useEffect, useRef } from 'react';
import profileImage from '../assets/my/profile.jpg';
import cleanCodeImage from '../assets/generated/clean_code_illustration.png';
import BreakingNews from './BreakingNews';

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
            layoutId={`project-${project.title}`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#fcfbf9] border-4 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] overflow-y-auto overflow-x-hidden p-6 md:p-12"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
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
                <span>Published {new Date().toLocaleDateString()}</span>
              </div>

              <div className="border-2 border-black p-1 mb-8">
                <img src={project.image} alt={project.title} className="w-full h-auto grayscale-0" />
              </div>

              <div className="columns-1 md:columns-2 gap-8 font-serif text-justify leading-relaxed">
                <p className="drop-cap text-lg mb-4">{project.description}</p>
                <div className="mt-6 p-4 bg-gray-100 border-l-4 border-black italic">
                   "The technical stack involved {project.tech.join(', ')}. This architectural approach ensured maximum efficiency."
                </div>
                <div className="mt-8 flex flex-col gap-4">
                  <h4 className="font-bold uppercase tracking-widest border-b border-black text-xs">Repository Access</h4>
                  <a href="#" className="bg-black text-white text-center py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-colors">
                    Visit Source Code &rarr;
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ProjectSection = ({ projects }) => {
  const [headlineRef, isHeadlineRevealed] = useScrollReveal();
  return (
    <section id="projects" className="mb-20 border-t-4 border-black pt-8">
      {/* SECTION TITLE */}
      <div className="flex justify-between items-center mb-8 border-b border-black pb-2">
        <h3 className="text-4xl font-black font-news uppercase tracking-tighter">Technical Gazette</h3>
        <span className="font-serif italic text-sm">Volume III • Project Archive</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* LEFT: MAIN HEADLINE (Project 0) */}
        <div className="lg:col-span-7 border-r border-black/10 pr-0 lg:pr-8">
          <article className="group">
            <div ref={headlineRef} className="relative mb-4 overflow-hidden border border-black p-1 bg-white">
              <img 
                src={projects[0].image} 
                className="w-full grayscale hover:grayscale-0 transition-all duration-700 aspect-video object-cover" 
              />
            </div>
            <span className="text-xs font-bold bg-red-600 text-white px-2 py-0.5 uppercase mb-2 inline-block">Special Report</span>
            <h2 className="text-4xl font-black leading-none mb-4 group-hover:underline">{projects[0].title}</h2>
            <p className="font-serif text-lg leading-relaxed mb-4 text-justify">
              <span className="float-left text-6xl font-black mr-3 mt-1 leading-none">T</span>
              {projects[0].description}
            </p>
            <div className="flex gap-2 mb-4">
               {projects[0].tech.map(t => <span key={t} className="text-[10px] border border-black px-2 py-0.5 font-mono uppercase italic">{t}</span>)}
            </div>
          </article>
        </div>

        {/* MIDDLE: SUB-STORIES (Project 1 & 2) */}
        <div className="lg:col-span-3 flex flex-col gap-8 border-r border-black/10 pr-0 lg:pr-8">
          {projects.slice(1, 3).map((project, idx) => (
            <article key={idx} className="group border-b border-black/10 pb-6 last:border-0">
              <div className="border border-black mb-3 p-1">
                <img src={project.image} className="w-full grayscale group-hover:grayscale-0 transition-all aspect-square object-cover" />
              </div>
              <h4 className="font-bold text-xl leading-tight mb-2 group-hover:underline">{project.title}</h4>
              <p className="text-sm font-serif text-gray-700 line-clamp-3">{project.description}</p>
            </article>
          ))}
        </div>

        {/* RIGHT: THE "NEWS BRIEFS" (Project 3+) */}
        <div className="lg:col-span-2">
          <h5 className="font-black uppercase border-b-2 border-black mb-4 text-center bg-black text-white text-xs py-1">Code Briefs</h5>
          <div className="flex flex-col gap-6">
            {projects.slice(3).map((project, idx) => (
              <div key={idx} className="border-b border-dashed border-gray-400 pb-4 last:border-0">
                <p className="text-[10px] font-bold text-red-600 uppercase mb-1">{project.category || 'Repository'}</p>
                <h6 className="font-bold text-sm leading-tight mb-1 hover:underline cursor-pointer">{project.title}</h6>
                <p className="text-[11px] font-serif italic text-gray-500 line-clamp-2">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const NewPortfolio = ({ projects, profile, skills, education, achievements }) => {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Helper to get first 3 projects for the main stories
  const mainStories = projects.slice(0, 3);

  const [activeSection, setActiveSection] = useState('');

  // Scroll Reveal Hooks
  const [profileRef, isProfileRevealed] = useScrollReveal();
  const [cleanCodeRef, isCleanCodeRevealed] = useScrollReveal();
  const [project1Ref, isProject1Revealed] = useScrollReveal();
  const [project2Ref, isProject2Revealed] = useScrollReveal();

  // ... inside NewPortfolio component, before return ( ...

  // NEW: Newspaper Print Styles
  const printStyles = `
    @media print {
      @page {
        size: A4;
        margin: 1cm;
      }
      
      /* HIDE WEB ELEMENTS */
      nav, .sticky, header button, .print\\:hidden, 
      footer .md\\:col-span-2, /* Hide Subscribe box */
      .bg-black.text-white, /* Hide black buttons to save ink */
      button {
        display: none !important;
      }

      /* LAYOUT OVERRIDES */
      body {
        background: white !important;
        color: black !important;
        font-size: 10pt !important; /* Smaller newspaper font */
      }
      
      .min-h-screen {
        height: auto !important;
      }

      /* Force images to be visible and look like newsprint */
      img {
        filter: grayscale(100%) contrast(150%) !important;
        opacity: 1 !important; /* Override scroll reveal */
        transition: none !important;
      }
      
      /* Use CSS Columns for text flow instead of flex/grid where possible */
      p {
        text-align: justify;
        line-height: 1.4;
      }

      /* Header adjustments */
      h1 { font-size: 4rem !important; margin-bottom: 1rem !important; }
      h2 { font-size: 2.5rem !important; }

      /* Prevent awkward breaks */
      article, .grid, section {
        break-inside: avoid;
        page-break-inside: avoid;
      }

      /* Expand containers */
      .max-w-\[1200px\] {
        max-width: 100% !important;
        padding: 0 !important;
      }
    }
  `;

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['editorial', 'achievements', 'skills', 'projects', 'classifieds'];
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
    <div className="min-h-screen bg-[#fcfbf9] text-[#0d121b] font-news selection:bg-black selection:text-white">
      
      {/* New Header Design */}
      <header className="w-full border-b-[3px] border-black dark:border-white pt-6 pb-2 px-4 md:px-12 bg-paper dark:bg-background-dark relative z-10">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
          <div className="w-full flex justify-between items-center text-xs md:text-sm font-bold border-b border-black dark:border-white/20 pb-2 mb-4 uppercase tracking-widest font-mono">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base">calendar_month</span>
              <span>{currentDate}</span>
            </div>
            {/* --- NEW PRINT BUTTON --- */}
            <button 
              onClick={() => window.print()}
              className="hidden md:flex items-center gap-2 hover:text-red-600 transition-colors cursor-pointer print:hidden"
            >
              <span className="material-symbols-outlined text-base">print</span>
              <span>Print Physical Edition</span>
            </button>
            {/* ------------------------ */}
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
        <div className="w-full border-t border-black dark:border-white/20 border-b border-black dark:border-white/20 py-2 flex justify-center gap-8 md:gap-16 text-sm md:text-base font-bold uppercase tracking-wide font-sans bg-[#fcfbf9] dark:bg-[#101622]">
          <a className={`relative group transition-colors duration-300 ${activeSection === 'editorial' ? 'text-red-600' : 'hover:text-red-600'}`} href="#editorial">
            Editorial
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${activeSection === 'editorial' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </a>
          <a className={`relative group transition-colors duration-300 ${activeSection === 'projects' ? 'text-red-600' : 'hover:text-red-600'}`} href="#projects">
            Projects
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${activeSection === 'projects' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </a>
          <a className={`relative group transition-colors duration-300 ${activeSection === 'skills' ? 'text-red-600' : 'hover:text-red-600'}`} href="#skills">
            Skills
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${activeSection === 'skills' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </a>
          <a className={`relative group transition-colors duration-300 ${activeSection === 'classifieds' ? 'text-red-600' : 'hover:text-red-600'}`} href="#classifieds">
            Classifieds
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${activeSection === 'classifieds' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </a>
          {/* <a className={`relative group transition-colors duration-300 ${activeSection === 'achievements' ? 'text-red-600' : 'hover:text-red-600'}`} href="#achievements">
            Achievements
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${activeSection === 'achievements' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </a> */}
        </div>
        <BreakingNews />
      </div>

      <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        
        {/* Hero Section / Cover Story */}
        {/* Combined Hero & Skills Section */}
        <section id="editorial" className="mb-20 border-b-4 border-black pb-12">
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
                        Full Stack <br/> Architect <br/>
                        <span className="italic font-serif font-light">Redefines</span> <br/>
                        Scalability
                     </h2>

                     <div className="border-l-4 border-black pl-6 py-2 mb-8">
                        <p className="text-lg font-serif leading-relaxed text-gray-800">
                           By Sandeep K.
                        </p>
                     </div>

                     <div className="prose prose-lg text-gray-700 mb-8 font-serif text-justify text-sm leading-relaxed">
                        <p className="drop-cap">
                           {profile.bio}
                        </p>
                     </div>

                     <div className="flex gap-4">
                        <button className="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                           Read Full Bio
                        </button>
                        <button className="border border-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors">
                           Contact
                        </button>
                     </div>
                  </div>

                  {/* Image Column */}
                  <div className="relative group">
                     <div ref={profileRef} className={`relative w-full aspect-[3/4] overflow-hidden border border-black dark:border-white contrast-125 brightness-110 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-1000 ease-out ${isProfileRevealed ? 'grayscale-0' : 'grayscale'}`}>
                        <img 
                           src={profileImage} 
                           alt="Portrait of a software engineer looking confident against a blurred city background" 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* CSS Halftone overlay */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
                        <div className="halftone-overlay absolute inset-0"></div>
                     </div>
                     <div className="mt-2 text-xs font-mono text-gray-500 text-right uppercase tracking-widest">
                        Fig 1.1 — The Architect
                     </div>
                  </div>
              </div>

              {/* SKILLS CONTENT */}
              <div className="border-t-4 border-black pt-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="md:w-1/3 flex flex-col">
                     <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Special Report</p>
                     <div className="w-full h-1 bg-black mb-6"></div>
                     
                     <div className="flex-grow">
                        <div className="border border-black mb-4 p-1">
                           <img ref={cleanCodeRef} src={cleanCodeImage} alt="Clean Code Architecture" className={`w-full h-auto contrast-125 transition-all duration-1000 ease-out ${isCleanCodeRevealed ? 'grayscale-0' : 'grayscale'}`} />
                        </div>
                        <div className="border-t-2 border-black pt-2">
                           <span className="text-[10px] font-bold uppercase tracking-widest bg-black text-white px-1 mb-2 inline-block">Editorial</span>
                           <h4 className="font-bold text-xl leading-tight mb-3 font-news">The Art of Clean Code</h4>
                           <p className="text-xs font-serif text-gray-600 text-justify leading-relaxed mb-4">
                              "Simplicity is the soul of efficiency." Writing code that is not just functional but maintainable is a craft that requires constant refinement and discipline. It is about creating systems that are robust, scalable, and easy to understand.
                           </p>
                           <p className="text-xs font-serif text-gray-600 text-justify leading-relaxed">
                              In an era of rapid deployment, the true cost of software is not in its writing, but in its reading. Clean code is the legacy we leave for our future selves and our teams.
                           </p>
                        </div>
                     </div>
                  </div>
                  
                  <div className="md:w-2/3" id="skills">
                    <div className="mb-8 border-b-2 border-black pb-4">
                       <h3 className="text-4xl font-black font-news uppercase leading-none">Expertise<br/>& Skills</h3>
                       <p className="font-serif italic text-sm text-gray-600 mt-2">
                         A comprehensive breakdown of technical capabilities and architectural proficiency.
                       </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                      <div className="border-t border-black pt-2">
                         <h4 className="font-serif text-2xl font-bold italic leading-tight mb-3">"Engineering"</h4>
                         <p className="font-serif text-gray-800 leading-relaxed text-sm">
                           Scalable Web Systems, Mobile Applications & Full-Stack Development.
                         </p>
                      </div>
                      
                      <div className="border-t border-black pt-2">
                         <h4 className="font-serif text-2xl font-bold italic leading-tight mb-3">"Architecting"</h4>
                         <p className="font-serif text-gray-800 leading-relaxed text-sm">
                           Robust Backends, Database Schemas (SQL/NoSQL) & API Ecosystems.
                         </p>
                      </div>

                      <div className="border-t border-black pt-2">
                         <h4 className="font-serif text-2xl font-bold italic leading-tight mb-3">"Problem Solving"</h4>
                         <p className="font-serif text-gray-800 leading-relaxed text-sm">
                           Logical Analysis, Algorithmic Efficiency & Performance Optimization.
                         </p>
                      </div>

                      <div className="border-t border-black pt-2">
                         <h4 className="font-serif text-2xl font-bold italic leading-tight mb-3">"Innovating"</h4>
                         <p className="font-serif text-gray-800 leading-relaxed text-sm">
                           Emerging Technologies, Machine Learning Integrations & Modern Frameworks.
                         </p>
                      </div>

                      <div className="md:col-span-2 border-t border-black pt-2">
                         <h4 className="font-serif text-2xl font-bold italic leading-tight mb-3">"Designing"</h4>
                         <p className="font-serif text-gray-800 leading-relaxed text-sm">
                           Dynamic User Interfaces, User Experience (UX) & Visual Aesthetics.
                         </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN - Sidebar */}
            <div className="lg:col-span-3 flex flex-col gap-8 border-l border-black pl-8 hidden lg:flex">
              
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
                <a href="/resume.pdf" download="Sandeep_Kahawatta_CV.pdf" className="inline-block border border-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors w-full">
                  Download Portfolio CV
                </a>
              </div>

              {/* Links */}
              <div className="grid grid-cols-2 gap-4">
                <a href={profile.contact.linkedin} className="border border-black p-2 text-center hover:bg-black hover:text-white transition-colors group">
                  <div className="text-xl mb-1 group-hover:scale-110 transition-transform"><i className="fab fa-linkedin"></i></div>
                  <div className="text-[10px] font-bold uppercase tracking-widest">LinkedIn Registry</div>
                  <div className="text-[8px] font-serif italic">Connect Professionally</div>
                </a>
                <a href={profile.contact.github} className="border border-black p-2 text-center hover:bg-black hover:text-white transition-colors group">
                  <div className="text-xl mb-1 group-hover:scale-110 transition-transform"><i className="fab fa-github"></i></div>
                  <div className="text-[10px] font-bold uppercase tracking-widest">Github Repository</div>
                  <div className="text-[8px] font-serif italic">Inspect The Source</div>
                </a>
              </div>

              {/* Hall of Fame (Achievements) */}
              <div className="mt-8 border-t-2 border-black pt-8" id="achievements">
                 <div className="border-b-2 border-black mb-6 pb-1">
                    <h4 className="font-news text-xl font-bold">Hall of Fame</h4>
                 </div>
                 
                 <div className="space-y-6">
                   {achievements.map((achievement, index) => (
                     <article key={index} className="border-b border-gray-200 pb-4 last:border-0 group cursor-pointer">
                       <div className="flex items-center gap-2 mb-2">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-black px-1">Recognition</span>
                         <span className="text-[10px] text-gray-500 font-mono">{new Date().getFullYear()}</span>
                       </div>
                       <h5 className="font-bold text-sm leading-tight mb-2 group-hover:underline">{achievement}</h5>
                       <p className="text-xs font-serif text-gray-600 italic">
                          Reported by the editorial board.
                       </p>
                     </article>
                   ))}
                 </div>
              </div>

            </div>
          </div>
        </section>

        {/* Latest Stories / Projects */}
        <ProjectSection projects={projects} />

        {/* Classifieds / Skills */}
        {/* Classifieds / Skills */}
        <section id="classifieds" className="border-t-4 border-black pt-2 relative">
           <div className="absolute top-0 left-0 w-full border-t border-black mt-1"></div>
           
           <div className="flex items-center justify-between gap-4 mb-8 mt-8 border-b-2 border-black pb-2">
             <div className="flex items-center gap-4">
                <h3 className="bg-black text-white text-3xl font-black px-4 py-1 font-display uppercase tracking-widest transform -skew-x-12">Classifieds</h3>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 border border-black px-2 py-1">Vol. 1 • Sec. C</span>
             </div>
             <div className="text-[10px] font-mono uppercase tracking-widest text-right hidden md:block">
                <p>Call for Rates: 555-0199</p>
                <p>Deadline: 5PM Daily</p>
             </div>
           </div>

           <div className="columns-1 md:columns-2 lg:columns-4 gap-8 space-y-8">
             {Object.entries(skills).map(([category, items]) => (
               <div key={category} className="break-inside-avoid mb-6">
                 <h4 className="font-bold border-b-2 border-black mb-4 pb-1 text-sm uppercase tracking-wider flex justify-between items-end">
                    <span>{category}</span>
                    <span className="text-[10px] font-normal normal-case italic">Avail. Now</span>
                 </h4>
                 <div className="grid grid-cols-2 gap-2">
                   {items.flatMap(skill => {
                      // Split combined skills like "CSS/Bootstrap"
                      return skill.includes('/') ? skill.split('/') : [skill];
                   }).map((skillName, i) => {
                     // Helper to get icon class based on skill name
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
                        if (n.includes('sql')) return 'devicon-mysql-plain'; // Fallback for SQL
                        if (n.includes('git')) return 'devicon-git-plain';
                        if (n.includes('typescript')) return 'devicon-typescript-plain';
                        if (n.includes('javascript')) return 'devicon-javascript-plain';
                        return 'devicon-devicon-plain'; // Default
                     };

                     return (
                       <div key={`${category}-${i}`} className="flex items-center gap-2 border border-black p-1 hover:bg-gray-100 transition-colors">
                          <i className={`${getSkillIcon(skillName)} text-xl`}></i>
                          <span className="text-[10px] font-mono font-bold leading-tight uppercase truncate">
                            {skillName.trim()}
                          </span>
                       </div>
                     );
                   })}
                 </div>
                 <div className="italic text-gray-500 mt-2 text-[9px] text-right border-t border-dashed border-gray-400 pt-1">-- End of Section --</div>
               </div>
             ))}

             {/* Contact Box - Styled as a Display Ad */}
             <div className="break-inside-avoid border-4 border-black p-4 text-center relative bg-white">
               <div className="absolute top-0 left-0 bg-black text-white text-[9px] px-1 uppercase font-bold">Advertisement</div>
               <div className="border-2 border-dashed border-gray-300 p-4 h-full flex flex-col justify-center items-center">
                   <div className="mb-2 text-3xl">⚠️</div>
                   <h4 className="font-black text-xl uppercase leading-none mb-1">We Need<br/>You!</h4>
                   <p className="font-serif italic text-xs mb-3 leading-tight">
                     Or rather, you need this engineer. Senior level expertise available for immediate deployment.
                   </p>
                   <div className="text-lg font-black mb-3">$ Negotiable</div>
                   <a href={`mailto:${profile.contact.email}`} className="inline-block bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors w-full">
                     Apply Within
                   </a>
                   <p className="text-[8px] mt-2 uppercase tracking-widest text-gray-400">Serious Inquiries Only</p>
               </div>
             </div>
           </div>
        </section>

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
                <li><a href="#editorial" className="hover:text-white hover:underline decoration-1 underline-offset-4 transition-colors">Editorial & Cover Story</a></li>
                <li><a href="#projects" className="hover:text-white hover:underline decoration-1 underline-offset-4 transition-colors">Latest Stories (Projects)</a></li>
                <li><a href="#classifieds" className="hover:text-white hover:underline decoration-1 underline-offset-4 transition-colors">Classifieds (Skills)</a></li>
                <li><a href="#about" className="hover:text-white hover:underline decoration-1 underline-offset-4 transition-colors">About the Author</a></li>
              </ul>
            </div>

            {/* Column 3: Syndication (Socials) */}
            <div className="md:col-span-3">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-700 pb-2 text-gray-300">Syndication</h3>
              <ul className="space-y-4">
                <li>
                  <a href={profile.contact.github} className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <span className="bg-white text-black w-6 h-6 flex items-center justify-center rounded-sm text-sm group-hover:scale-110 transition-transform">
                      <i className="fab fa-github"></i>
                    </span>
                    <span className="font-serif text-sm italic group-hover:underline decoration-1 underline-offset-4">Github Repository</span>
                  </a>
                </li>
                <li>
                  <a href={profile.contact.linkedin} className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <span className="bg-[#0077b5] text-white w-6 h-6 flex items-center justify-center rounded-sm text-sm group-hover:scale-110 transition-transform">
                      <i className="fab fa-linkedin-in"></i>
                    </span>
                    <span className="font-serif text-sm italic group-hover:underline decoration-1 underline-offset-4">LinkedIn Registry</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${profile.contact.email}`} className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <span className="bg-gray-700 text-white w-6 h-6 flex items-center justify-center rounded-sm text-sm group-hover:scale-110 transition-transform">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <span className="font-serif text-sm italic group-hover:underline decoration-1 underline-offset-4">Letter to Editor</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Subscription / Extra */}
            <div className="md:col-span-2">
               <div className="border border-gray-700 p-4 text-center bg-[#222]">
                  <p className="font-display font-bold text-xl mb-2 text-white">Subscribe</p>
                  <p className="font-serif text-xs text-gray-400 mb-4 italic">Get the latest issues delivered to your browser.</p>
                  <button className="w-full bg-white text-black text-[10px] font-bold uppercase tracking-widest py-2 hover:bg-gray-200 transition-colors">
                    RSS Feed
                  </button>
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
  );
};

export default NewPortfolio;
