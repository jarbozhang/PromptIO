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

## 执行模式

**全程无人值守。** 触发本 skill 后，所有步骤连续执行直到 Step 6 commit 完成，**任何中间步骤都不停下等用户确认**：
- Step 3 选题输出后**直接进入** Step 3.5，不展示候选给用户审核
- Step 4 写作子代理直接并行启动
- Step 4.5 QA 将 L6 小红书规则作为主稿硬门槛；如有 needs_review 也不暂停，只在 meta.yaml 标记，Step 6 commit 仍照常
- 不再生成单独的小红书版本；主稿就是公众号/X/小红书共用的唯一版本
- Step 5 wiki 三类子代理并行后直接 commit

质量保证依赖：Step 3 合规预检 + Step 4.5 QA 三轮质修循环（含 L6 小红书硬门槛）+ Step 5c 主角过滤。这三道关之外不再设人工把关。

例外：单步触发（如"只评分"/"只生成"）按用户单步指令执行，不进入连续模式。

## 前置条件

- `npm` 可用（pipeline.js 依赖 node）
- `bird` CLI 可用（X 推文抓取，读 Chrome/Safari cookies 认证）。CLI 用法/认证细节以上游 `bird` skill 为准（`~/.claude/skills/bird/SKILL.md`），Step 2 运行时先用 Skill tool 调一次 bird skill 加载到上下文
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
npm run fetch:trending      # GitHub Trending 每日热门 AI 项目（抓取 trending 页面 + API 补充 topics）
npm run fetch:openrouter    # OpenRouter 新增模型监控（对比上次快照，只输出新增）
npm run fetch:pypi          # PyPI AI 包下载趋势（10 个核心包，检测增速异常 >20%）
npm run fetch:trendradar    # 中文平台热点（知乎/B站/微博/抖音等 11 个平台，AI 关键词过滤）
```

**注意事项：**
- `fetch:trending` 抓取 3 个页面（all/python/jupyter-notebook），用 AI 关键词过滤
- `fetch:openrouter` 首次运行会建立基线快照（存在 `data/openrouter-models.json`），后续只报告新增模型
- `fetch:pypi` 有 rate limit（pypistats.org），脚本内置 3s 间隔，偶尔仍有 429 失败属正常
- PyPI 趋势数据存在 `data/pypi-trends.json`，增速 >20% 的包会单独生成 spike 文件
- `fetch:trendradar` 依赖 TrendRadar Docker 容器（`/tmp/TrendRadar/`），首次运行会自动触发容器抓取。输出前缀 `trendradar-`

四个脚本的输出都保存到 `sources/{date}/`，文件名前缀分别为 `github-trending-`、`openrouter-new-model-`、`pypi-trends-` / `pypi-spike-`、`trendradar-`。

### Step 2: X 推文抓取

**CLI 基础：先通过 Skill tool 调用 `bird` skill** 了解 bird CLI 的用法（auth 来源、命令语法、通用选项）。bird skill 是 steipete 上游维护的，`~/.claude/skills/bird/SKILL.md`，单次对话内一次 Skill 调用即可，后续都直接用 Bash 工具执行 bird 命令。

本 step 的任务 = 用 bird CLI 抓 X 推文 + 按本项目的过滤/保存规则落盘。CLI 本身的行为/认证请看 bird skill，下面只列项目特定部分。

**Step 2a: 按账号搜索（x_accounts 列表）**

从 `config/sources.yaml` 的 `x_accounts` 列表读取所有账号，对每个账号执行：

```bash
bird search "from:{handle}" -n 20 --json
```

过滤规则：
- 时间窗口：近 14 天
- 最低互动：`likeCount >= 50`
- 排除：`inReplyToStatusId` 非空的纯回复、RT 转推（保留原创和引用推文 `quotedTweet`）

保存格式：每条推文一个 markdown 文件，路径 `sources/{date}/x-{handle}-{hash8}.md`

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

**实现提示：** 不要用 bash 循环内嵌 Node.js（引号转义会出错）。用纯 Node.js 脚本通过 `execSync` 调用 bird CLI：

```javascript
const {execSync}=require('child_process');
const fs=require('fs'),crypto=require('crypto');
const accounts='karpathy ylecun ...'.split(' '); // 从 config/sources.yaml 提取
const cutoff=Date.now()-14*86400000;
for(const handle of accounts){
  try{
    const raw=execSync(`bird search "from:${handle}" -n 20 --json`,{timeout:30000}).toString();
    const tweets=JSON.parse(raw);
    // 过滤 + 写入 markdown
  }catch(e){continue;}
}
```

**Step 2b: 推荐流 + 关注流（For You + Following）**

```bash
bird home -n 100 --json             # For You 推荐流
bird home --following -n 50 --json  # Following 关注流
```

**字段差异：** home timeline 的 author 是对象，用 `t.author.username`（不是 `t.author`）取用户名。

过滤规则：
- 时间窗口：14 天
- 推荐流：`likeCount >= 50`（降低门槛以获取更多候选）
- 关注流：`likeCount >= 30`（关注流质量更稳定）

保存格式：
- 文件名前缀 `x-home-{username}-{hash8}.md` / `x-following-{username}-{hash8}.md`
- frontmatter 里 `source: "X home @{username}"` / `source: "X following @{username}"`

去重：抓前先 `ls sources/{date}/` 拿到已有 hash 集合，避免和 Step 2a 的账号搜索结果重复。

推荐流/关注流的价值在于发现不在 `x_accounts` 列表中的账号和话题，特别是中文 AI 社区的接地气内容（省钱攻略、工具推荐、开源项目）。

### Step 3: 选题评分（wiki-informed）

读取 `sources/{date}/` 下全部 source 文件的 frontmatter（title、source、url、likes），提取为索引列表。

**Wiki 查询（评分前必做）：**
1. 读取 `wiki/coverage/topic-saturation.md` 了解当前主题饱和度，高饱和主题自动降权
2. 读取 `wiki/coverage/article-registry.md` 进行精确去重（比 3 天 drafts 目录名更准确）
3. 读取相关实体页（如涉及 Karpathy 的选题，读 `wiki/entities/people/karpathy.md`）确认覆盖次数
4. 如果某实体/主题在 wiki 中标注为"高饱和"或"需要降权"，在评分时 REACH 自动 -1

**去重：** 优先使用 wiki/coverage/article-registry.md 进行去重。同时读取最近 3 天的 `drafts/` 目录名作为补充。

**评分标准（读取 `config/prompts/scoring.md` 获取完整版）：**
- actionability (1-10): 中国用户看完能否立刻动手？
- novelty (1-10): 对中国目标读者的新鲜度
- reach (1-10): 中文社交平台传播潜力（REACH 三要素）
- depth_potential (1-10): 能否加入独特的实操洞察

**公式：** `score = actionability * 0.35 + novelty * 0.25 + reach * 0.25 + depth_potential * 0.15`

**合规前置检查（强制）：** 对每个候选选题，用 Bash 调用 `scripts/lib/l1-replace.js` 的 `checkCompliance(title + source 摘要)`：

```bash
node -e "
import { checkCompliance } from './scripts/lib/l1-replace.js';
const input = '候选标题 + source 摘要前 200 字';
const { skip, reasons } = checkCompliance(input);
console.log(JSON.stringify({ skip, reasons }));
"
```

`skip=true` 的直接排除不评分；`skip=false` 但 `reasons` 有 `compliance_delete` 或 `rhetoric_soften` 命中的，正常评分但要在评分理由里标出"REACH -2"。详见 `config/prompts/scoring.md` 的 Hard Exclusions 和 REACH Penalties。

**内容方向（四个方向，无固定配比）：**
- AI 工具实测/省钱攻略（免费 Key、白嫖方案、横评对比）
- AI 变现/赚钱实操（闲鱼/小红书/淘宝自动化、独立开发者案例）
- 国产 AI 生态深度（DeepSeek/豆包/Kimi/元宝的功能发现）
- AI+中国特色场景（微信生态 AI、AI+电商、AI+教育）

**选题数量：不固定，质量优先。** 只选 REACH >= 7 的选题，目标 10-20 篇。

**REACH >= 7 的三要素（必须至少满足 2 个）：**
1. 品牌认知：标题里有**中国读者认识的**品牌/人名（Google、OpenAI、DeepSeek、微信、Karpathy、雷军）
2. 利益点：标题里有明确的好处（"免费""省X元""月入X""一键""不需要""白嫖"）
3. 可操作：读者看完能立刻动手试（下载 app、跑命令、打开网页、扫码体验）

**REACH < 7 的典型特征（直接排除）：**
- 标题里的品牌中国读者不认识（Holo3、Astral、MemPalace）
- 纯观点/行业分析/趋势解读，读者看完没有可操作的事
- 深度技术对比/论文拆解，标题用技术术语（"p95 延迟""754B 参数"）
- 纯融资新闻/人事变动

**源材料厚度门槛：**
- 每个选题至少需要 2-3 个互相印证的源，或一个信息量充足的长文/博客/论文作为主源
- 单条推文/单段摘要不够格独立成文，必须有可 WebFetch 的完整文章补充
- 不要虚构你不确定的细节，宁可文章短一点也不编数据

**优先级：**
- 最高：知名品牌 + 读者能动手的工具/教程（REACH 8-10）
- 次高：知名品牌 + 有话题性的事件（REACH 7）
- 降权：小众品牌、纯分析、融资新闻（REACH < 7，不选）

输出选题列表，每题包含：标题、角度、原型、关联 source 文件、score、reach。

**自动直通：** 选题输出后直接进入 Step 3.5，**不等待用户确认**。用户已明确管线是无人值守跑完整流程；Step 4.5 QA 循环（含 L6 小红书规则）+ Step 5 wiki 子代理已经覆盖了内容质量、合规、覆盖度三道关，不需要选题阶段的人工把关。如果选题需要回退，由 Step 4.5 needs_review 或 commit 前自检兜底。

### Step 3.5: last30days 社区反馈拉取（每个 REACH>=7 选题）

Step 4 启动写作子代理之前，对**每个选题**跑一次 last30days 拉真实社区反馈，作为写作时的"多平台真实反馈"素材源。

**为什么做：** X 数据源因 Chrome cookies 失效一直挂，导致文章里的"社区声音"段落偏单薄；last30days 用 Reddit/HN/GitHub 三条公开免费源，能补上这个洞。

**调用：**

对每个选题，用 Bash 调用 last30days：

```bash
TOPIC="选题主关键词"  # 如 "DeepSeek V4" / "Qwen3.6" / "openclaw security"
SLUG="选题对应的 slug"
OUT_DIR="drafts/{date}/${SLUG}"
mkdir -p "$OUT_DIR"

