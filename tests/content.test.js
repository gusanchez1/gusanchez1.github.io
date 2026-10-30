// Testes dos arquivos de conteúdo. Rodam com "npm test", sem nenhuma biblioteca extra (node:test).
// Eles evitam erros comuns ao editar os dados: link quebrado, campo esquecido, imagem que não existe
// e diferenças entre as versões em português e em inglês.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { links, mailto, handleFromUrl } from '../src/data/links.js';
import { locales } from '../src/content/index.js';

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

const inPublic = (path) => existsSync(new URL(`../public/${path.replace(/^\//, '')}`, import.meta.url));

// ─── Dados que não dependem do idioma ────────────────────────────────────────

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

test('currículos: um por idioma do site, arquivo em public/ e nome de download em .pdf', () => {
  assert.ok(Array.isArray(links.resume), 'resume deve ser uma lista ([] quando não houver currículo)');
  const langs = links.resume.map((file) => file.lang);
  assert.equal(new Set(langs).size, langs.length, 'dois currículos no mesmo idioma');
  for (const file of links.resume) {
    assert.ok(file.lang in locales, `${file.path}: idioma "${file.lang}" não existe no site`);
    assert.ok(inPublic(file.path), `${file.path}: arquivo não encontrado em public/`);
    assert.match(file.downloadName, /\.pdf$/, `${file.path}: downloadName deve terminar em .pdf`);
    for (const [locale, { ui }] of Object.entries(locales)) {
      assert.ok(ui.resume.languages[file.lang]?.short, `[${locale}] falta o texto do botão do currículo "${file.lang}"`);
    }
  }
});

// ─── Os mesmos testes para cada idioma ───────────────────────────────────────

for (const [locale, { ui, profile, skillGroups, skillStatus, projects, education }] of Object.entries(locales)) {
  test(`[${locale}] menu: cada seção tem id único, rótulo e título`, () => {
    const sections = Object.values(ui.sections);
    const ids = [ui.hero.id, ...sections.map((section) => section.id)];
    assert.equal(new Set(ids).size, ids.length, 'ids repetidos');
    for (const section of sections) {
      assert.match(section.id, /^[a-z-]+$/);
      assert.ok(section.nav && section.title, section.id);
    }
  });

  test(`[${locale}] link de idioma aponta para outra página`, () => {
    const { label, name, href, hreflang } = ui.languageSwitch;
    assert.ok(label && name && hreflang);
    assert.ok(href === '' || href.endsWith('/'), `href deve ser "" ou terminar com "/": ${href}`);
    assert.notEqual(hreflang, locale, 'o link deve levar ao outro idioma');
  });

  test(`[${locale}] perfil tem nome, apresentação, ficha e trajetória`, () => {
    assert.ok(profile.name);
    assert.ok(profile.hero.intro && profile.hero.description);
    assert.ok(profile.facts.length > 0);
    assert.ok(profile.about.length > 0);
    assert.ok(profile.career.stops.length > 0 && profile.career.next);
    for (const stop of profile.career.stops) assert.ok(stop.title && stop.place, stop.title);
  });

  test(`[${locale}] foto, se informada, tem texto alternativo, tamanho e existe em public/`, () => {
    const { photo } = profile;
    if (photo === null) return;
    assert.ok(photo.alt?.trim(), 'falta o texto alternativo da foto');
    assert.ok(photo.width > 0 && photo.height > 0, 'informe width e height da foto');
    for (const src of [photo.src, photo.srcSmall].filter(Boolean)) assert.ok(inPublic(src), `${src} não encontrada`);
  });

  test(`[${locale}] chamada do topo leva a um projeto que existe`, () => {
    assert.ok(projects.some((project) => project.id === profile.hero.featured.projectId));
  });

  test(`[${locale}] contato: cada público tem texto, botão e assunto do e-mail`, () => {
    for (const audience of ui.contact.audiences) {
      assert.ok(audience.label && audience.text && audience.cta && audience.subject, audience.label);
    }
  });

  test(`[${locale}] tecnologias usam um status conhecido e têm descrição`, () => {
    for (const group of skillGroups) {
      assert.ok(group.title && group.items.length > 0, group.title);
      for (const item of group.items) {
        assert.ok(item.status in skillStatus, `${item.name}: status "${item.status}" não existe`);
        assert.ok(item.note, `${item.name}: falta a descrição`);
        assert.equal(item.level, undefined, `${item.name}: não use nível em porcentagem`);
      }
    }
  });

  test(`[${locale}] projetos têm os campos básicos e ids únicos`, () => {
    assert.ok(projects.length > 0);
    const ids = projects.map((project) => project.id);
    assert.equal(new Set(ids).size, ids.length, 'ids de projeto repetidos');
    for (const project of projects) {
      assert.match(project.id, /^[a-z0-9-]+$/, `id inválido: ${project.id}`);
      assert.ok(project.name && project.tagline, project.id);
    }
  });

  test(`[${locale}] links de projeto ficam null ou são endereços HTTPS`, () => {
    for (const project of projects) {
      for (const key of ['demoUrl', 'repoUrl']) {
        const value = project[key];
        assert.ok(value === null || value === undefined || isHttpsUrl(value), `${project.id}.${key}: ${value}`);
      }
    }
  });

  test(`[${locale}] capturas de tela têm texto alternativo e o arquivo existe em public/`, () => {
    for (const project of projects) {
      for (const image of project.images ?? []) {
        assert.ok(image.alt?.trim(), `${image.src}: falta o texto alternativo (alt)`);
        assert.ok(image.width > 0 && image.height > 0, `${image.src}: informe width e height`);
        assert.ok(inPublic(image.src), `${image.src}: arquivo não encontrado em public/`);
      }
    }
  });

  test(`[${locale}] formação tem graduação, cursos e idiomas`, () => {
    assert.ok(education.degree.title && education.degree.institution);
    for (const item of education.courses) assert.ok(item.title && item.provider, item.title);
    for (const item of education.languages) assert.ok(item.title, 'idioma sem nome');
  });
}

