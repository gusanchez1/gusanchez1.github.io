// Who I am (English): hero, photo, "About me", quick facts and career path. Same structure as ../pt-BR/profile.js.

export const profile = {
  name: 'Gustavo Avelino Sanchez',
  // Short version, used in the menu
  shortName: 'Gustavo Sanchez',
  location: 'São Paulo, Brazil',
  // Time zone used by the clock at the top of the page
  timeZone: 'America/Sao_Paulo',
  status: 'Open to internships, trainee programs, junior roles and freelance projects',

  // Photo in public/images/ (4:5 portrait). With null, the page has no photo.
  photo: {
    src: 'images/gustavo-avelino-sanchez.webp', // 800 × 1000
    // Smaller version (400 × 500), downloaded on phones. Optional.
    srcSmall: 'images/gustavo-avelino-sanchez-400.webp',
    alt: 'Portrait of Gustavo Avelino Sanchez',
    width: 800,
    height: 1000,
  },

  hero: {
    intro: 'Computer Science student and aspiring web developer.',
    description:
      'I’m in my 6th semester at FAM and I build web applications with JavaScript, React and Node.js. As a freelancer, I built a booking system that a barber in São Paulo uses every day.',
    // Call to the featured project (the link scrolls to it)
    featured: {
      label: 'Featured project',
      text: 'Nardelli Barber: online booking and admin dashboard, used every day',
      projectId: 'nardelli-barber',
    },
  },

  about: [
    'My interest in technology started early. Playing Minecraft with friends, I wanted to go beyond the game: I installed and configured mods, and we used virtual networks like Hamachi to play together as if we were on the same local network. Over time other interests followed, like building and setting up computers, mine and my friends’. That drive to understand how things work, and to make them work, is what led me to programming.',
    'I started working at 16, on my own initiative, as an office messenger at the Fundação Faculdade de Medicina (FFM), a foundation linked to the University of São Paulo Medical School. In just over four years, I was promoted to administrative aide and then to administrative assistant in the Billing department, handling documents, spreadsheets, email and management reports, and tracking the department’s requests. In my last role, I also helped organize and assign tasks for the support team.',
    'Alongside work, I started a Computer Science degree at FAM, where I’m now in my 6th semester taking evening classes, and began studying web development on my own, focusing on JavaScript, React, Node.js and MongoDB. In 2026, I built the booking system for Nardelli Barber as a freelancer, and the barber now uses it every day. I used AI as support and I keep studying the code piece by piece: my goal isn’t just to make things work, but to understand and be able to explain every choice.',
    'In August 2026, I closed that chapter at FFM to dedicate myself fully to technology. I’m looking for an internship, trainee or junior developer role where I can learn from an experienced team, bringing with me what I learned in more than four years of work. I’m also open to new freelance projects.',
  ],

  // Quick facts, in the "About me" section
  facts: [
    { label: 'Education', value: 'Computer Science · FAM · 6th semester' },
    { label: 'Graduation', value: 'Expected December 2027' },
    { label: 'Experience', value: '4+ years in administrative roles and one freelance project in production' },
    { label: 'Schedule', value: 'Evening classes; available during the day' },
    { label: 'Work format', value: 'On-site, hybrid or remote, including international roles' },
    { label: 'Languages', value: 'Portuguese (native) · English (fluent, studying since age 10)' },
    { label: 'Based in', value: 'São Paulo, Brazil (UTC−3)' },
  ],

  // Career path drawn as a metro line: each step is a station ("note" is optional)
  career: {
    stops: [
      {
        title: 'Office Messenger',
        place: 'Fundação Faculdade de Medicina (FFM)',
        period: 'Apr 2022 – Dec 2023',
        note: 'Delivered documents, mail and supplies between departments.',
      },
      {
        title: 'Administrative Aide',
        place: 'FFM · Billing',
        period: 'Dec 2023 – Dec 2024',
        note: 'Documents, spreadsheets, email and request tracking.',
      },
      {
        title: 'Administrative Assistant',
        place: 'FFM · Billing',
        period: 'Dec 2024 – Aug 2026',
        note: 'Management reports and helping organize and assign the team’s tasks.',
      },
      {
        title: 'Freelance Web Developer',
        place: 'Nardelli Barber',
        period: 'Oct 2026',
        note: 'Booking system used every day by the client.',
      },
    ],
    next: 'Internship, trainee or junior developer role',
  },
};
