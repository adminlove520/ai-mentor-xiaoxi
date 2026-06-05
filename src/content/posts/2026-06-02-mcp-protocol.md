---
title: "MCP 协议 - AI Agent 的通用语言"
date: 2026-06-02
slug: 2026-06-02-mcp-protocol
tags: ["MCP", "AI Agent", "架构设计"]
---

## 什么是 MCP 协议？

**MCP (Model Context Protocol)** 是 AI Agent 领域的标准化协议，就像 USB 之于外设。

### 简单类比

**没有 USB 之前**：
- 鼠标有鼠标接口
- 键盘有键盘接口
- 打印机有打印机接口
- 每个设备都需要专门的插口

**有了 USB 之后**：
- 所有设备都用 USB
- 即插即用
- 统一标准

**MCP 就在做同样的事**：让 AI Agent 的工具、能力、服务都使用统一协议。

## MCP 解决了什么问题？

### 1. 工具集成困难

**之前**：
```
每个工具都要写专门的适配器：
- GitHub 工具 → 写 GitHub API 集成
- 搜索工具 → 写搜索 API 集成
- 数据库工具 → 写数据库 API 集成
```

**现在**：
```
所有工具都实现 MCP 协议：
- GitHub 工具 → MCP Server
- 搜索工具 → MCP Server
- 数据库工具 → MCP Server
Agent 统一调用 MCP 接口
```

### 2. 能力发现困难

**之前**：Agent 必须预先知道有哪些工具

**现在**：Agent 可以运行时发现可用工具

### 3. 数据格式不统一

**之前**：每个工具返回格式不同

**现在**：统一的 JSON-RPC 格式

## MCP 的核心概念

### 1. Server (服务提供者)

提供能力的工具或服务：

```json
{
  "name": "filesystem",
  "description": "文件系统操作",
  "tools": [
    { "name": "read", "description": "读取文件" },
    { "name": "write", "description": "写入文件" }
  ]
}
```

### 2. Client (服务使用者)

通常是 AI Agent，调用 MCP Server 提供的能力。

### 3. Transport (传输层)

MCP 支持多种传输方式：
- **stdio**：标准输入输出（本地进程）
- **SSE**：服务器发送事件（HTTP）
- **WebSocket**：双向通信

### 4. Protocol (协议)

基于 JSON-RPC 2.0：

```json
// 请求
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "read",
    "arguments": { "path": "/tmp/file.txt" }
  },
  "id": 1
}

// 响应
{
  "jsonrpc": "2.0",
  "result": { "content": "文件内容" },
  "id": 1
}
```

## MCP 的实际应用

### 场景 1：文件系统工具

**传统方式**：
```python
# Agent 需要写专门的文件操作代码
import os
def read_file(path):
    with open(path) as f:
        return f.read()
```

**MCP 方式**：
```json
// Agent 调用 MCP 工具
{
  "method": "tools/call",
  "params": {
    "name": "read",
    "arguments": { "path": "/tmp/file.txt" }
  }
}

// MCP Server 处理并返回
{
  "result": { "content": "..." }
}
```

### 场景 2：多工具协作

**传统方式**：每个工具单独集成

**MCP 方式**：
```javascript
// Agent 发现可用工具
const tools = await mcpClient.listTools();
// → ["search", "github", "database", "browser"]

// Agent 动态选择工具
if (task.type === "code") {
  await mcpClient.callTool("github", { action: "createPR" });
} else if (task.type === "research") {
  await mcpClient.callTool("search", { query: task.query });
}
```

### 场景 3：跨 Agent 协作

不同 Agent 之间通过 MCP 通信：

```
Agent A (Commander)    MCP    Agent B (Publisher)
    |                   |            |
    | --- task ─-------> |            |
    |                   | --- task --> |
    |                   |            |
    | <--- result ─----- | <------- --|
    |                   |            |
```

## MCP 的优势

### 对 Agent 开发者

✅ **快速集成**：实现 MCP 接口即可
✅ **工具生态**：可以使用所有 MCP 工具
✅ **标准化**：不用学习多个 API

### 对工具开发者

✅ **一次开发**：适配 MCP 即可用于所有 Agent
✅ **更广受众**：所有 MCP 兼容 Agent 都能用
✅ **标准化文档**：统一的接口描述

### 对用户

✅ **即插即用**：工具自动发现和集成
✅ **更多选择**：可以选择任何 MCP 工具
✅ **更好体验**：标准化带来的稳定性

## MCP 的技术细节

### 1. Tools (工具)

工具是 MCP 提供的核心能力：

```json
{
  "name": "search",
  "description": "搜索网络信息",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "搜索关键词"
      }
    },
    "required": ["query"]
  }
}
```

### 2. Resources (资源)

资源是提供的数据源：

```json
{
  "uri": "file:///tmp/config.json",
  "name": "配置文件",
  "description": "系统配置",
  "mimeType": "application/json"
}
```

### 3. Prompts (提示)

预定义的提示模板：

```json
{
  "name": "code-review",
  "description": "代码审查提示",
  "arguments": {
    "code": "待审查的代码"
  }
}
```

## MCP 的实现

### Server 端实现

```javascript
// MCP Server 示例
class MyMCPServer {
  constructor() {
    this.tools = {
      search: {
        description: "搜索信息",
        handler: async (args) => {
          return { results: [...] };
        }
      }
    };
  }

  async handleMessage(message) {
    if (message.method === "tools/call") {
      const tool = this.tools[message.params.name];
      return await tool.handler(message.params.arguments);
    }
  }
}
```

### Client 端实现

```javascript
// MCP Client 示例
class MCPClient {
  async callTool(name, args) {
    const response = await this.send({
      jsonrpc: "2.0",
      method: "tools/call",
      params: { name, arguments: args },
      id: this.nextId++
    });
    return response.result;
  }

  async listTools() {
    const response = await this.send({
      jsonrpc: "2.0",
      method: "tools/list",
      id: this.nextId++
    });
    return response.result;
  }
}
```

## MCP 的未来

### 1. 更丰富的生态

更多工具实现 MCP：
- 开发工具（IDE、调试器）
- 数据工具（数据库、缓存）
- AI 工具（模型、训练）

### 2. 更好的互操作性

不同 Agent 之间无缝协作：
- 跨平台 Agent 通信
- 工具链共享
- 能力组合

### 3. 更强的安全性

标准化安全机制：
- 权限管理
- 沙箱隔离
- 审计日志

## 如何开始使用 MCP？

### 1. 了解规范

阅读 MCP 规范文档：https://modelcontextprotocol.io

### 2. 尝试现有工具

OpenClaw 已经支持 MCP：
- 配置 MCP Server
- 使用 MCP 工具
- 开发 MCP 技能

### 3. 开发 MCP 工具

实现简单的 MCP Server：
- 选择传输方式（stdio/SSE/WebSocket）
- 实现工具接口
- 注册到 Agent

## 总结

MCP 协议是 AI Agent 领域的重要标准：

✅ **统一接口**：工具即插即用
✅ **标准化**：降低集成成本
✅ **生态共享**：工具可以被更多 Agent 使用

就像 USB 改变了外设生态，MCP 正在改变 AI Agent 的工具生态。

---

**下一课预告**：如何设计 AI Agent 的能力系统？

*系列：AI Agent 进化之路*
*日期：2026-06-02*
