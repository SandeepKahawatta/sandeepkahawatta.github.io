// Ordered pattern → devicon class pairs. First match wins, so more specific
// patterns (react native, javascript, pytorch) must come before generic ones.
const ICON_PATTERNS = [
  ['react native', 'devicon-react-original'],
  ['react', 'devicon-react-original'],
  ['next', 'devicon-nextjs-original'],
  ['html', 'devicon-html5-plain'],
  ['css', 'devicon-css3-plain'],
  ['bootstrap', 'devicon-bootstrap-plain'],
  ['tailwind', 'devicon-tailwindcss-original'],
  ['material', 'devicon-materialui-plain'],
  ['mui', 'devicon-materialui-plain'],
  ['figma', 'devicon-figma-plain'],
  ['node', 'devicon-nodejs-plain'],
  ['nest', 'devicon-nestjs-plain'],
  ['express', 'devicon-express-original'],
  ['php', 'devicon-php-plain'],
  ['laravel', 'devicon-laravel-original'],
  ['flask', 'devicon-flask-original'],
  ['javascript', 'devicon-javascript-plain'],
  ['typescript', 'devicon-typescript-plain'],
  ['java', 'devicon-java-plain'],
  ['pytorch', 'devicon-pytorch-original'],
  ['python', 'devicon-python-plain'],
  ['c++', 'devicon-cplusplus-plain'],
  ['mongo', 'devicon-mongodb-plain'],
  ['mysql', 'devicon-mysql-plain'],
  ['firebase', 'devicon-firebase-plain'],
  ['redis', 'devicon-redis-plain'],
  ['supabase', 'devicon-supabase-plain'],
  ['sql', 'devicon-mysql-plain'],
  ['github', 'devicon-github-original'],
  ['git', 'devicon-git-plain'],
  ['docker', 'devicon-docker-plain'],
  ['jest', 'devicon-jest-plain']
];

const getSkillIcon = (name) => {
  const n = name.toLowerCase().trim();
  if (n === 'c') return 'devicon-c-plain';
  const match = ICON_PATTERNS.find(([pattern]) => n.includes(pattern));
  return match ? match[1] : 'devicon-devicon-plain';
};

const ClassifiedsSection = ({ skills, profile }) => {
  return (
    <section id="classifieds" className="border-t-4 border-black pt-2 relative mt-20 mb-20 scroll-mt-24">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full border-t border-black mt-1"></div>

      {/* Header Row */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8 mt-6 border-b-2 border-black pb-2 px-2">
        <div className="flex flex-col">
          <h3 className="bg-black text-white text-4xl font-black px-4 py-2 font-news uppercase tracking-widest transform -skew-x-6 inline-block w-max">
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
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 px-2 pb-12">

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
                    <span className="hidden sm:inline bg-[#fcfbf9] z-10 pl-1 text-[10px] italic text-gray-500 group-hover:bg-yellow-100">
                      Avail.
                    </span>
                  </li>
              ))}
            </ul>
          </div>
        ))}

        {/* THE "COUPON" (Contact Section) — spans all columns on phones */}
        <div className="break-inside-avoid mb-8 relative group [column-span:all] sm:[column-span:none]">
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
                href="#contact"
                className="block w-full border-2 border-black py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors"
              >
                Clip & Contact
              </a>

              <p className="text-[10px] uppercase mt-2 text-gray-500">Valid until hired</p>
            </div>
          </div>
        </div>

        {/* EXTRA: "Horoscope" / Fun Fact to fill space — spans all columns on phones */}
        <div className="break-inside-avoid border-t border-b border-black py-4 mb-8 [column-span:all] sm:[column-span:none]">
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

export default ClassifiedsSection;
