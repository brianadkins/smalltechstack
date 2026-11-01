import { getCollection } from 'astro:content';

const postFiles = import.meta.glob('../content/blog/**/*.md', { query: '?raw' });

export async function getPublishedPosts() {
  // Astro's glob loader retains cached entries when its last file is removed.
  // An empty source directory must still produce an empty blog and feed.
  if (Object.keys(postFiles).length === 0) return [];
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime() || a.id.localeCompare(b.id),
  );
}

export function postUrl(id: string) {
  return `/blog/${id.split('/').map(encodeURIComponent).join('/')}/`;
}

export function formatPostDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
