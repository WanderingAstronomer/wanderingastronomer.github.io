import rss from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'Wandering Astronomer',
    description: 'Writing now lives on Substack.',
    site: context.site,
    items: [{
      title: 'Writing moved to Substack',
      pubDate: new Date('2026-05-27T00:00:00Z'),
      description: 'New writing is published on Substack instead of this site.',
      link: 'https://wanderingastronomer.substack.com/',
    }],
    customData: `<language>en-us</language>`,
  });
}
