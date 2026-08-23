---
title: OpenAI 的长任务 Codex 用法，怎么让项目不死在一次 prompt 里
status: draft
date: '2026-07-03'
source: manual
source_url: https://openai.com/index/daybreak-securing-the-world
angle: 把 OpenAI 官方案例改写成长期项目管理方法：如何保存上下文、拆任务、交接进度，让读者能把一次性问答升级成可持续推进的开发流程。
voice: first-person
content_lane: developer-tooling
content_archetype: hands_on_recipe
diversity_note: >-
  same_entity_in_batch,title_pattern_repeat_in_batch,agent_like_daily_cap,recent_entity_saturation,recent_title_pattern_saturation
reach: 8
tags:
  - OpenAI
  - Codex
  - 开发工作流
  - Agent
  - 项目管理
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: OpenAI 的长任务 Codex 用法，怎么让项目不死在一次 prompt 里
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.026
reach_note: OpenAI 和 Codex 品牌强，长任务不中断是明确利益点，读者能直接照着改流程。
selection_reason: 这是官方来源且实操性强，适合做成高收藏的开发者工作法，但不会让当天清单型内容超量。
---

# OpenAI 的长任务 Codex 用法，怎么让项目不死在一次 prompt 里

很多人把 Codex 当成一次性问答工具，所以项目一长，就开始丢上下文、补丁跑偏、交接失真。

我现在更愿意把它当成一个长期项目执行器。关键不是把 prompt 写长，而是把目标、验证、上下文和交接拆开管。

这套方法适合改老模块、补测试、做安全修复、整理文档，或者把一个 PR 从想法推进到可 review 的状态。

OpenAI 在 Daybreak 里给了一个很好的工程信号。漏洞发现不是终点，验证影响、生成补丁、跑测试、留下证据，才是后半程。Codex Security 的工作流也围绕这条线展开，扫描、评估、验证、修复、导出追踪。

我把这个逻辑拿到日常开发里用，得到的结论很简单。长任务不要交给一次 prompt，交给一条能接力的工作线。

## 选一个不会散架的最小场景

不要从重构整个系统开始。Codex 文档里也建议把复杂工作拆成更小、更聚焦的步骤，因为小任务更容易测试，也更容易 review。

我会选这种粒度。

- 一个能复现的 bug
- 一个边界清楚的模块改造
- 一个可单独验收的测试补齐
- 一段文档更新，要求链接和示例可检查
- 一次安全扫描后的单个修复点

最小场景的判断标准不是工作量小，而是验收清楚。比如修复设置页保存失败，比优化设置体验更适合交给 Codex。前者能给复现路径、相关文件、不能改 API 的约束和回归测试要求，后者容易把 agent 带进审美散步。

我的起手 prompt 通常只放四件事，任务、范围、约束、验收。路径能写具体就写具体，CLI 里可以用 @ 提到文件，IDE 里可以把打开文件和选中代码带进线程。

## 把一次 prompt 改成一条工作线

Codex 的线程不是只能问一次。官方文档里，线程可以包含多个 prompt，也可以之后继续恢复。长任务真正要利用的是这个特性。

我会把一条工作线切成四段。

1. 让 Codex 读代码并出计划，计划必须列文件、里程碑和回滚方式
2. 人先改计划，不满意就继续追问，不急着动代码
3. 只让它实现第一个里程碑，并要求运行最小相关检查
4. 看 diff 和测试结果，再决定继续、改方向或暂停

如果目标很清楚，可以用 `/goal`。它适合多步骤任务，因为目标文本会同时变成起始指令和完成条件。目标不好定义时，我更倾向先用 `/plan` 把验收标准磨出来。

这里的反常识是，长任务不是更需要信任 agent，而是更需要中途卡点。每个里程碑都要留下可读 diff、命令结果和下一步判断，不然下一轮 prompt 只是把混乱继续放大。

## 用交接卡保住上下文

Codex 会在工作中收集文件内容、工具输出、已经做过什么和还要做什么。任务变长后，文档写到它可能自动压缩上下文，用摘要保留相关信息并丢掉不那么相关的部分。

这能帮它继续做复杂任务，但我不会把项目记忆完全交给自动压缩。我的做法是每个阶段都让 Codex 生成一张交接卡。

- 当前目标，正在解决哪个具体问题
- 已改文件，为什么改
- 已运行命令，结果是什么
- 未解决问题，卡在哪里
- 下一条 prompt，直接复制就能继续
- 风险点，哪些地方必须人工看 diff

这张卡可以放在 issue、PR 描述、临时 markdown，或者直接留在线程里。它的价值不是好看，而是让下一轮 Codex 不用重新猜项目状态。

团队规则不要只放在线程里。Codex 的 customization 文档把 `AGENTS.md` 放在持久项目指导的位置，适合写构建命令、测试命令、review 期望和目录规则。Memories 可以带走一些偏好和反复出现的坑，但团队必须遵守的规则，还是应该进仓库文档或 `AGENTS.md`。

## 用验收标准拦住跑偏

OpenAI 在 Codex 提示文档里反复强调验证。要让 Codex 输出更好，就要给复现步骤、功能验证、lint 和 pre-commit 之类的检查。

我的验收标准会写得很土，但很有效。

- bug 修复，重新跑复现步骤，说明修复前后差异
- 测试补齐，只跑最小相关测试，再说明是否需要全量测试
- 重构任务，保持公共 API 稳定，不改用户可见行为
- UI 任务，启动 dev server，给出本地 route，并检查移动端
- 文档任务，读一遍渲染结果，确认链接有效

不要只写把这个做好。Codex 需要知道什么叫完成。尤其是 cloud 任务，官方 workflow 里也建议先本地规划，再把长实现交给 cloud，并且在 cloud diff 里继续 review 和迭代。

## 常见坑别留到最后处理

我最想避开的坑有四个。

一个是让两个线程改同一批文件。Codex 文档明确提醒可以并行跑多个线程，但要避免两个线程同时改相同文件。这个坑很隐蔽，最后经常变成合并冲突和重复实现。

一个是把计划当成执行结果。计划只说明 agent 理解了问题，不说明它已经避开边界。计划阶段要逼它讲清楚哪些文件会动、哪些行为不动、失败后怎么退回。

一个是把记忆当成团队制度。Memories 默认关闭，开启后也更适合作为本地回忆层。稳定规则要放到 `AGENTS.md`、测试、lint、hook 这类可重复执行的位置。

还有一个是没有交接就暂停。长任务暂停本身不可怕，可怕的是下次回来只剩一句继续。我的固定动作是让 Codex 在暂停前输出交接卡，再让它把下一条 prompt 写好。

## 我的判断，长任务靠验收，不靠长 prompt

Daybreak 给我的启发不是安全工具多强，而是 OpenAI 把 agent 的价值从发现问题推到了落地修复。日常开发也一样，真正省时间的不是让 Codex 一次写更多代码，而是让它持续推进、持续验证、持续留下证据。

拿一个积压的小 bug 试就够了。写清复现路径和验收标准，让 Codex 出计划，只做第一个里程碑，结束前生成交接卡。你会很快发现，项目不死在一次 prompt 里，靠的不是更会提问，而是终于把 agent 当成一个要交接的工程同事。

## 相关链接

- [OpenAI Daybreak](https://openai.com/index/daybreak-securing-the-world/)
- [Codex Prompting](https://developers.openai.com/codex/prompting)
- [Codex Workflows](https://developers.openai.com/codex/workflows)
- [Codex Memories](https://developers.openai.com/codex/memories)
- [Codex Customization](https://developers.openai.com/codex/concepts/customization)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
