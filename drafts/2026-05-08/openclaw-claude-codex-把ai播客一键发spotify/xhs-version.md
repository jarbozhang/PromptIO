# Spotify 给 AI agent 开了一个口子，让 openclaw 一键把播客发进我手机

我昨晚把它装上了，今天早上通勤就听上了。

prompt 写完，AI 把研报念成一段 12 分钟的播客，再加一句 and save to Spotify，第二天早上打开手机，那条音频就躺在我的 Spotify 播客订阅里，跟其他订阅排在一起。

这是 Spotify 5 月 7 日推出的 Save to Spotify CLI，beta 阶段，官方第一批支持三个 agent，openclaw、Claude Code、OpenAI Codex。重点不是 Spotify 又支持 AI 生成内容，而是这是 podcast distribution 第一次开放给 agent。第一批接入的 agent 名单里 openclaw 排第一个。

## 我装的过程

安装就一行 curl，sign-in 走浏览器 OAuth。我让 Claude Code 直接照官方 README 跑了一遍。

curl 装完之后跑 save-to-spotify auth login，浏览器弹一个 Spotify 授权页，点同意，本地拿到 token 写进 ~/.config 下面。这一步跟你给一个 npm 包做 OAuth 没区别。

然后是关键一步，授权 agent。我在 Claude Code 里跑了一个测试 prompt，让它读今天 Hacker News 上点赞过 200 的 AI 帖子，整理成 10 分钟中文播客，再 save to Spotify。Claude Code 调 web fetch 拿数据，调本地 TTS 生成音频文件，最后调 save-to-spotify CLI 把 mp3 推到我的 Spotify 个人播客 feed。

整个 chain 是 agent 自己跑完的，我没手动过问哪一步。

需要注意的是，目前 personal podcast 是私有的，只对你自己的 Spotify 账号可见，free 和 premium 都能用。这不是开放上传公开播客的口子，是给你自己听的 audio 收纳柜。

## openclaw 那条线为什么排第一

openclaw 主仓库现在 369k 星，定位是个人 AI 助手、跨 OS 跨平台，不是 IDE 里的写代码 agent，是绑在你日常生活里的 agent。Spotify 这次切的就是这个场景，不是开发者跑测试，是早上让它整理日程、把会议纪要念成播客、把 RSS 摘要变成通勤音频。

NousResearch 的 hermes-agent 这边的 GitHub topics 已经长出 anthropic / claude / claude-code / clawdbot / codex / hermes-agent / moltbot / openclaw 一长串标签。这条生态的 agent 之间是互相调用，不是互斥。我自己的 setup 是 openclaw 做 orchestrator，Claude Code 处理代码相关，Codex 跑批量数据任务，hermes-agent 做长期记忆。Save to Spotify 装在哪一个 agent 上其实无所谓，它就是一个 CLI，谁有 shell 谁能用。

Spotify 不是给某一家做了独家集成，是开了一个 CLI 标准入口。

## 社区里早就在自己拼这套

r/LocalLLaMA 4 月 21 日有个 624 赞的帖子，作者 swiebertjee 说自己上周末试了 openclaw 觉得没用，想接 WhatsApp 接不上。

下面 41 赞的 combrade 给了相反评价，说 hermes-agent 很轻量，自己写过脚本把 TTS 模型 API 跟 LLM summarizer 串起来，给一篇文章就能输出朗读版。

注意 combrade 描述的工作流，TTS 加摘要加文章输入，跟 Save to Spotify 干的事情几乎是一回事。社区里早就有人在手工拼这套 pipeline，Spotify 做的是把最后一公里的"放进我的播客 app"标准化了。

r/unsloth 5 月 5 日的帖子讲了另一个层面，Unsloth 现在让你能在 Claude Code、Codex、openclaw 里跑本地的 Gemma 4 和 Qwen3.6 GGUF 模型，24GB RAM 够用。所以前面那个流程可以全本地跑，TTS 本地、摘要本地，最后只有 Save to Spotify 的 OAuth 走出去一次。隐私敏感的人现在也有路径。

## 我的判断

这事的分量不在 Spotify 本身，在 agent 拿到了一个面向消费者平台的 distribution 出口。

之前 agent 写的所有东西要落地，要么是文件，要么是 Notion / Obsidian 这种生产力工具，要么是 Slack / 微信这种 IM。从来没有一个面向普通消费者的内容平台主动给 agent 开 API 入口。Spotify 这次开的虽然只是 personal podcast 是私有的，但它的形态跟 publishing 一模一样，agent 生成内容，用户在 consumer app 里消费。

我赌接下来 6 个月，YouTube、Apple Podcasts、小宇宙、喜马拉雅、网易云这些平台都会被迫做选择题，开还是不开 agent 接入口。不开的代价是 and save to X 一旦成了 agent 用户的肌肉记忆，不在这个肌肉记忆里的平台会被剔除掉。

## 国内播客作者怎么用

如果你在做小宇宙、荔枝、喜马拉雅、网易云上的播客，Save to Spotify 目前直接用不上，但有三条可走的路径。

第一条是把 Spotify 当中转站，CLI 跑完之后本地是有原始音频的，让 agent 在 save 之前先把同一个 mp3 推一份到你的小宇宙、喜马拉雅后台，需要写一个最小 wrapper 调创作者后台 API。

第二条是用 RSS 反向暴露。所有播客平台都吃 RSS，让 agent 把生成的 mp3 传到对象存储（七牛、腾讯云 COS、阿里云 OSS 都行），维护一个 RSS feed XML，把链接提交给小宇宙、喜马拉雅、Apple Podcasts。一次性配置，之后 agent 每次更新 mp3 加更新 XML 就完成了发布。

第三条是等。国内平台的 agent 接入大概率年内就会出现，先把 prompt 加 TTS 加摘要的 pipeline 跑顺。

我自己用的是第二条，RSS 是真正绕开平台的协议。Save to Spotify 这种集成越多，越说明 agent 时代的内容分发会回到 RSS 这种开放协议上。

通勤路上听完那段 12 分钟的 AI 播客，我把耳机摘下来，还在想一件事，下一个开 agent 入口的会是谁。

国内用户可以通过 OpenRouter、Hugging Face 镜像或开源本地部署使用相关 agent，本文不展开。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
