import { useEffect } from 'react';
import { content } from './content/index.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Education from './sections/Education.jsx';
import Contact from './sections/Contact.jsx';

export default function App() {
  // O React monta a página depois que o navegador já tentou pular para a âncora do endereço
  // (ex.: .../#contato). Por isso, ao abrir a página, fazemos esse salto manualmente, sem animação
  // e depois que as fontes carregam (para a posição não mudar logo em seguida).
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    document.fonts.ready.then(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
    });
  }, []);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        {content.ui.skipLink}
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
