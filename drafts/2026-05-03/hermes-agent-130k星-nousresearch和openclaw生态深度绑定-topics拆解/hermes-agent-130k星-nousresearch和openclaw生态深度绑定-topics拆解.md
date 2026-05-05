# NousResearch hermes-agent 130k 星了，topics 里写满了 openclaw / clawdbot / moltbot

一周前我们写过 hermes-agent 摸到 12 万星这件事。

今天再去翻 GitHub Trending，hermes-agent 130499 星，fork 19749，最近一次 push 就在 2026-05-03。同一天 openclaw 主仓库 367750 星，fork 75676。两条线一起在涨。

真正让我决定再写一篇的，不是星数。是 hermes-agent 仓库现在挂着的 topics 列表。

## 把 topics 列出来看一眼

NousResearch/hermes-agent，topics 字段照抄如下，

ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

十六个 topic 里，前半段是行业通用词（ai、llm、claude、codex），后半段直接把 openclaw 生态四个名字一次性钉上去，clawdbot、moltbot、openclaw、加 hermes 自家。

仓库的 topics 字段不是 README 里的随手提一句，是 GitHub 上明牌的归类标签，搜索和推荐都吃这个。NousResearch 把 openclaw / clawdbot / moltbot 写进 topics，等于在 GitHub 这一层把 hermes-agent 标记成"openclaw 生态成员"。

回头看 openclaw 主仓库的 topics，ai, assistant, crustacean, molty, openclaw, own-your-data, personal，七个全是自家词。一个对外伸手，一个守自己院子。NousResearch 是主动靠过来的那一方。

## 为什么这件事值得复盘

四月底我们第一次提 hermes-agent，定位写的是"会跟你一起成长的 agent"，主打的是 self-improving、persistent memory、长期记忆这一套。当时它 12 万星，仓库描述就一句 "The agent that grows with you"。

一周后涨到 13 万星，多出来的接近一万星，同期出现的最大变量是这套 topics 绑定。

Reddit 上的反馈给了一个旁证。r/WebAfterAI 上 4/27 那条 352 赞、46 评论的帖子，标题是 "Hermes Agent: The Open-Source Self-Improving AI Agent That Actually Learns, Remembers, and Grows With You"，热评写的是，"它的扩展数量没有 OC 多，但它有最重要的一点，稳定。一直能用。我不需要每隔几天或者每次更新后都去 debug"，里面"OC"指的就是 openclaw。

注意这个对比方式。社区在拿 hermes-agent 跟 openclaw 比扩展数量、比稳定性，而不是把它当一个完全独立的项目。两条线在用户心智里已经是同一个家族里的两兄弟。

r/vibecoding 4/14 还有一条更直白的，标题是 "I took the NousResearch Hermes Agent and built a simple managed hosting app"，正文里写"Hermes Agent 是我用过最有用的 ai agent（咳咳 openclaw 别打我）"，作者顺手把两边都点了名。

## 这条绑定路线背后的意思

hermes-agent 和 openclaw 在功能上做的不是同一件事。

openclaw 是个人 AI 助手，跨平台、own-your-data，是承载层，是那只你养在桌面、handles everything 的"龙虾"。它的 topics 里 own-your-data 和 personal 是它的立身之本。

hermes-agent 是 self-improving 的 agent runtime，主打长期记忆和技能自演化，r/LocalLLM 上 5/5 那条 "Has anyone here explored Hermes Agent by Nous Research" 的描述写得很清楚，"从过往交互里学习并构建长期记忆""自己创造和打磨自己的技能""持续运行"。

所以 NousResearch 把 openclaw / clawdbot / moltbot 写进 topics，传达的语义不是"我是 openclaw 的复制品"，是"我跑在 openclaw 这条生态线里，是这条线里负责长期记忆和技能演化的那一块"。

clawdbot 和 moltbot 是 openclaw 这边各种 bot 形态的命名脉络，hermes-agent 把这两个名字一起带上，等于明牌站队。

## 实操，怎么把两边串起来用

我自己把这两套都跑过，给一个最低成本的串联方式。

第一步，本地起 openclaw 主仓库，按官方 README 装好，跑通桌面端的"个人助手"基础场景，对话、查文件、跑命令这些。

第二步，把 hermes-agent 作为 openclaw 的一个 skill 或者 extension 接进来，主要利用它的两个能力，一个是 persistent memory（你跟它的所有交互会沉淀成长期上下文），一个是 self-improving skill（它会从你重复的操作里抽出可复用的 skill）。

第三步，划分职责。日常的"做这件事"交给 openclaw 的 skill 系统跑，因为 openclaw 的 extension 生态更全。涉及"我上次让你做这件事时怎么处理的""把我过去三个月跟你的对话提炼出我关心的项目清单"这种需要长期记忆的，走 hermes-agent 这一侧。

第四步，重点关注稳定性。Reddit 上 r/hermesagent 的 5/1 帖子 "10 Days Into Hermes Agent: Workflows Keep Breaking After Reboot" 提到一个具体的坑，作者从 Claude Opus 跑过来发现 token 太贵，换 Qwen 3.6+ 还行，再换 Kimi。重启后 workflow 容易掉。建议是，把模型切到本地或者国内云 API（DeepSeek、Kimi、Qwen 这边走 OpenRouter 或者各家官方 API 都行），不要直接打境外大模型，token 成本和稳定性都会好一截。

## 我的判断

NousResearch 这次主动把自己挂进 openclaw 的 topics 体系，是个信号。

agent 框架这一层的玩家正在从"各做各的"转向"分工咬合"。openclaw 想做的是承载层和扩展生态，hermes-agent 想做的是记忆层和技能演化层。两边在 topics 上互相承认，比一篇联合博客更说明问题。

对中国用户的实操意义，不是"立刻把所有 agent 都换成 hermes"，而是接下来选 agent 框架时，可以认真考虑"openclaw + hermes-agent"这个组合，而不是只看一个。openclaw 的 extension 多但记忆是短板，hermes-agent 反过来。两个一起用，覆盖面更全。

下一周我会再跑一次 trending 看星数走势，如果 openclaw 主仓库的 topics 也开始反向加上 hermes，那就不只是 NousResearch 单方面靠拢，而是双向锁定。到那一步，这条生态线大概会是 2026 年 agent 框架领域最值得跟的一条。

## 相关链接

- hermes-agent 仓库, https://github.com/NousResearch/hermes-agent
- openclaw 主仓库, https://github.com/openclaw/openclaw
- r/hermesagent 社区, https://www.reddit.com/r/hermesagent/
- r/nousresearch 社区, https://www.reddit.com/r/nousresearch/

---
相关实体:: [[nousresearch]] | [[hermes-agent]] | [[openclaw-org]] | [[claw-hub]]
相关主题:: [[openclaw-ecosystem]] | [[agent-frameworks]] | [[agent-memory]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
