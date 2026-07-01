import { Github, Linkedin } from 'lucide-react';

const Sidebar = ({ education, achievements, profile }) => {
  return (
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
            </div>
          ))}
        </div>
      </div>

      {/* CV Download */}
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
  );
};

export default Sidebar;
