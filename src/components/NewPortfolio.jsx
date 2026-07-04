import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Header from './Header';
import Navbar from './Navbar';
import Hero from './Hero';
import Sidebar from './Sidebar';
import TechnicalSection from './TechnicalSection';
import ExperienceSection from './ExperienceSection';
import ProjectSection from './ProjectSection';
import ClassifiedsSection from './ClassifiedsSection';
import ContactSection from './ContactSection';
import ProjectModal from './ProjectModal';
import Footer from './Footer';
import WelcomeSplash from './WelcomeSplash';
import RecordsSection from './RecordsSection';
import { useActiveSection } from '../hooks/useActiveSection';
import { useTheme } from '../hooks/useTheme';
import { trackEvent, slugify } from '../lib/analytics';

const SECTION_IDS = ['editorial', 'experience', 'projects', 'classifieds', 'contact'];

const NewPortfolio = ({ projects, profile, skills, education, achievements, experience }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const activeSection = useActiveSection(SECTION_IDS);
  const [theme, toggleTheme] = useTheme();

  // Central open handler so every card click reports which project drew attention
  const openProject = (project) => {
    trackEvent(`project-open-${slugify(project.title)}`);
    setSelectedProject(project);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#fcfbf9] text-[#0d121b] font-news selection:bg-black selection:text-white">
        <WelcomeSplash />
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <Navbar activeSection={activeSection} theme={theme} onToggleTheme={toggleTheme} />

        <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
          {/* Cover Story + Technical Review + Sidebar */}
          <section id="editorial" className="mb-20 scroll-mt-24">
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-9 flex flex-col">
                <Hero profile={profile} />
                <TechnicalSection skills={skills} />
              </div>
              <Sidebar education={education} achievements={achievements} profile={profile} />
            </div>
          </section>

          <ExperienceSection experience={experience} />
          <ProjectSection projects={projects} onProjectClick={openProject} />
          <ClassifiedsSection skills={skills} profile={profile} />
          <ContactSection profile={profile} />

          {/* Education & recognition — mobile only (lives in the sidebar on desktop) */}
          <RecordsSection education={education} achievements={achievements} />

          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </main>

        <Footer profile={profile} />
      </div>
    </MotionConfig>
  );
};

export default NewPortfolio;
