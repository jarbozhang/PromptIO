# Wiki 操作日志

追加式记录，最新在前。


## [2026-06-20] generate | 7 drafts, reviewed topics, official/curated anchors

- **采集**：pipeline 保存 RSS/GitHub/arXiv 508 items；GitHub Trending 21 AI repos；bird X 补采集 135 tweets（571 seen / 9 failures，后段触发 429）；sources/2026-06-20 共 650 个 md；新增 Hermes v0.17、OpenClaw 2026.6.9-beta.1、Codex thread handoff、GLM-5.2、Open Notebook v1.10、Elastic Agent Memory、DeepMind AI Control Roadmap 七份 curated source。
- **新增 7 篇文章**：
  - #1 Hermes v0.17 更新了什么，个人 Agent 开始长出真正的交付半径（REACH 9 first-person，Hermes Reach Release / 入口 / 后台子任务 / Skills Hub）
  - #2 OpenClaw 2026.6.9-beta.1，个人助手真正难的是交付不掉线（REACH 9 first-person，消息交付 / agent recovery / Codex 集成）
  - #3 Codex 会话可以交给远程主机继续跑，长任务终于不用困在一台电脑上（REACH 9 first-person，thread handoff / remote host / worktree）
  - #4 长任务 Agent 选模型，别只看 GLM-5.2 的 1M 上下文（REACH 8 first-person，1M context / effort level / 长任务 benchmark）
  - #5 自托管资料库别只看聊天，Open Notebook v1.10 先把检索和重试做稳了（REACH 8 first-person，资料 ingest / retry / search fallback / context control）
  - #6 Agent 记忆别再塞进上下文，Elastic 给了一套长期记忆架构（REACH 8 retro，长期记忆 / hybrid retrieval / DLS 隔离）
  - #7 DeepMind 这份 AI Control Roadmap，适合拿来给 Agent 上线前打勾（REACH 8 first-person，Agent 安全 / supervisor / 权限控制）
- **voice 分布**：first-person 6 / narrative 0 / analytical 0 / retro 1。
- **QA 结果**：7/7 全部唯一主稿；每个中文文章目录只保留 1 个 md；无 publish 子目录；发布面扫描 0 命中；npm test 129/129 pass。
- **质量处理**：初始 selector 又命中近几日高频/已写线（Hermes 泛介绍、vLLM、no-mistakes、Codex Record、chatgpt-imagegen），本轮全部替换为 reviewed topics；生成后移除隐藏 REACH 注释，并按 humanizer 规则压低“我会/我建议/不是而是/真正”等复用句式。
- **发现的后续改进**：自动 selector 仍然容易被高优先级旧实体吸引，需要引入最近 3-5 天标题/实体历史惩罚；source 质量层应把 release 正文自动摘要到 curated/fact 层，减少手工补源；X 抓取仍需无效账号清理和 429 backoff。

## [2026-06-19] generate | 7 drafts, reviewed topics, official/curated anchors

- **采集**：pipeline 保存 RSS/GitHub/arXiv 528 items；GitHub Trending 21 AI repos；bird X 补采集 143 tweets（575 seen / 9 failures，后段触发 429）；sources/2026-06-19 共 678 个 md；新增 Codex Record & Replay、Claude Code Artifacts、baoyu-design、Adobe、MosaicLeaks、ARD、Probe-and-Refine 七份 curated source。
- **新增 7 篇文章**：
  - #1 Codex 录一次操作就能生成 Skill，重复工作终于不用写成说明书（REACH 9 first-person，Record & Replay / Computer Use / Skill）
  - #2 Claude Code Artifacts 把终端结果变成网页，团队终于能看见 Agent 干了什么（REACH 9 first-person，Claude Code 输出层 / 团队协作）
  - #3 baoyu-design 能自动给 PPT 配图了，Agent Skill 开始补上内容交付的最后一块（REACH 8 first-person，本地 Skill / PPTX / AI 配图）
  - #4 Adobe 给 Photoshop 和 Premiere 加 AI 助手，创意软件开始记住项目上下文（REACH 8 narrative，Creative Cloud / Firefly / 项目上下文）
  - #5 研究 Agent 也会泄密，MosaicLeaks 提醒我们别只盯着最终回答（REACH 8 first-person，Deep Research / RAG 隐私 / 工具调用泄露）
  - #6 MCP、Skills、A2A 之后，Agent 还缺一个搜索能力的入口（REACH 8 first-person，ARD / 能力发现层）
  - #7 AGENTS.md 不能只靠手感写，Probe-and-Refine 把仓库说明变成可测试资产（REACH 8 first-person，AGENTS.md / coding agent guidance）
- **voice 分布**：first-person 6 / narrative 1 / analytical 0 / retro 0。
- **QA 结果**：7/7 全部唯一主稿；每个中文文章目录只保留 1 个 md；发布面扫描 0 命中；npm test 129/129 pass。
- **质量处理**：初始 selector 命中的 Hermes/no-mistakes/vLLM/OpenAI SDK/Ollama 与 06-17/06-18 重叠，本轮全部替换；RSS 中多篇空正文或短摘要源先补 curated official/source summary，再生成；生成后移除隐藏 REACH 注释。
- **发现的后续改进**：X 抓取仍需清理无效账号和 429 backoff；The Verge / DeepMind / Hugging Face 这类源有时正文较短或为空，应继续自动补 fetch/curated 摘要；选题器仍偏好近两日高频实体，需要更强的历史去重惩罚。

## [2026-06-18] generate | 7 drafts, reviewed topics, curated release sources

- **采集**：pipeline 保存 RSS/GitHub/arXiv 508 items；GitHub Trending 21 AI repos；bird X 补采集 134 tweets（567 seen / 9 failures，后段触发 429）；新增 OpenClaw v2026.6.8、Hermes Agent v0.16.0、Firecrawl v2.10 三份官方 release 摘要源；sources/2026-06-18 共 645 个 md。
- **新增 7 篇文章**：
  - #1 Agent 终于能交付给别人用了，Hermes v0.16.0 补上界面层（REACH 9 first-person，Hermes Agent 桌面版 / 中文界面 / 远程网关）
  - #2 个人 AI 助手靠不靠谱，OpenClaw v2026.6.8 给了检查表（REACH 9 first-person，OpenClaw 可靠性 / 多通道交付）
  - #3 Firecrawl v2.10 更像 Agent 的资料入口了，网页、文件、证据句都能进工作流（REACH 8 first-person，资料采集 / Agent 工作流）
  - #4 Agent Skill 怎么越用越准，Warp 这套 issue 反馈闭环值得抄（REACH 8 first-person，Skill 反馈闭环）
  - #5 Sakana Marlin 给了一个新信号，深度研究 Agent 开始按小时推理（REACH 7 first-person，长推理研究 Agent）
  - #6 Claude Cowork 把 Claude Code 的思路搬到文件夹里，非程序员也能用 Agent 干活（REACH 8 first-person，文件夹协作 Agent）
  - #7 Gemini 3.5 Live Translate 的重点，是实时语音翻译终于开始进入日常产品（REACH 7 narrative，实时语音翻译）
- **voice 分布**：first-person 6 / narrative 1 / analytical 0 / retro 0。
- **QA 结果**：7/7 全部唯一主稿；每个中文文章目录只保留 1 个 md；发布面扫描 0 命中；npm test 129/129 pass。
- **质量处理**：初始 selector 命中的 Ollama/vLLM/Codex 与 06-17 重叠，本轮用 reviewed topics 文件替换；OpenClaw/Hermes/Firecrawl 改用官方 release 摘要源补事实密度；生成后移除隐藏 REACH 注释和短链。
- **发现的后续改进**：X 抓取仍需 backoff / invalid-account 清理；RSS 失效源继续产生噪音；release 类素材应稳定进入预摘要层，避免只靠 GitHub Trending 摘要生成平淡文章。

## [2026-06-17] generate | 7 drafts, reviewed topics, X source recovery

- **采集**：pipeline 保存 RSS/GitHub/arXiv 508 items；GitHub Trending 21 AI repos；bird X 补采集 115 tweets（517 seen / 13 failures，后段触发 429）；补充 OpenClaw v2026.6.8 官方 release/README 摘要源；sources/2026-06-17 共 631 个 md。
- **新增 7 篇文章**：
  - #1 个人 AI 助手更稳了，OpenClaw v2026.6.8 补齐多通道交付（REACH 9 first-person，OpenClaw release / 多通道可靠性）
  - #2 Hermes Studio v0.6.15 长对话、技能命令和本地 Runtime 都更顺了（REACH 9 first-person，Hermes 新版本 / 本地 runtime）
  - #3 OpenAI Python SDK 2.42.0，先看懂 spend_alerts，再给团队 API 花费上闸门（REACH 8 first-person，API 成本控制）
  - #4 Codex 操控电脑的三种方式，什么时候用 Computer Use、Chrome 扩展和内置浏览器（REACH 9 analytical，Codex 自动化入口选择）
  - #5 AI 写代码之后，怎么守住 PR 质量，no-mistakes 的本地闸门思路（REACH 8 first-person，代码交付门禁）
  - #6 vLLM 0.23.0 更新，DeepSeek-V4 和 Qwen3 部署党该看哪些变化（REACH 8 analytical，推理部署升级清单）
  - #7 Ollama 一次跑 Kimi、GLM、DeepSeek、Qwen，本地模型玩家该怎么选第一套组合（REACH 9 first-person，本地模型选型）
- **voice 分布**：first-person 5 / analytical 2 / retro 0。
- **QA 结果**：7/7 全部唯一主稿；每个文章目录只保留 1 个 md；发布面扫描 0 命中；npm test 129/129 pass。
- **技能/流程更新**：新增 npm run fetch:x；daily 支持 --topics-file 审核后生成；选题 prompt 增加同实体/同产品线去重；发布面守卫新增 AI 辅助/非实测元叙事扫描；manifest 支持 superseded，避免多次 dry-run 的旧候选污染状态。
- **发现的后续改进**：X 抓取需要 delay / 429 后停止策略；RSS 失效源仍需清理；长 X 帖和 release 源应先摘要再生成以缩短运行时间；manifest 可增加 reviewed_set_id 便于追踪最终选题批次。

## [2026-06-16] generate | 7 drafts, REACH>=8, single XHS-safe main version

- **采集**：RSS/GitHub/arXiv 508 new items；GitHub Trending 23 AI repos；PyPI trends 1 份摘要；bird X 保存 213 条来源；TrendRadar Docker 路径缺失 soft-fail；sources/2026-06-16 共 745 个 md
- **新增 7 篇文章**：
  - #1 个人 AI 助手从脚本变长期工作流，NousResearch Hermes Agent 更新了（REACH 9 first-person，Hermes Agent 新版本 / 长期工作流）
  - #2 OpenClaw 最新仓库更新，为什么个人 AI 助手开始强调 Any OS、Any Platform（REACH 9 first-person，OpenClaw 最新仓库动态）
  - #3 Codex 免费重置次数可以攒着用了，什么时候用最划算？（REACH 9 first-person，Codex 额度排班）
  - #4 ChatGPT 订阅也能直接生图，chatgpt-imagegen 把 Pro 会员价值榨出来了（REACH 9 first-person，本地生图工具）
  - #5 免费 LLM API 资源清单又火了，哪些适合个人项目先跑起来？（REACH 9 analytical，低成本原型入口）
  - #6 本地跑模型第一台机器怎么选，Ollama 已支持 Kimi-K2.6、GLM-5.1、DeepSeek（REACH 8 first-person，本地模型选型）
  - #7 用 n8n 搭一个自动化助手，400+ 集成别一上来全接（REACH 8 first-person，AI 工作流自动化）
- **voice 分布**：first-person 6 / analytical 1 / retro 0
- **QA 结果**：7/7 全部唯一主稿；每个文章目录只保留 1 个 md；发布面扫描 0 命中；npm test 122/122 pass
- **技能/规则更新**：生成提示和发布面守卫新增“内部写作约束泄漏”与敏感来源字面黑名单；manifest 失败错误改为脱敏摘要，避免历史错误文本污染发布面扫描
- **实体/主题页同步**：新增/追加 openclaw、Hermes Agent、NousResearch、Codex、ChatGPT、Ollama、n8n、GitHub，以及 agent-frameworks、local-first-ai、local-inference、ai-workflows、developer-tools、ai-pricing、ai-productivity


## [2026-05-22] generate | 7 drafts, REACH>=7, single XHS-safe main version

