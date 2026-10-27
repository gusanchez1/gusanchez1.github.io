import { useEffect, useRef, useState } from 'react';
import { content } from '../content/index.js';
import { useActiveSection } from '../hooks/useActiveSection.js';
import Icon from './Icon.jsx';
import Logo from './Logo.jsx';
import './Header.css';

const { ui, profile } = content;
const navItems = Object.values(ui.sections);
// O topo ("inicio") também é observado: lá nenhum item do menu fica destacado
const observedIds = ['inicio', ...navItems.map((item) => item.id)];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(observedIds);
  const headerRef = useRef(null);
  const buttonRef = useRef(null);

  // Linha inferior do menu só aparece depois de rolar a página
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu do celular: fecha com Esc ou com um toque fora dele
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className={`header${scrolled || menuOpen ? ' is-scrolled' : ''}`}>
      <div className="container header__inner">
        <a className="brand" href="#inicio" onClick={() => setMenuOpen(false)}>
          <Logo />
          <span>{profile.shortName}</span>
        </a>

        <button
          ref={buttonRef}
          type="button"
          className="menu-button"
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          aria-label={menuOpen ? ui.menu.close : ui.menu.open}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{ui.menu.label}</span>
          <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
        </button>

        <nav id="menu-principal" className={`nav${menuOpen ? ' is-open' : ''}`} aria-label={ui.menu.nav}>
          <ul className="nav__list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  className={`nav__link${item.id === ui.sections.contact.id ? ' nav__link--cta' : ''}`}
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'location' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.nav}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
