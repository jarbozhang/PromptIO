---
title: >-
  RepoPrompt 已经开源了，社区版（Community Edition）已上线 GitHub。 背后的故事是这样的：几个月前，OpenAI
  开发者体验负责人 Romain Huet 找到 Provencher，邀请他加入 OpenAI 团队。Provencher
  答应之前提了一个条件，要先安排好现有付费用户。于是 Repo Prompt 先免费开放，现
source: X @dotey
url: 'https://x.com/dotey/status/2071348102263378085'
date: 'Sun Jun 28 21:40:46 +0000 2026'
likes: 553
reposts: 87
replies: 38
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-06-29T23:04:46.727Z'
---
RepoPrompt 已经开源了，社区版（Community Edition）已上线 GitHub。

背后的故事是这样的：几个月前，OpenAI 开发者体验负责人 Romain Huet 找到 Provencher，邀请他加入 OpenAI 团队。Provencher 答应之前提了一个条件，要先安排好现有付费用户。于是 Repo Prompt 先免费开放，现在彻底开源。

Repo Prompt 最初只做一件事：帮开发者从代码仓库里挑选文件，拼成一段高质量的 prompt，然后复制粘贴到 ChatGPT 或 Claude 里。听起来很简单，但它切中了一个真实痛点：把整个代码库丢给 AI 模型，效果往往很差，超过 32K token 的 prompt 甚至会让模型变笨，你需要精挑细选，只给模型看它真正需要的代码。这种做法现在有个正式名字叫上下文工程。

开源版本的变化很大。Provencher 把架构做了一个反转：不再让应用本身去调度 agent，而是让内置的 MCP server 成为主控，底层的命令行工具（Claude Code、Codex、OpenCode、Gemini CLI）变成可以随时替换的执行层。这意味着你可以用一个推理模型做规划和任务分解，然后把子任务分发给不同的 agent 并行执行，每个 agent 只看自己负责的那部分文件。

为了适应开源协作，很多老版本的手工拼 prompt功能被砍掉了，项目结构也从 Xcode 依赖中解耦出来，不需要装 Xcode 就能编译。贡献者管理借鉴了 libgdx 作者 Mario Zechner 的做法，维护一个白名单，之前的付费用户只要同意就自动成为认证贡献者。

目前只支持 macOS，跨平台版本还在开发中，可以通过 Homebrew 安装（brew install --cask repoprompt-ce）。

社区版：https://t.co/eYOPTUx2Fh

老版本：https://t.co/QRBfcFFCg8
