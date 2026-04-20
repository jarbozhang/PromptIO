# PromptIO - AI Content Pipeline

## 项目概述

自用 AI 内容自动化管线：RSS 采集 AI 领域信息 → LLM 选题评分 → 自动生成公众号文章 → 人工审核 → 发布。

## 架构

- **pipeline.js** — RSS/GitHub/arXiv 采集脚本 (fetch-only)
- **agent-browser** — X 账号推文抓取（Claude Code 会话内用 skill 调用）
- **Claude Code 会话** — 评分、生成、gates 全部直接完成
- **Git 作为内容数据库** — 每篇内容是 markdown 文件，frontmatter 管理状态
- **状态机** — draft → approved → published (或 rejected / publish_failed)

## 技术栈

- Node.js (ESM)
- rss-parser (RSS 采集)
- gray-matter (frontmatter 解析)
- agent-browser skill (X 推文抓取)
- Claude Code 会话 (选题评分 + 文章生成 + gates)

## 每日流程

```
1. npm run pipeline              # RSS/GitHub/arXiv 采集
2. bird search "from:{handle}" 抓取 X  # 按 config/sources.yaml 中 x_accounts 列表
   过滤：近14天 + likes>50            # bird CLI 读 Chrome cookies 认证，无需 API key
3. Claude Code 评分 top 10       # 从全部 sources 中选题，去重已有 drafts
4. 10 个子代理并行生成文章         # 保存到 drafts/{date}/
5. commit
```

## 命令

```bash
npm run pipeline    # RSS/GitHub/arXiv 采集（不含 X 抓取、评分、生成）
npm run publish     # 发布 approved 状态的文章到公众号
npm run setup       # 初始化配置
npm test            # 运行测试
```

## 目录结构

- `config/sources.yaml` — RSS 源列表
- `config/prompts/` — prompt 模板
- `scripts/` — 脚本
- `sources/` — 采集的原始数据（不可变，按日期组织）
- `topics/` — 选题评分结果
- `drafts/` — 生成的草稿（状态在 frontmatter 中追踪）
- `logs/` — 运行日志
- `data/` — 数据快照（OpenRouter 模型、PyPI 趋势）
- `wiki/` — LLM 维护的知识库（Karpathy LLM Wiki 模式）
  - `wiki/index.md` — 总目录
  - `wiki/log.md` — 操作日志
  - `wiki/entities/` — 人物/公司/产品实体页
  - `wiki/topics/` — 主题演化追踪
  - `wiki/sources/` — 源质量追踪
  - `wiki/coverage/` — 文章注册表和主题饱和度

## 内容定位

**帮中国 AI 用户发现能立刻动手的东西**：混合信源（英文 RSS/X + 中文平台热点 + GitHub），选题标准统一为"中国用户行动力"。

四个内容方向（无固定配比，质量优先）：
- AI 工具实测/省钱攻略（免费 Key、白嫖方案、横评对比）
- AI 变现/赚钱实操（闲鱼/小红书/淘宝自动化、独立开发者案例）
- 国产 AI 生态深度（DeepSeek/豆包/Kimi/元宝的功能发现）
- AI+中国特色场景（微信生态 AI、AI 玄学、AI+电商）

文章结构：
1. 为什么你应该关注这件事（hook）
2. 把事情讲清楚（技术拆解 + 背景补充）
3. 社区声音（多平台真实反馈）
4. 我的判断（必须有立场）
5. 行动建议（可选）

选题评分：actionability 35% + novelty 25% + reach 25% + depth_potential 15%
选题门槛：REACH >= 7（品牌认知 + 利益点 + 可操作，至少满足 2 个）

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
