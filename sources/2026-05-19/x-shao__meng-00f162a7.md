---
title: "Claude Code 核心开发者 Thariq 带来自己高频使用的「开发日志」提示词 @trq212 这段提示词解决了 AI 协作编码中最棘手的结构性问题：规格永远写不完整，但人又无法实时跟踪 AI"
source: "X @shao__meng"
url: "https://x.com/shao__meng/status/2056535561540948056"
date: "Tue May 19 00:41:01 +0000 2026"
likes: 51
reposts: 3
replies: 3
---

Claude Code 核心开发者 Thariq 带来自己高频使用的「开发日志」提示词

@trq212 这段提示词解决了 AI 协作编码中最棘手的结构性问题：规格永远写不完整，但人又无法实时跟踪 AI 的每一个判断。

传统的两种极端都失败：
1. 过度规约：试图在 spec 里穷举所有边界情况——不现实，且拖慢启动
2. 完全放手：让 agent 自由发挥——结果是大量隐性决策埋藏在 diff 里，code review 时才发现，返工成本极高

这个提示词走的是第三条路：承认歧义不可避免，把"判断"这个动作本身变成可审计的产物。

这种做法为啥有效？
· 降低模型的"过度澄清"倾向：模型不必反复打断你问问题，可以自主推进
· 把隐性决策外化：原本藏在代码里的"为什么这样写"被显式写出来，review 时直接对照笔记，而不是逆向工程 diff
· 结构化的四个维度正好覆盖了实施中所有"非代码信息"：  
  · Design decisions = 填补 spec 的空白
  · Deviations = 偏离 spec 的地方（最危险，必须显式）
  · Tradeoffs = 没走的路（防止 reviewer 重复思考同样的备选）
  · Open questions = 需要人类回环的点
· HTML/Markdown 作为载体：轻量、可读、可与代码同 PR 提交，不需要额外工具

值得借鉴的 prompt 设计原则
· 给模型一个"合法的出口"，而不是逼它在歧义前停下或瞎猜
· 要求结构化产物（四个明确分类），比开放式"写点笔记"质量高一个数量级
· 用单独文件而非 inline 注释——保持代码干净，同时让元信息集中、可搜索
· 二次迭代本身是个示范：第一版凭直觉写，第二版让 Claude 帮忙结构化——这就是这条 prompt 自己倡导的"人机协作"范式

提示词原文：
Implement <SPEC>. As you work, maintain a running implementation-notes.html file that captures anything I should know about how the implementation diverges from or interprets the spec, including:

· Design decisions: choices you made where the spec was ambiguous
· Deviations: places where you intentionally departed from the spec, and why
· Tradeoffs: alternatives you considered and why you picked what you did
· Open questions: anything you'd want me to confirm or revise

---

Quoted tweet:

a prompt I've been using a lot recently:

implement &lt;SPEC&gt; and while you do, keep a running implementation-notes.html file (or markdown) with decisions you had to make weren't in the spec, things you had to change, tradeoffs you had to make or anything else I should know https://t.co/qQFTES4fjo
