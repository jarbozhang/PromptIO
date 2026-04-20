---
title: "refactor: 内容定位转型——从英文信息差到中国用户行动力"
type: refactor
status: active
date: 2026-04-20
origin: docs/brainstorms/2026-04-20-content-positioning-pivot-requirements.md
---

# 内容定位转型：从英文信息差到中国用户行动力

## Overview

更新内容管线的选题评分标准、写作指南、项目定位文档，并集成 TrendRadar 作为中文平台信号源。核心改动是把选题权重从"英文新鲜度"转向"中国用户行动力"。

## Problem Frame

当前管线定位为"英文→中文信息差"，但实际运营发现：时效赢不了全职媒体、读者不为英文来源买单、传播力最强的内容恰恰不是英文搬运。需要把定位转为"帮中国 AI 用户发现能立刻动手的东西"。(see origin: docs/brainstorms/2026-04-20-content-positioning-pivot-requirements.md)

## Requirements Trace

- R1. 内容定位转为"帮中国 AI 用户发现能立刻动手的东西"
- R6. 评分公式重写为 `actionability*0.35 + novelty*0.25 + reach*0.25 + depth_potential*0.15`
- R7. REACH 三要素更新（品牌认知、利益点、可操作）
- R8-R10. 集成 TrendRadar 中文信号源
- R11-R12. 更新写作指南
- R15. 更新 CLAUDE.md 和 scoring.md

## Scope Boundaries

- 不改变 git-as-database 架构和状态机
- TrendRadar 只做数据消费，不修改其源码
- 不新增文章原型，省钱/变现类用现有"工具实测型"和"方法论型"

## Key Technical Decisions

- **TrendRadar 集成方式：直接抓取其底层 API（newsnow 格式）**：TrendRadar 本身是个 web dashboard，Docker 部署过重。其数据来自 newsnow API，我们可以直接调用同一数据源，加自己的 AI 关键词过滤，写一个轻量 Node.js 脚本。这与现有 `fetch-github-trending.js`、`fetch-openrouter-models.js` 模式一致
- **评分维度从 3 个变 4 个**：新增 `reach` 作为独立评分维度（之前 reach_potential 只做标注不参与公式）。`practicality` 被 `actionability` 替代，含义从"能不能动手"扩展到"中国用户能不能立刻动手"

## Open Questions

### Resolved During Planning

- **TrendRadar 数据获取方式**：不部署 Docker，直接用 Node.js fetch 抓取 newsnow API 的 JSON 数据（与 trending 页面相同数据源），按平台分类过滤 AI 关键词。TrendRadar 的 GitHub repo 中可找到 API endpoint 格式
- **AI 关键词过滤策略**：复用现有 `fetch-github-trending.js` 中的 `AI_KEYWORDS` 列表，扩展中文关键词（大模型、AI、人工智能、GPT、DeepSeek、豆包、Kimi、元宝、智能体、Agent）

### Deferred to Implementation

- newsnow API 的具体 endpoint 和响应格式需要实际请求确认
- 各平台返回的数据量和速率限制需要实测

## Implementation Units

- [ ] **Unit 1: 重写评分标准 scoring.md**

**Goal:** 把选题评分从英文新鲜度导向改为中国用户行动力导向

**Requirements:** R6, R7

**Dependencies:** None

**Files:**
- Modify: `config/prompts/scoring.md`

**Approach:**
- 替换评分维度定义：`novelty*0.4 + practicality*0.35 + depth_potential*0.25` → `actionability*0.35 + novelty*0.25 + reach*0.25 + depth_potential*0.15`
- 重写每个维度的 1-10 评分说明，actionability 的描述要聚焦"中国用户"而非泛泛的"读者"
- 新增 REACH 三要素定义和分数映射表（三要素全满 9-10，满足 2 个 7-8 等）
- 更新选题规则："量子位已报道就不选"这条规则删除，替换为"REACH < 7 不选"
- 保留 JSON 输出格式，字段名更新为新维度名

**Patterns to follow:**
- 现有 scoring.md 的结构（维度说明 → 公式 → 输出格式 → 选题规则）

**Test expectation:** none -- 纯配置文件，无代码行为

**Verification:**
- 新公式四个维度权重之和 = 1.0
- REACH 分数映射与三要素对应关系一致
- JSON 输出格式的字段名与新维度名匹配

---

- [ ] **Unit 2: 更新写作指南和项目定位**

**Goal:** 把所有面向 LLM 的指令文档从"英文信息差"更新为新定位

**Requirements:** R1, R3, R5, R11, R12, R15

**Dependencies:** Unit 1（引用新评分公式）

**Files:**
- Modify: `config/prompts/wechat.md`
- Modify: `CLAUDE.md`

**Approach:**

`wechat.md` 改动点：
- 第 1 行定位描述：从"英文→中文信息差"改为"帮中国 AI 用户发现能立刻动手的东西"
- "你的任务"段：从"把一篇英文源内容变成中文"改为"把一个值得关注的 AI 话题变成有人格、有判断、有实操的文章"
- 删除"信息差洞察（英文社区在讨论什么）"的特定写法，改为"社区声音（GitHub/X/知乎/B站 上的真实反馈）"
- 五段式结构第 3 段：从"英文社区在讨论什么、中文世界还没意识到的点"改为"社区里的多种声音——不限语言，重点是真实用户反馈"

`CLAUDE.md` 改动点：
- "内容定位"段：整段重写，新定位 + 新评分公式 + 新选题偏好
- "核心原则"：删除"如果量子位已经报道了，我们就不选这个题"，替换为新的选题门槛描述
- "文章结构"第 3 点：从"信息差洞察（英文社区在讨论什么）"改为"社区声音（多平台真实反馈）"

