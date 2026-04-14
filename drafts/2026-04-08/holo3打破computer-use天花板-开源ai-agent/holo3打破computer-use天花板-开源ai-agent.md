# 10B 参数干翻 GPT 5.4？Holo3 说操控电脑这件事，不需要大模型

OSWorld 基准测试 78.85%，一个你可能没听过的公司，用 10B 激活参数做到了 Computer Use 的新纪录。

我第一反应是不信的。

H Company，一家通过 NVIDIA Inception 计划孵化的公司，上周在 Hugging Face 上开源了 Holo3-35B-A3B。这个模型号称能自主操控桌面软件，完成跨应用的复杂工作流，比如从 PDF 里提取设备报价，交叉比对员工预算，然后自动发送审批邮件。

听起来像是 Anthropic Computer Use 和 OpenAI Operator 的竞品，但有一个关键区别，它是 Apache 2.0 开源的。

## 技术方案拆一下

Holo3 建立在 Qwen3.5 架构上，总参数 122B，但只有 10B 是激活的，这是一个典型的 MoE（混合专家）设计。跟 Claude 或 GPT 这种全参数激活的大模型比，推理成本低了一个数量级。

训练方法上，H Company 提出了一个叫"Agentic Learning Flywheel"的三段式流程。

第一步，用人工和生成指令制造合成导航数据。第二步，用编程方式扩展到模型没见过的场景。第三步，用强化学习做数据筛选和样本优化。

坦率讲，这套路不新鲜。但他们有一个比较有意思的东西叫 Synthetic Environment Factory，用编码代理自动生成企业级软件的仿真环境，每个任务都有端到端的验证脚本。这解决了 Computer Use 领域最头疼的问题，训练数据从哪来。

你想想看，Claude Computer Use 的训练数据很大程度上依赖人工标注，成本极高。Holo3 用合成环境批量造数据，这条路如果走通了，后续迭代速度会很快。

## Holotron-12B，更值得关注的可能是这个

Holo3 抢了标题，但我觉得 Holotron-12B 这个模型在工程上更有意思。

它基于 NVIDIA 的 Nemotron-Nano-12B 做微调，关键创新在于用了混合 SSM（状态空间模型）+ 注意力机制的架构，不是纯 Transformer。

那结果呢？它不需要传统的 KV Cache。

传统 Transformer 做推理时，每一层每个 token 都要存储键值对，上下文越长，显存占用越大。SSM 每层只需要存一个固定大小的状态，内存占用跟序列长度几乎无关。

实测数据，单张 H100 上跑 vLLM，Holotron-12B 峰值吞吐 8900 tokens/s，是上一代 Holo2-8B 的两倍。100 个并发 worker 的时候吞吐还在线性增长，而 Holo2 早就开始掉速了。

WebVoyager 基准上，Nemotron 基座模型只有 35.1%，Holotron-12B 微调后直接拉到 80.5%。45 个百分点的提升，基本上等于把一个"能看屏幕但不知道该干嘛"的模型，变成了一个"知道点哪里、输什么"的执行者。

## 社区里的声音

社区对这组数据的态度分化挺大的。

看好的一派认为，开源 Computer Use 模型终于有了能打的选手。之前这个领域基本被 Anthropic 和 OpenAI 垄断，企业想用 Computer Use 能力就得接受 API 定价和数据经过第三方的事实。Holo3 开源 + 低成本推理，对有私有化部署需求的团队来说是个真正的选项。

质疑的声音也不少。78.85% 的 OSWorld 成绩是在 verified 子集上跑的，这个子集的任务分布和难度跟完整基准有差距。而且 H Company 自己搞了一套 486 个任务的内部基准，这种"既当裁判又当选手"的评测方式，说服力打了折扣。

还有人指出，Holo3 在单应用场景表现强，但多应用跨系统的真实企业场景下，稳定性和容错能力还没有足够的第三方验证。

## 我的判断

我认为 Holo3 在 Computer Use 赛道的意义，不在于它"打败了谁"，而在于它证明了一件事，10B 激活参数就足够做好桌面操控。

这个结论如果成立，影响是深远的。Computer Use 不再是大模型厂商的专属能力，任何有 GPU 资源的团队都可以跑起来。

但我也得说，我对"78.85% SOTA"这个说法持保留态度。Computer Use 的真正难度不在基准测试里，在于真实环境的混乱，弹窗、加载延迟、UI 变更、网络抖动。目前没有任何基准能完整覆盖这些场景。

可能有些想法还不成熟，但我觉得 Holotron-12B 的 SSM 架构比 Holo3 本身更值得追踪。如果混合 SSM 在 Agent 场景被验证可行，它可能改变整个推理基础设施的选型逻辑，从"用多大的 GPU 集群跑 Transformer"变成"用多小的资源跑 SSM"。

H Company 已经预告了下一步，在 Nemotron 3 Omni（MoE + 增强 SSM）上做后训练。这条路线如果走通，企业级自主 Agent 部署的门槛会大幅降低。

开头我说第一反应是不信。跑完这些数据后，我的态度变成了，谨慎关注，等第三方复现。

你准备在自己的业务场景里试试 Computer Use 了吗？

## 相关链接

- Holo3 模型仓库 https://huggingface.co/Hcompany/Holo3-35B-A3B
- Holo3 技术博客 https://huggingface.co/blog/Hcompany/holo3
- Holotron-12B 技术博客 https://huggingface.co/blog/Hcompany/holotron-12b
- H Company API（含免费额度）https://hcompany.ai/holo-models-api

---
相关实体:: [[anthropic|Anthropic]] | [[openai|OpenAI]]
相关主题:: [[agent-frameworks|Agent框架]]
