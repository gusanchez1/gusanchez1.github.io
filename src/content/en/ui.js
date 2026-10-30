// Interface texts (English). Same structure as ../pt-BR/ui.js.
// The order of `sections` is the menu order. `id` is the section anchor (e.g. #about).

export const ui = {
  skipLink: 'Skip to content',
  newTab: '(opens in a new tab)',
  menu: { open: 'Open menu', close: 'Close menu', label: 'Menu', nav: 'Main navigation' },
  // Link to the other language version (path relative to the site root)
  languageSwitch: { label: 'PT', name: 'Versão em português', href: '', hreflang: 'pt-BR' },

  hero: {
    id: 'top',
    primaryCta: 'Explore projects',
    contactCta: 'Contact',
    localTime: 'in São Paulo',
    scrollHint: 'Keep exploring',
  },

  sections: {
    about: {
      id: 'about',
      nav: 'About',
      eyebrow: 'About me',
      title: 'From office messenger to aspiring developer.',
    },
    skills: {
      id: 'skills',
      nav: 'Skills',
      eyebrow: 'Skills',
      title: 'What I already use in practice and what I’m deepening now.',
      lead: 'Instead of percentages, each technology shows my current level and how I use it.',
      legend: 'Legend',
    },
    projects: {
      id: 'projects',
      nav: 'Project',
      eyebrow: 'Featured project',
      title: 'One real project, explained in full.',
      lead: 'A system a client uses every day, with what works, what’s missing and how it was built.',
    },
    education: {
      id: 'education',
      nav: 'Education',
      eyebrow: 'Education and learning',
      title: 'University, courses and languages.',
    },
    contact: {
      id: 'contact',
      nav: 'Contact',
      eyebrow: 'Contact',
      title: 'Open to jobs and new projects.',
    },
  },

  about: {
    factsTitle: 'At a glance',
    careerTitle: 'Career path',
    nextStop: 'Next stop',
  },

  project: {
    problem: 'The problem',
    features: 'What the system does',
    flow: 'How booking works',
    architecture: 'Architecture',
    integrations: 'Integrations',
    gallery: 'Screens',
    decisions: 'Technical decisions',
    process: 'How it was built',
    learnings: 'Lessons learned',
    progress: 'Current status',
    done: 'Done',
    next: 'Next steps',
    limitations: 'Known limitations',
    stack: 'Technologies',
    demo: 'View demo',
    repo: 'View code on GitHub',
    contact: 'Get in touch',
  },

  education: {
    degree: 'Degree',
    courses: 'Web development',
    languages: 'Languages',
  },

  contact: {
    // Two paths: job opportunities and projects for businesses. Each button opens an email with the subject filled in.
    audiences: [
      {
        label: 'For recruiters',
        text: 'I’m looking for an internship, trainee or junior developer role. I can work on-site, hybrid or remotely, including for companies abroad. I take evening classes and I’m available during the day (São Paulo time, UTC−3).',
        cta: 'Talk about a role',
        subject: 'Job opportunity',
      },
      {
        label: 'For businesses',
        text: 'I also build custom websites and web systems for small businesses, like the Nardelli Barber booking system.',
        cta: 'Request a quote',
        subject: 'Project quote',
      },
    ],
    emailLabel: 'Email',
    emailSubject: 'Contact from your portfolio',
    copyEmail: 'Copy email',
    copied: 'Email copied',
    copyFailed: 'Couldn’t copy. Please select the address above.',
    linkedinHint: 'Career and education',
    githubHint: 'Code and studies',
    instagramPrefix: 'I’m also on Instagram:',
  },

  // Résumé buttons (hero and contact): one link per language, files listed in src/data/links.js
  resume: {
    label: 'Résumé',
    // Note in the contact section: the PDFs on the site have no phone number or address
    note: 'Website version, without phone number and address.',
    fullRequest: 'Request the full résumé',
    fullSubject: 'Full résumé request',
    languages: {
      'pt-BR': { short: 'PT', long: 'Portuguese', name: 'Download résumé in Portuguese (PDF)' },
      en: { short: 'EN', long: 'English', name: 'Download résumé in English (PDF)' },
    },
  },

  footer: {
    builtWith: 'Built with React and Vite.',
    backToTop: 'Back to top',
    email: 'Email',
  },
};
