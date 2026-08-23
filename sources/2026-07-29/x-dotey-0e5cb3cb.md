---
title: >-
  OpenAI 开源了 Codex Security Codex Security 是一个命令行工具（CLI）加 TypeScript
  开发工具包（SDK），用 AI 自动扫描代码仓库里的安全漏洞。它能找到问题、验证问题是否真实存在，还能生成修复补丁。 这个工具之前一直以 Codex
  插件的形式存在，但是闭源的。 六月底就有人在 GitHub 上开了 issu
source: X @dotey
url: 'https://x.com/dotey/status/2082227259096944689'
date: 'Tue Jul 28 22:10:39 +0000 2026'
likes: 216
reposts: 33
replies: 27
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-07-29T11:04:48.981Z'
---
OpenAI 开源了 Codex Security

Codex Security 是一个命令行工具（CLI）加 TypeScript 开发工具包（SDK），用 AI 自动扫描代码仓库里的安全漏洞。它能找到问题、验证问题是否真实存在，还能生成修复补丁。

这个工具之前一直以 Codex 插件的形式存在，但是闭源的。

六月底就有人在 GitHub 上开了 issue 要求开源，理由是安全不该被藏着。现在 OpenAI 把它拆成了独立项目，以 Apache-2.0 协议开源，项目地址： https://t.co/YZDFXg885w。

Codex 插件版和独立版有什么区别？

插件适合在你的 Codex 项目中，直接调用插件做安全扫描。

独立版是给安全团队用的，能批量扫整个组织的所有仓库，支持历史记录、扫描结果去重、误报追踪，还能接进 CI 流水线。

技术细节方面，默认使用 gpt-5.6-sol 模型做高推理强度扫描，需要 Node.js 22+ 和 Python 3.10+，支持 macOS、Linux 和 Windows。扫描结果可以导出为 SARIF、CSV 或 JSON 格式。还有个 install-hook 命令，可以在每次 git commit 前自动扫描改动过的代码，发现高危问题直接拦住提交。

在公开测试阶段，Codex Security 扫描了超过 120 万次提交（commit），在 OpenSSH、GnuTLS、PHP、Chromium 等开源项目中发现了 792 个严重漏洞和 10561 个高危漏洞。有第三方测试对比过，在 16.2 万行生产代码上，Codex Security 的真阳性率是 74%，Snyk 是 28%，Semgrep 是 20%。OpenAI 开源了 Codex Security
