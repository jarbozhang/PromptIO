# Matt Pocock 把自己 .claude/skills 目录开源了，一天涨 3886 星，能直接拿来抄

今天早上刷 GitHub Trending，我又看到 Matt Pocock 的名字。这次是 mattpocock/skills 仓库，单日新增 3886 星，总数已经压到 74.5k。README 第一句写得很直接，"Skills for Real Engineers. Straight from my .claude directory."

我盯着这句话愣了一会儿。这个月我已经写过三篇 skills 主题，addyosmani 的社区聚合版、Anthropic 官方的四仓库齐发、现在轮到 KOL 个人工作流公开版。三套放在一起对照看，国内 Claude Code 用户该抄哪套，其实结论清晰了。

## 先把"三套 skills"理一下

addyosmani/agent-skills 是 5 月 10 日我写过的那篇。Google Chrome 那位 Addy Osmani 把他多年积累的 production engineering 经验整理成 skill 集合，定位偏 "工程师该懂的系统知识"，从架构评审、性能分析到稳定性兜底，三千多星拿在手里。

anthropics/skills 是官方版，5 月 11 日和 financial-services、courses、claude-cookbooks 四仓库一起进 Trending。官方版给的是 SKILL.md 规范、四个文档处理 skill（docx/pdf/pptx/xlsx）的源码、以及一套"skill 应该长什么样"的标准答案。

mattpocock/skills 就是今天这个。Matt 自己每天用的 .claude 目录原样开源，74.5k 星里相当一部分是这一波新涨的。和官方版最大的区别在于，它不是范本，是一个真实工程师的日常配置。

## Matt 把哪些 skill 公开出来了

仓库 skills/ 目录里大概分三大类。我挑出几个我自己想抄的。

工程类有 diagnose，给硬 bug 和性能问题一套规范化的诊断循环。tdd 走红绿重构。grill-with-docs 是一种"质询会议"，agent 反过来 grill 你，把领域模型聊清楚再写代码。to-prd 把对话整理成 PRD，to-issues 把 PRD 拆成独立的 GitHub issue。zoom-out 强制 agent 把当前任务放回更大的系统上下文里再决定怎么改。

生产力类里那个 caveman 我看到时直接笑了。Matt 给它的定位是"压缩通信模式"，号称能省 75% 的 token，做法就是逼着 agent 用石器人语气说话，少说废话、不写客气话。grill-me 是 grill-with-docs 的人类版，agent 反复问你一百个问题直到把计划吃透。handoff 是给协作场景的，让 agent 写一份交接文档给下一个 agent。

杂项里 git-guardrails-claude-code 是阻断危险 git 命令的护栏，setup-pre-commit 配 Husky 钩子。最关键的是 write-a-skill，告诉 agent 怎么写一个新 skill，skill 自我繁殖。

整套读下来，风格是统一的，小、利落、可组合、命名一眼看懂用途。没有任何一个 skill 试图做全的事。

## 社区已经在用脚投票

last30days 拉到一条 Reddit 帖子，标题挺刺眼。r/ClaudeAI 4 月 26 日，"I deleted most of my Claude skills last week. Here's what I actually learned."

楼主原话，"过去几个月我堆了一堆 skill，包括 Superpowers 那种全家桶。结果 Claude 变慢、变迟钝、上下文糊成一团。我把大部分删了，换成 mattpocock/skills，它走的是相反哲学，小、锐、命名清晰的原子单元。我的环境快了，我也终于看懂自己装了什么。"

20 条评论里基本都是同感。一个高赞回复说他原来装了 14 个 skill，砍到 5 个之后 agent 的响应质量反而上来了。

r/hermesagent 4 月 29 日还有一条，"Matt Pocock's skills repo + Hermes sub-agents for feature work"，楼主把 Matt 的 to-prd 和 to-issues 拆成 Hermes 子代理跑，每一步用 deepseek 接一下。这种组合用法说明 Matt 的 skill 颗粒度刚好适合做子代理的粘合层。

## 国内 Claude Code 用户该抄哪套

我给三种典型场景分别推一个。

**场景一，你刚装完 Claude Code 不知道该写什么 skill。**

抄 mattpocock/skills，不要抄 addyosmani，更不要直接读 anthropics/skills 的 spec。Matt 的目录是"一个真实工程师每天会用到什么"，可以原样把 skills/caveman、skills/diagnose、skills/tdd 这三个先复制过去，跑两周，再决定要不要加。Addy 的版本偏体系化，对纯新手来说门槛高一些。

**场景二，你团队要建一套统一的 skill 规范。**

读 anthropics/skills，重点看 docx/pdf/pptx/xlsx 那四个 skill 的源码。这是 Anthropic 自家生产环境跑的真东西，SKILL.md 的 frontmatter、description 怎么写、什么时候该拆成 sub-skill，看这四份比看十份教程都管用。

**场景三，你想做 production-grade 的工程兜底。**

抄 addyosmani/agent-skills。Matt 的 skill 主要服务个人开发流，Addy 的 skill 涵盖更多"上生产之前要过哪些关卡"，性能、稳定性、可观测性、安全审计都覆盖。

如果你三种场景都占一点，我的建议是 Matt 打底（每天高频），Anthropic 当规范（要写新 skill 时翻），Addy 当深水区参考（重大变更前看一遍）。

## 我从 Matt 这套抄到的方法论

不是 skill 本身，是命名。

我看 Matt 这套最大的收获是，每个 skill 的名字都像一个动词短语，diagnose、grill-me、handoff、zoom-out、caveman。这些名字让 agent 一看就知道什么场景该调用，触发条件几乎不用写。

对比一下我自己之前写的 skill，叫 "claude-code-debug-helper" 这种五个词的复合名，agent 经常不触发。Matt 的命名学走的是 Unix 哲学，一个 skill 做一件事，名字就是那件事。

第二个收获是 caveman。我没想到"逼 agent 用最短句子回答"会被当成一个独立 skill。但仔细想想，token 省 75% 这件事如果做成 skill 而不是塞在 CLAUDE.md 里，agent 可以在适合的场景自己挂载。这种把"风格"也抽成 skill 的思路，国内大部分文档站都没讲过。

## 你今天能动手的

```
git clone https://github.com/mattpocock/skills
```

clone 完先读 skills/caveman/SKILL.md，再读 skills/diagnose/SKILL.md，最后翻 skills/write-a-skill/SKILL.md。这三份从短到长，把 Matt 整套设计哲学读一遍只要 15 分钟。

读完挑两到三个最对你胃口的 skill 复制进你的 ~/.claude/skills/，删掉一切你看不懂或者目前用不到的。砍光比堆满重要。

最后一个开放问题，国内有没有 KOL 愿意把自己 ~/.claude/ 整个开源出来。我赌不出半年会有人做，先押一下。

## 相关链接

- mattpocock/skills, https://github.com/mattpocock/skills
- Reddit "I deleted most of my Claude skills" 帖子, https://www.reddit.com/r/ClaudeAI/comments/1sw6rss/
- Hermes 子代理组合用法, https://www.reddit.com/r/hermesagent/comments/1sz4px1/
- 上篇对照, anthropics/skills 四仓库齐发（5 月 11 日）
- 上上篇对照, addyosmani/agent-skills 3009 星（5 月 10 日）

---
相关实体:: [[mattpocock-skills|Matt Pocock Skills]] | [[matt-pocock|Matt Pocock]] | [[claude-code|Claude Code]]
相关主题:: [[ai-coding-tools|AI 编程工具]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
