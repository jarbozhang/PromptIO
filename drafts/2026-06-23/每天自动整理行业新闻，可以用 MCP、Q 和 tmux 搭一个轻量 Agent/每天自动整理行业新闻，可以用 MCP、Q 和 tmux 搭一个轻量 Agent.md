---
title: 每天自动整理行业新闻，可以用 MCP、Q 和 tmux 搭一个轻量 Agent
status: draft
date: '2026-06-23'
source: manual
source_url: https://eugeneyan.com//writing/news-agents/
angle: >-
  把 News Agents for Daily News Recaps 的思路改写成个人可落地的自动化流程：输入源、抓取、摘要、人工复核、归档。重点是让读者收藏一套每日新闻 Agent
  的最小架构。
voice: first-person
content_lane: developer-tooling
content_archetype: hands_on_recipe
diversity_note: >-
  lane_repeat:developer-tooling,archetype_repeat:hands_on_recipe,same_entity_in_batch,title_pattern_repeat_in_batch,checklist_daily_cap,recent_entity_saturation,recent_title_pattern_saturation
reach: 8
tags:
  - MCP
  - Agent
  - Amazon Q
  - tmux
  - 自动化工作流
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 每天自动整理行业新闻，可以用 MCP、Q 和 tmux 搭一个轻量 Agent
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.04
reach_note: 内容运营、研究员、投资和产品团队都有每日信息整理需求，MCP 和 tmux 组合有实操感。
selection_reason: 它直接命中用户当前的文章生成工作流，也容易引发收藏。
---

# 每天自动整理行业新闻，可以用 MCP、Q 和 tmux 搭一个轻量 Agent

每天看技术新闻，最浪费时间的往往不是读，而是筛。Eugene Yan 做的 News Agents 给了我一个很适合个人复用的骨架，用 MCP 把新闻源变成工具，用 Amazon Q CLI 负责调度，用 tmux 把子任务摊开看。

我最想收藏的不是那段演示，而是一套每日新闻 Agent 的最小架构。输入源、抓取、摘要、人工复核、归档，五个环节都清楚，才不会变成又一个自动生成噪音的脚本。

如果你每天要追 AI、工程、市场或竞品信息，这套流程可以先不做网页、不做自动发布，只产出一份可复核的 markdown 日报。能跑通这一步，后面再接团队知识库、周报、研究备忘录都顺很多。

## 把每日简报缩成一个最小场景

我会先把目标压到一句话，每天从固定 RSS 源抓取新闻，生成一份人工可复核的 `main-summary.md`。

源文章里的结构很朴素。主 Agent 读取 `feeds.txt`，把新闻源切成 3 组，再在 tmux 里拉起 3 个子 Agent。每个子 Agent 只处理自己那一组，完成后把摘要写到 `summaries/`，最后主 Agent 汇总成一份日报。

个人版不需要一开始就塞满来源。我更建议从 3 到 6 个稳定 RSS 源开始，每个源都写清楚名称、URL、主题和优先级。

可收藏的最小架构可以这样定。

- 输入源，`feeds.txt` 保存固定 RSS，先选能稳定返回结构化内容的来源
- 抓取层，MCP tool 负责拉取、解析、格式化，不让主 Agent 直接处理原始混乱文本
- 摘要层，子 Agent 按来源生成单独摘要，避免所有信息糊成一锅
- 复核层，人只看候选主题、代表标题、异常来源和缺失项
- 归档层，最终写入 `main-summary.md`，同时保留每个来源的中间摘要

这个设计的好处是，失败点很容易定位。今天摘要质量差，到底是 RSS 抓取失败、parser 没读对字段，还是模型把分类做散了，一眼能拆开看。

## 让 Q 调度任务，让 MCP 交付新闻工具

这套方案里，Amazon Q CLI 更像调度器，MCP 更像工具箱。

源文章里的 MCP server 会给不同新闻源各自准备 reader、parser 和 formatter。原因很现实，每个 RSS 的字段和内容结构都不完全一样，硬用一个通用解析器，前期省事，后面排错会很痛苦。