cd ~/.claude/skills/last30days && \
  uv run python skills/last30days/scripts/last30days.py "$TOPIC" \
    --search reddit,hn,github \
    --quick \
    --emit md \
    --days 30 \
  > "$OLDPWD/$OUT_DIR/community-research.md" 2>&1
```

输出落地到 `drafts/{date}/{slug}/community-research.md`，文件含：
- Reddit thread 列表（标题/upvote/comment/链接）
- HN story 列表
- GitHub issue/PR 信号
- Top voices（活跃 subreddit / 用户）

**注意：** last30days 的输出有"PASS-THROUGH FOOTER"和"EVIDENCE FOR SYNTHESIS"两块，写作子代理读时只用 EVIDENCE 块作为素材，不要把 footer 的"emoji-tree stats"塞进文章正文。

**失败处理：**
- last30days 返回非零或超时（>120s）→ soft-fail，写一行 `# last30days unavailable` 到 community-research.md，写作子代理仍然能跑（fallback 到现有 source 材料）
- 选题主关键词太抽象（如"AI 安全"）→ last30days 会输出"keyword-search fallback"提示，仍可用，但社区声音质量会偏低

**成本：** 全免费（Reddit/HN/GitHub 公开 API），不需要 SCRAPECREATORS_API_KEY 或 LLM API key。X/YouTube/TikTok/Polymarket 这些线需要付费 API key，本管线暂不接入。

