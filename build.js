// Static site build script. Zero npm dependencies — only Node built-ins.
// Run with: node build.js

const fs = require('fs');
const path = require('path');
const site = require('./site.data.js');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function decodeEntities(str) {
  return String(str)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

function stripCdata(str) {
  const match = str.match(/^\s*<!\[CDATA\[([\s\S]*)\]\]>\s*$/);
  return (match ? match[1] : str).trim();
}

function extractTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match ? stripCdata(match[1]) : null;
}

// Fetches and parses an RSS feed at build time via a small regex-based
// parser (no XML library dependency). Returns [] on any network, HTTP,
// or parse failure so the build never breaks on a flaky feed.
async function fetchPosts(feedUrl) {
  try {
    const res = await fetch(feedUrl);
    if (!res.ok) return [];

    const xml = await res.text();
    const itemBlocks = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);

    const posts = itemBlocks
      .map((block) => {
        const title = extractTag(block, 'title');
        const link = extractTag(block, 'link');
        const pubDate = extractTag(block, 'pubDate');
        if (!title || !link || !pubDate) return null;

        const date = new Date(pubDate);
        if (Number.isNaN(date.getTime())) return null;

        return { title: decodeEntities(title), link: decodeEntities(link), date };
      })
      .filter(Boolean);

    posts.sort((a, b) => b.date.getTime() - a.date.getTime());
    return posts;
  } catch {
    return [];
  }
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function layout({ title, description, ogImage, url, bodyClass, body }) {
  const ogImageUrl = `${site.seo.siteUrl}${ogImage}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:image" content="${ogImageUrl}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${ogImageUrl}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css">
</head>
<body class="${bodyClass}">
<div class="wrap">
${body}
</div>
</body>
</html>
`;
}

function renderIndexPage() {
  const introHtml = site.intro.map((p) => `  <p>${p}</p>`).join('\n');

  const projectsHtml = site.projects
    .map(
      (p) => `  <div class="work-line">
    <a href="${p.url}">${escapeHtml(p.name)}</a> — ${escapeHtml(p.description)}
    <div class="stack">${escapeHtml(p.stack)}</div>
  </div>`
    )
    .join('\n');

  const rolesHtml = site.workHistory
    .map(
      (r) => `  <div class="role-line">
    ${escapeHtml(r.title)}, ${escapeHtml(r.company)} <span class="when">— ${escapeHtml(r.when)}</span>
  </div>`
    )
    .join('\n');

  const linksHtml = site.contactLinks
    .map((l) => `    <a href="${l.href}">${escapeHtml(l.label)}</a>`)
    .join('\n');

  const photoHtml = site.photoSrc
    ? `<img src="${site.photoSrc}" alt="${escapeHtml(site.photoAlt)}">`
    : '';

  const body = `  <nav class="topnav">
    <a href="/blog">Blog</a>
  </nav>

  <header>
    <div class="photo">
      <!-- swap for a real photo: set \`photoSrc\` in site.data.js -->
      ${photoHtml}
    </div>
    <h1>${escapeHtml(site.name)}</h1>
  </header>

${introHtml}

  <p class="muted">${site.introMuted}</p>

  <p>${site.introClosing}</p>

  <hr>

  <h2>Some things I've built</h2>

${projectsHtml}

  <hr>

  <h2>Where I've worked</h2>

${rolesHtml}
  <p style="margin-top:16px;"><a href="${site.resumeHref}" download>Full résumé (PDF)</a></p>

  <hr>

  <div class="links">
${linksHtml}
  </div>

  <footer>${site.footer.tagline}<br>${site.footer.copyright}</footer>`;

  return layout({
    title: site.seo.defaultTitle,
    description: site.seo.defaultDescription,
    ogImage: site.seo.ogImage,
    url: `${site.seo.siteUrl}/`,
    bodyClass: 'page-home',
    body,
  });
}

function renderBlogPage(posts) {
  const listHtml =
    posts.length > 0
      ? `  <div class="post-list">\n${posts
          .map(
            (post) => `    <div class="post-row">
      <div class="post-date">${formatDate(post.date)}</div>
      <div class="post-title"><a href="${post.link}" target="_blank" rel="noopener">${escapeHtml(post.title)}</a></div>
    </div>`
          )
          .join('\n')}\n  </div>`
      : `  <p class="muted">${escapeHtml(site.blog.emptyState)}</p>`;

  const body = `  <nav class="topnav">
    <a href="/">Home</a>
  </nav>

  <h1>Blog</h1>
  <p class="intro">${site.blog.intro}</p>

${listHtml}

  <footer>${site.footer.tagline}<br>${site.footer.copyright}</footer>`;

  return layout({
    title: `Blog — ${site.name}`,
    description: site.seo.defaultDescription,
    ogImage: site.seo.ogImage,
    url: `${site.seo.siteUrl}/blog`,
    bodyClass: 'page-blog',
    body,
  });
}

async function build() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  for (const file of fs.readdirSync(PUBLIC)) {
    fs.copyFileSync(path.join(PUBLIC, file), path.join(DIST, file));
  }

  const posts = await fetchPosts(site.blog.feedUrl);

  fs.writeFileSync(path.join(DIST, 'index.html'), renderIndexPage());
  fs.writeFileSync(path.join(DIST, 'blog.html'), renderBlogPage(posts));

  console.log(`Built dist/ with ${posts.length} post(s) from ${site.blog.feedUrl}`);
}

build();
