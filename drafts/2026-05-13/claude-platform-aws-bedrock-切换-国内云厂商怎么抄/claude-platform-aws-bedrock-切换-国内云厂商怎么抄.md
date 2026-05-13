# Claude Platform 正式登陆 AWS，Anthropic SDK v0.101 直接对接 Bedrock，国内云厂商可以抄哪几步

5 月 11 号 Anthropic 官宣 Claude Platform on AWS 正式 GA，同日 `anthropic-sdk-python` 发了 v0.101.0，release notes 只有一行字，「Add AWS client for Claude Platform on AWS」，commit `1e70e3a`。Reddit 上 r/ClaudeAI 的官宣贴 154 赞、15 评，r/ClaudeCode 的拆解贴 score 14 上了周榜。

这件事容易被一句「Claude 又上了 AWS」轻轻翻篇。值得展开的是，它不是把 Claude 塞进 Bedrock 多一个 modelId，而是 AWS 把 Claude 从 Bedrock 子模块升格成了一个独立 Platform 产品线，挂在 AWS 账号下、走 IAM 和 CloudTrail，但调用的是 Claude 的原生 API。这对国内云厂商的「模型超市」叙事，是一次直接示范。

## 把这件事讲清楚

过去一年 AWS 卖 Claude 的方式是 Bedrock。开发者拿到的是 AWS 自己的 SDK `boto3`，调 `bedrock-runtime.invoke_model`，模型 ID 像 `anthropic.claude-3-5-sonnet-20241022-v2:0` 这样的 AWS 命名，body 是 AWS 包了一层的 Claude 入参。这种「平台帮你包模型 API」的方案对运维友好，对前沿能力不友好，Anthropic 每次更新到 Claude 原生 API 的新功能，要等 Bedrock 团队对齐一遍才能上。

Claude Platform on AWS 走了另一条路。Reddit 那篇 154 赞贴和 r/ClaudeCode 的 CC 2.1.139 changelog 里都有同一份要点。

第一，**入口是 Claude 的原生 API 加 Console**，不是 Bedrock。`anthropic-sdk-python` v0.101 加的 AWS client 直接挂在 `anthropic` 包下，写法跟 `Anthropic()` 同一套，只是换一个客户端类。

第二，**认证走 AWS SigV4 + IAM**。CC 2.1.139 的 release 文档里点了名，AnthropicAWS clients 需要 region 和 workspace 配置，用 SigV4 签名，再换一个 short-term API key 完成调用。意思是，你不需要在公司流程里申请第二个供应商的 long-lived API key，账号管理和审计直接复用 AWS 那一套。

第三，**计费、日志、合规都进 AWS**。账单是 AWS 一张，调用日志走 CloudTrail，已经签了的 AWS Enterprise Agreement 和 RI/SP 承诺消费可以直接抵扣。Reddit u/martin1744 那句 71 赞高赞，「your AWS bill just found a new line item」，话糙理不糙。

第四，**新模型同日可用**。这是 r/ClaudeCode 那篇拆解里被特意强调的一句，「Same-day access for new model releases」。这条直接打掉 Bedrock 路径的最大痛点，企业用户不再需要在「新模型出了能不能用」和「合规走 AWS」之间二选一。

第五，**Managed Agents、web search、code execution、prompt caching、citations、developer tools 全套带过来**。Anthropic 上周 v0.100 刚把 Managed Agents 进了 SDK，这周直接把整条产品线搬到 AWS 客户面前。

总结成一句，Bedrock 是「AWS 卖 Claude」，Claude Platform on AWS 是「Anthropic 把自己整套 Platform 寄存在 AWS 之上」。前者 AWS 是产品方，后者 AWS 退到基础设施层，Anthropic 自己当产品方。这是关系反转。

## 为什么 Anthropic 现在做这件事

我读到三层动机。

最浅一层，**前沿功能的产品节奏被 Bedrock 拖慢了**。Managed Agents、Skills、Code Execution 这些东西原生 API 都有，Bedrock 同步要时间，Anthropic 索性把整套 Platform 自己端过去。

中间一层，**抢企业渠道**。r/LLMDevs 4 月 28 号有篇 16 评热帖叫《The state of Claude API access is a mess》，作者团队对照了 Anthropic Direct、Bedrock、OpenRouter、Gateways 四条路。结论一句话，企业用户最大的摩擦不是模型不够好，是采购流程。Claude Platform on AWS 解决的是「采购流程走 AWS、能力走 Anthropic」。这是 Anthropic 抢在 OpenAI Azure 联营之前补的位。

