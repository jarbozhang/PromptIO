# Anthropic

Claude / Claude Code / Glasswing 的开发商。我们管线本身就跑在 Claude Code 上。

## 关键产品线

- **[[claude-code|Claude Code]]** — CLI 编程工具，我们日常使用的核心工具
- **Claude** — 对话模型，Opus 4.7（新）/ Opus 4.6 / Sonnet 4.6
- **Claude Design** — AI 设计工具（2026-04-18 发布）
- **Managed Agents** — 托管式长时间运行 Agent
- **Glasswing** — AI 漏洞扫描项目，基于 Mythos 模型
- **Claude Certified Architect** — $99 认证考试

## 近期动态

- **Claude Code 变笨 retro + Opus 4.7 system prompt 拆解** (2026-04-24) — 用户社区骂 Claude Code 变笨，Anthropic 发了篇 retro 交代质量下滑成因，[[simon-willison|Simon Willison]] 同时把 Opus 4.7 的 system prompt 扒了出来对比
- **Mythos 一周四连炸** (2026-04-22) — Mythos 48 小时内经历 NSA 报告引用 → Pentagon 泄露声称 → Sam Altman 公开嘲讽 fear-based marketing → 黑客利用四个剧情转折，从"神坛"滚到"阴沟"
- **SpaceX/Cursor 并购中被提及** (2026-04-22) — 马斯克 600 亿美元收购 Cursor 一役被多方解读为对 Anthropic/Claude Code 编程工具护城河的直接冲击
- **Claude 被 NotebookLM 省 Token 对比** (2026-04-21) — 中文社区把 NotebookLM 当 Claude RAG 的省钱替代，单任务 Token 消耗声称相差 17 倍
- **Claude 成为 TradingAgents 默认后端之一** (2026-04-21) — 5 万星对冲基金开源项目依赖 Claude/GPT 做多 Agent 推理，年化 30.5%（回测数据）
- **[[google|Google]]/Broadcom TPU 协议** (2026-04-06) — 多 GW 级 TPU 容量，2027 年上线
- **Managed Agents 工程博客** (2026-04-08) — 技术架构分享
- **Glasswing / Mythos** (2026-04-07) — Mythos 模型限制发布，只给安全研究
- **Claude Opus 4.7** (2026-04-18) — 新模型发布，HN 1934 赞刷屏
- **Claude Design** (2026-04-18) — 无设计背景也能出图的设计工具
- **新 Tokenizer** (2026-04-18) — 4.7 新 tokenizer 的成本影响引发 HN 545 赞讨论
- **认证体系** (2026-04-14) — 花 1 亿美元建 Claude 人才池
- **AI diff 研究** (2026-04-03) — Fellow Research，模型行为差异对比

## 我们的覆盖

| 日期 | 文章 | REACH |
|------|------|-------|
| 2026-05-11 | [[mythos-curl-mozilla271-anthropic-ai安全\|Mythos 在 Mozilla 之后又找到 curl 漏洞，Daniel Stenberg 一句话救了国内开发者]] | 9 |
| 2026-05-11 | [[anthropic-sdk-v0-100-managed-agents-multiagents\|Anthropic SDK 跳到 v0.100，Managed Agents 多 agent / webhooks / vault 进了官方 Python 库]] | 7 |
| 2026-05-11 | [[anthropic-skills-financial-services-courses官方三仓库\|Anthropic 把官方 skills / 金融行业 cookbook / 教育课程三仓库一起开源]] | 7 |
| 2026-05-08 | [[anthropic-code-w-claude-2026大会-mythos-preview发布\|Anthropic Code w/ Claude 2026 大会 + Mythos Preview 给 Firefox 找漏洞]] | 8 |
| 2026-05-08 | [[claude-mythos-preview加固firefox-ai找浏览器漏洞\|Mozilla 让 Claude Mythos 给 Firefox 找了 31 天漏洞]] | 8 |
| 2026-04-24 | [[claude-code变笨了-anthropic-retro-opus4-7-system-prompt拆解\|用户都在骂 Claude Code 变笨了，Anthropic 发 retro + Simon 扒 Opus system prompt]] | 7 |
| 2026-04-24 | [[deepseek-v4-pro-flash双发-openrouter-价格战新底部\|DeepSeek V4 双发（Anthropic 作为价格对照方）]] | 10 |
| 2026-04-22 | [[anthropic-mythos-48小时连爆四件事-核武器钥匙丢了\|Anthropic 的 Mythos 48 小时内出了四件事，从 NSA 偷用到 Altman 公开嘲讽]] | 8 |
| 2026-04-22 | [[马斯克600亿买cursor-不是ai编程的胜利\|SpaceX 600 亿美元收 Cursor，Claude Code 护城河被挑战]] | 9 |
| 2026-04-21 | [[notebooklm-白嫖google算力-claude省17倍token\|为什么我不再往 Claude 里塞资料，NotebookLM 才是你没用起来的 RAG]] | 9 |
| 2026-04-21 | [[tradingagents-5wan-xing-kai-yuan-dui-chong-ji-jin\|TradingAgents 5 万星对冲基金架构（Claude 作为后端）]] | 8 |
| 2026-04-18 | Claude Opus 4.7来了：1934赞HN刷屏，但你该升级吗 | 9 |
| 2026-04-18 | Claude Design发布：没有设计背景也能出图，Anthropic在下什么棋 | 8 |
| 2026-04-18 | 有人测了Claude 4.7新tokenizer的真实成本，545赞HN炸了 | 8 |
| 2026-04-18 | "Tokenmaxxing"：TechCrunch造了个新词，说AI编程正在让开发者变傻 | 8 |
| 2026-04-18 | Qwen3.6-35B在笔记本上画的图比Claude Opus 4.7好——Simon Willison亲测 | 7 |
| 2026-04-14 | [[claude认证架构师考试来了-anthropic花1亿美元建ai人才池|Claude认证架构师考试来了]] | 8 |
| 2026-04-13 | [[anthropic发布glasswing用ai找漏洞-但主动封印了最强模型|Anthropic发布Glasswing]] | 7 |
| 2026-04-13 | [[anthropic托管agent来了-你的ai员工可以连续干活几小时不断线|Anthropic托管Agent来了]] | 7 |
| 2026-04-08 | [[claude-mythos-754b-anthropic为什么把最强模型只给安全研究员|754B参数的Claude Mythos]] | N/A |

## 注意

覆盖 15 篇。4/18 单日 5 篇涉及 Anthropic。4/24 +2 篇（Claude Code 变笨 retro + Opus system prompt 拆解直接主角 / DeepSeek V4 价格对照方）。Anthropic 实体仍处高饱和，后续严格降权。Mythos 作为独立产品线头已建立 [[mythos|mythos.md]] 单独跟踪。
