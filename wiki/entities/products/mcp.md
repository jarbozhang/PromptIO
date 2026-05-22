# MCP / Model Context Protocol

[[anthropic|Anthropic]] 主推、行业广泛采纳的 LLM 工具集成开放协议。让 LLM agent 可以统一调用外部系统（浏览器 / 数据库 / 文件系统 / API）。

## 为什么重要

MCP 是 2026 年 AI agent 生态最重要的"接口标准"，正在取代各家厂商自有的 tool calling 格式。Claude Code / Codex / Cursor / Gemini CLI 都已支持 MCP server，第三方 MCP server 在 GitHub 上爆发式增长。

## 关键事件时间线

- **2026-05-19** — [[anthropic|Anthropic]] 收购 [[stainless|Stainless]]，把 SDK + MCP server 工具链官方化
- **2026-05-21** — [[google|Google]] 把 [[chrome|Chrome]] DevTools 包装成官方 MCP server，Claude / Codex 可以直接接管浏览器调试

## 我们的覆盖

| 日期 | 文章 | REACH |
|------|------|-------|
| 2026-05-05 | [[n8n-mcp-claude自动写自动化工作流-副业号\|n8n + MCP Claude 自动写自动化工作流]] | 8 |
| 2026-05-19 | [[anthropic收购stainless-sdk和mcp服务器要变成claude的基础设施\|Anthropic 收购 Stainless SDK 和 MCP 服务器要变成 Claude 的基础设施]] | 8 |
| 2026-05-21 | [[chrome-devtools-mcp-官方上线-claude-codex-接管浏览器\|Chrome DevTools MCP 官方版上线 Claude Codex 直接接管浏览器调试不用截图]] | 7 |

## 相关实体 / 主题

- [[anthropic|Anthropic]] — 协议主推方
- [[stainless|Stainless]] — MCP server 工具链
- [[chrome|Chrome]] — DevTools MCP 官方版
- [[agent-frameworks|Agent 框架]] / [[developer-tools|开发者工具]] — 上游主题

## 注意

MCP 作为协议级实体首次建页。后续每次官方 MCP server 上线（Google / Microsoft / 国产厂商）、MCP 协议版本变更、MCP server 安全事件均在此追加。
