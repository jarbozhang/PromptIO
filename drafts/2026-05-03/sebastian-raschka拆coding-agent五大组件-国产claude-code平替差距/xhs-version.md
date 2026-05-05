# 研究员拆解 coding agent 的 5 个组件，选工具的时候用得上

Sebastian Raschka 最近在自己的 newsletter 上更新了一篇《Components of A Coding Agent》，把"coding agent"这个词拆得很干净。

副标题三个名词，工具、记忆、仓库上下文。我读完觉得这套框架拿来选国产 CLI 工具很顺手，整理一下分享给大家。

## Raschka 拆出来的三根支柱

**第一根，工具调用。** LLM 本身不读代码、不写代码、不跑代码，工具才做这些事。LLM 只是决定下一步调哪个工具、传什么参数。一个 coding agent 能力几何，第一层就看它给模型暴露了哪些工具，read_file、write_file、grep、bash、run_tests，这些工具的语义够不够干净。

**第二根，记忆。** 分两层。短期记忆是上下文窗口里那几十 K 到几百 K token，每轮对话累加。长期记忆是写到磁盘上的那个 AGENTS.md / CLAUDE.md，下次进来由 agent 主动 load。短期记忆是物理限制，窗口多大就多大；长期记忆是工程设计，怎么写、什么时候写、下次怎么找回来，全是框架的选择。

**第三根，仓库上下文。** 一个大型仓库可能十万行代码，一次塞不进任何窗口，agent 怎么定位"这次任务相关的那 200 行"？Raschka 列了三条路：直接 grep 文件路径搜、嵌入向量语义搜、调用 LSP 按符号引用关系遍历。

这三根支柱往下拆，就落到五个可独立评估的组件：工具集语义、短期上下文管理、长期记忆持久化、仓库索引、任务循环控制。

## 国内几家 coding agent 各自的优势在哪

今年国内密集出现了好几款 coding agent / CLI，用这五个组件分别看一下各家的侧重。

**Trae（字节）**，工具集齐，read / write / grep / bash / browser 全有，还把"代码 diff 预览"做成独立工具。仓库索引这块接了 IDE 自带的 LSP + 全文索引，是几家里上下文工程做得最重的。任务循环可中断可并行，体验接近 Cursor。Trae 的特点是 IDE 深度集成，如果你本来就用字节系 IDE，仓库理解这块能直接受益。

**ds2api（社区中间件）**，定位是协议翻译器，把 DeepSeek 网页端账号接到 OpenAI / Anthropic 兼容协议上，让 Cline / Claude Code 这类第三方 agent 接进来。它本身不做 agent，但解耦了模型层和 agent 层，工具集、记忆、任务循环全部由前端 agent 负责，模型只做"接收提示、返回回复"这件事。适合想用自己 DeepSeek 账号跑现有 agent 框架的用户，注意这类中间件的合规稳定性需要自己评估。

**Z.ai 的 GLM 后端**，从他们公开的 serving 架构看，针对的是真实 coding agent 负载，平均输入 70K+ tokens，单次任务可达 4000+ 工具调用。PD 分离 + HiCache + LayerSplit 这套栈专门优化了 long context decoding，对应 Raschka 框架里的"短期上下文管理"那一块。如果你通过 API 调 GLM-5 跑 coding agent，后端工程上这个方向投入不少。前端需要自己接 Cline 或 Cursor。

**Kimi-cli（Moonshot）**，工具集这块主程序 + ACP server + MCP 管理三件套，MCP 开放了工具列表，第三方可以挂。Ctrl-X 在"AI 模式"和"shell 模式"之间切，是个实用小设计，避免 LLM 接管不该接管的 shell 操作。跟着 K2.6 的 256K 原生窗口走，长任务官方宣称可以跑 4000+ 工具调用连续 12 小时。特点是月之暗面第一家把 CLI 作为独立产品对外发布，MCP 生态扩展性有潜力。

## 五组件自查表

选工具的时候可以对着这五条自己过一遍：

1. 工具集够不够？至少 read / write / grep / bash / run_tests 五件套要齐
2. 长任务有没有自动 summarize？没有的话超过 token 上限一定会爆
3. 有没有类似 AGENTS.md 的长期记忆机制？没有就要自己手动维护一份 notes
4. 大仓库怎么搜？纯 grep 在十万行仓库会很慢，看看有没有 embedding 或 LSP 加成
5. 任务循环能不能中断、能不能并行？缺一个跑长任务体验都会有问题

打分低于 3 分，先别拿去跑生产任务，先搞清楚这个工具在哪一块有短板。

## 我的判断

读 Raschka 这篇让我确认一件事：国产 coding agent 的模型层面已经很能打了，K2.6 的 256K 窗口、GLM-5 的工程稳定性，单独看都有竞争力。但日常用下来，体感差距主要落在 agent 框架那五个组件里，尤其是长期记忆和仓库索引这两块，目前整体上还有提升空间。

Raschka 这篇的价值在于给出了一套不依赖 benchmark 的评估语言。下次有人跟你说"这个 agent 比那个强"，你可以直接问：五个组件哪一块强？这比对比 HumanEval 分数有用。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
