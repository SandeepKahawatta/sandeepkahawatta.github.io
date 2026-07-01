import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = ({ profile }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-[#fcfbf9] py-16 border-t-8 border-black">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12 border-b border-gray-800 pb-12">

          {/* Column 1: Masthead */}
          <div className="md:col-span-4">
            <h2 className="text-4xl font-news font-black mb-4 tracking-tighter">The Daily Dev</h2>
            <p className="font-serif italic text-gray-400 mb-6 leading-relaxed">
              "All the code that's fit to commit."
            </p>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest space-y-2">
              <p>Est. {year}</p>
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

          {/* Column 4: CV Download */}
          <div className="md:col-span-2">
             <div className="border border-gray-700 p-4 text-center bg-[#222]">
                <p className="font-news font-bold text-xl mb-2 text-white">Print Edition</p>
                <p className="font-serif text-xs text-gray-400 mb-4 italic">Take a copy of the full record with you.</p>
                <a href="/resume.pdf" download="Sandeep_Kahawaththa_CV.pdf" className="block w-full bg-white text-black text-[11px] font-bold uppercase tracking-widest py-2 hover:bg-gray-200 transition-colors">
                  Download CV
                </a>
             </div>
          </div>

        </div>

        {/* Colophon */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-gray-600">
          <p>&copy; {year} {profile.name}. All rights reserved.</p>
          <div className="flex gap-4">
             <span>Printed in HTML & CSS</span>
             <span>•</span>
             <span>Recycled Pixels</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
