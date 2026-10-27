// Formação acadêmica, cursos e idiomas. Datas só aparecem quando foram informadas.

export const education = {
  degree: {
    title: 'Ciência da Computação',
    institution: 'FAM',
    status: 'Em andamento · 6º semestre · noturno',
    expected: 'Conclusão prevista para dezembro de 2027',
  },

  courses: [
    {
      title: 'The Web Developer Bootcamp',
      provider: 'Colt Steele · Udemy',
      period: 'em andamento',
      note: 'Desenvolvimento web completo: HTML, CSS, JavaScript, Node.js, Express e MongoDB.',
    },
    {
      title: 'HTML5 e CSS3',
      provider: 'Curso em Vídeo',
      note: 'Fundamentos de marcação e estilização de páginas.',
    },
    {
      title: 'Estudos práticos',
      provider: 'Por conta própria',
      note: 'React, Tailwind CSS, Node.js, Express e MongoDB, aplicados em exercícios e projetos.',
    },
  ],

  languages: [
    {
      title: 'Inglês',
      provider: 'Cultura Inglesa',
      period: 'jan. 2016 — dez. 2022',
      note: 'Fluente. Comecei aos 10 anos e estudei por sete anos. Hoje uso o inglês no dia a dia: leio documentação técnica, acompanho conteúdo de tecnologia e ouço podcasts.',
    },
    {
      title: 'Português',
      note: 'Língua nativa.',
    },
  ],
};
