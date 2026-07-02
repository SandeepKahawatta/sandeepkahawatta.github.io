import { motion } from 'framer-motion';
import cleanCodeImage from '../assets/generated/clean_code_illustration.webp';

// Print-inspired motion, consistent with the Technical Gazette
const settleIn = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  })
};

const stampIn = {
  hidden: { opacity: 0, scale: 0.6, rotate: -6 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 320, damping: 17, delay }
  })
};

const ruleDraw = {
  hidden: { scaleX: 0 },
  visible: (delay = 0) => ({
    scaleX: 1,
    transition: { delay, duration: 0.7, ease: 'easeOut' }
  })
};

const viewportOnce = { once: true, margin: '-60px' };

// Every department claim is backed by shipped evidence, not adjectives
const departments = (skills) => [
  {
    no: '01',
    name: 'Engineering Bureau',
    beat: 'Full-Stack & Mobile',
    copy: 'Ships production software — a live e-commerce platform, a multi-role learning management system, and mobile health apps — on the modern React stack.',
    tags: (skills['Frontend'] || []).slice(0, 4)
  },
  {
    no: '02',
    name: 'Architecture Dept.',
    beat: 'APIs & Data',
    copy: 'Designs secure, tested backends: JWT and role-based access control, real-time WebSockets, and REST APIs verified with Jest / Supertest suites.',
    tags: [...(skills['Backend'] || []).slice(0, 3), ...(skills['Databases'] || []).slice(0, 3)]
  },
  {
    no: '03',
    name: 'AI/ML Laboratory',
    beat: 'Research Desk',
    copy: 'Published researcher in Multi-Agent Reinforcement Learning and Graph Neural Networks — cutting simulated urban traffic waiting time by 81.8% at ~3.17 ms inference.',
    tags: (skills['AI & ML'] || []).slice(0, 4)
  }
];

const TechnicalSection = ({ skills }) => {
  return (
    <section id="skills" className="border-t-8 border-black pt-4 scroll-mt-24">

      {/* SECTION MASTHEAD */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-black pb-2 mb-8 gap-4">
        <div>
          <h5 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-1">Section B</h5>
          <h3 className="text-5xl md:text-6xl font-black font-news uppercase tracking-tighter leading-none">
            Technical<br/>Review
          </h3>
        </div>
        <div className="text-left md:text-right font-serif italic text-sm text-gray-600 max-w-md">
          "Every claim in this review is backed by shipped software or published research."
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

        {/* ============ LEFT: THE OP-ED ============ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={settleIn}
          className="lg:col-span-4 flex flex-col gap-4"
        >
          <div className="border border-black/10 relative overflow-hidden group">
             <img
               src={cleanCodeImage}
               alt="Illustration of clean code architecture"
               className="w-full h-auto grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
             />
             <div className="absolute bottom-0 right-0 bg-black text-white text-[10px] px-2 py-1 uppercase font-bold">
               Fig 1.2
             </div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-2 block">Editorial Opinion</span>
            <h4 className="font-bold text-3xl leading-tight mb-3 font-news">The Art of<br/>Clean Code</h4>

            <p className="font-serif text-sm text-gray-800 text-justify leading-relaxed">
              <span className="float-left text-4xl font-black mr-2 mt-[-6px] leading-none">S</span>
              implicity is the soul of efficiency. Writing code that is not just functional but maintainable
              is a craft of constant refinement — building systems that are robust, scalable, and easy to understand.
            </p>

            {/* Pull quote with drawing red rule */}
            <blockquote className="my-6">
              <p className="font-news text-xl md:text-2xl font-bold leading-snug">
                "The true cost of software is not in its writing, but in its reading."
              </p>
              <motion.span
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={ruleDraw}
                custom={0.3}
                style={{ originX: 0 }}
                className="block h-1 bg-red-600 mt-3 w-24"
              />
            </blockquote>

            <div className="pt-4 border-t border-black flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-gray-300"></div>
               <div className="text-[10px] uppercase leading-tight">
                  <p className="font-bold">Sandeep Kahawaththa</p>
                  <p className="text-gray-500">Software Engineer</p>
               </div>
            </div>
          </div>
        </motion.div>

        {/* ============ RIGHT: THE DEPARTMENTS INDEX ============ */}
        <div className="lg:col-span-8">
          <div className="border-b-2 border-black pb-1 mb-2 flex justify-between items-end">
            <h5 className="font-bold text-lg uppercase tracking-wider">Departments of the Bureau</h5>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 hidden md:inline">Staff Directory • Page B2</span>
          </div>

          {departments(skills).map((dept, idx) => (
            <div key={dept.no}>
              <motion.article
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={settleIn}
                custom={idx * 0.12}
                className="group grid grid-cols-12 gap-4 md:gap-6 py-7 items-start"
              >
                {/* Index number */}
                <motion.span
                  variants={stampIn}
                  custom={0.15 + idx * 0.12}
                  className="col-span-2 md:col-span-1 text-4xl md:text-5xl font-black font-news leading-none text-black/15 group-hover:text-red-600 transition-colors duration-300"
                >
                  {dept.no}
                </motion.span>

                {/* Name + beat */}
                <div className="col-span-10 md:col-span-4">
                  <h6 className="font-black text-xl md:text-2xl font-news leading-tight group-hover:underline decoration-red-600 decoration-2 underline-offset-4">
                    {dept.name}
                  </h6>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mt-1">{dept.beat}</p>
                </div>

                {/* Evidence + tags */}
                <div className="col-span-12 md:col-span-7 md:pl-2">
                  <p className="font-serif text-sm text-gray-700 leading-relaxed mb-3">
                    {dept.copy}
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {dept.tags.map((tag, tagIdx) => (
                      <motion.li
                        key={tag}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportOnce}
                        transition={{ delay: 0.25 + idx * 0.1 + tagIdx * 0.05, duration: 0.3 }}
                        className="text-[10px] border border-black bg-white px-2 py-0.5 font-mono uppercase hover:bg-black hover:text-white transition-colors cursor-default"
                      >
                        {tag}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.article>

              {/* Rule that draws itself between departments */}
              {idx < departments(skills).length - 1 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  variants={ruleDraw}
                  custom={0.1}
                  style={{ originX: 0 }}
                  className="h-px bg-black/25"
                />
              )}
            </div>
          ))}

          {/* Colophon: the condensed "everything else" line */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={settleIn}
            custom={0.2}
            className="mt-4 pt-4 border-t-2 border-black text-xs font-serif italic text-gray-600"
          >
            Also on staff: interface design desk (Figma) · data visualization bureau (Chart.js, Recharts) ·
            quality control (Jest, Supertest) · simulation unit (SUMO). Full directory in the Classifieds, Section C.
          </motion.p>
        </div>

      </div>
    </section>
  );
};

export default TechnicalSection;
