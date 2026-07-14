import { XMLParser } from 'fast-xml-parser';

export interface Post {
  title: string;
  link: string;
  date: Date;
}

const parser = new XMLParser({ ignoreAttributes: false });

/**
 * Fetches and parses an RSS feed at build time.
 * Returns an empty array (rather than throwing) on any network,
 * HTTP, or parse failure so the build never breaks on a flaky feed.
 */
export async function getPosts(feedUrl: string): Promise<Post[]> {
  try {
    const res = await fetch(feedUrl);
    if (!res.ok) return [];

    const xml = await res.text();
    const parsed = parser.parse(xml);

    const rawItems = parsed?.rss?.channel?.item;
    if (!rawItems) return [];

    const items = Array.isArray(rawItems) ? rawItems : [rawItems];

    const posts: Post[] = items
      .map((item): Post | null => {
        const title = typeof item.title === 'string' ? item.title : item.title?.['#text'];
        const link = typeof item.link === 'string' ? item.link : item.link?.['#text'];
        const pubDate = item.pubDate;
        if (!title || !link || !pubDate) return null;

        const date = new Date(pubDate);
        if (Number.isNaN(date.getTime())) return null;

        return { title, link, date };
      })
      .filter((post): post is Post => post !== null);

    posts.sort((a, b) => b.date.getTime() - a.date.getTime());

    return posts;
  } catch {
    return [];
  }
}
