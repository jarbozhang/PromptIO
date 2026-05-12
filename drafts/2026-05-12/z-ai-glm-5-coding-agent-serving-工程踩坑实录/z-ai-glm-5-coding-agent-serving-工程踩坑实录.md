# 智谱 GLM-5 Coding Agent 大规模 serving 的工程踩坑，他们居然写出来了

刷 Lobsters 的时候看到 z.ai 官博一篇标题就把人扎醒，《Scaling Pain of Coding Agent Serving: Lessons from Debugging GLM-5 at Scale》。

我点进去之前心里是有预期的。国内大厂写 infra 故障复盘，绝大多数停在"我们遇到挑战、我们克服困难、我们继续前进"这种公关稿水平。能把生产事故拆到时序图、把锅指给自己代码、还把 PR 链接挂出来的，国内一只手数得过来。结果智谱这次是真的写了。

而且写的就是我们这种做推理工程的人最想看的那种东西，高并发长上下文 Coding Agent 负载下，KV Cache 一致性在哪几个地方裂开了。

## 先把背景钉死

智谱 GLM-5 系列在 3 月开始在线上观察到三类异常输出，**garbled output（乱码）**、**repetition（重复）**、**rare-character generation（罕见字符）**。这三个症状一上来就有迷惑性，长上下文场景下的"质量下降"长得就是这样，很多人第一反应是模型本身退化了。

智谱团队的第一步反应很关键。他们没有上来调精度、没有动模型，先回答了一个更基础的问题，**这到底是模型的问题还是 infra 的问题。**

判断方法也朴素，模型问题在固定输入下应该稳定复现，infra 问题大概率跟系统压力相关。他们把用户报告的 bad case 抓回本地跑了几百次都没复现出来。然后做了第二步，把生产日志脱敏后保留并发分布和请求时序回放，仍然没出。直到他们手动调整 prefill-decode 分离比例、压到 Prefill 积压 + Decode 端 KV Cache 紧张的高压态，这下出来了。**异常率每万次大概 3 到 5 次**，且与请求内容无关、只与系统压力强相关。

到这一步定性已经清楚，这是高并发推理基础设施里的状态管理 bug，不是模型问题。

## 第一个救命的小工具，用投机解码做异常检测

后面有个让我读完想拍桌子的细节。

异常输出本身很难自动检测。重复还好识别，乱码和罕见字符用正则会有大量误报，用模型分类器又跑不起 ablation。这是个不大不小的卡点，但卡的位置很要命，你连"现在有没有异常"都不能稳定检测，根本没办法做对照实验。

智谱团队的破法是把**投机解码（speculative decoding）**的指标拿来当异常信号用。

投机解码本来是个性能优化，draft 模型先猜几个 token，target 模型验证决定是否接受，加速解码。但他们在事故现场发现两个指标跟异常类型有非常稳定的对应关系，

- **乱码 / 罕见字符**，`spec_accept_length` 极低，意味着 draft 模型给的候选几乎全被 target 拒掉。背后是 target 模型的 KV Cache 状态和 draft 模型严重不一致。
- **重复**，`spec_accept_rate` 极高。KV Cache 损坏后 attention 模式退化成一个高置信度的循环。

于是他们直接上线策略，生成超过 128 token 后，如果 `spec_accept_length` 持续低于 1.4 或 `spec_accept_rate` 超过 0.96，主动终止生成，把请求扔回 load balancer 重试。

一个原本只用来加速的优化，被改造成了在线质量监控信号。这是教科书级的工程师思路，**把已经在系统里的、低成本的、副产品级别的信号拿来兜底**，比新加一个分类器优雅得多。

## Bug #1，PD 分离架构下的 KV Cache 重用竞态

第一个坑出在 Prefill-Decode 分离架构。

为了控尾延迟，他们的推理引擎有个超时机制，如果 Prefill 阶段没在预算时间内完成，Decode 端就 abort 请求、回收已分配的 KV Cache。

问题是这个 abort 信号没正确传回 Prefill 端。Decode 端这边 abort 完把 KV Cache 槽位回收给新请求用了，**Prefill 端那边之前发起的 RDMA 写还在飞**。完整时序大概是这样，

1. 请求 Req1 分到 Prefill-1（P1）和 Decode（D）。P1 排队等待，Prefill forward 还没启动；
2. D 端等 KV Cache 等到超时，触发 abort，回收 Req1 的槽位；
3. 新请求 Req2 来了，分到 Prefill-2（P2）和 D。**因为内存复用，Req2 拿到了 Req1 用过的同一片 KV Cache 地址**；
4. P2 完成 Prefill 和 KV 传输，D 开始解码 Req2；
5. **这时候 P1 之前为 Req1 发起的那批 RDMA 写终于落地**，写到的物理地址正好是已经被分配给 Req2 的那块。Req2 的 KV Cache 被覆盖了一部分；
6. Req2 解码时读到损坏的 KV Cache，输出异常。

修复方案就是在两个阶段之间加显式同步，abort 后 Decode 给 Prefill 发通知，Prefill 端必须满足"没有发起过 RDMA 写"或"所有已发起的写都完成了"才回个 safe-to-reclaim 信号，Decode 才能复用。

修完之后**异常率从约 0.1% 降到 0.03% 以下**。

这个 bug 让我想到的不只是修复方案本身。它揭示了**任何引入了内存复用 + 跨节点异步写的架构都需要明确的时序约束**。PD 分离不是免费午餐，跨节点 KV Cache 传输跟内存回收之间的一致性边界必须有人去画清楚。这一点放进推理工程师的知识库，对所有走 PD 分离路线的国产推理引擎都有价值。