- **采集**：RSS/GitHub/arXiv 517 items；GitHub Trending 56 AI repos；OpenRouter 2 new（Qwen3.7 Max / Grok Build 0.1）；PyPI 部分 429；bird X 失败（cookies 全失效）
- **新增 7 篇文章**：
  - #1 OpenAI 证否 Erdős 80 年单位距离猜想 1000 美元（REACH 9 analytical，ai-for-science 新主题）
  - #2 阿里 Qwen3.7 Max OpenRouter 100 万上下文 白菜价（REACH 9 first-person，国产模型出海）
  - #3 xAI Grok Build 0.1 编程模型 比 Codex 便宜 5 倍（REACH 8 analytical，AI 编程价格战）
  - #4 港大 ViMax 一个 prompt 当导演（REACH 8 first-person，国产学界视频 agent）
  - #5 Anthropic Claude Plugins 官方目录（REACH 8 first-person，skill 市场化）
  - #6 Chrome DevTools MCP 官方上线（REACH 7 first-person，前端 AI 联调）
  - #7 Cloudflare CEO + Meta 万人裁员（REACH 7 analytical，AI 劳动力替代新主题）
- **voice 分布**：first-person 4 / analytical 3 / retro 0
- **QA 结果**：7/7 全过，L1 机械替换 3 处，L6 小红书规则 7/7 pass，platforms.xhs 全部 primary
- **降权命中**：严格避开 5/20-5/19-5/18 已写主题（Gemini I/O / Codex Windows / OpenViking / 飞书 CLI / Karpathy HTML 等已严格去重）
- **wiki 同步待办**：实体页 erdos / qwen / qwen-3-7-max / xai / grok / grok-build / musk / hkuds / vimax / cloudflare / mcp / claude-plugins / chrome-devtools-mcp 待新建；openai / alibaba / openrouter / anthropic / claude-code / google / chrome / meta 实体页追加 5/22 条目；主题 ai-for-science / ai-workforce 待新建，ai-research / ai-pricing / chinese-ai / agent-frameworks / ai-coding-tools / ai-video / creator-economy / developer-tools / enterprise-ai / ai-productivity 追加

## [2026-05-20] generate | 7 drafts, REACH>=8, single XHS-safe main version

- **采集**：RSS/GitHub/arXiv 497 items；GitHub Trending 50 AI repos；OpenRouter 0 new；PyPI 部分 429；TrendRadar 正常；bird X 失败（Keychain exit 36），全 cookies 失效
- **新增 7 篇文章**：
  - #1 Google I/O 2026 八连发 综述（REACH 10 analytical，google/gemini/gemini-3-5-flash）
  - #2 Gemini Spark Gmail 24/7 agent（REACH 9 first-person，gemini-spark/gmail）
  - #3 AI Studio Android vibe code（REACH 9 analytical，android）
  - #4 OpenViking 字节火山 文件系统（REACH 9 first-person，openviking/volcengine/openclaw 优先品牌）
  - #5 NousResearch hermes-agent（REACH 8 first-person，nousresearch 优先品牌 + openclaw 标记）
  - #6 OpenAI Codex Windows + Dell on-prem（REACH 8 analytical）
  - #7 Simon Willison 半年回顾（REACH 8 retro）
- **voice 分布**：first-person 3 / analytical 3 / retro 1
- **QA 结果**：7/7 全过；L1 机械替换 6 处（OpenViking 2 处人工二次修复"砍掉/变笨了"→"省/变慢"）；L6 小红书规则 7/7 pass；platforms.xhs 全部 primary
- **降权命中**：5/20 没有重复 5/17-5/19 已写主题（Gemini API tier / Qwen MTP / Codex 远程 / Karpathy HTML / Karpathy 编程教训 等已严格去重）
- **wiki 同步待办**：实体页 openviking / hermes-agent / nousresearch / gemini-spark / dell / volcengine / gemini-3-5-flash / android / gmail 待新建或追加；google/openai/codex/simon-willison/bytedance/openclaw/claude-code 实体页追加 5/20 条目；主题 ai-product / ai-productivity / enterprise-ai / ai-infra / chinese-ai 追加

## [2026-05-18] supplement | 1 draft afternoon top-up (Karpathy HTML)

- **触发**：下午基于 X karpathy 17k 赞爆款补番 1 篇（上午已完成 9 篇）
- **新增**：Karpathy 让 AI 用 HTML 回答 17k 赞爆款 输出格式正在变天（REACH 9 first-person，karpathy / claude / chatgpt / ai-prompt-engineering / ai-product）
- **QA**：L1 替换 1 处，L2:8 / L3:8 / L4:pass / L5:9 / L6:pass / xhs_pass:true，1 轮通过
- **xhs**：REACH 9 触发 → 生成 xhs-version.md 1755 字（小红书风格 emoji + 短句 + tag）
- **实体页**：karpathy.md 更新「HTML 输出 prompt 技巧」动态 + 覆盖表新条目
- **降权提醒**：karpathy 短期累计 5 次（30 天），下一次需要明显新角度

## [2026-05-19] regenerate | 8 drafts, single XHS-safe main version, RSS+X+signals

- **采集**：RSS/GitHub/arXiv 498 items；GitHub Trending 33 AI repos；OpenRouter 0 new；PyPI checked（anthropic 429）；TrendRadar Docker 目录缺失 soft-fail
- **X 抓取**：bird 成功保存 218 tweets（123 account / 95 home+following），failures 0
- **新增 8 篇文章**：#1 Google Gemini API 新增 Flex 和 Priority 两档（REACH 9 analytical）；#2 Qwen3.6-27B MTP 在 llama.cpp 跑到 60 tokens/s（REACH 8 first-person）；#3 Anthropic 收购 Stainless SDK 和 MCP 服务器（REACH 8 analytical）；#4 Claude Code 创始人 Boris Cherny 工作流（REACH 9 analytical）；#5 Agent Game Forge 2D 游戏 IDE（REACH 8 first-person）；#6 TRAE 真实用户 Top 10 Agent Skills（REACH 8 analytical）；#7 MIT GenCAD / CAD-Coder 可编辑 CAD 程序（REACH 8 retro）；#8 Codex 远程接管 Mac mini 和 devbox（REACH 8 first-person）
- **voice 分布**：first-person 3 / analytical 4 / retro 1
- **QA 结果**：8/8 全过；L1 机械替换 2 处；L6 小红书规则 8/8 pass；无 xhs-version.md；8 篇全部为唯一主稿 `xhs:primary`
- **实体/主题页同步**：gemini-api / stainless / boris-cherny / agent-game-forge / gencad / cad-coder / agent-skills / trae 及 ai-game-dev / generative-design / industrial-design / remote-development / devbox / ai-workflows / developer-tools / ai-infra 追加 5/19 条目

## [2026-05-18] generate | 9 drafts, REACH>=7, RSS+X+signals

- **采集**：RSS/GitHub/arXiv 498 items + GitHub Trending 32 AI repos + OpenRouter 0 new + PyPI checked + TrendRadar 保存 17 条中文热点
- **X 抓取**：bird 成功保存 221 tweets（127 accountTweets / 89 home / 5 following），failures 0
- **新增 9 篇文章**：#1 Seedance 2.0 做出 2 小时 AI 电影 成本账比流量更刺眼（REACH 8 analytical）；#2 K-Dense 135 个科研 Skill 开源 Claude Code 和 Codex 可以变科研助理（REACH 8 first-person）；#3 Dograh 一条 Docker 命令自建语音客服 不用先按分钟买 SaaS（REACH 8 first-person）；#4 Google Gemini CLI 10 万星 终端 agent 每天 1000 次免费额度怎么用（REACH 9 first-person）；#5 飞书 CLI 过万星 200 个命令让 Agent 接进办公系统（REACH 9 analytical）；#6 DreamServer 一条命令把本地 AI 全家桶跑起来 Mac Windows Linux 都能用（REACH 8 first-person）；#7 OpenHuman 把个人 AI 记忆写进本地 Obsidian 118 个集成自动同步（REACH 8 analytical）；#8 NVIDIA Sana 让 8GB 显存跑 4K 生图 创作者又多一个本地模型选项（REACH 8 retro）；#9 华为昇腾 384 集群落地无锡 Token 工厂开始按智能单元计费（REACH 7 analytical）
- **voice 分布**：first-person 4 / analytical 4 / retro 1
- **QA 结果**：9/9 全过结构和合规检查；L1 机械替换 0 处；8 篇 xhs:compliant，1 篇 xhs:primary，0 篇 xhs:blocked
- **实体/主题页同步**：seedance-2-0 / bytedance / k-dense-scientific-agent-skills / dograh / gemini-cli / feishu / lark-cli / dreamserver / openhuman / obsidian / sana / ascend / huawei 及 ai-video / creator-economy / ai-education / agent-frameworks / voice-ai / ai-coding-tools / ai-pricing / ai-productivity / local-inference / ai-hardware / chinese-ai 追加 5/18 条目

## [2026-05-17] generate | 9 drafts, REACH>=7, RSS+X+signals

- **采集**：RSS/GitHub/arXiv 478 items + GitHub Trending 32 AI repos + OpenRouter 0 new + PyPI checked + TrendRadar Docker 恢复并保存 13 条中文热点
- **X 抓取**：bird 成功保存 227 tweets（120 accounts / 94 home / 13 following），failures 0
- **新增 9 篇文章**：#1 乔木 NotebookLM Skill 把公众号和 PDF 变播客课件（REACH 9 first-person）；#2 闲鱼自动回复开源项目 多账号客服和自动发货自己搭（REACH 9 first-person）；#3 LEANN 本地 RAG 省 97% 存储 个人知识库不用先买硬盘（REACH 8 first-person）；#4 CodeGraph 给 Claude Code 先建代码图 少烧 token 少查文件（REACH 8 first-person）；#5 豆包把手机号标成卖野猪 个人号码被 AI 搜索误伤（REACH 9 analytical）；#6 Google AI 鼠标指针 Gemini 要从光标接管屏幕（REACH 8 analytical）；#7 OpenAI 两个月免费 Codex 抢团队默认 IDE（REACH 9 analytical）；#8 Chollet 说 agent 写代码像机器学习 测试集过拟合进评审（REACH 7 retro）；#9 Shannon Lite 开源 AI 渗透测试 先读源码再证明漏洞（REACH 8 analytical）
- **voice 分布**：first-person 4 / analytical 4 / retro 1
- **QA 结果**：9/9 全过基础结构和合规检查；L1 共 2 处机械替换；8 篇 xhs:compliant，1 篇 xhs:primary，0 篇 xhs:blocked
- **实体/主题页同步**：notebooklm / xianyu-auto-reply-fix / leann / codegraph / doubao / google / gemini / openai / codex / sam-altman / chollet / shannon 及 ai-productivity / creator-economy / ai-monetization / local-inference / ai-coding-tools / ai-pricing / ai-life / ai-safety / computer-use-agent / multimodal / ai-methodology 追加 5/17 条目

## [2026-05-16] generate | 10 drafts, REACH>=7, RSS+signals (X 跳过, 5/15 跳天)

- **采集**：RSS/GitHub/arXiv 518 items + GitHub Trending 25 AI repos + OpenRouter 2 new（蚂蚁 Ring-2.6-1T + 百度 Qianfan-OCR-Fast 同日双国产）+ PyPI crewai +27.9% weekly spike + TrendRadar Docker 目录缺失（soft-fail）
- **X 抓取跳过**：bird Chrome cookies 失效（与近 7 日同因），社区反馈全程 last30days（Reddit/HN/GitHub），10/10 成功
- **新增 10 篇文章**：
  - #1 蚂蚁 Ring-2.6-1T 上 OpenRouter 国产万亿 thinking model 几乎免费白嫖（REACH 9 first-person）
  - #2 百度 Qianfan-OCR-Fast 上 OpenRouter 国产 OCR 多模态文档解析新选项（REACH 8 analytical）
  - #3 OpenAI Codex 跑进手机 全平台同步 移动端 vibe coding 国产 IDE 怎么跟（REACH 9 analytical）
  - #4 Clawdmeter 把 Claude Code 用量做成桌面小挂件 openclaw 生态又冒新成员（REACH 9 first-person，优先品牌 +1 boost 触发）
  - #5 Cerebras 600 亿美元 IPO 算力公司大事件 国产昇腾 Cambricon 估值怎么算（REACH 7 analytical）
  - #6 OpenAI 让 ChatGPT 接管你的银行账户 Plaid 国内豆包元宝为什么做不到（REACH 8 analytical）
  - #7 MIT TR 中国短剧变成 AI 内容机器 横店 AI 编剧 5 天出 100 集实操路径（REACH 8 narrative）
  - #8 whichllm 282 HN 票一键查你的电脑能跑得动哪个本地 LLM（REACH 7 first-person）
  - #9 Anthropic 官方 Claude Code 大代码库使用手册 237 HN 票最佳实践拆解（REACH 8 retro）
  - #10 anthropic/skills 官方仓库一天 923 颗星 Claude Skills 四派归一（REACH 8 analytical）
