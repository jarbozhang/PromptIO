# 把每篇生成内容转成视频，Hyperframes 调研

日期，2026-05-17
状态，调研（未动手）
目标，评估能否把 `drafts/{date}/{slug}.md` 自动转成可发布的短视频（视频号/小红书/抖音），完整列出技术路径、决策点、风险和工作量。

## 1. 背景与目标

### 当前管线终点
现状到 `drafts/{date}/{slug}.md`（或 `xhs-version.md`）就停了，发布形态只有图文。

### 想达到的状态
每天 10 篇文章里挑高分（REACH ≥ 8 或带 xhs-version）的 3–5 篇，自动产出 60–90s 的竖屏短视频，作为图文的二次分发。

### 边界
- 本调研只覆盖"文章 → MP4 文件"这段
- 不覆盖"MP4 → 平台发布"（视频号/抖音/小红书的自动上传是另一个工程）
- 不覆盖真人/数字人口播

## 2. Hyperframes 是什么

仓库，<https://github.com/heygen-com/hyperframes>，HeyGen 开源，Apache 2.0。

### 核心模型
**Video as Code**，一份 HTML/CSS/JS 文件就是一条视频的源码。

```html
<div id="stage" data-composition-id="xyz" data-width="1080" data-height="1920" data-fps="30" data-duration="60">
  <div data-start="0" data-duration="3" class="scene-hook">...</div>
  <img data-start="3" data-duration="5" src="chart.png" />
  <audio data-start="0" data-volume="0.4" src="bgm.mp3"></audio>
</div>
```

引擎做的事，
1. 在 headless Chrome 里加载这份 HTML
2. 按 fps 逐帧 seek、截图
3. FFmpeg 把图序列 + 音轨合成 MP4

### 关键事实

| 维度 | 情况 |
|------|------|
| 许可 | Apache 2.0，可商用 |
| 后端依赖 | 无，纯本地运行 |
| Node 版本 | ≥ 22 |
| 包管理器 | bun（仓库自己开发用，下游用户 npx 即可） |
| 系统依赖 | FFmpeg、Chromium（Puppeteer 会装） |
| Agent 友好度 | 高，官方 CLAUDE.md 有 `/hyperframes`、`/hyperframes-cli`、`/website-to-hyperframes` 等 skills |
| 横竖屏 | 任意宽高，改 `data-width/height` |
| 中文 | HTML 渲染本身支持，需自己装中文字体（思源黑体、OPPO Sans、阿里普惠等） |

### 它不解决的事
- 文章 → 视频脚本/分镜（需要 LLM）
- TTS 旁白（需要外部服务）
- 数字人口播（那是 HeyGen 付费产品，开源版无）
- BGM 选择/版权（要自己准备无版权音乐库）

## 3. 与 PromptIO 管线的契合度

### 契合点
- **markdown 已结构化**，文章模板就是「hook → 事件 → 数据 → 观点 → 行动」，正好对应分镜
- **Claude Code 作为执行器**，hyperframes 官方就是为 agent 设计的，和现有「Claude Code 会话生成」一致
- **本地运行**，和 pipeline.js 一样不依赖外部 SaaS（除非选付费 TTS）
- **Git 作内容数据库**，视频脚本/HTML/MP4 都能落到 `drafts/{date}/{slug}/video/` 下

### 不契合点
- **当前生成器是 markdown 顺序写作**，视频需要从文章反向抽取「6 个 8–15s 的金句」，是一种新的内容压缩任务
- **横竖屏分发要求不同节奏**，文章一篇全平台复用，视频未必（视频号偏静态长一点、抖音/小红书要前 3s 抓人）
- **饱和度高的话题**视频可能比图文更挑剔，重复选题在视频里观感更差

## 4. 推荐架构

### 总览（一篇 markdown → 一条 MP4）

```
drafts/2026-05-17/{slug}.md
        │
        ▼ [Step V1] 视频脚本拆分（Claude Code，prompt: video-script.md）
drafts/2026-05-17/{slug}/video/script.json   # 6 个场景，每个含画面文案 + 旁白文案
        │
        ▼ [Step V2] 旁白 TTS（可选，edge-tts CLI 或火山引擎）
drafts/2026-05-17/{slug}/video/audio/{1-6}.mp3
        │
        ▼ [Step V3] 模板填充（scripts/generate-video.js）
drafts/2026-05-17/{slug}/video/composition/index.html
        │
        ▼ [Step V4] 渲染（npx hyperframes render）
drafts/2026-05-17/{slug}/video/output.mp4
        │
        ▼ [Step V5] QA 人工审核（视频缩略图 + 关键帧 + 字幕预览）
        │
        ▼ 标记 frontmatter video_status: approved
```

### 目录结构（拟）

