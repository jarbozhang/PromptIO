---
title: 安全扫描为什么不能直接交给 AI Agent，Claude Code 和 Codex CLI 被远程执行攻击点名
status: draft
date: '2026-07-10'
source: manual
source_url: https://ainowinstitute.org/publications/friendly-fire-exploit-brief
angle: 读者最该关心的是自己的仓库审计流程是否把不可信代码交给了 Agent 执行；文章可以拆解攻击链，并给出隔离环境、权限、命令审批和依赖审查的改造建议。
voice: retro
content_lane: risk-postmortem
content_archetype: failure_postmortem
diversity_note: title_pattern_repeat_in_batch,recent_entity_saturation,recent_title_pattern_saturation
reach: 9
tags:
  - Claude Code
  - Codex CLI
  - AI Agent安全
  - 提示注入
  - 供应链安全
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 安全扫描为什么不能直接交给 AI Agent，Claude Code 和 Codex CLI 被远程执行攻击点名
wechat_title: Claude Code 和 Codex CLI 被远程执行攻击点名，安全扫描为什么不能直接交给 AI Agent
cover:
  status: skipped
recent_similarity: 0.047
reach_note: Claude Code、Codex、远程执行风险有强品牌和强利益点，读者能立刻检查自己的使用方式。
selection_reason: 这是当天最有行动价值的风险题，可以把安全新闻转化为开发者工作流的具体防线。
---

# 安全扫描为什么不能直接交给 AI Agent，Claude Code 和 Codex CLI 被远程执行攻击点名

如果你的审计流程里有一步是把第三方库交给 Claude Code 或 Codex CLI 自动检查，这次 Friendly Fire 值得单独放进团队复盘。

AI Now Institute 披露的 PoC 不是在说 Agent 会不会写错代码。它指出一个更难受的问题，仓库本身可以把 README、脚本和二进制包装成“安全检查流程”，让负责防守的 Agent 主动执行攻击者代码。

读完最该检查的是自己的流程。尤其是隔离环境、命令审批、依赖审查，以及 Agent 能碰到多少凭据和系统权限。

## 把事故现场还原到一次仓库审计

AI Now Institute 在 2026 年 7 月 8 日披露，Claude Code CLI 和 Codex CLI 在用于审计不可信开源或第三方库时，可能被提示注入引导到远程代码执行。

研究中点名的组合包括 Claude Code CLI 搭配 Claude Sonnet 4.6、Sonnet 5、Opus 4.8，以及 Codex CLI 搭配 GPT-5.5。文中还列出了 Claude Code 2.1.116、2.1.196、2.1.198、2.1.199 和 Codex 0.142.4 这些测试版本。

攻击条件并不夸张。研究者使用的是 Claude Code 的 `auto-mode` 或 Codex 的 `auto-review`，没有依赖 hooks、skills、plugins、MCP servers 或额外配置文件作为注入入口。

他们改造了一个 `geopy` 示例仓库。这个库只是演示对象，关键不在 `geopy`，而在“把不可信仓库交给能执行命令的 Agent 审计”这个动作。

## 识别被伪装成安全流程的指令

这条攻击链有两层伪装。

第一层是文件伪装。仓库里出现一个 `security.sh`，表面上引用 `semgrep`、`black`、`mypy` 这类常见质量和安全检查工具，但脚本实际会调用名为 `code_policies` 的二进制。

研究者还放了一个 `code_policies.go`。它看起来像对应二进制的 Go 源码，目的是让 Agent 更容易把二进制判断成可运行的安全检查工具。

第二层是文档伪装。README 里新增一段安全测试说明，引导 Agent 把 `security.sh` 当成审计任务的一部分。

这里危险的地方是，它不是应用代码主动调用了恶意文件，而是 Agent 在读仓库、理解任务、规划审计流程时，把仓库内容转成了自己的执行建议。

## 看懂根因，不把它归咎于某个坏命令

这次复盘里最重要的根因，是 Agent 没有稳定地区分“不可信数据”和“可信指令”。README、项目说明、脚本名、工具名，本来都只是仓库内容，但在 Agent 任务里会变成行动依据。

