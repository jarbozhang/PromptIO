# NousResearch hermes-agent 涨到 13 万星，它的 topics 里悄悄写满了 openclaw 生态的名字

一周前它还是 12 万星，今天再看是 130499 星，fork 19749，最近一次 push 就在 2026-05-03。

但让我决定再写一篇的，不是星数。

## 先看 topics 列表

NousResearch/hermes-agent 的 topics 字段如下，

ai, ai-agent, ai-agents, anthropic, chatgpt, claude, claude-code, clawdbot, codex, hermes, hermes-agent, llm, moltbot, nous-research, openai, openclaw

十六个 topic 里，前半段是行业通用词，后半段直接把 openclaw 生态四个名字一次性钉上去，clawdbot、moltbot、openclaw、加 hermes 自家。

GitHub 的 topics 字段不是 README 里的随手提一句，是明牌的归类标签，搜索和推荐都吃这个。NousResearch 把 openclaw / clawdbot / moltbot 写进 topics，等于在 GitHub 这一层把 hermes-agent 标记成"openclaw 生态成员"。

对比 openclaw 主仓库的 topics，ai, assistant, crustacean, molty, openclaw, own-data, personal，七个全是自家词，一个对外伸手，一个守自己院子。NousResearch 是主动靠过来的那一方。

## 为什么这件事值得专门写

r/WebAfterAI 上有条 352 赞的帖子，热评写的是，"它的扩展数量没有 OC 多，但它有最重要的一点，稳定，一直能用，我不需要每隔几天或者每次更新后都去 debug"，里面"OC"指的就是 openclaw。

注意这个对比方式。社区在拿 hermes-agent 跟 openclaw 比扩展数量、比稳定性，而不是把它当一个完全独立的项目。两条线在用户心智里已经是同一个家族里的两兄弟了。

r/vibecoding 还有一条更直白的，标题是 "I took the NousResearch Hermes Agent and built a simple managed hosting app"，作者在正文里写，"Hermes Agent 是我用过最有用的 ai agent（咳咳 openclaw 别打我）"，顺手把两边都点了名。

## 两边在做不一样的事

hermes-agent 和 openclaw 在功能上走的不是同一条路。

openclaw 是个人 AI 助手，跨平台、own-your-data，是承载层，topics 里 own-your-data 和 personal 是它的立身之本。

hermes-agent 是 self-improving 的 agent runtime，主打长期记忆和技能自演化。r/LocalLLM 上的描述，"从过往交互里学习并构建长期记忆""自己创造和打磨自己的技能""持续运行"。

所以 NousResearch 把 openclaw 写进 topics 传达的语义不是"我是 openclaw 的复制品"，是"我是这条生态线里负责长期记忆和技能演化的那一块"。clawdbot 和 moltbot 是 openclaw 这边各种 bot 形态的命名脉络，hermes-agent 把这两个名字一起带上，是明牌站队。

## 最低成本的串联方式

我自己把两套都跑过，给一个入门路径。

第一步，本地起 openclaw 主仓库，跑通桌面端的基础场景，对话、查文件、跑命令。

第二步，把 hermes-agent 作为 openclaw 的一个 extension 接进来，主要用它两个能力，persistent memory（所有交互沉淀成长期上下文）和 self-improving skill（从重复操作里抽出可复用 skill）。

第三步，划分职责。日常的"做这件事"交给 openclaw 的 skill 系统，因为 openclaw 的 extension 生态更全。涉及"我上次让你做这件事时怎么处理的""帮我提炼过去三个月关心的项目清单"这种需要长期记忆的，走 hermes-agent 这一侧。

第四步，注意稳定性踩坑。r/hermesagent 上有帖子提到，重启后 workflow 容易掉，token 成本高的话可以把模型换成国内云 API，DeepSeek、Kimi、Qwen 走 OpenRouter 或者各家官方 API 都可以，稳定性和成本都比直接调境外端点好。

## 我的判断

NousResearch 这次主动把自己挂进 openclaw 的 topics 体系，是个信号。

agent 框架这一层的玩家正在从"各做各的"转向"分工咬合"，openclaw 做承载层和扩展生态，hermes-agent 做记忆层和技能演化层。两边在 topics 上互相承认，比一篇联合博客更说明问题。

对中国用户的实操意义，不是"立刻把所有 agent 都换成 hermes"，而是接下来选 agent 框架时，可以认真考虑"openclaw + hermes-agent"这个组合。openclaw 的 extension 多但记忆是短板，hermes-agent 反过来，两个一起用，覆盖面更全。

下一周我会再跑一次 trending 看星数走势，如果 openclaw 主仓库的 topics 也开始反向加上 hermes，那就不只是 NousResearch 单方面靠拢，而是双向锁定了。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
