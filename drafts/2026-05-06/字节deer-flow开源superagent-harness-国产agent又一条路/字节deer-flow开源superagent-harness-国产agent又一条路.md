# 字节 deer-flow 开源 SuperAgent harness，国产 agent 又一条路

GitHub trending 5 月 6 日单日 +328 星，bytedance/deer-flow 这条线昨天还很安静。

定位写得直白，long-horizon SuperAgent harness，能做研究、能写代码、能造网页、能出幻灯片、能跑视频，单任务从分钟级横跨到小时级。这不是又一个 demo，是字节把内部工程结构推到外面给大家看。

先把架构骨架摆出来。六个组件，sandboxes / memories / tools / skill / subagents / message gateway，每个组件单独看都不算激进，但合起来基本覆盖了一个长程 agent 必须解决的工程问题。

## sandbox 是底座，三档隔离一直推到 K8s

deer-flow 把执行环境拆了三层。本地 LocalSandboxProvider 跑开发态，AioSandboxProvider 起 Docker 容器做隔离，再上一档直接调 provisioner 起 Kubernetes Pod。文件系统统一收敛到 /mnt/user-data 下面的 uploads / workspace / outputs 三个挂载点，主机 bash 默认禁用。

这一档对照下，OpenHands 长期停在容器级，Manus 在最近的 Meta 联合论文里被批评的也是隔离粒度。字节直接把 K8s Pod 写进了 provisioner，这是 ToB 视角，不是 demo 视角。

## memory 罕见做了跨会话持久化

业界大部分 agent harness 把 memory 当短期上下文。deer-flow 这里走的是另一条，本地存储、用户私有控制、跨会话保留偏好和工作流，去重逻辑专门防止事实重复堆积。

这是国产侧第一次有人把"长期记忆"在开源 harness 里做出来。openclaw 走的是知识库路线，hermes-agent 走的是策略权重路线，deer-flow 这一版本接近 ChatGPT memory 的工程化复刻，但放在了用户自己机器上。

## tools 走 MCP，但加了 OAuth

工具层不复杂，网页搜索、网页抓取、文件操作、bash 执行四件套打底，扩展机制走 MCP 服务器和 Python 函数两条路，HTTP / SSE 都支持。

差异点在 OAuth。client_credentials 和 refresh_token flow 都做了。所以呢接企业内部系统可以走标准认证链路，不用每个工具都重写一遍 token 管理。这是个不太显眼但很关键的细节，决定了它能不能进真实生产环境。

## skill 用 markdown 描述，渐进式加载

skill 这个组件名字容易和 Claude Code 的 skill 混淆，但思路其实一致。每个 skill 是一份 markdown，定义工作流、最佳实践、调用什么工具。内置的有研究、报告生成、幻灯片、网页、图像视频生成。

关键是渐进式加载。token 敏感的模型（比如开源端的 Qwen3、DeepSeek v3.2）不会被一上来全部 skill 描述塞爆 context，按需加载就好。还支持 .skill 归档文件导入，等于给社区开了个分发口子。

## subagents 才是真差异化

前面五个组件其他 harness 也或多或少有，subagents 这一块字节做了扇出 / 收束的并行调度。主 agent 可以同时起多个子 agent 探索不同方向，每个子 agent 拿到隔离的 context、独立的工具子集、独立的终止条件，跑完之后由主 agent 收结构化结果做综合。

这一档是 long-horizon 的关键。研究类任务最容易撞到的墙是 context 爆炸，子 agent 各自带一份精简上下文回来汇总，等于把"长程"拆成了"多个短程并行 + 一次汇总"。openclaw 365k 星的代码农场打的是工程化复制工程师本身，hermes-agent 12 万星打的是策略迭代闭环，deer-flow 这条线打的是科研型长任务的并行拆解。三条线方向完全不撞。

## message gateway 直接接微信和飞书

最务实的部分。Telegram、Slack、飞书 / Lark、企业微信、个人微信、钉钉，六个 IM 渠道全部开箱即用。微信用腾讯 iLink 长轮询，企业微信和钉钉走 WebSocket，飞书也是 WebSocket。

放到中国语境，这一条的价值比另外五个组件加起来都直观。Manus、OpenHands 都没这个能力。字节自己有飞书所以飞书接入第一档不奇怪，能把企业微信和个人微信都做了，这是看准了国内私域 agent 落地的真实入口。

## 模型矩阵看得出战略意图

默认推荐 Doubao-Seed-2.0-Code，火山引擎 Coding Plan 是官方推荐部署。开源端 DeepSeek v3.2 和 Qwen3 全系适配，vLLM 0.19.0 兼容推理模型的 thinking 字段。闭源端 GPT-5 和 Kimi 2.5 都在矩阵里，OpenRouter 通过 langchain_openai 接口直挂。

字节这一版本没有把模型选择写死。豆包是首选，但开源国产和海外闭源的路都留着。这个姿态比某些"必须用我家模型"的国产框架更可信。

## 为什么这条线值得单独立线

最近一个月本号写过的 agent 框架已经 36 篇。openclaw 是工程师工厂，hermes-agent 是策略闭环，Manus 是商业化样本（最近还出了反面案例），LangGraph 是底座框架。deer-flow 加进来不是为了凑数，它的差异点是清晰的。

第一，K8s 级 sandbox 隔离 + OAuth 工具认证，这是企业生产视角，不是个人 demo 视角。

第二，subagents 的并行扇出 / 收束机制是长程任务的真实解法，不是单链路堆 token。

第三，六个 IM 渠道直连，把"agent 能落到哪"这个问题从公网 API 拉到了私域消息流。

第四，跨会话 memory 在开源端做出来，国产侧第一份。

我的判断，deer-flow 不是 openclaw 或 hermes-agent 的替代品，它走的是另一条产线。如果你做的是企业内部研究助手、长程报告生成、私域客服增强，这一条线值得单独跟。如果你做的是代码生成或自主迭代，老路线还是更合适。

字节肯出这种级别的工程开源，本身是个信号，国产 agent 框架的开源密度已经追上来了。下一步看社区怎么把 K8s sandbox 和 subagents 这两个差异点真正用起来。

## 相关链接

- 仓库地址，https://github.com/bytedance/deer-flow
- 火山引擎 Coding Plan，官方推荐部署链路
- DeepSeek v3.2 / Qwen3 vLLM 适配文档，仓库 docs 目录

[[bytedance|字节跳动]] [[deer-flow|deer-flow]] [[doubao|豆包]] [[manus|Manus]] [[openclaw|openclaw]] [[hermes-agent|hermes-agent]]

主题，[[agent-frameworks|Agent 框架]] [[chinese-ai|国产 AI]] [[open-source|开源生态]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
