# Claude 这次直接登陆 AWS，国产云和大模型的关系该怎么排，我想清楚了

5 月 11 号，Anthropic 官宣 Claude Platform on AWS 正式 GA。同一天，`anthropic-sdk-python` 发了 v0.101.0，release notes 只有一行字，「Add AWS client for Claude Platform on AWS」。

听起来像「Claude 又上 AWS 一次」，但其实不是。

过去一年 AWS 卖 Claude 是靠 Bedrock，开发者拿到的是 AWS 自家 SDK boto3、AWS 命名的 modelId、AWS 包过一层的入参。Anthropic 新功能从原生 API 推到 Bedrock，总要等团队对齐一遍。

这次 Claude Platform on AWS 走的是另一条路：入口是 Claude 自己的原生 SDK 加 Console，AWS 退到背后做账号体系、做认证、做账单。一句话总结，Bedrock 是 AWS 卖 Claude，Platform on AWS 是 Anthropic 把整套 Platform 寄存在 AWS 之上。这是关系反转。

## 关键的几件事

我把这次 GA 的关键点摘了出来。

第一，入口是 Anthropic 原生 SDK，不是 AWS SDK。v0.101 加了一个 AWS client，写法跟 Anthropic() 主客户端同一套，只是换个客户端类。

第二，认证走 AWS SigV4 加 IAM。不需要在公司流程里申请第二个供应商的 long-lived API key，账号和审计直接复用 AWS。

第三，账单计入 AWS，调用日志走 CloudTrail，已签的 AWS Enterprise Agreement 和 RI/SP 承诺消费可以抵扣。Reddit 上有一句高赞评论说得糙，「你的 AWS 账单刚长出了新的一行」。

第四，新模型同日可用。这是 Anthropic 这次最敢承诺的事，因为 Platform 由它自己说了算，不再被 Bedrock 团队对齐节奏拖慢。

第五，Managed Agents、web search、code execution、prompt caching、citations 整套能力一次带到 AWS 客户面前。

## 国产云可以借鉴哪几步

国内有同样形态的组合，火山引擎和豆包、阿里云和 Qwen、腾讯云和混元、华为云和盘古、百度云和文心。目前这几对都还停留在「Bedrock 阶段」，云厂商自己包一层 modelId、用云原生 SDK，模型方更新要等云厂商对齐。

我列五步，按我看做起来由易到难。

第一步，承认模型方应该有独立 Console，不要被云控制台吃掉。

第二步，模型方维护自己的官方 SDK，云厂商只负责接 STS 短期凭据，不是替模型方写阉割版 SDK。

第三步，用短期凭据兑换调用 token，不要让客户再申一个独立 API key 长期保存。

第四步，把新模型同日可用写进 SLA。这事看起来是工程，其实是产品老板敢不敢签。

第五步，把企业关心的折扣承诺、合同主体、分账打通。豆包的合同主体和火山的资源合同主体如果不在一份单子上，企业采购到这一步就会卡。

五步里，前三步是工程动作，国内云厂商三个月之内做得到。后两步是组织和合同动作，慢一些。

## 我的判断

国内会不会出第一个 Claude Platform on AWS 的同构方案？我个人押火山引擎和豆包先动。理由是字节内部博弈比阿里云和通义那一对都要小，豆包又有产品老板敢签 SLA 的传统。阿里云和通义的对照是「Qwen Platform on 阿里云」，工程上完全做得到，但要先解决通义、钉钉、夸克之间的产品边界。腾讯云和混元的对照最难，混元自己 Console 都还没成形，要先有 Console 才谈得上挂到云上。

更大的事其实不是 Claude 自己，而是它示范了一种「模型方 × 云厂商」的新分工模板。过去模型方是渠道里的供货商，云厂商是橱窗；这次 Anthropic 拿到了橱窗的玻璃，AWS 退到了收银台。

## 已经在用 Claude 的同学，能动手的最小路径

如果你公司本来就在 AWS 上跑 Claude，旧的 Bedrock 路径继续可用，但新功能会从 Platform 这边先到。

```
pip install -U anthropic
```

升到 v0.101 以后，import 一下 SDK 新的 AWS client 类，确认 SigV4 加 workspace 这一套能跑通，再决定要不要把现有 Bedrock 接入迁过来。三件事可以作为判断标准，合规审计是否要求日志进 CloudTrail，公司 AWS 是否签了 EA 或 RI/SP，是否在等新模型同日可用。三件里命中一件，就可以考虑迁。

不在 AWS 上的同学，这次的实际收益是观察价值。等国产云厂商出对应能力时，对照「Console 独立、短期凭据、同日可用、折扣抵扣」这四件事去问产品经理。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 7/10 | 品牌✓ 利益点✗ 可操作✓ -->
