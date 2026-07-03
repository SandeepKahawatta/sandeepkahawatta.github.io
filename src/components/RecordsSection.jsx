// Education and achievements lists shared between the desktop sidebar and the
// mobile-only "Public Records" section (tabloid rule: news first, records later).

export const EducationList = ({ education }) => (
  <div className="space-y-6 font-serif">
    {education.map((edu, index) => (
      <div key={index}>
        <h5 className="font-bold text-lg leading-tight">{edu.degree}</h5>
        <p className="text-sm italic text-gray-600">{edu.institution}, {edu.year}</p>
      </div>
    ))}
  </div>
);

export const AchievementsList = ({ achievements }) => (
  <div className="space-y-6">
    {achievements.map((achievement, index) => (
      <article key={index} className="border-b border-gray-200 pb-4 last:border-0">
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
);

/**
 * Mobile-only section rendered after Contact: on phones the sidebar keeps just
 * the conversion blocks (stats, CV, socials) so Experience/Projects arrive
 * sooner, and education + recognition move down here.
 */
const RecordsSection = ({ education, achievements }) => (
  <section id="records" className="lg:hidden border-t-8 border-black pt-4 mb-20 scroll-mt-24">
    <div className="border-b-4 border-black pb-2 mb-8">
      <h5 className="font-mono text-xs uppercase tracking-widest text-gray-600 mb-1">Section E</h5>
      <h3 className="text-5xl font-black font-news uppercase tracking-tighter leading-none">
        Public<br/>Records
      </h3>
    </div>

    <div className="grid sm:grid-cols-2 gap-10">
      <div>
        <div className="border-b-2 border-black mb-4 pb-1">
          <h4 className="font-news text-2xl font-bold">Academic Annals</h4>
        </div>
        <EducationList education={education} />
      </div>
      <div>
        <div className="border-b-2 border-black mb-4 pb-1">
          <h4 className="font-news text-2xl font-bold">Hall of Fame</h4>
        </div>
        <AchievementsList achievements={achievements} />
      </div>
    </div>
  </section>
);

export default RecordsSection;