```
templates/
  video/
    xhs-9-16.html              # 竖屏 1080x1920，60s 模板
    wechat-16-9.html           # 横屏 1920x1080，90s 模板（可选）
    assets/
      fonts/                   # 思源黑体、OPPO Sans
      bgm/                     # 5–10 首无版权 BGM
      icons/                   # logo、品牌素材
config/prompts/
  video-script.md              # 文章 → 6 场景 JSON 的 prompt
scripts/
  generate-video.js            # 编排：读 JSON → 填模板 → TTS → 渲染
  generate-video-batch.js      # 一次跑当日 top-N
```

### 模板结构（6 场景，竖屏 60s 拟）

| # | 场景 | 时长 | 内容 | 视觉 |
|---|------|------|------|------|
| 1 | Hook | 0–4s | 一句最爆点（来自标题或开头） | 大字标题 + 品牌 logo + BGM 起 |
| 2 | 事件 | 4–14s | 发生了什么、谁干的 | 主角图片/截图 + 关键词浮现 |
| 3 | 数据 | 14–26s | 1–2 个关键数字（性能/价格/star 数） | 数字大字 + 动效（GSAP 计数） |
| 4 | 我的观点 | 26–42s | 文章「我的判断」段落金句 | 引用块 + 头像 + 中段字幕 |
| 5 | 行动建议 | 42–55s | 怎么动手（链接/命令/平台） | 命令行截图 / 二维码 / 步骤列表 |
| 6 | 收尾 | 55–60s | 关注 PromptIO + 全平台名 | 品牌卡 + BGM 收 |

### `script.json` schema（草案）

```jsonc
{
  "slug": "deepseek-v4-launch-shuangshijian",
  "duration": 60,
  "aspect": "9:16",
  "scenes": [
    {
      "id": 1,
      "kind": "hook",
      "start": 0,
      "duration": 4,
      "headline": "DeepSeek V4 凌晨发了",
      "subline": "推理 3 倍提速，API 价不变",
      "narration": "DeepSeek V4 凌晨发了，推理三倍提速。",
      "assets": ["logo.svg"]
    },
    {
      "id": 4,
      "kind": "opinion",
      "start": 26,
      "duration": 16,
      "quote": "国产 MoE 这一年走得比预期快，写代码已经够用",
      "narration": "我的判断是，国产 MoE 这一年走得比预期快，日常写代码已经够用。",
      "assets": []
    }
    // ...
  ],
  "bgm": "lofi-1.mp3",
  "subtitle_style": "bottom-large-yellow"
}
```

## 5. 关键决策点

### D1 横屏 vs 竖屏
- **建议**，只做 9:16 竖屏。视频号/抖音/小红书三平台都吃竖屏，B站可后处理加黑边
- 横屏（YouTube/视频号长视频）作为 Phase 2

### D2 要不要旁白
| 方案 | 优点 | 缺点 |
|------|------|------|
| A 纯字幕 + BGM | 最快出活，零 API 成本，无音色违和 | 信息密度全靠字幕，观感弱 |
| B edge-tts 免费配音 | 免费、本地、5 种中文音色 | 微软音色机器味重，长文听感平 |
| C 火山引擎/Azure | 音色自然 | 收费、要 API Key、要走外网（Azure） |
| D ElevenLabs | 顶级 | 贵且中文一般 |

**建议**，先 A（纯字幕+BGM）跑通 PoC，B 作为快速升级，C 留给爆款单篇手动配。

### D3 模板数量
- **建议**，Phase 1 只做 1 套模板（资讯解读型，覆盖 70% 文章）
- Phase 2 视效果加 2 套：实测教程型（步骤列表为主）、横评对比型（数字对比为主）
- 不要一开始就做 5–10 套，会陷在 CSS 调样式里

### D4 中文字体
- **建议**，仓库内打包思源黑体 Regular + Bold（约 12MB），avoid CDN 在 headless Chrome 里偶发字体回退
- 表情/emoji 用 Noto Color Emoji，避免方框

### D5 视频脚本由 Claude Code 还是 pipeline 自动？
- **建议**，和文章生成一样，Claude Code 会话里跑（已有 `/daily-content-pipeline` skill，加一步 Step 6 视频脚本即可）
- 不写成纯脚本，因为「金句压缩」这件事 LLM 的判断比模板抽取靠谱

### D6 BGM 版权
- **建议**，使用 YouTube Audio Library（CC0/无版权）下载 5–10 首循环用，避免在国内平台被检测下架
- 不要用网易云、Spotify 任何带版权的音乐

### D7 渲染时机和耗时
- 单条 60s 1080×1920 @ 30fps，预计本机渲染 30–90s（取决于动效复杂度）
- **建议**，不进 pipeline 主流程，单独 `npm run video:render -- 2026-05-17/{slug}` 按需触发

## 6. 风险

### R1 字体/动效不稳定
HTML 在不同 Chromium 版本下逐帧渲染会有亚像素差异，官方 CLAUDE.md 明确说 golden baseline 必须用 `Dockerfile.test` 跑。对我们影响是「同一份 HTML 不同机器渲染结果可能微妙不同」，PoC 阶段单机搞定不构成阻塞，Phase 2 上 CI 再处理。

