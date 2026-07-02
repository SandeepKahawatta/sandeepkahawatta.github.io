import cleanCodeImage from '../assets/generated/clean_code_illustration.webp';

const TechnicalSection = ({ skills }) => {
  const tagList = (category, count = 4) => (skills[category] || []).slice(0, count);

  return (
    <section id="skills" className="mb-20 border-t-8 border-black pt-4 scroll-mt-24">

      {/* SECTION MASTHEAD */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-black pb-2 mb-8 gap-4">
        <div>
          <h5 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-1">Section B</h5>
          <h3 className="text-5xl md:text-6xl font-black font-news uppercase tracking-tighter leading-none">
            Technical<br/>Review
          </h3>
        </div>
        <div className="text-left md:text-right font-serif italic text-sm text-gray-600 max-w-md">
          "A deep dive into the architectural decisions, engineering principles, and core competencies driving modern software solutions."
        </div>
      </div>

      {/* 3-COLUMN NEWSPAPER LAYOUT */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* COLUMN 1: The "Op-Ed" (Clean Code Article) */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="border border-black p-1 relative">
             <img
               src={cleanCodeImage}
               alt="Illustration of clean code architecture"
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
               <div className="w-8 h-8 rounded-full bg-gray-300"></div>
               <div className="text-[10px] uppercase leading-tight">
                  <p className="font-bold">Sandeep Kahawaththa</p>
                  <p className="text-gray-500">Software Engineer</p>
               </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: Engineering & Architecture Skills */}
        <div className="lg:col-span-1 lg:border-l border-black/20 lg:pl-8 flex flex-col gap-8">
           <div className="border-b-2 border-black pb-1 mb-2">
              <h5 className="font-bold text-lg uppercase tracking-wider">Infrastructure</h5>
           </div>

           <article>
              <h6 className="font-black text-xl mb-2 font-news">Engineering Bureau</h6>
              <p className="font-serif text-sm text-gray-700 text-justify leading-relaxed mb-3">
                 Specializing in scalable web systems and mobile applications. Proficiency in full-stack development ensures seamless integration between client-side interfaces and server-side logic.
              </p>
              <ul className="text-[11px] font-mono uppercase flex flex-wrap gap-2 text-gray-600">
                 {tagList('Frontend').map(s => <li key={s} className="border border-gray-300 px-1">{s}</li>)}
              </ul>
           </article>

           <div className="w-full border-t border-dashed border-gray-400"></div>

           <article>
              <h6 className="font-black text-xl mb-2 font-news">Architecture Dept.</h6>
              <p className="font-serif text-sm text-gray-700 text-justify leading-relaxed mb-3">
                 Constructing robust backends and efficient database schemas (SQL/NoSQL). Designing API ecosystems that prioritize security, speed, and data integrity for enterprise-level needs.
              </p>
              <ul className="text-[11px] font-mono uppercase flex flex-wrap gap-2 text-gray-600">
                 {[...tagList('Backend', 3), ...tagList('Databases', 3)].map(s => <li key={s} className="border border-gray-300 px-1">{s}</li>)}
              </ul>
           </article>
        </div>

        {/* COLUMN 3: Problem Solving, AI/ML, Design */}
        <div className="lg:col-span-1 lg:border-l border-black/20 lg:pl-8 flex flex-col gap-8">
           <div className="border-b-2 border-black pb-1 mb-2">
              <h5 className="font-bold text-lg uppercase tracking-wider">R&D Division</h5>
           </div>

           <article>
              <h6 className="font-black text-xl mb-2 font-news">Problem Solving</h6>
              <p className="font-serif text-sm text-gray-700 text-justify leading-relaxed">
                 Applying logical analysis and algorithmic efficiency to complex challenges. Optimization of performance metrics is standard procedure for all deployed solutions.
              </p>
           </article>

           <div className="w-full border-t border-dashed border-gray-400"></div>

           <article>
              <h6 className="font-black text-xl mb-2 font-news">AI/ML Laboratory</h6>
              <p className="font-serif text-sm text-gray-700 text-justify leading-relaxed mb-3">
                 Published researcher in Multi-Agent Reinforcement Learning and Graph Neural Networks — applying deep learning to real-world control problems, from architecture design to benchmarked results.
              </p>
              <ul className="text-[11px] font-mono uppercase flex flex-wrap gap-2 text-gray-600">
                 {tagList('AI & ML').map(s => <li key={s} className="border border-gray-300 px-1">{s}</li>)}
              </ul>
           </article>

           <div className="w-full border-t border-dashed border-gray-400"></div>

           <article>
              <h6 className="font-black text-xl mb-2 font-news">Design Studio</h6>
              <p className="font-serif text-sm text-gray-700 text-justify leading-relaxed">
                 Crafting dynamic user interfaces with a focus on User Experience (UX) and visual aesthetics. Because code should look as good as it runs.
              </p>
           </article>
        </div>

      </div>
    </section>
  );
};

export default TechnicalSection;
