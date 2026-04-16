---
name: daily-content-pipeline
description: >
  每日 AI 内容管线，从采集到生成一键完成。当用户说"开始今天的文章生成"、
  "跑管线"、"今日内容"、"生成文章"、"daily pipeline"、"每日流程"时触发。
  也适用于用户说"抓取"、"采集"、"选题"、"评分"等管线中任意单步操作。
  即使用户只是简单说"开始吧"或"run it"，只要在 PromptIO 项目目录下，也应触发。
---

# Daily Content Pipeline

自动化 AI 内容管线，7 步完成从采集到生成（含 wiki 维护）。

## 前置条件

- `npm` 可用（pipeline.js 依赖 node）
- `bird` CLI 可用（X 推文抓取，读 Chrome/Safari cookies 认证）
- 当前目录为 PromptIO 项目根目录

## 完整流程

依次执行以下 6 步。每步完成后汇报结果，遇到错误时诊断但不中断整体流程。

### Step 1: RSS/GitHub/arXiv 采集

```bash
npm run pipeline
```

这会运行 `scripts/pipeline.js`，采集 `config/sources.yaml` 中定义的所有 RSS 源、GitHub Trending 和 arXiv 论文，保存到 `sources/{date}/`，并自动 commit。

记录采集条目数，报告失败的源（常见的 Reddit 403、MIT Tech Review 超时可忽略）。

### Step 1b: 脚本信号源采集

在 RSS/GitHub/arXiv 采集完成后，运行额外的脚本信号源。这些脚本独立于 pipeline.js，需要单独调用：

```bash
npm run fetch:trending    # GitHub Trending 每日热门 AI 项目（抓取 trending 页面 + API 补充 topics）
npm run fetch:openrouter   # OpenRouter 新增模型监控（对比上次快照，只输出新增）
npm run fetch:pypi         # PyPI AI 包下载趋势（10 个核心包，检测增速异常 >20%）
```

**注意事项：**
- `fetch:trending` 抓取 3 个页面（all/python/jupyter-notebook），用 AI 关键词过滤
- `fetch:openrouter` 首次运行会建立基线快照（存在 `data/openrouter-models.json`），后续只报告新增模型
- `fetch:pypi` 有 rate limit（pypistats.org），脚本内置 3s 间隔，偶尔仍有 429 失败属正常
- PyPI 趋势数据存在 `data/pypi-trends.json`，增速 >20% 的包会单独生成 spike 文件

三个脚本的输出都保存到 `sources/{date}/`，文件名前缀分别为 `github-trending-`、`openrouter-new-model-`、`pypi-trends-` / `pypi-spike-`。

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

**重要：不要用 bash 循环内嵌 Node.js（引号转义会出错）。** 直接用纯 Node.js 脚本，通过 `execSync` 调用 bird CLI：

```javascript
// 在 Bash 工具中用 node -e "..." 执行
const {execSync}=require('child_process');
const fs=require('fs'),crypto=require('crypto');
const accounts='karpathy ylecun ...'.split(' '); // 从 sources.yaml 提取
const cutoff=Date.now()-14*86400000;
for(const handle of accounts){
  try{
    const raw=execSync(`bird search "from:${handle}" -n 20 --json`,{timeout:30000}).toString();
    const tweets=JSON.parse(raw);
    // 过滤 + 写入 markdown 文件
  }catch(e){continue;}
}
```

**Step 2b: 推荐流抓取（For You + Following）**

除了按账号搜索，还要抓取用户的推荐流和关注流，获取更广泛的 AI 相关内容：

```bash
bird home -n 100 --json          # For You 推荐流（至少100条）
bird home --following -n 50 --json  # Following 关注流（至少50条）
```

**注意 home timeline 的 author 字段是对象**，需要用 `t.author.username` 获取用户名（不是 `t.author`）。

过滤规则：14 天时间窗口，推荐流 likes >= 50（降低门槛以获取更多候选），关注流 likes >= 30（关注流内容质量更稳定，门槛可以更低）。文件名前缀改为 `x-home-{username}-{hash8}.md` 和 `x-following-{username}-{hash8}.md`，source 字段标记为 `"X home @{username}"` 或 `"X following @{username}"`。

去重：检查 hash 是否已存在于当天目录中，避免和 Step 2a 的账号搜索结果重复。

推荐流的价值在于发现不在 `x_accounts` 列表中的账号和话题，特别是中文 AI 社区的接地气内容（省钱攻略、工具推荐、开源项目）。

### Step 3: 选题评分（wiki-informed）

读取 `sources/{date}/` 下全部 source 文件的 frontmatter（title、source、url、likes），提取为索引列表。

