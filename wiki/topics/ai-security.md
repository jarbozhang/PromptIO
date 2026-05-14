# 主题追踪：AI 安全 / 网络攻击模型

AI 模型本身作为网络攻击工具 / 被攻击目标 / 安全研究对象。与 [[supply-chain-security|供应链安全]] 主题有交叉但视角不同：前者关注 AI 模型能力，后者关注软件供应链漏洞。

## 当前观察

- **Anthropic Mythos** 是本主题的中心线索：Glasswing 项目下的受限版网络安全模型，2026-04 连续三次出现在我们的覆盖中
- OpenMythos 开源逆向、NSA / Pentagon 报告引用、[[sam-altman|Sam Altman]] 公开嘲讽、黑客利用 —— 一周内经历四次剧情转折
- 国内对标：阿里 / 腾讯安全团队的大模型是否也在走"封印"路线？是空白选题方向

## 我们的覆盖

| 日期 | 文章 | 角度 |
|------|------|------|
| 2026-05-12 | [[openai-daybreak-claude-mythos-ai漏洞挖掘工作流对照\|OpenAI Daybreak vs Claude Mythos vs Google GTIG：三家 AI 漏洞挖掘工作流对照]] | 9 |
| 2026-05-11 | [[mythos-curl-mozilla271-anthropic-ai安全\|Anthropic Mythos 在 Mozilla 之后又找到 curl 漏洞，Daniel Stenberg 一句话救了国内开发者]] | 第二个开源大项目验证 / curl 作者站台 |
| 2026-05-10 | [[claude-code-cve-39861-sandbox逃逸-国内开发者升级\|Claude Code 爆 CVE-2026-39861 sandbox 逃逸漏洞，国内开发者今晚把这一个版本删掉]] | AI 编码 agent 自身 CVE / prompt injection 风险 |
| 2026-05-08 | [[anthropic-code-w-claude-2026大会-mythos-preview发布\|Anthropic Code w/ Claude 2026 大会 + Mythos Preview]] | Mythos 公开化 / 大会安全议题 |
| 2026-05-08 | [[claude-mythos-preview加固firefox-ai找浏览器漏洞\|Mozilla 让 Claude Mythos 给 Firefox 找了 31 天漏洞]] | 实战漏洞挖掘 / 国产浏览器对照 |
| 2026-05-08 | [[gpt-5-5-cyber网络安全垂直模型-国内安全团队怎么用\|GPT-5.5-Cyber 网络安全垂直模型 + 国内甲方对照]] | 垂直安全模型 / OpenAI 路线 |
| 2026-05-06 | [[daemon-tools月度供应链攻击-国内装机党自查清单\|Daemon Tools 装了 27 天的后门，国内装机党今晚自查这几个文件]] | 桌面工具供应链 / 装机党自查 |
| 2026-04-24 | [[gpt-5-5发布-openai生物红队赏金25000美元\|GPT-5.5 + OpenAI 开 2.5 万美元生物病毒越狱赏金]] | AI 生物安全红队 |
| 2026-04-22 | [[anthropic-mythos-48小时连爆四件事-核武器钥匙丢了\|Anthropic 的 Mythos 48 小时内出了四件事，从 NSA 偷用到 Altman 公开嘲讽]] | 事件复盘 + 行业解读 |
| 2026-04-20 | [[22岁创业者扒开claude-mythos黑箱-全开源了\|22 岁创业者扒开 Claude Mythos 黑箱，全开源了]] | 开源逆向 |
| 2026-04-08 | [[claude-mythos-754b-anthropic为什么把最强模型只给安全研究员\|754B 参数的 Claude Mythos]] | 封印策略分析 |
| 2026-05-14 | [[openai-chatgpt-trusted-contact紧急联系人-国内豆包元宝对照\|OpenAI ChatGPT Trusted Contact 紧急联系人，心理健康保护分支]] | 7 |

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

**高饱和警戒线** — 7 篇累计。5/8 +3 篇（Code w/ Claude 2026 大会 + Mythos x Firefox + GPT-5.5-Cyber）跳过中等饱和直接到 7。本主题进入"垂直安全模型 + 实战漏洞挖掘合作 + 主流厂商红队赏金"三线并发阶段。下一轮只跟政府监管 / 重大事件 / 国内首次类信号。重点：国产浏览器（百度 / 360 / 奇安信）是否跟进同类合作。
