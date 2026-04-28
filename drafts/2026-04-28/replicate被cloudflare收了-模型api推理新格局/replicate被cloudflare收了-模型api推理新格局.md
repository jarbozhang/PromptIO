# Replicate 被 Cloudflare 收编了，模型 API 推理价格还会便宜吗

如果你写过 AI 应用，多半在 Replicate 上跑过开源模型 ， 一行 API 调用，按秒计费的 GPU，不用自己部署 Stable Diffusion、不用养 H100。这家"开源模型 API 自助餐"现在被 Cloudflare 收了。**对开发者最直接的影响，未来一两年里，模型推理这件事会进一步往 CDN 边缘节点走，按次计费可能比按秒计费更便宜，但你能不能用上是另一回事。**

## 先把事讲清楚，到底合并了个啥

**Replicate 是什么。** 一家把开源模型包装成 HTTP API 的公司。你不需要懂 CUDA，扔一个 prompt 进去，几秒钟拿到 Flux 出图、Whisper 转写或者 LLaMA 推理结果。计费按秒走 GPU 时间，T4 是 $0.000225/s（合 $0.81/h），A100 80GB 是 $0.0014/s（$5.04/h），H100 是 $0.001525/s（$5.49/h），8 卡 H100 集群拉满 $43.92/h。LLM 走 token 计费，DeepSeek R1 在 Replicate 上是 $3.75 / 百万 input。

**Cloudflare Workers AI 是什么。** Cloudflare 自家的边缘推理服务，把 50+ 开源模型部署到全球 CDN 节点上，离用户最近的那个数据中心算。计费单位叫 Neuron ， "代表完成请求所需的 GPU 算力"，每 1000 Neurons 收 $0.011。每个账号每天免费送 10000 Neurons，过了再按用量算。Llama 3.1-8b 大概 $0.282/百万 input token，DeepSeek R1 $0.497/百万 input。

**两家合并后是什么模式。** 2025 年 11 月 17 日 Replicate 官博公告，加入 Cloudflare 开发者平台，Replicate 品牌保留、API 不变、已经部署的模型继续跑。创始人 Ben Firsh 一句话，「Cloudflare 是建 web app 的默认选项，我们要一起成为建 AI app 的默认选项。」金额没披露，是收购、并入、还是 acqui-hire 公告里也没说清楚。

**对手是谁。** 和 Replicate 一个生态位的还有 Together AI、Modal Labs、Fal.ai、Fireworks。这几家共同的产品形态是「我帮你托管开源模型，你按秒/按 token 付钱」。Cloudflare 这一手相当于把「模型市场 + 按秒计费」（Replicate 强项）和「全球边缘推理 + 一站式开发栈」（Workers + R2 + Durable Objects + D1 + Vectorize）拼起来。Together AI 主打超大集群训练 + 推理，Fal 押注图像/视频低延迟，Modal 偏向 Python 用户的 serverless 计算 ， 现在它们要面对的是一家把入口卡在 CDN 上的对手。

## 社区怎么看，兴奋、谨慎、外加一点点忧虑

并购公告刚出（2025 年 11 月），最近一个月（2026-03 到 2026-04）社交媒体上的讨论已经冷下来一波，但开发者圈子里几个声音值得记下，

- **正面派**，写 AI 应用的人最常用的两个工具栈终于拼到一起。原本你要在 Cloudflare Workers 里调 Replicate API 还要自己处理超时、重试、流式返回，现在大概率会出原生 binding，少写一层胶水代码。
- **谨慎派**，Cloudflare 历史上吃进去的项目质量不一。开发者最担心的不是产品消失，而是「Replicate 那种很 indie 的氛围」消失 ， 公开模型库、模型卡、社区分享的那套生态会不会变成更封闭的企业 SaaS。
- **价格派**，算了笔账。Workers AI 现在按 Neuron 计费，按 token 折算后比 Replicate 便宜不少（Llama 8b 一个数量级以内的差距），但只有 Cloudflare 自己挑的 50+ 个模型；Replicate 模型库是开放的，几千个模型谁都能上。如果合并后 Replicate 长尾模型也能享受 Workers AI 的边缘节点和价格，那是开发者的胜利；如果反过来 Replicate 涨到 Workers AI 的等级，那就是另一回事。