**Step 4 子代理 prompt 改动：**

每个写作子代理的"源材料"清单里，除原 source 文件外，新增一行：
- `community-research`: `drafts/{date}/{slug}/community-research.md`（last30days 拉的真实社区反馈，**优先**用作"多平台真实反馈"段的素材源）

### Step 4: 文章并行生成

对每个选题启动一个子代理（Agent tool, mode: bypassPermissions, run_in_background: true），所有代理同时启动。

**每个子代理的 prompt 必须包含：**

1. 角色设定：中文科技公众号写手
2. 选题信息：最终标题、角度、文章原型（工具实测/现象解读/论文拆解/社区事件/方法论）、REACH 目标分
3. 源材料：列出要读取的 source 文件路径 + 需要 WebFetch 的 URL
4. 写作指南：指向 `config/prompts/wechat.md`
5. 重要规则：
   - 社区声音用"多平台真实反馈"统一呈现（GitHub/X/知乎/B站，不限语言）
   - 不要虚构你不确定的细节，所有数据必须来自源材料
   - 文章文件以 H1 标题开头（与 meta.yaml title 一致），空一行后接正文
   - meta.yaml 的 title 是唯一标题源
   - 文章末尾（REACH 注释之前）加 Obsidian Dataview 内联字段关联区块