## Bug #2，HiCache 里的 Load-Use 顺序丢失

第二个坑出在 HiCache，分层 KV 缓存。Coding Agent 负载的输入平均超过 70K token，prefix 复用率高，HiCache 几乎是必备优化。

但智谱发现 DSA-based HiCache 的实现里 cache 读路径有个隐患。系统会异步把历史 prefix cache 从 CPU swap 回 GPU，**Load Stream 和 Forward Stream 并行**以重叠 IO 和计算。理想情况下 Forward Stream 里的 Indexer 计算应该等 Indexer cache 加载完才开始，**但这个依赖没有显式建模**。

结果就是 Forward Stream 在 Load Stream 还没把数据搬完的时候就开干，**读到未就绪的 KV Cache**，indexer 计算操作在不完整或未初始化的数据上，错误一路传播到 sparse attention，最终输出异常。

修复方案是在 Indexer kernel 启动前插入一个跟 Load Stream 的同步点，保证对应层的 Indexer cache 已经完全加载完才推进计算。

这个修复**已经 PR 给 SGLang 社区**了（#22811）。一家公司在生产里踩到坑，把修复回馈给上游开源项目，这才是国产 AI infra 生态该有的样子。

## 优化，LayerSplit，把 KV Cache 按层切

前两个 bug 修完，他们没收手，又顺着这条线往前推了一步。

观察到的现象是，Coding Agent 负载在长上下文 + 高 prefix 命中率下，**Prefill 阶段成了系统瓶颈**。Context Parallelism（CP）是 Prefill 节点的主流并行策略，但 SGLang 当前开源实现存在 KV Cache 冗余存储，GPU 利用率被显存容量卡死。

LayerSplit 的思路是，**每个 GPU 不再存所有层的 KV Cache，只存其中一部分层**。执行时不同 CP rank 协同 Prefill，拥有某层 KV Cache 的 rank 在 attention 计算前把这层广播给其他 rank。为了藏掉通信开销，他们让 KV Cache 广播和 indexer 计算重叠。最终额外通信只剩 indexer cache 广播，**这部分大小约为 KV Cache 的 1/8，可以忽略**。

实测在 90% cache 命中率、请求长度 40K 到 120K 区间下，**吞吐提升 10% 到 132%**，且上下文越长收益越大。

## 跟 Datawhale 那本 hello-agents 放在一起读

巧合的是这周还有另一篇国产 agent 内容也在 trending，Datawhale 的《从零开始构建智能体》。教程把 agent 拆给新人入门看，覆盖 ReAct、Plan-and-Execute、MCP、A2A 这些 2026 年的概念。

这两份内容看起来完全没关系，一个教 agent 怎么搭，一个讲 agent serving 在生产里怎么炸。

但放一块读才完整。Datawhale 那本告诉你 agent 系统由哪些部件拼起来；智谱这篇告诉你**当这些部件每天要服务上亿次 Coding Agent 请求时，会在哪几个最不显眼的角落里裂开**。前者是手册，后者是事故录。

国内做 Coding Agent 的团队越来越多，写代码的 agent 一旦上量，PD 分离、HiCache、长上下文 KV 管理就全是必修课。这种生产事故复盘文档过去要去 OpenAI、Anthropic 的 blog 翻，要么去 SGLang、vLLM 的 issue 区考古。智谱这次主动写出来，等于把国产推理工程师的知识库补上了重要一块。

## 我的判断

这篇 blog 的真正价值不在三个 bug 本身，而在三件事。

**第一，它把 Coding Agent 推理跟普通对话推理的差异讲到了系统层。** 平均输入 70K token、prefix 复用率高、并发上亿次/天，这三个条件叠起来，所有"反正不太常发生"的竞态都会被压出来。任何想做 Coding Agent serving 的团队都该读这篇当起跑线。

**第二，它把投机解码当异常监控信号用这个技巧白给了。** 这个套路推广开来不止用在 KV Cache 一致性检测上。任何在生产系统里已经存在的"模型自我验证"信号，都可以反过来当质量监控用。Inference engineer 看完会有不少新想法。

**第三，它把修复 PR 提给了 SGLang 上游。** 国产大厂以前对开源社区是"我能用就行"，这次智谱明确把改动回馈给 SGLang，这种姿态对生态健康度的意义远超技术细节本身。

要泼一点冷水的话也有。文中给的数据点（异常率 0.1% → 0.03%、吞吐 +10% 到 +132%）都是智谱自己的口径，没有第三方复现。LayerSplit 这种比较大的架构改动有没有上游 PR、其他场景会不会引入新瓶颈，文章也没回答。

但作为一篇生产事故复盘，**信息密度已经远高于国内同行的平均水平**。建议做 LLM serving 的同行今晚把它读一遍，对照自己的推理栈过一遍 KV Cache 跨阶段一致性那一段，看看自己有没有同款雷。

最后留个钩子，blog 致谢里出现了 XCORESIGMA 和中科院计算所 SKLP。智谱这次事故复盘的合作对象是国家实验室级别的体系结构团队，背后那条产学研合作链条值得单独写一篇。

## 相关链接

- 原文 blog，https://z.ai/blog/scaling-pain
- SGLang PR #22811，https://github.com/sgl-project/sglang/pull/22811
- Datawhale hello-agents（对照阅读），https://github.com/datawhalechina/hello-agents

---
相关实体:: [[zhipu|智谱]] | [[z-ai|z.ai]]
相关主题:: [[chinese-ai|国产 AI]] | [[ai-research|AI 研究]]

<!-- REACH: 9/10 | 品牌✓ 利益点✗ 可操作✗（深度技术，开发者向） -->
