import NewPortfolio from './components/NewPortfolio';
import { profile, education, achievements } from './data/profile';
import { skills } from './data/skills';
import { experience } from './data/experience';
import { projects } from './data/projects';

const App = () => (
  <NewPortfolio
    projects={projects}
    profile={profile}
    skills={skills}
    education={education}
    achievements={achievements}
    experience={experience}
  />
);

export default App;
