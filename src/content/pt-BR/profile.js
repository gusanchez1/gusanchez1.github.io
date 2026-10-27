// Quem sou: apresentação do topo da página, foto, "Sobre mim", ficha rápida e trajetória profissional.

export const profile = {
  name: 'Gustavo Avelino Sanchez',
  // Versão curta, usada no menu
  shortName: 'Gustavo Sanchez',
  location: 'São Paulo, SP, Brasil',
  // Fuso usado no relógio do topo da página
  timeZone: 'America/Sao_Paulo',
  status: 'Disponível para estágio, trainee, vaga júnior e projetos freelance',

  // Foto em public/images/ (retrato 4:5). Com null, a página fica sem foto.
  photo: {
    src: 'images/gustavo-avelino-sanchez.webp', // 800 × 1000
    // Versão menor (400 × 500), baixada no celular. Opcional: sem ela, o site usa sempre a grande.
    srcSmall: 'images/gustavo-avelino-sanchez-400.webp',
    alt: 'Retrato de Gustavo Avelino Sanchez',
    width: 800,
    height: 1000,
  },

  hero: {
    intro: 'Estudante de Ciência da Computação e desenvolvedor web em formação.',
    description:
      'Estou no 6º semestre na FAM e desenvolvo aplicações web com JavaScript, React e Node.js. Como freelancer, criei um sistema de agendamento que um barbeiro de São Paulo usa no dia a dia.',
    // Chamada para o projeto em destaque (o link leva até ele)
    featured: {
      label: 'Projeto em destaque',
      text: 'Nardelli Barber: agendamento online e painel administrativo, em uso diário',
      projectId: 'nardelli-barber',
    },
  },

  about: [
    'Meu interesse por tecnologia começou cedo. Jogando Minecraft com os amigos, eu queria ir além do jogo: instalava e configurava mods, e usávamos redes virtuais, como o Hamachi, para jogar juntos como se estivéssemos na mesma rede local. Com o tempo vieram outros interesses, como montar e configurar computadores, os meus e os dos amigos. Foi essa vontade de entender e fazer as coisas funcionarem que me trouxe à programação.',
    'Comecei a trabalhar aos 16 anos, por iniciativa própria, como office boy na Fundação Faculdade de Medicina (FFM). Em pouco mais de quatro anos, fui promovido a auxiliar e depois a assistente administrativo no setor de Faturamento, onde cuidava de documentos, planilhas, e-mails e relatórios gerenciais e acompanhava as demandas do setor. Na última função, também ajudava a organizar e distribuir as atividades da equipe de apoio.',
    'Em paralelo, comecei Ciência da Computação na FAM, onde curso o 6º semestre no período noturno, e passei a estudar desenvolvimento web por conta própria, com foco em JavaScript, React, Node.js e MongoDB. Em 2026, desenvolvi como freelancer o sistema de agendamento do Nardelli Barber, que hoje o barbeiro usa no dia a dia. Usei IA como apoio e sigo estudando o código parte por parte: meu objetivo não é só fazer funcionar, mas entender e saber explicar cada escolha.',
    'Em agosto de 2026, encerrei meu ciclo na FFM para me dedicar integralmente à tecnologia. Procuro uma vaga de estágio, trainee ou desenvolvedor júnior em que eu possa aprender com um time experiente, levando comigo o que aprendi em mais de quatro anos de trabalho. Também sigo aberto a novos projetos freelance.',
  ],

  // Ficha rápida, na seção "Sobre mim"
  facts: [
    { label: 'Formação', value: 'Ciência da Computação · FAM · 6º semestre' },
    { label: 'Conclusão', value: 'Prevista para dezembro de 2027' },
    { label: 'Experiência', value: 'Mais de 4 anos em rotinas administrativas e um projeto freelance em produção' },
    { label: 'Horário', value: 'Aulas à noite; disponível durante o dia' },
    { label: 'Formato', value: 'Presencial, híbrido ou remoto, inclusive vagas no exterior' },
    { label: 'Idiomas', value: 'Português (nativo) · Inglês fluente (estudo desde os 10 anos)' },
    { label: 'Base', value: 'São Paulo, SP, Brasil' },
  ],

  // Trajetória no formato de uma linha de metrô: cada etapa é uma estação ("note" é opcional)
  career: {
    stops: [
      {
        title: 'Office Boy/Mensageiro',
        place: 'Fundação Faculdade de Medicina (FFM)',
        period: 'abr. 2022',
        note: 'Distribuição de documentos, correspondências e materiais entre os setores.',
      },
      {
        title: 'Auxiliar Administrativo',
        place: 'FFM · Faturamento',
        note: 'Documentos, planilhas, e-mails e acompanhamento de demandas.',
      },
      {
        title: 'Assistente Administrativo',
        place: 'FFM · Faturamento',
        period: 'até ago. 2026',
        note: 'Relatórios gerenciais e apoio à organização e distribuição das atividades da equipe.',
      },
      {
        title: 'Desenvolvedor web freelance',
        place: 'Nardelli Barber',
        period: '2026',
        note: 'Sistema de agendamento em uso diário pelo cliente.',
      },
    ],
    next: 'Estágio, trainee ou vaga júnior em desenvolvimento',
  },
};
