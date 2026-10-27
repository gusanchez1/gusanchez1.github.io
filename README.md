# Portfólio · Gustavo Avelino Sanchez

Site pessoal de Gustavo Avelino Sanchez, estudante de Ciência da Computação (FAM) e desenvolvedor web em formação, em São Paulo.

É uma página única feita com **React + Vite**, sem back-end, sem banco de dados e sem serviços pagos. Todo o conteúdo (textos, links, tecnologias, projetos e cursos) fica em arquivos de dados separados dos componentes, então dá para atualizar o site sem mexer no layout.

---

## Sumário

1. [Tecnologias e decisões](#1-tecnologias-e-decisões)
2. [Rodando no computador](#2-rodando-no-computador)
3. [Estrutura de pastas](#3-estrutura-de-pastas)
4. [Como atualizar o conteúdo](#4-como-atualizar-o-conteúdo)
5. [Identidade visual](#5-identidade-visual)
6. [Acessibilidade, desempenho e SEO](#6-acessibilidade-desempenho-e-seo)
7. [Publicação gratuita no GitHub Pages](#7-publicação-gratuita-no-github-pages)
8. [Domínio próprio: gusanchez.dev.br (futuro)](#8-domínio-próprio-gusanchezdevbr-futuro)
9. [Versão em inglês (futuro)](#9-versão-em-inglês-futuro)
10. [Pendências antes de divulgar](#10-pendências-antes-de-divulgar)

---

## 1. Tecnologias e decisões

| O quê | Por quê |
| --- | --- |
| React 19 + Vite | Pedido do projeto; o Vite gera arquivos estáticos, prontos para hospedagem gratuita |
| JavaScript (sem TypeScript) | Mais simples para começar; dá para migrar depois |
| CSS puro, um arquivo por componente | Sem framework de CSS para aprender junto; as cores e medidas ficam em variáveis (`:root`) |
| Fontes Bricolage Grotesque e JetBrains Mono (pacotes `@fontsource-variable`) | As fontes são servidas pelo próprio site: nada de Google Fonts, nada de requisição externa |
| Ícones em SVG dentro do código ([src/components/Icon.jsx](src/components/Icon.jsx)) | Evita uma biblioteca inteira de ícones por causa de uns dez desenhos |
| Testes com `node:test` | Já vem com o Node; não precisa instalar nada |

São apenas **4 dependências** (React, React DOM e as duas fontes) e 2 de desenvolvimento (Vite e o plugin do React).

**Por que não há formulário de contato?** Um formulário precisaria de um servidor ou de um serviço externo para enviar a mensagem. Os botões "Falar sobre uma vaga" e "Pedir um orçamento" (links `mailto:` com o assunto já preenchido) e o botão "Copiar e-mail" funcionam sem nada disso e não fingem enviar algo que não foi enviado.

---

## 2. Rodando no computador

**Pré-requisito:** Node.js 20.19+ ou 22.12+ (recomendado: 24).

```bash
npm install        # instala as dependências (só na primeira vez)
npm run dev        # abre o site em http://localhost:5173 e recarrega a cada alteração
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com recarregamento automático |
| `npm test` | Testa os arquivos de conteúdo (links, campos obrigatórios, imagens que existem) |
| `npm run build` | Gera a versão de produção na pasta `dist/` |
| `npm run preview` | Abre a versão de produção (`dist/`) em http://localhost:4173 |
| `npm run check` | Roda os testes e o build, nessa ordem |

Para ver o site no celular, na mesma rede Wi-Fi: `npm run dev -- --host` e abra o endereço "Network" que aparece no terminal.

---

## 3. Estrutura de pastas

```
gusanchez-portfolio/
├── index.html                  # título, descrição e metadados de SEO
├── vite.config.js              # caminho base do site e tags que dependem da URL final
├── public/                     # arquivos copiados como estão para o site
│   ├── images/                 # sua foto (800 px e versão de 400 px para o celular)
│   ├── favicon.svg             # ícone da aba
│   ├── apple-touch-icon.png    # ícone ao salvar o site na tela inicial do celular
│   ├── og-image.png            # imagem de prévia ao compartilhar o link (1200 × 630)
│   └── robots.txt
├── scripts/og-image.html       # modelo usado para gerar a og-image.png
├── tests/content.test.js       # testes dos arquivos de conteúdo
├── .github/workflows/deploy.yml  # publicação automática no GitHub Pages
└── src/
    ├── data/links.js           # ← e-mail, GitHub, LinkedIn, Instagram, currículo
    ├── content/
    │   ├── index.js            # escolhe o idioma (hoje, só pt-BR)
    │   └── pt-BR/              # ← TODOS os textos do site
    │       ├── profile.js      #   apresentação, foto, sobre mim, ficha rápida, trajetória
    │       ├── skills.js       #   tecnologias
    │       ├── projects.js     #   projetos
    │       ├── education.js    #   faculdade, cursos e idiomas
    │       └── ui.js           #   menu, títulos das seções, botões, contato, rodapé
    ├── sections/               # as seções da página (Hero, About, Skills, Projects, Education, Contact)
    ├── components/             # peças reutilizáveis (Header, Footer, Section, ProjectCase, Icon...)
    ├── hooks/                  # seção ativa no menu e relógio de São Paulo
    ├── lib/asset.js            # monta o caminho de arquivos da pasta public/
    ├── styles/global.css       # cores, fontes, espaçamentos e estilos compartilhados
    ├── App.jsx                 # monta a página
    └── main.jsx                # ponto de entrada
```

Regra geral: **para mudar texto ou link, edite `src/data` ou `src/content`**. Os componentes em `src/sections` e `src/components` só cuidam da aparência.

---

## 4. Como atualizar o conteúdo

Depois de qualquer alteração, rode `npm test` para conferir se nada ficou faltando.

### Links e contato

Tudo em [src/data/links.js](src/data/links.js). O mesmo endereço é usado no topo, no contato, no rodapé e nos dados de SEO.

### Textos

| O quê | Arquivo |
| --- | --- |
| Status ("Disponível para estágio..."), apresentação do topo, foto | [src/content/pt-BR/profile.js](src/content/pt-BR/profile.js) |
| Texto "Sobre mim", ficha "Em resumo" e trajetória profissional (linha de metrô) | [src/content/pt-BR/profile.js](src/content/pt-BR/profile.js) |
| Títulos das seções, itens do menu, botões, rodapé | [src/content/pt-BR/ui.js](src/content/pt-BR/ui.js) |
| Contato: textos "Para recrutadores" e "Para negócios" e o assunto de cada e-mail | `contact.audiences` em [src/content/pt-BR/ui.js](src/content/pt-BR/ui.js) |
| Título e descrição para o Google e para prévias de link | [index.html](index.html) |

Ao avançar de semestre, atualize "6º semestre" em `profile.js` (aparece na apresentação, no texto "Sobre mim" e na ficha) e em `education.js`.

### Foto

O retrato fica em `public/images/`, em duas versões recortadas em 4:5: `gustavo-avelino-sanchez.webp` (800 × 1000) e `gustavo-avelino-sanchez-400.webp` (400 × 500, que o celular baixa no lugar da grande). Os nomes e o texto alternativo ficam em `photo`, no `profile.js`. Para trocar a foto, substitua os dois arquivos mantendo os nomes. Para tirar a foto do site, use `photo: null`.

Dicas para a próxima foto: tirada por outra pessoa, na altura dos olhos, com luz natural suave, fundo simples e sem fones de ouvido. Exporte em WebP. Fotos de celular podem guardar a localização GPS nos metadados, e exportar em WebP pelo [squoosh.app](https://squoosh.app) remove essas informações.

### Tecnologias

Em [src/content/pt-BR/skills.js](src/content/pt-BR/skills.js). Cada tecnologia tem:

```js
{ name: 'Node.js', status: 'studying', note: 'Descrição curta e honesta.' }
```

- `status: 'practiced'` → "Experiência prática" (marcador cheio)
- `status: 'studying'` → "Em aprendizado" (marcador vazado)

Quando ganhar prática em algo, troque o status e a descrição. Não há porcentagens de propósito.

### Projetos

Em [src/content/pt-BR/projects.js](src/content/pt-BR/projects.js). Cada objeto da lista vira um estudo de caso completo na página. Para adicionar um projeto, copie o objeto do Nardelli Barber, troque os textos e **apague os blocos que não fizerem sentido**: blocos ausentes ou vazios simplesmente não aparecem. Os únicos campos obrigatórios são `id`, `name` e `tagline`.

**Link do site e repositório:** preencha `demoUrl` e `repoUrl` quando existirem (precisam começar com `https://`); com `null`, o botão não aparece. `demoLabel` muda o texto do botão (no Nardelli Barber: "Ver site no ar") e `linksNote` é uma observação exibida logo abaixo. No Nardelli Barber, ela pede que ninguém faça agendamentos de teste, porque o site é o sistema real do cliente.

**Capturas de tela:**

1. Rode o projeto no computador **com dados fictícios** (por exemplo, o `npm run seed` do próprio Nardelli Barber). Não mostre nomes ou telefones de clientes reais nem as fotos de clientes do portfólio da barbearia: elas dependem de autorização de uso de imagem.
2. Capture as telas no navegador. No Chrome, use F12 → ícone de celular/tablet para escolher o tamanho, e o menu ⋮ → "Capture screenshot". Uma largura de 1600 px é suficiente.
3. Converta para **WebP** com boa compressão (por exemplo, em [squoosh.app](https://squoosh.app)), mirando menos de 200 KB por imagem.
4. Salve em `public/projects/nardelli-barber/` e liste em `images`:

```js
images: [
  {
    src: 'projects/nardelli-barber/agendamento.webp',
    alt: 'Passo de escolha de data e horário, com o calendário e os horários livres do dia',
    caption: 'Agendamento: só aparecem horários em que o serviço inteiro cabe',
    width: 1600,
    height: 1000,
  },
],
```

A primeira imagem aparece grande e as outras em duas colunas. `width` e `height` são o tamanho real do arquivo: evitam que a página "pule" enquanto a imagem carrega. O teste confere se o arquivo existe e se tem `alt`.

Sugestões de telas: página inicial, passo de data e horário do agendamento, confirmação com o link de cancelamento, início do painel (faturamento), agenda da semana e horários fixos.

### Formação

Em [src/content/pt-BR/education.js](src/content/pt-BR/education.js). Datas (`period`) só aparecem quando preenchidas.

### Currículo em PDF (opcional)

Coloque o arquivo em `public/` (ex.: `public/curriculo-gustavo-avelino-sanchez.pdf`) e informe o nome em `resume`, no [src/data/links.js](src/data/links.js):

```js
resume: 'curriculo-gustavo-avelino-sanchez.pdf',
```

Aparecem dois botões: "Currículo (PDF)" no topo da página e "Currículo · Abrir PDF" no contato. Os dois abrem o arquivo numa nova aba. Enquanto `resume` for `null`, eles ficam escondidos, para não existir um link que leva a uma página de erro. O `npm test` confere se o arquivo informado existe.

### Imagem de compartilhamento (Open Graph)

`public/og-image.png` (1200 × 630 px) é a prévia exibida quando o link é colado no LinkedIn, WhatsApp etc. Ela foi gerada a partir de [scripts/og-image.html](scripts/og-image.html); as instruções para gerar de novo estão no topo desse arquivo. Você também pode trocá-la por qualquer imagem 1200 × 630 com o mesmo nome.

As tags `og:image`, `og:url` e o link canônico precisam do endereço completo do site, então são acrescentadas **no build de publicação** (veja `seoTags` no [vite.config.js](vite.config.js)). No computador elas não aparecem, e isso é esperado.

### Favicon

`public/favicon.svg` (aba do navegador) e `public/apple-touch-icon.png` (180 × 180, tela inicial do iPhone). O monograma é o mesmo de [src/components/Logo.jsx](src/components/Logo.jsx).

---

## 5. Identidade visual

- **Direção:** editorial e técnica. Tipografia grande, linhas finas em vez de caixas e espaço generoso. A ideia é parecer uma revista com detalhes de terminal, não um template.
- **Cores** (em [src/styles/global.css](src/styles/global.css)): fundo grafite quente `#0e0d0b`, texto creme `#ede8df`, textos secundários `#aaa398` e `#8d867b`, e um único destaque âmbar `#f2a541`, usado com moderação (status, marcadores, links ao passar o mouse, foco do teclado).
- **Tipografia:** Bricolage Grotesque para títulos e textos (o eixo óptico deixa a fonte mais expressiva nos tamanhos grandes e mais neutra nos pequenos). JetBrains Mono para rótulos e metadados.
- **Ícones:** traço fino, no estilo do Lucide, desenhados em SVG.
- **Foto:** no desktop, ao lado do nome; no celular, pequena acima dele, para o rosto aparecer já na primeira tela sem empurrar o texto para baixo.
- **Detalhes autorais:**
  - A trajetória profissional desenhada como uma linha de metrô, do primeiro emprego ao freelance, com a "próxima estação" em desenvolvimento de software.
  - O relógio com a hora de São Paulo, útil para recrutadores de outros fusos.
  - O diagrama de arquitetura do projeto feito em HTML e CSS, sobre um fundo pontilhado de papel de projeto.
- **Movimento:** só uma entrada suave do topo ao carregar a página e pequenas respostas ao passar o mouse. Nada fica animando sem parar.

---

## 6. Acessibilidade, desempenho e SEO

**Acessibilidade**

- HTML semântico: `header`, `nav`, `main`, `section` com título, `article`, `footer` e hierarquia de títulos h1 → h2 → h3.
- Link "Pular para o conteúdo" (aparece no primeiro Tab).
- Foco do teclado sempre visível (contorno âmbar).
- Menu do celular com `aria-expanded`; fecha com Esc e devolve o foco ao botão.
- Links que abrem em nova aba avisam isso para leitores de tela.
- O status das tecnologias usa forma (cheio/vazado) **e** texto, não só cor.
- Com "Reduzir movimento" ativado no sistema, animações e rolagem suave são desligadas.
- Contraste de cores verificado (Lighthouse: sem erros de contraste).

**Desempenho:** fontes servidas pelo próprio site (o navegador baixa só o subconjunto latino, ~117 KB) e a foto em WebP com duas versões: o celular baixa a de 400 px (44 KB) e telas maiores a de 800 px (130 KB) quando precisam. O CSS tem cerca de 8 KB comprimido e o JavaScript cerca de 80 KB comprimido, quase todo do React.

**Resultado do Lighthouse** (versão de produção, 27/10/2026):

| | Desempenho | Acessibilidade | Boas práticas | SEO |
| --- | --- | --- | --- | --- |
| Desktop | 100 | 100 | 100 | 100 |
| Celular (4G simulado) | 96 | 100 | 100 | 100 |

**SEO:** título, descrição, idioma `pt-BR`, Open Graph, `robots.txt` e dados estruturados `schema.org/Person` (com nome, cidade, perfis e tecnologias, montados a partir dos arquivos de conteúdo). Isso ajuda os buscadores a entender a página, mas não garante posição em resultados de busca.

---

## 7. Publicação gratuita no GitHub Pages

### Por que GitHub Pages

| | GitHub Pages | Cloudflare Pages | Netlify | Vercel |
| --- | --- | --- | --- | --- |
| Custo | Grátis | Grátis | Plano gratuito com limites de uso | Plano Hobby grátis (uso pessoal) |
| Precisa de conta nova? | **Não** (você já usa GitHub) | Sim | Sim | Sim |
| Domínio próprio + HTTPS grátis | Sim | Sim (domínio raiz exige DNS na Cloudflare) | Sim | Sim |
| Funciona com React + Vite | Sim | Sim | Sim | Sim |
| Prévia por pull request | Não | Sim | Sim | Sim |

O GitHub Pages foi escolhido porque o código e o site ficam no mesmo lugar: recrutadores que abrem o seu GitHub encontram o repositório do portfólio e o site publicado. Também não é preciso criar outra conta, e o domínio próprio com HTTPS é gratuito. Os limites (1 GB de site e cerca de 100 GB de tráfego por mês) sobram para um portfólio. A publicação já está pronta em [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

> No plano gratuito do GitHub, o Pages só publica repositórios **públicos**. O código do portfólio não tem nada sensível, então pode ser público.

### Passo a passo (primeira vez)

1. No GitHub, crie um repositório **público** chamado `gusanchez-portfolio`, sem README (o projeto já tem um).
2. No terminal, dentro da pasta do projeto:

   ```bash
   git add .
   git commit -m "Primeira versão do portfólio"
   git branch -M main
   git remote add origin https://github.com/gusanchez1/gusanchez-portfolio.git
   git push -u origin main
   ```

3. No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Abra a aba **Actions**. O workflow "Publicar no GitHub Pages" roda os testes, gera o build e publica. Se ele rodou antes do passo 3 e falhou, clique em **Run workflow** para rodar de novo.
5. O site fica em **https://gusanchez1.github.io/gusanchez-portfolio/**.

### Atualizações

Toda vez que você fizer `git push` na branch `main`, o site é publicado de novo em um ou dois minutos. Se os testes falharem, nada é publicado e o site anterior continua no ar.

### Como o caminho do site é resolvido

Sem domínio próprio, o site fica em uma "subpasta" (`/gusanchez-portfolio/`); com domínio próprio, fica na raiz (`/`). O workflow pergunta ao GitHub qual é o caso (`actions/configure-pages`) e repassa ao build as variáveis `BASE_PATH` e `SITE_URL`. **Você não precisa mudar código ao trocar de endereço.**

> **Dica para testar no Windows:** o Git Bash transforma `/gusanchez-portfolio/` em um caminho do Windows. Para simular o build do GitHub Pages no computador, use o PowerShell:
> `$env:BASE_PATH='/gusanchez-portfolio/'; npm run build; Remove-Item Env:BASE_PATH`
> ou, no Git Bash: `MSYS_NO_PATHCONV=1 BASE_PATH=/gusanchez-portfolio/ npm run build`.

**Endereço alternativo e mais curto:** se preferir `https://gusanchez1.github.io/` em vez de `.../gusanchez-portfolio/`, dê ao repositório o nome `gusanchez1.github.io`. Nada mais muda.

---

## 8. Domínio próprio: gusanchez.dev.br (futuro)

> Nada disso foi feito. É o roteiro para quando você decidir comprar o domínio. O registro de um domínio `.br` tem custo anual, cobrado pelo Registro.br.

1. **Registrar** `gusanchez.dev.br` em [registro.br](https://registro.br). Mantenha os servidores DNS do próprio Registro.br.

2. **Verificar o domínio no GitHub** (recomendado, impede que outra pessoa use o seu domínio no GitHub Pages):
   foto de perfil → **Settings → Pages → Add a domain** → digite `gusanchez.dev.br`. O GitHub mostra um registro TXT parecido com
   `_github-pages-challenge-gusanchez1.gusanchez.dev.br` → `<código>`. Crie esse registro no Registro.br (passo 3) e volte para clicar em **Verify**.

3. **Configurar o DNS no Registro.br** (no painel do domínio, na área de DNS / edição de zona; o nome exato dos menus pode mudar):

   | Tipo | Nome | Valor |
   | --- | --- | --- |
   | A | `gusanchez.dev.br` (raiz, às vezes deixado em branco) | `185.199.108.153` |
   | A | raiz | `185.199.109.153` |
   | A | raiz | `185.199.110.153` |
   | A | raiz | `185.199.111.153` |
   | AAAA | raiz | `2606:50c0:8000::153` |
   | AAAA | raiz | `2606:50c0:8001::153` |
   | AAAA | raiz | `2606:50c0:8002::153` |
   | AAAA | raiz | `2606:50c0:8003::153` |
   | CNAME | `www` | `gusanchez1.github.io.` |
   | TXT | `_github-pages-challenge-gusanchez1` | código do passo 2 |

   Os IPs acima são os documentados pelo GitHub. Confira se ainda são os mesmos em [docs.github.com](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) na hora de configurar.

4. **Informar o domínio no repositório:** **Settings → Pages → Custom domain** → `gusanchez.dev.br` → **Save**. O GitHub confere o DNS. Pode levar de alguns minutos a algumas horas para o DNS se propagar. Com o domínio e o `www` configurados, o GitHub redireciona um para o outro sozinho.

5. **HTTPS:** quando o certificado ficar pronto (o GitHub emite um gratuitamente, e pode levar até 24 horas), marque **Enforce HTTPS** na mesma página.

6. **Publicar de novo:** em **Actions → Publicar no GitHub Pages → Run workflow**. Assim o build passa a usar o caminho `/` e o endereço `https://gusanchez.dev.br` nas tags de SEO. Não é preciso alterar código.

7. **Conferir:** abra `https://gusanchez.dev.br`, cole o link no LinkedIn para ver a prévia e atualize o endereço no seu perfil do LinkedIn, no GitHub e no currículo.

> Com GitHub Actions, o domínio fica salvo nas configurações do repositório. **Não** é necessário criar um arquivo `CNAME`.

---

## 9. Versão em inglês (futuro)

O projeto já foi organizado para isso: nenhum texto está escrito dentro dos componentes. Um caminho simples:

1. Copie `src/content/pt-BR/` para `src/content/en/` e traduza **apenas os valores** (mantenha os nomes dos campos). Nomes de tecnologias, cursos e instituições (The Web Developer Bootcamp, Curso em Vídeo, Cultura Inglesa, FAM, Fundação Faculdade de Medicina) continuam como estão.
2. Em `src/content/index.js`, escolha o idioma pelo atributo `lang` da página:

   ```js
   import * as ptBR from './pt-BR/index.js';
   import * as en from './en/index.js';

   const lang = typeof document !== 'undefined' ? document.documentElement.lang : 'pt-BR';
   export const locale = lang === 'en' ? 'en' : 'pt-BR';
   export const content = locale === 'en' ? en : ptBR;
   ```

3. Crie `en/index.html` (cópia do `index.html` com `lang="en"`, título e descrição em inglês) e registre as duas páginas no `vite.config.js`:

   ```js
   build: { rollupOptions: { input: { main: 'index.html', en: 'en/index.html' } } },
   ```

4. Adicione no menu um link "EN" / "PT" apontando para a outra versão e as tags `<link rel="alternate" hreflang="...">` nas duas páginas.

O resultado são dois endereços (`/` e `/en/`), o que é melhor para SEO do que trocar o idioma só com JavaScript.

---

## 10. Pendências antes de divulgar

- [ ] Adicionar o **currículo em PDF** ([veja como](#currículo-em-pdf-opcional)).
- [x] Capturas do Nardelli Barber em `public/projects/nardelli-barber/`: páginas públicas do site no ar (início, agendamento e celular) e painel administrativo de uma cópia local com dados fictícios. Ao trocar ou adicionar capturas do painel, use sempre dados fictícios, nunca o painel real.
- [ ] Ler o site inteiro uma vez e ajustar qualquer frase que não soe como você.
- [ ] Publicar no GitHub Pages ([seção 7](#7-publicação-gratuita-no-github-pages)) e colocar o link no LinkedIn e no perfil do GitHub.
- [ ] Ao mudar de semestre, atualizar "6º semestre" nos arquivos de conteúdo.
