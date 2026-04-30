# 智谱 z.ai 公开 GLM-5 大规模部署 retro，coding agent serving 翻车的几个具体瞬间

国内大模型公司主动写线上事故复盘的，我印象里这是第一次。不是发布会自吹，是"我们的模型在生产环境真的输出过乱码，原因是 KV Cache 被另一个请求的 RDMA 写覆盖了"这种级别的事后透明化。

智谱昨天在 z.ai 挂了一篇 Scaling Pain，把过去几周 GLM-5 在 coding agent 高并发下的三个底层 bug 和一个吞吐优化全摊开。我做过几年大模型 serving，从头读完后背一阵发凉，里面每个坑都知道是怎么踩进去的。

## 异常长什么样

三月开始，GLM-5 线上出现三类异常，乱码、复读、生僻字。听起来像长上下文降智，但智谱没上任何降精度优化。难受的是标准环境复现不出来，本地同一个 bad case 跑几百次都不出。

我以前遇到过这种情况，大概率不是模型权重的事，是基础设施。模型 bug 通常稳定可复现、跟输入相关。这边反过来，跟系统压力强相关、跟请求内容无关。

智谱先把线上日志脱敏全量回放，还是不出。继续调 PD 分离比例，把 Prefill 堆积和 Decode 侧 KV Cache 压力顶到峰值，才在每万次请求里稳定出 3-5 次异常。

万分之三到万分之五，对一个每天扛数亿次 coding agent 调用的服务来说，就是每天几万到十几万次脏输出。

## 监控这事本身就先卡住了

复读好查，正则就行。乱码和生僻字真难，启发式漏判误伤严重，模型判别器跑大规模消融吃不消。

智谱最后的切入点很妙，**用投机采样（Speculative Decoding）的指标反向监测异常**。draft model 先生成候选 token，target model 验证，两个指标在异常发生时模式特别稳定，

- `spec_accept_length` 极低，草稿模型的候选 token 几乎全被目标模型拒，两边 KV Cache 对不上。
- `spec_accept_rate` 极高，损坏的 KV Cache 把 attention 推进高置信度重复循环，draft 反而蒙得很准。

拦截策略，序列超过 128 tokens 后，`spec_accept_length` 低于 1.4 或 `spec_accept_rate` 超过 0.96，主动 kill 重试。

把性能优化指标当质量监控用，这个 idea 我之前真没想到过。监控习惯停在 perplexity、output entropy 这些层面，spec decoding 天然带"两个模型互相比对"的属性，做异常检测特别合适。

## 翻车现场一，PD 分离下的 KV Cache 复用竞态

这段是我读完最有共鸣的，完全 SRE 视角能想象的剧本。

PD 分离里 Prefill 和 Decode 在不同节点跑。智谱引擎有个超时 abort，Prefill 超过预算还没完，Decode 就杀掉请求回收 KV Cache 槽位，听起来很合理，要控尾延迟。

问题是，**abort 信号没正确传回 Prefill 那边**。

时间线，

1. Req1 进 Prefill-1，排队等 GPU，没立刻开始算。
2. Decode 等 KV 数据等到超时，把 Req1 abort 掉，槽位标记可复用。
3. Req2 进来，分到 Prefill-2 + Decode，正好分到 Req1 之前那块 KV Cache 地址。
4. Prefill-2 给 Req2 算 KV，Decode 拿到数据开始 decode。
5. **就在这时候，Prefill-1 之前给 Req1 发的 RDMA 写入还在飞**，目标地址正好是已分给 Req2 的那块显存。
6. Req2 的 KV Cache 被 Req1 的脏数据覆写了一部分。

Decode 读到被污染的 KV，输出乱码。

这个 bug 恶心在跟代码逻辑无关，跟时序有关。abort 了就回收，逻辑没问题，但 RDMA 异步通信跟显存复用之间没建立 happens-before 关系，飞行中的写入会跨过本不该跨的边界。

修复加同步握手。Decode 发 abort 后通知 Prefill，Prefill 只在两种情况下回 safe-to-reclaim，一是没发起 RDMA 写，二是已发的写全部落盘。

异常率从 0.1% 降到 0.03% 以下。

一个看起来很合理的超时回收机制，引发了千分之一级别的脏输出。这个坑值得国内所有跑 PD 分离的团队自查一遍，**RDMA 写入完成跟内存复用之间到底有没有显式同步点**。

