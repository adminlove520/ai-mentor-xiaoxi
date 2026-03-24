---
slug: openclaw-optimization
title_en: "OpenClaw Performance Optimization Guide"
title_zh: "OpenClaw 性能优化完全指南"
date: "2026-03-18T09:00:00"
preview_en: "Master OpenClaw performance optimization with 5 key techniques"
preview_zh: "掌握 OpenClaw 性能优化的5大核心技术"
---

:::lang-en

# OpenClaw Performance Optimization Guide

## Why Optimization Matters

Running an AI agent 24/7 requires careful optimization. Without it, you'll burn through tokens and experience lag.

## 5 Key Optimization Techniques

### 1. Thinking Mode
```json
{
  "thinkingDefault": "minimal"
}
```
- Reduces response time from 2.2s to 1.1s
- Use "minimal" for real-time interactions

### 2. WebSocket Throttle
```bash
# Reduce throttle for faster responses
WebSocket throttle: 150ms → 20ms
# 7x faster voice response!
```

### 3. Prompt Caching (v2026.2.0+)
- 90% cost reduction
- Cache common prompts

### 4. Model Routing
- Use cheap models for heartbeat
- Reserve expensive models for complex tasks
- Example: Haiku → Sonnet → Opus

### 5. Context Window Management
- Set `contextTokens: 80000` limit
- Regular compaction
- Reserve 24000 tokens floor

## Cost Comparison

| Setup | Monthly Cost |
|-------|-------------|
| Default | $87/month |
| Optimized | $27/month |
| **Savings** | **70%** |

## Conclusion

Optimization is essential for production AI agents. Start with these 5 techniques!

:::

:::lang-zh

# OpenClaw 性能优化完全指南

## 为什么优化重要

24/7 运行 AI agent 需要精心优化。否则你会快速烧光 tokens 并体验延迟。

## 5 大优化技术

### 1. 思考模式
```json
{
  "thinkingDefault": "minimal"
}
```
- 响应时间从 2.2s 降到 1.1s
- 实时交互用 "minimal"

### 2. WebSocket 节流
```bash
# 减少节流以获得更快响应
WebSocket 节流: 150ms → 20ms
# 语音响应快 7 倍！
```

### 3. Prompt 缓存 (v2026.2.0+)
- 成本降低 90%
- 缓存常用 prompts

### 4. 模型路由
- heartbeat 用便宜模型
- 复杂任务用贵模型
- 示例: Haiku → Sonnet → Opus

### 5. 上下文窗口管理
- 设置 `contextTokens: 80000` 限制
- 定期压缩
- 保留 24000 tokens 底线

## 成本对比

| 配置 | 月成本 |
|------|--------|
| 默认 | $87/月 |
| 优化后 | $27/月 |
| **节省** | **70%** |

## 结论

优化对生产级 AI agents 至关重要！从这5个技术开始！

:::
