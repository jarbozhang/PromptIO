# Microsoft 和 OpenAI 重写合作协议，国产模型上 Azure 这条路要重新算账

4 月 27 日，Microsoft 和 OpenAI 重写了从 2019 年签到现在的合作协议。最关键一条是 OpenAI 从今往后可以把任何产品卖到任何云上。第二天 AWS 就在 Bedrock 里上架了一批 OpenAI 新模型。Nadella 在财报会上的表态也很直接，Microsoft 自己也会用足这份新协议。

英文圈讨论最多的是 Microsoft 让出了什么、OpenAI 自由度涨了多少。但从国内视角看更值得算账的是，过去三年很多国内模型公司、Agent 创业者把 Azure OpenAI Service 当作上云的默认通路，这条路现在的形状变了。

## 先把这次协议拆干净

Microsoft 仍然持有 OpenAI 约 27% 股份，账面价值约 1350 亿美金，IP 授权延续到 2032 年，但变成**非独家**。OpenAI 的 revenue share 续付到 2030 年，比例不变，加了总额封顶。新协议 2026 年 7 月 1 日生效，存量合同有六个月过渡期。

Azure 不再是 OpenAI 的唯一云。OpenAI 可以同时在 AWS、Google Cloud、Oracle Cloud 提供完整产品线。条款给 Microsoft 留了 first-look，OpenAI 新产品首发优先 Azure，除非 Microsoft 不接。AWS 抢跑速度极快，新协议次日就在 Bedrock 上架了多个 OpenAI 模型并接入新的 agent 服务。

## 第一重影响，模型厂商上 Azure 的定位变了

DeepSeek、Qwen 系列在 Azure AI Foundry 的 Model Catalog 里都有上架，客户买的是 Azure 的合规、SLA、计费体系，模型是 catalog 里随选的一个。过去因为 Azure 上只有 Azure OpenAI Service 这一种 OpenAI 模型可以跑，客户被"想用 GPT 又必须留在 Azure"锁住，国产模型在同一个 catalog 里以"非 OpenAI 选项"蹭曝光。

7 月 1 日之后，AWS Bedrock 和 Google Cloud Vertex AI 都会有完整 OpenAI 产品线。Azure 的 OpenAI 客户池子会被稀释，国内模型在这个池子边缘做"备选项"曝光，曝光面会跟着缩水。

反过来对真正想拿"差异化模型"标签去争预算的国内模型反而是利好。Azure 不再是 OpenAI 的同义词，催化的是 Model Catalog 进一步走"超市化"，谁的 benchmark 好、token 价格低、合规文档齐全，谁就有机会被 IT 采购看到。Qwen 过去在 Foundry 里更像备选项，未来可能更接近跟 GPT-5、Claude Opus 4.6、Gemini 2.5 Pro 同框的另一道菜。

## 第二重影响，国内云厂商的窗口

阿里云、腾讯云、华为云国际站，长期面对一个事实，海外企业客户即使买了你的云，也要再去 Azure 拉 GPT。这道由独家协议留下的硬约束现在没了。

但从理论到现实隔着两道门槛。一是 OpenAI 是否愿意把模型授权给中国背景的云厂商，这背后是出口管制相关的政策判断，不一定快。二是企业客户买的不只是模型，还有 IAM、合规审计、数据驻留、SOC 2/ISO 27001 一整套 enterprise 配套，这些是国际站还在补的短板。

更现实的窗口在两个细分市场。一个是面向出海中资企业（电商、游戏、SaaS）做"中国总部+海外分支"的混合部署，国内云话语权更强。另一个是面向中等市场国家（沙特、印尼、巴西、土耳其），这些客户更愿意听一个中立选项。这次松绑留给国内云的是这种缝隙，不是直接抢 Azure 的财富 500 名单。

## 第三重影响，Agent 创业团队的部署选择

这一层最具体到代码。过去做出海 Agent 的国内团队，模型层默认走 Azure OpenAI Service 拿合规背书，因为客户的 procurement team 一看 Azure invoice 就放心。

这个默认值会被新协议拆开。OpenAI 从 AWS Bedrock 也能调用，附带 Bedrock Agents、Knowledge Base、Guardrails 一整套工具链，AWS 在企业 Agent 这条路上突然更有竞争力，GCP Vertex AI 同理。"为什么必须把客户锁在 Azure"第一次有了更复杂的答案。

最现实的动作是把模型层抽成一个 router，无论上 Azure OpenAI、AWS Bedrock 还是直连 OpenAI Platform，下游业务代码不动。这件事过去因为"反正只能上 Azure"被很多团队懒得做，现在有具体收益。

## 我的判断

Microsoft 用 1350 亿股权和一份续到 2032 年的非独家 IP，换了 OpenAI 自由出海的权利。对国内生态的影响有一点是明确的，过去把 Azure 当作出海唯一通路的思路，到 7 月 1 日之后会显著贬值。

我认为这次协议真正的信号不是 Microsoft 和 OpenAI 谁让步多，而是企业 AI 采购的"绑定关系"在被一次次解开。每解开一层，新玩家的机会就多一寸。这一寸窗口不会等谁，谁先把多云铺货、先把模型层抽成 router，谁先吃到。

## 相关链接

- [OpenAI 官方公告](https://openai.com/index/next-phase-of-microsoft-partnership)
- [The Verge 协议拆解](https://www.theverge.com/tech/921210/microsoft-openai-partnership-divorce-notepad)
- [TechCrunch AWS 当天上架](https://techcrunch.com/2026/04/28/amazon-is-already-offering-new-openai-products-on-aws/)

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
