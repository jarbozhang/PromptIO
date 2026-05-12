# OpenAI Daybreak 杀来了，Mythos 第三个对手登场，AI 漏洞挖掘工作流到底怎么用

5 月 11 日晚上，AI 漏洞挖掘这条赛道在 6 小时内被三件事砸成了大新闻。

下午 4 点，Google 威胁情报组 GTIG 发了报告，说他们第一次拦下了一个"由 AI 协助开发"的 zero-day 漏洞利用脚本，目标是某个开源 web 管理工具的双因素认证绕过，差一点就被某黑产团伙拿去做"大规模利用事件"。晚上 11 点，OpenAI 官宣 Daybreak，把今年 3 月发布的 Codex Security Agent 升级成一个完整的漏洞发现 + 补丁验证体系。中间还夹着 Daniel Stenberg 那篇浇了 Mythos 一头冷水的 curl 博客。

到这一刻，AI 漏洞挖掘工作流已经形成三家独大的格局，Anthropic 的 Mythos、OpenAI 的 Daybreak、Google 的 GTIG。三家的定位、工作流、面向的客户全都不一样。国内做开源维护、企业代码审计、安全运营的团队，绕不开"该用哪个"的选择题。今天把这道题拆开讲。

## OpenAI Daybreak，威胁建模驱动

The Verge 在 5 月 11 日深夜放出来的 Daybreak 简介只有一段，但工作流被讲得很清楚。

Daybreak 的核心不是"扫全部代码找漏洞"，是"先建威胁模型，再聚焦攻击路径"。流程拆出来是四步，第一步根据组织代码库自动生成 threat model；第二步聚焦最可能的攻击路径；第三步对潜在漏洞做 validation 确认其真实可利用；第四步把高风险项的检测自动化下来。

底层模型是 3 月发布的 Codex Security Agent，没有官方披露具体参数规模。OpenAI 选择的差异化点是"agent 化"，Daybreak 不是一个会跑给你看 finding 的扫描器，是一个会持续在你的代码库里巡逻并主动出报告的 agent。

OpenAI 官方的定位句也很直白，"move security from reacting after problems happen to building software that is more resilient from the start"，从事后响应转到事前加固。配合 OpenAI 已有的企业线（ChatGPT Enterprise / Codex 订阅），Daybreak 显然是冲着企业内部 DevSecOps 流程去的，不是开源社区。

## Anthropic Mythos，人工驱动 LLM 子代理

Mythos 走的是完全不同的路线。

4 月 7 日 Anthropic 发布的时候，Mythos 是受限投放，参数量 754B，只给受邀请的安全研究员，配合 Glasswing 项目封闭使用。Anthropic 公开理由是"too dangerous to release"，被 Sam Altman 4 月 22 日在 X 上公开嘲讽为"fear-based marketing"。

5 月 8 日 Code w/ Claude 2026 大会之后路线开始变。Mozilla 公布在 Firefox 上跑了 31 天，找到 271 个零日漏洞、几乎无误报；5 月 11 日 curl 作者 Daniel Stenberg 在博客里给出"5 进 1"的结果，确认 1 个低危 CVE 进 8.21.0。

Mythos 工作流的关键词是 "human-driven LLM sub-agent analysis"，每条 finding 必须经过人工源码复核。这套流程的本质是 "AI 找 + 人工 verify" 的双层 pipeline，对 host 项目自身的 triage 能力要求很高。Mozilla 能跑通 271 条是因为内部有完整的 security team 和 fuzz 历史数据，curl 团队也能在几小时内手工 verify 5 条报告。

国内中小开源团队照搬 Mythos 工作流第一个会卡在哪里？不是模型接入，是 verify 人力。

## Google GTIG，防御视角的检测

Google 这一侧 5 月 11 日的报告角度跟 Anthropic / OpenAI 都不一样。

GTIG 的工作不是"用 AI 找漏洞"，是"用 AI 识别别人用 AI 写出来的漏洞"。报告里写得很具体，他们从黑产团伙的 Python 利用脚本里发现了"幻觉出来的 CVSS 评分"、"教科书式的结构化注释"这些 LLM 训练数据特有的文本指纹，反推出脚本是 AI 协助开发的。

针对的目标是某个未署名的开源 web 管理工具，漏洞类型是 2FA 绕过，攻击意图是 "mass exploitation event"。Google 拦下的时间点是攻击者准备规模化部署之前。

GTIG 的工作流可以拆成三段，第一段是常规的威胁情报采集，从 dark web、underground forum、malware sample 里捞素材；第二段是用 LLM 分析特征做归因；第三段是配合 Google 自己的 Project Zero / Big Sleep 团队做漏洞披露和缓解。

Google 不是来卖产品的，Daybreak 和 Mythos 是要给你用的工具，GTIG 是一份"行业现状报告"，告诉你攻击者已经在用 AI 了，你必须跟上。

## 三方对照表

把三家放到同一张表上，差异一眼看清。

| 维度 | OpenAI Daybreak | Anthropic Mythos | Google GTIG |
|------|----------------|------------------|-------------|
| 视角 | 进攻视角找漏洞 | 进攻视角找漏洞 | 防御视角识别 AI 攻击 |
| 客户 | 企业 DevSecOps | 大型开源项目 + 安全研究员 | 行业 + Google 自己 |
| 工作流 | agent 自动巡逻 | 人工驱动 + LLM 子代理 | 威胁情报 + 特征识别 |
| 关键能力 | 威胁建模 + 补丁验证 | 大规模代码扫描 + 报告生成 | AI 攻击归因 + 拦截 |
| 模型可访问性 | 通过 OpenAI 企业线 | 受限投放（Project Glasswing） | 不对外（内部使用） |
| 公开战绩 | 5/11 刚发布暂无 | Firefox 271、curl 5 进 1 | 拦下 1 个 AI 辅助 zero-day |

