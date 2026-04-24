# 主题追踪：AI 安全 / 网络攻击模型

AI 模型本身作为网络攻击工具 / 被攻击目标 / 安全研究对象。与 [[supply-chain-security|供应链安全]] 主题有交叉但视角不同：前者关注 AI 模型能力，后者关注软件供应链漏洞。

## 当前观察

- **Anthropic Mythos** 是本主题的中心线索：Glasswing 项目下的受限版网络安全模型，2026-04 连续三次出现在我们的覆盖中
- OpenMythos 开源逆向、NSA / Pentagon 报告引用、[[sam-altman|Sam Altman]] 公开嘲讽、黑客利用 —— 一周内经历四次剧情转折
- 国内对标：阿里 / 腾讯安全团队的大模型是否也在走"封印"路线？是空白选题方向

## 我们的覆盖

| 日期 | 文章 | 角度 |
|------|------|------|
| 2026-04-24 | [[gpt-5-5发布-openai生物红队赏金25000美元\|GPT-5.5 + OpenAI 开 2.5 万美元生物病毒越狱赏金]] | AI 生物安全红队 |
| 2026-04-22 | [[anthropic-mythos-48小时连爆四件事-核武器钥匙丢了\|Anthropic 的 Mythos 48 小时内出了四件事，从 NSA 偷用到 Altman 公开嘲讽]] | 事件复盘 + 行业解读 |
| 2026-04-20 | [[22岁创业者扒开claude-mythos黑箱-全开源了\|22 岁创业者扒开 Claude Mythos 黑箱，全开源了]] | 开源逆向 |
| 2026-04-08 | [[claude-mythos-754b-anthropic为什么把最强模型只给安全研究员\|754B 参数的 Claude Mythos]] | 封印策略分析 |

## 相关实体

- [[anthropic|Anthropic]] — Mythos 发布方
- [[mythos|Mythos]] — 核心产品
- [[sam-altman|Sam Altman]] — 公开嘲讽
- Glasswing — Anthropic 漏洞扫描项目
- NSA / Pentagon — 政府场景引用

## 相关主题

- [[supply-chain-security|供应链安全]]
- 网络攻击模型

## 饱和度评估

**中等饱和** — 3 篇/17 天。4/24 +1 篇（GPT-5.5 Bio Bug Bounty 2.5 万美元），本主题从 Mythos 单线扩展到 OpenAI / Bio Bug Bounty 双线，"AI 安全红队 / 生物安全评估"正在成为主流厂商模型发布的标配流程。后续重点：国内大模型是否在发布同步开放类似红队赏金，封印 / 开源 / 监管路径。
