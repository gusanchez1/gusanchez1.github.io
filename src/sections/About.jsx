import { content } from '../content/index.js';
import Section from '../components/Section.jsx';
import './About.css';

const { profile, ui } = content;

export default function About() {
  const { career } = profile;
  const section = ui.sections.about;

  return (
    <Section id={section.id} index={1} eyebrow={section.eyebrow} title={section.title}>
      <div className="about">
        <div className="about__text">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <aside className="about__aside">
          {/* Ficha rápida */}
          <section className="panel" aria-labelledby="resumo-titulo">
            <h3 id="resumo-titulo" className="panel__title label">
              {ui.about.factsTitle}
            </h3>
            <dl className="facts">
              {profile.facts.map((fact) => (
                <div key={fact.label} className="facts__row">
                  <dt className="label">{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Trajetória no formato de uma linha de metrô: cada etapa é uma estação */}
          <section className="panel" aria-labelledby="trajetoria-titulo">
            <h3 id="trajetoria-titulo" className="panel__title label">
              {ui.about.careerTitle}
            </h3>
            <ol className="career">
              {career.stops.map((stop) => (
                <li key={stop.title} className="career__stop">
                  <span className="career__role">{stop.title}</span>
                  <span className="career__place">
                    {stop.place}
                    {stop.period && ` · ${stop.period}`}
                  </span>
                  {stop.note && <span className="career__note">{stop.note}</span>}
                </li>
              ))}
              <li className="career__stop career__stop--next">
                <span className="label">{ui.about.nextStop}</span>
                <span className="career__role">{career.next}</span>
              </li>
            </ol>
          </section>
        </aside>
      </div>
    </Section>
  );
}