**Wiki 查询（评分前必做）：**
1. 读取 `wiki/coverage/topic-saturation.md` 了解当前主题饱和度，高饱和主题自动降权
2. 读取 `wiki/coverage/article-registry.md` 进行精确去重（比 3 天 drafts 目录名更准确）
3. 读取相关实体页（如涉及 Karpathy 的选题，读 `wiki/entities/people/karpathy.md`）确认覆盖次数
4. 如果某实体/主题在 wiki 中标注为"高饱和"或"需要降权"，在评分时 REACH 自动 -1

**去重：** 优先使用 wiki/coverage/article-registry.md 进行去重。同时读取最近 3 天的 `drafts/` 目录名作为补充。

**评分标准（读取 `config/prompts/scoring.md` 获取完整版）：**
- novelty (1-10): 对读者的新鲜度，量子位/机器之心已覆盖的扣分
- practicality (1-10): 读者看完能不能动手
- depth_potential (1-10): 能否加入独特的实操洞察
- reach_potential (1-10): 传播潜力（品牌认知 + 利益点 + 可操作性）

**公式：** `score = novelty * 0.4 + practicality * 0.35 + depth_potential * 0.25`

**选题数量：不固定，质量优先。** 只选 REACH >= 7 的选题，宁可只出 3 篇也不凑 10 篇。

**REACH >= 7 的三要素（必须至少满足 2 个）：**
1. 品牌认知：标题里有读者认识的品牌/人名（Google、OpenAI、Karpathy、Claude、Apple）
2. 利益点：标题里有明确的好处（"免费""不需要""一键""本地跑""省X元"）
3. 可操作：读者看完能立刻动手试（下载 app、跑命令、打开网页）

**REACH < 7 的典型特征（直接排除）：**
- 标题里的品牌读者不认识（Holo3、Astral、MemPalace、Safetensors）
- 纯观点/行业分析/趋势解读，读者看完没有可操作的事
- 深度技术对比/论文拆解，标题用技术术语（"p95 延迟""754B 参数"）

**源材料厚度门槛：**
- 每个选题至少需要 2-3 个互相印证的源，或一个信息量充足的长文/博客/论文作为主源
- 单条推文/单段摘要不够格独立成文，必须有可 WebFetch 的完整文章补充
- 不要虚构你不确定的细节，宁可文章短一点也不编数据

**优先级：**
- 最高：知名品牌 + 读者能动手的工具/教程（REACH 8-10）
- 次高：知名品牌 + 有话题性的事件（REACH 7）
- 降权：小众品牌、纯分析、融资新闻（REACH < 7，不选）

输出选题列表，每题包含：标题、角度、原型、关联 source 文件、score、reach。

以表格形式展示给用户，等待确认后进入下一步。如果用户说"直接开始"或类似表达，跳过确认。

### Step 4: 文章并行生成

对每个选题启动一个子代理（Agent tool, mode: bypassPermissions, run_in_background: true），所有代理同时启动。

**每个子代理的 prompt 必须包含：**

1. 角色设定：中文科技公众号写手
2. 选题信息：最终标题、角度、文章原型（工具实测/现象解读/论文拆解/社区事件/方法论）、REACH 目标分
3. 源材料：列出要读取的 source 文件路径 + 需要 WebFetch 的 URL
4. 写作指南：指向 `config/prompts/wechat.md`
5. 重要规则：
   - 不把社区按语言对立（不用"中文世界""英文社区"）
   - 信息差洞察用"社区里的多种声音"统一呈现
   - 不要虚构你不确定的细节，所有数据必须来自源材料
   - 文章文件以 H1 标题开头（与 meta.yaml title 一致），空一行后接正文
   - meta.yaml 的 title 是唯一标题源
   - 文章末尾（REACH 注释之前）加 Obsidian Dataview 内联字段关联区块
6. 输出路径：
   - 文章：`drafts/{date}/{slug}/{slug}.md`（文件名与文件夹同名，不叫 article.md）
   - 元数据：`drafts/{date}/{slug}/meta.yaml`

**slug 命名规则：** 标题的中文 kebab-case，去掉标点，例如 `karpathy差点被黑客搞了-npm包安全吗`

**meta.yaml 格式（title 是唯一标题源）：**

```yaml
title: "最终发布标题"
status: draft
date: {date}
reach: 8
sources:
  - source-file-id-1
  - source-file-id-2
tags:
  - tag1
  - tag2
```

**文章文件格式：** 以 H1 标题开头（与 meta.yaml title 一致），空一行后接正文。

文章末尾加 Obsidian 关联区块和 REACH 评分：
```
---
相关实体:: [[karpathy|Karpathy]] | [[openai|OpenAI]]
相关主题:: [[ai-coding-tools|AI编程工具]]

<!-- REACH: X/10 | 品牌✓/✗ 利益点✓/✗ 可操作✓/✗ -->
```

