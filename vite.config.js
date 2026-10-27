import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { links } from './src/data/links.js';
import { locales } from './src/content/index.js';

// Caminho em que o site é servido. No GitHub Pages sem domínio próprio é "/nome-do-repositorio/";
// com domínio próprio (ex.: gusanchez.dev.br) é "/". O workflow de deploy define os dois sozinho.
const base = process.env.BASE_PATH || '/';

// Endereço público do site, sem barra no final (ex.: https://gusanchez.dev.br).
// Também vem do workflow de deploy. Sem ele (no computador), as tags que exigem URL completa ficam de fora.
const siteUrl = (process.env.SITE_URL || '').replace(/\/$/, '');

// As páginas do site, uma por idioma. Cada uma tem seu HTML, seu endereço e sua imagem de compartilhamento
// (1200 × 630 px, na pasta public/; se a imagem do idioma não existir, usa a do português).
const pages = {
  'pt-BR': { html: 'index.html', path: '/', ogImage: 'og-image.png' },
  en: { html: 'en/index.html', path: '/en/', ogImage: 'og-image-en.png' },
};

const fromRoot = (file) => fileURLToPath(new URL(`./${file}`, import.meta.url));

export default defineConfig({
  base,
  plugins: [react(), seoTags()],
  build: {
    // Gera as duas páginas: dist/index.html (português) e dist/en/index.html (inglês)
    rolldownOptions: {
      input: Object.fromEntries(Object.entries(pages).map(([locale, page]) => [locale, fromRoot(page.html)])),
    },
  },
});

// Acrescenta a cada página as tags que dependem do endereço final do site
// e os dados estruturados (schema.org) montados a partir dos arquivos de conteúdo do idioma.
function seoTags() {
  return {
    name: 'seo-tags',
    transformIndexHtml(html, ctx) {
      const locale = ctx.path.startsWith('/en/') ? 'en' : 'pt-BR';
      const { profile, skillGroups } = locales[locale];
      const page = pages[locale];
      const pageUrl = `${siteUrl}${page.path}`;
      const ogImage = existsSync(fromRoot(`public/${page.ogImage}`)) ? page.ogImage : pages['pt-BR'].ogImage;
      const hasOgImage = existsSync(fromRoot(`public/${ogImage}`));

      const person = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        url: siteUrl ? pageUrl : undefined,
        image: siteUrl && profile.photo ? `${siteUrl}/${profile.photo.src}` : undefined,
        description: profile.hero.intro,
        address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressRegion: 'SP', addressCountry: 'BR' },
        sameAs: [links.github, links.linkedin, links.instagram],
        knowsAbout: skillGroups.flatMap((group) => group.items.map((item) => item.name)),
      };

      const tags = [
        { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(person), injectTo: 'head' },
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: siteUrl && hasOgImage ? 'summary_large_image' : 'summary' },
          injectTo: 'head',
        },
      ];

      if (siteUrl) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: pageUrl }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: pageUrl }, injectTo: 'head' },
          // Avisa aos buscadores que as duas páginas são traduções uma da outra
          ...Object.entries(pages).map(([lang, p]) => ({
            tag: 'link',
            attrs: { rel: 'alternate', hreflang: lang, href: `${siteUrl}${p.path}` },
            injectTo: 'head',
          })),
          { tag: 'link', attrs: { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/` }, injectTo: 'head' },
        );
      }

      if (siteUrl && hasOgImage) {
        const image = `${siteUrl}/${ogImage}`;
        tags.push(
          { tag: 'meta', attrs: { property: 'og:image', content: image }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image:height', content: '630' }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image:alt', content: `${profile.name} — ${profile.hero.intro}` }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image', content: image }, injectTo: 'head' },
        );
      }

      return tags;
    },
  };
}
