# RSS 源可靠性追踪

基于 2026-03-31 至 2026-04-14（15 天）的运行数据。

## Tier 1 — 完全可靠（100% 成功率）

| 源 | 每次产出 | 内容质量 | 选题命中率 |
|----|---------|---------|-----------|
| TechCrunch AI | 18-20 条 | 高，AI 产业新闻全面 | 中 |
| [[openai|OpenAI]] Blog | 20 条 | 高，第一手产品更新 | 高 |
| VentureBeat AI | 7 条 | 中高，偏企业/融资 | 中 |
| ArsTechnica AI | 20 条 | 高，技术深度好 | 中 |
| [[google|Google]] AI Blog | 20 条 | 高，产品和研究 | 中高 |
| DeepMind Blog | 20 条 | 高，研究导向 | 中 |
| [[simon-willison|Simon Willison]] | 20 条 | 极高，实操密度最大 | 高 |
| Sebastian Raschka | 20 条 | 高，LLM 研究综述 | 中 |
| Lobsters AI | 20 条 | 中，社区讨论 | 低 |

## Tier 2 — 基本可靠（>80% 成功率）

| 源 | 成功率 | 失败类型 | 备注 |
|----|--------|---------|------|
| Hacker News (Algolia) | 92% | 偶发超时 | 社区热点发现价值高 |
| The Verge AI | 92% | 偶发 TLS/连接重置 | 消费端视角 |
| arXiv | 92% | 偶发抓取失败 | 学术论文源 |
| Hugging Face Blog | 83% | 偶发 TLS | 模型/库更新 |
| GitHub Trending | 92% | 偶发抓取失败 | 开源项目发现 |

## Tier 3 — 不可靠（<60% 成功率）

| 源 | 成功率 | 失败类型 | 建议 |
|----|--------|---------|------|
| Reddit r/LocalLLaMA | 50% | 403 Forbidden | 考虑替代抓取方式 |
| Reddit r/MachineLearning | 50% | 403 Forbidden | 同上 |

## Tier 4 — 已失效（<10% 成功率）

| 源 | 成功率 | 失败类型 | 建议 |
|----|--------|---------|------|
| MIT Technology Review | 8% | TLS 断开 / 超时 | 移除或换抓取策略 |
| [[anthropic|Anthropic]] Blog | 8% | 404 | URL 可能已变更，需排查 |
| [[meta|Meta]] AI Blog | 0% | 404 | 持续不可用，依赖第三方 |
| TLDR AI | 0% | 404 | 从未成功，移除 |

## 待验证

以下源在 config/sources.yaml 中配置但数据不足：
- Hugging Face Papers、Papers With Code
- Alignment Forum
- AI 政策类源（Stanford HAI、CSET、AI Now）
- VC 博客（a16z、Sequoia）
- Newsletter 类（Import AI、Interconnects、The Batch）