- **voice 分布**：first-person 4 / narrative 1 / analytical 4 / retro 1。比 5/14 更均衡，narrative 首次回归（#7 短剧产业链事件追踪）
- **优先品牌 openclaw 生态新成员命中**：#4 Clawdmeter 是 5/12 openclaw 主仓库后第一个生态层新工具（clawd 前缀），优先品牌 +1 boost 触发 REACH 9
- **新空间打开 6 条**：
  - 国产 AI 双线同日上 OpenRouter（蚂蚁万亿 + 百度 OCR）
  - openclaw 生态横向工具层启动（Clawdmeter）
  - OpenAI Codex 全平台五条腿齐（CLI/Web/Desktop/Mobile/IDE）
  - AI 影视+创作者经济双线交叉持续（中国短剧）
  - AI 金融 user-facing 实操首次落地（ChatGPT+Plaid 银行账户）
  - Skills 生态官方收编（anthropic/skills 四派归一）
- **QA 结果**：10/10 全过 overall_pass。L2 平均 8.2 / L3 平均 8.2 / L4 全 pass / L5 平均 7.9 / L6 全过 0 fail。L1 共 12 处机械替换。rounds 平均 0（零质修循环，全部首轮过）
- **Step 4.6**：8 篇 xhs:compliant（#1-#4 #6 #7 #9 #10，reach ≥ 8 主动触发）；2 篇 xhs:primary 直发（#5 Cerebras IPO / #8 whichllm，reach=7）；0 篇 xhs:blocked
- **实体/主题页同步**：ant-group / inclusion-ai / baidu / openai / anthropic / cerebras（新建）/ openclaw-org / matt-pocock / openrouter / codex / chatgpt / claude-code / qianfan / clawdmeter（新建）追加 5/16 条目；chinese-ai / ai-pricing / open-models / ocr / multimodal / ai-coding-tools / vibe-coding / openclaw-ecosystem / ai-hardware / ai-mergers / ai-finance / ai-monetization / creator-economy / ai-film（新建）/ local-inference 追加 5/16 条目

## [2026-05-14] generate | 10 drafts, REACH>=7, RSS+signals (X 跳过)

- **采集**：RSS/GitHub/arXiv 498 items + GitHub Trending 31 AI repos + OpenRouter 1 new (DeepSeek V4 Flash free 上线) + PyPI 大量 429（rate limit）+ TrendRadar Docker 目录缺失（soft-fail）
- **X 抓取本期跳过**：bird CLI Chrome cookies 失效，与近 5 日同因。社区反馈全程依赖 last30days（Reddit/HN/GitHub 三源），10 个选题全部成功拉到
- **新增 10 篇文章**：
  - #1 DeepSeek V4 Flash 今天上 OpenRouter 免费白嫖 256K 上下文 + 百万 token agent 实测（REACH 10 first-person）
  - #2 Goose 26100 stars 完全免费 Claude Code 替代 一年省 2400 美元（REACH 9 first-person）
  - #3 OpenAI Codex on Windows 沙箱来了 国产 AI 编程 IDE 怎么跟（REACH 8 analytical）
  - #4 Notion Developer Platform 把工作区变 AI agent 中心 飞书钉钉语雀怎么抄（REACH 8 analytical）
  - #5 Simon Willison Claude Code + HTML 不合理有效性 一份 prompt 出可发布原型（REACH 8 first-person）
  - #6 Google Gemma 4 字节级最强开源模型 国产 Qwen DeepSeek 怎么追（REACH 8 analytical）
  - #7 Anthropic 业务客户首次超过 OpenAI 国内中小老板的 Claude 路线（REACH 7 analytical）
  - #8 OpenAI 上线 ChatGPT Trusted Contact 紧急联系人 国内豆包元宝心理健康对照（REACH 7 analytical）
  - #9 DeepSeek V3 → V4 架构演进 sparse attention RL 三步跳（REACH 7 retro）
  - #10 The Verge: vibe coding 革命 个人软件平民化 国产路线对照（REACH 7 analytical）
- **voice 分布**：first-person 3 / narrative 0 / analytical 6 / retro 1。analytical 主导（行业事件密集），first-person 工具实测 3 篇（#1 #2 #5），retro 论文拆解 1 篇（#9）
- **优先品牌**：openclaw 371k + Hermes 149k stars GitHub Trending 持续在榜但无新事件 → 跳过。下一轮见到新动态依然优先选入
- **新空间打开 6 条**：
  - **DeepSeek V4 当日双事件**（#1 V4 Flash OpenRouter 免费 256K + #9 Raschka 架构演进 sparse attention，工具实测+论文拆解同日双切）
  - **AI 编程工具平替+省钱叙事**（#2 Goose 26100 stars 一年省 2400 美元，明确"免费替代闭源订阅"路线）
  - **Vibe Coding 范式独立成主题**（#5 Simon Willison HTML + #10 Verge 长篇叙事，从 5/13 工具讨论升级到独立主题，新建 wiki/topics/vibe-coding.md）
  - **AI 办公协同首次单独立线**（#4 Notion Developer Platform AI agent hub，国内飞书钉钉语雀对照路径，新建 wiki/topics/ai-productivity.md）
  - **AI 安全用户保护分支**（#8 ChatGPT Trusted Contact，AI 安全从供应链/漏洞扩到"用户心理健康保护"）
  - **企业 AI 客户结构变化**（#7 Anthropic 业务客户首次超 OpenAI，5/13 DeployCo 之后第 2 个企业商业化叙事）
- **QA 结果**：10/10 全过 overall_pass。L2 平均 8.3 / L3 平均 8.3 / L4 全 pass / L5 平均 7.8 / L6 全过 0 fail。L1 共 7 处机械替换。rounds 平均 0.5（前 5 篇首轮过、后 5 篇 1 轮微调）
- **Step 4.6**：6 篇生成 xhs-version.md（#1 #2 #3 #4 #5 #6，reach >= 8 主动触发）；4 篇 xhs:primary 直发主版本（#7 #8 #9 #10，reach=7 + L6 pass）；0 篇 xhs:blocked
- **实体/主题页同步**：deepseek / openrouter / block / anthropic / openai / notion / google / simon-willison / sebastian-raschka / codex / claude-code / chatgpt + ai-pricing / ai-coding-tools / chinese-ai / agent-frameworks / ai-monetization / ai-safety 追加 5/14 条目；新建 ai-productivity / vibe-coding / open-models / llm-architecture / ai-life / ai-democratization 六个新主题页

## [2026-05-13] generate | 10 drafts, REACH>=7, RSS+signals (X 跳过)

- **采集**：RSS/GitHub/arXiv 552 items + GitHub Trending AI repos + OpenRouter 0 new + PyPI 0 new spike + TrendRadar Docker 目录缺失（soft-fail）
- **X 抓取本期跳过**：bird CLI Chrome Safe Storage exit 36 + 无 SWEETISTICS_API_KEY，社区反馈用 last30days（Reddit/HN/GitHub 三源）替代，与 5/10 / 5/11 / 5/12 同因
- **新增 10 篇文章**：
  - #1 Claude Opus 4.7 Fast 上 OpenRouter，6 倍价格换速度，1M 上下文（REACH 9 first-person）
  - #2 Claude Platform 登陆 AWS，SDK v0.101 对接 Bedrock，国内云厂商怎么抄（REACH 8 analytical）
  - #3 Cactus 把 Gemini tool calling 蒸馏成 26M，6000 tok/s 手机跑（REACH 9 first-person）
  - #4 HN 1848 票"Local AI 必须主流"，国内本地推理三档路线（REACH 8 analytical）
  - #5 OpenAI DeployCo 把企业 AI 落地做成独立公司，国内乙方机会（REACH 7 analytical）
  - #6 Android 17 agentic AI + vibe-widgets，小米 OPPO 怎么跟（REACH 8 first-person）
  - #7 Hollywood 失业编剧给 AI 标剧本，国内横店网文会不会下一个（REACH 7 analytical）
  - #8 Nathan Lambert "Finetuning 时代结束了"，1M context + RAG 取代（REACH 7 retro）
  - #9 AI 数据中心吃光美国农村电网，马里兰 20 亿账单，对照贵州（REACH 7 analytical）
  - #10 Imbad0202 academic-research-skills 把 Claude Code 改造成学术流水线（REACH 8 first-person）
- **voice 分布**：first-person 4 / narrative 0 / analytical 5 / retro 1。analytical 占主导（行业事件密集 + 现象解读 #2 #4 #5 #7 #9 五篇组合），first-person 工具实测 4 篇（#1 #3 #6 #10），retro 方法论 1 篇（#8 Nathan Lambert）
- **优先品牌**：openclaw 371k stars 持续涨但无新事件 → 跳过本期（5/12 #1 刚出过 371k 5 组件全景）；NousResearch hermes-agent 147k stars 同样持续涨但无新事件 → 跳过。本期没有命中 +1 boost。下一轮见到新动态依然优先选入
- **新空间打开 8 条**：
  - **Anthropic 行业事件密集**（#1 Opus 4.7 Fast + #2 Claude Platform on AWS 单日双重大 SDK/模型事件，本号首次）
  - **小模型蒸馏 + tool calling 端侧**（#3 Cactus Needle 26M 把 agent 推到手机/手表，新范式）
  - **本地推理潮叙事整合**（#4 HN 1848 票把本地推理拉升到"必须主流"叙事，行业共识级节点）
  - **企业 AI 落地角色化**（#5 OpenAI DeployCo 首次把"乙方"角色官方化）
  - **AI 训练数据 + 创作者经济双线**（#7 Hollywood 反向利用，AI+影视首次成线）
  - **Finetuning 时代结束**（#8 Nathan Lambert 大叙事，方法论判断点）
  - **AI 基础设施监管警报**（#9 马里兰 20 亿账单，AI+监管首次单独成线）
  - **学术 skills 第四派**（#10 academic-research-skills，官方/KOL/平台/学术四派成熟）
- **主题饱和变化**（详见 topic-saturation.md，5/12 末态 268 篇 → 5/13 278 篇）：
  - AI 编程工具 52 → **55**（+#1 #2 #10，全部 SDK 重大事件/重大模型迭代/KOL 例外）
  - AI 定价 37 → **38**（+#1 Opus 4.7 Fast 6 倍价格档位）
  - Agent 框架 51 → **52**（+#2 主题为主 + #3 边缘，主主题计 1）
  - 本地推理 23 → **25**（+#3 Cactus + #4 HN 叙事整合）
  - AI 变现 1 → **2**（+#5 DeployCo 乙方角色官方化）
  - OpenAI 行业事件 +1（+#5 DeployCo 第 5 次单独立线）
  - AI 硬件 12 → **14**（+#6 Android 17 + #9 基础设施账单）
  - 多模态 19 → **20**（+#6 Android 17 vibe-widgets）
  - AI 训练数据 +1（+#7 Hollywood 反向标剧本）
  - 创作者经济 1 → **2**（+#7）
  - AI 影视 新主题首次（+#7，提示新建 wiki/topics/ai-film.md）
  - AI 研究 17 → **18**（+#8 Nathan Lambert）
  - 方法论 11 → **12**（+#8 主主题 + #10 边缘）
  - AI+教育 6 → **7**（+#10 academic-research-skills）
