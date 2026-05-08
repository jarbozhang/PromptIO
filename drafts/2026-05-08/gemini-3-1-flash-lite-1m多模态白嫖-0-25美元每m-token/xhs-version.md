# Gemini 3.1 Flash Lite 静悄悄 GA，1M 多模态档位被打到 $0.25/M

## 这事为什么值得停下来看

5 月 7 日 Google 把 Gemini 3.1 Flash Lite 推到 GA，第二天 OpenRouter 就接进了路由列表。没有发布会，没有热搜，模型卡里只写了一行「high-efficiency multimodal model optimized for low-latency, high-volume workloads」。

但三个参数摆一起，事情就变样了，

- 价格，$0.25 / 1M prompt tokens，$1.50 / 1M completion tokens
- 上下文，1,048,576 tokens（1M context）
- 输入模态，text + image + video + audio + file（PDF 直接喂）

这是一条以前不存在的价格档位线。$0.25/M 这个数字过去只在「纯文本 + 8K~32K context + 中文小模型」上见过，1M context + 全模态输入这一档过去标价基本卡在 $1~$3/M 起步。Google 这次直接把多模态「入门价」打到了文本小模型的水平线。

## 把这条价格档位放进现有梯度看

OpenRouter 上目前的主流价格梯度大致是这样的，

| 价格档位 (input) | 代表模型类型 | 上下文 / 模态 |
| --- | --- | --- |
| $0.1 ~ $0.3 / M | DeepSeek V4 系列、Qwen Flash | 多为文本 only，128K~256K |
| $0.2 ~ $0.5 / M | **Gemini 3.1 Flash Lite** | **1M + 多模态全输入** |
| $0.5 ~ $2 / M | Claude Haiku、GPT-5.5 mini、Gemini Flash 主线 | 200K~1M，多数支持图像 |
| $2 ~ $5 / M | Claude Sonnet、GPT-5.5 主线、Gemini 3 Flash | 200K+，主线多模态 |

Flash Lite 砸在第一梯队和第二梯队中间的真空带，价格只比国产纯文本小模型贵一点点，模态完整度直接顶到了主线水平。模型卡里那句「Priced at half the cost of Gemini 3 Flash」是关键，Google 内部把 Flash 主线和 Lite 主线明确做成 2:1 的价格梯度，告诉调用方，任务不需要复杂推理就下移一档，便宜一半，模态不少。

## 视频被算进 prompt token，这件事第一次进入"可批量"档

模型卡里写的输入模态是 text + image + file + audio + video → text。其中视频被算进 prompt token 一直是 Gemini 系列的标志，但前几代价格都偏高，跑视频很快就把额度烧完。Flash Lite 把这一档拉到 $0.25/M，第一次让"视频喂模型"从 demo 级变成可以跑批量的成本结构。

还有个值得拎出来的细节，Flash Lite 支持完整的 thinking levels（minimal / low / medium / high）。一个 model id 里通过开关切换"省钱模式"和"动脑模式"，对 agent 路由层很务实，不用维护两个 id，prompt 里加个参数就动态降级。

## 社区反馈

Reddit r/GeminiAI 上那条 GA 公告 90 赞 27 评论，热度不算高，但评论方向集中，

- 多数开发者第一反应去对照 Gemini 2.5 Flash Lite，关心同类任务延迟和成本能不能整体砍一半
- 有人提到 cold start 比 2.5 时代明显低，配合 1M context 跑长 PDF 总结，时延体感更接近一般的 Sonnet API
- GA 版相比 preview 输出风格"更克制了一点"，长 thinking 模式下不再大段铺陈

整体看，这次 GA 的传播热度远不如同期 Gemini 3 主线模型，但开发者圈里那批以"刷 OpenRouter 模型列表"为日常的人是第一时间跑去测了。

## 我的判断

这步动作不是产品发布，是一次价格档位的重定义。过去 OpenRouter 多模态梯度有个清晰认知，「多模态 = 贵，便宜的多模态 = 阉割版」。Flash Lite 把这条认知打掉了，便宜、多模态、1M context、GA 稳定，四件事被打包到了同一个 SKU 里。

压力是不对称的，

- 对国产多模态最直接。纯文本小模型守在 $0.1~$0.3/M 没事，但谁要做"图文 / 视频 / PDF 输入 + 1M context"这种场景，从 Qwen-VL、智谱 GLM-4V 到豆包视觉，定价压力会很真实。下一轮国产多模态调价可能比想象中早。
- 对 Anthropic 是慢性压力。Claude Haiku 现在是「便宜、快、文本主导、有限图像」，价格档位高于 Flash Lite，模态覆盖也窄一档。短期 Haiku 用户不会迁移，但 OpenRouter 上「成本敏感型轻量任务」的默认路由会开始飘向 Gemini 一侧。

中期看，「multimodal-as-default」会从口号变成账单事实。开发者做架构选型时不再需要先问"我能不能不用多模态省钱"，而是默认按多模态写 prompt，因为不再贵。

## 怎么动手试

国内用户可以通过 OpenRouter / 镜像服务使用，本文不展开。

试模型最快的路径是改一行 model id，如果已有跑 OpenAI 兼容 API 的代码，把 model id 换成 `google/gemini-3.1-flash-lite`，先用一段长 PDF 或一段 5 分钟视频试一次，体验 1M context 多模态的延迟和质量再决定要不要切。

三个适配 Flash Lite 的高 ROI 场景，

- PDF 长文档摘要，把整本研报 / 财报 / 论文一次喂进 1M context，不用 chunk 不用 RAG，单次调用拿结论
- 视频 → 文本，产品演示、课程录屏直接喂模型，出操作步骤 / 课程笔记，配上 $0.25/M 第一次进入"可批量"区间
- 轻量 agent 路由层，thinking levels 切档让一个 model id 同时承接"快速分类"和"需要思考的工具调用"两种任务

不建议的用法，复杂代码生成、长链推理、对最终质量极敏感的对外内容，这些该上 Sonnet / Gemini 3 Flash 主线还是上。Flash Lite 不是替代品，是补位品。

最后一句务实的话，这个档位在 OpenRouter 上至少会安稳跑半年，不必抢着切。先在非核心链路上挂一条 Flash Lite 路由，跑 1~2 周看账单和质量，再决定要不要做成主路由。新的便宜档位每隔几个月就出现，但能稳态承接 1M context + 多模态的便宜档位，这是第一次。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
