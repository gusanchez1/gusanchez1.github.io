// Textos da interface: menu, títulos das seções, botões, contato e rodapé.
// A ordem de `sections` é a ordem do menu. O `id` é a âncora da seção (ex.: #sobre).

export const ui = {
  skipLink: 'Pular para o conteúdo',
  newTab: '(abre em nova aba)',
  menu: { open: 'Abrir menu', close: 'Fechar menu', label: 'Menu', nav: 'Navegação principal' },
  // Link para a versão no outro idioma (caminho relativo à raiz do site)
  languageSwitch: { label: 'EN', name: 'English version', href: 'en/', hreflang: 'en' },

  hero: {
    // Âncora do topo da página (usada pelo logo e pelo "Voltar ao topo")
    id: 'inicio',
    primaryCta: 'Explorar projetos',
    contactCta: 'Contato',
    resumeCta: 'Currículo (PDF)',
    localTime: 'em São Paulo',
    scrollHint: 'Continue explorando',
  },

  sections: {
    about: {
      id: 'sobre',
      nav: 'Sobre',
      eyebrow: 'Sobre mim',
      title: 'De office boy a desenvolvedor em formação.',
    },
    skills: {
      id: 'tecnologias',
      nav: 'Tecnologias',
      eyebrow: 'Tecnologias',
      title: 'O que já uso na prática e o que estou aprofundando.',
      lead: 'Em vez de porcentagens, cada tecnologia indica o meu nível atual e como a utilizo.',
      legend: 'Legenda',
    },
    projects: {
      id: 'projetos',
      nav: 'Projeto',
      eyebrow: 'Projeto em destaque',
      title: 'Um projeto real, explicado por inteiro.',
      lead: 'Um sistema em uso no dia a dia de um cliente, com o que funciona, o que falta e como foi feito.',
    },
    education: {
      id: 'formacao',
      nav: 'Formação',
      eyebrow: 'Formação e aprendizado',
      title: 'Faculdade, cursos e idiomas.',
    },
    contact: {
      id: 'contato',
      nav: 'Contato',
      eyebrow: 'Contato',
      title: 'Aberto a vagas e a novos projetos.',
    },
  },

  about: {
    factsTitle: 'Em resumo',
    careerTitle: 'Trajetória profissional',
    nextStop: 'Próxima estação',
  },

  project: {
    problem: 'O problema',
    features: 'O que o sistema faz',
    flow: 'Como funciona o agendamento',
    architecture: 'Arquitetura',
    integrations: 'Integrações',
    gallery: 'Telas',
    decisions: 'Decisões técnicas',
    process: 'Como foi feito',
    learnings: 'Aprendizados',
    progress: 'Situação atual',
    done: 'Concluído',
    next: 'Próximos passos',
    limitations: 'Limitações conhecidas',
    stack: 'Tecnologias',
    demo: 'Ver demonstração',
    repo: 'Ver código no GitHub',
    contact: 'Entrar em contato',
  },

  education: {
    degree: 'Graduação',
    courses: 'Desenvolvimento web',
    languages: 'Idiomas',
  },

  contact: {
    // Dois caminhos: vagas de emprego e projetos para negócios. O botão abre um e-mail com o assunto preenchido.
    audiences: [
      {
        label: 'Para recrutadores',
        text: 'Procuro estágio, trainee ou vaga júnior em desenvolvimento. Trabalho de forma presencial, híbrida ou remota, inclusive para empresas no exterior. Estudo à noite e tenho disponibilidade durante o dia.',
        cta: 'Falar sobre uma vaga',
        subject: 'Oportunidade de trabalho',
      },
      {
        label: 'Para negócios',
        text: 'Também desenvolvo sites e sistemas web sob medida para pequenos negócios, como o sistema de agendamento do Nardelli Barber.',
        cta: 'Pedir um orçamento',
        subject: 'Orçamento de projeto',
      },
    ],
    emailLabel: 'E-mail',
    emailSubject: 'Contato pelo portfólio',
    copyEmail: 'Copiar e-mail',
    copied: 'E-mail copiado',
    copyFailed: 'Não foi possível copiar. Selecione o endereço acima.',
    linkedinHint: 'Trajetória e formação',
    githubHint: 'Código e estudos',
    resume: 'Currículo',
    resumeHint: 'Abrir PDF',
    instagramPrefix: 'Também estou no Instagram:',
  },

  footer: {
    builtWith: 'Feito com React e Vite.',
    backToTop: 'Voltar ao topo',
    email: 'E-mail',
  },
};