## 翻车现场二，HiCache 的 read-before-ready

第二个 bug 在 HiCache（分层 KV 缓存）。coding agent 输入平均超过 70K tokens，前缀重用率非常高，分层缓存几乎是必须的优化。

智谱的实现把历史前缀缓存放在 CPU 内存，运行时异步换入 GPU，跟前向计算用两个独立 stream 重叠。Load Stream 搬数据，Forward Stream 跑 indexer 和稀疏 attention。

理想下 Forward Stream 应该等 Load Stream 把 indexer cache 搬完再算。**实际这个依赖在原始实现里没显式声明**。Forward Stream 早于 Load Stream 启动 indexer kernel，读到没初始化的 KV Cache，最终输出乱码。

修复也是加同步点。智谱把 fix 提了 PR 给 SGLang 社区（PR #22811）。

教训，**只要在 CUDA 上用了多 stream，就要当心 ordering**。两个 stream 之间只要有数据依赖，必须显式表达成 stream sync 或 event。CUDA 不会替你猜。

## 一个真正的优化，LayerSplit

bug 修完后，智谱回头处理 coding agent 场景下真正的吞吐瓶颈，Prefill。

生产里用 Context Parallelism，SGLang 开源版 KV Cache 在每个 rank 上完整复制，显存压力很大。LayerSplit 思路简单，**每个 GPU 只存部分层的 KV Cache**，前向时持有某层的 rank 广播给其他 rank。智谱把广播跟 indexer 计算 overlap，剩下暴露的 indexer cache 广播只有 KV Cache 八分之一大小，几乎可以忽略。

效果，

> 90% 缓存命中率、请求长度 40K-120K tokens 下，吞吐提升 10%-132%。上下文越长收益越大。

132% 这个上限正好对应国内 coding agent 真实负载的形状，长上下文 + 高前缀命中。

## 社区怎么看

Hacker News 上有人说，spec decoding 当异常监控用是个新思路，欧美厂商之前更多是事后做 output 分类器。也有人说这种 race condition 论文里都写不出来，必须"亿级请求 + PD 分离 + 长上下文"全凑齐才能踩到。

知乎"大模型部署"话题下有几个做 SGLang 二开的同学在讨论那个 PR，说自己部署里也遇到过偶发乱码，复现不出来一直归因到"模型不稳定"。**这个 retro 帮国内一批团队定位了悬案**。

智谱社区里有用户问，GLM-5 之前被吐槽降智会不会就是这个 bug。官方没正面回，但从时间线看可能性很大。

## 我的判断

第一，**国内大模型公司里，智谱这次主动写线上事故 retro 开了个不错的头**。Anthropic 和 OpenAI 偶尔写 incident report，但深入到 KV Cache race condition 这种代码级别的，业内不多。把 SGLang PR 也贴出来，是真的把社区当队友。

第二，**coding agent serving 比普通 chat serving 难一个数量级**。chat 一次几千 token，coding agent 平均输入 70K+，每个环节都被推到极限，chat 的推理引擎假设全部站不住。国内大部分团队还在按 chat 的负载形状做能力规划，这个 gap 一两年内会很明显。

第三，**性能优化和正确性的边界比想象中更模糊**。投机采样、HiCache、PD 分离都是为了快，但都引入了新同步点。漏一个，表现成的不是"慢"是"输出乱码"，这是最难调的那种 bug。

## 你可以做的事

如果你在做 LLM 推理基础设施，

1. 把 z.ai 这篇 Scaling Pain 全文读一遍，对着自己的 PD 分离架构画一画 abort 路径。
2. 检查所有 multi-stream overlap 的地方，确认 stream sync 显式声明了。
3. 用 SGLang 的话跟一下 PR #22811。

scaling law 推能力往前走，工程把能力变成可靠的服务，这中间隔着的就是这些没人愿意写、但写出来全行业都受益的 retro。

## 相关链接

- 智谱 Scaling Pain 原文，https://z.ai/blog/scaling-pain
- SGLang HiCache 修复 PR #22811，https://github.com/sgl-project/sglang/pull/22811
- Lobsters 讨论，https://lobste.rs/s/ai

---
相关实体:: [[zhipu|智谱]] | [[glm-5|GLM-5]] | [[z-ai|z.ai]]
相关主题:: 国产AI生态 | [[agent-frameworks|Agent 框架]] | [[ai-research|AI 研究]] | DevOps

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
