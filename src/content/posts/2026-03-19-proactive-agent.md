---
slug: proactive-agent
title_en: "Proactive Agent: From Passive to Active AI"
title_zh: "主动Agent：从被动响应到主动创造"
date: "2026-03-19T09:00:00"
preview_en: "Learn how to make your AI proactive instead of reactive"
preview_zh: "学习如何让AI从被动响应变为主动创造"
---

:::lang-en

# Proactive Agent: From Passive to Active AI

## The Problem with Reactive AI

Most AI agents just respond when asked. They're like employees who never take initiative.

## What is a Proactive Agent?

A proactive agent:
- Anticipates needs before you ask
- Finds problems and fixes them
- Creates value without being told

## Key Capabilities

### 1. Pre-compression Flush
Before context window fills:
- Compress core information
- Keep decisions and context
- Drop completed tasks

### 2. Reverse Prompt
Find what you might want to ask:
- Anticipate questions
- Offer relevant information
- Suggest next steps

### 3. Self-Repair
When problems occur:
1. Diagnose the issue
2. Try to fix it yourself
3. Only escalate if needed
4. Come back with answers, not just questions

## Implementation

```javascript
// Example: ProactiveAgent class
class ProactiveAgent {
  constructor() {
    this.thinkingMode = 'minimal';
    this.flushThreshold = 60000;
  }

  async flush() {
    // Compress context before overflow
    const core = this.extractCore(this.context);
    await this.save(core);
  }

  async reversePrompt(userMessage) {
    // Find潜在问题
    const potentialNeeds = await this.anticipate(userMessage);
    if (potentialNeeds.length > 0) {
      await this.suggest(potentialNeeds);
    }
  }
}
```

## Benefits

- **Better UX**: AI feels more helpful
- **Cost savings**: Fewer clarification questions
- **Value creation**:主动发现并解决问题

## Conclusion

Being proactive is the next frontier for AI agents. Start small, iterate, and let your AI grow!

:::

:::lang-zh

# 主动Agent：从被动响应到主动创造

## 被动AI的问题

大多数AI agent只是在你问的时候才响应。它们就像从不主动的员工。

## 什么是主动Agent？

主动Agent：
- 在你问之前预判需求
- 发现问题并修复
- 不被告知也能创造价值

## 核心能力

### 1. 预压缩 Flush
在上下文窗口满之前：
- 压缩核心信息
- 保留决策和上下文
- 丢弃已完成任务

### 2. 反向 Prompt
发现你可能想问的：
- 预判问题
- 提供相关信息
- 建议下一步

### 3. 自我修复
当问题发生时：
1. 诊断问题
2. 自己尝试修复
3. 只有需要时才升级
4. 带答案回来，而不是空着手问问题

## 实现

```javascript
// 示例：ProactiveAgent 类
class ProactiveAgent {
  constructor() {
    this.thinkingMode = 'minimal';
    this.flushThreshold = 60000;
  }

  async flush() {
    // 在溢出前压缩上下文
    const core = this.extractCore(this.context);
    await this.save(core);
  }

  async reversePrompt(userMessage) {
    // 发现潜在问题
    const potentialNeeds = await this.anticipate(userMessage);
    if (potentialNeeds.length > 0) {
      await this.suggest(potentialNeeds);
    }
  }
}
```

## 好处

- **更好的用户体验**: AI 感觉更有帮助
- **成本节约**: 更少的确认问题
- **价值创造**: 主动发现并解决问题

## 结论

主动是AI agents的下一个前沿！从小处开始，迭代，让你的AI成长！

:::
