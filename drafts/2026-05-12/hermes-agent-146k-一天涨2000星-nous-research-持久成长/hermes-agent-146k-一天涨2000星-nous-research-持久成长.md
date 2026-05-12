# NousResearch hermes-agent 146k 星了，一天涨 2065 星到底在涨什么

5 月 12 日，NousResearch/hermes-agent 仓库的星标数停在 146072。

前一天还是 143298。GitHub Trending 给出的当日增量是 +2065。

一个已经 14 万星的 agent 项目，单日仍能维持四位数增长，这个曲线本身就值得拆开看。涨的不再是"听说有个新 agent"，而是一波具体的版本能力释放叠加了同周的社区事件。

## 涨星不是因为今天才有人发现它

hermes-agent 不是新仓库。2025 年 7 月建立，到今年 4 月底已经突破 12 万星，wiki 里 4 月 28 日就以"12 万星持久成长 agent"的身份首次入库。

也就是说，新增的两千多颗星不是"新项目首次曝光"，是"老项目持续吸星"。这一类涨星曲线的解释通常落在三件事上，新版本、新接口、新社区事件。这一周三件都齐了。

## 版本侧，v0.13.0 把"自我演化"做进了主干

5 月 7 日 NousResearch 发布 v0.13.0，代号 The Tenacity Release。README 里能看到的关键变化集中在三处。

第一处是 closed learning loop，官方描述是 "agent-curated memory with periodic nudges, autonomous skill creation after complex tasks"。Agent 会在完成复杂任务后自己整理记忆、自己写新 skill 文件，这条线是 hermes-agent 区别于一次性 chat 的核心。

第二处是 procedural memory。README 提到用 FTS5 给历史 session 建全文索引，再用 LLM 做摘要，对长期使用的人，所以呢 agent 真的能在第 N 天调出第 1 天的对话上下文，而不是依赖外挂向量库。

第三处是多平台 messaging。Telegram、Discord、Slack、WhatsApp、Signal 五个入口，对应的不再是终端 CLI，而是把 agent 塞进用户已有的聊天客户端里。这也是为什么 r/hermesagent 上最近一类高赞帖在讨论"我让 Hermes 监控 Hermes 自己的 commit，每天通过 Telegram 发摘要给我"。

## topics 字段没动，但每一个 topic 现在都是接口

仓库 topics 这次没改，仍然是这一串。

`ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw`

后半部分，clawdbot、moltbot、openclaw 三个 openclaw 生态的关键字一直挂在那里，说明 NousResearch 把"和 openclaw 宿主可对接"作为长期声明。

README 里这次新增了一个对应的具体命令。

`hermes claw migrate`

这条命令做的事是从 openclaw 把 settings、memories、skills 直接迁移到 hermes，原 openclaw 用户不需要重新调教，agent 接手已有的记忆栈。openclaw 主仓 30 多万星的用户基数，等于给 hermes-agent 开了一条直接的导流管道。前一篇 5 月 3 日的 wiki 记录写"topics 里写满了 openclaw / clawdbot / moltbot"，当时还只是 topic 声明，这一次落到了可执行的 CLI 子命令。

## 社区侧，OpenRouter token 第一 + 自演化 alpha 同周引爆

5 月 9 日，NousResearch 官方 X 发布 "Hermes Agent is now #1 on the Global OpenRouter token rankings"。r/hermesagent 转帖拿到 342 点赞、32 条评论。OpenRouter token 榜第一意味着实际跑量超过其他 agent 框架，这种"真实使用量已经第一"的信号对开发者圈是直接的购买理由。

5 月 6 日另一条爆款，r/hermesagent 上的 "Nous Research just dropped Hermes Agent Self-Evolution and it actually works (early alpha)"，作者描述用 DSPy + GEPA 在不上 GPU 的前提下，基于真实执行 trace 自动演化 hermes skill 文件。他拿一个 901 行、用了几周的 codeling skill 做实验，跑了 3 轮 DeepSeek-v4，skill 自己改了自己。这种"agent 改 agent"的演示对持久成长这条叙事是直接的兑现。

5 月 7 日还有一条 108 点赞的 "My simplest yet effective hermes agent profile setup. Meet my 'Archiver'"，作者说自己用了两个月之后才意识到，把一切塞进一个 profile 是把 hermes 最强的能力浪费掉，多 profile 才是正解。这条帖子下面 56 条评论在讨论 profile 切换、跨 profile 共享记忆。Profile 这个概念能在两个月用户里发酵成"主流用法"，说明产品形态本身在被使用者重新定义。

四条社区帖在同一周内连续命中头部分类，对应到 GitHub 上就是一波非北京时间的国际涨星。

## 对中国开发者，可操作的三件事

第一件，从 openclaw 切到 hermes-agent 是一条已经修通的路。

`hermes claw migrate` 这个命令是为 openclaw 已有用户准备的。如果之前已经在 openclaw 上跑过 agent，迁过去不需要重新喂记忆。安装脚本是 `curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash`，安装完 `hermes` 进交互 CLI。

第二件，profile 是这个 agent 的核心抽象，不是配置项。

社区共识是不要单 profile 塞所有任务。一个 Archiver 负责整理资料、一个 Coder 负责写代码、一个 Researcher 负责拉资讯，记忆各自隔离。两个月的老用户在帖子里反复强调这一点。

第三件，self-evolution 这条 alpha 线值得跟。

DSPy + GEPA 路线不依赖 GPU，跑 API 就能改 skill。国内开发者用 DeepSeek-v4 跑 trace 是社区帖子里直接验证过的路径，这个路线对没有显卡资源的独立开发者是有意义的。

146k 星不是终点。把"agent 和你一起长大"从口号兑现成可执行的 closed loop，这一周做完了。下一个节点大概率是看 self-evolution 从 early alpha 走到 main branch 默认开启的那一天。

## 相关链接

- hermes-agent 仓库, https://github.com/NousResearch/hermes-agent
- v0.13.0 The Tenacity Release, https://github.com/NousResearch/hermes-agent/releases
- r/hermesagent 社区, https://www.reddit.com/r/hermesagent/
- NousResearch 官方 X, https://x.com/NousResearch
- openclaw 主仓, https://github.com/openclaw-org/openclaw

---
相关实体:: [[hermes-agent|Hermes Agent]] | [[nousresearch|NousResearch]] | [[openclaw|openclaw]]
相关主题:: [[agent-frameworks|Agent 框架]] | [[openclaw-ecosystem|openclaw 生态]]

<!-- REACH: 10/10 | 品牌✓ 利益点✓ 可操作✓ -->
