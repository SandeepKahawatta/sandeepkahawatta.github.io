import profileImage from '../assets/my/profile.jpg';

const Hero = ({ profile }) => {
  return (
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
           <div className="relative w-full aspect-[3/4] max-h-[45vh] md:max-h-none overflow-hidden border border-black contrast-125 brightness-110 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <img
                 src={profileImage}
                 alt={`Portrait of ${profile.name}`}
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* CSS Halftone overlay */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
              <div className="halftone-overlay absolute inset-0"></div>
              <div className="absolute inset-0 bg-gray-200/30 mix-blend-multiply pointer-events-none"></div>
           </div>
           <div className="mt-2 text-xs font-mono text-gray-500 text-right uppercase tracking-widest">
              Fig 1.1 — The Engineer
           </div>
        </div>
    </div>
  );
};

export default Hero;
