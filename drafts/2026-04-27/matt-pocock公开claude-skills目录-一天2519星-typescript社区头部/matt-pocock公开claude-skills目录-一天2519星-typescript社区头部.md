# Matt Pocock 把自己每天用的 Claude Skills 全公开了，一天涨 2519 颗星

一天 2519 颗星。

这是 Matt Pocock 把自己 `.claude/` 目录里那一坨东西扔到 GitHub 上之后，第一个 24 小时的成绩单。仓库名简单粗暴，就叫 `mattpocock/skills`，副标题一句话，"Agent Skills For Real Engineers. Straight from my .claude directory."

翻译一下，"给真正写代码的人用的 Agent Skills，原封不动从我自己的 .claude 目录里掏出来给你"。

Matt Pocock 是谁，可能不写 TypeScript 的朋友会陌生。简单交代一下，他是 Total TypeScript 课程的作者，前 Vercel DevRel，TypeScript 圈子里教学视频播放量最高的那一档，属于"你写 TS 写到崩溃，搜索引擎搜出来的解法十有八九是他录的"那种角色。

所以这个仓库炸不是因为又一个无名氏开源了一堆 prompt，而是一个一线工程师 + 头部教育者，把自己每天工作流里真在用的东西原样公开了。

## 这事为什么值得停下来看一眼

最近半年 Claude Skills、Cursor Rules、各种 prompt 集合在 GitHub 上爆得很多，看多了你会麻。但绝大多数仓库有个共同问题，作者本人不是重度用户，是看到 Anthropic 出了 Skills 这个机制，赶紧整理一份发出来收 star。

Matt Pocock 这个仓库的差别在于，他自己就是这套东西的最大受益者。Total TypeScript 是一门要持续录课、写文档、维护代码示例的课程，他不是把 Claude 当玩具，是当生产力工具，每天跑。所以他公开的 skill 不是想象中"一个工程师可能会用的东西"，是真的在他工作流里跑了几个月、不好用的早就被删掉的版本。

对中国的独立开发者来说，这种"实战派工程师的 prompt 资产"是最稀缺的素材。比看十篇"Claude Skills 是什么"的科普有价值得多。

## 仓库里到底有什么，我挑几个最有意思的拆开看

整个仓库分了四类，加起来 16 个 skill。我看完之后觉得有几个特别值得说。

第一个是 **`to-prd`**。功能是"把当前对话上下文转成一份 PRD，然后直接提交成 GitHub issue"。这个动作本身不复杂，但它揭示了 Matt 的工作习惯，他先和 Claude 用对话方式把需求聊清楚，再让 skill 自动把对话压缩成结构化的 PRD 入库。聊天是发散的，PRD 是收敛的，中间这一步 AI 比人快得多，而且永远不会嫌麻烦。

第二个是 **`to-issues`**，把一份 spec 拆成多个"可以被独立认领"的 GitHub issue。这个细节很关键，"独立认领"四个字暗示他在团队协作里跑这个 skill，不是单打独斗。说明他对 issue 的颗粒度有要求，不能拆得太大让一个人卡死，也不能拆得太碎让 review 成本爆炸。

第三个是 **`grill-me`**，名字直译是"烤我"。功能描述是"高强度面谈式提问，逐一解决决策树上的分支"。我看到这个名字愣了一下，然后笑了。这就是一个反向思考的工具，不是让 AI 给你答案，是让 AI 不停追问你"这里你想清楚了吗，那里你还没决定"。Matt 把自己当被烤的那个。

第四个是 **`tdd`**。红绿重构循环，听起来老套，但能写进自己每天用的 skill 里说明他真的这么写。配套还有 **`triage-issue`**，定位 bug 然后用 TDD 的方式写一份"如何修复"的计划。这一组合起来基本上就是一个完整的 bug 修复流水线。

第五个是 **`git-guardrails-claude-code`**，"在执行过程中阻止危险的 git 命令"。一看就是踩过坑的人才会写的。Claude Code agent 跑在你本地，理论上是有可能跑出 `git push --force` 或者 `git reset --hard` 把你工作搞没的。Matt 用一个 skill 把这条路堵了。这种防御性编程的思路，比那些"教你十个炫酷用法"的内容实用一百倍。

最后一个我想提的是 **`obsidian-vault`**。管理 Obsidian 笔记，处理 wikilinks。这条揭示了他个人知识管理的底层栈，Obsidian 加 Claude，笔记不再是死的 markdown，是 agent 可以读写的活体数据库。

## 安装方式简单到有点意外

整个使用方式只有一行命令。

```
npx skills@latest add mattpocock/skills/<skill-name>
```

不用 fork，不用复制粘贴，npx 一下直接拉到本地 `.claude/skills/`。这背后用了一个叫 `skills` 的 npm 包做分发，本质就是把 GitHub 上的 skill 目录拉到你本地的 Claude 配置里。

我自己的判断，这种"用 npm 包做 skill 分发"的模式后面会成为标准。比起每个 repo 都写一份"如何安装"的 README，一行 npx 是降维打击。

## 中国独立开发者怎么抄作业

我想给三类朋友具体的建议。

**写 TS 或者前端的**，我认为可以直接全套抄走。Matt 的 stack 就是 TypeScript + Node + 现代前端那套，他的 skill 本来就是为这个生态写的。`tdd`、`triage-issue`、`migrate-to-shoehorn` 这几个，对你来说几乎是开箱即用。

**做独立产品的**，重点关注 `to-prd` 和 `to-issues`。独立开发者最大的痛点不是写代码慢，是产品方向反复横跳、需求散在各种聊天记录里。把对话转成结构化文档这个动作，AI 比你愿意做。

**带团队的**，看 `git-guardrails-claude-code` 和 `grill-me`。前者是给团队其他成员用 Claude Code 时兜底，后者是 code review 之前自己先 review 一遍设计的好工具。

至于不写 TS 的朋友，我也认为值得过一遍 README，不是为了 fork，是为了看一个一线工程师怎么把 LLM 嵌进每天的工作流。skill 的命名、颗粒度、覆盖范围，本身就是一份隐性的方法论。

## 一句话收尾

最让我有感触的不是 skill 本身，是 Matt 公开的勇气。

`.claude/` 目录里藏着的，是一个工程师怎么思考、怎么偷懒、怎么和 AI 协作的全部秘密。大多数人会觉得这是私货，舍不得拿出来。Matt 直接 git push origin main。

你的 `.claude/` 目录里有什么，敢公开吗。

## 相关链接

- 仓库地址，https://github.com/mattpocock/skills
- Total TypeScript 课程，https://www.totaltypescript.com
- Anthropic Claude Skills 文档，https://docs.claude.com/en/docs/agents-and-tools/agent-skills

---
相关实体:: Matt Pocock | [[claude-code|Claude Code]]
相关主题:: [[agent-frameworks|Agent框架]] | 工作流自动化

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