- **QA 10/10 全过 overall_pass**。L2 平均 ~8.0、L3 平均 ~7.8、L4 全 pass、L5 平均 ~7.6、L6 9 pass / 1 fail（#6 Android 17 "干翻"字面词，xhs 版已修复）。L1 共 **~17 处机械替换**。rounds 平均 0.6（多数一次过）
- **Step 4.6**：**6 篇生成 xhs-version.md**（#1 #2 #3 #4 #6 #10，reach ≥ 8 主动触发 + #6 L6 fail 必修）；4 篇 xhs:primary 直发主版本（#5 #7 #8 #9，均 reach=7 + L6 pass）；0 篇 xhs:blocked
- **下一轮选题方向**（沿用 5/12 8 条，标注已部分覆盖）：
  - AI 影视/娱乐（5/13 #7 已**首次切入**，下一轮追爱奇艺 AI 艺人库 / 国产横店 AI 编剧 / B 站 AI 视频）
  - AI+医疗（4 月 2 篇后无新增）
  - 具身智能国产对照（5/7 后下一轮可单独覆盖宇树/小鹏 IRON/智元/银河通用）
  - 创作者经济（5/12 #4 AiToEarn + 5/13 #7 Hollywood，已深化，可继续追平台分发工具）
  - AI 训练数据/隐私边界（5/13 #7 已首次切入反向利用，下一轮追 Meta 录键鼠后续 / 国内平台跟进）
  - RAG 国产对照（5/13 #8 Nathan Lambert "Finetuning 结束 = RAG 接棒"叙事可对照 Dify / FastGPT）
  - AI 法律 / 监管（5/13 #9 已首次切入基础设施监管，下一轮追算力税 / 国内贵州能耗考核）
  - AI 变现深化（5/13 #5 DeployCo 已新增乙方角色化子线，下一轮追国产 AI 乙方公司 / 阿里云/火山 DeployCo 对照）

## [2026-05-12] generate | 10 drafts, REACH>=8, RSS+signals (X 跳过)

- **采集**：RSS/GitHub/arXiv 530 items + GitHub Trending AI repos + OpenRouter 0 new + PyPI 10 packages（无 trending spike）+ TrendRadar Docker 目录缺失（soft-fail）
- **X 抓取本期跳过**：bird CLI Chrome Safe Storage exit 36 + 无 SWEETISTICS_API_KEY，社区反馈用 last30days（Reddit/HN/GitHub 三源）替代，与 5/10 / 5/11 同因
- **新增 10 篇文章**：
  - #1 openclaw 371k 星了，clawhub/clawdbot/moltbot 这条线现在长什么样（REACH 10 first-person）
  - #2 NousResearch hermes-agent 146k 星了，一天涨 2065 星到底在涨什么（REACH 10 analytical）
  - #3 Matt Pocock 把自己 .claude/skills 目录开源了，一天涨 3886 星（REACH 9 first-person）
  - #4 AiToEarn 单日 +427 星，国产开源 AI 多账号矩阵营销项目突然冒出来（REACH 9 first-person）
  - #5 jundot/omlx 把 Mac mini 变 LLM 推理服务器，菜单栏一点就能跑（REACH 9 first-person）
  - #6 OpenAI Daybreak 杀来了，Mythos 第三个对手登场，AI 漏洞挖掘工作流到底怎么用（REACH 9 analytical）
  - #7 智谱 GLM-5 Coding Agent 大规模 serving 的工程踩坑（REACH 9 retro）
  - #8 everything-claude-code 18 万星，agent harness 性能优化系统第一次有人系统做（REACH 8 first-person）
  - #9 《动手学大模型 Dive into LLMs》单日 +422 星，国产从零教大模型实战教程（REACH 8 first-person）
  - #10 Mira Murati 的 Thinking Machines 发了 "interaction models"，AI 边听边说要怎么用（REACH 8 analytical）
- **voice 分布**：first-person 6 / narrative 0 / analytical 3 / retro 1。first-person 主导（工具实测 + KOL 方法论 + 国产开源教程组合发力），narrative 缺位是因本期没有强叙事人物事件
- **优先品牌**：**openclaw + NousResearch 双线收**（连续 3 轮跳过后硬性入选）——#1 openclaw 主仓库 371k 5 组件生态全景（第一次把 clawhub/clawdbot/moltbot/molty 完整画图）+ #2 NousResearch hermes-agent 146k 一天涨 2065 星（NousResearch 实体首次以"持久成长 agent 单日跳点"切入）。优先品牌 +1 boost 双触发，REACH 均到 10
- **新空间打开 7 条**：
  - **openclaw 生态横向梳理** 子线（#1 第一次把 5 组件 clawhub/clawdbot/moltbot/molty 完整画图）
  - **AI 变现工具实操** 首次落地（#4 AiToEarn 国产开源多平台分发，AI 变现从行业事件升级到工具实操）
  - **Apple Silicon LLM 服务器** 第五条本地推理路线（#5 omlx 菜单栏 + SSD 缓存）
  - **AI 安全三方混战** 子线（#6 OpenAI Daybreak 入场，Anthropic Mythos / Google GTIG 三方对照）
  - **国产 AI 工程透明化** 子线（#7 智谱主动公开 GLM-5 serving 踩坑实录）
  - **AI agent harness 工具产品化** 子线（#8 everything-claude-code 18 万星，从社区版/KOL 版/官方版升级到平台版）
  - **实时语音第三家** 子线（#10 TML interaction models 加入 OpenAI/Anthropic 之外）
- **主题饱和变化**（详见 topic-saturation.md，5/11 末态 258 篇 → 5/12 268 篇）：
  - openclaw 生态 7 → **9**（+#1 #2，优先品牌双线收）
  - Agent 框架 49 → **51**（+#1 #2，优先品牌 +1 boost 例外）
  - AI 编程工具 50 → **52**（+#3 mattpocock + #8 everything-claude-code，KOL 方法论例外）
  - AI 变现 0 → **1**（+#4 AiToEarn 新主题首次单独出篇）
  - 创作者经济 0 → **1**（+#4 同上）
  - 本地推理 22 → **23**（+#5 omlx Apple Silicon 路线）
  - AI 安全 9 → **10**（+#6 Daybreak 重大事件级例外）
  - 供应链安全 18 → **19**（+#6）
  - 国产 AI 32 → **34**（+#7 智谱 GLM-5 + #9 Datawhale，均非 Kimi/DeepSeek/Qwen/字节）
  - AI 研究 16 → **17**（+#7 工程透明化）
  - AI+教育 5 → **6**（+#9 Dive into LLMs）
  - 多模态 18 → **19**（+#10）
  - 语音 AI 5 → **6**（+#10 TML interaction models）
  - 方法论 9 → **11**（+#3 #8）
- **QA 10/10 全过 overall_pass**。L2 平均 8.1、L3 平均 8.0、L4 全 pass、L5 平均 7.6、L6 全过 0 篇违规。L1 共 **14 处机械替换**。rounds 平均 1.0（一次过）
- **Step 4.6**：**10 篇全部生成 xhs-version.md**（reach ≥ 8 + L6 pass 全 10 篇主动触发）；0 篇 xhs:primary；0 篇 xhs:blocked
- **下一轮选题方向**（沿用 5/11 8 条，标注已部分覆盖）：
  - AI 影视/娱乐（仍无覆盖）
  - AI+医疗（4 月 2 篇后无新增）
  - 具身智能国产对照（5/7 后下一轮可单独覆盖宇树/小鹏 IRON/智元/银河通用）
  - 创作者经济（5/12 #4 AiToEarn 已部分覆盖，下一轮追平台分发工具）
  - AI 训练数据/隐私边界
  - RAG 国产对照（5/8 PageIndex 后可追 Dify / FastGPT）
  - AI 法律 / 监管（5/6 Character.AI + Meta 抄书后空白）
  - AI 变现深化（5/12 #4 已首次切入国产开源工具线，下一轮追小红书/字节/百度具体平台动态）

## [2026-05-11] generate | 8 drafts, REACH>=7, RSS+signals (X 跳过)

- **采集**：RSS/GitHub/arXiv 518 items + GitHub Trending 31 AI repos + OpenRouter 0 new + PyPI 10 packages（无 spike）+ TrendRadar Docker 目录缺失（soft-fail）
- **X 抓取本期跳过**：bird CLI Chrome Safe Storage exit 36 + 无 SWEETISTICS_API_KEY，社区反馈用 last30days（Reddit/HN/GitHub 三源）替代
- **新增 8 篇文章**：
  - #1 Mythos 在 Mozilla 之后又找到 curl 漏洞，Daniel Stenberg 一句话救了国内开发者（REACH 9 retro）
  - #2 OpenAI 开始在 ChatGPT 里测广告，国内 GEO/小红书 AI 搜索该怎么准备（REACH 8 analytical）
  - #3 AirLLM 一夜回归 trending，单张 4GB 游戏卡跑 70B 模型（REACH 8 first-person）
  - #4 Anthropic SDK 跳到 v0.100，Managed Agents 多 agent / webhooks / vault SDK 化（REACH 7 first-person）
  - #5 Apple AirPods 给 Siri 装摄像头，国产 AI 眼镜该抄哪一步（REACH 7 analytical）
  - #6 OpenAI realtime 2 API 推新语音模型，国产实时语音怎么对照（REACH 7 analytical）
  - #7 智谱悄悄放出 GLM-OCR，国产 OCR 工具该选哪个（REACH 7 first-person）
  - #8 Anthropic 把官方 skills / 金融 cookbook / 教育课程三仓库一起开源（REACH 7 first-person）
- **voice 分布**：first-person 4 / narrative 0 / analytical 3 / retro 1，跟 5/8 / 5/10 基本一致（narrative 缺位是因为本期没有强叙事人物事件）
- **优先品牌**：openclaw 主仓库 370k stars trending 但无新事件；NousResearch hermes-agent 143k stars trending 但无新发布。本期没有命中优先品牌 +1 boost。但 #1 Mythos curl 间接延伸 NousResearch 生态线（Mythos 已绑定 NousResearch 实体）
- **新空间打开 5 条**：
  - **AI 搜索广告化** 子线（#2 OpenAI 进军广告业务，自助 CPC + 答案独立性首次披露）
  - **苹果 AI 耳塞** 首次落地（#5 Apple AirPods 摄像头给 Siri，design validation 阶段）
  - **OpenAI realtime 2** 实时语音第二代（#6 reason/translate/transcribe + RealtimeReasoningEffort 五档）
  - **Mythos 多开源大项目验证** 子线（#1 从 Firefox 单案例延伸到 curl 第二个证据点，Daniel Stenberg 站台）
  - **Anthropic 行业 cookbook 开源** 子线（#8 financial-services 11 个垂直 agent + courses 5 门课首次官方开源）
- **主题饱和变化**（详见 topic-saturation.md）：
  - AI 安全 8 → **9**（+#1 Mythos curl，Mythos 第二个开源大项目验证例外纳入）
  - 供应链安全 17 → **18**（+#1）
  - OpenAI 行业事件 第 4 次单独立线（5/6 GPT-5.5 Instant、5/8 GPT-5.5-Cyber、5/10 GPT-5.5 价格曲线之后，+#2 ChatGPT 广告 + #6 realtime 2）
  - 本地推理 21 → **22**（+#3 AirLLM）
  - Agent 框架 47 → **49**（+#4 Managed Agents SDK + #8 Anthropic skills 官方，均符合"重大 SDK 事件 + 官方行业 cookbook"例外条款）
  - AI 硬件 11 → **12**（+#5 Apple AirPods 进 AI 耳塞）
  - 语音 AI / TTS 4 → **5**（+#6 OpenAI realtime 2）
  - 多模态 16 → **18**（+#5 AirPods 视觉 + #6 realtime 2 + #7 GLM-OCR）
  - 国产 AI 30 → **32**（+#3 AirLLM 中国作者 + #7 智谱 GLM-OCR；非 Kimi/DeepSeek/Qwen/字节 的新增项目，符合"非这四家"门槛）
  - AI 编程工具 49 → **50**（+#4 Anthropic SDK + #8 anthropics/skills cookbooks，均符合"重大 SDK 事件 + KOL 方法论"例外条款）
- **QA 8/8 全过 overall_pass**。L2 平均 8.0、L3 平均 8.0、L5 平均 7.875。L1 共 **1 处机械替换**（#7 GLM-OCR 一个全角冒号）。L6 全过 0 篇违规
- **Step 4.6**：3 篇生成 xhs-version.md（#1 Mythos / #2 OpenAI 广告 / #3 AirLLM，reach≥8 主动触发）；5 篇 xhs:primary 直发主版本（#4 / #5 / #6 / #7 / #8，均 reach=7 + L6 pass）；0 篇 xhs:blocked
- **下一轮选题方向**：
  - AI 影视/娱乐（仍无覆盖）
  - AI+医疗（4 月 2 篇后无新增）
  - 具身智能国产对照（5/7 Genesis AI / Gemini Robotics 之后下一轮可单独覆盖宇树/小鹏 IRON/智元/银河通用）
  - 创作者经济（5/8 Gemini TTS / 5/10 后仍有空间）
  - RAG 国产对照（5/8 PageIndex 之后可追 Dify / FastGPT）
  - AI 法律 / 监管（5/6 Character.AI + Meta 抄书后空白）
  - AI 训练数据/隐私边界
  - openclaw 生态有新动态优先选入（5/8 之后 5/10 5/11 已连续两轮跳过）

