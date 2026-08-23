---
title: Recraft V4 上架 Replicate：AI 图能导出可编辑 SVG 了
status: draft
date: '2026-07-05'
source: manual
source_url: https://replicate.com/blog/recraft-v4
angle: 给做封面、海报、产品图的读者一个可试方向：不要只看生成图好不好看，还要看文字、构图和后续能不能进设计软件继续改。读者可以用同一组素材对比普通出图和可编辑 SVG 的差别。
voice: narrative
content_lane: creator-workflow
content_archetype: buyer_guide
diversity_note: recent_title_pattern_saturation
reach: 7
tags:
  - Recraft V4
  - Replicate
  - 可编辑SVG
  - AI出图
  - 设计工作流
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Recraft V4 上架 Replicate：AI 图能导出可编辑 SVG 了
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.059
reach_note: Replicate/Recraft 有工具入口，可编辑 SVG 是明确利益点，设计读者能直接试。
selection_reason: 它比普通出图新闻更适合公众号和小红书：可编辑 SVG 连接了生成式图片和真实设计交付，读者能立刻用自己的素材验证。
---

# Recraft V4 上架 Replicate：AI 图能导出可编辑 SVG 了

做封面、海报、产品图的人，不该只问一张图好不好看。

更要问三件事，图里的字能不能读，构图能不能直接放进版面，后面能不能进 Figma、Illustrator、Sketch 继续改。

Recraft V4 已经上架 Replicate，一次给了四个模型，两个输出 WebP，两个输出 SVG。真正值得创作者停一下的，不是又多了一个出图入口，而是它把可编辑 SVG 放进了生成流程。

如果你经常做封面主视觉、产品海报、图标组、品牌插画，这个更新适合放进选型清单。它不一定替代你现在的出图流程，但很适合验证一件事，生成图能不能从灵感稿往交付稿多走一步。

## 判断自己是不是该选它

Replicate 博客对 Recraft V4 的描述很明确，它不是只追求好看，而是强调 Recraft 团队称作 design taste 的东西，也就是构图、光线、颜色这些视觉决策更像被设计过。

这句话对普通看图用户可能有点虚，但对做交付的人很具体。

封面图最怕主体好看但留白不对，海报最怕画面有了但标题塞不进去，产品图最怕材质像了但商业感不稳。Recraft V4 被展示的方向，正好集中在这些场景，包括字体排版、商业产品摄影、宏观材质细节、结构化 SVG 图标组和风格化插画。

所以它更适合这几类人。

- 经常要把图片放进封面和海报，不只是发一张氛围图
- 需要模型处理画面里的英文文字和版面层级
- 想让图标、插画、品牌资产后续能被设计软件继续编辑
- 做产品图时在意材质、光线、构图，而不是只要一张能看的样图
- 想用同一条 prompt 对比 WebP 和 SVG 的交付差异

如果你的需求只是快速生成一张配图，普通位图模型已经够用。Recraft V4 的重点，是后面还有设计动作。

## 把四个版本放进同一张选型表

这次 Replicate 上有四个版本，差别不是名字好听，而是输出格式、分辨率、速度和价格。

官方博客表格给出的信息是这样的。

- Recraft V4 输出 WebP，约 1024px，约 10 秒，$0.04 每张
- Recraft V4 Pro 输出 WebP，约 2048px，约 28 秒，$0.25 每张
- Recraft V4 SVG 输出 SVG，标准规格，约 15 秒，$0.08 每张
- Recraft V4 Pro SVG 输出 SVG，高分辨率，约 30 秒，$0.30 每张

这张表的读法很简单。

社媒配图、概念探索、封面初稿，先选 Recraft V4。你要的是速度和试错空间，不需要一上来追高规格。

印刷物料、大屏展示、细节很多的产品视觉，再看 Recraft V4 Pro。它的定位就是更高分辨率的位图输出。

