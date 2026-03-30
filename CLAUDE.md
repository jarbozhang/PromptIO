# Hamburg - AI Content Pipeline

## 项目概述

自用 AI 内容自动化管线：RSS 采集 AI 领域信息 → LLM 选题评分 → 自动生成公众号文章 → 人工审核 → 发布。

## 架构

- **pipeline.js** — 主 pipeline (Node.js + Anthropic SDK)，cron 定时触发
- **Git 作为内容数据库** — 每篇内容是 markdown 文件，frontmatter 管理状态
- **状态机** — draft → approved → published (或 rejected / publish_failed)

## 技术栈

- Node.js (ESM)
- Anthropic SDK (选题评分 + 文章生成)
- Google Generative AI (封面图生成)
- rss-parser (RSS 采集)
- gray-matter (frontmatter 解析)

## 命令

```bash
npm run pipeline    # 执行完整采集→选题→生成流程
npm run publish     # 发布 approved 状态的文章到公众号
npm run setup       # 初始化配置
npm test            # 运行测试
```

## 目录结构

- `config/sources.yaml` — RSS 源列表
- `config/prompts/` — prompt 模板
- `scripts/` — 脚本
- `sources/` — 采集的原始数据
- `topics/` — 选题评分结果
- `drafts/` — 生成的草稿（状态在 frontmatter 中追踪）
- `logs/` — 运行日志

## 内容风格

文章不做纯翻译/摘要，需三层加工：
1. 技术拆解（用人话解释原理）
2. 行业分析（放到更大的趋势里，跟其他事件串联）
3. 实操建议（对开发者/从业者的具体行动建议）
