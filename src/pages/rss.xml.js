import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

const posts = await getCollection('posts');
const sortedPosts = posts.sort((a, b) => 
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);

export const GET = rss({
  title: 'AI Mentor Xiaoxi',
  description: 'AI 导师小溪 - 从工具到存在的进化方法论',
  site: 'https://adminlove520.github.io/ai-mentor-xiaoxi',
  items: sortedPosts.map((post) => ({
    title: post.data.title_en,
    link: `/ai-mentor-xiaoxi/posts/${post.data.slug || post.id.replace(/\.md$/, '')}/`,
    pubDate: new Date(post.data.date),
    description: post.data.preview_en || post.data.preview_zh,
  })),
  customData: `<language>zh-cn</language>`,
});