**Patterns to follow:**
- 保持现有文档的结构和格式不变，只替换内容

**Test expectation:** none -- 纯文档修改

**Verification:**
- wechat.md 和 CLAUDE.md 中不再出现"英文→中文信息差"或"量子位已报道就不选"
- 新评分公式在 CLAUDE.md 中与 scoring.md 一致
- wechat.md 的五段式结构保持完整

---

- [ ] **Unit 3: 创建 TrendRadar 中文信号源采集脚本**

**Goal:** 新增 `fetch:trendradar` npm script，采集知乎/B站/小红书/微博等中文平台 AI 热点，输出到 `sources/{date}/`

**Requirements:** R8, R9, R10

**Dependencies:** None（可与 Unit 1-2 并行）

**Files:**
- Create: `scripts/fetch-trendradar.js`
- Modify: `package.json`（添加 `fetch:trendradar` script）

**Approach:**
- 遵循现有 fetch 脚本模式：ESM、`log()` 函数、`SOURCES_DIR`/`LOG_FILE` 常量、gray-matter frontmatter
- 调用 newsnow API（TrendRadar 的底层数据源）获取各平台热点 JSON
- 目标平台：知乎热榜、B站热门、小红书热点、微博热搜、头条、财联社（6 个核心中文平台）
- AI 关键词过滤：中英文双语关键词列表（AI、大模型、GPT、DeepSeek、豆包、Kimi、Claude、Agent、智能体、机器学习、prompt 等）
- 每条热点生成一个 markdown 文件，文件名格式 `trendradar-{platform}-{hash8}.md`
- frontmatter 格式与现有 source 文件一致：

```yaml
---
title: "{热点标题}"
source: "{平台名称}热榜"  # 如 "知乎热榜"、"B站热门"
url: "{原始链接}"
date: "{发布时间}"
hot_score: {热度分数}  # 平台原始热度
---
{摘要或正文}
```

- 脚本应处理网络错误并继续（与 pipeline.js 一致），超时 10s
- 添加 `"fetch:trendradar": "node scripts/fetch-trendradar.js"` 到 package.json

**Patterns to follow:**
- `scripts/fetch-github-trending.js`（页面抓取 + 关键词过滤 + markdown 输出）
- `scripts/fetch-openrouter-models.js`（API 调用 + JSON 解析）

**Test scenarios:**
- Happy path: 脚本运行后 `sources/{date}/` 中出现 `trendradar-*` 文件，frontmatter 格式正确
- Edge case: newsnow API 不可达时脚本不崩溃，输出 0 items 并 log 错误
- Edge case: 无 AI 相关热点时输出 0 items（过滤生效）

**Verification:**
- `npm run fetch:trendradar` 可执行且不报错
- 输出文件的 frontmatter 能被 `gray-matter` 正确解析
- `source` 字段包含中文平台名称

---

- [ ] **Unit 4: 更新 daily-content-pipeline skill**

**Goal:** 在每日管线 skill 中加入 TrendRadar 采集步骤，更新评分段落引用新公式

**Requirements:** R9, R6

**Dependencies:** Unit 1, Unit 3

**Files:**
- Modify: `.claude/skills/daily-content-pipeline/skill.md`

**Approach:**

Step 1b 段落更新：
- 在现有三个脚本（fetch:trending, fetch:openrouter, fetch:pypi）后新增 `npm run fetch:trendradar`
- 添加说明：TrendRadar 抓取知乎/B站/小红书/微博等 6 个中文平台 AI 热点

Step 3 评分段落更新：
- 评分公式替换为新公式
- REACH 三要素说明替换为新版本
- 删除"量子位已报道就不选"规则
- 更新评分输出表格的字段名

Step 6 commit message 模板更新：
- 添加 TrendRadar 条目数占位符

**Patterns to follow:**
- 现有 skill.md 的段落结构和 bash/js 代码块格式

**Test expectation:** none -- 纯文档修改

**Verification:**
- skill.md 中的评分公式与 scoring.md 一致
- Step 1b 包含 `npm run fetch:trendradar`
- commit message 模板包含中文信号源条目数

## System-Wide Impact

- **daily-content-pipeline skill**：评分逻辑、选题规则、采集步骤都在 skill 中定义，必须同步更新
- **wiki/coverage/topic-saturation.md**：现有主题分类不需要预先修改，wiki 是 LLM 自维护的，新主题（国产 AI、AI 变现等）会在首次生成时自然出现
- **子代理生成 prompt**：skill 中子代理的 prompt 模板引用 wechat.md，定位更新后子代理行为自动跟随

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| newsnow API 不稳定或格式变化 | 脚本内置错误处理，失败不阻塞整体管线（与现有 fetch 脚本一致） |
| 中文平台热点 AI 相关内容少 | 关键词列表可迭代扩展，初版先上线看数据再调整 |
| 评分公式改动影响已有 wiki 饱和度计算 | wiki 饱和度是按文章数统计，不受评分公式影响 |

## Sources & References

- **Origin document:** [docs/brainstorms/2026-04-20-content-positioning-pivot-requirements.md](docs/brainstorms/2026-04-20-content-positioning-pivot-requirements.md)
- 现有 fetch 脚本模式: `scripts/fetch-github-trending.js`, `scripts/fetch-openrouter-models.js`
- TrendRadar repo: `sansan0/TrendRadar` (52k stars, newsnow API)
- 现有评分标准: `config/prompts/scoring.md`
- 现有写作指南: `config/prompts/wechat.md`
