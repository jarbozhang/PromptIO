# 55 个大厂的设计语言塞进一个文件，Claude Code 跑出来的前端再也没有 AI 味了

用 Claude Code 写前端，最怕的不是功能跑不通，是跑通之后一看，"嗯，AI 写的"。

按钮圆角太统一，配色像从 Tailwind 默认色板里随手捞的，间距不对但又说不上来哪里不对。你心里清楚这不是你想要的，但又懒得开 Figma 从零搞一套设计系统。

我最近发现了一个仓库，直接把这个问题干掉了。

## 一个 markdown 文件搞定设计规范

GitHub 上有个叫 awesome-design-md 的仓库（VoltAgent 出品，两天前还是 20K star，现在已经飙到 44K），做了一件很简单但很聪明的事，把 66 个知名品牌的设计语言，每个整理成一份 DESIGN.md 文件。

Apple、Stripe、Spotify、Linear、Vercel、Nike、Airbnb、Ferrari，全在里面。

这里说的不是品牌 logo 和 slogan，而是实打实的设计系统。配色的 hex 值和语义角色、字体层级表、按钮和卡片的各种状态样式、间距体系、阴影层级、响应式断点，甚至还有 Do's and Don'ts 列表。

每个品牌的 DESIGN.md 包含 9 个标准化章节，从视觉氛围到 Agent Prompt Guide。没错，最后一节专门写了给 AI agent 用的快捷提示词。

这个概念最早来自 Google Stitch，它定义了一种纯文本的设计系统格式，让 AI agent 能直接读懂。awesome-design-md 把这个概念做到了极致，从真实网站里提取设计 token，整理成 LLM 最擅长处理的 markdown 格式。

## 用法简单到不需要教程

两步。

第一步，复制你喜欢的品牌的 DESIGN.md 到项目根目录。也可以用命令行

```
npx getdesign@latest add stripe
```

第二步，告诉 Claude Code "参考 DESIGN.md 来写 UI"。

没了。

我认为这里的关键洞察是，LLM 不需要 Figma 文件，不需要 design token 的 JSON schema，它只需要一份写得好的 markdown。Markdown 是大模型读得最好的格式，所以不需要任何解析和配置。

## 我跑了几个 case，下限确实被拉高了

坦率讲，我一开始是怀疑的。一个 markdown 文件能有多大差别？

试了之后发现，差别主要不在上限，而在下限。

没有 DESIGN.md 的时候，Claude Code 写出来的页面像一个什么都会但没有审美偏好的实习生作品，功能全有，但视觉上缺乏性格。加上 DESIGN.md 之后，配色不再是随机的，间距有了节奏感，组件的视觉权重分配合理了。

用 Stripe 的 DESIGN.md 跑了一个支付页面，紫色渐变、weight-300 的字体、卡片的阴影层级，这些细节你自己可能要花半天调，现在 Claude Code 一次就给对了。

用 Linear 的跑了一个项目管理界面，那种极简到骨子里的精准感，紫色点缀恰到好处，确实像是 Linear 团队做出来的。

这不是玄学。当你给 AI 一份明确的设计约束，它就不会在"无数种还行的选择"里随机挑一个。它会在一个被验证过的设计空间里工作。

## 但这不是银弹

说实话我也在摸索这个工具的边界。

几个发现。混搭不太行，你不能把 Stripe 的配色和 Apple 的布局拼在一起，出来的东西会很割裂。每个 DESIGN.md 是一个完整的设计哲学，拆开用效果大打折扣。

另外，如果你的产品需要独特的品牌识别，直接套别人的设计语言不是长久之计。这个工具更适合两种场景，一是快速原型和 MVP，你需要"好看但不需要独一无二"；二是内部工具和 dashboard，没人在意它长得像不像 Linear，好用就行。

社区里有人提了一个很好的问题，如果所有人都用这些 DESIGN.md，会不会出现新的"千篇一律"？从纯文本的 AI 味，变成"每个 SaaS 看起来都像 Stripe"的设计同质化？

我觉得短期内不用担心。66 个品牌风格足够多样，而且大部分开发者的痛点还是"太丑"而不是"太像别人"。

## 我的判断

我认为 DESIGN.md 这个概念比这个仓库本身更重要。

Google Stitch 定义了 AGENTS.md（告诉 AI 怎么构建项目）和 DESIGN.md（告诉 AI 项目该长什么样）。如果这两个文件成为标准，AI 辅助开发的前端品质会整体跃升一个台阶。

反正我觉得，以后新项目的第一件事可能不是 `npm init`，而是选一份 DESIGN.md。

## 相关链接

- awesome-design-md 仓库 https://github.com/VoltAgent/awesome-design-md
- Google Stitch DESIGN.md 格式说明 https://stitch.withgoogle.com/docs/design-md/overview/
- 一键添加命令 `npx getdesign@latest add <brand>`

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
