// Todo o texto do site sai daqui. Cada idioma tem sua pasta, com a mesma estrutura:
//   pt-BR/ → página principal (index.html)
//   en/    → versão em inglês (en/index.html)
//
// O idioma é escolhido pelo atributo lang do <html> de cada página. Fora do navegador
// (no build e nos testes) o padrão é o português.
import * as ptBR from './pt-BR/index.js';
import * as en from './en/index.js';

export const locales = { 'pt-BR': ptBR, en };

const lang = typeof document !== 'undefined' ? document.documentElement.lang : 'pt-BR';

export const locale = lang === 'en' ? 'en' : 'pt-BR';
export const content = locales[locale];
