---
title: Hermes Agent 最新版怎么用：先跑通一个会持续成长的个人智能体
status: draft
date: '2026-07-16'
source: manual
source_url: https://github.com/NousResearch/hermes-agent
angle: 从 7 月 15 日最新提交切入，按仓库 README 跑通一个最小任务，再通过版本差异梳理它解决的问题、新增能力、对 openclaw 用户的启发和升级路径。
voice: first-person
content_lane: version-update
content_archetype: version_brief
diversity_note: recent_entity_saturation,recent_title_pattern_saturation
reach: 9
tags:
  - Hermes Agent
  - NousResearch
  - 个人智能体
  - 版本更新
  - OpenClaw
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Hermes Agent 最新版怎么用：先跑通一个会持续成长的个人智能体
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.078
reach_note: NousResearch 与 openclaw 生态自带关注度，新版能力有明确收益，读者可直接从 GitHub 安装验证。
selection_reason: Hermes Agent 是本号重点生态项目，最新提交活跃且已有较大采用规模，适合做一篇兼顾版本变化与实际入口的更新解读。
---

# Hermes Agent 最新版怎么用：先跑通一个会持续成长的个人智能体

7 月 15 日，Hermes Agent 仓库又有一次 push。对正在把 Agent 用于资料整理、代码阅读和长期个人工作流的人，真正有用的信号不是代码又动了，而是重复任务能不能少等、少塞上下文、少从头交代。

我建议把关注点压到一个当天就能完成的验证。安装后只让它读取测试仓库的 README，提取项目约束和证据位置，同时禁止修改文件。

这项小任务可以检查环境、读取工具和结果可追溯性。跑稳以后，再验证它能否把纠正和偏好带进下一次任务。

## 把提交日期和版本号分开看

GitHub 快照显示，仓库最近一次 push 是 2026 年 7 月 15 日，主要语言为 Python，已有 215440 个 star 和 40176 个 fork。这能确认项目仍在快速推进，却不能把当天的代码活动直接当成正式版本发布。

目前可核对的版本锚点是 v0.18.0，对应 `v2026.7.1`。准备验证时，我会同时记下 release tag 和实际安装版本，避免把主分支后续变化混进结果。

| 仓库信号 | 可以确认 | 不能直接推出 |
| --- | --- | --- |
| 7 月 15 日最新 push | 主分支仍在更新 | 当天发布了新版本 |
| v0.18.0 release | 有明确的版本差异入口 | 后续提交都已进入安装包 |
| 21 万多个 star | 项目关注度很高 | 每项能力都适合稳定交付 |

## 抓住 v0.18.0 省掉的环节

旧的网页读取链路会在页面较长时调用辅助模型生成摘要。等待时间和 token 花在了材料搬运上，原文中间的细节还可能被压掉。

v0.18.0 把 `web_extract` 改成 truncate-and-store。提取后得到的干净 Markdown 可以直接交给 Agent，内容过长时保留头尾预览，把全文存入缓存，并给出 `read_file` 回读入口。

| 旧问题 | 新版本改法 | 可用能力 |
| --- | --- | --- |
| 长页面再经过一次模型摘要 | 直接返回提取后的干净内容 | 减少一次模型往返 |
| 全文挤占主对话上下文 | 超长内容写入缓存 | 按需读取具体段落 |
| 多个 URL 依次等待 | URL reference 支持并发展开 | 更适合多文档任务 |

我认为这项更新对 OpenClaw 用户也有直接启发。搜索、正文提取、全文保存和证据回读应该是四个独立动作，主对话只接收当前判断需要的材料。

## 把成长能力放进重复任务

Hermes Agent 的 README 把长期使用落在 skills、memory、历史会话搜索和用户模型上。它强调从经验创建技能、在使用中改进技能，并跨会话保留知识。

这些能力不能靠第一轮回答验证。第一次只负责建立基线，第二次加入一条明确纠正，第三次才观察相似任务是否少了一次重复说明，同时没有把规则错误带进无关任务。

这也是我判断个人智能体是否值得长期保留的标准。成长不是记住更多聊天，而是重复教学成本下降，并且保存下来的内容仍然可检查、可修正。

## 按 README 跑通第一个任务

README 为 Linux、macOS、WSL2 和 Termux 提供了快速安装路径。最小启动链路可以保持在下面几条命令内。

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
hermes setup
hermes model
hermes doctor
hermes
```

进入交互后，把任务限定为「读取当前目录的 README，列出三条项目约束和对应依据，不修改任何文件」。测试目录不要放敏感材料，也不要接入消息入口或定时任务。

验收只看三个结果。`hermes doctor` 没有关键错误，回答能够指回 README 的具体依据，运行 `git diff --exit-code` 后目录仍保持干净。

## 按现有工作流决定是否跟进

已经使用 Hermes Agent，并且经常读取长网页或多个文档的人，适合固定现有版本后对比 v0.18.0。重点观察等待、上下文占用和证据回读，而不是只比较最终答案措辞。

OpenClaw 用户可以先运行 `hermes claw migrate --dry-run` 查看迁移预览，核对 memories、skills、允许列表和消息配置，再决定是否处理真实工作区。只需要偶尔问答的人，则不必为了长期记忆和更新节奏立即迁移。

给测试仓库留一份干净副本，记下版本点，跑完那项只读任务。结果可追溯且目录无改动后，再带着一条纠正重复执行，Hermes 是否真的会持续成长，就从第二次任务开始看。

## 相关链接

- [Hermes Agent GitHub 仓库](https://github.com/NousResearch/hermes-agent)
- [Hermes Agent v0.18.0 版本记录](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.1)
- [Hermes Agent README](https://github.com/NousResearch/hermes-agent#readme)
- [Hermes Agent 提交记录](https://github.com/NousResearch/hermes-agent/commits/main)
- [Hermes Agent 官方文档](https://hermes-agent.nousresearch.com/docs)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
