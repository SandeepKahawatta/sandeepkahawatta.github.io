import { Github, Linkedin } from 'lucide-react';
import { EducationList, AchievementsList } from './RecordsSection';
import { trackEvent } from '../lib/analytics';

const Sidebar = ({ education, achievements, profile }) => {
  return (
    <div className="lg:col-span-3 flex flex-col gap-8 border-t-4 border-black pt-8 mt-4 lg:border-t-0 lg:pt-0 lg:mt-0 lg:border-l lg:border-black lg:pl-8">

      {/* Education — desktop only; on mobile it lives in Public Records after Contact */}
      <div className="hidden lg:block">
        <div className="border-b-2 border-black mb-4 pb-1 text-center">
          <h4 className="font-news text-2xl font-bold">Academic Annals</h4>
        </div>
        <EducationList education={education} />
      </div>

      {/* CV Download */}
      <div className="order-2 lg:order-none bg-[#2a2a2a] text-[#fcfbf9] p-6 text-center border-4 border-double border-[#fcfbf9] outline outline-1 outline-black">
        <h4 className="font-news text-2xl font-bold mb-1 uppercase tracking-widest border-b border-white/20 pb-2">Classifieds</h4>
        <p className="text-[10px] font-mono uppercase tracking-widest mb-4 text-gray-400">Help Wanted</p>
        <h5 className="text-xl font-bold leading-tight mb-2 font-serif">EXPERT ENGINEER FOR HIRE</h5>
        <p className="text-xs italic text-gray-400 mb-4">Proven track record. Will travel (remotely).</p>
        <a href="/resume.pdf" download="Sandeep_Kahawaththa_CV.pdf" onClick={() => trackEvent('cv-download-sidebar')} className="inline-block border border-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors w-full">
          Download Portfolio CV
        </a>
      </div>

      {/* Links */}
      <div className="order-3 lg:order-none grid grid-cols-2 gap-4">
        <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('outbound-linkedin')} className="border border-black p-2 text-center hover:bg-black hover:text-white transition-colors group">
          <div className="mb-1 flex justify-center group-hover:scale-110 transition-transform"><Linkedin size={20} /></div>
          <div className="text-[10px] font-bold uppercase tracking-widest">LinkedIn Registry</div>
          <div className="text-[10px] font-serif italic">Connect Professionally</div>
        </a>
        <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('outbound-github')} className="border border-black p-2 text-center hover:bg-black hover:text-white transition-colors group">
          <div className="mb-1 flex justify-center group-hover:scale-110 transition-transform"><Github size={20} /></div>
          <div className="text-[10px] font-bold uppercase tracking-widest">Github Repository</div>
          <div className="text-[10px] font-serif italic">Inspect The Source</div>
        </a>
      </div>

      {/* By the Numbers — first thing on mobile: the strongest facts at a glance */}
      <div className="order-1 lg:order-none border-2 border-black">
        <h4 className="bg-black text-white text-center text-xs font-black uppercase tracking-widest py-1.5">
          By the Numbers
        </h4>
        <div className="grid grid-cols-2">
          {[
            { value: '10+', label: 'Projects shipped' },
            { value: '1', label: 'Production platform live' },
            { value: '1', label: 'Published AI paper' },
            { value: '81.8%', label: 'Traffic wait-time cut' }
          ].map((stat, idx) => (
            <div
              key={stat.label}
              className={`p-3 text-center ${idx % 2 === 0 ? 'border-r' : ''} ${idx < 2 ? 'border-b' : ''} border-black/20`}
            >
              <p className="text-2xl font-black font-news leading-none">{stat.value}</p>
              <p className="text-[9px] font-mono uppercase tracking-wider mt-1 text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The Paper's Index — desktop only (the footer index covers mobile) */}
      <div className="hidden lg:block">
        <div className="border-b-2 border-black mb-3 pb-1 text-center">
          <h4 className="font-news text-2xl font-bold">Index</h4>
        </div>
        <ul className="font-serif text-sm">
          {[
            { label: 'Field Reports (Experience)', page: 'A1', href: '#experience' },
            { label: 'Technical Review (Skills)', page: 'B1', href: '#skills' },
            { label: 'Technical Gazette (Projects)', page: 'C1', href: '#projects' },
            { label: 'Classifieds (All Skills)', page: 'C4', href: '#classifieds' },
            { label: 'Letters to the Editor (Hire)', page: 'D1', href: '#contact' }
          ].map((item) => (
            <li key={item.href}>
              <a href={item.href} className="flex items-end gap-1 py-1.5 group">
                <span className="group-hover:text-red-600 group-hover:underline transition-colors">{item.label}</span>
                <span className="flex-grow border-b-2 border-dotted border-gray-300 mb-1"></span>
                <span className="font-mono text-[10px] text-gray-500 group-hover:text-red-600">{item.page}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Hall of Fame — desktop only; on mobile it lives in Public Records */}
      <div className="hidden lg:block mt-8 border-t-2 border-black pt-8" id="achievements">
         <div className="border-b-2 border-black mb-6 pb-1">
            <h4 className="font-news text-xl font-bold">Hall of Fame</h4>
         </div>
         <AchievementsList achievements={achievements} />
      </div>

    </div>
  );
};

export default Sidebar;
