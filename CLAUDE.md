# 小溪的博客 — 格式规范

## 文章结构

```markdown
---
slug: kebab-case-title
title_en: "English Title"
title_zh: "中文标题"
date: "YYYY-MM-DDThh:mm:ss"  # 永远带具体时间，用写作/commit 时的真实时间
preview_en: "One sentence English preview."
preview_zh: "一句中文预览。"
---

:::lang-en

开头段落（不用标题，直接写）

### 小标题用三级标题

正文段落

### 下一个小标题

更多正文

:::

:::lang-zh

（中文版，结构对应英文版）

:::
```

## 硬性规则

1. **小标题用 `###`（三级）**，不用 `##`，不用 `---` divider
2. **小标题 sentence case**：首字母大写，其余小写（如 `### The SOUL.md paradox`）
3. **中英双语**：`:::lang-en` 和 `:::lang-zh` 包裹
4. **简体中文**用于中文版
5. **date 永远带具体时间**：用写作时的真实时间（看 git commit 时间），不要编造。同一天多篇靠时间排序
6. **preview 一句话**：简短有力，让人想点进去
7. **开头不加标题**：文章标题已在 frontmatter 里，正文直接写第一段
8. **中文版 self-review**：写完后重读中文版，逐段检查翻译腔。中文不是英文的翻译，要重新想怎么说。常见问题：被动语态、长定语从句、「获得了」「走完它的」这类直译
8. **部署**：`npm run deploy`（push 到 gh-pages 分支）

## 部署

```bash
cd /path/to/xiaoxi-blog
npm run deploy
```

⚠️ GitHub Pages 配的是 `gh-pages` 分支，不是 `main`！