6. 输出路径：
   - 文章：`drafts/{date}/{slug}/{slug}.md`（文件名与文件夹同名，不叫 article.md）
   - 元数据：`drafts/{date}/{slug}/meta.yaml`

**slug 命名规则：** **中文字符 + 英文品牌** kebab-case，**禁止纯拼音**。英文品牌/产品名保留原样（OpenAI、Claude、Cursor、Kimi、NotebookLM、Firecrawl 等），数字保留阿拉伯数字（600亿、44），标点全换成 `-`，大写转小写。示例：`karpathy差点被黑客搞了-npm包安全吗`、`notebooklm-白嫖google算力-claude省17倍token`、`爱奇艺ai艺人库百位演员入驻-ai抢演员饭碗`。**反例（禁止）**：`anthropic-mythos-yi-zhou-si-lian-zha-nsa-pentagon-altman-heike`（纯拼音）。

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
qa:                      # 质检结果（由质检循环自动写入）
  status: passed         # passed | needs_review | failed_qa
  rounds: 1              # 质修循环轮数
  l1_qa_violations: 0    # L1-3/L1-4 残留违规数（L1-1/L1-2 由机械替换处理，不计入）
  l2_score: 8            # 1-10
  l3_score: 7            # 1-10
  l4_pass: true          # boolean
  l5_score: 8            # 1-10
  l6_pass: true           # boolean，小红书合规硬门槛
  l6_issues: []           # L6 fail 时的具体问题
  xhs_pass: true          # l6_pass && l5_score >= 7
  l1_replacements: 3     # L1 机械替换次数
  issues: []             # 最后一轮的未解决问题列表（仅 needs_review 时有值）
  error: ""              # failed_qa 时填写错误原因（parse_error/timeout/unknown）
platforms:
  wechat: primary
  xhs: primary            # primary | blocked
  x: primary
