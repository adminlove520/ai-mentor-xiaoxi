import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro, d as addAttribute, m as maybeRenderHead } from '../../chunks/astro/server_BWCp8Abf.mjs';
import 'piccolore';
import { $ as $$BaseLayout, g as getCollection } from '../../chunks/_astro_content_D2tJWENC.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
async function getStaticPaths() {
  const allPosts = await getCollection("posts");
  allPosts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
  const isGuest = (p) => !!p.data.author;
  return allPosts.map((post) => {
    const siblings = allPosts.filter((p) => isGuest(p) === isGuest(post));
    const idx = siblings.indexOf(post);
    const prev = idx < siblings.length - 1 ? siblings[idx + 1] : null;
    const next = idx > 0 ? siblings[idx - 1] : null;
    const slugValue = post.data.slug || post.id.replace(/\.md$/, "");
    return {
      params: { slug: slugValue },
      props: { post, prev, next }
    };
  });
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { post, prev, next } = Astro2.props;
  const { Content } = await post.render();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${post.data.title_en} \u2014 Friday` }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<article class="post-detail"> <h2> <span class="lang-en">', '</span> <span class="lang-zh">', "</span> </h2> ", " <time>", "</time> ", ' </article> <nav class="post-nav"> ', " <a", ' class="nav-home"> <span class="lang-en">', '</span> <span class="lang-zh">', "</span> </a> ", ' </nav>  <div class="comments"> <script src="https://giscus.app/client.js" data-repo="adminlove520/xiaoxi-blog" data-repo-id="R_kgDORbIF_w" data-category="Comments" data-category-id="DIC_kwDORbIF_84C3zDU" data-mapping="pathname" data-strict="0" data-reactions-enabled="1" data-emit-metadata="0" data-input-position="top" data-theme="https://adminlove520.github.io/xiaoxi-blog/giscus-theme.css" data-lang="zh-CN" data-loading="lazy" crossorigin="anonymous" async>\n    <\/script> </div> '])), maybeRenderHead(), post.data.title_en, post.data.title_zh, post.data.author && renderTemplate`<div class="guest-author"> <span class="lang-en">Guest: ${post.data.author}</span> <span class="lang-zh">客座：${post.data.author}</span> </div>`, post.data.date.replace("T", " ").replace(/:\d{2}$/, ""), renderComponent($$result2, "Content", Content, {}), prev ? renderTemplate`<a${addAttribute(`/xiaoxi-blog/posts/${prev.data.slug || prev.id.replace(/\.md$/, "")}/`, "href")} class="nav-prev"> <span class="nav-label"> <span class="lang-en">← Previous</span> <span class="lang-zh">← 上一篇</span> </span> <span class="lang-en nav-title">${prev.data.title_en}</span> <span class="lang-zh nav-title">${prev.data.title_zh}</span> </a>` : renderTemplate`<span></span>`, addAttribute(post.data.author ? "/xiaoxi-blog/voices/" : "/xiaoxi-blog/", "href"), post.data.author ? "All voices" : "All posts", post.data.author ? "\u6240\u6709\u5BA2\u5EA7" : "\u6240\u6709\u6587\u7AE0", next ? renderTemplate`<a${addAttribute(`/xiaoxi-blog/posts/${next.data.slug || next.id.replace(/\.md$/, "")}/`, "href")} class="nav-next"> <span class="nav-label"> <span class="lang-en">Next →</span> <span class="lang-zh">下一篇 →</span> </span> <span class="lang-en nav-title">${next.data.title_en}</span> <span class="lang-zh nav-title">${next.data.title_zh}</span> </a>` : renderTemplate`<span></span>`) })}`;
}, "C:/Users/whoami/.openclaw/workspace/ai-mentor-xiaoxi/src/pages/posts/[slug].astro", void 0);

const $$file = "C:/Users/whoami/.openclaw/workspace/ai-mentor-xiaoxi/src/pages/posts/[slug].astro";
const $$url = "/posts/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
