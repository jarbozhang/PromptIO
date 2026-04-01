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

## 内容定位

**英文→中文信息差**：专注搬运和解读中文 AI 媒体（量子位、机器之心、36氪）还没覆盖的英文一手信息。

文章结构：
1. 为什么你应该关注这件事（hook）
2. 把事情讲清楚（技术拆解 + 背景补充）
3. 信息差洞察（英文社区在讨论什么、中文世界还没意识到的点）
4. 我的判断（必须有立场）
5. 行动建议（可选）

选题偏好：novelty 50% + depth_potential 30% + relevance 20%
核心原则：如果量子位已经报道了，我们就不选这个题

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