## 多平台真实反馈

r/SecOpsDaily 和 r/AIGuild 已经在 5 月 12 日凌晨发了 Daybreak 的简讯，但赞数都还在个位数，社区还没来得及形成判断。r/BetterOffline 那边 Stenberg 的"营销噱头"原话仍在持续发酵。

值得一提的是 r/hermesagent 5 月 10 日有一个 77 赞 55 评的帖子叫 "The AI Agent Setup That Finally Clicked for Me: Hermes + OpenAI Codex + Claude Code"，作者把三家的 agent 拼在一起用，Hermes 做记忆和编排，Codex 做代码执行，Claude Code 做 review。这种"工具拼装"模式可能才是接下来 12 个月开发者的主流路径，没人会只用一家。

Google 这次的 GTIG 报告在 Twitter 上的传播角度更偏宏观叙事，被反复引用的金句是"防御方第一次实战拦下了 AI 攻击"。这个时间点很重要，AI 攻防开始正式进入对称化阶段。

## 我的判断

AI 漏洞挖掘已经从"该不该用"过渡到"该怎么搭"。三家工作流不是替代关系，是 layer 关系。

Mythos 适合大项目的 quarterly audit，一次性大规模扫一遍出 findings 列表，然后用几周时间走 verify 流程。代码体量在百万行级、内部有专门安全团队的，比如国内的 OpenHarmony、欧拉操作系统、龙蜥社区，对得上 Mozilla 那张牌的样本。

Daybreak 适合企业内部 CI/CD 集成，做的是常态化巡逻和补丁验证。"威胁建模 + 攻击路径聚焦"这个组合对中小型企业的实战价值比 Mythos 更高，因为它不要求你有 Mozilla 那种 triage 基础设施。3 月的 Codex Security Agent 已经在跑，Daybreak 是把它产品化。

GTIG 这种"识别 AI 攻击者"的能力，国内目前对标的是奇安信 QAX-GPT、360 数字安全的安全 GPT。GTIG 报告里那两个识别指纹，"幻觉的 CVSS 评分"和"教科书式的结构化"，是任何安全运营团队今天就能开始关注的特征。

国内做开源大项目维护的、字节阿里腾讯华为开源团队、Linux 基金会中国成员，下一步动作很明确，选一款国产 AI 代码扫描工具（智谱企业版 / 通义灵码安全扫描 / 豆包代码 SAST 接入）跑一遍核心仓库，建立 baseline。这个动作的成本是几千块 API 费用 + 一周时间。不做的话，攻击者比你先做。

真正的坑还是 verify。Stenberg 团队 5 条手工复核花了几小时，Mozilla 271 条能跑通是因为内部 triage 工具链已经成熟。国内团队最先要建的不是模型接入，是"AI 报告进来之后谁来确认、按什么 SLA 处理、误报怎么 escalate"的全套流程。没这一环，再准的模型也会变成噪声生成器。

## 行动建议

如果你在做企业代码审计，本周可以做的事，把 OpenAI 官网 Daybreak 的页面认真读一遍，看看 threat model 自动生成这一段对你现有 SAST/DAST 工具链的补位价值。Codex Security Agent 已经在 ChatGPT Enterprise 里可用，价格和接入路径都摆出来了。

如果你在维护开源项目，先看 Stenberg 那篇 curl 博客（链接见文末）。然后挑一个 PR，让国产 AI 工具跑一遍 review。这是最便宜的 baseline 校准方法。

如果你在做安全运营，重点关注 Google GTIG 那份报告里关于 "AI 生成代码特征" 的两段描述。把这些 indicator 加进你的威胁狩猎规则，下一个被 AI 辅助攻击的可能就是你护的资产。

最后回到开头那 6 个小时。Anthropic 在 5 月初把 Mythos 推上前线，OpenAI 在 5 月 11 日深夜补位 Daybreak，Google 在同一天用 GTIG 的报告完成了防御侧的姿态宣示。三方下场之后，AI 漏洞挖掘已经不是某一家厂商的产品故事，是整个行业的基础设施层。

国内厂商已经在追，但追的不只是模型能力，是这套从扫描 → verify → 补丁 → 自动化 → 拦截的完整工作流。下一个 6 个月，谁能把 verify 这层做好，谁就赢。

## 相关链接

- The Verge 报道 Daybreak，https://www.theverge.com/ai-artificial-intelligence/928342/openai-daybreak-security-ai
- The Verge 报道 Google GTIG，https://www.theverge.com/tech/928007/google-ai-zero-day-exploit-stopped
- Daniel Stenberg 那篇 curl 博客，https://daniel.haxx.se/blog/2026/05/11/mythos-finds-a-curl-vulnerability/
- r/SecOpsDaily Daybreak 简讯，https://www.reddit.com/r/SecOpsDaily/comments/1tauxg9/openai_launches_daybreak_for_aipowered/
- r/AIGuild Daybreak 简讯，https://www.reddit.com/r/AIGuild/comments/1tamrf1/openai_launches_daybreak_to_bring_frontier_ai/

---
相关实体:: [[mythos|Mythos]] | [[openai|OpenAI]] | [[google|Google]] | [[anthropic|Anthropic]]
相关主题:: [[ai-security|AI 安全]] | [[supply-chain-security|供应链安全]]

<!-- REACH: 9/10 | 品牌✓ 利益点✗ 可操作✓ -->
