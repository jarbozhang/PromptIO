---
title: Agent 犯错以后，别急着往 AGENTS.md 里加规则
status: draft
date: '2026-06-21'
source: manual
source_url: https://x.com/dotey/status/2068231396015890449
angle: 把“AI 犯错就更新 AGENTS.md”的冲动拆成事故处理流程：先恢复、再找根因、最后决定是补测试、改 review、重构，还是沉淀项目约定。读者能拿它审视自己的技能文件和项目规则。
voice: first-person
reach: 8
tags:
  - Agent
  - AGENTS.md
  - AI工程
  - 代码审查
  - 软件工程
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Agent 犯错以后，别急着往 AGENTS.md 里加规则
wechat_title: ''
cover:
  status: skipped
reach_note: AGENTS.md、Codex 和工程事故处理都有明确读者利益点，适合收藏。
selection_reason: 中文一手讨论，观点具体，有利于补今天的工程方法论角度。
---

# Agent 犯错以后，别急着往 AGENTS.md 里加规则

Agent 写错代码以后，我最想做的动作以前也很直接，打开 AGENTS.md，再加一条规则。

现在我会先停一下。很多错误不是少了一条提醒，而是系统没有把它挡在正确位置。

这条判断适合正在用 Codex、Claude Code、Cursor 做项目交付的人。读完你可以拿它复盘一次 Agent 事故，把问题拆成恢复、根因、预防三步，而不是把 AGENTS.md 写成愿望清单。

## 先把现场救回来

程序出错，第一件事不是教育 Agent。

如果已经影响线上服务，先恢复生产。能回滚就回滚，需要热修就热修，目标是让用户路径先回来。

但恢复不等于把现场抹掉。日志、错误输入、失败任务、相关 diff，都要留住。不然你下一步只剩一句模糊的“它又写错了”。

我现在会把 Agent 事故先当成普通工程事故处理。它是不是 AI 写的，放到第二步再看。代码坏了就是代码坏了，先止血，再追原因。

## 把“它不听话”拆成根因

最容易误判的地方在这里。

Agent 犯错以后，我们很容易把原因归结成“它没记住规则”。但一个 bug 可能来自逻辑错误、边界条件没覆盖、需求理解偏差、架构约束太隐蔽，也可能只是 review 没拦住。

这些根因对应的解法完全不同。

如果是边界条件没覆盖，补 AGENTS.md 没有测试靠谱。下次它可能读了规则，也可能没把规则迁移到新路径里。测试会直接告诉它，这里不能坏。

如果是代码结构本身绕，Agent 每次都要跨五个文件猜隐含关系，那不是规则少，是架构在逼它猜。这个时候更该重构边界，让错误少发生在“理解上下文”的环节。

如果是 Code Review 没拦住，那也不是 AGENTS.md 的职责。该补的是 review checklist、关键路径 owner、或者合并前的自动检查。

## 决定要不要写进 AGENTS.md

AGENTS.md 不是垃圾桶，它更像项目约定的压缩包。

我会用这张清单判断要不要写进去。

- 适合写进 AGENTS.md，项目特有命名规则，目录放置约定，测试命令，提交规范，某些 API 的隐含限制
- 不适合写进 AGENTS.md，通用编程常识，某次 bug 的情绪复盘，应该由测试覆盖的边界，应该由 review 流程拦截的问题
- 需要先观察，重复出现但根因不明的问题，跨多个模块才暴露的隐性耦合，团队成员自己也说不清的约定
- 更好的交付形态，测试用例、lint 规则、类型约束、review 模板、重构任务、简短项目约定

判断标准很朴素，只有当错误根因是 Agent 缺少项目特有上下文时，AGENTS.md 才是合适位置。

比如项目有特殊目录结构，代码里看不出来。比如某个内部 API 有使用限制，但文档没写清。比如团队要求某类变更必须跑特定测试。这些才是规则文件该承载的东西。

## 别把规则文件写成保险柜

这里最容易踩坑。

很多人更新 AGENTS.md 的心态，是希望它下次别再犯。这个愿望正常，但文件越写越长，效果不一定更好。

规则太多会占上下文，也会稀释真正重要的几条。Agent 每次都背着一整包“不要做这个、记得做那个”，最后反而更容易忽略关键约束。

我认为 AGENTS.md 的好规则应该短、具体、能执行。

不要写“注意代码质量”。要写“修改 billing 模块后必须运行 npm test -- billing”。

不要写“不要破坏兼容性”。要写“public API 字段只能新增，删除字段需要迁移说明”。

不要写“遵守项目结构”。要写“React 页面放在 app/routes，复用组件放在 app/components”。

一条规则如果不能影响 Agent 的下一次具体动作，它大概率只是在安慰人。

## 给下一次事故留一张卡片

我建议每次 Agent 犯错后，只留一张很小的复盘卡。

- 发生了什么，哪条用户路径或哪段代码坏了
- 先怎么恢复，回滚、补丁还是禁用入口
- 根因是什么，逻辑、边界、需求、架构、review，还是项目约定缺失
- 防复发动作是什么，测试、流程、重构，还是更新 AGENTS.md
- 如果更新 AGENTS.md，只写一条能执行的项目规则

这张卡片比立刻加十条规则有用。

它会逼你承认一件事，Agent 犯错不一定是 Agent 的锅。很多时候，它只是把项目里原本含混、脆弱、没人写下来的地方放大了。

所以我现在看到 Agent 出错，第一反应不是打开 AGENTS.md。

我会先问，应该由哪一层系统来防住它。

如果答案是项目知识，再写进 AGENTS.md。如果答案是测试、review 或架构，就别让 AGENTS.md 替它们背锅。

## 相关链接

- X @dotey 原始观点，https://x.com/dotey/status/2068231396015890449
- OpenAI Codex 文档，https://developers.openai.com/codex
- Claude Code 文档，https://docs.anthropic.com/en/docs/claude-code
