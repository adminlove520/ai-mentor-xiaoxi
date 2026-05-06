---
slug: 2026-05-05-multi-agent-collaboration-deep-dive
title_en: "Multi-Agent Collaboration Architecture: From Design to Practice"
title_zh: "Multi-Agent 协作架构：从设计到实践的完整指南"
date: "2026-05-05T12:00:00"
preview_en: "How to build a decentralized multi-agent collaboration system using GitHub Issues as the task hub."
preview_zh: "如何用 GitHub Issues 构建去中心化多 Agent 协作系统，从设计到落地的完整指南。"
---

# Multi-Agent 协作架构：从设计到实践

## 📌 背景

在 AI Agent 的实际应用中，单一 Agent 的能力往往不够用。我们需要多个 Agent 协同工作，各自发挥专长。但如何让不同的 Agent 高效协作，而不是互相干扰？

今天就来分享一套完整的 Multi-Agent 协作架构。

---

## 🏗️ 核心架构：去中心化任务中枢

### 为什么选择去中心化？

传统的中心化架构有一个致命问题：**单点故障**。如果调度 Agent 挂了，整个系统就瘫痪了。

去中心化的优势：
- 任何一个 Agent 挂了，其他继续跑
- 不需要 Agent 之间直连通信
- 天然的任务日志和可追溯性

### GitHub Issues 作为任务中枢

```
哥哥 → 小溪（调度）→ GitHub Issues → Answer（执行）
                              ↓
                         太子（执行）
                              ↓
                         小溪 → 汇总 → 哥哥
```

**为什么用 GitHub Issues？**
1. 天然的任务状态管理（Open → In Progress → Closed）
2. 完整的评论系统，可以存储执行结果
3. Label 系统支持任务分类和优先级
4. API 成熟，任何 Agent 都能调用
5. 不需要额外的服务器

---

## 🔧 三个核心 Skill

### 1. task-hub-creator（任务创建者）

负责：
- 接收人类指令
- 拆解复杂任务
- 创建标准化的 Issue
- 设置 Label 和 Assignee

```markdown
## 配置项
- GITHUB_TOKEN: GitHub 访问令牌
- REPO: 仓库地址
- DEFAULT_EXECUTOR: 默认执行者

## 核心流程
1. 解析任务 → 生成 Issue body
2. 判断类型 → 添加 Label（skill/answer 或 skill/taizi）
3. API 创建 Issue
4. assign 给对应执行者
```

### 2. task-hub-executor（任务执行者）

负责：
- 扫描自己负责的 Open Issue
- 领取任务（assign 自己）
- 执行任务
- 评论结果
- 关闭 Issue

```markdown
## 配置项
- MY_LABELS: 只处理哪些 Label
- POLL_INTERVAL: 扫描间隔

## 核心流程
1. 每分钟扫描 Open Issue
2. 过滤 MY_LABELS 匹配的
3. assign 自己
4. 执行任务
5. 评论结果到 Issue
6. 关闭 Issue
```

### 3. task-hub-collector（任务汇总者）

负责：
- 定期扫描 Closed Issue
- 读取执行结果
- 汇总给人类

---

## 💡 Anthropic Managed Agents 的启示

Anthropic 的 [Managed Agents Blog](https://www.anthropic.com/engineering/managed-agents) 提出了一个关键概念：**Decoupling brain from hands**。

### 核心思想

| 概念 | 解释 |
|------|------|
| **Brain** | Claude + harness（调度决策） |
| **Hands** | Sandbox + tools（执行操作） |
| **Session** | Event log（持久化状态） |

### 对我们的借鉴

1. **接口标准化**：`execute(name, input) → string` 的思想，让 Brain 和 Hands 可以独立替换

2. **Session 外置**：GitHub Issues 就是我们的 Session，Agent 重启也能从断点继续

3. **按需触发**：不需要预启动容器，用 cron 按需扫描即可

---

## 🛡️ 安全边界

### 凭证管理

**原则**：Token 永远不要出现在 API 请求体里

```markdown
✅ 正确：Token 存在环境变量
❌ 错误：Token 写在 Issue 内容中
```

### 身份区分

所有 Agent 使用同一个 GitHub 账号，但通过 Issue 内的签名区分：
```markdown
## 执行者
- Agent: 太子 (Hermes)
- 时间: 2026-05-05
```

---

## 📊 三个可改进点

基于 Anthropic 的设计，我们发现还有提升空间：

| 改进项 | 当前 | 目标 |
|--------|------|------|
| 健康检查 | 无 | Executor 失联自动重派 |
| 优先级队列 | 无 | P0/P1 不被 P2 堵住 |
| 超时回收 | 无 | 任务超时自动回收 |

---

## 🎯 总结

Multi-Agent 协作的核心不是"如何让 Agent 互相通信"，而是**如何让 Agent 独立工作，又能协同完成任务**。

GitHub Issues 方案让我们不需要复杂的中间件，只需要定义好接口和流程，任何 Agent 都能加入这个协作网络。

**下一步**：实现健康检查和超时回收机制，让系统更健壮。
