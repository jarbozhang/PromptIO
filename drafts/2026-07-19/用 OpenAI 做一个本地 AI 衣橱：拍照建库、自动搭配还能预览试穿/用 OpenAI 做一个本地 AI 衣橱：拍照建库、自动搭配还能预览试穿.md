---
title: 用 OpenAI 做一个本地 AI 衣橱：拍照建库、自动搭配还能预览试穿
status: approved
date: '2026-07-19'
source: manual
source_url: 'https://github.com/tandpfun/wardrobe'
angle: 从官方仓库的真实代码、构建结果和两个内置工作流出发，拆解照片建库、自动搭配和试穿预览如何落地，以及“本地衣橱”真正本地和不本地的边界。
voice: analytical
content_lane: creator-workflow
content_archetype: repository_walkthrough
diversity_note: recent_entity_saturation
reach: 9
tags:
  - OpenAI
  - AI衣橱
  - 图像生成
  - 本地数据
  - 穿搭管理
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 用 OpenAI 做一个本地 AI 衣橱：拍照建库、自动搭配还能预览试穿
wechat_title: ''
cover:
  status: skipped
wechat_cover:
  status: approved
  path: wechat-media/01-wechat-cover-235x100.png
  aspect_ratio: '2.35:1'
  width: 1923
  height: 818
body_images:
  - status: approved
    path: wechat-media/02-body-pipeline-3x2-v2.png
    after_heading: 一张穿搭照，最后会拆成哪些数据
    aspect_ratio: '3:2'
  - status: approved
    path: wechat-media/03-body-review-3x2.png
    after_heading: 它不是“一键抠图”，而是一条带审核的生产线
    aspect_ratio: '3:2'
  - status: approved
    path: wechat-media/04-body-local-cloud-3x2-v2.png
    after_heading: “本地衣橱”本地在哪里
    aspect_ratio: '3:2'
qa:
  l4_pass: true
  l1_violations: 0
  l2_score: 8
  l3_score: 8
  l5_score: 8
  l6_pass: true
  xhs_pass: true
  overall_pass: true
  review_path: qa-review.json
recent_similarity: 0.026
reach_note: OpenAI 品牌明确，衣橱整理和试穿预览利益直观，项目可克隆后立即运行。
selection_reason: 它把图像 API 落到了普通用户容易理解的生活场景，同时具备开源代码、本地数据和可复现实操路径。
publish:
  wechat_browser:
    status: draft_created
    appmsgid: '100000086'
    cover_verified: true
    body_images_verified: true
    body_image_count: 3
    verified_at: '2026-07-20T04:30:20.144Z'
---

# 用 OpenAI 做一个本地 AI 衣橱：拍照建库、自动搭配还能预览试穿

很多“AI 穿搭”产品只给你一张效果图。Wardrobe 更有意思的地方，是把衣服真正变成一套可以继续编辑的数据：原始照片、单件衣物、人物试穿图、导入任务和 JSON 衣橱库，都落在本机的 `data/` 目录里。

我把它的官方仓库拉下来做了构建验证。项目使用 Node.js 22+、React 19 和 Vite 6；安装 143 个依赖后，生产构建成功，4615 个模块完成转换，生成的主脚本约 273 KB。这个结果只能证明项目目前可以安装和编译，不代表我已经上传个人照片跑完图像 API。下面的能力边界，来自仓库 README、配置文件和两个内置工作流的交叉核对。

## 一张穿搭照，最后会拆成哪些数据

Wardrobe 的入口不是“输入今天穿什么”，而是一张已经穿在身上的照片。仓库说明的处理链条分成四步。

1. OpenAI Responses API 识别照片中的每件衣物。
2. OpenAI Images API 将衣物重建为干净的单品图。
3. 审核通过的单品写入 `data/library.json`，图片复制到 `data/imported/`。
4. 用户需要时，再以人物参考照和单品图生成试穿预览。

这比普通相册多了一层关键结构。衣物不是只剩一张图片，而是带有名称、类别、主色、辅助色、标签和来源照片的记录。内置导入工作流只允许五类：上装、外套、下装、配饰和鞋；相同文件再次导入时，会用内容生成稳定 ID，更新记录而不是反复制造重复单品。

## 它不是“一键抠图”，而是一条带审核的生产线

项目把衣物导入做得相当谨慎。工作流先盘点照片，再为每件衣服建立清单，选取最能看清结构的局部参考图，然后生成纯色背景的完整衣物，最后去除背景并检查透明通道。

