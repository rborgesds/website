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
  // One-liner about the role. Omit to show just the title/company/date.
  description?: string;
}

export interface ContactLink {
  label: string;
  href: string;
}

export const site = {
  name: "Rodrigo Santos",

  // Swap for a real photo: put the image in /public and set photoSrc,
  // e.g. photoSrc: '/you.jpg'. Leave null to keep the placeholder circle.
  photoSrc: null as string | null,
  photoAlt: "Rodrigo",

  intro: [
    "Hey, I'm Rodrigo. Software engineer based in Sydney, originally from Brazil.",
    "I got into this when I was around 11, running private Tibia and Ragnarok servers from my bedroom. Setting up databases, scripting game logic, building websites, managing servers. At some point the Ragnarok server got popular enough that I was making money from it, which convinced my mum I was some kind of computer genius.",
    "Twenty years later I'm still doing roughly the same thing, just at a different scale.",
    'I care a lot about privacy, not as a feature but as a default. Big companies sitting on mountains of our data makes me uneasy, so I try to build software that doesn\'t do that. Right now that means <a href="https://usedrop.co" target="_blank">Drop</a>, a file-sharing app that encrypts everything in your browser before it ever leaves your device.',
    "These days I mostly work alongside AI coding agents and I'm genuinely curious how far that workflow goes.",
  ],

  // Rendered with the muted/secondary color.
  introMuted:
    "Outside of code I bartend on weekends and cook things that take longer than they should.",

  // Rendered after the muted paragraph, normal color.
  introClosing:
    'Open to senior engineering roles and freelance work. <a href="mailto:santos.rodri@proton.me">Reach out</a> if something fits.',

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
      description:
        "Proptech startup scaling flexible housing across Brazil — engineered the entire microservices backend and production cloud infrastructure from scratch, including the payment and subscription system powering every booking on the platform.",
    },
    {
      title: "Mid Software Engineer",
      company: "Magazine Luiza",
      when: "2019-2020",
      description:
        "One of Brazil's largest retailers — maintained the API gateway and catalogue APIs processing millions of daily requests across multiple product squads.",
    },
    {
      title: "Mid Software Engineer",
      company: "WTT",
      when: "2018-2019",
      description:
        "Medical imaging software company — led a full redesign of a legacy system, rebuilding the architecture from scratch and mentoring a team of 4.",
    },
    {
      title: "Full-stack Software Engineer",
      company: "Betalabs",
      when: "2015-2018",
      description:
        "SaaS platform for ecommerce — built REST APIs, payment gateway and marketplace integrations, and helped rebuild the company's core product end-to-end.",
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
    defaultTitle: "Rodrigo Santos — Software Engineer",
    defaultDescription:
      "Rodrigo is a software engineer based in Sydney, building privacy-first software and writing about code.",
    // Placeholder — replace with a real 1200x630 image in /public.
    ogImage: "/og-image.png",
  },
};
