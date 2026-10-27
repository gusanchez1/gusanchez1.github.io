// Projects (English). Same structure as ../pt-BR/projects.js: each item becomes a full case study.
// Links, image files and sizes must match the Portuguese version (the tests check this).

export const projects = [
  {
    // Also the project's anchor on the page: #nardelli-barber
    id: 'nardelli-barber',
    name: 'Nardelli Barber',
    tagline: 'Website with online booking and an admin dashboard for barber Daniel Nardelli, in São Paulo’s East Zone.',

    status: { label: 'Live', detail: 'used every day by the barber' },
    meta: [
      { label: 'Type', value: 'Freelance · full-stack web app (MERN)' },
      { label: 'Year', value: '2026' },
      { label: 'Tests', value: '37 automated tests' },
      { label: 'Process', value: 'Built with AI assistance (Claude Code)' },
    ],

    demoUrl: 'https://nardellibarber.onrender.com/',
    demoLabel: 'View live site',
    repoUrl: null,
    linksNote:
      'This is the real, live system (in Portuguese): please don’t make test bookings. The code is private because it’s a client project, but I’m happy to walk through it in an interview.',

    // Taken on 2026-10-27. The first three come from the live site (public pages, no bookings created);
    // the dashboard ones come from a local copy with sample data.
    images: [
      {
        src: 'projects/nardelli-barber/nardelli-inicio.webp',
        alt: 'Nardelli Barber home page: welcome headline, buttons to book and to message the barber, logo, and a strip with opening hours, address and WhatsApp',
        caption: 'Home page (in Portuguese)',
        width: 1600,
        height: 1000,
      },
      {
        src: 'projects/nardelli-barber/nardelli-agendamento.webp',
        alt: 'Booking step 2: calendar with the selected day, free time slots split into morning and afternoon, and a summary with service, date, duration and price',
        caption: 'Booking: only slots where the whole service fits are shown',
        width: 1160,
        height: 682,
      },
      {
        src: 'projects/nardelli-barber/nardelli-celular.webp',
        alt: 'Two phone screens of the site: the home page and the time slot picker, with a bottom bar showing the total and the Continue button',
        caption: 'Mobile version',
        width: 1160,
        height: 682,
      },
      {
        src: 'projects/nardelli-barber/nardelli-painel-inicio.webp',
        alt: 'Admin dashboard home with sample data: revenue for today, the week and the month, reminders, today’s schedule and shortcuts to inactive clients, recurring bookings and no-shows',
        caption: 'Dashboard: revenue and today’s schedule (sample data)',
        width: 1600,
        height: 941,
      },
      {
        src: 'projects/nardelli-barber/nardelli-painel-agenda.webp',
        alt: 'Weekly schedule in the dashboard with sample data: closed days marked, appointments by time slot and recurring bookings flagged with a repeat icon',
        caption: 'Dashboard: weekly schedule with recurring bookings (sample data)',
        width: 1600,
        height: 941,
      },
    ],

    problem: [
      'Daniel works inside a barbershop but keeps his own schedule and prices, and relied on a third-party booking service. The goal was to move everything he already used into a system of his own, plus the features he was missing: clients book online and only see slots that are actually free, while the barber manages his schedule, recurring clients, pricing and revenue from a dashboard built around his routine.',
    ],

    features: [
      {
        title: 'Public website',
        items: [
          'Pages for the barber’s profile, services and prices, past work, and contact with a map.',
          'Three-step booking: service and add-ons, date and time, client details.',
          'Only slots where the whole service fits are shown, with no clashes with lunch, time off or other clients.',
          'A private link lets clients view and cancel their own booking without logging in, up to a configurable deadline.',
          'Terms of use and privacy page explaining what data is collected and why.',
        ],
      },
      {
        title: 'Admin dashboard',
        items: [
          'Login with JWT and passwords hashed with bcrypt.',
          'Revenue for the day, week and month, separating completed from expected.',
          'Schedule by day, week, month or list, including squeeze-ins and after-hours appointments.',
          'Weekly, biweekly and monthly recurring bookings that generate upcoming appointments automatically.',
          'Special pricing periods, such as holidays, with percentage or fixed adjustments.',
          'Clients grouped by WhatsApp number, reminders before appointments and win-back invitations for clients who stopped coming, with ready-made messages.',
          'Reports comparing each period with the equivalent previous one.',
          'Email notification for every new booking made through the website.',
        ],
      },
    ],

    flow: [
      { title: 'Service', text: 'The client picks a service and add-ons. The price follows the price list in effect on the chosen date.' },
      { title: 'Date and time', text: 'The API calculates free slots from working hours, lunch, time off, existing appointments and recurring bookings.' },
      { title: 'Details', text: 'Name and WhatsApp number, validated in the browser and again by the API.' },
      { title: 'Confirmation', text: 'The booking is saved, the barber gets an email and the client receives a link to view or cancel it.' },
    ],

    // Architecture diagram. "connector" labels the link to the next layer.
    architecture: {
      layers: [
        {
          name: 'Front end',
          tech: 'React 19 + Vite',
          detail: 'Public website and /admin dashboard in a single SPA, with pages loaded on demand.',
          connector: 'HTTP · JSON',
        },
        {
          name: 'REST API',
          tech: 'Node.js + Express 5',
          detail: 'Public, authentication and dashboard routes. Thin controllers, business rules in services.',
          connector: 'Mongoose',
        },
        {
          name: 'Database',
          tech: 'MongoDB',
          detail: '7 collections: appointments, recurring series, services, special pricing, clients, settings and admin.',
        },
      ],
      integrations: [
        { name: 'Email', detail: 'Nodemailer over SMTP notifies every new booking.' },
        { name: 'WhatsApp', detail: 'wa.me links with ready-made messages, without the paid API.' },
      ],
    },

    decisions: [
      {
        title: 'No double bookings',
        text: 'Besides checking for overlaps before saving, a partial unique index in MongoDB stops two simultaneous requests from booking the same start time.',
      },
      {
        title: 'Dates without time zone surprises',
        text: 'Business dates and times are stored as text (YYYY-MM-DD and HH:mm) in São Paulo time, alongside the UTC instant. Server, database and browser always agree on what day it is.',
      },
      {
        title: 'Money in cents',
        text: 'Amounts are stored as integer cents, with no rounding errors. Each booking keeps a copy of its price, so later changes to the price list don’t affect what was already agreed.',
      },
      {
        title: 'Recurring bookings without duplicates',
        text: 'Upcoming occurrences become real appointments; later ones are calculated on the fly. A unique index per series and date prevents duplicates.',
      },
      {
        title: 'Every input is validated',
        text: 'Zod schemas validate all input and strip unknown fields, which prevents MongoDB operator injection. Routes are rate-limited and Helmet sets security headers.',
      },
      {
        title: 'Testable business rules',
        text: 'Availability, pricing, recurrence and reports are pure functions, kept apart from the database and tested with Node’s built-in test runner (node:test).',
      },
    ],

    process: [
      'A paid freelance project for my own barber. We started with Daniel walking me through the booking system he used: we listed what had to stay and the new features he wanted.',
      'I built it with Claude Code, an AI coding assistant, which wrote most of the code. My role was gathering requirements, steering the implementation step by step, reviewing parts of the code and testing every feature across different environments: my computer, my phone and Daniel’s phone.',
      'I made two versions: for the second, I redesigned the interface using a design skill in Claude Code and chose it as the final one. Daniel now uses the system every day, and it’s the project I use to study, hands-on, how a complete MERN application is organized.',
    ],

    learnings: [
      'Real business rules (schedules, pricing, recurrence) need more care than the screens.',
      'Separating routes, controllers, services and models makes each part easy to find and to test.',
      'Validating in the front end improves the experience; validating in the API is what protects the data.',
      'Dates and time zones deserve an explicit decision early on.',
    ],

    progress: {
      done: [
        'Public website with online booking',
        'Dashboard with schedule, recurring bookings, clients, special pricing and reports',
        'Client self-cancellation and email notifications',
        'Tests for availability, pricing and recurrence rules',
        'Deployed on Render and used every day by the barber',
      ],
      next: [
        'Custom domain (the site currently uses Render’s default address)',
        'Integration tests for the API routes',
      ],
      limitations: [
        'WhatsApp reminders need the dashboard open and a click: fully automatic sending would require the paid WhatsApp Business API.',
        'The admin dashboard is for the barber only, so there is no public demo of it.',
      ],
    },

    stack: [
      { group: 'Front end', items: ['React 19', 'Vite', 'React Router', 'TanStack Query', 'Tailwind CSS', 'Motion'] },
      { group: 'Back end', items: ['Node.js', 'Express 5', 'Zod', 'JWT', 'bcryptjs', 'Helmet', 'express-rate-limit', 'Nodemailer'] },
      { group: 'Database', items: ['MongoDB', 'Mongoose'] },
      { group: 'Testing', items: ['node:test'] },
    ],
  },
];