最深一层，**Anthropic 想保持产品定义权**。Bedrock 模式下，模型 API 怎么演进 AWS 说了算。Platform on AWS 模式下，Anthropic 保留所有 API 设计、能力上线节奏、控制台体验，AWS 只贡献账号体系。这是 Anthropic 不愿意把自己 SaaS 化为「另一个 AWS 模型」的产品姿态。

## 国内云厂商可以抄哪几步

国内有同样关系的组合，至少这几对，火山引擎和豆包系大模型、阿里云和通义 / Qwen、腾讯云和混元、华为云和盘古、百度云和文心。不管哪一对，目前都还停留在「Bedrock 阶段」，云厂商自己包一层 modelId、用云原生 SDK 调用，模型方更新要靠云厂商对齐 release。

抄 Claude Platform on AWS 的姿势，我列五步。

**第一步，承认模型方应有独立 Console。** 现在的现状是，调豆包要进火山方舟，调 Qwen 要进百炼，调混元要进腾讯云 TI。模型方原生的产品界面被云控制台吞掉。Anthropic 这次坚持自己 Console 在前，AWS 在后。国内对照看，让模型团队保留一个独立 Console，云厂商只接管账号、计费、审计，是合理的演进。

**第二步，模型方原生 SDK，云厂商认证适配。** Anthropic 干的就是这件事，`anthropic-sdk-python` 自己长出一个 AWS client，复用主包大部分代码，只换认证和路由层。这比让阿里云 / 腾讯云去维护一份阉割版 SDK 更聪明，模型方的功能演进自动跟过来。国内对照看，Qwen 应当有自己的官方 SDK，云厂商负责接 STS 短期凭据，不是替 Qwen 写 SDK。

**第三步，短期凭据兑换，不要往用户身上塞第二个 long-lived API key。** SigV4 + short-term API key 这个机制是 Claude Platform on AWS 的关键工程动作。国内火山、阿里、腾讯都有自己的 STS，但都是给云资源用的，调模型还是要再申一个独立 API key。如果走 STS 兑模型 token，企业合规直接省掉一个秘钥管理对象。

**第四步，新模型同日可用作为承诺写进 SLA。** Anthropic 敢承诺「Same-day access」，是因为 Platform 自己说了算。国内云厂商和自家模型团队的协调，理论上比跨公司协调更顺，但实际上不少模型新版本在云市场上线要等一两周。把同日可用做成 KPI，是抄这次 GA 的硬条件。

**第五步，把企业关心的 RI / SP / EA 一次性打通。** AWS 这次最实在的卖点之一就是 Anthropic 的费用算进现有 AWS Enterprise Agreement。国内对照看，火山引擎已经在做大客户折扣集中结算，但豆包的合同主体和火山的资源合同主体不一定打通，阿里云 / 通义 / 钉钉之间也类似。这是合同层的细活，不做就会被「分账困难」拖住企业采购。

五步里，第二步和第三步是工程动作，国产云厂商三个月之内可以跟。第一步和第五步是组织和合同动作，需要内部博弈，慢一些。第四步是 SLA 承诺，做不做取决于产品老板敢不敢签。

## 社区在讨论什么

四条 Reddit 信号串起来，社区情绪比想象中冷静。

r/ClaudeAI 154 赞的官宣贴下面，最高赞评论是 u/martin1744 那句「AWS 账单多一行」，玩笑话，但点出了开发者第一眼看到的事实，钱包多了一个口袋。第二高赞在追问「我能不能用 Claude Code 而不用 Claude 账号」，答案是肯定的，Claude Code 已经支持通过 AWS workspace 直连。

r/ClaudeCode 那篇 CC 2.1.139 reference 帖把官方文档要点摘了出来，最值得抄的细节是「短期 API key + region + workspace」三件套，国内云厂商可以照抄这一套形态。

r/LLMDevs 那篇 Claude API 访问路径对照贴，作者列了四条路，「Anthropic Direct / Bedrock / OpenRouter / Gateways」，等于承认 Claude Platform on AWS 是给「想用 Anthropic Direct 但被 AWS 采购流程绑住」的那部分企业开的新口子。这条评论区有 16 个评论，没人质疑 Platform on AWS 的合理性，只在比较「我家用不用得上」。

