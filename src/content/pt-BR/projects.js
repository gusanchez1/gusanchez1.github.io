// Projetos exibidos na seção "Projetos". Cada item vira um estudo de caso completo na página.
// Para cadastrar um projeto novo, copie o objeto do Nardelli Barber, troque os textos e
// apague os blocos que não fizerem sentido (eles somem da página quando ficam vazios).
//
// As informações do Nardelli Barber vêm da análise do código do projeto
// (daniel-nardelli-barber-v2), feita em 27/10/2026, e do relato do Gustavo sobre o desenvolvimento.

export const projects = [
  {
    // Também é a âncora do projeto na página: #nardelli-barber
    id: 'nardelli-barber',
    name: 'Nardelli Barber',
    tagline: 'Site com agendamento online e painel administrativo para o barbeiro Daniel Nardelli, na Zona Leste de São Paulo.',

    status: { label: 'No ar', detail: 'em uso diário pelo barbeiro' },
    meta: [
      { label: 'Tipo', value: 'Freelance · aplicação web full-stack (MERN)' },
      { label: 'Ano', value: '2026' },
      { label: 'Testes', value: '37 testes automatizados' },
      { label: 'Processo', value: 'Desenvolvido com apoio de IA (Claude Code)' },
    ],

    // Deixe null enquanto não existir. O botão só aparece quando há um endereço.
    demoUrl: 'https://nardellibarber.onrender.com/',
    demoLabel: 'Ver site no ar',
    repoUrl: null,
    // Observação exibida junto aos links
    linksNote:
      'É o sistema em uso real: por favor, não faça agendamentos de teste. O código é privado por ser um projeto de cliente, mas posso apresentá-lo em uma entrevista.',

    // Capturas de tela reais. Coloque os arquivos em public/projects/nardelli-barber/ e liste aqui:
    // { src: 'projects/nardelli-barber/agenda.webp', alt: 'O que a tela mostra', caption: 'Legenda', width: 1600, height: 1000 }
    images: [],

    problem: [
      'O Daniel atende dentro de uma barbearia, mas com agenda e preços próprios, e dependia de um sistema de agendamento de terceiros. O objetivo foi levar para um sistema próprio tudo o que ele já usava, mais os recursos que faltavam: o cliente marca pelo site, vendo só horários realmente livres, e o barbeiro administra agenda, clientes fixos, preços e faturamento em um painel feito para a rotina dele.',
    ],

    features: [
      {
        title: 'Site público',
        items: [
          'Páginas de apresentação, serviços e preços, trabalhos realizados e contato com mapa.',
          'Agendamento em três passos: serviço e adicionais, data e horário, dados do cliente.',
          'Só aparecem horários em que o serviço inteiro cabe sem bater em almoço, bloqueios ou outros clientes.',
          'Link exclusivo para o cliente ver e cancelar o próprio horário, sem login, dentro de um prazo configurável.',
          'Página de termos de uso e privacidade explicando quais dados são coletados e para quê.',
        ],
      },
      {
        title: 'Painel administrativo',
        items: [
          'Acesso com login (JWT) e senha protegida com bcrypt.',
          'Faturamento do dia, da semana e do mês, separando o realizado do previsto.',
          'Agenda por dia, semana, mês ou lista, com encaixes e horários fora do expediente.',
          'Horários fixos semanais, quinzenais e mensais, que geram os próximos agendamentos automaticamente.',
          'Preços especiais por período, como feriados, com ajuste percentual ou valor fixo.',
          'Clientes agrupados pelo WhatsApp, lembretes antes do horário e convites para quem sumiu, com mensagem pronta.',
          'Relatórios que comparam cada período com o anterior equivalente.',
          'Aviso por e-mail a cada novo agendamento feito pelo site.',
        ],
      },
    ],

    flow: [
      { title: 'Serviço', text: 'O cliente escolhe o serviço e os adicionais. O preço segue a tabela vigente na data escolhida.' },
      { title: 'Data e horário', text: 'A API calcula os horários livres a partir do expediente, almoço, bloqueios, agendamentos e horários fixos.' },
      { title: 'Dados', text: 'Nome e WhatsApp, validados no navegador e de novo na API.' },
      { title: 'Confirmação', text: 'O horário é gravado, o barbeiro recebe um e-mail e o cliente ganha um link para ver ou cancelar.' },
    ],

    // Diagrama de arquitetura. "connector" é o rótulo da ligação com a camada seguinte.
    architecture: {
      layers: [
        {
          name: 'Front-end',
          tech: 'React 19 + Vite',
          detail: 'Site público e painel /admin na mesma SPA, com as páginas carregadas sob demanda.',
          connector: 'HTTP · JSON',
        },
        {
          name: 'API REST',
          tech: 'Node.js + Express 5',
          detail: 'Rotas públicas, de autenticação e do painel. Controllers finos, regras de negócio em services.',
          connector: 'Mongoose',
        },
        {
          name: 'Banco de dados',
          tech: 'MongoDB',
          detail: '7 coleções: agendamentos, horários fixos, serviços, preços especiais, clientes, configurações e administrador.',
        },
      ],
      integrations: [
        { name: 'E-mail', detail: 'Nodemailer via SMTP avisa cada novo agendamento.' },
        { name: 'WhatsApp', detail: 'Links wa.me com mensagem pronta, sem a API paga.' },
      ],
    },

    decisions: [
      {
        title: 'Sem dois clientes no mesmo horário',
        text: 'Além de checar sobreposição antes de gravar, um índice único parcial no MongoDB impede que duas requisições simultâneas reservem o mesmo início de atendimento.',
      },
      {
        title: 'Datas sem confusão de fuso horário',
        text: 'Datas e horários de negócio são gravados como texto (AAAA-MM-DD e HH:mm) no fuso de São Paulo, junto com o instante em UTC. Servidor, banco e navegador sempre concordam sobre "que dia é".',
      },
      {
        title: 'Dinheiro em centavos',
        text: 'Valores são inteiros em centavos, sem erro de arredondamento. Cada agendamento guarda uma cópia do preço: mudar a tabela depois não altera o que já foi combinado.',
      },
      {
        title: 'Horários fixos sem duplicatas',
        text: 'As próximas ocorrências viram agendamentos reais; as mais distantes são calculadas na hora. Um índice único por série e data impede ocorrências repetidas.',
      },
      {
        title: 'Toda entrada é validada',
        text: 'Schemas Zod validam todas as entradas e descartam campos desconhecidos, o que evita injeção de operadores do MongoDB. Há limite de requisições por rota e cabeçalhos de segurança com Helmet.',
      },
      {
        title: 'Regras de negócio testáveis',
        text: 'Disponibilidade, preços, recorrência e relatórios são funções puras, separadas do banco e testadas com o executor nativo do Node (node:test).',
      },
    ],

    process: [
      'Projeto freelance, pago, feito para o meu próprio barbeiro. Começamos com o Daniel me mostrando o sistema que ele usava: listamos o que precisava continuar existindo e os recursos novos que ele queria.',
      'Desenvolvi com o Claude Code, um assistente de programação com IA, que escreveu a maior parte do código. Meu papel foi levantar os requisitos, conduzir a implementação em etapas, revisar partes do código e testar cada funcionalidade em diferentes ambientes: no meu computador, no meu celular e no celular do Daniel.',
      'Fiz duas versões: na segunda, refiz a interface com uma skill de design no Claude Code e escolhi essa como definitiva. Hoje o Daniel usa o sistema no dia a dia, e ele é o projeto em que estudo, na prática, como uma aplicação MERN completa se organiza.',
    ],

    learnings: [
      'Regras de negócio reais (horários, preços, recorrência) pedem mais cuidado do que as telas.',
      'Separar rotas, controllers, services e models deixa cada parte fácil de encontrar e de testar.',
      'Validar no front-end melhora a experiência; validar na API é o que protege os dados.',
      'Datas e fusos horários merecem uma decisão explícita logo no início.',
    ],

    progress: {
      done: [
        'Site público com agendamento online',
        'Painel com agenda, horários fixos, clientes, preços especiais e relatórios',
        'Cancelamento pelo cliente e aviso por e-mail',
        'Testes das regras de disponibilidade, preço e recorrência',
        'Publicado no Render e em uso diário pelo barbeiro',
      ],
      next: [
        'Domínio próprio (hoje o site usa o endereço padrão do Render)',
        'Testes de integração das rotas da API',
      ],
      limitations: [
        'Lembretes por WhatsApp dependem do painel aberto e de um clique: o envio automático exigiria a API paga do WhatsApp Business.',
        'O painel administrativo é de uso exclusivo do barbeiro, por isso não há demonstração pública dele.',
      ],
    },

    stack: [
      { group: 'Front-end', items: ['React 19', 'Vite', 'React Router', 'TanStack Query', 'Tailwind CSS', 'Motion'] },
      { group: 'Back-end', items: ['Node.js', 'Express 5', 'Zod', 'JWT', 'bcryptjs', 'Helmet', 'express-rate-limit', 'Nodemailer'] },
      { group: 'Banco de dados', items: ['MongoDB', 'Mongoose'] },
      { group: 'Testes', items: ['node:test'] },
    ],
  },
];