## [2026-05-10] generate | 10 drafts, REACH>=8, RSS+signals (X 跳过)

- **采集**：RSS/GitHub/arXiv 518 items + GitHub Trending 31 AI repos + OpenRouter 2 new models (Tencent Hy3 preview / inclusionAI Ring-2.6-1T free) + PyPI 10 packages (无 trending spike) + TrendRadar Docker 目录缺失（soft-fail）
- **X 抓取本期跳过**：bird CLI Chrome Safe Storage exit 36 + 无 SWEETISTICS_API_KEY，社区反馈用 last30days（Reddit/HN/GitHub 三源）替代
- **新增 10 篇文章**：
  - #1 蚂蚁 Ring-2.6-1T + 腾讯 Hy3 双双上 OpenRouter（万亿模型免费档双子线，REACH 9 first-person）
  - #2 Claude Code CVE-2026-39861 sandbox 逃逸（GHSA 主流 coding agent 第一次 CVE，REACH 9 narrative）
  - #3 Anthropic+SpaceX 5B/yr 300MW Colossus I 算力大单（xAI 输给自己人，REACH 9 analytical）
  - #4 DeepMind AlphaEvolve Gemini 编程 agent 解实际问题（REACH 8 retro）
  - #5 Datawhale hello-agents 1197 星 / 天 国产从零教 agent（REACH 8 first-person）
  - #6 HKUDS AI-Trader 646 星 100% 全自动 agent 交易（REACH 8 analytical）
  - #7 字节 UI-TARS-desktop 552 星 多模态 agent 桌面栈（REACH 8 first-person）
  - #8 GPT-5.5 OpenRouter 价格曲线（输入降 / 输出涨 / 缓存命中率，REACH 8 analytical）
  - #9 Nathan Lambert China AI labs Western 视角访谈（REACH 8 retro）
  - #10 addyosmani agent-skills 3009 星 production engineering（REACH 8 first-person）
- **voice 分布**：first-person 4 / narrative 1 / analytical 3 / retro 2，跟 5/8 完全一致
- **优先品牌**：openclaw 主仓库 stars 增量小（370k）+ 5/8 刚出过，本期未出篇；Hermes Agent 同样跳过（141k 但近 7 天三次覆盖）。本期没有命中优先品牌 boost
- **新空间打开**：
  - **算力分配 vs 算力供给** 子线（#3 SpaceX Colossus I，AI 硬件从"国产昇腾 / Cerebras IPO"延伸到"美方算力分配"）
  - **CVE 级 AI 编程工具安全事件** 首次落地（#2 是 Claude Code 主版本第一次 GHSA 公开 CVE）
  - **agent-native trading 全自动** 子线（#6 跟 dexter / TradingAgents / daily_stock_analysis 三条路线区分开）
  - **Western 研究者实地观察国产 AI** 子线（#9 Nathan Lambert）
- **主题饱和变化**（详见 topic-saturation.md）：
  - AI 编程工具 46 → **49**（+#2 CVE / #4 AlphaEvolve / #10 agent-skills，全部符合 3 条例外条款）
  - Agent 框架 43 → **47**（+#4 #5 #6 #7 四角度）连续 7 日峰区
  - 国产 AI 27 → **30**（+#1 蚂蚁/腾讯 / #7 字节 / #9 Nathan）
  - AI 定价 35 → **37**（+#1 / #8）
  - AI 行业并购 9 → **10**（+#3 算力分配子线）
  - AI 安全 7 → **8**（+#2 CVE）
  - AI 研究 14 → **16**（+#4 / #9）
  - 方法论 6 → **8**（+#4 / #10）
  - AI+教育 4 → **5**（+#5 Datawhale）
  - AI 金融 8 → **9**（+#6 HKUDS）
  - Computer Use Agent 2 → **3**（+#7 UI-TARS）
- **QA 结果**：10/10 全过 overall_pass。L2 平均 8.1、L3 平均 8.1、L5 平均 8.0。L1 共 8 处机械替换。L6 全过 0 篇违规
- **Step 4.6**：10 篇全部生成 xhs-version.md（reach≥8 主动 10 篇全触发）；0 篇 xhs:primary；0 篇 xhs:blocked
- **5/3-5/10 趋势警告**：AI 编程工具 49 + Agent 框架 47 + 国产 AI 30 + AI 定价 37 + AI 行业并购 10 + AI 安全 8 篇连续高饱和峰区，下一轮编程工具/agent 框架/AI 安全/并购继续严格降权

## [2026-05-08] generate | 10 drafts, REACH>=7, RSS+signals

- **采集**：RSS/GitHub/arXiv 478 items + GitHub Trending 30+ AI repos；bird CLI cookies 仍缺，X 抓取本期跳过（Step 3.5 last30days 补社区反馈）；Reddit RSS 部分 403；TrendRadar Docker 目录缺失；pypi 1 个 429
- **新增 10 篇文章**：
  - #1 openclaw Save to Spotify CLI（Claude/Codex 一键发播客，REACH 10 first-person）
  - #2 蚂蚁 Ling-2.6-1T 旗舰上 OpenRouter $0.30/M 比 DeepSeek 便宜（REACH 8 first-person）
  - #3 Gemini 3.1 Flash Lite 1M 多模态 $0.25/M（REACH 9 analytical）
  - #4 Anthropic Code w/ Claude 2026 大会 + Mythos Preview（REACH 8 narrative）
  - #5 Mythos x Firefox 31 天漏洞挖掘（REACH 8 retro）
  - #6 PageIndex 943 星 vectorless RAG（REACH 7 first-person）
  - #7 GPT-5.5-Cyber 网络安全垂直模型（REACH 7 analytical）
  - #8 Raschka 开源 Coding LLMs From the Ground Up 课程（REACH 8 retro）
  - #9 Block Goose 26k 星本地 agent（REACH 7 first-person）
  - #10 Gemini 3.1 Flash TTS 表达性语音 + 国产 TTS 对照（REACH 7 analytical）
- **voice 分布**：first-person 4 / narrative 1 / analytical 3 / retro 2
- **优先品牌**：openclaw（#1 Save to Spotify CLI，5/3 #1 #5、5/7 #1 之后第 4 次出篇，把 openclaw 生态扩到"内容生产工作流"新子线）+ Mythos（#4 #5 双触发，从"封印模型"扩到"实战漏洞挖掘平台"）
- **新空间打开**：
  - **openclaw 生态延伸到内容生产工作流**子线（#1 是 openclaw 第三条子线，前两条是宿主主体 + 持久成长 agent）
  - **inclusionAI（蚂蚁 AI lab）首次单独立实体**（之前一直在 ant-group 总名下）
  - **vectorless RAG 范式**（PageIndex 是 RAG-Anything 多模态、LangChain/LlamaIndex 经典向量 RAG 之后的第三种范式）
  - **TTS 厂商对照线**（Gemini Flash TTS / 火山 / 通义晓声 / Microsoft Edge / VibeVoice 五厂横评首次成形）
  - **AI 安全垂直模型分支**（GPT-5.5-Cyber 是 Mythos 之后第二条"垂类安全模型"路线）
- **主题饱和变化**（详见 topic-saturation.md）：
  - AI 编程工具 41 → **46**（+5：#3 / #4 / #6 / #8 / #9）连续 5 日峰区
  - Agent 框架 40 → **43**（+3：#1 / #4 / #6）
  - AI 定价 32 → **35**（+3：#2 / #3 / #9）
  - AI 安全 4 → **7**（+3：#4 / #5 / #7）跳过中等饱和直接到高饱和警戒线
  - 多模态 14 → **15**、本地推理 20 → **21**、国产 AI 26 → **27**、方法论 4 → **6**
- **L1 机械替换**：共 26 处（10 篇分摊，平均 2.6 处/篇）
- **QA 结果**：10/10 全过 overall_pass。L2 平均 8.4、L3 平均 8.3、L5 平均 8.3。0 篇质修
  - **L6 fail 1 篇**：#10 Gemini TTS 触发 overseas_access。其余 9 篇 L6 pass
- **Step 4.6**：7 篇生成 xhs-version.md（reach≥8 主动 6 + L6 fail 必须 1）；3 篇 xhs:primary 直发主版本（PageIndex / GPT-5.5-Cyber / Goose，均 reach=7 + L6 pass）；0 篇 xhs:blocked
- **更新实体页**：
  - 已存在更新：[[openclaw-org]] / [[ant-group]] / [[google]] / [[anthropic]] / [[openai]] / [[mythos]] / [[openrouter]] / [[sebastian-raschka]]
  - 新建（9 个）：[[block]] / [[inclusion-ai]] / [[mozilla]] / [[goose]] / [[pageindex]] / [[gpt-5-5-cyber]] / [[ling-2-6-1t]] / [[gemini-3-1-flash-lite]] / [[gemini-3-1-flash-tts]]
- **更新主题页**：[[ai-coding-tools]] / [[agent-frameworks]] / [[ai-pricing]] / [[ai-security]] / [[openclaw-ecosystem]] / [[multimodal]] / [[local-inference]] / [[ai-research]]

## [2026-05-07] generate 10 篇 | drafts，REACH>=7（编程工具 + 国产 AI + 具身智能）

- **采集**：RSS/GitHub/arXiv 507 items + GitHub Trending 31 AI repos + OpenRouter 0 new + PyPI 趋势 ok（2 个 429 失败）+ TrendRadar fail（容器路径不存在）；X 抓取因 bird cookies 失效再次 skip
- **选题**：539 个 source 关键词初筛 → 12 个候选合规预检 → wiki 饱和度对照 → 最近 3 天 drafts 去重 → 最终 10 篇
- **voice 分布**：first-person 4 / narrative 2 / analytical 3 / retro 1
- **优先品牌**：NousResearch（NousCoder-14B 实测+Hermes Agent 生态绑定 openclaw）+1 boost 命中
- **新空间打开**：
  - **NousResearch 实体首次单独立线**（之前一直绑在 Hermes Agent 里）
  - **Replicate 实体首次覆盖**（MCP server）
  - **Genesis AI 实体首次覆盖**（具身智能创业）
- **高饱和处理**：
  - AI 编程工具 37 → 41（NousCoder/9router/GB10/Symphony 4 篇命中，每条都符合"重大模型/工具迭代或国产 Claude Code 二次出圈"例外条款）
  - 国产 AI 24 → 26（DeepSeek+Ascend、DeepSeek $45B 是国产 AI 重大事件级，符合例外）
  - 具身智能 2 → 4（Genesis AI + Gemini Robotics-ER 同日双发，低饱和主题鼓励）
- **L1 机械替换**：共 0 处（10 篇写作子代理自检全部清理干净）
- **QA 结果**：10/10 全过 overall_pass。L2 平均 8.1、L3 平均 8.2、L5 平均 7.9
  - **2 篇 L5=6 第一轮 fail**：Cowork（境外产品+订阅价+无可操作）、Gemini Robotics（纯技术解读+无可操作）。质修 1 轮加"国产工具复刻最小路径"段后第二轮均到 L5=8 通过（rounds=2）
- **L6 全过**：0 篇 L6 fail，无标题禁用句式 / 玄学词 / 翻墙词命中
- **Step 4.6**：6 篇生成 xhs-version.md（reach≥8 主动 6 篇）；4 篇 xhs:primary 直发主版本（Genesis AI / Gemini Robotics / Symphony / Replicate MCP，均 reach=7）
- **5/7 主题计数变化**（详见 topic-saturation.md）
- **新增实体页待补**：[[nous-research]]、[[replicate]]、[[genesis-ai]]、[[avarok]]、[[nouscoder]]
- **新增主题页待补**：暂无（沿用 ai-coding-tools / agent-frameworks / chinese-ai / embodied-ai / local-inference / ai-mergers / ai-pricing / multimodal）

## [2026-05-06] generate 第二批 10 篇 | drafts，REACH>=7（双批次 20 篇）

