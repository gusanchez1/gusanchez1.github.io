// Tecnologias por categoria. Sem porcentagens: cada item tem um status e uma descrição curta.
//
// status:
//   'practiced' = uso na prática, em projetos e exercícios
//   'studying'  = estou estudando e aplicando em projetos
// Quando ganhar mais prática em algo, basta trocar o status e a descrição.

export const skillStatus = {
  practiced: { label: 'Experiência prática', description: 'uso em projetos e exercícios' },
  studying: { label: 'Em aprendizado', description: 'estudando e aplicando em projetos' },
};

export const skillGroups = [
  {
    title: 'Front-end',
    items: [
      { name: 'HTML5', status: 'practiced', note: 'Estrutura semântica de páginas e formulários.' },
      { name: 'CSS3', status: 'practiced', note: 'Layouts responsivos com Flexbox e media queries.' },
      { name: 'JavaScript', status: 'practiced', note: 'Manipulação do DOM, eventos, funções assíncronas e consumo de APIs.' },
      { name: 'Bootstrap', status: 'practiced', note: 'Grid, componentes e utilitários para interfaces responsivas.' },
      { name: 'React', status: 'studying', note: 'Componentes, props, state e hooks, em projetos criados com Vite.' },
      { name: 'Tailwind CSS', status: 'studying', note: 'Estilização com classes utilitárias; usado no Nardelli Barber.' },
    ],
  },
  {
    title: 'Back-end',
    items: [
      { name: 'Node.js', status: 'practiced', note: 'Servidores e APIs em JavaScript; base do back-end do Nardelli Barber.' },
      { name: 'Express.js', status: 'practiced', note: 'Rotas, middlewares e APIs REST.' },
      { name: 'EJS', status: 'practiced', note: 'Páginas renderizadas no servidor, com templates EJS e Express.' },
    ],
  },
  {
    title: 'Banco de dados',
    items: [
      { name: 'MongoDB e Mongoose', status: 'practiced', note: 'Modelagem de documentos, schemas, validações e consultas.' },
    ],
  },
  {
    title: 'Ferramentas',
    items: [
      { name: 'Git e GitHub', status: 'practiced', note: 'Versionamento de código e hospedagem de repositórios.' },
      { name: 'VS Code', status: 'practiced', note: 'Ambiente de desenvolvimento, com terminal e extensões integrados.' },
      { name: 'Vite', status: 'studying', note: 'Ambiente de desenvolvimento e build dos projetos React.' },
      { name: 'Claude Code', status: 'practiced', note: 'Desenvolvimento assistido por IA, com revisão e testes do código gerado.' },
      { name: 'Excel, Word, PowerPoint e Outlook', status: 'practiced', note: 'Relatórios gerenciais, planilhas, documentos e e-mails, em uso diário por mais de quatro anos.' },
    ],
  },
];
