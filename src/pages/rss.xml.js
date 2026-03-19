import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });
  
  // Sort posts by date descending
  blog.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Wandering Astronomer',
    description: 'A personal website and blog by Andrew Brown',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      // Map the frontmatter to RSS fields
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
