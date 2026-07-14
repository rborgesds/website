// Edit this file to update your bio, projects, work history, and links.
// No markup changes needed for routine content updates.

export interface Project {
  name: string;
  url: string;
  description: string;
  stack: string;
}

export interface Role {
  title: string;
  company: string;
  when: string;
}

export interface ContactLink {
  label: string;
  href: string;
}

export const site = {
  name: 'Rodrigo',

  // Swap for a real photo: put the image in /public and set photoSrc,
  // e.g. photoSrc: '/you.jpg'. Leave null to keep the placeholder circle.
  photoSrc: null as string | null,
  photoAlt: 'Rodrigo',

  intro: [
    "Hey, I'm Rodrigo — a software engineer based in Sydney, originally from Brazil. I've spent 7+ years writing backend and full-stack software.",
    'Right now I\'m building <a href="#">Drop</a>, a privacy-first file-sharing app, mostly working alongside AI coding agents to see how far that workflow actually goes.',
  ],

  // Rendered with the muted/secondary color.
  introMuted:
    'Outside of code I bartend on weekends and cook things that take longer than they should. Always mid-way through learning something new.',

  // Rendered after the muted paragraph, normal color.
  introClosing:
    'Open to senior engineering roles and freelance work — <a href="mailto:hello@rodrigo.dev">reach out</a> if something fits.',

  projects: [
    {
      name: 'Drop',
      url: '#',
      description: 'privacy-first file sharing, built solo end to end.',
      stack: 'Bun, Hono, React, PostgreSQL',
    },
    {
      name: '[Project name]',
      url: '#',
      description: 'one line on what it does.',
      stack: 'Stack',
    },
    {
      name: '[Project name]',
      url: '#',
      description: 'one line on what it does.',
      stack: 'Stack',
    },
  ] satisfies Project[],

  workHistory: [
    { title: 'Senior Software Engineer', company: '[Company]', when: '2022–now' },
    { title: 'Software Engineer', company: '[Company]', when: '2019–2022' },
    { title: 'Software Engineer', company: '[Company]', when: '2017–2019' },
  ] satisfies Role[],

  // Placeholder PDF lives at /public/resume.pdf — replace with your real résumé.
  resumeHref: '/resume.pdf',

  contactLinks: [
    { label: 'Email', href: 'mailto:hello@rodrigo.dev' },
    { label: 'GitHub', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ] satisfies ContactLink[],

  footer: {
    tagline: 'Built with a monospace font and too much coffee.',
    copyright: '© 2026 Rodrigo',
  },

  blog: {
    feedUrl: 'https://rodrigo.substack.com/feed',
    substackUrl: 'https://rodrigo.substack.com',
    intro:
      'Notes on code, side projects, and whatever else I\'m figuring out. Full posts live on <a href="https://rodrigo.substack.com" target="_blank" rel="noopener">Substack</a>.',
    emptyState: 'Posts coming soon.',
  },

  seo: {
    defaultTitle: 'Rodrigo — Software Engineer',
    defaultDescription:
      'Rodrigo is a software engineer based in Sydney, building privacy-first software and writing about code.',
    // Placeholder — replace with a real 1200x630 image in /public.
    ogImage: '/og-image.png',
  },
};
