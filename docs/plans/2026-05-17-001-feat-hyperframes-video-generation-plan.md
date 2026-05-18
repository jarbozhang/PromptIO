---
title: Hyperframes 视频化 MVP（每篇文章按需转 60s 竖屏视频）
type: feat
status: planning
date: 2026-05-17
origin: docs/brainstorms/2026-05-17-hyperframes-video-generation-research.md
---

# Hyperframes 视频化 MVP（每篇文章按需转 60s 竖屏视频）

## Overview

接入开源 hyperframes 框架（HeyGen 出品，Apache 2.0），把 `drafts/{date}/{slug}.md` 按需转成 60s 竖屏短视频（MP4，9:16，1080×1920）。MVP 阶段不配音、不接 TTS、不进 daily pipeline 主流程，由人工/会话在 Claude Code 里指定 1 篇或几篇 draft 触发渲染。目标，4.5 天工时，3 篇 PoC 里至少 2 篇可直发，否则接受 kill 整个方向。

## Problem Frame

PromptIO 当前管线在 `drafts/{date}/{slug}.md`（含 `xhs-version.md`）就停了，分发形态只有图文，错过视频号/抖音/视频版小红书的流量入口。

技术上想要的是一个「文章 → MP4」的可重复管道，且，

- 不依赖 SaaS（HeyGen 付费版、Sora、Runway、Kling 均排除）
- 不需要真人/数字人口播（PoC 阶段不做）
- 一次跑一篇的耗时不超过 5 分钟（含 LLM 写 script + 渲染）
- 输出物 ≤ 30MB，能在 git 里直接管理

hyperframes 的「Video as Code」模型——用 HTML/CSS/JS 写视频源码 + Puppeteer 逐帧 + FFmpeg 合成——刚好对齐 PromptIO 的「Claude Code agent + git 作内容数据库」的工作流，且零外部依赖。

## Requirements Trace

- R1. 安装 hyperframes 运行环境（Node ≥ 22、FFmpeg、Chromium），本地能跑通官方 launch-video 示例
- R2. 字体（思源黑体 Regular/Bold）和 BGM（5–10 首无版权）进 git，clone 即用，总量 ≤ 30MB
- R3. 一套 9:16 竖屏 60s 模板（templates/video/xhs-9-16.html），覆盖 6 场景结构（hook → 事件 → 数据 → 观点 → 行动建议 → 收尾），中文字体可正确渲染
- R4. LLM prompt（config/prompts/video-script.md），输入 `drafts/{date}/{slug}.md`，输出 `script.json`（6 场景，含 headline/subline/quote/字幕，**不含旁白**）
- R5. 编排脚本（scripts/generate-video.js），读 script.json + 填模板 + 调 `npx hyperframes render` → 输出 `drafts/{date}/{slug}/video/output.mp4`
- R6. package.json 加 `video:render` 子命令，支持 `npm run video:render -- 2026-05-17/{slug}` 单篇和 `... {slug1},{slug2}` 多篇
- R7. 端到端 PoC，在 3 篇 high-REACH draft 上跑出 MP4，单条 ≤ 5 分钟、≤ 30MB
- R8. PoC 评估报告（docs/brainstorms/2026-05-17-hyperframes-video-poc-eval.md 或追加到原 brainstorm），明确 go/no-go

**Origin actors:** 人工/会话调用方（输入 draft slug）、Claude Code 子代理（写 script.json）、generate-video.js（编排）、hyperframes CLI（渲染）

**Origin flows:** F1 环境准备、F2 素材准备、F3 模板设计、F4 script 生成、F5 渲染编排、F6 PoC 评估

## Scope Boundaries

- 不接 TTS 配音（Phase 5 才考虑 edge-tts 或火山引擎）
- 不接 publish 自动上传（视频号/抖音/小红书三平台的 API/自动化是独立项目）
- 不进 daily-content-pipeline skill 的 Step 序列（按需触发，避免「重复选题视频化」浪费）
- 不做横屏（16:9）模板（Phase 2，PoC 验证后再加）
- 不做实测教程型、横评对比型模板（Phase 2）
- 不做 docker baseline 测试（官方 CLAUDE.md 要求的 `Dockerfile.test` 是 contributor 上 CI 时才需要，本地单机跑通即可）
- 不做视频 QA 合规检查（Phase 5 加，复用图文 L6 规则）

### Deferred to Follow-Up Work

- TTS 旁白接入（edge-tts 免费版 + 火山引擎/Azure 付费版的对比测试）
- 第二/第三套模板（实测教程型 / 横评对比型）
- 16:9 横屏长视频（适配 B 站、视频号长视频）
- 视频 QA 合规层（画面截图含境外 logo 的识别、旁白敏感词检测）
- 数字人/真人口播（HeyGen 付费 SaaS 或自建方案）
- 多端自动上传（视频号、抖音、小红书的发布自动化）