图标、品牌资产、插画、logo 草案、需要缩放和改路径的东西，优先看 Recraft V4 SVG。Replicate 博客强调，SVG 版本输出的是实际可编辑的矢量文件，包含真实路径、结构化图层和干净几何，不是把位图塞进 SVG 容器。

如果是大尺寸矢量插画、设计系统组件、复杂图标资产，再看 Recraft V4 Pro SVG。

## 别只测好看，重点测能不能改

我认为这次最容易选错的地方，是把 Recraft V4 当成又一个好看的图像模型来试。

那样会漏掉它最关键的场景。

正确的验证方式，是拿同一组素材同时跑位图和 SVG，然后看它们进入后期流程后的差别。不是只看第一眼谁更惊艳，而是看谁更接近可交付。

可以准备三组素材。

- 一张产品海报，包含明确主体、材质要求、背景色和标题位置
- 一张封面主视觉，要求画面留出标题区和信息层级
- 一组 6 个图标，要求统一描边、统一风格、统一强调色

然后用相近 prompt 分别跑 Recraft V4 和 Recraft V4 SVG。位图看构图、质感、文字准确度，SVG 额外看四件事。

- 路径能不能被单独选中和编辑
- 颜色能不能快速替换
- 缩放后边缘是否干净
- 文件进 Figma、Illustrator、Sketch 后是否还保留可调整空间

这个对照比单独看样张更有价值。很多生成图的问题不在生成那一刻，而在设计师接手后的十分钟。

## 文字和构图要单独验收

Recraft V4 的另一个重点，是把文字当成画面结构的一部分处理。Replicate 博客里的示例提到，V4 会把排版、层级、空间关系一起纳入画面，而不是把文字像贴纸一样盖上去。

这对封面和海报很关键。

但文字能力不能只看一张官方样例。真正验证时，建议把文字任务拆细一点，分别测短标题、竖排字、角标、底部信息行、产品名和小字号说明。

如果只是生成一张没有字的产品图，很多模型都能做得漂亮。只有当标题、主体、留白、材质一起出现时，才看得出它是不是真的适合创作者工作流。

这里还有一个实际边界。

SVG 很适合图标、插画、品牌资产和需要缩放的视觉元素，但不代表所有复杂摄影感画面都应该转成矢量。产品精修、真实材质、大量光影细节，WebP 版本可能更符合交付习惯。选型时不要迷信格式，先看最终要交给谁继续改。

## 用一次小样决定要不要接入流程

更稳的做法，是不要把 Recraft V4 直接塞进正式项目。先拿一个低风险小样跑完整流程。

比如做一套活动封面素材，要求一张主视觉、一张产品图、一组图标。主视觉用 WebP，图标用 SVG，再把 SVG 放进设计软件里改一轮颜色、位置和比例。

验收标准也别写得太大。

- 标题区域是否能直接放文案
- 产品主体是否需要大面积重修
- SVG 路径是否真的能编辑
- 同一组图标风格是否一致
- 生成成本和修改时间是否比原流程更可控

只要这五项里有三项明显变好，它就值得继续放在你的视觉流程里。如果只是第一眼好看，但后期改起来仍然费劲，那它更适合做灵感稿，不适合承担交付。

信息来自 Replicate 官方博客和模型页。正式商用前，授权和使用条款仍然要回到 Recraft 的条款页面确认。

这次 Recraft V4 最有价值的地方，不是 AI 图又漂亮了一点，而是它开始回答创作者真正关心的问题，一张图生成之后，还能不能被继续设计。

## 相关链接

- [Replicate 官方博客，Recraft V4 image generation with design taste](https://replicate.com/blog/recraft-v4)
- [Recraft V4 模型页](https://replicate.com/recraft-ai/recraft-v4)
- [Recraft V4 SVG 模型页](https://replicate.com/recraft-ai/recraft-v4-svg)
- [Recraft V4 Pro SVG 模型页](https://replicate.com/recraft-ai/recraft-v4-pro-svg)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