**实体/主题 wikilink 映射：**
人物: karpathy, simon-willison, chollet, ggerganov, emollick
公司: openai, anthropic, google, meta
产品: claude-code, codex, llama-cpp, chatgpt
主题: local-inference, ai-coding-tools, supply-chain-security, ai-pricing, agent-frameworks

根据文章内容智能选择相关实体和主题，只链接真正相关的（不要全部链接）。

等待所有子代理完成，逐一报告完成状态。

### Step 5: Wiki 更新

文章生成完成后，更新 wiki 知识库。这一步确保知识持续积累而非每次从零开始。

**5a. 更新文章注册表：**
读取 `wiki/coverage/article-registry.md`，将今天生成的所有文章追加到对应日期段落。格式与现有条目一致（标题、REACH、主要实体、主题）。

**5b. 更新主题饱和度：**
读取 `wiki/coverage/topic-saturation.md`，根据今天的选题调整各主题的篇数和饱和度评估。如果某主题从"中等"升到"高饱和"，更新建议。

**5c. 更新实体页（按需）：**
对今天文章涉及的主要实体，更新对应的 wiki 实体页：
- 在"我们的覆盖"表格中追加新条目
- 如果出现新的关键动态，更新"近期关键动态"
- 如果覆盖次数已过多，在"注意"中标注需要降权
- 如果涉及的实体没有 wiki 页面，创建新页面

**5d. 更新主题页（按需）：**
如果今天的文章引入了新的主题角度，更新 `wiki/topics/` 下对应页面的覆盖记录和饱和度评估。

**5e. 更新源质量（如有新信息）：**
如果今天采集阶段有新的源失败/恢复模式，更新 `wiki/sources/` 下对应页面。

**5f. 追加操作日志：**
在 `wiki/log.md` 顶部追加今天的操作记录，格式：
```
## [{date}] generate | {N} drafts, REACH>={min_reach}
- 新增文章：{逗号分隔的简短标题}
- 涉及实体：{更新了哪些实体页}
- 主题饱和变化：{哪些主题饱和度发生了变化}
```

**5g. 更新 index.md：**
更新 `wiki/index.md` 的"最近更新"段落。如果有新的实体或主题页面被创建，追加到对应列表中。

### Step 6: Commit

将 X 推文源文件、脚本信号源文件、全部 drafts 和 wiki 更新一次性 commit：

```bash
git add sources/{date}/ drafts/{date}/ logs/{date}.md data/ wiki/
git commit -m "generate: {date} ({N} drafts, REACH>=7, RSS+X+signals)

- {R} RSS/GitHub/arXiv items via pipeline.js
- {T} GitHub Trending AI repos, {O} new OpenRouter models, PyPI trends checked
- {X} X tweets from {M} accounts (likes>50, 14d window)
- {N} drafts scored and generated in parallel (REACH>=7 only)
- Topics: {逗号分隔的简短主题列表}

Generated with [Claude Code](https://claude.ai/code)
via [Happy](https://happy.engineering)

Co-Authored-By: Claude <noreply@anthropic.com>
Co-Authored-By: Happy <yesreply@happy.engineering>"
```

## 单步执行

用户可能只要求执行某一步：

- "只抓取" / "fetch only" → 只执行 Step 1 + Step 1b + Step 2
- "只评分" / "选题" → 只执行 Step 3（假设 sources 已存在）
- "只生成" / "生成文章" → 只执行 Step 4（假设选题已确认）
- "更新wiki" / "wiki update" / "wiki lint" → 只执行 Step 5
- "commit" → 只执行 Step 6
- "fetch:trending" / "fetch:openrouter" / "fetch:pypi" → 只执行对应的脚本信号源

## Wiki Lint（定期维护）

用户说"lint wiki"或每周至少执行一次：

1. 检查实体页中的"近期关键动态"是否过时（超过 2 周的动态可以归档）
2. 检查主题饱和度评估是否需要重新校准
3. 检查 article-registry.md 是否与实际 drafts 目录一致
4. 检查 failed-sources.md 是否有新的修复或恶化
5. 检查是否有新的高频实体/主题需要创建 wiki 页面

## 常见问题

- **bird 认证失败：** Safari cookies 警告可忽略，通常 Chrome cookies 能工作。如果全部失败，提示用户在 Chrome 中登录 x.com
- **某些 RSS 源 403/404：** Reddit、TLDR AI 经常失败，不影响整体流程
- **子代理 WebFetch 失败：** 子代理应基于已有 source 文件内容写作，WebFetch 是补充而非必须
- **选题不够 10 个：** 正常现象。质量优先，REACH < 7 的不选，宁可当天只出 3-5 篇