---

## Context & Research

### Relevant Code and Patterns

- `package.json` — 现有 `pipeline` / `publish` / `setup` / `test` 命令的注册位置，新增 `video:render` 走同一 scripts 配置
- `scripts/pipeline.js` — Node.js ESM + 命令行参数解析的现有 pattern，generate-video.js 复用其参数风格（位置参数为 `{date}/{slug}` 或逗号分隔列表）
- `config/prompts/scoring.md` / `config/prompts/wechat.md` / `config/prompts/qa-check.md` — Markdown prompt + Chinese 规则文体，video-script.md 同样格式
- `drafts/{date}/{slug}/meta.yaml` — frontmatter/元数据约定，视频产物的状态字段（`video_status`、`video_path`）将来扩展到这里（本 plan 不强制写入 meta.yaml，PoC 期把状态信息记到 `drafts/{date}/{slug}/video/render.log`）
- 现有 `.claude/skills/daily-content-pipeline/SKILL.md` — pipeline 流程编排参考，但**本 plan 不修改它**，视频化是平行命令

### Institutional Learnings

- 4/22 yaml.dump 序列化 date 的 ISO bug（已记录在 xhs-compliance plan 的 Institutional Learnings），本 plan 暂不写 meta.yaml，不受影响；将来 Phase 5 写状态字段时复用 sed 修复 pattern
- 4/23 slug 命名规则（中文+英文品牌 kebab-case，禁止纯拼音），本 plan 新文件命名（`templates/video/xhs-9-16.html` 等）不涉及 slug 生成，不冲突

### External References

