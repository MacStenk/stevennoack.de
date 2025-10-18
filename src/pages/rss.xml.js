import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  
  return rss({
    title: 'Steven Noack Blog',
    description: 'Gedanken über Technologie, akustische Architektur und digitale Souveränität',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      author: post.data.author || 'Steven Noack',
      categories: post.data.tags || [],
    })),
    customData: `<language>de-DE</language>`,
  });
}