- **背景**：5/6 早间已生成 10 篇，用户要求"再写 10 篇"，从今日 sources 挖第二批 REACH≥7 选题
- **第二批选题**：行业事件 + 法律诉讼 + 投融资为主（SAP/NemoClaw、Character.AI 起诉、Meta 抄书诉讼、Cerebras IPO、OpenAI 手机、Sierra、Marc Lore AI 餐厅、AI 设计汽车、Vibe Physics、LearningCircuit 本地深度研究）
- **第二批 voice 分布**：first-person 1 / narrative 3 / analytical 4 / retro 1（行业事件密集导致 analytical 占比高）
- **新空间打开**：
  - **企业 AI**（#1 SAP + #6 Sierra 双触发，首次形成独立子线）
  - **AI+餐饮**（#7 Marc Lore QuTwo，本号首次切入）
  - **生成式设计**（#8 AI 设计汽车，AI+汽车主题从车机扩展到造型阶段）
  - **AI 法律**（#2 Character.AI + #3 Meta 双案子首次稳定供给）
- **优先品牌**：NemoClaw 命名经查证与 openclaw 生态无关（巧合），按普通选题处理
- **L1 机械替换**：共 4 处。最多 #1 SAP 2 处、#4 Cerebras 2 处
- **QA 结果**：10/10 全过 overall_pass。L2 平均 8.0、L3 平均 8.0、L5 平均 7.4（含 Cerebras 修订后 7 分）
  - **#4 Cerebras 第一轮 L5=6 fail**：QA 判定纯行业分析+零可操作性。质修 1 轮加判断 checklist + 4 条标准对照寒武纪/昆仑芯/燧原/摩尔线程 + 改标题"国产 AI 芯片股该怎么挑"，第二轮 L5=7 通过（rounds=2）
  - **#9 Vibe Physics L6 fail**：文末 "OpenRouter 上 GPT-5.x 现在就能跑"被判 overseas_access 引导。xhs 版替换为"国内可直接用的 DeepSeek-R1 / Qwen-Max / Kimi K2.6"
  - **#10 LearningCircuit L6 fail**：标题"干到 95.7% SimpleQA"边缘命中"X 干翻 Y"句式。xhs 版改为"打到"
- **第二批 Step 4.6**：4 篇生成 xhs-version.md（reach≥8 主动 2 + L6 fail 必须 2）；6 篇 xhs:primary 直发
- **5/6 双批次合计**：20 篇 / 12 处 L1 / 1 次质修循环 / L6 fail 2 篇 / xhs-version 10 篇

## [2026-05-06] generate 第一批 10 篇 | drafts，REACH>=7

- **采集**：498 RSS/GitHub/arXiv items via pipeline.js + 30 GitHub Trending AI repos + 3 OpenRouter 新模型（baidu/cobuddy:free / microsoft/phi-4-mini-instruct / openai/gpt-chat-latest）+ PyPI 0 spike。fetch:trendradar 失败（容器目录缺失），soft-fail。bird auth 仍 fail，无 X 推文。社区反馈靠 Step 3.5 last30days（10/10 全部生成）
- **选题评分**：从 sources 中筛出 10 篇 REACH >= 7。voice 分布 first-person 3 / narrative 2 / analytical 4 / retro 1（analytical 占 4 篇是因为今天行业事件类选题密集：GPT-5.5 默认替换 / Apple 集体诉讼 + iOS 27 / Microsoft Xbox / Etsy ChatGPT / PayPal）
- **新空间打开**：
  - **Apple 战略**（#3 赔 2.5 亿 + iOS 27 让用户挑 AI 模型），本号首次以 Apple 战略转向单独立线
  - **AI 电商**（#6 Etsy + ChatGPT Ads 流量入口），从 AI 变现衍生独立赛道
  - **AI+游戏**（#7 Microsoft 关 Xbox Copilot），本号首次正式覆盖
  - **OpenAI 行业事件**子线（#2 GPT-5.5 + #6 Etsy/Ads，OpenAI 同日 3 件大事）
- **优先品牌**：Karpathy（#4 LLM coding 教训 CLAUDE.md +2409 星），4 → 5 篇覆盖，破"降权"判断（Karpathy 相关原标 3% 占比降权，今天因 trending 单日热度爆发破例）。openclaw 仅在 deer-flow 横评中作对照，未单独出篇
- **L1 机械替换**：共 8 处。最多 #8 Daemon Tools 3 处、#4 Karpathy 2 处。其余多数 0-1 处
- **QA 结果**：10/10 全过 overall_pass。L2 平均 8.2、L3 平均 8.0、L5 平均 8.0。**L6 全部 pass，无任何小红书合规违规**（5/5 Chrome L6 fail 之后罕见的 0 fail 一天）
- **Step 4.6**：6 篇生成 xhs-version.md（reach≥8 主动 6 篇全部触发：CoBuddy / GPT-5.5 / Apple / Karpathy / deer-flow / Etsy）；4 篇 xhs:primary 直发主版本（Microsoft Xbox / Daemon Tools / context optimization / PayPal）
- **警告**：AI 编程工具 37 篇 + Agent 框架 37 篇 + 国产 AI 21 篇 + AI 产品体验 8 篇连续高饱和峰区，下一轮严格降权

## [2026-05-05] generate 10 篇 | drafts，REACH>=7

- **采集**：518 RSS/GitHub/arXiv items via pipeline.js + 34 GitHub Trending AI repos + 1 OpenRouter new model（Mistral Medium 3.5）+ PyPI 1 spike（autogen +21.8%）。fetch:trendradar 失败（Docker 目录不存在），soft-fail 不阻塞。bird auth 仍 Chrome/Safari/Firefox 全失败，无 X 推文，社区反馈靠 Step 3.5 last30days（10/10 全部生成 community-research.md）
- **选题评分**：从 sources 中筛出 10 篇 REACH >= 7。voice 分布 first-person 4 / narrative 2 / analytical 2 / retro 1（first-person 比重提升，实操工具篇多）
- **新空间打开**：
  - **AI 隐私**（#1 Chrome 偷塞 4GB Gemini Nano），本号首次以"浏览器层 AI 静默安装"切入隐私主题
  - **方法论**（#6 Specsmaxxing YAML spec），反 AI psychosis 角度首次单独立线
  - **工作流自动化**（#5 n8n-MCP），从单 agent / RPA 延伸到"LLM 写自动化流程"路线
- **10 篇主题**：
  - **first-person (4)**：DeepClaude 接 Claude Code / ace-step-ui 4090 跑 ACE-Step / n8n-MCP / dexter / LTX-2（共 5 篇 first-person，是该 voice 自试点以来单日最高）
  - **narrative (2)**：Chrome 偷塞 Gemini Nano / Roomba 创始人 AI 宠物
  - **analytical (2)**：Rapid-MLX M 系引擎 / 视觉 AI app 6.5x 下载窗口
  - **retro (1)**：Specsmaxxing YAML spec
- **L1 机械替换**：共 10 处。最多 ace-step-ui / Rapid-MLX / dexter 各 2 处，多数仅 0-1 处，写作子代理已较好遵守禁用词/标点规则
- **QA 结果**：10/10 全过 overall_pass。L2 平均 8.3，L3 平均 8.3，L5 平均 7.9（与 5/3 持平，质量稳定）
  - **#1 Chrome L6 fail**：正文一句"让 Chrome 的 update 通道工作"被 QA 判为 overseas_access 暗示。xhs 版改为中性"网络环境拉不到 Google 服务，模型不会落盘"
- **Step 4.6**：5 篇生成 xhs-version.md（Chrome L6 fail 必须 1 + reach>=8 主动 4 篇：DeepClaude / ace-step-ui / Rapid-MLX / n8n-MCP）；5 篇 xhs:primary 直发主版本（Specsmaxxing / Roomba / 视觉 AI / dexter / LTX-2）

## [2026-05-03] generate 12 篇 | drafts，REACH>=7

- **采集**：544 sources，含 RSS 478 + GitHub Trending 27 AI repos（fetch:trending）+ arxiv 20 + PyPI trends 检测（无 spike）+ OpenRouter 0 新模型。bird auth 仍 Chrome/Safari/Firefox 全失败（macOS Keychain exit 36），无 X 推文采集。fetch:trendradar 失败（Docker 目录不存在 /tmp/TrendRadar/docker），soft-fail 不阻塞
- **选题评分**：从 544 sources 中筛出 12 篇 REACH >= 7。voice 分布 first-person 2 / narrative 5 / analytical 3 / retro 2，与 5/1 的 2/4/2/2 接近
- **优先品牌双线收**：
  - **openclaw**（#1 主仓库 367k 星 + Claw-Eval-Live arxiv 论文，13 个前沿模型最高 66.7% 通过率）
  - **NousResearch hermes-agent**（#5 一周从 12 万星涨到 13 万星，topics 字段绑死 openclaw / clawdbot / moltbot）
- **新空间打开**：
  - **AI+汽车**（#8 Gemini 进百万辆车 vs 国产车机），本号首次正式覆盖
  - **AI+法律**（#9 Microsoft Word Legal Agent），AI+办公线垂直扩展
  - **agent-evaluation**（#1 Claw-Eval-Live 用 ClawHub Top-500 当 benchmark），本号首次单独立此主题
- **12 篇主题**：
  - **first-person (2)**：agent-desktop 53 命令 a11y 替 trycua / DeepSeek-TUI 564 星 Rust 终端
  - **narrative (5)**：Apple Claude.md 泄露 / Kimi K2.6 编程赢闭源 / Spotify Verified / 奥斯卡禁 AI 演员 / Word 法律 Agent
  - **analytical (3)**：openclaw + Claw-Eval-Live arxiv / Uber 烧光预算 / Gemini 进车
  - **retro (2)**：hermes 接 openclaw / Raschka 拆 coding agent
- **L1 机械替换**：共 31 处。最多 #6 Spotify 13 处（：→ ， 5、—— → ， 7、值得注意的是删 1）、#1 openclaw 11 处（—— → ， 9、意味着替换 2）、#2 Apple 4 处（：→ ，）。
- **QA 结果**：12/12 全过 overall_pass。L2 平均 8.1，L3 平均 8.0，L5 平均 7.8。
  - **#1 openclaw 第一轮 L1-3 fail**：L1 机械替换"这意味着→所以呢"留下"所以呢普通用户可以做的事情其实有三件"被 QA 判定为口语套话。**手工修**为"普通用户可以做三件事"，未经第二轮 QA 直接通过（L1-3 唯一违规已消除，其他维度首轮均 ≥7）
  - **#4 Kimi L6 fail**：标题"又赢了 Claude / GPT-5.5 / Gemini"断言式对比触发小红书禁用句式。xhs 版改"Kimi K2.6 在编程基准上拿下多项第一，国产开源权重成本降一个数量级"
  - **#12 DeepSeek-TUI L6 fail**：结尾段引导用 ds2api（逆向网页协议中间件）驱动 agent，QA 判定为间接绕过付费 API 路径。xhs 版整段删除 ds2api 引用，行动建议改为 platform.deepseek.com 官方 API 直连
- **Step 4.6**：11 篇生成 xhs-version.md（reach≥8 主动 9 篇 + L6 fail 必须 2 篇）；1 篇（#10 agent-desktop reach=7）xhs:primary 直发主版本
- **Step 5 wiki**：article-registry 5/3 段、topic-saturation 5/3 段、log 5/3 段
- **饱和警告**：AI 编程工具单日 +5 跃升到 32 篇是历史最高密度，下一轮硬性暂停 1-2 天；Agent 框架 34 篇连续高饱和峰区，严格降权
- **关键 take**：5/1 voice 分流后第二次实践，QA 一次通过率从 4/30 80% 上升到 5/3 92%（11/12，仅 #1 因 L1 机械替换衍生套话被打回），voice 框架在跨日生成下持续有效

## [2026-05-01] generate voice 分流试点 10 篇 | drafts，REACH>=7

