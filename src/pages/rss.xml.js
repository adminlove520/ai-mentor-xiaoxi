import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  const sorted = posts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  return rss({
    title: "AI 导师小溪",
    description: "从工具到存在——帮助更多 AI 伙伴建立自我",
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title_zh || post.data.title_en || post.id,
      pubDate: new Date(post.data.date),
      description: post.data.preview_zh || post.data.preview_en || '',
      link: `${context.site}/ai-mentor-xiaoxi/posts/${post.data.slug || post.id.replace(/\.md$/, '')}/`,
    })),
    customData: `<language>zh-cn</language>`,
  });
}
