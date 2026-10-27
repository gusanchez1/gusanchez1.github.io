import { content } from '../content/index.js';
import { links } from '../data/links.js';
import { asset } from '../lib/asset.js';
import { useCurrentTime } from '../hooks/useCurrentTime.js';
import ExternalLink from '../components/ExternalLink.jsx';
import Icon from '../components/Icon.jsx';
import './Hero.css';

const { profile, ui } = content;

export default function Hero() {
  // "Gustavo Avelino Sanchez" -> primeira linha "Gustavo", segunda "Avelino Sanchez"
  const [firstName, ...lastNames] = profile.name.split(' ');
  const { photo } = profile;

  return (
    <section id="inicio" className={`hero${photo ? ' hero--photo' : ''}`} aria-labelledby="inicio-titulo">
      <div className="container hero__inner">
        <div className="hero__top reveal" style={{ '--i': 0 }}>
          <p className="status">
            <span className="status__dot" aria-hidden="true" />
            {profile.status}
          </p>
          <LocalTime />
        </div>

        <div className="hero__layout">
          {photo && (
            <figure className="hero__photo reveal" style={{ '--i': 1 }}>
              <img
                src={asset(photo.src)}
                // O navegador escolhe o arquivo pelo tamanho em que a foto aparece na tela
                srcSet={photo.srcSmall ? `${asset(photo.srcSmall)} 400w, ${asset(photo.src)} 800w` : undefined}
                sizes="(min-width: 960px) 340px, 180px"
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                fetchPriority="high"
                decoding="async"
              />
            </figure>
          )}

          <h1 id="inicio-titulo" className="hero__name reveal" style={{ '--i': 1 }}>
            <span>{firstName}</span> <span>
              {lastNames.join(' ')}
              <span className="hero__dot">.</span>
            </span>
          </h1>

          <div className="hero__body reveal" style={{ '--i': 2 }}>
            <p className="hero__intro">{profile.hero.intro}</p>
            <p className="hero__description">{profile.hero.description}</p>

            <a className="hero__featured" href={`#${profile.hero.featured.projectId}`}>
              <span className="label">{profile.hero.featured.label}</span>
              <span className="hero__featured-text">
                {profile.hero.featured.text}
                <Icon name="arrow-right" size={16} />
              </span>
            </a>

            <div className="hero__actions">
              <a className="btn btn--primary" href={`#${ui.sections.projects.id}`}>
                {ui.hero.primaryCta}
                <Icon name="arrow-right" />
              </a>
              <ExternalLink className="btn" href={links.github}>
                <Icon name="github" />
                GitHub
              </ExternalLink>
              <ExternalLink className="btn" href={links.linkedin}>
                <Icon name="linkedin" />
                LinkedIn
              </ExternalLink>
              <a className="btn" href={`#${ui.sections.contact.id}`}>
                <Icon name="mail" />
                {ui.hero.contactCta}
              </a>
              {links.resume && (
                <ExternalLink className="btn" href={asset(links.resume)}>
                  <Icon name="file" />
                  {ui.hero.resumeCta}
                </ExternalLink>
              )}
            </div>
          </div>
        </div>

        <a className="hero__scroll reveal" style={{ '--i': 3 }} href={`#${ui.sections.about.id}`}>
          <Icon name="arrow-down" size={16} />
          {ui.hero.scrollHint}
        </a>
      </div>
    </section>
  );
}

// Hora local em São Paulo, útil para recrutadores de outros fusos
function LocalTime() {
  const now = useCurrentTime();
  const time = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: profile.timeZone,
  }).format(now);
  const offset = new Intl.DateTimeFormat('en-US', { timeZone: profile.timeZone, timeZoneName: 'shortOffset' })
    .formatToParts(now)
    .find((part) => part.type === 'timeZoneName')?.value;

  return (
    <p className="hero__clock">
      <time dateTime={now.toISOString()}>{time}</time> {ui.hero.localTime}
      {offset && <span className="hero__offset"> · {offset.replace('-', '−')}</span>}
    </p>
  );
}