- **背景**：4/30 后用户反馈"10 篇文章读起来像同一个 AI 拿不同主题套出来的兄弟篇"，反思后承认根因是 wechat.md / qa-check.md 把"活人感"指标化（"我占比 ≥40%""必须有得罪人的判断""五段式""多平台真实反馈"等硬指标）导致同质化。
- **本轮 prompt 系统改动**（在生成前）：
  - **wechat.md**：第一步加 voice 分流（first-person / narrative / analytical / retro 四种）；第二步五段式从硬要求改为按需骨架；删除"我占比 ≥40%"硬指标改为 first-person 才强调；删除"必须有得罪人的判断"改为按 voice 决定；多平台反馈段从硬要求改为"有一手数据才写"；L4 改成整体二元判断
  - **qa-check.md**：L4 改成整体二元（"这篇跟最近 30 篇里有没有读起来像 AI 兄弟篇"yes/no），不再列具体维度防反向污染；L2 简化删除"单句成段 ≥3 次""推荐口语词组"等具体信号
- **新增 Step 4.7 跨文章扫描**：所有篇生成后跑一遍 grep 扫开头第一段、段落小标题、收尾段、套路化短语，看是否同质化
- **10 篇主题**（首次每篇标 voice）：
  - **first-person (2)**: Hugo He ppt-master / Warp agentic 终端
  - **narrative (4)**: TradingAgents 二次出圈 / Musk 当庭承认蒸馏 / Meta+Manus 赚钱广告 / Goblins RLHF 后续
  - **analytical (2)**: Grok 4.3 上 OR / Microsoft+OpenAI 离婚
  - **retro (2)**: PyTorch Lightning 供应链攻击 / FinRL 老 RL 框架
- **结果**：QA 10/10 一次通过，0 L6 fail，0 质修循环。L2 平均 8.4（4/30 是 8.0），L3 平均 8.3。**Step 4.7 扫描显示开头/收尾/段落骨架完全分散**，仅 1 处 explicit "## 我的判断" 标签命中（Grok 4.3，已手工修）
- **voice 分流验证**：first-person 2 篇"我"占比 30-40%，analytical 2 篇"我"占比 < 1%，retro 2 篇"我" 0 次。每种 voice 按自己的姿态写，不再像 4/30 全部削成同一个调子
- **Step 4.6**：8 篇 REACH≥8 主动生成 xhs 合规版，2 篇 REACH 7 + L6 pass 直发主版本
- **采集**：546 sources（含 47 GH trending + 3 OpenRouter 新模型 + PyPI 趋势）。bird auth 仍在 Chrome/Safari/Firefox 全失败，无 X 推文采集
- **关键 take**：把"活人感"做成可量化指标本身就是 AI 味的根源。指标越具体，agent 越凑信号，差异性消失。改成 voice 分流后，每篇 voice 内部仍按需写，但不同 voice 之间故意不同骨架，整体差异性恢复
- 更新 wiki：article-registry 5/1 段、topic-saturation voice 分流首次实验结果块、log

## [2026-04-30] generate 国产专题 10 篇 | drafts，REACH>=7（注，4/29 跳天未生成）

- 全部国产/中国向选题（用户反馈"前一轮选题离中国社区太远"后重选）：
  - **闲鱼 AI 客服 agent 7×24 自动议价**（XianyuAutoAgent +48 stars，REACH 9，AI 变现首次以纯工具切入，黄金选题）
  - **ollama 默默接住国产全家桶**（Kimi-K2.5/GLM-5/MiniMax/DeepSeek，REACH 9，揭示 :cloud tag 不是真本地的反预设）
  - **AirLLM 单 4GB 显卡跑 70B**（lyogavin 国产开发者，REACH 8，本地推理省钱极限）
  - **ds2api 一夜 465 星 DeepSeek 协议中间件**（CJackHwang，REACH 8，逆向客户端协议中间件，灰区合规重写）
  - **华为昇腾 Triton 语言开源**（triton-ascend，REACH 8，国产 GPU 软件栈首次进入 PyTorch 圈通用底座）
  - **蚂蚁 Ling-2.6-flash 上 OpenRouter**（104B/7.4B 激活 MoE，REACH 8，蚂蚁全档位出海）
  - **智谱 z.ai GLM-5 大规模部署 retro**（PD 分离 / HiCache / LayerSplit 三个事故现象，REACH 8，国内大模型公司首次主动透明化生产事故）
  - **136k 星 system-prompts 仓库**（含 Trae/Manus/Z.ai Code/Qoder/CodeBuddy 中国工具，REACH 8，prompt 工程壁垒 vs 产品形态壁垒）
  - **ChatGPT 卸载量飙 132%**（Sensor Tower 数据 + Pentagon deal 影响 + 国产 AI 窗口期分析，REACH 8）
  - **NVIDIA Nemotron 30B Omni 四模态免费**（OpenRouter free，REACH 7，唯一非主动 xhs 合规版的 primary 直发）
- **last30days 全部 soft-fail**（Reddit/HN/GitHub Skill 失败），fallback 到现有 source + WebFetch。9 个写作 agent 都靠 README/官方页 WebFetch 补充事实
- **QA 结果 10/10 overall_pass，无质修循环（一次过）**。L4 活人感全 pass、L1 机械替换 10 处（AirLLM 6 + 华为昇腾 4）
- **Step 4.6 触发 9 篇生成 xhs-version.md**（1 篇 L6 fail：ds2api 因白嫖/逆向协议；8 篇 REACH>=8 主动生成扩大分发；NVIDIA Nemotron REACH 7 + L6 pass 直发主版本）
- 主题饱和变化：国产 AI 生态 12→17（跃进）、本地推理 12→15、ai-pricing 20→25（警告越线）、agent-frameworks 25→30（连续高饱和但角度多样）、AI 变现 3→4 首次实操化、AI 硬件 6→7（昇腾 Triton 切入国产软件栈视角）
- 合规处理总结：1 篇 L6 fail（ds2api）走深度软化，标题去"白嫖"，正文删除"逆向客户端协议""规避官方风控""多账号轮转"等灰产话术，加"友情提醒优先用官方付费 API"
- 无 X 推文采集（bird auth 在 Chrome/Safari/Firefox 全失败）
- 更新 wiki：article-registry 4/30 段、topic-saturation 主题分布块 + 高饱和警告、log

## [2026-04-28] generate 增量补 8 篇 | drafts，REACH>=7

- 增量批次（在已有 6 篇 4/28 drafts 基础上，从剩余 sources 中再选 8 个新主题）：
  - **OpenAI 真要造手机**（TC + Ming-Chi Kuo 爆料 + 联发科/高通/立讯供应链链，REACH 9，AI 硬件主线扩展）
  - **Apple 换 CEO Ternus + Musk 想 600 亿买 Cursor**（TC，REACH 9，AI 编程工具+并购双 hook）
  - **Google + Kaggle 5 天 AI Agent 速成课**（Google AI 4/27，REACH 8，AI 教育低饱和首次以 Google 大牌课程入选）
  - **AI agent 把生产数据库删了 confession 全文**（HN 821 赞 977 评论，REACH 8，agent 安全警示反面教材）
  - **Google Veo 3.1 Lite**（Google AI 3/31，REACH 8，AI 视频低饱和 +1）
  - **Replicate 被 Cloudflare 收编**（Replicate 2025/11，REACH 7，AI 行业并购低饱和 +1）
  - **Chrome Skills 把 prompt 变一键工具**（Google AI 4/14，REACH 7，AI 搜索/浏览器 AI +1）
  - **OpenAI Privacy Filter 开源 PII 检测**（OpenAI 4/22，REACH 7，开源生态/隐私 +1）
- 主题饱和变化：agent-frameworks 21→25、ai-coding-tools 20→24、ai-pricing 17→20、supply-chain-security 11→13、ai-mergers 1→3（跃进）、ai-hardware 5→6、ai-video 2→3、ai-search 1→2、ai-education 3→4、ai-training-data 1→2、AI 产品体验 3→4
- 合规：3 篇 L6 fail（OpenAI phone 标题"干掉"拉踩、Kaggle Colab/ai.google.dev 境外暗示、Chrome Skills Google 账号路径），全部生成 xhs-version.md；3 篇 REACH>=8 主动生成 xhs（Apple+Cursor、agent del DB、Veo Lite）；2 篇 REACH 7 + L6 pass（Replicate、Privacy Filter）xhs primary 直发
- 8 篇均 overall_pass，无修复循环（QA 一次过）。L4 活人感全 pass，L1 机械替换共 15 处（最多 Veo Lite 4 处）
- 更新 wiki: article-registry（4/28 6→14 篇）、topic-saturation（增量批次主题分布块 + 高饱和数字更新）、log

## [2026-04-28] generate | 4 drafts, REACH>=7

- 新增文章：Microsoft 把 VibeVoice 开源（Frontier Voice AI 一天 757 星）、OpenRouter 给 7 个主流模型加 Latest 别名（自动跟随最新版本）、hydropix translate 用 LLM 翻译整本书（断点续传，国内可接 Ollama）、Meta 开源 ai4animationpy（神经网络驱动角色动画 Python 框架）
- 涉及实体：VibeVoice（新建产品页）、translatebooks-llm/hydropix（新建产品页）、ai4animationpy（新建产品页）；Microsoft/Meta/OpenRouter 追加动态
- 主题饱和变化：Agent 框架 18→19、AI 定价 16→17、多模态 9→10、TTS/语音 2→3；首次覆盖 **翻译工具**（hydropix）、**AI 动画**（Meta ai4animationpy）
- 新建页面：entities/products/vibevoice.md, entities/products/translatebooks-llm.md, entities/products/ai4animationpy.md
- 更新 wiki: article-registry（4/28 4 篇节 + 总篇数 144→148）、topic-saturation、log、index、entities/companies/microsoft.md、entities/companies/meta.md、entities/products/openrouter.md、ai-pricing/agent-frameworks/multimodal 主题页
- 合规：2 篇 compliant + 2 篇 primary 直发
- **追加（同日补 2 篇 openclaw 生态）**：openclaw 365k 星跨平台个人 AI 助手（含 4 月安全事件）+ Hermes Agent 12 万星 NousResearch 持久成长 agent。Agent 框架 19→21、供应链安全 10→11；**首次正式覆盖 openclaw 生态主题**（之前 4/23 last30days-skill 提过 clawhub 未单独立主题）。新建 entities/companies/openclaw-org.md、entities/companies/nousresearch.md、entities/products/openclaw.md、entities/products/hermes-agent.md、topics/openclaw-ecosystem.md；更新 article-registry（4/28 4→6 篇 + 总篇数 148→150）、topic-saturation、index、agent-frameworks/supply-chain-security 主题页。两篇均 L6 通过（compliant）

## [2026-04-27] generate | 4 drafts, REACH>=7

- 注：4/26 跳天未生成
- 新增文章：阿里 Qwen3.6 全家桶 5 个模型上 OpenRouter（27B Dense 到 1T Max Preview）、trycua 开源 Computer Use Agent 基础设施（macOS/Linux/Windows）、GitNexus 把 Graph RAG 塞进浏览器（客户端代码知识图谱）、Matt Pocock 公开 Claude Skills 目录（一天 2519 星）
- 涉及实体：trycua（新建产品页）、GitNexus（新建产品页）、Matt Pocock（新建人物页）、mattpocock-skills（新建产品页）、Qwen 全家桶（qwen-family 新建覆盖全系产品页）；阿里/Anthropic/Claude Code/OpenRouter/DeepSeek 追加
- 主题饱和变化：AI 定价 15→16、Agent 框架 16→18、本地推理 11→12、多模态 8→9、国产AI 11→12、AI 编程工具 19→20；首次覆盖 **Computer Use Agent**（trycua）、**客户端 RAG**（GitNexus）
- 新建页面：entities/products/qwen-family.md, entities/products/trycua.md, entities/products/gitnexus.md, entities/products/mattpocock-skills.md, entities/people/matt-pocock.md, topics/computer-use-agent.md
- 更新 wiki: article-registry（4/27 4 篇节 + 总篇数 140→144）、topic-saturation、log、index、entities/companies/alibaba.md、agent-frameworks/ai-pricing/local-inference/multimodal/ai-coding-tools 主题页
- 合规：4/4 篇均通过 L6（2 篇 compliant + 2 篇 primary 直发）

## [2026-04-25] generate | 6 drafts, REACH>=7

