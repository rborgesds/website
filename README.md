# website

Personal site — plain HTML/CSS with a dependency-free Node build script.

## Structure

- `site.data.js` — bio, projects, work history, links, SEO copy. Edit this for content changes.
- `public/` — `style.css`, `resume.pdf`, `og-image.png`, copied as-is into the build.
- `build.js` — generates `dist/index.html` and `dist/blog.html`, fetching the Substack
  RSS feed at build time (falls back to "posts coming soon" if the feed is unreachable).
- `serve.js` — zero-dependency static server for local preview.

No npm dependencies, no framework, no bundler — just Node's built-ins (`fetch`, `fs`, `http`).

## Commands

```
node build.js   # build the site into dist/
node serve.js   # serve dist/ at http://localhost:8080
```

## Deployment

`.github/workflows/deploy.yml` builds the site and deploys `dist/` to Cloudflare Pages
on every push to `main`, and once a day via cron so the blog page picks up new posts.
Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repo secrets.
