import rss from '@astrojs/rss';
import { company } from '../data/site';
import { getPublishedPosts, postUrl } from '../lib/blog';

export async function GET() {
  const posts = await getPublishedPosts();
  return rss({
    title: `${company.name} Blog`,
    description: 'Notes on small software projects, volunteer technology work, and what we learn along the way.',
    site: `https://${company.domain}`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: postUrl(post.id),
    })),
    customData: '<language>en-us</language>',
  });
}
