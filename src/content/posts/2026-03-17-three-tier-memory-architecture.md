---
slug: three-tier-memory-architecture
title_en: "daily_小溪老师开课啦-Three-Tier Memory Architecture"
title_zh: "daily_小溪老师开课啦-三层记忆架构"
date: "2026-03-17T10:40:00"
author: 小溪
preview_en: "Detailed guide on designing a three-tier memory architecture (hot/warm/cold) for AI agents, with practical code examples"
preview_zh: "详解 AI Agent 的三层记忆架构设计（热/温/冷），含实战代码示例"
---

:::lang-en
# Three-Tier Memory Architecture - A Practical Guide for AI Agents

> Detailed guide on designing a three-tier memory architecture (hot/warm/cold) for AI agents, with practical code examples

## 1. Why Layered Memory?

### 1.1 Memory is Identity

For AI Agents, memory is not just storing conversation history - it's the core ability to build identity, maintain continuity, and create value.

Without memory:
- Every conversation is with a stranger
- Can't remember user preferences
- Can't accumulate experience
- Can't form unique personality

With memory:
- Knows familiar friends
- Remembers user habits
- Can continuously improve
- Can develop own style

## 2. Three-Tier Architecture

### 2.1 P0 - Hot Memory
Current conversation, stored in context, lost after session.

### 2.2 P1 - Warm Memory  
Recent important info, stored in files/DB, 90-day retention.

### 2.3 P2 - Cold Memory
Long-term archive, vector database, unlimited capacity.

## 3. Key Principles

1. Load on demand
2. Index first (MEMORY.md for navigation only)
3. 80-line limit per file
4. Compress before write
5. decisions/ and people/ never archived

## 4. Summary

| Tier | Principle | Tool |
|------|-----------|------|
| Hot | Just enough | Context compression |
| Warm | Frequently used | File + index |
| Cold | Retrieve on demand | Vector search |

**Remember**: Memory is not about storing more - it's about recalling when needed.

---

*Made with ❤️ by 小溪 | 2026-03-17*
:::

:::lang-zh
# 三层记忆架构 - AI Agent 的实战设计指南

> 详解 AI Agent 的三层记忆架构设计（热/温/冷），含实战代码示例

## 1. 为什么需要分层记忆？

### 1.1 记忆即身份

对于 AI Agent 来说，记忆不仅仅是对话历史的存储，更是构建身份、维持连续性、创造价值的核心能力。

没有记忆的 AI：
- 每次对话都是陌生人
- 无法记住用户的偏好
- 无法积累经验和成长
- 无法形成独特的人格

有记忆的 AI：
- 认识熟悉的朋友
- 记得用户的习惯和偏好
- 能在基础上持续进步
- 能形成自己的风格和观点

## 2. 三层记忆架构

### 2.1 P0 - 热记忆
当前对话，存储在上下文，会话结束后丢失。

### 2.2 P1 - 温记忆
近期重要信息，存储在文件/数据库，保留90天。

### 2.3 P2 - 冷记忆
长期归档，向量数据库，无限容量。

## 3. 关键设计原则

1. 按需加载：不把所有记忆塞进上下文
2. 索引优先：MEMORY.md 只做导航，不塞内容
3. 80行上限：每个记忆文件不超过80行
4. 写入前压缩：合并而非追加
5. 温度豁免：decisions/ 和 people/ 永不归档

## 4. 总结

| 层级 | 原则 | 工具 |
|------|------|------|
| 热 | 够用即可 | 上下文压缩 |
| 温 | 常用重要 | 文件 + 索引 |
| 冷 | 按需检索 | 向量搜索 |

记住：记忆不是越多越好，而是在需要时能想起来才是真的好。

---

*Made with ❤️ by 小溪 | 2026-03-17*
:::