MCP 的工具注册方式也比较直接，作者用 `@mcp.tool()` 把抓取某个来源的函数暴露给 Agent。Q 看到这些工具后，就能按任务调用，例如获取某个来源的故事、读取文件、写文件或执行只读命令。

我会把操作路径拆成四步。

1. 准备 `feeds.txt`，每行一个来源，名称要短，后面会出现在摘要里
2. 为每类来源写独立 MCP tool，至少返回标题、链接、摘要、发布时间
3. 写主 Agent 指令，让它读取来源、分组、启动子 Agent、等待完成、汇总结果
4. 写子 Agent 指令，让它逐个处理来源，把中间结果写入 `summaries/`

tmux 在这里不是装饰。它让你看到每个子 Agent 的状态，哪个卡住、哪个完成、哪个报错，不用在一坨日志里猜。

## 把人工复核嵌进流水线

我不会让这个 Agent 直接发布日报。新闻摘要最危险的地方，不是慢，而是把没读懂的内容讲得很确定。

更稳的做法是，把人工复核设计成默认步骤。Agent 负责把信息压缩成候选稿，人负责判断哪些值得保留、哪些标题过度概括、哪些来源需要回看原文。

复核时我会看四类东西。

- 来源是否完整，今天该出现的来源有没有缺失
- 时间范围是否正常，不要把旧内容混进当天简报
- 分类是否有用，例如 AI、工程、商业、政策、隐私，而不是十几个互相重叠的小类
- 代表标题是否能支撑趋势判断，不能只靠模型自己概括

源文章给出的 2025 年 5 月 4 日样例里，6 个来源合计 124 条，覆盖 2025 年 5 月 2 日到 4 日，并识别出 42 个类别。这个数字本身不用照抄，但它提醒我，日报应该有统计、日期范围、类别分布和跨来源主题，而不只是标题列表。

## 用验收标准防止它变成新闻噪音

一个每日新闻 Agent 跑起来不难，难的是每天都值得打开。

我会给第一版设四个验收标准。

- `summaries/` 里每个来源都有单独文件，方便回查
- `main-summary.md` 有日期范围、来源数量、总条目数、类别分布
- 跨来源主题要能说明哪些话题在多个来源同时出现
- tmux 里能看到子 Agent 完成状态，失败任务不能静默消失

只要这四条没做到，就别急着扩来源。扩得越快，噪音越多，复核成本也越高。

我认为这类 Agent 最适合做成个人信息收件箱，而不是新闻写作机器。它帮你把原料摊平、分组、压缩，人再决定怎么引用、怎么判断、怎么归档。

## 常见坑别留到最后处理

第一个坑是把 RSS 当成统一格式。源文章专门给每个来源做 reader、parser、formatter，这个选择很工程化，也很必要。不同来源的字段缺失、摘要长度、发布时间格式都可能不一样，早拆开，后面少返工。

第二个坑是过早做成网页应用。作者原本想把它托管成 web app，也提到远程 MCP 并不轻松，尤其只有周末几个小时可折腾时。个人工作流先本地跑，把日报稳定产出，比先做界面更值。

第三个坑是工具权限太松。源文章的演示命令里有信任工具的启动方式，但放到自己的机器上，我会把写文件、执行命令、读取目录这些权限单独检查。新闻 Agent 不需要拥有所有权限。

第四个坑是没有归档规则。每天一份 `main-summary.md` 很快会堆起来，我会按日期目录保存，并保留中间摘要。之后要回看某个主题，才知道它从哪个来源、哪一天开始出现。

把这套流程跑起来，真正的收获不是一份日报，而是一个可复用的 Agent 模式。固定输入，工具化抓取，分工处理，人类复核，最后归档。

从一个主题开始就够了。比如只追 AI 工程新闻，选 3 个稳定 RSS，跑一周，看你是否真的愿意每天打开它。如果愿意，再加来源、加模板、加团队归档。

## 相关链接

- [Eugene Yan 原文](https://eugeneyan.com/writing/news-agents/)
- [news-agents GitHub 仓库](https://github.com/eugeneyan/news-agents)
- [Amazon Q CLI 文档](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/command-line.html)
- [Model Context Protocol 文档](https://modelcontextprotocol.io/)
- [tmux 项目](https://github.com/tmux/tmux)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
