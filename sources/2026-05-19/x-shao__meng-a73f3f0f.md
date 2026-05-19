---
title: "TRAE 团队分析了用户实际使用的 Agent Skills Top 10 这 10 个 Skills 覆盖了从 UI 设计到调试的产品开发全链路，还有一个 PUA Skills 😄，咱们分类看看："
source: "X @shao__meng"
url: "https://x.com/shao__meng/status/2056360476934853013"
date: "Mon May 18 13:05:17 +0000 2026"
likes: 101
reposts: 33
replies: 12
---

TRAE 团队分析了用户实际使用的 Agent Skills Top 10

这 10 个 Skills 覆盖了从 UI 设计到调试的产品开发全链路，还有一个 PUA Skills 😄，咱们分类看看：

流程治理类（强制工作流）
1. brainstorming —— 设计先行 强制在写代码前完成结构化需求对话，未批准方案禁止编码。核心是消灭"这事太简单不用设计"的惯性偷懒。

5. writing-plans —— 计划落地 把头脑风暴的产物拆成 2–5 分钟粒度的可执行任务，每步附带完成标准、风险预案和代码示例。是 brainstorming 的下游配套。

7. using-superpowers —— 调度中枢 元技能。强制 Agent 在每次响应前先检索并加载相关 skill，并明确优先级：用户指令 > 技能指令 > 系统默认。

8. karpathy-guidelines —— 行为护栏 源自 Karpathy 对 LLM 编码缺陷的观察，约束三类常见病：过度假设、过度工程、留下烂摊子。原则是 think first / stay simple / edit surgically。

设计与前端类
2. frontend-design 针对"AI 生成页面千篇一律"的问题，强制选择明确的设计语言（极简 / 复古 / 野兽派等），关注排版、配色、动效的真实质感。

3. ui-ux-pro-max 全平台设计系统生成器：50+ 风格、97 套配色、57 套字体组合，附带无障碍规范。属于 frontend-design 的"重型武器"版。

调试与验证类
4. systematic-debugging 四阶段方法论：禁止猜测式修复，要求根因追踪、纵深防御、基于条件的等待，必须完成完整诊断后才允许动手。

9. webapp-testing 基于 Playwright 的本地测试套件，强调"先侦察后行动"——截图、抓控制台日志、管理多服务生命周期。

10. agent-browser 更通用的浏览器自动化 CLI：导航、填表、点击、截图、数据抽取，把浏览器变成 Agent 的标准 I/O 通道。

生态扩展类
6. find-skills 对接开放的 skills. sh 生态，支持模糊搜索和从任意 Git 仓库安装，并按 Agent 作用域隔离。

额外发现：PUA
/pua —— 高压问责 四级升级机制 + 七项检查清单，禁止 Agent 用"差不多了"或被动等待来收尾，强制承担完整责任。命名带反讽意味。

整体设计逻辑分层
1. 元层
using-superpowers, find-skills
2. 行为层
karpathy-guidelines, /pua
3. 流程层
brainstorming → writing-plans
4. 执行层
frontend-design, ui-ux-pro-max
5. 验证层
systematic-debugging, webapp-testing, agent-browser

形成的闭环是：想清楚 → 拆细 → 做精 → 验透 → 担责。

---

Quoted tweet:

We analyzed real skill call data from TRAE users.

Here are the 10 Most Popular Agent Skills that people actually use, not just install.

From design-first thinking to browser automation, these skills are shaping how people build with agents today 👇 https://t.co/mb6fK1b5nz
