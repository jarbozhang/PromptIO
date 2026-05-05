# Sebastian Raschka 把 coding agent 拆成 5 块，看完知道国产 Claude Code 平替差在哪

两周前 Raschka 那篇 RLVR + GRPO 拆解，把 DeepSeek R1 怎么训出来讲清楚了。我们当时写了一篇，焦点全在训练侧。

四月初他在自己 magazine 上还更新了另一篇，《Components of A Coding Agent》。这篇的重心反过来，不再讲怎么训模型，讲一个 LLM 怎么变成一个能改你代码仓库的 agent。

副标题写得比正文 hook 更干净，"How coding agents use tools, memory, and repo context to make LLMs work better in practice"。

三个名词，工具、记忆、仓库上下文。Raschka 把"coding agent"这个词组里看起来神秘的部分全拆光了，剩下三根支柱。

我在标题里写"5 块"，是因为这三根支柱再往下分，会自然落到五个可独立评估的组件。这五个组件正好可以拿去横扫今年涌出来的国产 Claude Code 平替，每一家差在哪一个组件，看完就清楚。

## Raschka 的三轴拆法

先把原文那套拆法讲完整。

第一轴是工具调用（tools）。Raschka 在文章里反复强调一件事，**LLM 不读代码、不写代码、也不跑代码，工具才做这些事**。LLM 只是在决定下一步该调哪个工具、传什么参数。read_file、write_file、grep、bash、run_tests，这些都是工具。一个 coding agent 厉害不厉害，第一层看它给 LLM 暴露了哪些工具，工具的语义是不是够干净。

第二轴是记忆（memory）。这一轴在 Raschka 的描述里又分两块。

短期记忆是上下文窗口里那几十 K 到几百 K token，每一轮对话累加。长期记忆是写到磁盘上的那个 AGENTS.md / CLAUDE.md / 项目笔记，下一次进来的时候由 agent 主动 load 进上下文。短期记忆是物理学的极限，模型多大窗口就多大；长期记忆是工程学的活，怎么写、什么时候写、写在哪、下次怎么找回来，全是 agent 框架的设计选择。

第三轴是仓库上下文（repo context）。这一轴是 coding agent 区别于普通 chat 的关键。一个仓库可能十万行代码，一次塞不进任何窗口，agent 怎么定位"这次任务相关的那 200 行"。Raschka 列了三种主流路径，

- 直接 grep / ripgrep，文件路径搜
- 嵌入向量检索，语义搜
- 调用 LSP（Language Server Protocol），按符号引用关系遍历

把这三轴铺开，一个 coding agent 真正可拆的组件就是五块，

1. **工具集语义** — 暴露给 LLM 的工具列表是不是覆盖了从 read 到 exec 的全链路
2. **短期上下文管理** — 上下文窗口怎么压缩、怎么截断、怎么 hand-off
3. **长期记忆持久化** — AGENTS.md 这套机制是不是有，是不是 agent 自己会写
4. **仓库索引** — grep / embedding / LSP 三选哪个，或者全都做
5. **任务循环控制** — 多轮工具调用的中断、回退、并行策略

Raschka 原文偏理论拆解，没把当下任何一家产品塞进框架里逐个评分。这件事我们今天补一下。

## 拿框架横扫国产 Claude Code 平替

国内今年密集冒出来的 coding agent / CLI 至少四家。Trae（字节）、ds2api（社区中间件接 DeepSeek）、Z.ai 的 GLM coding agent 后端、Kimi-cli。我们前两周陆陆续续都写过。

把 Raschka 的五个组件做成一张评估表，逐一对一遍。

**Trae，字节官方 IDE 产品**

四月底我们写过 system-prompts 那个 136k 星的仓库，里面 27 个工具的 prompt 模板有 Trae 一席。从那份 prompt 看，Trae 的工具集是齐的，read / write / grep / bash / browser 全有，甚至还把"代码 diff 预览"做成独立工具。短期上下文管理在 IDE 内可见，超过 token 上限会自动 summarize。长期记忆这一项 Trae 走的是 IDE 工程文件存储，类似 .trae/rules，但这套机制公开文档不多。仓库索引上 Trae 接的是 IDE 自带的 LSP + 全文索引，是这五家里仓库上下文做得最重的。任务循环可中断、可并行，体验接近 Cursor。

