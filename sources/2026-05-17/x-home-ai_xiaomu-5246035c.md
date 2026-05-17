---
title: "我用这个爬虫把哥飞公众号上面所有的文章都爬下来存到本地obsidian里了，挺好用。 用此方法你可以爬取任何一个人的公众号合辑👇 https://t.co/sDIzTPVsOr"
source: "X home @ai_xiaomu"
url: "https://x.com/ai_xiaomu/status/2055461558860537963"
date: "2026-05-16T01:33:18.000Z"
likes: 478
reposts: 93
replies: 23
tweet_id: "2055461558860537963"
author: "ai_xiaomu"
---
我用这个爬虫把哥飞公众号上面所有的文章都爬下来存到本地obsidian里了，挺好用。

用此方法你可以爬取任何一个人的公众号合辑👇 https://t.co/sDIzTPVsOr

Quoted tweet:
@4vR2d: opencli plugin — opencli-weixin-album
获取微信公众号合集（Album）的所有文章列表，生成 Markdown 索引文件。
不知道为啥 opencli 官方把单个微信 url 下载做了，却不做集合下载的。既然你们不做，那交给我吧，花了半小时 vibe 了一个。

功能
1.无需 Cookie、无需浏览器，直接调用微信 API 获取合集文章列表
2.支持自动翻页（cursor-based），可获取合集中的全部文章
3.生成 Markdown 表格索引文件，包含标题、URL、本地路径（预留给后续下载）、发布时间
4.每次翻页 1-3 秒随机暂停，避免触发限流

安装
opencli plugin install github:SlowGrowth1314/opencli-weixin-album

使用
opencli weixin download-album \
  --url "https://t.co/X50T1Ua74V"

git: https://t.co/Bpi2jRRXWQ
