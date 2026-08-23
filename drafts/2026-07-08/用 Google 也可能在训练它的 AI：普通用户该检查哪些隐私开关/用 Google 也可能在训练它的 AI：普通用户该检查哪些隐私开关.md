---
title: 用 Google 也可能在训练它的 AI：普通用户该检查哪些隐私开关
status: draft
date: '2026-07-08'
source: manual
source_url: https://techcrunch.com/2026/07/06/if-you-use-google-youre-training-its-ai-heres-how-to-opt-out/
angle: 从 Google 隐私设置变化切入，整理普通用户和创作者应该立刻检查的账号、文件、图片、音视频数据开关。重点不是恐慌，而是把可验证的设置入口和取舍讲清楚。
voice: analytical
content_lane: risk-postmortem
content_archetype: safety_review
diversity_note: recent_entity_saturation
reach: 9
tags:
  - Google
  - 隐私设置
  - AI训练
  - 数据安全
  - 账号审计
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 用 Google 也可能在训练它的 AI：普通用户该检查哪些隐私开关
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.074
reach_note: Google 是强品牌，隐私数据使用是高利益点，读者能马上打开账号设置检查。
selection_reason: 这是当天少数面向普通用户也有直接行动价值的风险题，能平衡开发者工具类选题过多的问题。
---

# 用 Google 也可能在训练它的 AI：普通用户该检查哪些隐私开关

Google 这次隐私设置变化，最该看的不是「能不能完全不用」，而是哪些输入会被保存、哪些会进入 AI 改进链路。

如果你经常用 Google Lens 拍图搜物、用 Translate 练口语、在 Search Live 里说话，或者把文件传进搜索相关功能，这篇可以当一次账号审计表。

对创作者更直接，未发布图片、客户素材、脚本音频和视频草稿，最好不要默认当成普通搜索输入处理。

TechCrunch 在 2026 年 7 月 6 日报道，Google 通过 2026 年 6 月的客户邮件更新了 Search services 的隐私设置。Google 帮助文档也写明，Search Services History 现在可能包含交互里的图片、文件、音频和视频，并可用于改进服务，包括训练生成式 AI 模型。

## 圈出会被保存的入口

这次变化覆盖的不只是 Google Search。Google 文档列出的 Search services 包括 Search、Maps、Shopping、Flights、Hotels、Translate 和 News。

风险面不在「搜一个词」。真正容易被忽略的是多模态输入。

Google Lens 的图片，Search Live 和语音搜索录音，Translate 口语练习音频，上传到 AI Mode 或 Ask Maps 里的图片和文件，都可能落在 Search Services History 或 Save Media 相关设置里。Google 文档还说明，保存的历史可能包含 AI Mode 或 Ask Maps 的生成式 AI 响应、浏览点击、一般位置和设备相关信息。

如果这些材料只是日常查询，风险可控。如果里面有客户图、未发布商品图、合同截图、会议录音、身份证明文件或创作草稿，性质就变了。

## 把失效路径拆到账号动作

这不是一个「开了就危险，关了就安全」的二元题。更准确的失效路径有四条。

- 旧设置迁移，新设置沿用你之前对 Web & App Activity 和 Search Personalization 的选择。Google 文档说相关设置会分批推出，界面不一致时仍由 Web & App Activity 控制。
- Save Media 开着，图片、文件、音视频会随 Search Services History 保存。关掉 Save Media 只影响未来媒体保存，不会自动删除过去已经保存的媒体。
- 只关 Personalized Recommendations，不等于关历史保存，也不等于删除数据。它主要影响搜索服务里的个性化推荐和 AI 回答是否基于你的账号信息。
- 删除原始活动也不是万能撤回。Google 文档说，已经被选入训练的数据会先与账号断开关联，并可保留最长 4 年。

这里的工程结论很简单，隐私控制要看数据生命周期，不只看界面按钮。

## 只保留必要的控制点

普通用户可以从三个开关开始查。

第一，打开 Search Services History 设置。这里决定搜索服务交互是否保存到账号历史。关闭后，未来搜索服务活动不会用于训练生成式 AI 模型，除非你主动反馈。

第二，检查 Save Media 子设置。如果你不需要回看 Lens 图片、Search Live 录音或上传文件记录，可以取消勾选。Google 文档明确说，关掉它后，未来媒体不会作为 Search Services History 的一部分保存，但文字历史、语音转写和部分生成式 AI 响应仍可能继续保存。

第三，看 Personalized Recommendations in Search services。这个开关影响搜索结果、信息流和 AI 响应是否基于账号画像、活动、保存内容和一般位置做个性化。关闭它不会删除历史，也不会影响其他 Google 服务的个性化设置。

创作者还要多看一层。Google 文档说明 Save Media 不覆盖 Gemini Apps、Google Voice、NotebookLM、YouTube 等其他服务。不要以为一个搜索开关能管住整个账号。

## 上传素材前做一次小审计

这份清单适合在发作品、交客户文件或处理素材前跑一遍。

- 个人账号，检查 Search Services History、Save Media、Personalized Recommendations，按你是否需要历史回看和个性化推荐决定保留范围。
- 创作者账号，避免把未发布图片、商业素材、合同截图、人物音视频直接丢进搜索相关入口做临时处理。
- 共用设备，确认浏览器里当前登录的是哪个 Google Account，Google 文档提到多账号或共用设备可能导致历史进入另一个账号。
- 已保存数据，进入 My Activity 查看 Search Services History，必要时删除历史和保存媒体，并设置自动删除周期。
- 其他活动，继续检查 Web & App Activity、Timeline、YouTube History、Gemini Apps Activity，因为 Search Services History 关掉后并不会覆盖这些入口。
- 工作或学习账号，界面和权限可能由管理员控制，看到入口不一致时要按组织规则确认。

我的判断是，这次最该建立的习惯不是「每个开关都关掉」，而是把输入分级。普通搜索可以换取便利，私密素材和客户材料应该默认走更受控的工作流。

对多数人来说，今天最值得做的动作只有一个，打开 My Activity，把 Search Services History 和 Save Media 看一遍。看到不认识的媒体记录，就顺手处理掉。以后每次把图片、文件、录音交给搜索入口前，先问一句，这个东西能不能出现在账号历史里。

## 相关链接

- [TechCrunch 原文](https://techcrunch.com/2026/07/06/if-you-use-google-youre-training-its-ai-heres-how-to-opt-out/)
- [Google Search Services History 与 Personalized Recommendations 说明](https://support.google.com/websearch/answer/17025248)
- [管理 Search Services History](https://support.google.com/websearch/answer/17024959)
- [管理 Save Media](https://support.google.com/websearch/answer/17028154)
- [Google My Activity](https://myactivity.google.com/search-services/settings)
- [Search Personalization 设置入口](https://www.google.com/search-personalization/)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
