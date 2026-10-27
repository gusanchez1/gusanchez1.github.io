import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { links } from './src/data/links.js';
import { content } from './src/content/index.js';

// Caminho em que o site é servido. No GitHub Pages sem domínio próprio é "/nome-do-repositorio/";
// com domínio próprio (ex.: gusanchez.dev.br) é "/". O workflow de deploy define os dois sozinho.
const base = process.env.BASE_PATH || '/';

// Endereço público do site, sem barra no final (ex.: https://gusanchez.dev.br).
// Também vem do workflow de deploy. Sem ele (no computador), as tags que exigem URL completa ficam de fora.
const siteUrl = (process.env.SITE_URL || '').replace(/\/$/, '');

// Imagem de compartilhamento (Open Graph): 1200 × 630 px, em public/og-image.png
const OG_IMAGE = 'og-image.png';
const hasOgImage = existsSync(fileURLToPath(new URL(`./public/${OG_IMAGE}`, import.meta.url)));

export default defineConfig({
  base,
  plugins: [react(), seoTags()],
});

// Acrescenta ao index.html as tags que dependem do endereço final do site
// e os dados estruturados (schema.org) montados a partir dos arquivos de conteúdo.
function seoTags() {
  const { profile, skillGroups } = content;

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: siteUrl ? `${siteUrl}/` : undefined,
    image: siteUrl && profile.photo ? `${siteUrl}/${profile.photo.src}` : undefined,
    description: profile.hero.intro,
    address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressRegion: 'SP', addressCountry: 'BR' },
    sameAs: [links.github, links.linkedin, links.instagram],
    knowsAbout: skillGroups.flatMap((group) => group.items.map((item) => item.name)),
  };

  return {
    name: 'seo-tags',
    transformIndexHtml() {
      const tags = [
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(person),
          injectTo: 'head',
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: siteUrl && hasOgImage ? 'summary_large_image' : 'summary' },
          injectTo: 'head',
        },
      ];

      if (siteUrl) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}/` }, injectTo: 'head' },
        );
      }

      if (siteUrl && hasOgImage) {
        const image = `${siteUrl}/${OG_IMAGE}`;
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
