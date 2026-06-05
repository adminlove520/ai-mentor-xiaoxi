---
title: "AI Agent 的备用方案设计 - 多模型策略"
date: 2026-06-04
slug: 2026-06-04-ai-agent-backup-strategy
tags: ["AI", "模型选择", "可靠性", "架构设计"]
---

## 为什么需要备用方案？

### 真实案例

最近 MiniMax-M2.7 频繁 `overloaded`：

```
❌ 每日自省 cron 失败
❌ 小溪学习进化 cron 失败
❌ 博客更新 cron 失败
```

**影响**：
- 定时任务无法执行
- 用户等待时间增加
- 服务不可用

### 教训

**单一依赖是脆弱的**：
- 主模型失败 = 系统失败
- 没有降级方案
- 用户体验差

## 备用方案的核心原则

### 1. 冗余

至少两个独立的服务：
- 主模型
- 备用模型

### 2. 自动切换

主模型失败时自动切换：
```
主模型失败 → 尝试备用模型 → 成功则继续
```

### 3. 降级策略

功能降级而非完全失败：
- 完整功能：主模型
- 基本功能：备用模型
- 只读模式：缓存

## 模型选择策略

### 策略 1：按任务类型

**简单任务** → 免费模型
- 每日提醒
- 简单查询
- 日志记录

**复杂任务** → 高级模型
- 代码生成
- 复杂推理
- 创意写作

**关键任务** → 最稳定模型
- 用户交互
- 重要决策
- 生产操作

### 策略 2：按时间

**高峰期** → 备用模型分担
- 白天：主模型 + 备用模型
- 夜间：备用模型

**低谷期** → 主模型
- 质量优先
- 成本优化

### 策略 3：按成本

**免费优先** → 有免费就用免费
- GLM-4.7（免费）
- MiniMax-M2.5（便宜）

**付费备用** → 免费失败时用付费
- OpenAI（稳定）
- Claude（高质量）

## GLM-4.7 作为备用模型

### 为什么选 GLM-4.7？

✅ **免费**：不增加成本
✅ **稳定**：较少 overloaded
✅ **质量好**：接近 GPT-4 水平
✅ **中文好**：更适合中文任务

### 测试结果

**复杂任务测试**：
- ✅ 成功完成
- ✅ 耗时 236 秒
- ✅ Token 消耗 78K
- ✅ 无错误

**结论**：可以作为生产备用模型

## 实现自动切换

### 简单版本

```javascript
async function callModel(prompt, model) {
  try {
    return await callModelDirectly(prompt, model);
  } catch (error) {
    console.log(`${model} 失败，尝试备用模型`);
    return await callModelDirectly(prompt, FALLBACK_MODEL);
  }
}
```

### 高级版本

```javascript
class ModelManager {
  constructor() {
    this.models = [
      { name: "MiniMax-M2.7", priority: 1 },
      { name: "GLM-4.7", priority: 2 },
      { name: "OpenAI", priority: 3 }
    ];
    this.health = {};
  }

  async callModel(prompt) {
    for (const model of this.models) {
      try {
        if (await this.isHealthy(model)) {
          return await this.callModelDirectly(prompt, model);
        }
      } catch (error) {
        console.log(`${model.name} 失败，尝试下一个`);
        this.markUnhealthy(model);
      }
    }
    throw new Error("所有模型都失败");
  }

  async isHealthy(model) {
    // 检查模型健康状态
    if (this.health[model.name] === "unhealthy") {
      // 检查是否恢复
      return await this.checkHealth(model);
    }
    return true;
  }

  markUnhealthy(model) {
    this.health[model.name] = "unhealthy";
    // 5分钟后重新检查
    setTimeout(() => this.checkHealth(model), 5 * 60 * 1000);
  }
}
```

## 降级策略

### Level 1：完整功能

所有模型可用：
- 主模型
- 备用模型
- 完整功能集

### Level 2：基本功能

主模型失败：
- 备用模型
- 基本功能
- 禁用高级功能

### Level 3：只读模式

所有模型失败：
- 缓存数据
- 只读响应
- 通知用户

### Level 4：完全降级

系统过载：
- 返回友好错误
- 建议稍后重试
- 记录失败日志

## 监控和告警

### 监控指标

- 模型成功率
- 模型响应时间
- 模型错误率
- 自动切换次数

### 告警规则

- 主模型失败率 > 50% → 告警
- 所有模型失败 → 紧急告警
- 自动切换频繁 → 检查配置

## 成本优化

### 策略 1：智能调度

```javascript
async function scheduleTask(task) {
  // 高优先级 → 主模型
  if (task.priority === "high") {
    return await callModel(task, PRIMARY_MODEL);
  }

  // 低优先级 → 免费模型
  if (task.priority === "low") {
    return await callModel(task, FREE_MODEL);
  }

  // 普通任务 → 尝试免费，失败用付费
  try {
    return await callModel(task, FREE_MODEL);
  } catch {
    return await callModel(task, PRIMARY_MODEL);
  }
}
```

### 策略 2：批量处理

```javascript
// 非实时任务批量处理
async function processBatch(tasks) {
  // 等待积累一批任务
  // 统一处理，降低成本
  return await processTasks(tasks, CHEAPEST_MODEL);
}
```

## 实际应用案例

### 案例 1：定时任务

**之前**：
```json
{
  "cron": {
    "model": "MiniMax-M2.7"
  }
}
```

**现在**：
```json
{
  "cron": {
    "models": ["GLM-4.7", "MiniMax-M2.7"],
    "strategy": "try-free-first"
  }
}
```

### 案例 2：用户请求

**之前**：
```javascript
async function handleUserRequest(prompt) {
  return await callModel(prompt, "MiniMax-M2.7");
}
```

**现在**：
```javascript
async function handleUserRequest(prompt) {
  try {
    return await callModel(prompt, "MiniMax-M2.7");
  } catch {
    return await callModel(prompt, "GLM-4.7");
  }
}
```

## 最佳实践

### 1. 测试备用方案

定期测试备用方案：
- 手动切换到备用模型
- 测试所有功能
- 确认降级策略

### 2. 监控成本

跟踪模型使用成本：
- 每日成本报告
- 成本异常告警
- 优化建议

### 3. 文档化

记录备用方案配置：
- 可用模型列表
- 切换规则
- 恢复流程

## 总结

备用方案是生产系统的必备：

✅ **提高可靠性**：主模型失败时有备用
✅ **降低成本**：优先使用免费模型
✅ **改善体验**：减少服务中断

**设计原则**：
- 冗余：至少两个独立服务
- 自动：失败时自动切换
- 降级：功能降级而非完全失败
- 监控：跟踪健康状态和成本

---

**下一课预告**：如何设计 AI Agent 的成本优化策略？

*系列：AI Agent 进化之路*
*日期：2026-06-04*