xhs_blocked_reason: ""
```

**qa.status 说明：**
- `passed` = L1 零违规 + L2/L3/L5 均 >= 7 + L4 pass + L6 小红书合规 pass
- `needs_review` = 3 轮质修后仍未达标，带 issues 进入人工审核
- `failed_qa` = QA agent 错误（超时/不可解析），带 error 进入人工审核

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

### Step 4.5: 质检循环（在所有子代理写入文件后执行）

等待所有 Step 4 写作子代理完成。然后对每篇生成的文章执行以下质检流程。**10 篇文章的质检可以并行执行**（每篇启动独立的质检子代理）。

**对每篇文章：**

**4.5a L1 机械替换（不消耗质修轮次）**

读取生成的文章 markdown 文件，通过 Bash tool 执行 L1 替换：

```bash
node -e "
import { l1Replace } from './scripts/lib/l1-replace.js';
import { readFileSync, writeFileSync } from 'fs';
const path = 'drafts/{date}/{slug}/{slug}.md';
const original = readFileSync(path, 'utf8');
const { text, replacements } = l1Replace(original);
writeFileSync(path, text);
console.log(JSON.stringify({ replacements_count: replacements.length, details: replacements }));
"
```

记录 `replacements_count` 供后续写入 meta.yaml。

**4.5b 独立 QA 检查**

启动一个新的子代理（Agent tool, mode: bypassPermissions），传入以下内容：

1. **System prompt**：读取 `config/prompts/qa-check.md` 的完整内容
2. **文章文本**：读取 L1 替换后的文章 markdown（仅正文，不含 meta.yaml）
3. **文章原型**：工具实测/现象解读/论文拆解/社区事件/方法论（从选题信息中传入，影响 L3 专项检查）
4. **指令**：按 qa-check.md 的格式输出 JSON 结果

解析 QA agent 返回的 JSON。**如果返回不可解析，重试最多 2 次**（基础设施错误重试，不消耗内容修改轮次）。

**4.5c 判断阈值**

检查 QA 结果：
- `overall_pass == true` → 质检通过，跳到 4.5e
- `overall_pass == false` → 进入质修循环（4.5d）
- JSON 不可解析且 2 次重试均失败 → 消耗 1 轮内容修改配额

**L6 是主稿硬门槛。** 小红书合规不再通过派生版兜底；一篇文章如果 `l6_pass == false`，`overall_pass` 必须为 false，并进入同一个质修循环，直接修主稿。

**4.5d 质修循环（最多 3 轮）**

对于未通过质检的文章：

1. 从 QA JSON 中提取问题清单（l4_issues + l1_details + l6_issues + 低分维度的 reasons）
2. 启动修改子代理（Agent tool, mode: bypassPermissions），传入：
   - 文章原文
   - QA 问题清单（不含 QA 的推理过程，只传结论和建议）
   - 修改原则：
     - **删减类**（冗余/节奏/风格问题）：只删不加，禁止扩充
     - **替换类**（L4 AI 味段落、结构性缺陷）：允许定向替换，但替换后全文总字数 ≤ 原文总字数 × 1.1
     - 违反上述条件的修改视为"加内容"，禁止
3. 修改完成后，重新执行 4.5b（独立 QA 检查）
4. 重复直到通过或达到 3 轮上限

**3 轮后仍未通过** → 标记为 `needs_review`，保留最后一轮的 issues 列表。

**4.5e 写入 QA 结果到 meta.yaml**

将质检结果写入对应文章的 meta.yaml `qa` 字段：

```yaml
qa:
  status: passed          # 或 needs_review 或 failed_qa
  rounds: 1               # 实际执行的质修循环轮数
  l1_qa_violations: 0     # 最终 L1-3/L1-4 违规数
  l2_score: 8
  l3_score: 7
  l4_pass: true
  l5_score: 8
  l6_pass: true           # L6 小红书合规（主稿硬门槛）
  l6_issues: []           # L6 fail 时记录违规类型和建议，并进入质修循环
  xhs_pass: true          # l6_pass && l5_score >= 7
  l1_replacements: 3      # Step 4.5a 的机械替换次数
  issues: []              # needs_review 时填写
  error: ""               # failed_qa 时填写