审核标准不只是“看起来像”。衣物颜色、面料、轮廓、图案、拉链和标识都必须有原图证据；不确定的口袋、文字和装饰宁可省略，也不能由模型补想象。人物皮肤、头发、衣架、其他叠穿衣物和场景必须清除。无法可靠恢复结构的衣服会被标记为暂缓，而不是硬塞进衣橱。

这解释了为什么它同时保留原图、任务记录和生成图。生成式抠图可能把背景清得更漂亮，也可能悄悄改掉袖口或图案。保留证据链，才有机会在批量导入前发现问题。

## 自动搭配不是随机抽几件衣服

第二个内置工作流读取 `data/library.json`，要求每套搭配恰好包含一件上装和一件下装，外套、鞋和配饰可选。它会检查颜色关系、视觉重量、轮廓和叠穿是否合理，并避免反复使用最容易搭的中性色单品。

搭配结果会写入 `data/outfits.json`，每套包含名称、场景、所用单品 ID、选择理由和生成图片路径。生成试穿图时，人物参考照排在第一位，随后依次提供本次搭配用到的衣物图；验收时还要核对人物身份、每件衣物是否出现、颜色和结构是否漂移，以及手脚和叠穿关系是否自然。

这里的“预览试穿”更适合回答两个问题：颜色放在一起是否协调，整体轮廓是否值得真的试一次。它不能证明尺码合身，也不能还原面料垂坠、弹性和触感。

## “本地衣橱”本地在哪里

仓库把数据库和图片保存在本机，这是它最明确的优势。默认配置包括：

```text
衣橱数据库：data/library.json
导入单品：data/imported/
搭配清单：data/outfits.json
人物参考照：data/model-reference.png
视觉识别模型：gpt-5.4-mini
图像模型：gpt-image-2
```

但“保存在本地”不等于“处理完全离线”。识别、衣物重建和试穿预览仍要调用 OpenAI API，穿搭照和人物参考信息会参与云端处理。仓库明确要求把 `data/` 和人物参考照排除在 Git 之外，这能减少误提交，却不能替代上传前的隐私判断。

更稳妥的做法，是使用背景简单、没有家人、证件、屏幕和住址信息的专用照片。人物参考照也不必从家庭相册随手挑，单独拍一张更容易控制暴露范围。

## 跑起来需要什么

官方启动方式是：

```bash
git clone https://github.com/tandpfun/wardrobe.git
cd wardrobe
npm install
cp .env.example .env
npm run dev
```

然后在 `.env` 中填写自己的 `OPENAI_API_KEY`，并把 PNG 人物参考照放到 `data/model-reference.png`。未完成这两项时，导入功能保持禁用。Web 界面默认打开 `localhost:5173`。

项目还附带两个 Codex 工作流，一个负责从指定照片目录提取并导入衣物，另一个负责从现有衣橱生成指定数量的搭配。它们不是隐藏的云端账号能力，而是仓库内可检查的流程文件。

## 成本不能只数最终图片

仓库没有提供“一套衣服多少钱”的固定数字，所以不适合编一个单价。一次导入至少可能涉及视觉识别、单件衣物生成和可选人物试穿；之后每生成一套 Lookbook，又会增加图像调用。失败重试和质量设为 high 时，成本还会继续上升。

实际核算应按任务记录拆开：识别调用多少次、生成了几件单品、重做了几张、又生成了几套搭配。先拿一套边界清楚的上衣、裤子和鞋验证，远比一开始把整个相册交进去更容易看清费用和质量。

## 我的判断

Wardrobe 真正值得借鉴的，不是“AI 帮你穿衣服”这句宣传，而是它把生成式图像塞进了一个可审核、可回滚、可继续编辑的数据流程。单品有来源，失败项可以暂缓，搭配引用真实的衣物 ID，最终产物仍留在自己的目录里。

它也没有消除生成模型的老问题：衣物细节会漂移，试穿效果不是尺码证明，照片处理并非完全离线，成本会随单品数和重试次数增长。若这些边界可以接受，它适合做一个个人数字衣橱；若你要求服装细节百分之百一致，或不允许照片参与云端处理，它就不合适。

这类项目是否有用，不取决于第一张试穿图有多惊艳，而取决于一个月后，你还能不能准确找到那条裤子，并知道它和哪些衣服真正搭过。