### R2 文章 → 6 场景金句的质量
这是整个方案的真正难点。文章 2000 字浓缩到 60s 视频（旁白文案 ≤ 180 字 + 字幕 ≤ 6 句），如果 LLM 抽取的金句不行，视频再精美也没人看。
- 缓解，先在 5 篇高分 draft 上手工撸 6 段 script.json，对比模型抽取版本的差距

### R3 小红书合规叠加视频维度
图文已经有 L6 合规检查，视频还多两个风险，
- 旁白配音"翻墙/玄学"等敏感词更难审（不在文字里）
- 画面截图如果含境外软件 logo（ChatGPT/Gemini）也可能触发
- **建议**，video QA 复用 L6 规则但加一个「画面/旁白二次检查」prompt

### R4 BGM/字体被发现是抓取的
配音 + 模板化视频在抖音/视频号有「同质化降权」机制。
- **缓解**，每天用不同 BGM、模板里随机 2–3 个色彩方案、Hook 句式不要套死

### R5 工作量黑洞
"自动化生成的视频普遍很丑"是真实风险。MVP 跑出来如果效果到不了「可发」级别，沉没成本会大。
- **建议**，PoC 设硬门槛，5 篇里至少 3 篇能直接发，否则停下来重做模板再试

## 7. 工作量估算

| 阶段 | 内容 | 估时 |
|------|------|------|
| Phase 0 环境 | 装 FFmpeg、跑通官方 launch-video 示例、确认中文字体可渲染 | 0.5d |
| Phase 1 模板 | 1 套 9:16 模板 HTML/CSS，6 场景结构，纯字幕版 | 1.5d |
| Phase 2 脚本 | video-script.md prompt，generate-video.js 编排 | 1d |
| Phase 3 PoC | 在 3 篇 draft 上跑通，端到端 commit 一遍 | 0.5d |
| Phase 4 评估 | 看效果，决定继续投入还是 kill | 0.5d |
| Phase 5（条件） | 接 edge-tts、BGM 库、QA 视频维度 | 1.5d |

**MVP 4 天**，**带配音版加 1.5 天**。

## 8. 推荐路径

**先做 Phase 0–4，到 PoC 评估为止**。条件，

- PoC 在 3 篇文章上跑出 MP4，至少 2 篇直接看着能发
- 单条端到端耗时 ≤ 5 分钟（包括 LLM 写 script + 渲染）
- 渲染产物 ≤ 30MB

不满足任一条件，回到设计阶段重做模板或换 TTS 方案。

满足，立刻进 Phase 5，把视频管线挂到 daily-content-pipeline skill 的 Step 6。

## 9. 不进入本期的事

- 真人/数字人口播（HeyGen 付费 SaaS，单独的产品决策）
- 视频自动发布到平台（涉及账号风险、协议变化频繁，单独项目）
- 长视频（>3 分钟）的多镜头剪辑
- AI 视频生成（Sora/Runway/Kling 这条线和 hyperframes 是两件事，未来可叠加但不是本期）

## 10. 已确认决策（2026-05-17）

- **触发方式**，按需触发，不进 daily pipeline 主流程。每天人工/会话内指定 1 篇或几篇 draft 转视频，命令拟为 `npm run video:render -- 2026-05-17/{slug}` 或 `npm run video:render -- 2026-05-17/{slug1},{slug2}`
- **字体/BGM 进 repo**，思源黑体 Regular+Bold（约 12MB）+ 5–10 首无版权 BGM（每首 1–3MB，合计 < 30MB）直接进 git，不上 git-lfs，保持 clone 即用
- **PoC 失败可 kill**，Phase 0–4 跑完后如果 3 篇里 < 2 篇能直接发，整个视频化方向可以停止，沉没 4 天工时接受

## 11. 决策对前面章节的影响

### § 4 触发方式从「daily pipeline Step 6」改为「按需 npm run」
原方案是「挂到 daily-content-pipeline skill 的 Step 6」，按"每天指定几篇"的决策调整为，

- daily pipeline 不变，仍然产出 10 篇 draft + xhs-version
- 视频生成是**独立子命令**，由人工在 Claude Code 会话里说「把今天的 X 和 Y 转视频」触发
- 这样可以避开「重复选题视频化」的浪费，也让 PoC 阶段更轻

### § 4 目录结构补充
```
templates/video/assets/
  fonts/
    SourceHanSansCN-Regular.otf       # 进 git
    SourceHanSansCN-Bold.otf          # 进 git
  bgm/
    *.mp3 (5–10 首)                   # 进 git，文件名带情绪标签如 lofi-calm.mp3
```

### § 7 工作量微调
Phase 0 多 0.5d 准备字体和 BGM 素材库，**MVP 总计 4.5 天**。
