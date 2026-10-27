import { useEffect, useState } from 'react';
import { content } from '../content/index.js';
import { handleFromUrl, links, mailto } from '../data/links.js';
import { asset } from '../lib/asset.js';
import Section from '../components/Section.jsx';
import ExternalLink from '../components/ExternalLink.jsx';
import Icon from '../components/Icon.jsx';
import './Contact.css';

const { ui } = content;
const t = ui.contact;

// Sem formulário: o contato é feito por e-mail (links "mailto:"), que funcionam sem servidor.
export default function Contact() {
  const section = ui.sections.contact;
  const [copyState, setCopyState] = useState('idle'); // 'idle' | 'copied' | 'failed'

  // A mensagem de "copiado" some depois de alguns segundos
  useEffect(() => {
    if (copyState === 'idle') return;
    const timeout = setTimeout(() => setCopyState('idle'), 3000);
    return () => clearTimeout(timeout);
  }, [copyState]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  }

  return (
    <Section id={section.id} index={5} eyebrow={section.eyebrow} title={section.title} className="contact">
      {/* Um caminho para recrutadores e outro para quem quer contratar um projeto */}
      <div className="audiences">
        {t.audiences.map((audience, i) => (
          <div key={audience.label} className="audience">
            <h3 className="label">{audience.label}</h3>
            <p>{audience.text}</p>
            <a className={`btn${i === 0 ? ' btn--primary' : ''}`} href={mailto(audience.subject)}>
              <Icon name="mail" />
              {audience.cta}
            </a>
          </div>
        ))}
      </div>

      <div className="contact__email">
        <p className="label">{t.emailLabel}</p>
        <div className="contact__email-row">
          <a className="contact__address" href={mailto(t.emailSubject)}>
            {links.email}
          </a>
          <button type="button" className="btn" onClick={copyEmail}>
            <Icon name={copyState === 'copied' ? 'check' : 'copy'} />
            {copyState === 'copied' ? t.copied : t.copyEmail}
          </button>
        </div>
        {/* Avisa leitores de tela; visível apenas quando a cópia falha */}
        <p className={copyState === 'failed' ? 'contact__feedback' : 'sr-only'} role="status">
          {copyState === 'copied' && t.copied}
          {copyState === 'failed' && t.copyFailed}
        </p>
      </div>

      <ul className="channels">
        <li>
          <ExternalLink className="channel" href={links.linkedin}>
            <Icon name="linkedin" size={22} />
            <span className="channel__name">LinkedIn</span>
            <span className="channel__handle">{t.linkedinHint}</span>
            <Icon name="arrow-up-right" className="channel__arrow" />
          </ExternalLink>
        </li>
        <li>
          <ExternalLink className="channel" href={links.github}>
            <Icon name="github" size={22} />
            <span className="channel__name">GitHub</span>
            <span className="channel__handle">{t.githubHint}</span>
            <Icon name="arrow-up-right" className="channel__arrow" />
          </ExternalLink>
        </li>
        {links.resume && (
          <li>
            <ExternalLink className="channel" href={asset(links.resume)}>
              <Icon name="file" size={22} />
              <span className="channel__name">{t.resume}</span>
              <span className="channel__handle">{t.resumeHint}</span>
              <Icon name="arrow-up-right" className="channel__arrow" />
            </ExternalLink>
          </li>
        )}
      </ul>

      <p className="contact__secondary">
        {t.instagramPrefix}{' '}
        <ExternalLink className="link" href={links.instagram}>
          @{handleFromUrl(links.instagram)}
        </ExternalLink>
      </p>
    </Section>
  );
}