platforms:
  wechat: primary         # primary | blocked
  xhs: primary            # primary | blocked（缺失时按 blocked 处理）
  x: primary              # primary | blocked
xhs_blocked_reason: ""    # 可选，仅 platforms.xhs=blocked 时填写
```

**platforms 字段语义和默认值：**
- `wechat.primary` 主版本（主 slug.md）直接发公众号
- `xhs.primary` 主版本直接发小红书，且主版本必须已通过 L6
- `xhs.blocked` 不发小红书（3 轮质修后仍未通过 L6、玄学等强制排除情况、或 QA 基础设施失败）
- **向后兼容**：读取 meta.yaml 时，如 `platforms` 或 `platforms.xhs` 字段不存在，按 `xhs: blocked` 处理（保守兜底，历史 drafts 不会被误发）

**所有文章质检完成后，汇报质检结果：**
- 通过的文章数 / 总数
- 需要人工审核的文章列表（如有）
- 平均质修轮次
- L1 机械替换总次数
- L6 最终仍 fail 的文章列表（`platforms.xhs` 将写 `blocked`）

然后继续 Step 4.6（单版本平台标记）。

### Step 4.6: 单版本平台标记

**原则：只保留一份主稿。** 不生成 `xhs-version.md`，不启动额外的小红书改写子代理。公众号、X、小红书共用 `drafts/{date}/{slug}/{slug}.md` 这一份文章；为了能发小红书，主稿必须通过 L6。

**标记规则：**

- `qa.status == passed` 且 `qa.l6_pass == true` 且 `qa.xhs_pass == true` → `platforms.xhs = primary`
- `qa.status == needs_review` 且最终问题包含 L6 → `platforms.xhs = blocked`，`xhs_blocked_reason = l6_needs_review`
- `qa.status == failed_qa` → `platforms.xhs = blocked`，`xhs_blocked_reason = failed_qa`
- 玄学完全禁区、境外访问教程等强制排除问题无法在 3 轮内修掉 → `platforms.xhs = blocked`，不要生成替代稿

**每篇文章都要写入 platforms 字段：**

```yaml
platforms:
  wechat: primary
  xhs: primary    # 主稿通过 L6 时才可直接发小红书；否则 blocked
  x: primary
