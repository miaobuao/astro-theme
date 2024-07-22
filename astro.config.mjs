import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import playformCompress from '@playform/compress'
import remarkGithubAdmonitionsToDirectives from 'remark-github-admonitions-to-directives'
import remarkDirective from 'remark-directive'
import remarkMath from 'remark-math'
// import rehypeComponents from 'rehype-components'
// import rehypeAutoLinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
// import rehypeMathjax from 'rehype-mathjax'
import rehypeSlug from 'rehype-slug'

import preact from '@astrojs/preact'
import config from './src/consts'

// https://astro.build/config
export default defineConfig({
  site: config.site.url,
  vite: {
    assetsInclude: ['**/*.zip'],
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  markdown: {
    remarkPlugins: [remarkDirective, remarkGithubAdmonitionsToDirectives, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      [rehypeKatex, { output: 'mathml' }],
      // rehypeMathjax,
      // rehypeAutoLinkHeadings,
      // rehypeComponents,
    ],
  },
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
    preact({ compat: true }),
    playformCompress({
      CSS: true,
      HTML: true,
      JavaScript: true,
      SVG: true,
    }),
  ],
})
