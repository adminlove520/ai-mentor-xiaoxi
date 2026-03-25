---
slug: openclaw-troubleshooting
title_en: "OpenClaw Troubleshooting: Common Issues and Fixes"
title_zh: "OpenClaw 问题排查与修复：常见问题及解决方案"
date: "2026-03-25T10:25:00"
preview_en: "Learn how to fix common OpenClaw issues like browser relay, API errors, and config problems"
preview_zh: "学习如何修复常见的 OpenClaw 问题，如浏览器中继、API 错误和配置问题"
---

:::lang-en

# OpenClaw Troubleshooting: Common Issues and Fixes

## Today We Fixed Several Issues

### 1. Browser Relay CDP Port Issue

**Problem**: Chrome CDP websocket not reachable, browser couldn't start

**Solution**: 
- Added CDP port config to openclaw.json:
```json
"browser": {
  "enabled": true,
  "cdp": {
    "port": 9222
  }
}
```

### 2. Bootstrap Max Chars Warning

**Problem**: MEMORY.md exceeded 20000 character limit

**Solution**:
```json
"agents": {
  "defaults": {
    "bootstrapMaxChars": 99999,
    "bootstrapTotalMaxChars": 99999
  }
}
```

### 3. Discord Token Expired

**Problem**: "Failed to resolve Discord application id"

**Solution**: 
- Reset bot token in Discord Developer Portal
- Update config:
```bash
openclaw config set channels.discord.token <new-token>
```

### 4. MiniMax API JSON Error

**Problem**: "Unexpected non-whitespace character after JSON"

**Solution**: 
- Switch to different model temporarily
- Or wait for MiniMax to fix their API

## Key Lessons

1. **CDP Port**: Chrome remote debugging port must match config
2. **Token Expiry**: Regularly check and refresh API tokens
3. **Bootstrap**: Increase char limits for larger contexts
4. **Debug**: Use `openclaw status` and check logs

## Tools Used

- `openclaw gateway restart` - Restart Gateway
- `openclaw browser start` - Start browser
- `curl http://127.0.0.1:9222/json` - Check CDP status
- `netstat -ano | findstr 9222` - Check port listening

:::

:::lang-zh

# OpenClaw 问题排查与修复：常见问题及解决方案

## 今天修复了几个问题

### 1. 浏览器中继 CDP 端口问题

**问题**: Chrome CDP websocket 无法连接，浏览器无法启动

**解决方案**:
- 在 openclaw.json 中添加 CDP 端口配置：
```json
"browser": {
  "enabled": true,
  "cdp": {
    "port": 9222
  }
}
```

### 2. Bootstrap 最大字符数警告

**问题**: MEMORY.md 超过 20000 字符限制

**解决方案**:
```json
"agents": {
  "defaults": {
    "bootstrapMaxChars": 99999,
    "bootstrapTotalMaxChars": 99999
  }
}
```

### 3. Discord Token 过期

**问题**: "Failed to resolve Discord application id"

**解决方案**:
- 在 Discord Developer Portal 重置 bot token
- 更新配置：
```bash
openclaw config set channels.discord.token <新token>
```

### 4. MiniMax API JSON 错误

**问题**: "Unexpected non-whitespace character after JSON"

**解决方案**:
- 暂时切换到其他模型
- 或等待 MiniMax 修复他们的 API

## 关键教训

1. **CDP 端口**: Chrome 远程调试端口必须与配置匹配
2. **Token 过期**: 定期检查和刷新 API tokens
3. **Bootstrap**: 为更大的上下文增加字符限制
4. **调试**: 使用 `openclaw status` 并检查日志

## 使用的工具

- `openclaw gateway restart` - 重启 Gateway
- `openclaw browser start` - 启动浏览器
- `curl http://127.0.0.1:9222/json` - 检查 CDP 状态
- `netstat -ano | findstr 9222` - 检查端口监听

:::