const badgeStyles = {
  'Production': 'bg-red-600 text-white',
  'Client Work': 'bg-black text-white',
  'Research': 'border border-black text-black'
};

const ExperienceSection = ({ experience }) => {
  return (
    <section id="experience" className="mb-20 border-t-8 border-black pt-4 scroll-mt-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-black pb-2 mb-8 gap-4">
        <div>
          <h5 className="font-mono text-xs uppercase tracking-widest text-gray-600 mb-1">Section A</h5>
          <h3 className="text-5xl md:text-6xl font-black font-news uppercase tracking-tighter leading-none">
            Field<br/>Reports
          </h3>
        </div>
        <div className="text-left md:text-right font-serif italic text-sm text-gray-600 max-w-md">
          Dispatches from production systems, client engagements, and published research — real-world work, verified in the field.
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {experience.map((exp) => (
          <article key={exp.org} className="border border-black p-6 flex flex-col gap-3 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <span className={`text-[11px] font-bold uppercase tracking-widest px-2 py-0.5 w-max ${badgeStyles[exp.type] || 'border border-black'}`}>
              {exp.type}
            </span>
            <h4 className="font-black text-2xl leading-tight font-news">{exp.org}</h4>
            <p className="text-sm font-bold uppercase tracking-wide text-gray-700">{exp.role}</p>
            <p className="font-serif text-sm text-gray-700 leading-relaxed flex-grow">{exp.summary}</p>
            <ul className="text-[11px] font-mono uppercase flex flex-wrap gap-2 text-gray-600">
              {exp.stack.map(s => <li key={s} className="border border-gray-300 px-1">{s}</li>)}
            </ul>
            {exp.link && (
              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 w-max hover:text-red-600 focus:text-red-600"
              >
                Visit Live Site &rarr;
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
