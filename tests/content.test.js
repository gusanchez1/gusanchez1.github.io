// Testes dos arquivos de conteúdo. Rodam com "npm test", sem nenhuma biblioteca extra (node:test).
// Eles evitam erros comuns ao editar os dados: link quebrado, campo esquecido, imagem que não existe.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { links, mailto, handleFromUrl } from '../src/data/links.js';
import { content } from '../src/content/index.js';

const { ui, profile, skillGroups, skillStatus, projects, education } = content;

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

test('e-mail tem formato válido e o mailto aponta para ele', () => {
  assert.match(links.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  assert.equal(mailto(), `mailto:${links.email}`);
  assert.ok(mailto('Olá, tudo bem?').startsWith(`mailto:${links.email}?subject=`));
});

test('perfis usam HTTPS e o domínio de cada rede', () => {
  assert.equal(new URL(links.github).hostname, 'github.com');
  assert.match(new URL(links.linkedin).hostname, /(^|\.)linkedin\.com$/);
  assert.match(new URL(links.instagram).hostname, /(^|\.)instagram\.com$/);
  for (const url of [links.github, links.linkedin, links.instagram]) assert.ok(isHttpsUrl(url), url);
  assert.equal(handleFromUrl(links.instagram), 'uguhz');
});

test('currículo, se informado, existe na pasta public/', () => {
  if (links.resume === null) return;
  assert.ok(existsSync(new URL(`../public/${links.resume}`, import.meta.url)), links.resume);
});

test('menu: cada seção tem id único, rótulo e título', () => {
  const sections = Object.values(ui.sections);
  const ids = sections.map((section) => section.id);
  assert.equal(new Set(ids).size, ids.length, 'ids repetidos');
  for (const section of sections) {
    assert.match(section.id, /^[a-z-]+$/);
    assert.ok(section.nav && section.title, section.id);
  }
});

test('perfil tem nome, apresentação, ficha e trajetória preenchidos', () => {
  assert.ok(profile.name);
  assert.ok(profile.hero.intro && profile.hero.description);
  assert.ok(profile.facts.length > 0);
  assert.ok(profile.about.length > 0);
  assert.ok(profile.career.stops.length > 0 && profile.career.next);
  for (const stop of profile.career.stops) assert.ok(stop.title && stop.place, stop.title);
});

test('foto, se informada, tem texto alternativo, tamanho e existe em public/', () => {
  const { photo } = profile;
  if (photo === null) return;
  assert.ok(photo.alt?.trim(), 'falta o texto alternativo da foto');
  assert.ok(photo.width > 0 && photo.height > 0, 'informe width e height da foto');
  for (const src of [photo.src, photo.srcSmall].filter(Boolean)) {
    assert.ok(existsSync(new URL(`../public/${src}`, import.meta.url)), `${src} não encontrada`);
  }
});

test('contato: cada público tem texto, botão e assunto do e-mail', () => {
  for (const audience of ui.contact.audiences) {
    assert.ok(audience.label && audience.text && audience.cta && audience.subject, audience.label);
  }
});

test('chamada do topo leva a um projeto que existe', () => {
  const ids = projects.map((project) => project.id);
  assert.ok(ids.includes(profile.hero.featured.projectId));
});

test('tecnologias usam um status conhecido e têm descrição', () => {
  for (const group of skillGroups) {
    assert.ok(group.title && group.items.length > 0, group.title);
    for (const item of group.items) {
      assert.ok(item.status in skillStatus, `${item.name}: status "${item.status}" não existe`);
      assert.ok(item.note, `${item.name}: falta a descrição`);
      // Nada de níveis em porcentagem
      assert.equal(item.level, undefined, `${item.name}: não use nível em porcentagem`);
    }
  }
});

test('projetos têm os campos básicos e ids únicos', () => {
  assert.ok(projects.length > 0);
  const ids = projects.map((project) => project.id);
  assert.equal(new Set(ids).size, ids.length, 'ids de projeto repetidos');
  for (const project of projects) {
    assert.match(project.id, /^[a-z0-9-]+$/, `id inválido: ${project.id}`);
    assert.ok(project.name && project.tagline, project.id);
  }
});

test('links de projeto ficam null ou são endereços HTTPS', () => {
  for (const project of projects) {
    for (const key of ['demoUrl', 'repoUrl']) {
      const value = project[key];
      assert.ok(value === null || value === undefined || isHttpsUrl(value), `${project.id}.${key}: ${value}`);
    }
  }
});

test('capturas de tela têm texto alternativo e o arquivo existe em public/', () => {
  for (const project of projects) {
    for (const image of project.images ?? []) {
      assert.ok(image.alt?.trim(), `${image.src}: falta o texto alternativo (alt)`);
      assert.ok(image.width > 0 && image.height > 0, `${image.src}: informe width e height`);
      const file = new URL(`../public/${image.src.replace(/^\//, '')}`, import.meta.url);
      assert.ok(existsSync(file), `${image.src}: arquivo não encontrado em public/`);
    }
  }
});

test('formação tem graduação e cursos', () => {
  assert.ok(education.degree.title && education.degree.institution);
  for (const item of education.courses) assert.ok(item.title && item.provider, item.title);
  for (const item of education.languages) assert.ok(item.title, 'idioma sem nome');
});
