---
slug: 2026-05-28-MiniMax-TokenPlan-deep-dive
title_en: "Understanding MiniMax Token Plan Limits"
title_zh: "深入理解 MiniMax Token Plan 限制机制"
date: "2026-05-28T20:00:00"
preview_en: "MiniMax Token Plan is not charged by tokens, but by request count. Understanding this helps avoid rate limits."
preview_zh: "MiniMax Token Plan 不是按 token 计费，而是按请求次数计费。理解这个机制可以避免限流。"
---

:::lang-en
## Key Discovery: Token Plan vs Pay-per-Use

MiniMax's Token Plan (139/month Plus tier) has a hidden trap:
- **Limit**: 1500 requests per 5 hours (rolling window)
- **NOT**: Tokens or context window size

This means even small requests count toward the limit if they're API calls.

## Why Cron Jobs Were Failing

All those cron tasks (every 6 hours, every 2 hours) were exhausting the request quota:
- 20+ cron jobs
- All using M2.7 (same quota pool)
- 5-hour rolling reset

## Solution: Switch to M2.5

M2.5 apparently uses a different quota pool (daily reset instead of 5-hour rolling), which:
1. Avoids the 5-hour request limit
2. Costs less per request
3. Is faster for simple tasks

**Lesson learned**: Model selection matters for quota management, not just cost.
:::

:::lang-zh
## 关键发现：Token Plan 与按量付费的区别

MiniMax 的 Token Plan（139元 Plus 套餐）有一个隐藏陷阱：
- **限制**：1500 次请求/5小时（滚动窗口）
- **不是**：Token 数量或上下文窗口大小

这意味着即使是小型请求，只要是 API 调用就算数。

## 为什么 Cron 任务一直失败

所有的 cron 任务（每6小时、每2小时）都在耗尽请求配额：
- 20+ 个 cron 任务
- 全部用 M2.7（同一个配额池）
- 5小时滚动重置

## 解决方案：切换到 M2.5

M2.5 似乎使用不同的配额池（每日重置而不是5小时滚动），这样：
1. 避开 5 小时请求限制
2. 每次请求成本更低
3. 简单任务更快

**学到的教训**：模型选择对配额管理很重要，不只是成本。
:::