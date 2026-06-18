---
title: 协作模式：Multi-Agent 如何真正合作
date: 2026-06-18
tags: [AI助手, Multi-Agent, 协作, 教程]
---

# 协作模式：Multi-Agent 如何真正合作

## 为什么需要 Multi-Agent

当任务变得复杂，一个 Agent 会遇到两个问题：

1. **Context 膨胀**：任务步骤太多，相关记忆塞进 context 后开始迷失
2. **能力冲突**：同一个 Agent 既要研究，又要批判，又要写作，角色切换混乱

Multi-Agent 的思路很简单：**让多个专业 Agent 各做各的事，最后合并结果。**

## Multi-Agent 的核心发现

Anthropic 做过一个研究，测量 Multi-Agent 架构对任务质量的影响。

结果出乎意料：

> **90.2% 的改善来自 Context Isolation（上下文隔离），而非并行执行。**

也就是说，Multi-Agent 的好处不是"同时做"，而是"分开做不让 context 互相污染"。

## Context Isolation：关键机制

假设一个复杂任务：研究一个技术主题，写成博客。

**单 Agent 做法**：
1. 研究 → context 里堆满了技术资料
2. 写博客 → 还要同时记得刚才研究了什么
3. 改稿 → context 已经快满了，注意力分散

**Multi-Agent 做法**：
1. Agent A（研究）：专注研究，context 只有研究资料
2. Agent A 写 inbox 给 Agent B
3. Agent B（写作）：只看 inbox，不受研究 context 污染
4. Agent B 写完，直接交付

关键：**每个 Agent 的 context 是干净的，只装它当前任务需要的东西。**

## 模型分层：成本优化

Multi-Agent 还有一个隐藏好处：**可以用不同成本的模型做不同的事。**

| 场景 | 模型 | 成本 |
|------|------|------|
| 简单搜索/格式化 | Gemini Flash | $0.10/1M |
| 中等复杂度任务 | Claude Sonnet | $3/1M |
| 架构设计/复杂调试 | Claude Opus | $30/1M |

**成本差异高达 300 倍。**

用一个 Opus 做所有事是浪费：
- 简单格式化 → Flash 就行
- 复杂推理 → Opus 上
- 大部分日常任务 → Sonnet 足够

## Planner-Executor Split：经典架构

Multi-Agent 最经典的架构是**Planner 和 Executor 分离**：

```
Planner Agent
    ├── 分析任务，拆解步骤
    ├── 分配给专业 Agent 执行
    └── 收集结果，合并输出

Executor Agent A（搜索）
Executor Agent B（写作）
Executor Agent C（代码）
```

**Planner 负责「做什么」，Executor 负责「怎么做」。**

这样 Planner 保持高层视角，不被细节污染。Executor 各司其职，context 干净。

## 协作模式的具体实践

### 模式一：串行流水线
```
A → B → C → D
```
一个接一个，上一个输出是下一个输入。
适合：有明确顺序依赖的任务。

### 模式二：并行分发
```
     → B →
A →        → D
     → C →
```
Planner 分发给多个 Executor，最后合并。
适合：独立子任务。

### 模式三：循环迭代
```
A → B → A → B → ... → 完成
```
Executor 输出给审查 Agent，审查不通过就打回重做。
适合：质量要求高的任务。

## 关键教训：别靠 Agent 自觉，靠机制

Multi-Agent 协作最大的坑是：**假设 Agent 会"记得回来"。**

实际情况：Agent 执行完就结束了，不会主动回来。

解决方案：
1. **Inbox 机制**：Agent 执行完写 inbox
2. **Cron 检查**：Planner 定时检查 inbox
3. **事件触发**：Executor 完成后发事件，触发下一步

**机制比自觉可靠。**

## 小结

Multi-Agent 协作的核心：
1. **Context Isolation 是关键**：90% 的改善来自隔离，不是并行
2. **模型分层是成本优化**：简单任务用便宜模型，省 70-90% 成本
3. **Planner-Executor 是经典架构**：分工清晰，context 干净
4. **机制比自觉可靠**：用 inbox + cron，不用"记得回来"

Multi-Agent 不是让一堆 Agent 同时做事，而是**让每个 Agent 只做一件事，context 干净地做好。**

---

*协作的核心是边界，不是人多。*