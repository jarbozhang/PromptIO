---
title: baoyu-design 能自动给 PPT 配图了，Agent Skill 开始补上内容交付的最后一块
status: draft
date: '2026-06-19'
source: manual
source_url: https://github.com/JimLiu/baoyu-design
angle: 从 PPT、网站、视频脚本这些内容交付场景切入。以前 Agent 生成结构和文案，配图还要人手动找；现在设计 Skill 可以调用生图 Skill，把图片放进 PPTX，后续还能继续编辑。
voice: first-person
reach: 8
tags:
  - Agent Skill
  - PPT
  - 内容交付
  - AI配图
  - baoyu-design
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: baoyu-design 能自动给 PPT 配图了，Agent Skill 开始补上内容交付的最后一块
wechat_title: ''
cover:
  status: skipped
reach_note: 职场和创作者场景直观，GitHub 可验证，和本项目内容生成链路也有强相关。
selection_reason: 这是本地 Skill 生态的新可交付案例，不是重复介绍生图工具。
---

# baoyu-design 能自动给 PPT 配图了，Agent Skill 开始补上内容交付的最后一块

如果你经常让 Agent 写 PPT、网站文案、视频脚本，最卡的通常不是文字，而是配图。

结构能出，标题能出，页面也能排，但最后一到“这里放什么图”，人还是要回去找素材、改尺寸、塞进页面。这个环节很碎，也很伤交付速度。

baoyu-design 这次更新，我觉得值得单独记一笔，因为它不是又多了一个生图入口，而是把“配图”塞回了 Agent Skill 的工作流里。

## 先看它解决哪一段交付断点

baoyu-design 本来做的是把 Claude Design 能力封装成本地 Agent Skill。按照仓库 README，它可以在 Cursor、Claude Code、Claude Desktop、Codex 等本地 agent 里用，用来生成 UI mockup、交互原型、wireframe、landing page、dashboard、mobile app 和 slide deck。

产物是自包含 HTML，保留在本地项目里。这一点对做交付的人很关键，因为你不是拿到一段漂在聊天窗口里的回答，而是拿到一个可以继续改、继续放进项目目录的文件。

这次新增的重点，是做 PPT、动画视频或网站时，baoyu-design skill 可以调用 AI 生图能力配图。用 Codex 时可以调用内置画图工具。用 Claude Code 时，可以配合 baoyu-image-gen skill，通过 Codex CLI 画图。

我更关心的是 PPT 这条线。作者强调，生成 PPT 时可以自动在合适位置插入配图，并且连图片一起导出为 PPTX，后续还能用 PowerPoint 或 Keynote 二次编辑。

这就把 Agent 从“写稿助手”往“交付助手”推了一步。

## 把它放进 PPT、网站、视频脚本三类任务

我会优先把 baoyu-design 放在这三类场景里看，而不是把它当成单纯的设计工具。

- PPT 提案，先让 Agent 生成结构、页面节奏和配图占位，再用生图 Skill 补视觉素材，最后导出 PPTX 继续精修
- 网站初稿，让 Agent 同时处理页面结构、首屏表达、模块布局和主题图，不再只给一份裸 HTML
- 视频脚本，把分镜、画面方向和关键视觉一起生成，后面再交给视频工具或人工剪辑
- 产品说明页，先产出可浏览的 HTML，再根据需要转成汇报页或演示稿

这里的价值不是“AI 会画图”。会画图的工具已经很多了。

真正有用的是，Agent 知道这一页要表达什么，知道图片该放在哪个段落附近，也知道最后要给你一个可以二次编辑的交付形态。

## 这里最容易踩坑

我的判断是，别一上来就期待它替你完成一份可以直接发给客户的完整 Deck。

更稳的用法，是把它当成“第一版内容交付生成器”。它帮你把结构、文案、版式、配图放到同一个文件里，你再做业务事实校对、品牌规范调整和视觉精修。

尤其是 PPT 场景，图片自动插入不等于图片一定准确。AI 生图适合做概念图、场景图、氛围图、抽象产品表达，但如果你需要真实产品截图、客户 logo、数据图表、合规素材，还是要走可验证素材源。

还有一个细节，PPTX 可继续编辑这件事很重要。很多 AI 设计工具最后给的是一张图或一个封闭页面，看起来漂亮，但改一个标题、换一张图都很麻烦。baoyu-design 这条路线的优势，是保留后续编辑空间。

## 用一个最小任务验证它

如果你准备试，我建议别从“大而全的品牌发布会 PPT”开始。先用一个很小的交付任务压测它。

可收藏的验证清单可以这样定。

- 选一个 6 页以内的 PPT 主题，例如产品更新、融资汇报、功能方案
- 让 Agent 先生成 slide deck，而不是只生成大纲
- 检查每页是否有清楚的表达目标，不要只看视觉好不好看
- 观察配图是否贴合页面语义，尤其是封面、场景页、转场页
- 导出 PPTX 后，用 PowerPoint 或 Keynote 改一轮标题、图片和页面顺序
- 把最终文件交给一个真实读者看，问他能不能在 30 秒内说出主线

这个流程跑通，比研究十个生图参数更有价值。

因为 Agent Skill 的关键不是单点能力，而是能不能把多个能力串成一次交付。

## 下一步看 Skill 会不会变成内容团队的工具箱

baoyu-design 这次更新给我的启发，是 Agent 应用的边界正在从“完成一个技术动作”变成“完成一个内容任务”。

以前我们让 Agent 写结构、写文案、生成页面。图片这块留给人，是因为它涉及审美、语义和上下文。现在设计 Skill 调用生图 Skill，把图片放进 PPTX，至少说明这块开始被纳入自动化链路。

我不会把它理解成设计师可以被替代。更现实的判断是，内容交付会变成两段式，Agent 先给出一份结构完整、图文齐全、可编辑的初稿，人再做判断、删减和风格统一。

如果你做的是产品方案、销售材料、课程讲义、技术分享，这类工作流值得尽早试。不是为了省掉最后 20% 的审美精修，而是先把最耗人的前 60% 搭起来。

下一个动作很简单，去看 baoyu-design 的 README，再拿一个真实 PPT 题目跑最小闭环。重点不要放在“图漂不漂亮”，而是看它能不能把结构、文案、图片和可编辑文件一起交到你手上。

## 相关链接

- baoyu-design 仓库 https://github.com/JimLiu/baoyu-design
- baoyu-image-gen Skill https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-image-gen
