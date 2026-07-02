import { useState } from 'react';

const SERVICES = [
  "Full-stack web applications (React, Next.js, NestJS, Node.js)",
  "Mobile applications (React Native)",
  "REST APIs, backends & database design",
  "AI/ML integrations & research collaboration"
];

const ContactSection = ({ profile }) => {
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  // No backend on GitHub Pages: compose the letter into a mailto link
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${senderName || 'your portfolio'}`);
    const body = encodeURIComponent(`${message}\n\n— ${senderName}`);
    window.location.href = `mailto:${profile.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="border-t-8 border-black pt-4 mb-20 scroll-mt-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-black pb-2 mb-8 gap-4">
        <div>
          <h5 className="font-mono text-xs uppercase tracking-widest text-gray-600 mb-1">Section D</h5>
          <h3 className="text-5xl md:text-6xl font-black font-news uppercase tracking-tighter leading-none">
            Letters to<br/>the Editor
          </h3>
        </div>
        <div className="text-left md:text-right font-serif italic text-sm text-gray-600 max-w-md">
          {profile.availability}. Replies within 24 hours.
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Services / what you can commission */}
        <div className="border border-black p-6 md:p-8 bg-white">
          <span className="text-[11px] font-bold uppercase tracking-widest text-red-600 mb-2 block">Situations Wanted</span>
          <h4 className="font-black text-3xl leading-tight mb-4 font-news">Commission the Engineer</h4>
          <p className="font-serif text-sm text-gray-700 leading-relaxed mb-6">
            Available for freelance engagements and full-time software engineering roles. Current bureau services include:
          </p>
          <ul className="space-y-3 mb-8">
            {SERVICES.map(service => (
              <li key={service} className="flex items-start gap-3 font-serif text-sm text-gray-800">
                <span className="font-black text-red-600 leading-none mt-0.5" aria-hidden="true">■</span>
                {service}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.contact.email}?subject=${encodeURIComponent('Project inquiry')}`}
              className="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-colors"
            >
              Email the Editor
            </a>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="/resume.pdf"
              download="Sandeep_Kahawaththa_CV.pdf"
              className="border border-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Download CV
            </a>
          </div>
          <p className="mt-6 text-xs font-mono uppercase tracking-widest text-gray-600">
            {profile.contact.email} · {profile.contact.phone} · {profile.location}
          </p>
        </div>

        {/* Letter composer */}
        <form onSubmit={handleSubmit} className="border-2 border-dashed border-gray-800 p-6 md:p-8 bg-white flex flex-col gap-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-600">Compose a Letter</span>
          <label className="flex flex-col gap-1 text-xs font-bold uppercase tracking-widest">
            Your name
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              required
              placeholder="Jane Doe, Acme Corp"
              className="border border-black p-3 font-serif text-base font-normal normal-case tracking-normal focus:outline-2 focus:outline-red-600"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-bold uppercase tracking-widest flex-grow">
            Your message
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              placeholder="Dear Editor, we have a project in mind..."
              className="border border-black p-3 font-serif text-base font-normal normal-case tracking-normal flex-grow resize-y focus:outline-2 focus:outline-red-600"
            />
          </label>
          <button
            type="submit"
            className="bg-black text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-colors"
          >
            Send via your email client &rarr;
          </button>
          <p className="text-[11px] font-serif italic text-gray-600 text-center">
            Opens your mail app with the letter pre-filled — no data is stored on this site.
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
