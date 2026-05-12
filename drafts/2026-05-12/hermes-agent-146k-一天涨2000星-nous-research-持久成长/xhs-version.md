# 14.6万星的 agent 一天又涨2065颗星，到底在涨什么 🌟

今天看 GitHub Trending 看到一个有意思的数据。

NousResearch/hermes-agent 仓库，星标数停在 146072。

前一天还是 143298，单日新增 +2065 ⚡

一个已经 14 万星的老项目，单日还能维持四位数增长，这条曲线本身就值得拆开看。

## 不是新项目首发，是老项目持续吸星

hermes-agent 2025 年 7 月就建库了，今年 4 月底已经突破 12 万星。

所以这两千多颗星不是"新东西被发现"，是"持续兑现承诺"。

这一类涨星通常落在三件事上，新版本、新接口、新社区事件。这一周三件全齐。

## 版本侧 v0.13.0 把"自我演化"做进主干 🛠️

5 月 7 日发布的 v0.13.0，代号 The Tenacity Release。三个关键变化。

**第一个，closed learning loop**

Agent 完成复杂任务后自己整理记忆、自己写新 skill 文件。这条线是 hermes-agent 区别于一次性 chat 的核心。

**第二个，procedural memory**

用 FTS5 给历史 session 建全文索引，再用 LLM 做摘要。对长期使用的人，agent 真的能在第 N 天调出第 1 天的对话上下文，不依赖外挂向量库。

**第三个，多平台 messaging**

Telegram、Discord、Slack、WhatsApp、Signal 五个入口。Agent 直接塞进用户已有的聊天客户端里。

社区里最近有个高赞帖在玩"我让 Hermes 监控 Hermes 自己的 commit，每天通过 Telegram 发摘要给我"，就是基于这条。

## openclaw 用户有一条直接的迁移路径 🔄

README 里新增了一个命令。

`hermes claw migrate`

做的事是从 openclaw 把 settings、memories、skills 直接迁到 hermes。

原 openclaw 用户不需要重新调教，agent 接手已有的记忆栈。

openclaw 主仓 30 多万星的用户基数，等于给 hermes-agent 开了一条导流管道。

## 同一周四条社区帖连续命中头部

5 月 9 日，官方公布 "Hermes Agent is now #1 on the Global OpenRouter token rankings" 🥇

OpenRouter token 榜第一，意味着实际跑量已经领先。这种"真实使用量数据"对开发者圈是直接的购买理由。

5 月 6 日另一条爆款，r/hermesagent 上的 self-evolution alpha 演示。

作者用 DSPy + GEPA，不上 GPU，基于真实执行 trace 自动演化 skill 文件。拿一个 901 行、用了几周的 codeling skill 做实验，跑了 3 轮 DeepSeek-v4，skill 自己改了自己。

"Agent 改 agent" 这个演示，对持久成长这条叙事是直接的兑现 ✅

5 月 7 日还有一条 108 点赞的 profile 实践帖。作者用了两个月才意识到，把一切塞进一个 profile 是把 hermes 最强的能力浪费掉。

下面 56 条评论在讨论 profile 切换、跨 profile 共享记忆。

## 国内开发者可以做的三件事 💡

**第一件，从 openclaw 切到 hermes-agent 是修通的路**

`hermes claw migrate` 这个命令就是为已有 openclaw 用户准备的，记忆不需要重喂。

**第二件，profile 是核心抽象，不是配置项**

不要单 profile 塞所有任务。一个 Archiver 负责整理资料、一个 Coder 负责写代码、一个 Researcher 负责拉资讯，记忆各自隔离。

老用户在帖子里反复强调这点。

**第三件，self-evolution 这条 alpha 线值得跟**

DSPy + GEPA 路线不依赖 GPU，跑 API 就能改 skill。

国内开发者用 DeepSeek-v4 跑 trace 是社区帖子里直接验证过的路径。对没有显卡的独立开发者特别友好。

## 我的判断

146k 星不是终点。

把"agent 和你一起长大"从口号兑现成可执行的 closed loop，这一周做完了。

下一个节点大概率是看 self-evolution 从 early alpha 走到 main branch 默认开启的那一天 🚀

国内可以通过 OpenRouter、Hugging Face 镜像或者直接克隆仓库本地部署来使用，本文不展开。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 10/10 | 品牌✓ 利益点✓ 可操作✓ -->
