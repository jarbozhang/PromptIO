# Tracer-Cloud 把 OpenSRE 开源了，AI Agent 终于杀进 SRE 运维这条赛道

凌晨三点，告警群里飘出一条 P0，CPU 突刺，QPS 跳水，几个 SRE 揉着眼睛去翻 Grafana、跳到 Loki、又 kubectl 进 Pod 看日志。这套动作我相信干过运维的人都很熟悉，熟悉到肌肉记忆。

而 Tracer-Cloud 这周在 GitHub 上把这套肌肉记忆，喂给了一个叫 OpenSRE 的开源 Agent。一天 +247 stars，3000 多 stars 起步，Apache 2.0，Python 写的。这个时间点出现，我觉得不算偶然。

先说我为什么觉得它值得你停下来看一眼。

过去两年 Agent 框架一窝蜂涌出来，写代码的、刷推特的、订机票的、做 PPT 的，热闹归热闹，绝大多数都还停留在演示视频。SRE 这条赛道一直没什么响动，因为线上事故不是 demo，错一次就是真金白银。OpenSRE 是我见过第一个把"事故根因定位"当作正经 benchmark 来做的开源项目，作者甚至把自己的目标对标 SWE-bench，"SWE-bench 标准化了写代码 Agent 的评测，事故响应这块还没人做"。

这个 framing 我吃。

## 这套 Agent 到底干嘛的

把 OpenSRE 想象成一个 24 小时不眠的初级 SRE，告警一来它做五件事。

第一，吃告警上下文，Datadog 的 JSON、PagerDuty 的事件、k8s 的 event，都能进。第二，去关联证据，自动抓 Loki 的日志、Mimir 的指标、Tempo 的 trace，把同一时间窗的东西摆到一起。第三，调 LLM 推理，找异常，找可疑变更，给出一个或多个候选根因。第四，输出一份结构化报告，每个结论后面挂着对应的日志片段或指标曲线，叫"evidence-backed root cause"。第五，把结论丢回 Slack 或 PagerDuty，给值班人看。

这套流程其实就是把一个老 SRE 凌晨三点干的活，固化成了一个 LangGraph 编排的流程图。不取代人，但是把"翻日志、对时间线、列假设"这种最耗时间最没创造力的部分先跑一遍。

LLM 这层做得很克制，支持 Anthropic、OpenAI、Gemini、OpenRouter、Ollama、AWS Bedrock、NVIDIA NIM，bring your own model。这点对国内团队太重要了，后面我会说为什么。

## 装上跑一个看看

我在一台 Mac 上跑了一遍，过程比想象中干脆。

```
brew install Tracer-Cloud/opensre/opensre
opensre onboard
opensre investigate -i tests/e2e/kubernetes/fixtures/datadog_k8s_alert.json
```

`onboard` 是配 LLM provider，我直接挂了 OpenRouter 的 key，Claude Sonnet 当主推理模型。它会问你要不要接 PostgreSQL 和 Redis，不接也能跑单次 investigate，接了之后才支持长记忆和远程部署。

`investigate` 这条命令是核心，仓库里自带一份"k8s Pod CrashLoopBackOff"的 Datadog 告警 fixture，跑下来大概两三分钟出报告。报告分三段，时间线还原、候选根因、建议动作，每条后面都有原始证据链接。我跑出来的版本把根因指向 OOMKilled，虽然这个 fixture 比较"温柔"，但流程是通的。

踩了一个坑值得说，第一次跑的时候我没看清它默认开 Posthog 匿名遥测，团队场景里你最好提前关掉，文档里给了开关。CI 环境会自动禁用，但本地不会。

另一个坑是 PostgreSQL 和 Redis 的部署，本地玩玩可以 docker-compose 起两个容器，真要上生产，作者推荐 Railway 一键部署，不过 Railway 国内用起来不方便，自己起 k8s 也行，README 没给完整 helm chart，需要自己拼。

