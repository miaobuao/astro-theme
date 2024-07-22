import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import config from '../consts'

export async function GET(context) {
  const posts = await getCollection('blog')
  return rss({
    title: config.site.title,
    description: config.site.description,
    site: context.site,
    items: posts.map(post => ({
      description: '',
      title: '',
      pubDate: new Date(),
      updatedDate: new Date(),
      ...post.data,
      link: `/blog/${post.slug}/`,
    })),
  })
}