r/tldrAI 那条转发说得最精炼，「giving AWS customers direct access to the full Claude platform with AWS authentication, billing, and account management」，三件事，认证、账单、账号管理。这三件事是国内云厂商和模型方分工时最常争吵的边界，Anthropic 和 AWS 这次把分工讲明白了。

## 我的判断

我认为这次 GA 的真正影响不在 Claude 业务本身，而在它示范了一种「模型方 × 云厂商」的新分工模板。

理由两条。一是模型方话语权显著抬升。过去模型方是渠道里的供货商，Bedrock 是橱窗。这次 Anthropic 拿到了橱窗的玻璃，AWS 退到收银台。二是企业采购从「调用模型」拆成了「调用平台」。模型本身一年涨一次价、降一次价、改一次能力，企业流程跟不动；但是平台是稳定的产品形态，Console / SDK / IAM 一旦绑定，模型怎么演进都是平台内的事。这一拆，企业把决策从「选哪个模型」抬到「选哪个平台」，模型方实际上拿到了一个更长的合约。

国内会不会出第一个 Claude-Platform-on-AWS 同构方案？我赌火山引擎和豆包先动。理由是字节这一对内部博弈比阿里云和通义、腾讯云和混元都要小，豆包又有产品老板敢签 SLA 的传统。阿里云和通义的对照会是「Qwen Platform on 阿里云」，工程上完全做得到，但要先解决通义和钉钉、夸克之间的产品边界。腾讯云和混元的对照最难，混元本身的 Console 形态还不完整，先得有 Console 才谈得上把它寄存到云上。

国内开发者短期内能动手的，反而不是国产对标。是把现有 Claude Bedrock 接入升级成 Claude Platform on AWS。如果你公司本来就在 AWS 上跑 Claude，旧的 Bedrock 路径继续可用，但新功能会从 Platform on AWS 这边先到。`pip install -U anthropic` 升到 v0.101 之后，import 一下新的 AWS client 类，确认 SigV4 + workspace 那一套能跑通，再决定是不是迁移。Anthropic 的迁移成本设计得比想象中低。

## 怎么动手

如果你在 AWS 上跑 Claude，今天就能做的最小路径。

```
pip install -U anthropic  # 升到 v0.101 以上
```

升上去后，看一眼 SDK 里新 AWS client 是不是在。

```
import anthropic
# v0.101 引入的 AWS client 类，按官方 release 在 anthropic 包下
# 配置项核心是 region + workspace + AWS credentials
# 调用方法和 Anthropic() 主客户端保持一致
```

跑通之后，对照三个事实再决定要不要迁移。一是你的合规审计是否要求模型调用日志进 CloudTrail，要求则迁。二是你公司的 AWS 是否签了 EA 或 RI/SP，签了则迁，能抵扣。三是你是否在等新模型同日可用，等则迁。

不在 AWS 上的国内开发者，这次的实际收益是观察价值。把 r/ClaudeCode 那篇 CC 2.1.139 reference 收藏一下，等你家云厂商出对应能力时，对照这份清单去问 PM，「短期凭据、Console 独立、新模型同日可用、EA 抵扣」这四件事做没做。

## 相关链接

- v0.101.0 release notes，<https://github.com/anthropics/anthropic-sdk-python/releases>
- Reddit r/ClaudeAI 官宣贴 154 赞 15 评，<https://www.reddit.com/r/ClaudeAI/comments/1ta7p4n/the_claude_platform_on_aws_is_now_generally/>
- Reddit r/ClaudeCode 拆解贴 score 14，<https://www.reddit.com/r/ClaudeCode/comments/1tbqg1b/claude_platform_is_now_ga_on_aws_full_api_console/>
- Reddit r/LLMDevs Claude API 访问路径对照，<https://www.reddit.com/r/LLMDevs/comments/1sy3ook/the_state_of_claude_api_access_is_a_mess_heres_my/>
- 仓库主页，<https://github.com/anthropics/anthropic-sdk-python>

---
相关实体:: [[anthropic|Anthropic]] | [[claude-code|Claude Code]]
相关主题:: [[ai-coding-tools|AI 编程工具]] | [[agent-frameworks|Agent 框架]]

<!-- REACH: 8/10 | 品牌✓ 利益点✗ 可操作✓ -->
