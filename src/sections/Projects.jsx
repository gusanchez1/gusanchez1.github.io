import { content } from '../content/index.js';
import Section from '../components/Section.jsx';
import ProjectCase from '../components/ProjectCase.jsx';

const { projects, ui } = content;

export default function Projects() {
  const section = ui.sections.projects;

  return (
    <Section id={section.id} index={3} eyebrow={section.eyebrow} title={section.title} lead={section.lead}>
      {projects.map((project) => (
        <ProjectCase key={project.id} project={project} />
      ))}
    </Section>
  );
}