- [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) — 主仓库，README + 官方 CLAUDE.md
- [hyperframes-launch-video](https://github.com/heygen-com/hyperframes-launch-video) — 官方完整示例，U3 验证环节直接 clone 跑
- [HyperFrames 文档站](https://hyperframes.mintlify.app/quickstart) — quickstart 和 CLI 参数
- [Video as Code 技术解读](https://blog.nidhin.dev/video-as-code-a-deep-dive-into-heygen-s-hyperframes) — 第三方对架构的拆解，理解逐帧 seek 机制时参考
- 思源黑体 (Source Han Sans CN) — Adobe + Google 联合开发，SIL Open Font License，可商用，本地下载 OTF/TTF
- YouTube Audio Library — BGM 来源，全部 CC0 或免归属

---

## Key Technical Decisions

- **只做 1 套竖屏模板（9:16, 60s）作为 MVP**：横屏、其它时长、其它模板风格全部 Phase 2。理由，避开「同时调多套模板的 CSS」黑洞，PoC 失败时损失最小。
- **MVP 阶段纯字幕 + BGM，不配音**：跳过 TTS 全部决策（音色、API Key、外网访问），先验证「文章 → 视频」的内容压缩是否成立。理由，配音是质量上限提升，不是验证可行性的必要条件；先解决「LLM 抽 6 场景金句」这个真正难点。
- **script.json 由 Claude Code 子代理生成，不写纯脚本规则**：金句压缩、节奏判断、画面文字 vs 旁白文案的分配，规则化几乎不可能；交给 LLM 用 prompt 控制。
- **触发方式 = 独立 npm 子命令**：`npm run video:render -- {date}/{slug}` 或 `... {slug1},{slug2}`。理由，daily pipeline 每天产 10 篇但不是每篇都值得做视频；按需触发 = 人工选高 REACH/带 xhs-version 的 3–5 篇即可。
- **字体和 BGM 进 git，不上 git-lfs**：思源黑体 Regular+Bold 约 12MB，BGM 5–10 首每首 1–3MB 合计 < 18MB，总量 < 30MB 在 git 容忍范围内；上 git-lfs 反而引入「clone 时漏拉」的故障模式。
- **不写入 meta.yaml**：PoC 阶段视频产物的状态信息记到 `drafts/{date}/{slug}/video/render.log`（纯文本时间戳 + 命令 + 退出码），避免和 xhs-compliance plan 的 platforms 字段交织。Phase 5 接入正式管线时再决定是否写 `video_status: approved`。
- **render 失败不重试，soft-fail**：generate-video.js 捕获 hyperframes render 的非零退出码，打印错误到 stderr + render.log，进程退出码 1。理由，PoC 阶段更需要看到失败原因而不是自动重试；调试成本远高于重跑成本。
- **PoC 评估硬门槛**：3 篇里至少 2 篇「不改一行 HTML/CSS、肉眼看着能发」。不达标，整个方向 kill，沉没 4.5 天接受。

## Open Questions

### Resolved During Planning

- Q: TTS 用 edge-tts 还是火山引擎？→ MVP 不接 TTS。理由见 Key Technical Decisions 第 2 条。
- Q: 视频生成是否进 daily pipeline？→ 不。按需触发。
- Q: 字体/BGM 用 CDN 还是本地？→ 本地进 git。理由，headless Chrome 偶发字体回退是有名问题，本地字体最稳；BGM 在 CDN 会引入网络抖动风险。
- Q: script.json 由 LLM 还是规则脚本生成？→ LLM。理由见 Key Technical Decisions 第 3 条。
- Q: 一开始做几套模板？→ 1 套。理由见 Key Technical Decisions 第 1 条。
- Q: 视频产物状态记在哪？→ MVP 记到 render.log，不入 meta.yaml。

### Deferred to Implementation

- script.json 里每场景 `duration` 是 LLM 自己决定还是模板固定（4/10/12/16/13/5 秒）？U4 实现时定，倾向「模板固定 + LLM 只填文字」最稳
- 字幕样式（位置、大小、描边、颜色）做 1 套硬编码还是参数化？倾向硬编码，PoC 看效果再说
- BGM 是固定 1 首还是随机选 1 首？倾向 U5 实现时随机选（避免同质化），但首 PoC 可固定一首便于对比效果
- hyperframes 渲染时的 ffmpeg codec/bitrate 参数是否要调？默认值（H.264 + AAC）能否满足 30MB 上限。U7 实现时实测，若超限再加 `-crf` 调整

---

## Implementation Units

- [ ] U1. **环境准备：Node 22 / FFmpeg / hyperframes 自检**

**Goal:** 确认本地环境满足 hyperframes 运行条件，npm 全局可用 `npx hyperframes`，生成一份环境检测脚本 `scripts/check-video-env.js`。

**Requirements:** R1

**Dependencies:** 无

**Files:**
- Create: `scripts/check-video-env.js`

**Approach:**
- 脚本逻辑（纯 Node.js，无第三方依赖），
  - 检查 `process.version` ≥ v22.0.0，不满足打印升级提示
  - 用 `child_process.execSync('ffmpeg -version', {stdio: 'pipe'})` 检查 FFmpeg，捕获非零退出
  - 用 `child_process.execSync('npx --yes hyperframes --version', {timeout: 60000})` 拉一次 hyperframes，确认能跑
  - 全部通过打印 `[ok] video env ready`，否则非零退出
- 在 README 或 CLAUDE.md 不增加文档（PoC 阶段，用户跑一次脚本就知道）

**Patterns to follow:**
- `scripts/pipeline.js` 的 ESM + `import { execSync } from 'node:child_process'` 风格
- 控制台输出用 `console.error` 报错、`console.log` 报成功，符合 Unix 习惯

**Test scenarios:**
- Happy path: Node 22 + FFmpeg 已装 → 输出 `[ok] video env ready`，退出码 0
- Error path: Node 版本不足 → 打印升级提示，退出码 1
- Error path: FFmpeg 缺失 → 打印 `brew install ffmpeg` 提示，退出码 1

**Verification:**
- 本机执行 `node scripts/check-video-env.js` 退出码 0
- 故意 `nvm use 20` 切到 Node 20，再跑应非零退出并打印明确升级提示

---

- [ ] U2. **素材库进 repo：字体 + BGM**

**Goal:** 思源黑体 Regular + Bold 两份 OTF 文件、5 首无版权 BGM mp3 放入 `templates/video/assets/`，总量 ≤ 30MB。

**Requirements:** R2

**Dependencies:** 无

**Files:**
- Create: `templates/video/assets/fonts/SourceHanSansCN-Regular.otf`
- Create: `templates/video/assets/fonts/SourceHanSansCN-Bold.otf`
- Create: `templates/video/assets/bgm/lofi-calm.mp3`
- Create: `templates/video/assets/bgm/lofi-upbeat.mp3`
- Create: `templates/video/assets/bgm/tech-minimal.mp3`
- Create: `templates/video/assets/bgm/news-energetic.mp3`
- Create: `templates/video/assets/bgm/cinematic-soft.mp3`
- Create: `templates/video/assets/README.md`（说明字体许可证、BGM 来源、商用条款）

**Approach:**
- 字体从 [Adobe Source Han Sans Releases](https://github.com/adobe-fonts/source-han-sans/releases) 下载 OTF（约 6MB × 2）
- BGM 从 YouTube Audio Library 下载，每首 ≤ 3MB（必要时用 `ffmpeg -i input.wav -b:a 128k output.mp3` 压到 128kbps）
- assets/README.md 必须明确，
  - 思源黑体许可证：SIL Open Font License 1.1，可商用
  - 每首 BGM 的原始 URL 和 license（YouTube Audio Library 均为 CC0 或免归属）
  - 提醒：替换 BGM 时必须保持 CC0/CC-BY 且非中国大陆原创版权（避免抖音/视频号被检测下架）
- 用 `du -sh templates/video/assets/` 验证总量 ≤ 30MB

**Patterns to follow:**
- 现有 `config/` 目录的 README 编写风格（中文为主，简洁）

**Test scenarios:**
- Test expectation: 无单测；通过 U4/U7 的渲染产物验证字体可正常加载

**Verification:**
- `ls -lh templates/video/assets/fonts/*.otf` 显示两个 OTF 文件存在
- `ls -lh templates/video/assets/bgm/*.mp3 | wc -l` 返回 ≥ 5
- `du -sh templates/video/assets/` 输出 ≤ 30M
- assets/README.md 含 SIL OFL 字样

---

- [ ] U3. **跑通 hyperframes-launch-video 官方示例**

**Goal:** 在本地（不进 PromptIO repo）clone 官方 launch-video 示例，跑通 preview + render 全流程，确认本机的 hyperframes 渲染链路无问题。

**Requirements:** R1

**Dependencies:** U1

**Files:**
- 无 PromptIO repo 修改；操作在 `~/playground/hyperframes-test/`（或任意临时目录）

**Approach:**
- `cd ~/playground && git clone https://github.com/heygen-com/hyperframes-launch-video.git`
- `cd hyperframes-launch-video && npm install`（如官方用 bun，按 README 走 bun）
- `npx hyperframes preview` → 浏览器打开看到完整视频预览
- `npx hyperframes render` → 输出 MP4，用 `open output.mp4` 看播放正常
- 记录耗时（render 实际秒数）到本 plan 的 Notes 或备忘里

**Patterns to follow:**
- 不在 PromptIO repo 内做这件事，避免污染

**Test scenarios:**
- Happy path: launch-video 渲染出 MP4，能正常播放，无字体回退
- Error path: 渲染失败 → 排查（缺 Chromium / FFmpeg 版本不兼容），fix 后重跑

**Verification:**
- 本机 `~/playground/hyperframes-test/hyperframes-launch-video/output.mp4` 存在且可播
- 输出大小、时长、分辨率符合 launch-video 文档预期

---

- [ ] U4. **9:16 竖屏 60s 模板（templates/video/xhs-9-16.html）**

**Goal:** 一份完整的 HTML 模板，6 场景结构（hook/event/data/opinion/action/outro），用占位符 `{{scene1_headline}}` 等接收 script.json 数据，本地浏览器打开能看到完整视频回放，hyperframes render 能出 MP4。

**Requirements:** R3

**Dependencies:** U2

**Files:**
- Create: `templates/video/xhs-9-16.html`

**Approach:**
- 单文件 HTML，包含，
  - `<style>` 内联 CSS，`@font-face` 加载本地 OTF（路径相对 HTML 文件，如 `./assets/fonts/SourceHanSansCN-Bold.otf`）
  - `<div id="stage" data-composition-id="xhs-9-16" data-width="1080" data-height="1920" data-fps="30" data-duration="60">`
  - 6 个 `<div data-start="..." data-duration="...">` 子节点，按时间表，
    - Scene 1 (Hook): 0–4s，大号标题 + 副标题，BGM 起
    - Scene 2 (Event): 4–14s，事件描述 + 主角图位
    - Scene 3 (Data): 14–26s，2 个关键数字 + 简单 CSS 动效（transform scale + opacity）
    - Scene 4 (Opinion): 26–42s，长引用块 + 头像位
    - Scene 5 (Action): 42–55s，行动建议列表（3 条）
    - Scene 6 (Outro): 55–60s，品牌卡 + 平台 logo 文字（PromptIO 公众号 / 视频号 / 小红书）
  - `<audio data-start="0" data-duration="60" data-volume="0.3" src="{{bgm_path}}"></audio>`
- 占位符约定，**所有占位用 `{{key}}` 双花括号**（generate-video.js 用正则替换，不引入 mustache/handlebars 依赖）
- 字幕样式硬编码在 CSS，位置 bottom 12%，背景半透明黑，字号 56px（1080×1920 下相当于 16:9 的 30px），思源黑体 Bold
- 不使用 GSAP/Lottie/Three.js（PoC 减依赖）；动效全部 CSS keyframes
- 模板末尾不加 JS 控制流（hyperframes 自带 seek 机制按 data-start/data-duration 时间线运行）

**Patterns to follow:**
- 官方 launch-video 示例的 `index.html` 结构（U3 已 clone，参考其字体加载和 audio 嵌入方式）
- HTML 注释明确每个 scene 的 div block 起止

**Test scenarios:**
- Happy path: 浏览器直接打开 `templates/video/xhs-9-16.html`（填好占位的副本）能看到完整 60s 回放
- Happy path: `cd templates/video && npx hyperframes render xhs-9-16.html` 输出 MP4，60s ± 0.5s 时长
- Edge case: 占位符未填完整时浏览器渲染出 `{{key}}` 字面值，肉眼可察觉漏填
- Edge case: 中文字符（含 emoji ☘️🚀）正确渲染，不出现 □ 方框
- Error path: 字体路径错 → 浏览器 console 报 404，渲染产物用默认字体，明显走形

**Verification:**
- 用一份手写 sample script.json（U5 草案）填充模板，浏览器打开能播放完整 60s
- `npx hyperframes render` 输出 MP4 < 30MB
- macOS QuickLook 预览 MP4 字体显示正常（无方框/回退到 PingFang）

---

- [ ] U5. **config/prompts/video-script.md 文章→script.json prompt**

**Goal:** 一份完整的子代理 system prompt，输入文章 markdown，输出严格符合 schema 的 script.json（6 场景，纯字幕版本，**不含 narration 字段**）。

**Requirements:** R4

**Dependencies:** U4（schema 要和模板的占位符严格对齐）

**Files:**
- Create: `config/prompts/video-script.md`

**Approach:**
- 文件结构（参考 wechat.md / qa-check.md 现有风格），
  - 角色设定，「你是 PromptIO 的视频内容编辑，负责把一篇公众号风格的 AI 内容文章压缩成 60 秒竖屏短视频的脚本」
  - 输入契约，原文 markdown 全文 + slug（参数）
  - 输出契约，JSON（严格 schema 见下），无任何额外文字、无 markdown 围栏
  - 6 场景固定时长（4/10/12/16/13/5 秒），LLM 只填文字
  - 文字字数硬约束，
    - hook headline ≤ 16 字，subline ≤ 24 字
    - event headline ≤ 14 字，body ≤ 60 字（≤ 3 行字幕，每行 ≤ 20 字）
    - data 2 个数字 + 各自 ≤ 12 字标签
    - opinion quote ≤ 50 字
    - action 3 条 bullet，每条 ≤ 18 字
    - outro brand_line ≤ 16 字
  - 风格约束，
    - 禁止小红书禁用句式（复用 xhs-compliance Layer 2 禁用词，同步引用 `docs/brainstorms/2026-04-24-xhs-compliance-requirements.md`）
    - 必须保留「我的判断」立场（opinion 场景）
    - 不堆专业名词，每个英文术语首次出现要带 1 句解释（视频读者比图文读者更小白）
  - 失败信号，文章缺少明确的「我的判断」段落或字数 < 800，返回 `{"error": "insufficient_content", "reason": "..."}`
  - Schema 示例（完整 JSON，含所有字段和合法值范围）
- script.json schema（U6 解析时用），

```json
{
  "slug": "string",
  "aspect": "9:16",
  "duration": 60,
  "scenes": [
    {"id": 1, "kind": "hook",    "start": 0,  "duration": 4,  "headline": "...", "subline": "..."},
    {"id": 2, "kind": "event",   "start": 4,  "duration": 10, "headline": "...", "body": "..."},
    {"id": 3, "kind": "data",    "start": 14, "duration": 12, "numbers": [{"value": "3x", "label": "..."}, {"value": "$0.27", "label": "..."}]},
    {"id": 4, "kind": "opinion", "start": 26, "duration": 16, "quote": "..."},
    {"id": 5, "kind": "action",  "start": 42, "duration": 13, "bullets": ["...", "...", "..."]},
    {"id": 6, "kind": "outro",   "start": 55, "duration": 5,  "brand_line": "PromptIO"}
  ],
  "bgm": "lofi-calm.mp3"
}
```

**Patterns to follow:**
- `config/prompts/xhs-compliant.md` 的「角色 → 输入 → 输出 → 规则 → 失败信号」结构
- 字数约束的硬性表达（用「≤ N 字」而不是「尽量简短」）

**Test scenarios:**
- Test expectation: 无单测；在 U8 的 3 篇 PoC 中实测 LLM 输出 JSON 解析成功率（目标 100%）

**Verification:**
- 文件存在，行数 120-200
- 包含 `## 输出契约`、`## 字数硬约束`、`## 失败信号` 三个关键段落
- Schema 示例完整且 valid JSON

---

- [ ] U6. **scripts/generate-video.js 编排脚本**

**Goal:** 一个 Node.js ESM 脚本，输入 `{date}/{slug}` 或逗号分隔列表，编排「读 draft → 调用子代理写 script.json → 填模板 → 调 hyperframes render → 输出 MP4 + render.log」全流程。

**Requirements:** R5

**Dependencies:** U2, U4, U5

**Files:**
- Create: `scripts/generate-video.js`

**Approach:**
- ESM Node 22，无第三方依赖（沿用 pipeline.js 的 import 风格）
- 命令行解析，
  - `node scripts/generate-video.js 2026-05-17/{slug}` 单篇
  - `node scripts/generate-video.js 2026-05-17/{slug1},{slug2},{slug3}` 多篇
- 主流程（按单篇为例），
  1. 解析参数 → 拼路径 `drafts/2026-05-17/{slug}/{slug}.md`（实际路径按现有 drafts 结构确认）
  2. 读文章 markdown，去掉 frontmatter（用现有 gray-matter 或简单正则）
  3. **调子代理写 script.json**，
     - PoC 阶段简化处理：脚本不自己启动子代理，而是 **打印一条指令** `请在 Claude Code 会话里运行：使用 config/prompts/video-script.md 处理 drafts/2026-05-17/{slug}/{slug}.md，输出保存到 drafts/2026-05-17/{slug}/video/script.json`，然后退出码 2
     - 如果 `drafts/.../video/script.json` 已存在，跳过此步直接进 4
     - 这样避免在 generate-video.js 里实现完整的 Claude API 调用；用户在会话里手动跑一次得到 script.json，再次执行 generate-video.js 就能继续
  4. 验证 script.json schema（必有字段、JSON 合法、6 个 scene），失败 → 退出码 3
  5. 读 `templates/video/xhs-9-16.html`，正则替换 `{{key}}` 占位符（全部 scene 字段 + bgm 路径，bgm 路径 = `../../templates/video/assets/bgm/{script.bgm}`）
  6. 写填充后的 HTML 到 `drafts/2026-05-17/{slug}/video/composition/index.html`
  7. 复制 `templates/video/assets/` 整体到 `drafts/.../video/composition/assets/`（hyperframes 渲染时字体路径相对 HTML 文件）
  8. `cd drafts/2026-05-17/{slug}/video/composition && npx --yes hyperframes render` → 输出 MP4
  9. 把 MP4 移到 `drafts/2026-05-17/{slug}/video/output.mp4`
  10. 追加日志到 `drafts/2026-05-17/{slug}/video/render.log`，
     ```
     [2026-05-17T08:30:12Z] command=render slug=2026-05-17/{slug}
     [2026-05-17T08:30:12Z] script_json_size=1240
     [2026-05-17T08:30:12Z] render_started
     [2026-05-17T08:32:48Z] render_finished exit=0 duration_sec=156 output_size_mb=8.4
     ```
  11. 多篇时顺序处理（不并行，避免 Puppeteer 抢资源）
- 错误处理，
  - 任一步骤异常 → stderr 打印错误 + render.log 追加 `error: ...` + 进程 exit(1)
  - 不重试

**Patterns to follow:**
- `scripts/pipeline.js` 的 ESM import + execSync + 文件 IO 模式
- 命令行参数用 `process.argv.slice(2)` 直接读，不引入 yargs / commander
- 退出码语义遵循 Unix 习惯（0 成功，1 错误，2 需要外部输入即 script.json 缺失，3 schema 验证失败）

**Test scenarios:**
- Happy path: 给定 slug，script.json 已存在 → 渲染成功，MP4 输出
- Happy path: 给定 slug，script.json 不存在 → 打印指令并退出码 2
- Happy path: 多篇逗号分隔 → 顺序处理，全部成功
- Error path: slug 不存在 → 退出码 1
- Error path: script.json schema 不合法（缺 scene） → 退出码 3
- Error path: hyperframes render 失败 → render.log 追加 error，退出码 1
- Edge case: BGM 文件不存在 → 退出码 1，错误指明缺哪个 BGM 文件
- Edge case: 输出 MP4 > 30MB → 仅打印警告，不视为失败（PoC 评估阶段决定是否进一步压缩）

**Verification:**
- `node scripts/generate-video.js 2026-05-17/some-slug` 在 script.json 准备好后能产出 MP4
- 故意删 `drafts/.../video/script.json`，脚本退出码 2，提示信息含 `video-script.md`
- 单条端到端耗时 ≤ 5 分钟（不含子代理时间）

---

- [ ] U7. **package.json 注册 video:render 命令**

**Goal:** 通过 `npm run video:render -- 2026-05-17/{slug}` 调用 U6 的脚本。

**Requirements:** R6

**Dependencies:** U6

**Files:**
- Modify: `package.json`

**Approach:**
- 在 `scripts` 块加 `"video:render": "node scripts/generate-video.js"`
- 在 `"video:check-env": "node scripts/check-video-env.js"` 也加上，方便 U1 的脚本调用
- 不改其它字段、不加新 dependencies（hyperframes 用 `npx --yes` 即时拉取，不入 package.json 避免污染既有依赖树）

**Patterns to follow:**
- 现有 scripts 块的命名风格（动词或动词:对象，如 `pipeline` / `publish`）
- `--` 后透传参数是 npm 标准用法

**Test scenarios:**
- Happy path: `npm run video:check-env` 输出 ok
- Happy path: `npm run video:render -- 2026-05-17/{slug}` 等价于直接调脚本
- Edge case: 不传参 → 脚本本身打印 usage（U6 已处理）

**Verification:**
- `cat package.json | grep video:` 至少返回 2 行
- `npm run video:check-env` 退出码 0

---

- [ ] U8. **3 篇 PoC 端到端 + 评估报告**

**Goal:** 挑 3 篇近期 high-REACH draft（且来自不同模板，如「事件解读」「实测」「观点」各 1 篇），跑通完整流程，肉眼评估能否直发，决定 go/no-go。

**Requirements:** R7, R8

**Dependencies:** U1-U7 全部完成

**Files:**
- Create: `drafts/2026-05-{date}/{slug}/video/script.json`（3 份，由 Claude Code 会话生成）
- Create: `drafts/2026-05-{date}/{slug}/video/composition/index.html`（3 份，由脚本生成）
- Create: `drafts/2026-05-{date}/{slug}/video/output.mp4`（3 份）
- Create: `drafts/2026-05-{date}/{slug}/video/render.log`（3 份）
- Create: `docs/brainstorms/2026-05-XX-hyperframes-video-poc-eval.md`（评估报告）

**Approach:**
- 选 3 篇文章原则，
  - 至少 1 篇带 `xhs-version.md`（验证小红书合规版同样能转视频）
  - 至少 1 篇是「事件解读」型（覆盖最常见的内容类型）
  - 至少 1 篇 REACH ≥ 8（验证高价值内容的视频化效果）
  - 优先 openclaw 生态 / NousResearch 相关文章（CLAUDE.md 优先品牌）
- 流程，
  1. 选 3 篇，在评估报告里列 slug + 选择理由
  2. 对每篇，Claude Code 会话里跑「使用 video-script.md 处理 ...」生成 script.json
  3. `npm run video:render -- 2026-05-XX/{slug}` 渲染 MP4
  4. 把 3 个 MP4 上传到本机临时位置，用 QuickTime / VLC 看
- 评估维度（每篇打分 1-5），
  - V1 字体/字幕清晰度（是否方框、是否被截断）
  - V2 节奏（hook 抓人、转场不突兀）
  - V3 文字精炼度（金句压缩有没有失真）
  - V4 视觉一致性（颜色/字号/动效不乱跳）
  - V5 整体「能不能直发」二元判断
- 硬门槛：3 篇里 ≥ 2 篇 V5 = 「能直发」即 go；否则 no-go
- 评估报告必含，
  - 3 篇 slug + 选择理由
  - 每篇的 V1-V5 评分表
  - 每篇 1-2 句改进建议（如「字幕太大遮主体」「opinion 引号字体太细」）
  - go/no-go 结论 + 下一步建议（go → Phase 5 接 TTS / no-go → 关闭方向，记入 wiki/sources/failed-experiments.md）

**Patterns to follow:**
- `docs/brainstorms/2026-04-24-xhs-compliance-requirements.md` 的中文报告体例（带表格 + 案例 + 结论）

**Test scenarios:**
- Happy path: 3 篇全部产出 MP4，至少 2 篇 V5 = 能直发 → go
- Edge case: 1 篇 LLM 输出 schema 不合法 → 退到 U5 调 prompt 后重跑
- Error path: 0–1 篇能发 → 评估报告 + no-go，kill 方向

**Verification:**
- `find drafts -name output.mp4 | wc -l` ≥ 3
- 评估报告存在且含明确 go/no-go 结论
- 报告里至少一句话讨论：是否因 PoC 失败决定 kill，或下一步具体走 Phase 5 哪一步（TTS / 模板扩展 / 接管线）

---

## System-Wide Impact

- **Interaction graph:** 用户/会话 → `npm run video:render` → generate-video.js → 读 draft → 提示生成 script.json（人工在会话内触发子代理） → 填模板 → `npx hyperframes` 子进程 → 输出 MP4。daily pipeline 不被触碰，xhs-compliance 流程也不被影响。
- **Error propagation:** 各步骤独立退出码（1=通用错、2=需要外部输入、3=schema 验证失败）；render.log 是唯一持久化的错误记录；不写入 meta.yaml 也意味着重跑 generate-video 不会损坏现有文章状态。
- **State lifecycle risks:** PoC 阶段不写 meta.yaml，避开和 platforms 字段的并发风险；但要小心 `drafts/{date}/{slug}/video/` 目录创建时不能覆盖任何现有文件（U6 实现里先 `mkdir -p` 再写）。
- **API surface parity:** 不修改任何现有脚本的导出/签名；不新增 runtime 依赖（hyperframes 走 `npx --yes`，字体/BGM 是静态资源）。
- **Integration coverage:** 整条链路通过 U8 的 3 篇 PoC 端到端验证，不写自动化集成测试（PoC 阶段不值得）。
- **Unchanged invariants:** `scripts/pipeline.js`、`scripts/publish.js`（如有）、`config/prompts/*.md` 中除 `video-script.md` 外全部不动；现有 daily pipeline 的 6 步（采集 → 评分 → 生成 → QA → xhs 派生 → commit）一字不改；现有 drafts 的 markdown / frontmatter / meta.yaml schema 全部不动。

---

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| 思源黑体在 headless Chrome 里加载失败/回退到默认字体 | U4 模板里 `@font-face` 必须用相对路径，U3 的 launch-video 验证已能定位字体加载问题；U8 第一篇 PoC 渲染后立刻在 QuickLook 看是否方框/回退 |
| `npx hyperframes` 远程拉取版本变化导致行为不稳定 | U6 在调用时锁版本，`npx --yes hyperframes@<exact-version> render`，版本号 U3 跑通时记录到本 plan 的 Notes |
| BGM 在抖音/视频号被检测为同质化降权 | U2 准备 5 首不同情绪 BGM，U6 多篇渲染时可选择不同 BGM（PoC 阶段先固定 1 首便于对比，后续随机） |
| 字幕字号在 1080×1920 下肉眼觉得太大/太小，每个手机视频号显示不一致 | U4 第一版字号 56px，U8 PoC 评估如果普遍反馈太大，回 U4 改小再跑（不算预算外） |
| LLM 输出 script.json schema 不合法 | U5 prompt 里强约束 JSON 格式 + U6 解析时严格校验 + 失败时打印「请重新生成」指令；不引入自动重试避免循环 |
| 视频金句压缩失真，3 篇里 2 篇看着像 AI 切片 | U8 评估硬门槛 = 至少 2 篇能直发；不达标 kill；不投入 Phase 5 资源 |
| 60s 视频 > 30MB（仅触发警告，不阻断） | U6 的 size 检查产警告；如经常超限，U7 之后 Phase 1.5 调 H.264 crf 参数（暂不在 plan 单元里） |
| 「需要外部输入即子代理生成 script.json」这一步用户体验割裂 | 用 exit code 2 + 明确指令文本，命令打印 `请在 Claude Code 会话里运行：...`；不算质量缺陷而算流程定义，Phase 5 接 Claude API 后才能闭环 |

---

## Documentation / Operational Notes

- 本 plan 完成后**不**修改 CLAUDE.md 主体（避免污染 daily pipeline 描述）；如 PoC go，单独在 CLAUDE.md 增加一段「按需视频化（`npm run video:render`）」简短说明（Phase 5 工作）
- 本 plan 不影响 `.claude/skills/daily-content-pipeline/SKILL.md`
- 若 PoC no-go，把失败原因记录到 `wiki/sources/failed-experiments.md`（如该文件不存在，可不创建，用 git commit message 记录足够）
- U2 的素材许可证文档（`templates/video/assets/README.md`）是 plan 落地的一部分，不可缺
- 字体/BGM 增删都要更新 README，避免后续不知道每个文件的来源和 license
- hyperframes 升级到新大版本时，应重跑 U3 验证兼容性（升级动作不在本 plan 范围内）

---

## Sources & References

- **Origin document:** [docs/brainstorms/2026-05-17-hyperframes-video-generation-research.md](../brainstorms/2026-05-17-hyperframes-video-generation-research.md)
- External:
  - [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes)
  - [hyperframes-launch-video](https://github.com/heygen-com/hyperframes-launch-video)
  - [HyperFrames Quickstart](https://hyperframes.mintlify.app/quickstart)
  - [Adobe Source Han Sans Releases](https://github.com/adobe-fonts/source-han-sans/releases)
- Related code (现有，本 plan 参考但不修改):
  - `scripts/pipeline.js`
  - `package.json`
  - `config/prompts/wechat.md`、`config/prompts/qa-check.md`、`config/prompts/xhs-compliant.md`
- Prior plans:
  - `docs/plans/2026-04-24-001-feat-xhs-compliance-rules-plan.md`（合规 Layer 1-4 体系，本 plan U5 prompt 复用其禁用词表）
  - `docs/plans/2026-04-17-001-feat-content-quality-pipeline-plan.md`（L1-L5 质检体系，本 plan 暂不涉及视频 QA，但 Phase 5 时会复用其结构）