差在哪？差在它绑死字节自家 IDE。你想拿它当 CLI 接到 VS Code、接到 Neovim、接到任何外部工具上，没路径。**仓库上下文最强，开放性最弱**。

**ds2api，社区中间件**

把这家放进框架其实有点不公平。ds2api 是个协议翻译器，自己不实现 agent，把 DeepSeek 网页版的免费聊天接口翻译成 OpenAI / Anthropic 兼容协议，让 Cline / Claude Code 这种第三方 agent 接进来。

所以五个组件 ds2api 自己都不做。它做的是第六件事，**让任何 coding agent 能用上你的 DeepSeek 个人账号**。

但正因为它把模型和 agent 解耦了，在框架对照时它有一个独特意义。你接 ds2api 之后，工具集、记忆、仓库索引、任务循环全部落在前端那个 agent（Cline / Claude Code）身上，DeepSeek 只负责"接收一段提示、返回一段回复"。这是 Raschka 框架的极限简化版，所有 agent 工程都甩给客户端。

差在哪？差在合规风险。我们在 ds2api 那篇文章里讲过，逆向中间件长期不可持续。但它暴露了一个事实，**国产模型 API 自己有没有 agent 能力，这件事独立于模型 benchmark**。

**Z.ai 的 GLM coding agent 后端**

智谱昨天那篇 Scaling Pain 我们也写过。那篇文章的视角是 serving 工程，没怎么讲 agent 框架本身。

但读 retro 能间接看到 Z.ai 后端的几个细节。一是它跑的是真正的 coding agent 负载，平均输入 70K+ tokens、前缀重用率高、单次任务可能跑 4000+ 工具调用。二是它把 spec decoding 的拒绝率当异常监控信号，这种细致度只有真做了线上 agent 服务的团队才会想到。三是 PD 分离 + HiCache + LayerSplit 这套 serving 栈针对的是 long context decoding，正好对应 Raschka 框架里的"短期上下文管理"那一块。

但 Z.ai 没有自己的 CLI，它是 API 后端。要用 GLM-5 跑 coding agent，你得自己接 Cline 或 Cursor。**短期上下文压榨极致，前端缺失**。

**Kimi-cli，Moonshot 自研 CLI**

四月底我们写过 K2.6 偷跑那篇，重心放在模型本身。回头用五组件框架重看 kimi-cli，能看清几件事。

工具集这一项 kimi-cli 是齐的，主程序、ACP server、MCP 管理三件套。MCP 这条路等于把工具列表开放出去，第三方可以挂。Ctrl-X 在"AI 模式"和"shell 模式"之间切，是一个工具集语义层面的小巧思，承认 LLM 不该接管所有 shell 操作。

短期上下文管理 kimi-cli 跟着 K2.6 的 256K 原生窗口走，工程层面没看到太多压缩 / 截断逻辑暴露。

长期记忆这一项在 kimi-cli 里我没找到对应 AGENTS.md 的明确机制。这是国产 CLI 普遍的弱项，**Anthropic 把 CLAUDE.md 变成事实标准之后，国产复制的全是工具调用形式，复制不来"agent 自己写笔记"那一层**。

仓库索引 kimi-cli 走的是最朴素那条路，让 LLM 自己 grep。没有 embedding 索引，没有 LSP 集成。任务循环可以连续跑 4000+ 工具调用、12 小时不停（官方宣称数字，第三方还没复现），但中途失忆的老问题在 preview 版踩过坑。

差在哪？**长期记忆和仓库索引两项空着**。这两项不补上，跑 SaaS 项目级别的真实重构任务就一定会卡。

## 我自己用的那张评估表

把上面五家的对照浓缩到一张表，每个组件给一个粗粒度的评级。这表你也可以拿去套你正在用的工具。

