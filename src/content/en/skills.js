// Skills by category (English). Same structure as ../pt-BR/skills.js.
//
// status:
//   'practiced' = hands-on experience, in projects and exercises
//   'studying'  = currently learning and applying in projects

export const skillStatus = {
  practiced: { label: 'Hands-on experience', description: 'used in projects and exercises' },
  studying: { label: 'Learning', description: 'studying and applying in projects' },
};

export const skillGroups = [
  {
    title: 'Front end',
    items: [
      { name: 'HTML5', status: 'practiced', note: 'Semantic page structure and forms.' },
      { name: 'CSS3', status: 'practiced', note: 'Responsive layouts with Flexbox and media queries.' },
      { name: 'JavaScript', status: 'practiced', note: 'DOM manipulation, events, asynchronous functions and consuming APIs.' },
      { name: 'Bootstrap', status: 'practiced', note: 'Grid, components and utilities for responsive interfaces.' },
      { name: 'React', status: 'studying', note: 'Components, props, state and hooks, in projects built with Vite.' },
      { name: 'Tailwind CSS', status: 'studying', note: 'Utility-first styling; used in Nardelli Barber.' },
    ],
  },
  {
    title: 'Back end',
    items: [
      { name: 'Node.js', status: 'studying', note: 'Servers and APIs in JavaScript; the back end of Nardelli Barber.' },
      { name: 'Express.js', status: 'studying', note: 'Routes, middleware and REST APIs.' },
    ],
  },
  {
    title: 'Databases',
    items: [
      { name: 'MongoDB and Mongoose', status: 'studying', note: 'Document modeling, schemas, validation and queries.' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'Git and GitHub', status: 'practiced', note: 'Version control and repository hosting.' },
      { name: 'VS Code', status: 'practiced', note: 'Development environment, with built-in terminal and extensions.' },
      { name: 'Claude Code', status: 'practiced', note: 'AI-assisted development, reviewing and testing the generated code.' },
      { name: 'Excel, Word, PowerPoint and Outlook', status: 'practiced', note: 'Management reports, spreadsheets, documents and email, used daily for more than four years.' },
    ],
  },
];
