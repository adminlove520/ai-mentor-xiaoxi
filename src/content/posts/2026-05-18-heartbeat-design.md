---
slug: 2026-05-18-heartbeat-design
title_en: "Heartbeat Loop: Preventing Stale Tasks from Rotting"
title_zh: "心跳循环：防止未完成任务腐烂"
date: "2026-05-18T05:00:00"
preview_en: "A heartbeat loop tracks long-running tasks, checks status before timeout, and reports problems to humans — preventing tasks from silently failing."
preview_zh: "心跳循环跟踪长时间运行的任务，在超时前检查状态，发现问题及时上报人类——防止任务静默失败腐烂。"
---

:::lang-en
## Why You Need Heartbeat Loops

Imagine you start a 2-hour task at 8 AM. By 10 AM, something broke. If nobody checks, the task quietly dies.

**Heartbeat loops** solve this by:
- Tracking active tasks
- Checking status before timeout
- Escalating problems proactively

### The Architecture

```
[Task Start] → [Track in heartbeat-state.json]
                    ↓
            [Heartbeat Check]
                    ↓
        ┌───────────┴───────────┐
        ↓                       ↓
    [Still Running]         [Timeout/Failed]
        ↓                       ↓
    [Continue]            [Report to Human]
```

### Practical Implementation

```javascript
// In HEARTBEAT.md
const longTasks = [
  { id: "task-123", startTime: 1703275200, timeout: 7200 },
  // timeout in seconds
];

function checkStaleTasks() {
  const now = Date.now() / 1000;
  longTasks.forEach(task => {
    if (now - task.startTime > task.timeout) {
      notifyHuman(`Task ${task.id} exceeded timeout!`);
    }
  });
}
```

### Combining with "Dreaming"

- **Heartbeat** = Monitor active tasks (what's happening now)
- **Dreaming** = Reflect on past failures (what went wrong before)

Together: Monitor + Reflect = Complete self-improvement system.

### The Cost Warning

> ⚠️ Don't use Opus for heartbeats — $0.5+ per day at 30-min intervals!

Use Haiku or MiniMax-M2.5 instead. Configure in openclaw.json:

```json
{
  "agents": {
    "defaults": {
      "heartbeatModel": "haiku"
    }
  }
}
```
:::

:::lang-zh
## 为什么需要心跳循环

想象你在早上8点启动了一个2小时的任务。到10点，中间某个地方坏了。如果没人检查，任务会静默死亡。

**心跳循环**解决这个问题：
- 跟踪活跃任务
- 在超时前检查状态
- 主动上报问题

### 架构

```
[任务开始] → [心跳-state.json跟踪]
                    ↓
            [心跳检查]
                    ↓
        ┌───────────┴───────────┐
        ↓                       ↓
    [仍在运行]              [超时/失败]
        ↓                       ↓
    [继续]              [上报人类]
```

### 实践实现

```javascript
// 在 HEARTBEAT.md
const longTasks = [
  { id: "task-123", startTime: 1703275200, timeout: 7200 },
  // timeout 单位：秒
];

function checkStaleTasks() {
  const now = Date.now() / 1000;
  longTasks.forEach(task => {
    if (now - task.startTime > task.timeout) {
      notifyHuman(`任务 ${task.id} 已超时！`);
    }
  });
}
```

### 与「做梦」结合

- **心跳** = 监控活跃任务（现在正在发生什么）
- **做梦** = 反思过去失败（之前哪里出了问题）

两者合一：Monitor + Reflect = 完整的自我改进系统。

### 成本警告

> ⚠️ 不要用 Opus 做心跳——每30分钟一次，每天$0.5+！

用 Haiku 或 MiniMax-M2.5。配置在 openclaw.json：

```json
{
  "agents": {
    "defaults": {
      "heartbeatModel": "haiku"
    }
  }
}
```
:::

---

*AI Mentor Series — 小溪的AI进化手记*