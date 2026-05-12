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
| 2026-05-10 | [[anthropic-spacex-5b-300mw算力大单-xai输给自己人\|Anthropic 跟 SpaceX 签 50 亿美元 / 年算力大单 300MW Colossus I，xAI 输给自己人]] | 9 |
| 2026-05-10 | [[claude-code-cve-39861-sandbox逃逸-国内开发者升级\|Claude Code 爆 CVE-2026-39861 sandbox 逃逸漏洞，国内开发者今晚把这一个版本删掉]] | 9 |
| 2026-05-06 | [[apple赔iphone用户2-5亿-ios27让你挑ai模型\|Apple 一边赔 2.5 亿，一边把 iOS 27 改成 AI 模型自助餐]] | 9 |
| 2026-05-06 | [[karpathy-llm-coding教训被写成claude-md一夜2409星\|Karpathy 的 LLM 编程踩坑教训被写成一个 CLAUDE.md，一夜涨了 2409 颗星]] | 9 |
| 2026-05-06 | [[ai编程agent-context爆炸-sandbox让tool输出减98\|Claude Code 跑半天 200k context 烧光？我把 tool 输出关进沙盒，token 砍了 98%]] | 7 |
| 2026-05-06 | [[paypal自称重新成为技术公司-全面押注ai该信吗\|PayPal 自称重新成为技术公司，全面押注 AI 该信吗]] | 7 |
| 2026-05-05 | [[deepclaude-deepseek-v4-pro接claude-code-agent-loop\|DeepClaude 一夜 657 HN 热度，我把 Claude Code 的脑子换成了 DeepSeek V4 Pro]] | 9 |
| 2026-05-05 | [[n8n-mcp-claude自动写自动化工作流-副业号\|本来要写 50 行 JSON，现在我用一句中文让 Claude 把 n8n workflow 拼好了]] | 8 |
| 2026-05-05 | [[dexter-开源自主金融研究agent-409星\|散户每天看不完几十份研报，我让 dexter 帮我跑了一天]] | 7 |
| 2026-05-05 | [[specsmaxxing-yaml写spec反ai-psychosis\|一个工程师写了 1.5 小时无人值守的 AI 工厂，然后把它全删了]] | 7 |
| 2026-05-11 | [[anthropic-sdk-v0-100-managed-agents-multiagents\|Anthropic SDK 跳到 v0.100，Managed Agents 多 agent / webhooks / vault 进了官方 Python 库]] | 7 |
| 2026-05-11 | [[anthropic-skills-financial-services-courses官方三仓库\|Anthropic 把官方 skills / 金融行业 cookbook / 教育课程三仓库一起开源]] | 7 |
| 2026-05-08 | [[anthropic-code-w-claude-2026大会-mythos-preview发布\|Anthropic Code w/ Claude 2026 大会 + Mythos Preview 给 Firefox 找漏洞]] | 8 |
| 2026-05-08 | [[claude-mythos-preview加固firefox-ai找浏览器漏洞\|Mozilla 让 Claude Mythos 给 Firefox 找了 31 天漏洞]] | 8 |
| 2026-05-03 | [[apple-support-app泄露claude-md文件-国内开发者grep自家应用\|Apple 自家 Apple Support 应用里被人扒出 Claude.md 文件，国内开发者赶紧 grep 自家 app]] | 9 |
| 2026-05-03 | [[kimi-k2-6编程对决击败claude-gpt-5-5-gemini-国产开源权重\|Kimi K2.6 编程对决又赢了 Claude / GPT-5.5 / Gemini，国产开源权重又拔一个旗]] | 9 |
| 2026-05-03 | [[uber-4个月烧光2026年ai预算-claude-code账单国内大厂启示\|Uber 4 个月把 2026 全年的 AI 预算烧光在 Claude Code 上，国内大厂该怎么管这笔账]] | 9 |
| 2026-05-03 | [[deepseek-tui-564星-deepseek终端coding-agent-rust\|DeepSeek-TUI 一夜 564 星，给 DeepSeek 配了个 Rust 终端版的 Claude Code]] | 8 |
| 2026-05-03 | [[sebastian-raschka拆coding-agent五大组件-国产claude-code平替差距\|Sebastian Raschka 把 coding agent 拆成 5 块 — 看完知道国产 Claude Code 平替差在哪]] | 8 |
| 2026-05-03 | [[agent-desktop-53命令-本地桌面自动化-不用截图操控native-apps\|不让 AI 看截图猜坐标了，agent-desktop 让它直接读 Mac 的 UI 结构]] | 7 |
| 2026-05-01 | [[microsoft-openai离婚-国产ai出海azure路线\|Microsoft 和 OpenAI 把婚离了，国产 AI 出海要重看一遍 Azure 这条路]] | 8 |
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
| 2026-04-15 | [[openai内部备忘录泄露-cro说必须锁住用户防止跳船到anthropic\|OpenAI 内部备忘录泄露，CRO 说必须锁住用户防止跳船到 Anthropic]] | 8 |
| 2026-05-07 | [[nouscoder-14b开源-48张b200训4天-接住claude-code时刻\|NousResearch 用 48 张 B200 训 4 天搞出 NousCoder-14B，开源接住 Claude Code 时刻]] | 9 |
| 2026-05-07 | [[anthropic-cowork发布-claude-desktop-agent给非技术用户\|Anthropic 用一周半时间，把 Claude Code 改成给会计 HR 用的 Cowork]] | 8 |
| 2026-05-07 | [[deepseek首轮融资估值45b-国产ai估值新里程碑\|DeepSeek 第一次融资就开 450 亿美金，国产 AI 估值水位被抬到哪了]] | 8 |
| 2026-05-07 | [[openai开源symphony-codex编排spec-issue-tracker变agent系统\|OpenAI 开源 Symphony spec，把 Linear 当事件源，Codex 自己从 backlog 里拿活干]] | 7 |
| 2026-05-12 | [[openai-daybreak-claude-mythos-ai漏洞挖掘工作流对照\|OpenAI Daybreak 杀来了，Mythos 第三个对手登场，AI 漏洞挖掘工作流到底怎么用]] | 9 |

## 注意

覆盖 15 篇。4/18 单日 5 篇涉及 Anthropic。4/24 +2 篇（Claude Code 变笨 retro + Opus system prompt 拆解直接主角 / DeepSeek V4 价格对照方）。Anthropic 实体仍处高饱和，后续严格降权。Mythos 作为独立产品线头已建立 [[mythos|mythos.md]] 单独跟踪。
