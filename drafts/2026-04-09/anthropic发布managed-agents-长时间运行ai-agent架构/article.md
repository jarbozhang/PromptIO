# Anthropic 把 Agent 拆成了三块，p95 延迟直接砍掉 90%

昨天 Anthropic 工程博客放了一篇文章，标题很低调，叫 "Scaling Managed Agents"。但里面藏了一个让我盯着屏幕看了好久的架构图。

他们把一个 Agent 拆成了三个完全独立的部分，session、harness、sandbox，然后说了一句话，"我们对接口的形状有态度，对接口背后跑什么没态度。"

这句话让我想到了操作系统。

## 先说结果

Managed Agents 是 Anthropic 刚上线的托管式 Agent 服务，跑在 Claude API 上。你可以理解为，Anthropic 帮你把 Agent 的"脏活"全包了。容器编排、状态持久化、错误恢复、凭证管理，你只需要关心 Agent 该做什么。

但真正有意思的不是产品本身，是他们工程博客里写的架构演进故事。

他们一开始也踩了坑。所有组件塞在一个容器里，典型的 "宠物模式"，每个实例都是独一无二的小宝贝，挂了就真挂了。session 丢失，调试还得碰用户数据。

听着是不是很熟悉？我去年搭内部 Agent 系统的时候，也是这个路子。一个 Docker 容器塞所有东西，跑了三天发现 OOM，重启后上下文全没了。

## 三层解耦，像操作系统一样

他们的解法是把 Agent 拆成三层。

**Session**，一个只追加的事件日志 (append-only event log)。Agent 做的每一步都记下来，不删不改。session 独立于任何容器存在，通过 `wake(sessionId)` 随时唤醒，通过 `getEvents()` 随时回溯。

**Harness**，编排循环。就是那个不断调 Claude、拿结果、决定下一步的 loop。关键在于它是无状态的，可以水平扩展，挂了换一个接着跑。

**Sandbox**，执行环境。代码在这里跑，文件在这里存。但它变成了 "牲畜模式"，用完即弃，坏了就换新的。

这三层之间只通过标准化接口通信。sandbox 暴露一个 `execute(name, input) → string`，harness 调它就行。容器初始化就一个 `provision({resources})`。

为什么我觉得这个设计值得聊？因为它解决了一个我自己反复碰到的问题。

## 真正的问题是"脑子"和"手"绑在一起

坦率讲，现在市面上大多数 Agent 框架，LangChain、CrewAI、AutoGen，都有一个隐含假设。推理和执行在同一个进程里。Claude 想到要执行一段代码，代码就在本地跑，结果直接塞回上下文。

这在 demo 阶段没问题。

但你想想看，一个 Agent 跑了两个小时，中间容器挂了一次，你怎么恢复？上下文窗口快满了，你怎么管理？你要让 Agent 同时操作三个不同的沙箱环境，怎么调度？

Anthropic 的答案是，把"脑子" (harness) 从"手" (sandbox) 里拔出来。

harness 挂了，session 里的事件日志还在，换个新 harness 接着读。sandbox 挂了，harness 捕获异常当 tool call 的报错传给 Claude，Claude 自己判断怎么处理。

这带来了一个很实际的性能提升，p50 首 token 延迟 (TTFT) 降了约 60%，p95 降了超过 90%。原因很简单，以前容器是预先分配的，现在是按需启动。

## 上下文窗口不是用来塞满的

还有一个细节让我觉得挺妙的。

传统做法处理上下文溢出，要么截断 (truncation)，要么摘要压缩。两种都是有损操作。你永远不知道截掉的那段里有没有关键信息。

Anthropic 的做法是把 session 本身当作外部上下文存储。harness 可以通过 `getEvents()` 灵活地取事件，按位置切片、倒回到某个时间点、重读之前的上下文。然后由 harness 决定哪些事件需要塞进 Claude 的上下文窗口。

说真的，这其实就是操作系统里虚拟内存的思路。物理内存 (上下文窗口) 是有限的，但虚拟地址空间 (session 日志) 可以很大，按需换页就行。

## 社区里的多种声音

这篇文章在 Hacker News 上拿了 155 分、68 条评论。社区的讨论很有意思。

有人觉得这是 Anthropic 在抢 Agent 基础设施的生意，"你把 Agent 运行时也托管了，那 LangChain 们还能干嘛？" 也有人指出，这种解耦设计其实不新鲜，微服务架构早就在做类似的事。只不过 Anthropic 把它套到了 LLM Agent 的语境下。

还有开发者提了一个很尖锐的问题。如果 Agent 跑了几个小时，中间 Claude 的 API 出了问题或者模型行为变了，这个 session 的一致性怎么保证？

Anthropic 在 X 上的官方推文拿到了 2769 个赞、340 次转发。从互动量看，大家对"长时间运行的 Agent"这个话题是真的有需求。

## 我的判断

我认为这篇工程博客比 Managed Agents 产品本身更重要。

产品层面，托管式 Agent 服务不稀奇。Google 有 Vertex AI Agent Builder，AWS 有 Bedrock Agents。但 Anthropic 把内部架构设计思路写出来，而且写得这么透，这对整个行业的价值更大。

我甚至觉得，大多数团队在 2026 年做 Agent 系统，最大的坑不是 prompt 写不好，不是模型不够强。是架构设计没想清楚。把推理和执行绑死在一个进程里，demo 跑得飞起，上线就是灾难。

可能有些想法还不成熟，但我的直觉是，session/harness/sandbox 这个三层解耦会成为 Agent 架构的某种共识。不一定是 Anthropic 的实现，但这个拆法，一定会被反复验证。

回到开头那句话，"我们对接口的形状有态度，对接口背后跑什么没态度。"

操作系统就是这么干的。好的抽象不限制创新，它释放创新。Agent 系统也该如此。

## 行动建议

如果你现在正在搭 Agent 系统，不管用什么框架，先问自己三个问题。推理和执行是不是在同一个进程？状态能不能独立于容器存活？容器挂了你的 Agent 能不能接着跑？

三个问题有一个答案是"不能"，就值得读一下这篇工程博客。

## 相关链接

- [Anthropic 工程博客原文 - Scaling Managed Agents](https://www.anthropic.com/engineering/managed-agents)
- [Claude Managed Agents 产品页](https://claude.com/blog/claude-managed-agents)
- [Hacker News 讨论](https://news.ycombinator.com/item?id=47693047)
