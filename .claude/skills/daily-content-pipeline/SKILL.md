---
name: daily-content-pipeline
description: >
  每日 AI 内容管线，从采集到生成一键完成。当用户说"开始今天的文章生成"、
  "跑管线"、"今日内容"、"生成文章"、"daily pipeline"、"每日流程"时触发。
  也适用于用户说"抓取"、"采集"、"选题"、"评分"等管线中任意单步操作。
  即使用户只是简单说"开始吧"或"run it"，只要在 PromptIO 项目目录下，也应触发。
---

# Daily Content Pipeline

自动化 AI 内容管线，5 步完成从采集到生成。

## 前置条件

- `npm` 可用（pipeline.js 依赖 node）
- `bird` CLI 可用（X 推文抓取，读 Chrome/Safari cookies 认证）
- 当前目录为 PromptIO 项目根目录

## 完整流程

依次执行以下 5 步。每步完成后汇报结果，遇到错误时诊断但不中断整体流程。

### Step 1: RSS/GitHub/arXiv 采集

```bash
npm run pipeline
```

这会运行 `scripts/pipeline.js`，采集 `config/sources.yaml` 中定义的所有 RSS 源、GitHub Trending 和 arXiv 论文，保存到 `sources/{date}/`，并自动 commit。

记录采集条目数，报告失败的源（常见的 Reddit 403、MIT Tech Review 超时可忽略）。

### Step 2: X 推文抓取

从 `config/sources.yaml` 的 `x_accounts` 列表读取所有账号，用 `bird` CLI 批量抓取。

**抓取逻辑：**

```bash
bird search "from:{handle}" -n 20 --json
```

**过滤规则：**
- 时间窗口：近 14 天（从当天往回算）
- 最低互动：likes >= 50
- 排除：RT 转推、纯回复（保留原创和引用推文）

**JSON 字段映射（bird 输出）：**
- `createdAt` → 发布时间
- `likeCount` → 点赞数
- `retweetCount` → 转发数
- `replyCount` → 回复数
- `inReplyToStatusId` → 非空则为回复
- `quotedTweet` → 非空则为引用推文

**保存格式：** 每条推文一个 markdown 文件，文件名 `x-{handle}-{hash8}.md`

```yaml
---
title: "{推文前100字}"
source: "X @{handle}"
url: "https://x.com/{handle}/status/{id}"
date: "{createdAt}"
likes: {likeCount}
reposts: {retweetCount}
replies: {replyCount}
---

{推文全文}
```

用 bash 脚本批量处理所有账号（循环，非并行，避免触发限流）。内嵌 Node.js 做 JSON 解析和文件写入。

### Step 3: 选题评分（Top 10）

读取 `sources/{date}/` 下全部 source 文件的 frontmatter（title、source、url、likes），提取为索引列表。

**去重：** 读取最近 3 天的 `drafts/` 目录名，提取已覆盖主题，在评分时排除。

**评分标准（读取 `config/prompts/scoring.md` 获取完整版）：**
- novelty (1-10): 对读者的新鲜度，量子位/机器之心已覆盖的扣分
- practicality (1-10): 读者看完能不能动手
- depth_potential (1-10): 能否加入独特的实操洞察

**公式：** `score = novelty * 0.4 + practicality * 0.35 + depth_potential * 0.25`

**优先级：**
- 最高：开源工具/库（有代码可跑）、开发者经验报告、benchmark 对比
- 次高：论文拆解（有可复现结果）、社区讨论（有实操技巧）
- 降权：产品发布（无技术深度）、融资新闻、高管观点、市场预测

输出 top 10 选题列表，每题包含：标题方向、角度、原型、关联 source 文件、评分、reach_potential。

以表格形式展示给用户，等待确认后进入下一步。如果用户说"直接开始"或类似表达，跳过确认。

**选题质量门槛：**
- 每个选题至少需要 2-3 个互相印证的源，或一个信息量充足的长文/博客/论文作为主源
- 单条推文/单段摘要不够格独立成文，必须有可 WebFetch 的完整文章补充
- 标题里的品牌/人名如果读者不认识，reach_potential 直接降到 4 以下

### Step 4: 10 篇文章并行生成

对每个选题启动一个子代理（Agent tool, mode: bypassPermissions, run_in_background: true），10 个代理同时启动。

**每个子代理的 prompt 结构：**

1. 角色设定：中文科技公众号写手
2. 选题信息：标题方向、角度、文章原型（工具实测/现象解读/论文拆解/社区事件/方法论）
3. 源材料：列出要读取的 source 文件路径 + 需要 WebFetch 的 URL
4. 写作指南：指向 `config/prompts/wechat.md`
5. 重要规则：
   - 不把社区按语言对立（不用"中文世界""英文社区"）
   - 信息差洞察用"社区里的多种声音"统一呈现
6. 输出路径：
   - 文章：`drafts/{date}/{slug}/article.md`
   - 元数据：`drafts/{date}/{slug}/meta.yaml`

**slug 命名规则：** 标题方向的中文 kebab-case，去掉标点，例如 `openai收购astral-python工具链要变天`

**meta.yaml 格式：**

```yaml
title: "最终标题"
status: draft
date: {date}
sources:
  - source-file-id-1
  - source-file-id-2
tags:
  - tag1
  - tag2
```

等待所有子代理完成，逐一报告完成状态。

### Step 5: Commit

将 X 推文源文件和全部 drafts 一次性 commit：

```bash
git add sources/{date}/x-*.md drafts/{date}/ logs/{date}.md
git commit -m "generate: {date} (10 drafts, X+RSS sources, Claude Opus parallel)

- {N} X tweets from {M} accounts (likes>50, 14d window)
- 10 drafts scored and generated in parallel
- Topics: {逗号分隔的简短主题列表}

Generated with [Claude Code](https://claude.ai/code)
via [Happy](https://happy.engineering)

Co-Authored-By: Claude <noreply@anthropic.com>
Co-Authored-By: Happy <yesreply@happy.engineering>"
```

## 单步执行

用户可能只要求执行某一步：

- "只抓取" / "fetch only" → 只执行 Step 1 + Step 2
- "只评分" / "选题" → 只执行 Step 3（假设 sources 已存在）
- "只生成" / "生成文章" → 只执行 Step 4（假设选题已确认）
- "commit" → 只执行 Step 5

## 常见问题

- **bird 认证失败：** Safari cookies 警告可忽略，通常 Chrome cookies 能工作。如果全部失败，提示用户在 Chrome 中登录 x.com
- **某些 RSS 源 403/404：** Reddit、TLDR AI 经常失败，不影响整体流程
- **子代理 WebFetch 失败：** 子代理应基于已有 source 文件内容写作，WebFetch 是补充而非必须
