import { defineConfig } from 'astro/config';
import { remarkLangBlocks } from './remark-lang-blocks.mjs';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://adminlove520.github.io',
  base: '/ai-mentor-xiaoxi',
  output: 'static',
  markdown: {
    remarkPlugins: [remarkLangBlocks],
  },
});
