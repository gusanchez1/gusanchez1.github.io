import { content } from '../content/index.js';
import { asset } from '../lib/asset.js';
import ArchitectureDiagram from './ArchitectureDiagram.jsx';
import ExternalLink from './ExternalLink.jsx';
import Icon from './Icon.jsx';
import './ProjectCase.css';

const { ui } = content;
const t = ui.project;

// Estudo de caso de um projeto. Os blocos sem conteúdo no arquivo de dados não aparecem.
export default function ProjectCase({ project }) {
  const nameId = `${project.id}-nome`;
  const { images = [], progress } = project;

  return (
    <article id={project.id} className="project" aria-labelledby={nameId}>
      <header className="project__head">
        <div>
          {project.status && (
            <p className="project__status">
              <span className="status__dot" aria-hidden="true" />
              <span>
                {project.status.label}
                {project.status.detail && ` · ${project.status.detail}`}
              </span>
            </p>
          )}
          <h3 id={nameId} className="project__name">
            {project.name}
          </h3>
          <p className="project__tagline">{project.tagline}</p>
        </div>
        <ProjectLinks project={project} />
      </header>

      {has(project.meta) && (
        <dl className="project__meta">
          {project.meta.map((item) => (
            <div key={item.label}>
              <dt className="label">{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {images.length > 0 && (
        <div className="gallery" aria-label={t.gallery} role="group">
          {images.map((image) => (
            <figure key={image.src} className="gallery__item">
              {/* Clicar abre a imagem em tamanho real, numa nova aba */}
              <ExternalLink className="gallery__link" href={asset(image.src)}>
                <img
                  src={asset(image.src)}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                />
              </ExternalLink>
              {image.caption && <figcaption>{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      {project.architecture && <ArchitectureDiagram architecture={project.architecture} />}

      <div className="project__body">
        {has(project.problem) && (
          <Block title={t.problem}>
            {project.problem.map((paragraph) => (
              <p key={paragraph} className="project__lead">
                {paragraph}
              </p>
            ))}
          </Block>
        )}

        {has(project.features) && (
          <Block title={t.features}>
            <div className="columns">
              {project.features.map((group) => (
                <div key={group.title}>
                  <h5 className="columns__title">{group.title}</h5>
                  <ul className="list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>
        )}

        {has(project.flow) && (
          <Block title={t.flow}>
            <ol className="steps">
              {project.flow.map((step, i) => (
                <li key={step.title} className="steps__item">
                  <span className="steps__number">{String(i + 1).padStart(2, '0')}</span>
                  <h5 className="steps__title">{step.title}</h5>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </Block>
        )}

        {has(project.decisions) && (
          <Block title={t.decisions}>
            <ol className="decisions">
              {project.decisions.map((decision, i) => (
                <li key={decision.title} className="decisions__item">
                  <span className="steps__number">{String(i + 1).padStart(2, '0')}</span>
                  <h5 className="decisions__title">{decision.title}</h5>
                  <p>{decision.text}</p>
                </li>
              ))}
            </ol>
          </Block>
        )}

        {has(project.process) && (
          <Block title={t.process}>
            <div className="project__prose">
              {project.process.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Block>
        )}

        {has(project.learnings) && (
          <Block title={t.learnings}>
            <ul className="list">
              {project.learnings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Block>
        )}

        {progress && (
          <Block title={t.progress}>
            <div className="progress">
              <ProgressList title={t.done} items={progress.done} kind="done" />
              <ProgressList title={t.next} items={progress.next} kind="next" />
              <ProgressList title={t.limitations} items={progress.limitations} kind="limit" />
            </div>
          </Block>
        )}

        {has(project.stack) && (
          <Block title={t.stack}>
            <div className="stack">
              {project.stack.map((group) => (
                <div key={group.group} className="stack__group">
                  <h5 className="stack__title label">{group.group}</h5>
                  <ul className="tags">
                    {group.items.map((item) => (
                      <li key={item} className="tag">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>
        )}
      </div>
    </article>
  );
}

// Botões de demonstração e repositório (só os que existem) e uma observação opcional
function ProjectLinks({ project }) {
  const hasLinks = project.demoUrl || project.repoUrl;
  if (!hasLinks && !project.linksNote) return null;

  return (
    <div className="project__links">
      {hasLinks && (
        <div className="project__buttons">
          {project.demoUrl && (
            <ExternalLink className="btn btn--primary" href={project.demoUrl}>
              {project.demoLabel ?? t.demo}
              <Icon name="arrow-up-right" />
            </ExternalLink>
          )}
          {project.repoUrl && (
            <ExternalLink className="btn" href={project.repoUrl}>
              <Icon name="github" />
              {t.repo}
            </ExternalLink>
          )}
        </div>
      )}
      {project.linksNote && (
        <p className="project__links-note">
          {project.linksNote}
          {!hasLinks && (
            <>
              {' '}
              <a className="link" href={`#${ui.sections.contact.id}`}>
                {t.contact}
              </a>
            </>
          )}
        </p>
      )}
    </div>
  );
}

function Block({ title, children }) {
  return (
    <div className="row">
      <h4 className="row__label label">{title}</h4>
      <div>{children}</div>
    </div>
  );
}

function ProgressList({ title, items, kind }) {
  if (!has(items)) return null;

  return (
    <div className={`progress__group progress__group--${kind}`}>
      <h5 className="progress__title">{title}</h5>
      <ul>
        {items.map((item) => (
          <li key={item}>
            {kind === 'done' ? <Icon name="check" size={16} /> : <span className="progress__mark" aria-hidden="true" />}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function has(list) {
  return Array.isArray(list) && list.length > 0;
}
