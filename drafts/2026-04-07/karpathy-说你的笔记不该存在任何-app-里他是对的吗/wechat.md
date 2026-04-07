---
title: "Karpathy 说你的笔记不该存在任何 App 里，他是对的吗？"
source_url: 'https://x.com/karpathy/status/2040572272944324650'
score: 9.4
scoring_reason: Karpathy个人AI知识库设计哲学
status: draft
platform: wechat
tags:
  - Karpathy
  - 知识管理
  - File over App
  - 个人AI
created_at: '2026-04-07'
generated_by: claude-opus-4-6
---

好的 boss，写作规范已读完。这是一个"现象解读型"文章，Karpathy 提出的 File over App 哲学。我来按规范写。

# Karpathy 说你的笔记不该存在任何 App 里，他是对的吗？

上周 Karpathy 发了条推，8480 个赞，评论区炸了。

他转发了一个叫 Farzapedia 的项目，一个人用纯文本文件搭了自己的"个人 Wikipedia"。Karpathy 说，这才是知识管理该有的样子，然后甩出四个原则。

我看完愣了几秒。因为他说的每一条，都在否定我过去三年用 Notion、Obsidian、各种"第二大脑"工具的逻辑。

## 四个原则，条条扎心

第一条，Explicit。你的知识必须是可见的、可管理的。不是藏在某个 App 的数据库里，打开才能看，导出还得折腾半天。

第二条，Yours。数据在你本地，不在别人的服务器上。你的笔记不该是某家公司的人质。

第三条，File over App。用通用文件格式，Markdown、纯文本、JSON，不要被任何专有格式锁定。App 会死，文件不会。

第四条，BYOAI，Bring Your Own AI。你的知识库可以接入任何 AI，而不是被绑定在某个 App 内置的"AI 助手"上。

坦率讲，前两条大家都能点头。第三条开始就让人不舒服了。

## "App 会死，文件不会"

这句话是 Karpathy 整个哲学的核心。

你想想看，十年前你用 Evernote 记的笔记，现在还能顺畅访问吗？五年前你往 Notion 里灌的几百页文档，如果 Notion 明天倒闭，你能完整导出多少？

我自己就踩过这个坑。2023 年从一个笔记 App 迁移到 Obsidian，导出的 Markdown 里一堆私有语法标记，花了整整两个周末手动清理。那一刻我就明白了一件事，你以为你在用 App 管理知识，其实是 App 在管理你。

但 Karpathy 的意思比这更激进。他不是说"选一个好 App"，他是说"别选 App"。用最朴素的文件系统，Markdown 文件扔在文件夹里，用任何编辑器都能打开。

这听起来像退回到 2005 年。

## 真正让我停下来想的，是"idea file"

Karpathy 在讨论中提到一个概念，让我反复咀嚼了很久。

他说未来分享知识的方式不是分享代码，而是分享 idea file。你把你的想法、你的需求、你的上下文写成一个文件，扔给对方。对方的 AI agent 读了这个文件，自己去实现。

说实话我也不确定这个路径什么时候能走通。但方向感让我震了一下。

你想想现在的协作流程，你写了一段代码，发 PR，别人 review，合并。但如果未来每个人都有自己的 AI agent，你为什么还要给别人发代码？你发想法就够了。代码是实现细节，想法才是真正有价值的东西。

这和他另一条 24804 赞的推文呼应上了。他说 LLM Wiki 的核心是"跳过写作但不能跳过阅读和思考"。

这句话值得单独拿出来品。

## 社区里吵翻了

支持者说得很直接，你看看那些笔记 App 的墓地吧。Google Keep、Evernote、Bear、Roam Research，哪个没有"这次不一样"的承诺？最后用户迁移成本越来越高，数据越来越难导出。纯文件是唯一经得起时间考验的方案。

反对者也有道理。有人说，File over App 听起来很美，但你试过用纯文本文件管理 5000 条笔记吗？没有搜索、没有标签、没有双向链接，效率直接砍半。Karpathy 是程序员，他有能力自己写脚本处理这些问题，普通用户呢？

还有一种声音比较微妙，说 Obsidian 其实就是 File over App 的实践。底层全是 Markdown 文件，你随时可以换编辑器。这算"App"还是"File"？

我觉得这个灰色地带才是关键。

## 我的判断

我认为 Karpathy 说对了方向，但把路径说得太绝对了。

File over App 不是一个非此即彼的选择，而是一个光谱。核心问题不是"用不用 App"，而是"你的数据有没有逃生通道"。

一个好的知识管理方案应该满足两个条件，日常使用体验足够好，同时数据格式足够通用。Obsidian 就是一个不错的平衡点，体验好，底层纯 Markdown，随时可以跑路。

但 BYOAI 这条，我是真的觉得他说到了要害。

现在所有笔记 App 都在疯狂加 AI 功能，Notion AI、Mem AI、Reflect AI。但它们的 AI 是封闭的，用的是它们选的模型，prompt 是它们写的，你没法换。而如果你的知识库就是一堆本地 Markdown 文件，你可以用 Claude Code 索引它们，可以用 Cursor 搜索它们，可以用任何未来出现的、你还不知道名字的 AI 工具来处理它们。

这不是技术洁癖，这是实实在在的能力差。

回到开头，Karpathy 那条推文让我愣了几秒。不是因为他说了什么新观点，而是因为他用四个词说清了我模糊感觉了三年的东西。你的知识，应该用你能完全控制的格式，存在你能完全控制的地方，接入你能自由选择的 AI。

剩下的都是实现细节。

反正如果你现在还在用某个 App 的私有格式存笔记，至少做一件事，今天就试试能不能完整导出。如果不能，你知道该怎么做了。

## 相关链接

- Karpathy 原始推文（Farzapedia 评论）: https://x.com/karpathy/status/2040572272944324650
- Farzapedia 项目: https://www.farzapedia.com
- Obsidian（File over App 的实践者）: https://obsidian.md
- Steph Ango 的 File over App 宣言: https://stephango.com/file-over-app
