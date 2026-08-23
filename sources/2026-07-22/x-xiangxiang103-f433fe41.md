---
title: "搞到一个才诞生1天的开源项目，已经快 800 star 了\U0001F525 Wardrobe — 你的 AI 私人衣橱管家 \U0001F454 开发者 @cdngdev 用 OpenAI 最新图像能力做的。你拍一张穿搭照，AI 自动把每件衣服抠出来、建目录、还能换着搭给你看效果。 核心功能： - \U0001F9E0 自动识别衣物 — 传一张穿搭照，自动分出上衣/裤子/鞋子 - ✂️ 智能抠图 — "
source: X @xiangxiang103
url: 'https://x.com/xiangxiang103/status/2078125339495264432'
date: 'Fri Jul 17 14:31:05 +0000 2026'
likes: 175
reposts: 18
replies: 11
source_type: x
language: zh
account_name: xiangxiang103
fetched_at: '2026-07-22T11:04:34.530Z'
---
搞到一个才诞生1天的开源项目，已经快 800 star 了🔥

Wardrobe — 你的 AI 私人衣橱管家 👔

开发者 @cdngdev 用 OpenAI 最新图像能力做的。你拍一张穿搭照，AI 自动把每件衣服抠出来、建目录、还能换着搭给你看效果。

核心功能：
- 🧠 自动识别衣物 — 传一张穿搭照，自动分出上衣/裤子/鞋子
- ✂️ 智能抠图 — OpenAI Images API 把每件衣服抠成产品图
- 🧑‍💼 真人试穿 — 上传一张自拍照，AI 把新衣服"穿"到你身上（建模预览）
- 🎨 自动搭配 — 从衣橱里挑几件，AI 生成搭配 Lookbook
- 📁 数据全在本地 — 原始图、处理后图片、JSON 数据库全在本地 data/ 目录

怎么用：

git clone https://t.co/kw9Za3NBih
cd wardrobe
npm install
# 配好 OPENAI_API_KEY + 一张自拍参考图
npm run dev

有个很骚的操作：它支持 Codex CLI 技能——直接跟 AI 说"把 ~/Pictures/outfits 里的衣服导入衣橱"，它自己就帮你抠图建库了。

值不值得玩？
如果你衣服多、爱穿搭、想让 AI 帮你管理衣橱并预览搭配效果，这项目很香。如果你衣柜就 5 件 T 恤… 那算了😂

🔗 https://t.co/kw9Za3NBih
