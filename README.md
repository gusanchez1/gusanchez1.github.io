# Portfólio · Gustavo Avelino Sanchez

Site pessoal de Gustavo Avelino Sanchez, estudante de Ciência da Computação (FAM) e desenvolvedor web em formação, em São Paulo.

- **Português:** https://gusanchez1.github.io/
- **Inglês:** https://gusanchez1.github.io/en/
- **Repositório:** https://github.com/gusanchez1/gusanchez1.github.io

É uma página única, em dois idiomas, feita com **React + Vite**, sem back-end, sem banco de dados e sem serviços pagos. Todo o conteúdo (textos, links, tecnologias, projetos e cursos) fica em arquivos de dados separados dos componentes, então dá para atualizar o site sem mexer no layout. A publicação é automática: cada `git push` testa, gera e publica o site no GitHub Pages.

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
9. [Versão em inglês](#9-versão-em-inglês)
10. [Situação e próximos passos](#10-situação-e-próximos-passos)

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

A versão em inglês fica em http://localhost:5173/en/. Para parar o servidor, use `Ctrl + C` no terminal.

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com recarregamento automático |
| `npm test` | Testa os arquivos de conteúdo nos dois idiomas (links, campos obrigatórios, imagens que existem, versões iguais) |
| `npm run build` | Gera a versão de produção na pasta `dist/` |
| `npm run preview` | Abre a versão de produção (`dist/`) em http://localhost:4173, igual à que vai para o ar |
| `npm run check` | Roda os testes e o build, nessa ordem |

Para ver o site no celular, na mesma rede Wi-Fi: `npm run dev -- --host` e abra o endereço "Network" que aparece no terminal. Se o Windows perguntar sobre o firewall, permita o Node.js em redes privadas.

### Fluxo para atualizar o site

1. `npm run dev` e confira as mudanças no navegador (e no celular, se quiser).
2. `npm test` para garantir que nada ficou quebrado.
3. Publique:

   ```bash
   git add .
   git commit -m "descreva o que mudou"
   git push
   ```

Em um ou dois minutos a versão nova está no ar. Para ver o que mudou antes do commit, use o painel **Source Control** do VS Code (`Ctrl + Shift + G`) ou `git status` e `git diff` no terminal.

---

## 3. Estrutura de pastas

A pasta no seu computador se chama `gusanchez-portfolio`; no GitHub, o repositório se chama `gusanchez1.github.io`.

```
gusanchez-portfolio/
├── index.html                  # página em português: título, descrição e metadados de SEO
├── en/index.html               # página em inglês (/en/): o mesmo, em inglês
├── vite.config.js              # caminho base, as duas páginas e as tags que dependem da URL final
├── public/                     # arquivos copiados como estão para o site
│   ├── images/                 # sua foto (800 px e versão de 400 px para o celular)
│   ├── projects/               # capturas de tela dos projetos
│   ├── favicon.svg             # ícone da aba
│   ├── apple-touch-icon.png    # ícone ao salvar o site na tela inicial do celular
│   ├── og-image.png            # prévia ao compartilhar o link em português (1200 × 630)
│   ├── og-image-en.png         # prévia ao compartilhar o link em inglês
│   └── robots.txt
├── scripts/                    # modelos usados para gerar as imagens de prévia
├── tests/content.test.js       # testes dos arquivos de conteúdo (nos dois idiomas)
├── .github/workflows/deploy.yml  # publicação automática no GitHub Pages
└── src/
    ├── data/links.js           # ← e-mail, GitHub, LinkedIn, Instagram, currículo (iguais nos dois idiomas)
    ├── content/
    │   ├── index.js            # escolhe o idioma pelo lang da página
    │   ├── pt-BR/              # ← TODOS os textos em português
    │   │   ├── profile.js      #   apresentação, foto, sobre mim, ficha rápida, trajetória
    │   │   ├── skills.js       #   tecnologias
    │   │   ├── projects.js     #   projetos
    │   │   ├── education.js    #   faculdade, cursos e idiomas
    │   │   └── ui.js           #   menu, títulos das seções, botões, contato, rodapé
    │   └── en/                 # ← os mesmos arquivos, em inglês
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

> **Dois idiomas:** cada texto existe em `src/content/pt-BR/` e em `src/content/en/`, com os mesmos nomes de arquivo e de campo. Ao mudar um texto, mude nos dois. Os caminhos abaixo apontam para o português; o equivalente em inglês fica no arquivo de mesmo nome dentro de `en/`. O `npm test` avisa se as versões ficarem diferentes (um item a mais, uma imagem trocada só de um lado etc.).

### Links e contato

Tudo em [src/data/links.js](src/data/links.js). O mesmo endereço é usado no topo, no contato, no rodapé e nos dados de SEO.

### Textos

| O quê | Arquivo |
| --- | --- |
| Status ("Disponível para estágio..."), apresentação do topo, foto | [src/content/pt-BR/profile.js](src/content/pt-BR/profile.js) |
| Texto "Sobre mim", ficha "Em resumo" e trajetória profissional (linha de metrô) | [src/content/pt-BR/profile.js](src/content/pt-BR/profile.js) |
| Títulos das seções, itens do menu, botões, rodapé | [src/content/pt-BR/ui.js](src/content/pt-BR/ui.js) |
| Contato: textos "Para recrutadores" e "Para negócios" e o assunto de cada e-mail | `contact.audiences` em [src/content/pt-BR/ui.js](src/content/pt-BR/ui.js) |
| Título e descrição para o Google e para prévias de link | [index.html](index.html) (português) e [en/index.html](en/index.html) (inglês) |

Ao avançar de semestre, atualize "6º semestre" em `pt-BR/profile.js` (aparece na apresentação, no texto "Sobre mim" e na ficha) e em `pt-BR/education.js`, e faça o mesmo com "6th semester" nos arquivos de mesmo nome em `en/`.

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

**Capturas de tela:** as atuais do Nardelli Barber estão em `public/projects/nardelli-barber/`. As três primeiras (início, agendamento e celular) foram feitas nas páginas públicas do site no ar, só navegando, sem criar nenhum agendamento. As duas do painel vieram de uma cópia local do sistema, com um banco temporário e dados fictícios (nomes inventados e telefones no formato (11) 90000-00xx), que foi apagada depois. Para trocar ou adicionar capturas:

1. Páginas públicas podem ser capturadas no site no ar, sem enviar formulários. Telas do painel, **só com dados fictícios**, rodando o projeto no computador com um banco separado do de produção, **nunca** no painel real do cliente. Também não mostre as fotos de clientes da página "Trabalhos": elas dependem de autorização de uso de imagem.
2. Capture as telas no navegador. No Chrome, use F12 → ícone de celular/tablet para escolher o tamanho, e o menu ⋮ → "Capture screenshot". Uma largura de 1600 px é suficiente.
3. Converta para **WebP** com boa compressão (por exemplo, em [squoosh.app](https://squoosh.app)), mirando menos de 200 KB por imagem.
4. Salve em `public/projects/nardelli-barber/` e liste em `images`, no `projects.js` **dos dois idiomas** (mesmo arquivo, com `alt` e `caption` traduzidos):

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

A primeira imagem aparece grande e as outras em pares, lado a lado. Para os pares ficarem alinhados, use o mesmo formato nas duas imagens de cada par (as atuais usam proporção de cerca de 1,7 : 1). Clicar numa imagem abre o arquivo em tamanho real numa nova aba. `width` e `height` são o tamanho real do arquivo: evitam que a página "pule" enquanto a imagem carrega. O teste confere se o arquivo existe e se tem `alt`.

Outras telas que poderiam entrar: confirmação do agendamento com o link de cancelamento, relatórios e horários fixos do painel.

### Formação

Em [src/content/pt-BR/education.js](src/content/pt-BR/education.js). Datas (`period`) só aparecem quando preenchidas.

### Currículo em PDF (opcional)

Coloque o arquivo em `public/` (ex.: `public/curriculo-gustavo-avelino-sanchez.pdf`) e informe o nome em `resume`, no [src/data/links.js](src/data/links.js):

```js
resume: 'curriculo-gustavo-avelino-sanchez.pdf',
```

Aparecem dois botões: "Currículo (PDF)" no topo da página e "Currículo · Abrir PDF" no contato. Os dois abrem o arquivo numa nova aba. Enquanto `resume` for `null`, eles ficam escondidos, para não existir um link que leva a uma página de erro. O `npm test` confere se o arquivo informado existe.

### Imagem de compartilhamento (Open Graph)

`public/og-image.png` (1200 × 630 px) é a prévia exibida quando o link é colado no LinkedIn, WhatsApp etc. A página em inglês usa `public/og-image-en.png`. Elas foram geradas a partir de [scripts/og-image.html](scripts/og-image.html) e [scripts/og-image-en.html](scripts/og-image-en.html); as instruções para gerar de novo estão no topo desses arquivos. Você também pode trocá-las por qualquer imagem 1200 × 630 com o mesmo nome.

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
- Todas as imagens têm texto alternativo descritivo, nos dois idiomas.
- O link de idioma (EN / PT) informa o idioma de destino (`hreflang` e `lang`) e tem um nome completo para leitores de tela.
- O status das tecnologias usa forma (cheio/vazado) **e** texto, não só cor.
- Com "Reduzir movimento" ativado no sistema, animações e rolagem suave são desligadas.
- Contraste de cores verificado (Lighthouse: sem erros de contraste).

**Desempenho:** fontes servidas pelo próprio site (o navegador baixa só o subconjunto latino, ~117 KB) e a foto em WebP com duas versões: o celular baixa a de 400 px (44 KB) e telas maiores a de 800 px (130 KB) quando precisam. O CSS tem cerca de 8 KB comprimido e o JavaScript cerca de 80 KB comprimido, quase todo do React.

**Resultado do Lighthouse** (versão de produção, 27/10/2026):

| | Desempenho | Acessibilidade | Boas práticas | SEO |
| --- | --- | --- | --- | --- |
| Português · desktop | 100 | 100 | 100 | 100 |
| Português · celular (4G simulado) | 96 | 100 | 100 | 100 |
| Inglês · desktop | 100 | 100 | 100 | 100 |
| Inglês · celular (4G simulado) | 95 | 100 | 100 | 100 |

**SEO:** cada página tem título, descrição, idioma (`pt-BR` ou `en`), Open Graph e dados estruturados `schema.org/Person` (com nome, cidade, perfis e tecnologias, montados a partir dos arquivos de conteúdo), além de `robots.txt`. As tags `hreflang` avisam aos buscadores que as duas páginas são traduções uma da outra. Isso ajuda os buscadores a entender o site, mas não garante posição em resultados de busca.

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

### Como está publicado

- **Repositório:** `gusanchez1/gusanchez1.github.io`, público, branch `main`. Por ter o nome no formato `usuario.github.io`, ele é o "site de usuário" do GitHub e fica na raiz do endereço: **https://gusanchez1.github.io/**.
- **Publicação:** o workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml) roda a cada `git push` na `main`. Ele instala as dependências, roda os testes, gera o build e publica. Se os testes falharem, nada é publicado e o site anterior continua no ar.
- **Acompanhar:** na aba **Actions** do repositório, cada publicação aparece como "Publicar no GitHub Pages". Verde significa no ar; vermelho mostra o erro. Para publicar de novo sem mudar nada, use **Run workflow**.
- **Configuração:** em **Settings → Pages**, a origem (Source) é **GitHub Actions**.
- **Outros sites:** os sites dos seus outros repositórios continuam funcionando em subpastas, como https://gusanchez1.github.io/faculdade/.

### Como o caminho do site é resolvido

O workflow pergunta ao GitHub onde o site está publicado (`actions/configure-pages`) e repassa ao build duas variáveis: `BASE_PATH` (hoje `/`) e `SITE_URL` (hoje `https://gusanchez1.github.io`). Elas definem o caminho dos arquivos e os endereços completos das tags de SEO. **Se o endereço mudar (por exemplo, com o domínio próprio), não é preciso mudar código:** basta publicar de novo.

> **Se um dia o site for para uma subpasta** (um repositório com outro nome, como `usuario.github.io/portfolio/`), também funciona sem mudar código. Para simular isso no computador, o Git Bash atrapalha (ele transforma `/portfolio/` num caminho do Windows); use o PowerShell: `$env:BASE_PATH='/portfolio/'; npm run build; Remove-Item Env:BASE_PATH`.

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

7. **Conferir:** abra `https://gusanchez.dev.br` e `https://gusanchez.dev.br/en/`, cole os links no LinkedIn para ver a prévia e atualize o endereço no seu perfil do LinkedIn, no GitHub e no currículo.

> Com GitHub Actions, o domínio fica salvo nas configurações do repositório. **Não** é necessário criar um arquivo `CNAME`.

> Como o repositório é o seu site de usuário, os sites dos outros repositórios passam a abrir pelo domínio novo também (ex.: `gusanchez1.github.io/faculdade/` → `gusanchez.dev.br/faculdade/`). O GitHub redireciona os endereços antigos sozinho.

---

## 9. Versão em inglês

O site tem duas páginas com o mesmo código:

| Idioma | Endereço | HTML | Textos |
| --- | --- | --- | --- |
| Português | `https://gusanchez1.github.io/` | [index.html](index.html) | [src/content/pt-BR/](src/content/pt-BR/) |
| Inglês | `https://gusanchez1.github.io/en/` | [en/index.html](en/index.html) | [src/content/en/](src/content/en/) |

**Como funciona:**

- Cada HTML define o idioma no `<html lang="...">`. O [src/content/index.js](src/content/index.js) lê esse atributo e entrega os textos do idioma certo aos componentes.
- O `vite.config.js` gera as duas páginas (`dist/index.html` e `dist/en/index.html`) e acrescenta a cada uma o link canônico, a imagem de prévia no idioma certo e as tags `hreflang`, que ligam uma versão à outra para os buscadores.
- O menu tem um link **EN** / **PT** para a outra versão. No celular, ele fica ao lado do botão Menu.
- As âncoras também são traduzidas: `#sobre`, `#projetos`… em português e `#about`, `#projects`… em inglês. São definidas em `sections` e `hero.id`, nos arquivos `ui.js`.
- Ter dois endereços, em vez de trocar o idioma só com JavaScript, é melhor para SEO: cada versão aparece na busca no idioma de quem procura.

**Cuidados ao editar:**

- Mude o texto nos **dois** idiomas. O `npm test` compara as versões e falha se uma tiver um item a mais, um campo faltando, ou um link, id ou caminho de imagem diferente.
- O título e a descrição que aparecem no Google ficam nos HTMLs: `index.html` (português) e `en/index.html` (inglês).
- Nomes de cursos e instituições (The Web Developer Bootcamp, Curso em Vídeo, Cultura Inglesa, FAM, Fundação Faculdade de Medicina) continuam no original. Na versão em inglês, alguns ganharam uma explicação curta, como "Curso em Vídeo (Brazilian online course)".
- O currículo em PDF é o mesmo nas duas páginas. Se um dia tiver um currículo em inglês, dá para separar o link por idioma.

**Para mandar a recrutadores de fora**, use direto o link `https://gusanchez1.github.io/en/` (ou `https://gusanchez.dev.br/en/`, quando tiver o domínio).

**Para adicionar um terceiro idioma:** crie a pasta em `src/content/` (ex.: `es/`), registre-a em `locales` no `src/content/index.js`, crie o HTML (ex.: `es/index.html`), acrescente a página em `pages` no `vite.config.js` e ajuste o link de idioma em `ui.languageSwitch`.

---

## 10. Situação e próximos passos

**Feito**

- [x] Site publicado no GitHub Pages, em português e em inglês ([seção 7](#7-publicação-gratuita-no-github-pages)).
- [x] Projeto Nardelli Barber descrito a partir do código e do relato do desenvolvimento, com link para o site no ar.
- [x] Capturas de tela do site e do painel (painel com dados fictícios).
- [x] Versão em inglês em `/en/` ([seção 9](#9-versão-em-inglês)).

**A fazer**

- [ ] Adicionar o **currículo em PDF** ([veja como](#currículo-em-pdf-opcional)). Para vagas no exterior, vale ter uma versão em inglês.
- [ ] Colocar os links no **LinkedIn** (campo "Site" e seção "Destaque"), no repositório (engrenagem ao lado de **About** → "Use your GitHub Pages website") e no perfil do GitHub. Se o LinkedIn mostrar uma prévia antiga, use o [Post Inspector](https://www.linkedin.com/post-inspector/).
- [ ] Manter cargos, datas e textos iguais no site, no LinkedIn e no currículo.
- [ ] Ler as duas versões do site uma vez e ajustar qualquer frase que não soe como você.

**De tempos em tempos**

- [ ] Ao mudar de semestre, atualizar "6º semestre" / "6th semester" nos arquivos de conteúdo dos dois idiomas.
- [ ] Quando ganhar prática em uma tecnologia, trocar o status dela de "Em aprendizado" para "Experiência prática" ([Tecnologias](#tecnologias)).
- [ ] Ao terminar um projeto em que você tenha participação suficiente para explicar o código, cadastrá-lo em `projects.js` ([Projetos](#projetos)).
- [ ] Quando comprar o domínio, seguir a [seção 8](#8-domínio-próprio-gusanchezdevbr-futuro).