## 中国 SRE 团队能不能用

这是我最想聊的一块。

直说，不能照搬。OpenSRE 的设计假设是你的可观测栈跑在 Datadog、Grafana Cloud、Honeycomb、CloudWatch 这些海外 SaaS 上，国内团队大头还是阿里云 SLS、腾讯云 CLS、自建 Prometheus + Loki，外加一堆自研的告警平台。

但是我认为 OpenSRE 真正的价值不在于它原生接了哪些工具，而在于它把"AI Agent 做事故响应"这件事的工程模板写出来了。

具体可以这样切。

第一种用法，自建 Prometheus + Loki + Tempo 的团队，几乎可以零改造直接用，OpenSRE 对这三个工具的支持是一等公民，告警源换成你自己的 Alertmanager webhook 就行。我观察身边几家中等规模的互联网公司，可观测栈基本就是这个组合，对得上。

第二种用法，主用阿里云 SLS 或腾讯云 CLS 的团队，需要自己写一个 connector。OpenSRE 在 README 里强调了"60+ tool integrations"，但翻代码会发现这些 connector 的抽象层做得相当干净，照着 Datadog connector 抄一个 SLS 版本，估计两三天能跑通。这部分工作量看起来是负担，但你做完之后等于把全公司的 AI 运维能力建在了开源底座上，比从零写一个 LangGraph Agent 划算。

第三种用法，纯粹拿它当"事故复盘 Agent"，不接生产告警，只做事后分析。把历史事故的日志和指标数据丢进去，让它写复盘草稿，这个用法零风险，第一周就能见效。

LLM 选型上，国内团队我会推荐 DeepSeek 或者 Qwen3 系列。OpenSRE 通过 OpenRouter 都能直接调，反应速度和成本都比 Claude Sonnet 友好。日志推理这种任务对模型的"长上下文 + 结构化输出"要求高，DeepSeek-V4 在我自己跑过的几个复盘场景里表现意外地稳。

## 我的判断

我认为 SRE 这条赛道会比写代码 Agent 更早跑出真正的商业闭环。

理由很简单。写代码 Agent 的最终验收人是工程师本人，工程师天然挑剔，价值感知很主观。SRE Agent 的验收指标是 MTTR（平均故障恢复时间），这是个能精确到秒、能写进 SLA、能向 CFO 解释的硬指标。一个 Agent 把 MTTR 从 45 分钟压到 25 分钟，账算得清，没人会争。

但 OpenSRE 现在还很早期，Public Alpha 的标签作者自己挂在 README 里，意思是 API 还会变，别拿它跑核心生产告警。我个人的建议是先跑事后复盘，再跑非核心业务的告警分流，最后才考虑接 P0/P1。

还有一个我有点担心的点，AI Agent 给出的根因报告，如果值班人开始无脑信任，那就是新的 risk。reliability engineering 的灵魂之一是"healthy paranoia"，对系统永远保持怀疑。Agent 越好用，这个怀疑越容易被磨没。

这个问题没法用工具解决，只能靠流程，强制要求 Agent 报告必须经过人工 approve 才能触发自动恢复动作，别图省事开 auto-remediation。

凌晨三点的告警群，未来几年大概率会变安静，但变安静的代价是有人得在白天写更严格的规则、做更细的 runbook、维护这个 Agent。值班人少了，但运维工程师的地位反而会更重要。

你现在用什么栈做监控告警，愿不愿意把一个 LLM Agent 接到值班链路里，欢迎评论区聊聊。

## 相关链接

- OpenSRE 仓库, https://github.com/Tracer-Cloud/opensre
- 安装脚本, https://raw.githubusercontent.com/Tracer-Cloud/opensre/main/install.sh
- LangGraph 官方文档, https://langchain-ai.github.io/langgraph/
- SWE-bench, https://www.swebench.com/

---
相关实体:: Tracer-Cloud
相关主题:: [[agent-frameworks|Agent框架]] | DevOps

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
