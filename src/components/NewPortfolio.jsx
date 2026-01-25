import React from 'react';
import profileImage from '../assets/my/profile.jpg';
import cleanCodeImage from '../assets/generated/clean_code_illustration.png';
import BreakingNews from './BreakingNews';

const NewPortfolio = ({ projects, profile, skills, education, achievements }) => {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Helper to get first 3 projects for the main stories
  const mainStories = projects.slice(0, 3);


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
          <a className="relative group hover:text-red-600 transition-colors duration-300" href="#editorial">
            Editorial
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a className="relative group hover:text-red-600 transition-colors duration-300" href="#projects">
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a className="relative group hover:text-red-600 transition-colors duration-300" href="#skills">
            Skills
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a className="relative group hover:text-red-600 transition-colors duration-300" href="#classifieds">
            Classifieds
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a className="relative group hover:text-red-600 transition-colors duration-300" href="#achievements">
            Achievements
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
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
                     <div className="relative w-full aspect-[3/4] overflow-hidden border border-black dark:border-white grayscale contrast-125 brightness-110 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
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
                           <img src={cleanCodeImage} alt="Clean Code Architecture" className="w-full h-auto grayscale contrast-125" />
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
                <button className="border border-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors w-full">
                  Download Portfolio CV
                </button>
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
        <section id="projects" className="mb-20">
          <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-4">
            <h3 className="text-4xl font-bold font-news uppercase">Latest Stories</h3>
            <a href="#" className="text-sm font-bold uppercase tracking-widest hover:underline mb-1">View Archive &rarr;</a>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Project 1: Feature Style */}
            {mainStories[0] && (
              <article className="group cursor-pointer">
                <div className="mb-4 overflow-hidden border border-black">
                  <img src={mainStories[0].image} alt={mainStories[0].title} className="w-full h-64 object-cover grayscale-img group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                  <span>Feature Story</span>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <h4 className="text-3xl font-bold leading-tight mb-4 group-hover:underline">{mainStories[0].title}</h4>
                <p className="text-lg italic font-serif text-gray-600 mb-4">
                  "{mainStories[0].description.substring(0, 80)}..."
                </p>
                <p className="text-sm font-serif text-gray-800 text-justify leading-relaxed mb-4">
                  {mainStories[0].description}
                </p>
                <button className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600">Read Article</button>
              </article>
            )}

            {/* Project 2: Opinion Style */}
            {mainStories[1] && (
              <article className="group cursor-pointer border-x border-gray-200 px-0 lg:px-8">
                <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                  <span>Opinion</span>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <h4 className="text-4xl font-bold leading-none mb-6 italic font-serif group-hover:underline">
                  Why {mainStories[1].tech[0]} is the Future of {mainStories[1].category}
                </h4>
                <div className="w-12 h-1 bg-black mb-6"></div>
                <p className="text-lg font-serif text-gray-800 leading-relaxed mb-8">
                  The debate is over. {mainStories[1].title} proves that {mainStories[1].tech.join(', ')} is not just a luxury; it's a necessity for scaling beyond limits.
                </p>
                <div className="mb-6 overflow-hidden border border-black">
                  <img src={mainStories[1].image} alt={mainStories[1].title} className="w-full h-48 object-cover grayscale-img" />
                </div>
                <button className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600">Read Op-Ed</button>
              </article>
            )}

            {/* Project 3: Case Study Style */}
            {mainStories[2] && (
              <article className="group cursor-pointer">
                 <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                  <span>Case Study</span>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="bg-[#1a1a1a] p-8 mb-6 relative overflow-hidden group-hover:shadow-xl transition-shadow">
                  <img src={mainStories[2].image} alt={mainStories[2].title} className="w-full h-auto object-cover opacity-80 mix-blend-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Abstract graphic placeholder */}
                    <div className="w-24 h-24 border-2 border-white/20 rounded-full"></div>
                  </div>
                </div>
                <h4 className="text-2xl font-bold mb-3 group-hover:underline">{mainStories[2].title}: A {mainStories[2].tech[0]} Symphony</h4>
                <p className="text-sm font-serif text-gray-600 mb-4">
                  How we engineered {mainStories[2].title} using {mainStories[2].tech.join(', ')} without crashing the browser.
                </p>
                <button className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600">View Project</button>
              </article>
            )}
          </div>
        </section>

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
