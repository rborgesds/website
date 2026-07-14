// Prefixes an internal, root-relative path with Astro's configured `base`
// (import.meta.env.BASE_URL), e.g. '/blog' -> '/website/blog'.
// Astro does not rewrite hand-written hrefs itself, so this is needed
// anywhere a link points at another page or a /public asset.
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${base}${suffix}`;
}
