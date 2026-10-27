import { content } from '../content/index.js';
import { links, mailto } from '../data/links.js';
import ExternalLink from './ExternalLink.jsx';
import Icon from './Icon.jsx';
import './Footer.css';

const { profile, ui } = content;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          © {year} {profile.name}. <span>{ui.footer.builtWith}</span>
        </p>

        <ul className="footer__links">
          <li>
            <ExternalLink className="footer__link" href={links.github}>
              GitHub
            </ExternalLink>
          </li>
          <li>
            <ExternalLink className="footer__link" href={links.linkedin}>
              LinkedIn
            </ExternalLink>
          </li>
          <li>
            <ExternalLink className="footer__link" href={links.instagram}>
              Instagram
            </ExternalLink>
          </li>
          <li>
            <a className="footer__link" href={mailto(ui.contact.emailSubject)}>
              E-mail
            </a>
          </li>
        </ul>

        <a className="footer__top" href="#inicio">
          {ui.footer.backToTop}
          <Icon name="arrow-up" size={16} />
        </a>
      </div>
    </footer>
  );
}
