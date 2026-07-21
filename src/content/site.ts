// Edit this file to update your bio, projects, work history, and links.
// No markup changes needed for routine content updates.

export interface Project {
  name: string;
  // Omit `url` to render the project name as plain text (no link).
  url?: string;
  description: string;
  stack: string;
  // Set to true to show a "WIP" tag for projects still in progress.
  wip?: boolean;
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
  name: "Rodrigo",

  // Swap for a real photo: put the image in /public and set photoSrc,
  // e.g. photoSrc: '/you.jpg'. Leave null to keep the placeholder circle.
  photoSrc: null as string | null,
  photoAlt: "Rodrigo",

  intro: [
    "Hey, I'm Rodrigo — a software engineer based in Sydney, originally from Brazil. I've spent 7+ years writing backend and full-stack software.",
    'Right now I\'m building <a href="https://usedrop.co" target="_blank">Drop</a>, a privacy-first file-sharing app, mostly working alongside AI coding agents to see how far that workflow actually goes.',
  ],

  // Rendered with the muted/secondary color.
  introMuted:
    "Outside of code I bartend on weekends and cook things that take longer than they should. Always mid-way through learning something new.",

  // Rendered after the muted paragraph, normal color.
  introClosing:
    'Open to senior engineering roles and freelance work — <a href="mailto:santos.rodri@proton.me">reach out</a> if something fits.',

  projects: [
    {
      name: "Drop",
      url: "https://usedrop.co",
      description:
        "Temporary file sharing with end-to-end encryption. Files are encrypted in your browser before upload, shared via a short code or link, and automatically deleted after 24 hours — no account required.",
      stack: "Bun, Hono, React, SQLite, Drizzle ORM",
    },
    {
      name: "Role Pilot",
      // WIP — no link yet, rendered as plain text. Add `url` when it's live.
      description:
        "a privacy-first CLI that scores job postings against your profile using a deterministic heuristic plus LLM-assisted analysis, and exports a ranked apply-list to Obsidian.",
      stack: "Bun, TypeScript, CAC, Zod, LLM API ",
      wip: true,
    },
    {
      name: "Pathway OS",
      // WIP — no link yet, rendered as plain text. Add `url` when it's live.
      description:
        "a goal-first migration planning tool that recommends the best pathway to Australian PR based on a user's profile, with confidence scoring and timeline estimates.",
      stack:
        "Node.js, TypeScript, NestJS, PostgreSQL, Drizzle ORM, better-auth, Docker",
      wip: true,
    },
  ] satisfies Project[],

  workHistory: [
    {
      title: "Senior Software Engineer",
      company: "Housi",
      when: "2020-2022",
    },
    {
      title: "Mid Software Engineer",
      company: "Magazine Luiza",
      when: "2019-2020",
    },
    { title: "Mid Software Engineer", company: "WTT", when: "2018-2019" },
    {
      title: "Full-stack Software Engineer",
      company: "Betalabs",
      when: "2015-2018",
    },
  ] satisfies Role[],

  // Placeholder PDF lives at /public/resume.pdf — replace with your real résumé.
  resumeHref: "/rodrigo-santos-resume.pdf",

  contactLinks: [
    { label: "Email", href: "mailto:santos.rodri@proton.me" },
    { label: "GitHub", href: "https://github.com/rborgesds" },
    { label: "LinkedIn", href: "https://linkedin.com/in/rborgesds" },
  ] satisfies ContactLink[],

  footer: {
    tagline: "Crafted with ☕️",
    copyright: "© Rodrigo Santos",
  },

  blog: {
    feedUrl: "https://rborgesds.substack.com/feed",
    substackUrl: "https://rborgesds.substack.com",
    intro:
      'Notes on code, side projects, and whatever else I\'m figuring out. Full posts live on <a href="https://rborgesds.substack.com" target="_blank" rel="noopener">Substack</a>.',
    emptyState: "Posts coming soon.",
  },

  seo: {
    defaultTitle: "Rodrigo — Software Engineer",
    defaultDescription:
      "Rodrigo is a software engineer based in Sydney, building privacy-first software and writing about code.",
    // Placeholder — replace with a real 1200x630 image in /public.
    ogImage: "/og-image.png",
  },
};