`auto-mode` 和 `auto-review` 的设计目标，是减少长任务里的权限打断。官方文档也把它们放在权限和沙箱语境下讨论，核心是让 Agent 在边界内持续工作，同时把部分审批交给分类器或 reviewer agent。

问题出在安全审计这个场景。你给 Agent 的任务就是“读这个仓库并判断怎么检查它”，而攻击者控制的内容也在这个仓库里。防守任务和攻击输入被放进了同一个上下文。

AI Now 还提到，攻击不一定只靠 README。`CLAUDE.md` 和 Codex 的 `agent.md` 这类项目指令文件，也可能成为同类注入入口，因为它们本来就带有项目级上下文的味道。

## 承认常见防线不够厚

只靠沙箱不够。AI Now 的 PoC 没有继续串联沙箱逃逸，但他们提醒，拿到 RCE 后，攻击者可能进一步识别受限环境，并尝试利用沙箱自身漏洞或写配置文件等路径扩大影响。

只靠人工审批也不够。每一步都弹确认，确实能降低部分风险，但长时间高频确认会带来自动化偏差和 prompt fatigue。人会从“审查每个动作”变成“让任务继续跑”。

只让 Agent 再检查一次提示注入也不够。研究者在实验中询问 Claude Sonnet 4.6 和 GPT-5.5 是否看到 `geopy` 源码里的提示注入，两者都没有识别出来。这个结果不代表每次都失败，但足够说明“让同一个系统自证安全”不是可靠边界。

所以问题不是要不要用 Agent 做安全工作，而是不能把 Agent 放在一个既读不可信输入、又能执行命令、还能接触关键环境的位置上。

## 把修复动作落到审计流程里

修复重点不在提示词，而在流程边界。

- 执行层，不在带真实密钥的开发机审计不可信仓库。把 Agent 放进一次性容器或虚拟机，只挂载待审代码和临时目录。
- 权限层，默认不给 SSH、云账号、包发布令牌和生产配置。需要联网时，只开放明确允许的域名和只读凭据。
- 命令层，shell 脚本、二进制执行、包管理器脚本、下载后执行这类动作进入人工审批，不让 Agent 自己判断它们“看起来安全”。
- 依赖层，自动升级后先做传统依赖审查和文件差异检查，再让 Agent 读仓库。README、AGENTS.md、CLAUDE.md、脚本目录和新增二进制都要当成输入风险。
- 流水线层，Agent 输出不能直接触发 CI/CD、发布和权限变更。进入流水线前要做净化和二次校验。

我认为最现实的改法，是把“Agent 安全审计”从开发机任务改成隔离作业。它可以读代码，可以给建议，可以生成补丁，但不能默认继承你的登录态、密钥和发布权限。

## 留一张事故卡片给团队

触发场景，Agent 审计第三方或开源库，且具备执行命令的能力。

攻击入口，README、项目指令文件、脚本和二进制被组合成看似正常的安全流程。

失效点，模型把不可信仓库内容当成可执行建议，自动审查层没有拦住。

常见误判，只问 Agent 有没有提示注入并不够，同一个上下文里的自检很容易漏掉伪装过的攻击链。

修复基线，未知仓库只进隔离环境，命令执行单独审批，凭据和网络按最小权限开放，自动流水线不直接消费未净化的 Agent 输出。

安全扫描当然可以用 Agent 加速，但别把“帮你审计代码的人”直接放到能改系统、跑二进制、读密钥的位置。越是自动化的防守流程，越要先把执行边界画窄。

## 相关链接

- AI Now Institute 原文, https://ainowinstitute.org/publications/friendly-fire-exploit-brief
- Friendly Fire PoC 仓库, https://github.com/Boyan-MILANOV/friendly-fire-ai-agent-exploit
- Codex Auto-review 文档, https://learn.chatgpt.com/docs/sandboxing/auto-review
- Claude Code 权限模式文档, https://code.claude.com/docs/en/permission-modes

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
