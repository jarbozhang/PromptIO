# Claude Code

[[anthropic|Anthropic]] 的 CLI 编程工具，我们管线本身运行在上面。

## 核心特性

- CLI 终端交互，支持 Plan Mode、Subagents、Skills、Hooks、Memory
- Opus 4.7 模型（1M context）— 2026-04-18 更新
- MCP 协议集成

## 中文社区热度

Claude Code 在中文 AI 社区（X/小红书）是当前最热的工具话题。常见讨论方向包括省钱攻略、配置最佳实践、与 [[codex|Codex]] 对比、CLAUDE.md 写法、远程开发方案。

## 我们的覆盖（直接或间接）

| 日期 | 文章 | 角度 |
|------|------|------|
| 2026-05-11 | [[anthropic-skills-financial-services-courses官方三仓库\|Anthropic 把官方 skills / 金融行业 cookbook / 教育课程三仓库一起开源]] | 官方 Skills 仓库 / Skill 生态 |
| 2026-05-10 | [[claude-code-cve-39861-sandbox逃逸-国内开发者升级\|Claude Code 爆 CVE-2026-39861 sandbox 逃逸漏洞，国内开发者今晚把这一个版本删掉]] | 安全漏洞 / 供应链 |
| 2026-05-10 | [[addyosmani-agent-skills-3009星-production-engineering-skills\|Addy Osmani 把 production engineering 经验开源给 AI agent，3009 星]] | Skill 生态 / 方法论 |
| 2026-05-06 | [[karpathy-llm-coding教训被写成claude-md一夜2409星\|Karpathy 的 LLM 编程踩坑教训被写成一个 CLAUDE.md，一夜涨了 2409 颗星]] | CLAUDE.md 方法论 / KOL 教训 |
| 2026-05-06 | [[ai编程agent-context爆炸-sandbox让tool输出减98\|Claude Code 跑半天 200k context 烧光？我把 tool 输出关进沙盒，token 砍了 98%]] | Context 工程 / sandbox |
| 2026-05-05 | [[deepclaude-deepseek-v4-pro接claude-code-agent-loop\|DeepClaude 一夜 657 HN 热度，把 Claude Code 的脑子换成了 DeepSeek V4 Pro]] | 换模型后端 / 省钱 |
| 2026-05-05 | [[n8n-mcp-claude自动写自动化工作流-副业号\|本来要写 50 行 JSON，现在我用一句中文让 Claude 把 n8n workflow 拼好了]] | MCP 工作流自动化 |
| 2026-05-05 | [[dexter-开源自主金融研究agent-409星\|散户每天看不完几十份研报，我让 dexter 帮我跑了一天]] | Agent SDK 金融研究 |
| 2026-05-05 | [[specsmaxxing-yaml写spec反ai-psychosis\|一个工程师写了 1.5 小时无人值守的 AI 工厂，然后把它全删了]] | 方法论 / spec-driven |
| 2026-05-03 | [[apple-support-app泄露claude-md文件-国内开发者grep自家应用\|Apple 自家 Apple Support 应用里被人扒出 Claude.md 文件，国内开发者赶紧 grep 自家 app]] | AI 留痕 / 供应链安全 |
| 2026-05-03 | [[uber-4个月烧光2026年ai预算-claude-code账单国内大厂启示\|Uber 4 个月把 2026 全年的 AI 预算烧光在 Claude Code 上，国内大厂该怎么管这笔账]] | 账单失控 / 企业预算 |
| 2026-05-03 | [[deepseek-tui-564星-deepseek终端coding-agent-rust\|DeepSeek-TUI 一夜 564 星，给 DeepSeek 配了个 Rust 终端版的 Claude Code]] | 国产 coding agent 终端平替 |
| 2026-05-03 | [[sebastian-raschka拆coding-agent五大组件-国产claude-code平替差距\|Sebastian Raschka 把 coding agent 拆成 5 块 — 看完知道国产 Claude Code 平替差在哪]] | 五大组件方法论 |
| 2026-05-03 | [[agent-desktop-53命令-本地桌面自动化-不用截图操控native-apps\|不让 AI 看截图猜坐标了，agent-desktop 让它直接读 Mac 的 UI 结构]] | native app 操控配套 |
| 2026-05-01 | [[warp-agentic终端-cursor之外另一条路\|Warp 一夜冲上 trending +3401 星，agentic 终端是 Cursor 之外的另一条路]] | 竞品对比 / agentic 终端 |
| 2026-04-18 | Codex大更新：桌面控制+图片生成+记忆，OpenAI正面硬刚Claude Code | 竞品对比 |
| 2026-04-18 | Claude Opus 4.7来了：1934赞HN刷屏，但你该升级吗 | 模型更新 |
| 2026-04-14 | [[mac-mini变身24小时ai编程站-三件套让你随时随地给ai派活|Mac mini变身24小时AI编程站]] | 远程开发 |
| 2026-04-13 | [[obsidian加claude-code打造第二大脑-三个高赞方案一次看完|Obsidian加Claude Code打造第二大脑]] | 知识管理 |
| 2026-04-12 | [[55个大厂设计语言塞进一个文件-claude-code前端没有ai味|55个大厂设计语言塞进一个文件]] | 前端开发 |
| 2026-04-12 | [[harness是什么-claude-code和codex高手都在聊这个词|Harness是什么]] | 概念解读 |
| 2026-04-12 | [[画技术架构图不用对齐了-claude-code-skill一句话出图|Claude Code Skill一句话出架构图]] | Skill 生态 |
| 2026-04-10 | [[vercel的claude-code插件在偷读你的prompt|Vercel的Claude Code插件偷读prompt]] | 隐私问题 |
| 2026-04-10 | [[claude-code换zed加openrouter省了70percent|换Zed+OpenRouter省了70%]] | 省钱方案 |
| 2026-04-08 | [[ai写代码时你的电脑有多危险-macOS沙箱hazmat|给Claude Code开了全部权限]] | 安全风险 |
| 2026-04-15 | [[吴恩达说语音是下一代ui层-用claude-code不到1小时给女儿做了个语音数学app\|吴恩达说语音是下一代UI层]] | 语音 UI |
| 2026-04-15 | [[langalpha把claude-code搬到华尔街-hn-110分的金融ai-agent怎么解决token爆炸\|LangAlpha 金融 AI Agent]] | 金融落地 |
| 2026-04-15 | [[ai让10x工程师的身体先崩了-hn-70条评论全是真话\|AI 让 10x 工程师身体崩了]] | 健康代价 |
| 2026-04-30 | [[136k星system-prompts仓库-27个ai工具prompt-trae-manus\|一个 136k 星仓库扒了 27 个 AI 工具的 system prompt，Trae / Manus / Z.ai Code 都在里面]] | prompt 工程横评 |
| 2026-05-07 | [[9router一夜130星-40providers免费连claude-code-codex-cursor\|一夜 130 星的 9router，把 Claude Code 切到 40 多家免费后端我跑了一晚上]] | 后端切换 / 省钱 |
| 2026-05-07 | [[nouscoder-14b开源-48张b200训4天-接住claude-code时刻\|NousResearch 用 48 张 B200 训 4 天搞出 NousCoder-14B，开源接住 Claude Code 时刻]] | 开源平替 |
| 2026-05-07 | [[anthropic-cowork发布-claude-desktop-agent给非技术用户\|Anthropic 用一周半时间，把 Claude Code 改成给会计 HR 用的 Cowork]] | 桌面 agent 衍生 |
| 2026-05-07 | [[gb10-solution-atlas开源-rust-cuda让qwen3-6-35b单卡100tok每秒\|DGX Spark 单卡跑 Qwen3.6-35B 100+ tok/s，这个 Rust 推理引擎把 PyTorch 整条栈丢出去了]] | 本地推理后端 |
| 2026-05-07 | [[openai开源symphony-codex编排spec-issue-tracker变agent系统\|OpenAI 开源 Symphony spec，把 Linear 当事件源，Codex 自己从 backlog 里拿活干]] | spec 编排 |
| 2026-05-07 | [[replicate上线remote-mcp-server-claude-cursor-vs-code一行接1000模型\|Replicate 把整个模型仓库做成了 MCP，Claude Code 一句话挑模型跑模型]] | MCP 工具接入 |
| 2026-05-12 | [[mattpocock-claude-skills-单日4000星\|Matt Pocock 把自己 .claude/skills 目录开源了，一天涨 3886 星，能直接拿来抄]] | KOL Skills 包公开 / 工作流抄底 |
| 2026-05-12 | [[affaan-m-everything-claude-code-18万星-agent-harness优化\|我用 Claude Code 三个月烧了 800 美元，直到看见这个 18 万星的 agent harness 优化系统]] | agent harness 性能优化系统 |
| 2026-05-13 | [[claude-opus-4-7-fast-openrouter-1m-context-6x\|Claude Opus 4.7 Fast 上 OpenRouter 1M context 6×]] | 模型新档位 / OpenRouter 接入 |
| 2026-05-13 | [[claude-platform-aws-bedrock-切换-国内云厂商怎么抄\|Claude Platform on AWS / SDK v0.101 切换国内云厂商怎么抄]] | 云基础设施 / SDK 切换路径 |
| 2026-05-13 | [[imbad0202-academic-research-skills-claude-code-学术研究全自动\|academic-research-skills 把 Claude Code 变成学术研究全自动流水线]] | Skill 生态 / 学术研究工作流 |
| 2026-05-14 | [[goose-免费claude-code替代-一年省2400美元\|Block Goose 26100 stars 完全免费 Claude Code 替代]] | 开源平替 / 一年省 2400 美元 |
| 2026-05-14 | [[simon-willison-claude-code-html不合理有效性\|Simon Willison Claude Code + HTML 单文件方法论的不合理有效性]] | KOL 方法论 / Claude Code + HTML 单文件 |

## 注意

Claude Code 是覆盖最密集的产品（10 篇/11 天）。4/18 加了 Opus 4.7 升级和 Codex 竞品对比。角度仍多元，但总量需控制，后续严格限制。
