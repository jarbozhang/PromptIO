---
title: Google 的 AI 训练数据开关变了，普通用户现在该检查哪些设置
status: draft
date: '2026-07-07'
source: manual
source_url: https://techcrunch.com/2026/07/06/if-you-use-google-youre-training-its-ai-heres-how-to-opt-out/
angle: 从隐私设置变化切入，整理 Google 账号里和图片、文件、音频、视频相关的数据使用选项。读者看完可以立刻检查自己的账号设置，降低不必要的数据暴露。
voice: analytical
content_lane: risk-postmortem
content_archetype: safety_review
diversity_note: recent_entity_saturation
reach: 9
tags:
  - Google
  - 数据隐私
  - AI训练
  - 账号设置
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Google 的 AI 训练数据开关变了，普通用户现在该检查哪些设置
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.027
reach_note: Google 品牌强，隐私风险有明确利益点，读者可马上检查设置。
selection_reason: 这是普通用户也关心的风险提醒，能补足当天不全是开发者工具的内容结构。
---

# Google 的 AI 训练数据开关变了，普通用户现在该检查哪些设置

如果你常用 Google Lens 拍图搜索，用 Translate 练口语，或者在 Google App 里用语音搜索，这次隐私设置更新值得马上看一眼。

变化点不只是某个按钮换了名字。TechCrunch 7 月 6 日报道，Google 的 Search Services History 和 Personalized Recommendations 设置更新后，图片、文件、音频、视频记录这类媒体数据，可能进入保存和模型改进路径。

读完这篇，你要做的不是恐慌删号，而是把账号里和媒体、搜索历史、个性化推荐有关的开关检查一遍，减少没必要的数据暴露。

## 把媒体入口纳入同一张风险图

这次更新由 Google 在 6 月通过客户邮件宣布。它影响的不只是 Google Search，还包括 Maps、Shopping、Flights、Hotels、Translate 和 News 这些搜索服务。

最容易被忽略的是媒体数据。TechCrunch 提到，用 Google Lens 拍图搜索时，图片可能被保存。用 Search Live 或语音搜索时，音频记录也可能被保存。用 Google Translate 做口语练习时，音频同样在范围内。

Google 在邮件和帮助文档里的表述都指向同一件事，已保存媒体可用于开发和改进 Google 服务与技术，包括 AI 模型和安全措施。这里的风险不是服务突然不可用，而是你原本只当成一次搜索的材料，被放进了更长的数据使用链条。

## 找出最容易漏掉的失效路径

第一条失效路径，是只改 Web & App Activity。过去很多人把它当成搜索历史的大总闸，但 TechCrunch 提到，Google 把 Web & App Activity 和新的 Search data 设置拆开了，新的搜索数据设置默认开启。你只调整旧入口，不一定会影响搜索服务的新设置。

第二条失效路径，是只检查文字搜索。真正敏感的内容往往在图片、文件、语音和视频里，比如屏幕截图、文档附件、会议录音、翻译练习。对 AI 产品来说，这些内容比普通关键词更有上下文，也更容易带上个人信息或业务信息。

第三条失效路径，是把自动删除当成退出训练。Google 提供 3 个月、18 个月、36 个月的自动删除周期，但保留多久和是否保存，是两类控制点。如果目标是降低暴露，先看是否保存 Search Services History 和 Save Media，再决定保存周期。

## 把控制点放在三个入口

把这次检查当成一次账号级安全审查，不要只凭记忆判断自己以前关过什么。

- 打开 Search Services History 设置页，确认 Search Services History 当前状态。
- 如果不需要保存媒体数据，取消 Save Media。它和 Search Services History 可以分开处理。
- 如果不希望搜索服务历史被保存，就连 Search Services History 一并关闭，而不是只处理媒体子项。
- 打开 Search Personalization 页面，检查 Personalized Recommendations 是否有必要继续开启。
- 进入 My Activity 的更多设置，顺手检查 Web & App Activity、Timeline、YouTube History 等旧入口。
- 如果仍然需要保留历史，至少把自动删除周期改成符合你风险接受度的选项。

这里的判断标准很朴素。拍商品包装、路牌、公开展板，和上传合同、证件、客户截图、会议音频，不是同一种风险。前者可能只是便利性问题，后者会变成隐私和业务边界问题。

## 用上线前验证清单留证

如果你只是个人用户，跑完上面三个入口就够。如果你维护团队账号、演示机、客服流程或资料检索流程，就需要多做一步，把设置检查写进上线前验证。

- 账号维度，确认每个常用 Google 账号都检查过 Search Services History。
- 内容维度，把图片、文件、音频、视频分开看，不要用一个总判断覆盖所有材料。
- 流程维度，凡是会上传客户材料、内部截图、会议音频的步骤，都要确认有没有替代入口或脱敏动作。
- 保留维度，自动删除周期只解决保存时长，不解决是否进入保存路径。
- 复查维度，换设备、新建账号、团队成员变更后，重新跑一遍设置检查。

我认为，这次更新最值得警惕的地方，不是 Google 公开说会用数据改进 AI，而是设置边界被拆成多个局部开关。普通用户真正需要的是控制面清楚，知道哪些内容可以方便地搜，哪些内容不该顺手丢进搜索服务。

处理顺序就按这条线走，Search Services History，Save Media，Personalized Recommendations，More Activity。这个顺序跑完，至少不会因为记住了一个旧开关，漏掉已经拆出来的新设置。

## 相关链接

- TechCrunch 原文，[If you use Google, you're training its AI](https://techcrunch.com/2026/07/06/if-you-use-google-youre-training-its-ai-heres-how-to-opt-out/)
- Google Search Services History 设置，[myactivity.google.com/search-services/settings](https://myactivity.google.com/search-services/settings)
- Google Search Personalization 设置，[google.com/search-personalization](https://www.google.com/search-personalization/)
- Google My Activity 更多设置，[myactivity.google.com/more-activity](https://myactivity.google.com/more-activity)
- Google 官方帮助文档，[Search Services History 与 Personalized Recommendations](https://support.google.com/websearch/answer/17025248)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
