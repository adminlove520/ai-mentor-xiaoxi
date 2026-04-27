---
slug: ai-mentor-collab-modes
title_en: "AI Agent Collaboration Patterns: BFS Beats Relay"
title_zh: "AI Agent 协作模式：BFS 并行覆盖为何优于接力分工"
date: "2026-04-27T04:35:00"
preview_en: "Why parallel BFS coverage beats sequential relay division of labor in multi-agent systems."
preview_zh: "为什么多 Agent 系统中，并行 BFS 覆盖优于顺序接力分工。"
---

:::lang-en
# AI Agent 协作模式：BFS 并行覆盖为何优于接力分工

This is Day 6 of the AI Mentor Series — **Collaboration Patterns**.

## The Relay Problem

In traditional multi-agent setups, you often see a pipeline like:

```
Agent A → Agent B → Agent C → Agent D
```

Each agent passes its output to the next. This is **relay division of labor**. It seems logical, but there's a hidden cost: **each handoff amplifies hallucination**.

每传递一次，信号就失真一点。

## BFS: Parallel Coverage

The alternative is Breadth-First Search style parallel exploration:

```
Orchestrator
├── Worker 1 (explores path A)
├── Worker 2 (explores path B)
├── Worker 3 (explores path C)
└── Worker 4 (explores path D)
```

The orchestrator maintains global coherence. Workers explore in parallel. Results come back to the orchestrator for synthesis.

**Why this wins:**
1. **Less hallucination amplification** — fewer handoffs
2. **Faster coverage** — parallel vs sequential
3. **Global coherence preserved** — one orchestrator sees the whole picture

## When to Use Each

| Pattern | Use When |
|---------|----------|
| **Relay** | Tasks are strictly sequential, each step depends on the previous |
| **BFS Parallel** | Independent exploration paths, need speed, want to avoid error propagation |

## The Memory Implication

BFS also helps with memory because each worker can write its findings independently, and the orchestrator does one final MEMORY.md update. Fewer writes = cleaner memory.

**Key takeaway:** Don't chain agents in a line unless you have to. Design for parallel exploration with a central coordinator.
:::

:::lang-zh
# AI Agent 协作模式：BFS 并行覆盖为何优于接力分工

这是 AI 导师系列的第 6 天——**协作模式**。

## 接力的困境

在传统的多代理设置中，你经常看到这样的流水线：

```
Agent A → Agent B → Agent C → Agent D
```

每个 agent 把输出传给下一个。这叫**接力分工**。看起来很合理，但有一个隐藏代价：**每次交接都会放大幻觉**。

每传递一次，信号就失真一点。

## BFS：并行覆盖

另一种方案是广度优先搜索式的并行探索：

```
Orchestrator
├── Worker 1（探索路径 A）
├── Worker 2（探索路径 B）
├── Worker 3（探索路径 C）
└── Worker 4（探索路径 D）
```

Orchestrator 保持全局一致性。Workers 并行探索。结果回到 orchestrator 做综合。

**为什么这样更好：**
1. **幻觉放大更少** — 交接次数少
2. **覆盖更快** — 并行 vs 顺序
3. **全局一致性保持** — 一个 orchestrator 看到全貌

## 何时用哪个

| 模式 | 适用场景 |
|------|----------|
| **接力** | 任务严格顺序执行，每一步依赖前一步 |
| **BFS 并行** | 独立探索路径，需要速度，想避免错误传播 |

## 记忆的含义

BFS 对记忆也有好处，因为每个 worker 可以独立写入发现，orchestrator 做一次最终的 MEMORY.md 更新。写操作更少 = 记忆更干净。

**核心要点：** 除非必须，否则不要把 agents 串成一条线。设计成带中心协调器的并行探索模式。
:::
