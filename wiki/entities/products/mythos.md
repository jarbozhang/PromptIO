# Mythos

[[anthropic|Anthropic]] 的受限版网络安全/攻击研究模型，参数量曾披露 754B。配合 Glasswing 项目面向安全研究员封闭发放，是 Anthropic 在 AI 安全领域的"最强但不外放"的代表产品。

## 定位

Mythos 的核心矛盾是"最强模型封印"——Anthropic 声称出于 AI 安全考虑不面向公众开放，但 4 月内多次被第三方开源逆向、被政府/军方报告引用、被同行公开嘲讽，舆论从"神坛"被反复拉下。

## 关键事件时间线

- **2026-04-07** — Glasswing/Mythos 限制发布，只给安全研究
- **2026-04-08** — 首次覆盖："754B 参数 Claude Mythos：Anthropic 为什么把最强模型只给安全研究员"
- **2026-04-20** — OpenMythos：22 岁创业者扒开 Mythos 黑箱全开源，迫使 Anthropic 面对"封印失败"的议题
- **2026-04-22** — 48 小时四连炸：NSA 报告引用 → Pentagon 泄露声称 → [[sam-altman|Sam Altman]] 公开嘲讽 fear-based marketing → 黑客利用四件事接连发生，戏剧弧拉满
- **2026-05-08** — Code w/ Claude 2026 大会 Mythos Preview 发布 + 与 [[mozilla|Mozilla]] / Firefox 合作 31 天挖漏洞，从"封印模型"扩到"实战漏洞挖掘平台"路线
- **2026-05-11** — curl 作者 [[daniel-stenberg|Daniel Stenberg]] 在博客确认 Mythos 在 curl 上扫到 5 个潜在漏洞，1 个被确认为低危 CVE；Mozilla 同步给出"271 漏洞几乎无误报"官方背书。Mythos 从"Firefox 单案例"升级为"第二个开源大项目验证 + curl 作者站台"，工作流可复刻性被业内承认

## 我们的覆盖

| 日期 | 文章 | 角度 |
|------|------|------|
| 2026-05-11 | [[mythos-curl-mozilla271-anthropic-ai安全\|Mythos 在 Mozilla 之后又找到 curl 漏洞，Daniel Stenberg 一句话救了国内开发者]] | 第二个开源大项目验证 / curl 作者站台 / 国内开源对照 |
| 2026-05-08 | [[anthropic-code-w-claude-2026大会-mythos-preview发布\|Anthropic Code w/ Claude 2026 大会 + Mythos Preview 给 Firefox 找漏洞]] | 大会发布 / Mythos 公开化 |
| 2026-05-08 | [[claude-mythos-preview加固firefox-ai找浏览器漏洞\|Mozilla 让 Claude Mythos 给 Firefox 找了 31 天漏洞]] | 实战漏洞挖掘 / 国产对照 |
| 2026-04-22 | [[anthropic-mythos-48小时连爆四件事-核武器钥匙丢了\|Anthropic 的 Mythos 48 小时内出了四件事，从 NSA 偷用到 Altman 公开嘲讽]] | 事件复盘+行业解读 |
| 2026-04-20 | [[22岁创业者扒开claude-mythos黑箱-全开源了\|22 岁创业者扒开 Claude Mythos 黑箱，全开源了]] | 开源逆向 |
| 2026-04-08 | [[claude-mythos-754b-anthropic为什么把最强模型只给安全研究员\|754B 参数的 Claude Mythos]] | 封印策略分析 |
| 2026-05-12 | [[openai-daybreak-claude-mythos-ai漏洞挖掘工作流对照\|OpenAI Daybreak 杀来了，Mythos 第三个对手登场，AI 漏洞挖掘工作流到底怎么用]] | OpenAI Daybreak 对照 / 工作流对照 |

## 相关实体

- [[anthropic|Anthropic]] — 发布方
- [[sam-altman|Sam Altman]] — 4/22 公开嘲讽"fear-based marketing"
- [[mozilla|Mozilla]] — 5/8 Firefox 漏洞挖掘合作方
- NSA / Pentagon — 政府报告中被引用
- Glasswing — Anthropic 基于 Mythos 的漏洞扫描项目

## 相关主题

- [[ai-security|AI 安全]]
- 网络攻击模型
- [[supply-chain-security|供应链安全]]

## 注意

Mythos 是少数跨月连续三次出现的产品议题，建议作为 Anthropic 实体下的独立线头管理，避免重复计入 Anthropic 整体饱和度。后续关注重点：政府/军方使用是否落地、OpenMythos 社区生态、Anthropic 官方反应。
