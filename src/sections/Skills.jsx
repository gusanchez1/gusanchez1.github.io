import { content } from '../content/index.js';
import Section from '../components/Section.jsx';
import './Skills.css';

const { skillGroups, skillStatus, ui } = content;

export default function Skills() {
  const section = ui.sections.skills;

  return (
    <Section id={section.id} index={2} eyebrow={section.eyebrow} title={section.title} lead={section.lead}>
      <ul className="legend" aria-label={section.legend}>
        {Object.entries(skillStatus).map(([key, status]) => (
          <li key={key}>
            <span className={`marker marker--${key}`} aria-hidden="true" />
            <span>
              <strong>{status.label}</strong>: {status.description}
            </span>
          </li>
        ))}
      </ul>

      {skillGroups.map((group) => (
        <div key={group.title} className="row">
          <h3 className="row__label label">{group.title}</h3>
          <ul className="skills">
            {group.items.map((item) => (
              <li key={item.name} className="skill">
                <span className={`marker marker--${item.status}`} aria-hidden="true" />
                <div>
                  <p className="skill__name">
                    {item.name}
                    <span className="skill__status">{skillStatus[item.status].label}</span>
                  </p>
                  <p className="skill__note">{item.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Section>
  );
}
