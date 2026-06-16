# 持续失败的源

需要修复或移除的源列表。

## 需要移除

| 源 | 失败率 | 原因 | 建议 |
|----|--------|------|------|
| TLDR AI | 100% (6/6) | 404 Not Found | RSS URL 已失效，移除 |
| [[meta|Meta]] AI Blog | 100% (6/6) | 404 Not Found | 官方博客 URL 变更，依赖 TechCrunch/Verge 报道 |

## 需要排查

| 源 | 失败率 | 原因 | 可能的修复 |
|----|--------|------|-----------|
| [[anthropic|Anthropic]] Blog | 92% (11/12) | 404 Not Found | 检查 RSS feed URL 是否已变更 |
| MIT Technology Review | 92% (11/12) | TLS 断开 | 可能需要代理或更换 User-Agent |
| Mistral AI Blog | 持续 404 (5/11 确认) | RSS URL 失效 | 同 Anthropic，需重新发现 feed |
| Perplexity Blog | 持续 404 (5/11 确认) | RSS URL 失效 | 同上 |
| Stability AI Blog | 持续 404 (5/11 确认) | RSS URL 失效 | 同上 |
| Chip Huyen 个人博客 | 持续 404 (5/11 新增) | 个人站点路径变更 | 改为 huyenchip.com 主域 + 路径校对 |
| Lilian Weng (OpenAI) | 持续 404 (5/11 新增) | 站点结构变更 | 重新核对 lilianweng.github.io feed 路径 |
| Hamel Husain | 持续 404 (5/11 新增) | 个人站点 feed 失效 | 重新核对 hamel.dev feed 路径 |

## 间歇性问题

| 源 | 失败率 | 原因 | 状态 |
|----|--------|------|------|
| Reddit r/LocalLLaMA | 50% | 403 Forbidden | 被 Reddit 反爬虫拦截，无稳定修复方案 |
| Reddit r/MachineLearning | 50% | 403 Forbidden | 同上 |

## 最后更新

2026-05-11 — wiki lint 追加 6 个新持续失败源（3 个公司 blog + 3 个个人博客）

## 单日记录

- **2026-06-16**：TrendRadar Docker 路径缺失（/tmp/TrendRadar/docker）soft-fail；MIT Technology Review TLS 断开；多个官方 blog/RSS 404 或 403；PyPI ollama/autogen/dspy-ai 返回 429；bird X 抓取成功保存 213 条来源。
- **2026-05-11**：bird CLI Chrome Safe Storage exit 36 + 无 SWEETISTICS_API_KEY，X 抓取跳过；TrendRadar Docker 目录缺失；Mistral / Perplexity / Stability / Chip Huyen / Lilian Weng / Hamel Husain 6 个源 404
- **2026-05-10**：同 5/11 X 跳过原因；bird CLI 仍失败
- **2026-05-08**：bird CLI（X 抓取）继续 cookies 缺失，Reddit RSS 部分 403，TrendRadar Docker 目录缺失（/tmp/TrendRadar/docker），pypi 1 个 429。**Step 2 X 抓取本期跳过，由 Step 3.5 last30days 补社区反馈。**
- **2026-05-07**：bird cookies 失效再次 skip；TrendRadar 容器路径不存在；pypi 2 个 429
- **2026-05-06**：bird auth fail；fetch:trendradar 失败；pypi 0 spike