// ─── As traduções precisam ter a mesma estrutura do português ────────────────

// Âncoras e link de idioma mudam de propósito entre as versões (ex.: #sobre × #about)
const languageSpecific = new Set(['ui.sections', 'ui.hero.id', 'ui.languageSwitch']);

// Compara dois valores: objetos com as mesmas chaves, listas do mesmo tamanho, textos preenchidos
// e números, links (null) e caminhos de arquivo idênticos.
function assertSameShape(reference, translation, path) {
  if (languageSpecific.has(path)) return;
  if (Array.isArray(reference)) {
    assert.ok(Array.isArray(translation), `${path}: deveria ser uma lista`);
    assert.equal(translation.length, reference.length, `${path}: quantidade de itens diferente`);
    reference.forEach((item, i) => assertSameShape(item, translation[i], `${path}[${i}]`));
  } else if (reference && typeof reference === 'object') {
    assert.ok(translation && typeof translation === 'object', `${path}: deveria ser um objeto`);
    assert.deepEqual(Object.keys(translation).sort(), Object.keys(reference).sort(), `${path}: campos diferentes`);
    for (const key of Object.keys(reference)) assertSameShape(reference[key], translation[key], `${path}.${key}`);
  } else if (typeof reference === 'string') {
    assert.equal(typeof translation, 'string', `${path}: deveria ser um texto`);
    const isTechnical = /^(https?:|projects\/|images\/|[a-z0-9-]+$)/.test(reference) && !reference.includes(' ');
    if (reference && isTechnical && !path.endsWith('.href')) {
      assert.equal(translation, reference, `${path}: links, ids e arquivos devem ser iguais nos dois idiomas`);
    }
    if (reference) assert.ok(translation.trim(), `${path}: texto vazio`);
  } else {
    assert.equal(translation, reference, `${path}: valor diferente`);
  }
}

for (const [locale, translation] of Object.entries(locales)) {
  if (locale === 'pt-BR') continue;
  test(`[${locale}] tem a mesma estrutura, links e arquivos do pt-BR`, () => {
    const reference = locales['pt-BR'];
    assert.deepEqual(Object.keys(translation).sort(), Object.keys(reference).sort(), 'arquivos de conteúdo diferentes');
    for (const name of Object.keys(reference)) assertSameShape(reference[name], translation[name], name);
    // As seções podem ter âncoras diferentes, mas precisam ser as mesmas e ter os mesmos campos
    assert.deepEqual(Object.keys(translation.ui.sections), Object.keys(reference.ui.sections), 'ui.sections: seções diferentes');
    for (const key of Object.keys(reference.ui.sections)) {
      assert.deepEqual(Object.keys(translation.ui.sections[key]).sort(), Object.keys(reference.ui.sections[key]).sort(), `ui.sections.${key}`);
    }
  });
}