## 我的判断

**推理价格短期会更便宜，长期看分层。** 边缘推理说到底是把闲置 CDN 算力变现，单位算力成本天然比专门租 H100 集群低 ， 这就是 Cloudflare R2 能比 S3 便宜的同一套逻辑。短期你大概率会看到 Workers AI 把更多模型纳入按 Neuron 计费，长尾模型用按秒 GPU 计费的旧 Replicate 通道，两套并行。一两年之后会出现明显分层，高频小模型走边缘（便宜、毫秒级延迟），低频大模型继续走集中式 GPU（贵、但能跑得动 Flux/Sora 这种）。

**中国开发者用得上吗。** 这是要泼冷水的地方。Replicate 一直是国内可访问的（直连可用，但付款卡 Visa/Master），Workers AI 同理 ， Cloudflare 在中国大陆没有边缘节点，理论上的「边缘低延迟」对国内用户基本不成立，请求多半路由到日本、新加坡或者美西。所以「Cloudflare 收 Replicate 后中国用户体验会变好吗」答案是，**API 直连大概率不变，延迟改善有限，付款门槛仍在**。真要省钱省事，国内的硅基流动、火山方舟、零一万物的开放平台都能跑 DeepSeek/Qwen/GLM 系列，部分还有人民币计费 + 免费额度。

**对独立开发者的真实影响。** 如果你已经把生意建在 Replicate 上，短期不用动 ， API 不变、模型不下架。但要警惕一件事，Replicate 现在是 Cloudflare 生态的一个产品，未来路线图肯定向「跟 Workers/R2/Durable Objects 深度绑定」倾斜。你在别的云上调用 Replicate 的体验不会变差，但「在 Cloudflare 内调用」会变得显著更顺 ， 也就是说，未来 1-2 年新建项目，技术栈选型上 Cloudflare 全家桶 + Replicate 会是最舒服的组合，其他云会面临隐性的迁移压力。

## 行动建议

1. **现有 Replicate 用户**，先观望，不用迁。账单不会变、API 不会变。把这个公告记进季度 review，等 2026 年 Q2 看 Cloudflare 的整合公告。
2. **新项目选型**，如果你要写 AI 应用而且没绑定具体云，直接评估 Cloudflare Workers AI + Replicate 组合 ， 10000 Neurons/天的免费额度对小项目够用，付费档 $0.011/1000 Neurons 比同类便宜。
3. **需要在国内分发**，别指望 Cloudflare 的边缘加速。直接用国内推理平台，**硅基流动**（SiliconCloud，开源模型最全、新人有免费额度）、**火山方舟**（豆包系列原生 + 有 R1/Qwen3）、**零一万物开放平台**（Yi 系列优惠期）这三个是当前性价比最高的选项，人民币结算、不卡支付。
4. **看好这条线但担心绑定**，用 LiteLLM 或者 OpenRouter 做一层抽象，业务代码只调 OpenAI 兼容接口，后端供应商谁便宜切谁。Cloudflare 真要拉价格、收紧 API，你切 Together AI / Fireworks 的成本是分钟级。

收购本身不是新闻。但「全球最大 CDN 把开源模型 API 头部玩家收编」这件事，标志着推理这件事从「云厂商的 GPU 生意」开始往「CDN 厂商的边缘附加服务」转移 ， 接下来一两年，你会看到 Fastly、Akamai 跟进做类似的事，AWS 大概率被迫降价。开发者最赢的时刻通常不是新技术发布，而是巨头互相挤压利润的时候。这次就是。

---
相关实体:: Cloudflare（无 wikilink）| Replicate
相关主题:: [[ai-pricing|AI 定价]] | [[ai-mergers|AI 行业并购]] | [[agent-frameworks|Agent 框架与推理基础设施]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
