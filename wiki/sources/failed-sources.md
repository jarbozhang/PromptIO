# 持续失败的源

需要修复或移除的源列表。

## 需要移除

| 源 | 失败率 | 原因 | 建议 |
|----|--------|------|------|
| TLDR AI | 100% (6/6) | 404 Not Found | RSS URL 已失效，移除 |
| Meta AI Blog | 100% (6/6) | 404 Not Found | 官方博客 URL 变更，依赖 TechCrunch/Verge 报道 |

## 需要排查

| 源 | 失败率 | 原因 | 可能的修复 |
|----|--------|------|-----------|
| Anthropic Blog | 92% (11/12) | 404 Not Found | 检查 RSS feed URL 是否已变更 |
| MIT Technology Review | 92% (11/12) | TLS 断开 | 可能需要代理或更换 User-Agent |

## 间歇性问题

| 源 | 失败率 | 原因 | 状态 |
|----|--------|------|------|
| Reddit r/LocalLLaMA | 50% | 403 Forbidden | 被 Reddit 反爬虫拦截，无稳定修复方案 |
| Reddit r/MachineLearning | 50% | 403 Forbidden | 同上 |

## 最后更新

2026-04-14 — 基于 15 天（2026-03-31 至 2026-04-14）运行日志分析
