import { content } from '../content/index.js';
import Section from '../components/Section.jsx';
import './Education.css';

const { education, ui } = content;

export default function Education() {
  const section = ui.sections.education;
  const { degree, courses, languages } = education;

  return (
    <Section id={section.id} index={4} eyebrow={section.eyebrow} title={section.title}>
      <div className="row">
        <h3 className="row__label label">{ui.education.degree}</h3>
        <div className="degree">
          <p className="degree__title">{degree.title}</p>
          <p className="degree__meta">
            {degree.institution} · {degree.status}
          </p>
          {degree.expected && <p className="degree__expected">{degree.expected}</p>}
        </div>
      </div>

      <EntryList title={ui.education.courses} items={courses} />
      <EntryList title={ui.education.languages} items={languages} />
    </Section>
  );
}

function EntryList({ title, items }) {
  if (!items?.length) return null;

  return (
    <div className="row">
      <h3 className="row__label label">{title}</h3>
      <ul className="entries">
        {items.map((item) => (
          <li key={item.title} className="entry">
            <div className="entry__head">
              <p className="entry__title">{item.title}</p>
              {item.period && <p className="entry__period">{item.period}</p>}
            </div>
            {item.provider && <p className="entry__provider">{item.provider}</p>}
            {item.note && <p className="entry__note">{item.note}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