```

**所有文章处理完成后，汇报：**
- xhs.primary 数量（主稿可直接发）
- xhs.blocked 数量（主稿仍不适合发小红书）
- 被 blocked 的标题和原因

然后继续 Step 5（Wiki 更新）。

### Step 5: Wiki 更新

文章生成完成后，更新 wiki 知识库。这一步确保知识持续积累而非每次从零开始。

**5a. 更新文章注册表：**
读取 `wiki/coverage/article-registry.md`，将今天生成的所有文章追加到对应日期段落。格式与现有条目一致（标题、REACH、主要实体、主题）。

**5b. 更新主题饱和度：**
读取 `wiki/coverage/topic-saturation.md`，根据今天的选题调整各主题的篇数和饱和度评估。如果某主题从"中等"升到"高饱和"，更新建议。

**5c. 并行子代理补全实体页和主题页（强制，不再"按需"）：**

**为什么强制：** 历史上 5c/5d 留作"按需"，导致实体页/主题页系统性落后于 `article-registry.md`，需要周期性回填。从本步起改为并行子代理强制同步，每篇文章涉及的每个实体和主题都必须在对应 wiki 页面有条目。

**5c-1. 生成补全任务清单：**

对今天每篇 drafts 文章，读 `drafts/{date}/{slug}/meta.yaml` 和文章末尾的 Obsidian 关联区块（`相关实体::` 和 `相关主题::` 行）。聚合得到两份清单：

- `entity_targets`：每项 `{slug, kind: companies|people|products, articles: [{date, slug, title, reach, voice, 该篇切入角度一句话, is_protagonist: bool}]}`
- `topic_targets`：每项 `{slug, articles: [{date, slug, title, reach, voice, 该篇切入角度一句话, is_protagonist: bool}]}`

实体页落地路径根据 kind：`wiki/entities/companies/{slug}.md` / `wiki/entities/people/{slug}.md` / `wiki/entities/products/{slug}.md`。主题页统一在 `wiki/topics/{slug}.md`。

**主角过滤（强制）：** 文章作者写作时倾向把"国产对照方"也列进 `相关实体::`（如 anthropic 文章把 alibaba/baidu/xiaomi/tencent 都加进去），导致中国公司实体页被国外公司文章污染。在 5c-2 追加前**必须判断 is_protagonist**：

- `is_protagonist = true` 当：
  - 实体名或其主力产品名出现在文章 `title` 里（如"阿里 Qwen"对 alibaba、"百度 CoBuddy"对 baidu、"小米 MiMo"对 xiaomi、"腾讯 Hy3"对 tencent），或
  - 文章 frontmatter `tags` 列表里含该实体名/产品名，或
  - 文章 hook 段（H1 后首段）直接讨论该实体（非对照）
- `is_protagonist = false` 当：实体仅在文章中以"国产对照方/降权对照/国内同类"角色出现，标题里没有该实体的品牌词

**只追加 `is_protagonist == true` 的文章。** 主题页的判断同理：主题在标题或 tags 出现 = 主角。

**5c-2. 并行启动子代理（每个 target 一个）：**

每个 entity_target 和 topic_target 各起一个独立子代理（Agent tool, mode: bypassPermissions, run_in_background: true），所有子代理同时启动。每个子代理的 prompt 含：

1. 目标文件路径
2. 该 target 关联的文章清单（articles 数组）
3. 任务规则：
   - 若文件存在 → 在"我们的覆盖"表格末尾追加日期 + 文章 wikilink + REACH + 切入角度；如有重大动态，在"近期关键动态"段顶部新增 1-2 行
   - 若文件不存在 → 参考同类页面模板新建，包含基础元数据 + 覆盖表格 + 该日期条目
   - 仅追加/新建，不重写其他段落
   - 不修改 frontmatter 之外的统计字段（"总覆盖次数"等由 wiki lint 周期性重算）
4. 输出：修改行数 / 是否新建

**5c-3. 等待全部完成：**

子代理写不同文件互不冲突。等所有完成后才进入 5f，避免 log/index 写完但实体页未补。

**子代理失败处理：** 单个子代理 soft-fail（超时、写入错误）不阻塞整体；记录在 5f 操作日志的"实体/主题页补全异常"段。下次运行时由 5h 回填扫描器自动追补。

**5d. 回填扫描（已废弃，合并到 5c）：** 不再单独"按需"维护，全部由 5c 子代理并行覆盖。

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

**5h. 历史缺漏回填扫描（用户触发，非每日）：**

当用户说"补全 wiki 历史" / "wiki 回填" / "扫描 wiki 缺漏"时，执行：

1. **诊断**：起一个 Explore 子代理读 `wiki/coverage/article-registry.md`，对每个日期段提到的每个实体和主题，用 grep 检查对应 `wiki/entities/**/*.md` 和 `wiki/topics/*.md` 是否包含该日期。输出报告：最早缺漏日期 + 每天缺哪些页面。
2. **分批并行补全**：按日期段分组，每组起一个补全子代理（每个子代理负责若干个日期段的实体/主题页追加），所有子代理并行 run_in_background。子代理任务格式同 5c-2，但 articles 数组来自 article-registry 的历史条目而非当天 drafts。
3. **汇总**：所有子代理完成后，汇报新建页面数、追加行数、失败 target 列表。

回填后，下次 daily 运行的 5c 只需处理当天，不会再积累历史缺漏。

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
- "补全 wiki 历史" / "wiki 回填" / "扫描 wiki 缺漏" → 只执行 Step 5h
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