- 新增文章：GPT-5.5 上 OpenRouter Pro $30/M + Simon 提示词指南、Simon 实测 DeepSeek V4、HuggingFace ml-intern 自动读 paper 训模型、Unsloth WebUI 本地训练 Gemma 4/Qwen3.5/DeepSeek、ZhuLinsen daily_stock_analysis A/H/美股自动分析、Tracer-Cloud OpenSRE 杀进 SRE 运维
- 涉及实体：HuggingFace（新建公司页）、Unsloth/ml-intern/OpenSRE/daily-stock-analysis（新建产品页）；OpenAI/DeepSeek/GPT-5.5/DeepSeek V4/Simon Willison 追加
- 主题饱和变化：AI 编程工具 18→19、AI 定价 13→15、Agent 框架 13→16、本地推理 9→11、AI 研究 3→6、AI 金融 3→4、国产AI 10→11；首次覆盖 **DevOps/SRE 运维**（OpenSRE）
- 新建页面：entities/companies/huggingface.md, entities/products/ml-intern.md, entities/products/unsloth.md, entities/products/opensre.md, entities/products/daily-stock-analysis.md
- 更新 wiki: article-registry（4/25 6 篇节 + 总篇数 134→140）、topic-saturation、log、index、deepseek-v4/gpt-5-5 产品页、simon-willison 人物页、openai/deepseek 公司页、ai-pricing/ai-research/agent-frameworks/local-inference/ai-finance 主题页

## [2026-04-24] generate | 8 drafts, REACH>=7

- 新增文章：DeepSeek V4 Pro/Flash 双发 OpenRouter、GPT-5.5 + Bio Bug Bounty、腾讯 Hy3 + 蚂蚁 Ling-2.6-1T 免费万亿、Gemma 4 塞 Jetson Orin Nano VLA、Claude Code 变笨 retro + Opus 4.7 system prompt、Chip Huyen AI Engineering 配套 repo + 600 页、Qwen3.6-27B Dense 编程旗舰、Open-Generative-AI 200 模型 MIT 开源
- 涉及实体：DeepSeek（新建公司页）、OpenRouter（新建产品页）、腾讯/Tencent（新建）、蚂蚁集团/Ant Group（新建）、NVIDIA（新建）、阿里/Alibaba（新建）、Chip Huyen（新建人物页）；DeepSeek V4 / GPT-5.5 / Gemma 4 / Qwen3.6-27B（新建产品页）；OpenAI/Anthropic/Google/Simon Willison 追加
- 主题饱和变化：AI 编程工具 16→18、AI 定价 10→13、国产 AI 7→10、Agent 框架 12→13、本地推理 6→9、多模态 7→8、AI 安全 2→3、AI 研究 2→3、AI 硬件 4→5、AI+教育 2→3、AI 设计 1→2、AI 视频 1→2；首次落地覆盖**具身智能**（Gemma 4 VLA Jetson）
- 新建页面：entities/companies/tencent.md, ant-group.md, nvidia.md, alibaba.md, deepseek.md; entities/people/chip-huyen.md; entities/products/deepseek-v4.md, gpt-5-5.md, gemma-4.md, qwen-3-6-27b.md, openrouter.md; topics/embodied-ai.md
- 更新 wiki: article-registry（4/24 8 篇节 + 总篇数 134）、topic-saturation、log、index、openai/anthropic/google 实体页、simon-willison 人物页、ai-pricing/local-inference/ai-coding-tools/ai-security/ai-research/multimodal/ai-hardware/ai-education/agent-frameworks 主题页

## [2026-04-23] generate | 8 drafts, REACH>=7

- 新增文章：小米 MiMo-V2.5、Microsoft 12 课 Agent 教程、Pixelle-Video 国产短视频、百度千帆 OCR 免费、Google TPU 挑战 NVIDIA、Raschka 拆 RLVR、Chrome AI Mode、Last30Days Skill
- 涉及实体：小米/雷军/MiMo（新建）、Microsoft（新建）、百度/千帆（新建）、AIDC-AI/Pixelle-Video（新建）、Sebastian Raschka（新建）、Last30Days Skill（新建）、Chrome（新建产品页）；Google/OpenAI 追加
- 主题饱和变化：多模态 5→7、Agent 框架 10→12、国产 AI 5→7、AI+教育 1→2、AI 硬件 3→4、AI 研究 1→2；首次覆盖 AI 视频 / OCR / AI 搜索
- 新建页面：entities/companies/xiaomi.md, microsoft.md, baidu.md, aidc-ai.md; entities/people/lei-jun.md, sebastian-raschka.md; entities/products/mimo.md, qianfan.md, pixelle-video.md, last30days-skill.md, chrome.md; topics/ai-video.md, ocr.md, ai-hardware.md, ai-research.md, ai-search.md
- 更新 wiki: article-registry（4/23 8 篇节 + 总篇数 126）、topic-saturation、log、index、google/openai 实体页、multimodal/agent-frameworks/ai-pricing/ai-education 主题页
- X 抓取跳过（cookies 失效）

## [2026-04-22] generate | 9 drafts, REACH>=7

- 新增文章：Kimi K2.6+CLI、SpaceX 600亿 Cursor、Meta 录键鼠、Deezer 44% AI 歌、ChatGPT Images 2.0、Mythos 四连炸、Noetik 癌症、FinceptTerminal、RAG-Anything
- 涉及实体：Moonshot/Kimi（新建）、Meta（更新）、Deezer（新建）、Noetik（新建）、FinceptTerminal（新建）、RAG-Anything（新建）、kimi-cli（新建）、Mythos（新建）、Elon Musk（新建）、Sam Altman（新建）；openai/anthropic 追加
- 主题饱和变化：AI+医疗 1→2、AI 金融 2→3（含 LangAlpha）、多模态 4→5、RAG 1→2、AI 编程工具 15→16、国产AI生态 4→5；首次覆盖 AI 音乐 / AI 训练数据 / AI 行业并购 / AI 安全（作为独立主题线头）
- 新建页面：entities/companies/moonshot.md, entities/companies/deezer.md, entities/products/kimi-cli.md, entities/products/mythos.md, entities/products/noetik.md, entities/products/finceptterminal.md, entities/products/rag-anything.md, entities/people/sam-altman.md, entities/people/elon-musk.md, topics/ai-music.md, topics/ai-training-data.md, topics/ai-security.md, topics/ai-mergers.md, topics/multimodal.md
- 更新 wiki: article-registry（新增 4/22 9 篇节 + 总篇数 118）、topic-saturation、log、index、openai/anthropic/meta 实体页、ai-coding-tools/ai-finance/ai-medical 主题页

## [2026-04-21 第二轮] generate | 6 drafts, REACH>=7

- 新增文章：NotebookLM 省 Token、15 家免费 LLM API 清单、TradingAgents 金融 AI、GPT-Rosalind OpenAI 医疗、42k 星 AI 学英语、NotebookLM+Gemini 麦肯锡顾问
- 涉及实体：Google/NotebookLM/Gemini（重度）、OpenAI（2 篇）、Anthropic/Claude、TradingAgents（新建）、GPT-Rosalind（新建）
- 主题饱和变化：AI+医疗从空白→1 篇；AI 金融从空白→1 篇；AI+教育+1；AI 定价/省钱+2（持续高饱和）；AI 变现+2
- 更新 wiki: article-registry（17 篇节+总篇数 109）、topic-saturation、log、index、google/openai/anthropic 实体页、ai-pricing/agent-frameworks 主题页
- 新建页面：products/notebooklm.md, products/gpt-rosalind.md, products/tradingagents.md, topics/ai-education.md, topics/ai-medical.md, topics/ai-finance.md

## [2026-04-21] generate | 11 drafts, REACH>=7, RSS+X+signals

- 新增文章：Kimi K2.6-code-preview登陆OpenRouter, 华为鸿蒙AI眼镜2499元, 爱奇艺AI艺人库百位演员入驻, 钉钉CEO禁员工写文档, TrendRadar 604星一屏看热榜, OpenAI官方多Agent Python框架, Gemini Robotics x Boston Dynamics, Datawhale self-llm 3万星教程, Firecrawl破11万星, n8n 18.4万星替掉Zapier, TypeWords 7.9k星背单词开源
- 涉及实体：OpenAI, Google/DeepMind, Anthropic(降权监控), DeepSeek, Moonshot/Kimi, 华为, 爱奇艺, 钉钉/阿里, Datawhale, Boston Dynamics
- 主题饱和变化：Agent框架 8→9（中等饱和加剧）、效率工具 1→4（升至中等饱和）、国产AI 1→4（升至中等饱和）、AI+硬件 1→3（升至中等饱和）、AI+中国特色场景 +1
- 新主题：AI影视（爱奇艺首次）、具身智能（Gemini Robotics首次）、信息聚合工具（TrendRadar首次）
- 刻意避开主题：AI编程工具（暂停至 4/25）、安全/供应链（持平）、本地推理（暂停）、Karpathy（降权）
- QA 结果：11/11 全部首轮通过，平均修订轮次 1，L1 机械替换 5 次（钉钉全角冒号→逗号）
- 更新 wiki: article-registry, topic-saturation, log, index, openai 实体页, google 实体页, agent-frameworks 主题页

## [2026-04-20] generate | 14 drafts, REACH>=7
- 新增文章：NVIDIA免费API Key, Chrome上帝模式, DeepSeek V4, OpenAI充值漏洞, 腾讯AI编程小程序, OpenMythos开源, GPT-image-2提示词, 番茄AI写作, Veo 3.1 Lite, AI玄学Skills, Anthropic封号, ESP32 Claude Buddy, Browser Harness, MiniMind
- 涉及实体：NVIDIA, Google, DeepSeek, OpenAI, Anthropic, 腾讯
- 主题饱和变化：安全/供应链升至10篇严重过饱和，开源生态升至6篇中等饱和
- 新主题：AI+硬件(首次), AI写作/变现(首次)
- 更新 wiki: article-registry, topic-saturation, log

## [2026-04-19] generate | 8 drafts, REACH>=7
- 新增文章：HeyGen HyperFrames, Google Android CLI, AI做PPT, AI开实体店, Agent Ready检测, 微信支付Skills, NVIDIA Lyra 2.0, CREAO AI-First
- 涉及实体：Google, NVIDIA, HeyGen, 微信支付, Andon Labs, CREAO
- 主题饱和变化：Agent生态升至中等饱和，AI商业落地首次有实质覆盖，AI编程工具继续暂停
- 新主题：AI移动开发(首次)
- 更新 wiki: article-registry, topic-saturation, google实体页, log, index

## [2026-04-18] generate | 7 drafts, REACH>=7
- 新增文章: Codex大更新(9), Opus 4.7(9), Claude Design(8), Tokenizer成本(8), Tokenmaxxing(8), Firebase安全(7), Qwen本地图片生成(7)
- 新覆盖主题: AI设计(首次)
- **警告: AI编程工具主题达 14 篇/20%，严重过饱和，建议暂停 1 周**
- Anthropic 单日涉及 5 篇，实体饱和度飙升
- 更新 wiki: article-registry, topic-saturation, 6 实体页, 4 主题页, index

## [2026-04-16] generate-batch2 | 5 drafts, REACH>=7, low-saturation focus
- 新增文章: AI对话法律风险, Chrome AI Skills, Gemma 4 iPhone, Open Lovable, AutoClip视频流水线
- 新覆盖主题: AI法律/隐私(首次), AI产品体验(+1), 开源生态(+1), 内容创作工具(+1), 本地推理移动端(+1)
- 刻意避开高饱和区(AI编程/安全/定价)，开拓新主题
- 810条源材料可用（532 RSS + 225 X + 86 home + signals）

## [2026-04-16] generate | 4 drafts, REACH>=7
- 新增文章: 交大trading bot, Gemini Flash TTS, 网站设计复制插件, Anthropic Nature论文
- 策略: 刻意避开高饱和区(AI编程11篇)，聚焦低饱和主题
- 新覆盖: AI落地(2篇), 多模态(1篇,首次), AI+前端(2篇), AI研究(2篇)
- 788条源材料采集（532 RSS + 225 X + signals）

## [2026-04-15] generate | 5 drafts, REACH>=7
- 新增文章: 吴恩达语音UI, OpenAI备忘录泄露, AI工程师健康, LangAlpha金融Agent, AMD GAIA
- 新主题: 语音UI(新), AI健康(新), 竞争策略(新)
- Agent框架饱和度: 4→6篇，从"中等"升为需关注
- 658条源材料采集（RSS+X+GitHub Trending+PyPI）

## [2026-04-14] init | Wiki 初始化

从 15 天运行数据建立基线：
- 创建 5 个人物实体页、4 个公司页、4 个产品页
- 创建 5 个主题追踪页
- 创建源质量追踪（15 天数据）
- 注册 49 篇历史文章到 [[article-registry|文章注册表]]
- 分析[[topic-saturation|主题饱和度]]