```
组件             Trae   ds2api  Z.ai 后端  Kimi-cli  Claude Code
工具集语义        强      转发     强         中         强
短期上下文        中      转发     强         中         强
长期记忆          中      无       无         弱         强
仓库索引          强      无       无         弱         强
任务循环          强      无       中         中         强
```

ds2api 那行所有打"转发"或"无"，是因为它本身不是 agent，组件全压在前端。

这张表的意义不是评分，是看出**国产 Claude Code 平替整体的两个共性短板**。

第一个短板是长期记忆。目前国内五家里没有一家把 AGENTS.md / CLAUDE.md 这套机制做扎实。模型层面 200K、256K context 已经追平 Anthropic，但 agent 框架层面的"自我写笔记、跨会话保留判断"这一层全是空白。

第二个短板是仓库索引。除了 Trae 因为绑 IDE 拿到了 LSP，其他几家在仓库上下文上要么纯 grep，要么压根不做。Claude Code 之所以体验拉开差距，很重要的一点是它会在你不开口的情况下扫一遍仓库，把可能相关的目录预读一遍。这种"agent 主动探查仓库"的行为，国产几家都还没做出来。

## 我的判断

读完 Raschka 这篇我意识到一件事，**国产 Claude Code 平替这件事，模型层面的差距早过去了，差距全部沉到 agent 框架那五个组件里**。

K2.6 的 256K 窗口、GLM-5 的工程稳定性、DeepSeek 网页端的免费畅聊，单独拎出来都不输 Anthropic。但你日常用 Claude Code 写一周代码再去用国产 CLI 写一周，差距体感不在"模型懂不懂代码"，在"agent 知不知道这个仓库已经聊到第几轮、上次留了什么 todo、当前任务该不该并行开三个子 agent"。

这些是 agent 工程的活，跟模型 benchmark 关系不大。

所以下一波国产 coding agent 的胜负手，不在模型规模，在那五个组件里谁先把长期记忆和仓库索引补齐。Moonshot 这次把 kimi-cli 跟 K2.6 同步发布，是国产厂商第一家承认"CLI 是产品"。但承认不等于做完，距离 Claude Code 那种"agent 自动维护项目知识库"的状态还差至少两个版本。

我自己短期还会继续用 Claude Code 当主力，但每周用 kimi-cli 跑一次同样任务做对照。两个 agent 写同一段重构、同一份测试，差距会落在 Raschka 那五块里的哪几块，记下来。

这事比再看一篇 benchmark 评测有用。

## 行动建议

如果你今天要选一个 coding agent CLI，按这五个组件自检一次，

第一，工具集语义全不全？至少 read / write / grep / bash / run_tests 五件套要齐。

第二，短期上下文管理有没有自动 summarize？没有的话长任务一定会爆。

第三，有没有类似 AGENTS.md 的长期记忆机制？没有就要自己手动维护一份 notes。

第四，仓库怎么搜？纯 grep 在大仓库会慢到没法用，看看有没有 embedding 或 LSP 加成。

第五，任务循环能不能中断、能不能并行？这俩缺一个，agent 跑长任务体验都崩。

打分加起来低于 3，先别上生产，回头多看一眼 Claude Code 是怎么把这五件事做扎实的。

## 相关链接

- Raschka 原文 Components of A Coding Agent，https://magazine.sebastianraschka.com/p/components-of-a-coding-agent
- Raschka 上一篇 Workflow for Understanding LLMs，https://magazine.sebastianraschka.com/p/workflow-for-understanding-llms
- 我们写过的 Raschka GRPO 拆解，drafts/2026-04-23/sebastian-raschka拆rlvr-grpo让llm推理追上o3的几个关键
- ds2api 仓库，https://github.com/CJackHwang/ds2api
- kimi-cli 仓库，https://github.com/MoonshotAI/kimi-cli
- 智谱 Scaling Pain retro，https://z.ai/blog/scaling-pain

---
相关实体:: [[sebastian-raschka]] | [[anthropic]] | [[claude-code]] | [[moonshot]] | [[zhipu]]
相关主题:: [[ai-coding-tools]] | [[agent-frameworks]] | [[ai-research]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
