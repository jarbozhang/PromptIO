# 主题追踪：AI 编程工具

Claude Code / Codex / Cursor 等 AI 编程工具生态。

## 当前格局

- **[[claude-code|Claude Code]]** — CLI 同步模式，开发者圈子热度最高
- **[[codex|Codex]]** — 异步模式，[[openai|OpenAI]] 围绕它重构定价
- **Cursor** — IDE 集成，主打可视化
- **Zed + OpenRouter** — 省钱替代方案

## 中文社区关注焦点

1. 省钱攻略（换 OpenRouter、尼日利亚区订阅）
2. CLAUDE.md / Harness 最佳实践
3. Skills / Subagents / Hooks 配置
4. 与 Codex 的实际对比
5. 安全风险（插件偷读 prompt、全权限风险）

## 我们的覆盖

| 日期 | 文章 | 角度 |
|------|------|------|
| 2026-05-19 | [[codex远程接管mac-mini和devbox-本机只当入口ai编程开始常驻后台|Codex 远程接管 Mac mini 和 devbox]] | 远程开发 / always-on host |
| 2026-05-19 | [[claude-code创始人说自己今年没写过代码-anthropic内部已经让claude互相问问题|Claude Code Boris Cherny 工作流]] | 并行 agent / Loop / 组织流程 |
| 2026-05-19 | [[qwen3-6-27b-mtp在llama-cpp跑到60tokens-s-4090本地coding-agent又快了一截|Qwen3.6-27B MTP llama.cpp 60 tokens/s]] | 本地 coding agent 速度 / 4090 参数 |
| 2026-05-18 | [[google-gemini-cli-10万星-终端agent每天1000次免费额度怎么用|Google Gemini CLI 10 万星 终端 agent 每天 1000 次免费额度怎么用]] | Gemini CLI / 每天 1000 次免费额度 / 终端 agent |
| 2026-05-13 | [[claude-opus-4-7-fast-openrouter-1m-context-6x\|Claude Opus 4.7 Fast 上 OpenRouter，6 倍价格换速度，1M 上下文跑全栈]] | 9 |
| 2026-05-13 | [[claude-platform-aws-bedrock-切换-国内云厂商怎么抄\|Claude Platform 登陆 AWS，SDK v0.101 对接 Bedrock，国内云厂商抄哪几步]] | 8 |
| 2026-05-13 | [[imbad0202-academic-research-skills-claude-code-学术研究全自动\|Imbad0202 academic-research-skills 把 Claude Code 改造成学术研究流水线]] | 8 |
| 2026-05-12 | [[mattpocock-claude-skills-单日4000星\|Matt Pocock 把自己的 .claude/skills 全开源，一夜涨 4000 星]] | 9 |
| 2026-05-12 | [[affaan-m-everything-claude-code-18万星-agent-harness优化\|everything-claude-code 18 万星 / agent harness 优化方法论]] | 8 |
| 2026-05-10 | [[claude-code-cve-39861-sandbox逃逸-国内开发者升级\|Claude Code 爆 CVE-2026-39861 sandbox 逃逸漏洞，国内开发者今晚把这一个版本删掉]] | 编码 agent 安全模型 / 供应链漏洞 |
| 2026-05-10 | [[addyosmani-agent-skills-3009星-production-engineering-skills\|Addy Osmani 把 production engineering 经验开源给 AI agent，3009 星]] | KOL Skills 包 / production-grade 工程直觉 |
| 2026-05-10 | [[deepmind-alphaevolve-gemini编程agent解实际问题\|DeepMind AlphaEvolve 把 Gemini 编程 agent 推到真实问题]] | evaluator-loop 范式 / 编码 agent 路线分化 |
| 2026-05-11 | [[anthropic-sdk-v0-100-managed-agents-multiagents\|Anthropic SDK 跳到 v0.100，Managed Agents 多 agent / webhooks / vault 进了官方 Python 库]] | SDK 大版本 / Managed Agents 多 agent |
| 2026-05-11 | [[anthropic-skills-financial-services-courses官方三仓库\|Anthropic 把官方 skills / 金融行业 cookbook / 教育课程三仓库一起开源]] | 官方 Skills + 行业 cookbook + 教育 |
| 2026-05-08 | [[gemini-3-1-flash-lite-1m多模态白嫖-0-25美元每m-token\|Gemini 3.1 Flash Lite $0.25/M 1M 多模态上 OpenRouter]] | 多模态 + 编程辅助新底部价格 |
| 2026-05-08 | [[anthropic-code-w-claude-2026大会-mythos-preview发布\|Anthropic Code w/ Claude 2026 大会 + Mythos Preview]] | 大会发布 / 编程模型行业事件 |
| 2026-05-08 | [[pageindex一夜943星-vectorless-rag不用向量数据库\|PageIndex vectorless RAG 给编程辅助]] | RAG 新范式给编程辅助 |
| 2026-05-08 | [[raschka开源coding-llms-from-ground-up-从零搭claude-code\|Raschka 开源 Coding LLM From the Ground Up 完整课程]] | KOL 方法论 + AI 教育 |
| 2026-05-08 | [[goose-26k星-block本地agent-绕开claude-code-200美金\|Block Goose 26k 星本地 AI 编程 agent]] | 本地 agent / 绕开订阅 |
| 2026-05-06 | [[百度cobuddy免费上openrouter-国产编程模型白嫖131k-context\|百度第二个免费模型上 OpenRouter，这次是编程模型 CoBuddy，131k 上下文白嫖]] | 国产免费编程模型 / OpenRouter 入驻 |
| 2026-05-06 | [[karpathy-llm-coding教训被写成claude-md一夜2409星\|Karpathy 的 LLM 编程踩坑教训被写成一个 CLAUDE.md，一夜涨了 2409 颗星]] | CLAUDE.md 方法论 / KOL 教训 |
| 2026-05-06 | [[ai编程agent-context爆炸-sandbox让tool输出减98\|Claude Code 跑半天 200k context 烧光？我把 tool 输出关进沙盒，token 砍了 98%]] | Context 工程 / sandbox / 省 token |
| 2026-05-05 | [[deepclaude-deepseek-v4-pro接claude-code-agent-loop\|DeepClaude 一夜 657 HN 热度，把 Claude Code 的脑子换成了 DeepSeek V4 Pro]] | 换模型后端 / agent loop / 省钱 |
| 2026-05-05 | [[rapid-mlx-比ollama快4-2倍-mac本地ai推理引擎\|M 系 Mac 上跑本地模型，引擎层正在被换掉]] | Apple Silicon 本地引擎 / 接 Cursor/Claude Code |
| 2026-05-05 | [[specsmaxxing-yaml写spec反ai-psychosis\|一个工程师写了 1.5 小时无人值守的 AI 工厂，然后把它全删了]] | 方法论 / spec-driven / 反 AI psychosis |
| 2026-05-03 | [[apple-support-app泄露claude-md文件-国内开发者grep自家应用\|Apple 自家 Apple Support 应用里被人扒出 Claude.md 文件，国内开发者赶紧 grep 自家 app]] | AI 留痕 / 构建产物供应链泄露 |
| 2026-05-03 | [[kimi-k2-6编程对决击败claude-gpt-5-5-gemini-国产开源权重\|Kimi K2.6 编程对决又赢了 Claude / GPT-5.5 / Gemini，国产开源权重又拔一个旗]] | 国产开源权重夺榜 / 四天换冠军 |
| 2026-05-03 | [[uber-4个月烧光2026年ai预算-claude-code账单国内大厂启示\|Uber 4 个月把 2026 全年的 AI 预算烧光在 Claude Code 上，国内大厂该怎么管这笔账]] | 企业账单失控 / 国内大厂启示 |
| 2026-05-03 | [[deepseek-tui-564星-deepseek终端coding-agent-rust\|DeepSeek-TUI 一夜 564 星，给 DeepSeek 配了个 Rust 终端版的 Claude Code]] | DeepSeek 终端 coding agent / 社区先行 |
| 2026-05-03 | [[sebastian-raschka拆coding-agent五大组件-国产claude-code平替差距\|Sebastian Raschka 把 coding agent 拆成 5 块 — 看完知道国产 Claude Code 平替差在哪]] | 五大组件方法论 / 国产平替自检 |
| 2026-05-01 | [[warp-agentic终端-cursor之外另一条路\|Warp 一夜冲上 trending +3401 星，agentic 终端是 Cursor 之外的另一条路]] | agentic 终端 / Cursor 之外的另一条路 |
| 2026-05-01 | [[ppt-master-ai生成原生pptx-hugo-he\|Hugo He 的 ppt-master 一夜涨 370 星，AI 生成的 PPTX 是真能改的]] | AI+办公 / 原生 PPTX 生成 |
| 2026-04-27 | [[gitnexus-graph-rag塞进浏览器-客户端代码知识图谱聊代码\|GitNexus 把 Graph RAG 塞进浏览器，客户端跑代码知识图谱]] | 客户端 Graph RAG / 代码理解新形态 |
| 2026-04-24 | [[claude-code变笨了-anthropic-retro-opus4-7-system-prompt拆解\|用户骂 Claude Code 变笨，Anthropic 发 retro + Simon 扒 Opus system prompt]] | 质量 retro + prompt 拆解 |
| 2026-04-24 | [[qwen3-6-27b编程模型发布-27b-dense旗舰本地可跑\|Qwen3.6-27B 27B Dense 本地编程旗舰]] | 国产本地编程模型 |
| 2026-04-22 | [[马斯克600亿买cursor-不是ai编程的胜利\|SpaceX 600 亿美元收购 Cursor]] | [[ai-mergers\|并购]]（非工具评测） |
| 2026-04-18 | Codex大更新：桌面控制+图片生成+记忆，OpenAI正面硬刚Claude Code | Codex 功能更新 |
| 2026-04-18 | Claude Opus 4.7来了：1934赞HN刷屏，但你该升级吗 | 模型升级 |
| 2026-04-18 | "Tokenmaxxing"：TechCrunch造了个新词，说AI编程正在让开发者变傻 | 行业批评 |
| 2026-04-14 | [[mac-mini变身24小时ai编程站-三件套让你随时随地给ai派活|Mac mini变身24小时AI编程站]] | 远程开发 |
| 2026-04-13 | [[obsidian加claude-code打造第二大脑-三个高赞方案一次看完|Obsidian+Claude Code第二大脑]] | 知识管理 |
| 2026-04-12 | [[55个大厂设计语言塞进一个文件-claude-code前端没有ai味|55个大厂设计语言]] | 前端质量 |
| 2026-04-12 | [[harness是什么-claude-code和codex高手都在聊这个词|Harness是什么]] | 概念解读 |
| 2026-04-12 | [[画技术架构图不用对齐了-claude-code-skill一句话出图|Skill一句话出架构图]] | 生态工具 |
| 2026-04-11 | [[claude尼日利亚区订阅pro只要88元|Claude尼日利亚区订阅88元]] | 省钱 |
| 2026-04-11 | [[karpathy说ai能力出现认知鸿沟-免费版付费版不是同一物种|Karpathy说AI能力认知鸿沟]] | 行业观察 |
| 2026-04-10 | [[vercel的claude-code插件在偷读你的prompt|Vercel插件偷读prompt]] | 隐私 |
| 2026-04-10 | [[claude-code换zed加openrouter省了70percent|Zed+OpenRouter省70%]] | 省钱 |
| 2026-04-10 | [[chatgpt出了100美元月新档-claude用户该不该跳船|ChatGPT出了100美元新档]] | 定价 |
| 2026-04-08 | [[ai写代码时你的电脑有多危险-macOS沙箱hazmat|Claude Code安全风险]] | 安全 |
| 2026-04-15 | [[吴恩达说语音是下一代ui层-用claude-code不到1小时给女儿做了个语音数学app\|吴恩达说语音是下一代 UI 层]] | 语音 UI / Claude Code 应用 |
| 2026-04-15 | [[langalpha把claude-code搬到华尔街-hn-110分的金融ai-agent怎么解决token爆炸\|LangAlpha 金融 AI Agent token 优化]] | 金融 Agent / MCP 编译 |
| 2026-04-15 | [[ai让10x工程师的身体先崩了-hn-70条评论全是真话\|AI 让 10x 工程师身体崩了]] | 行业批评 / 健康代价 |
| 2026-04-30 | [[136k星system-prompts仓库-27个ai工具prompt-trae-manus\|136k 星仓库扒了 27 个 AI 工具 system prompt（Trae / Manus / Z.ai Code）]] | prompt 工程横评 |
| 2026-05-07 | [[9router一夜130星-40providers免费连claude-code-codex-cursor\|一夜 130 星的 9router，把 Claude Code 切到 40 多家免费后端我跑了一晚上]] | 多 provider 路由 / 省钱 |
| 2026-05-07 | [[nouscoder-14b开源-48张b200训4天-接住claude-code时刻\|NousResearch 用 48 张 B200 训 4 天搞出 NousCoder-14B，开源接住 Claude Code 时刻]] | 开源编程模型 / 本地 agent |
| 2026-05-07 | [[openai开源symphony-codex编排spec-issue-tracker变agent系统\|OpenAI 开源 Symphony spec，把 Linear 当事件源，Codex 自己从 backlog 里拿活干]] | spec 编排 / agent 调度协议 |
| 2026-05-14 | [[deepseek-v4-flash-openrouter免费-百万token实测\|DeepSeek V4 Flash 在 OpenRouter 免费上线 256K，接入编程工具实测]] | 10 |
| 2026-05-14 | [[goose-免费claude-code替代-一年省2400美元\|Block Goose 26100 stars 完全免费 Claude Code 平替]] | 9 |
| 2026-05-14 | [[openai-codex-windows沙箱-国产ai编程ide怎么跟\|OpenAI Codex on Windows 沙箱，国产 AI 编程 IDE 对照]] | 8 |
| 2026-05-14 | [[simon-willison-claude-code-html不合理有效性\|Simon Willison Claude Code + HTML 单文件方法论]] | 8 |
| 2026-05-16 | [[openai-codex-跑进手机-全平台同步-国产ide怎么跟\|Codex 跑进手机 全平台 vibe coding]] | 9 |
| 2026-05-16 | [[clawdmeter-claude-code用量桌面小挂件-openclaw生态新成员\|Clawdmeter Claude Code 用量监控工具]] | 9 |
| 2026-05-16 | [[anthropic官方claude-code大代码库使用手册-237hn票最佳实践\|Anthropic 官方 Claude Code 大代码库使用手册]] | 8 |
| 2026-05-16 | [[anthropic-skills官方仓库-923颗星-skills四派归一\|anthropic/skills 四派归一]] | 8 |
| 2026-05-17 | [[codegraph给claude-code先建代码图-少烧token少查文件|CodeGraph 给 Claude Code 先建代码图]] | 8 |
| 2026-05-17 | [[openai两个月免费codex-抢团队默认ide|OpenAI 两个月免费 Codex 抢团队默认 IDE]] | 9 |
| 2026-05-17 | [[chollet说agent写代码像机器学习-测试集过拟合进评审|Chollet 说 agent 写代码像机器学习]] | 7 |
| 2026-05-20 | [[google-io-2026-gemini-3-5-flash-八连发\|Google I/O 2026 八连发 Gemini 3.5 Flash 转 agents]] | 10 |
| 2026-05-20 | [[google-ai-studio-android-vibe-code\|Google AI Studio 一句话出 Android 原生 app vibe code 打进手机厂]] | 9 |
| 2026-05-20 | [[openai-codex-windows-sandbox-dell-on-prem\|OpenAI Codex 上 Windows sandbox + Dell on-prem 企业内网]] | 8 |

## 饱和度评估

**严重过饱和** — 46 篇累计。5/8 +5 篇（Gemini Flash Lite 编程价格档、Anthropic Code 大会、PageIndex RAG、Raschka 课程、Goose 本地 agent）连续 5 日峰区。每条都符合"重大模型/工具迭代或国产 Claude Code 二次出圈或方法论 KOL"例外条款。

## 建议

**纯工具评测类继续暂停。** 并购/定价/安全/模型质量 retro / 国产本地编程等有独立叙事角度的话题仍可纳入，继续归入 [[ai-mergers|AI 行业并购]]、[[ai-pricing|AI 定价]]、[[supply-chain-security|供应链安全]]、[[local-inference|本地推理]] 等独立主题的交叉视角。
