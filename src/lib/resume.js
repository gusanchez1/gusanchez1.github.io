import { locale } from '../content/index.js';
import { links } from '../data/links.js';

// Currículos em PDF, com o do idioma da página primeiro (PT no site em português, EN no site em inglês).
export const resumeFiles = [...links.resume].sort((a, b) => (b.lang === locale) - (a.lang === locale));
