# NVIDIA Nemotron 30B Omni 上 OpenRouter 免费，文图视频音频四模态全收

OpenRouter 这两天悄悄上了一个免费档，叫 nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free。

我盯着模型卡看了两遍才确认没看错，输入支持 text + image + audio + video 四种模态，context 256K，价格栏写的是 $0/M prompt 和 $0/M completion。

OpenRouter 上能同时吃视频和音频的免费模型，我印象里之前一个都没有。Gemini Flash 系列免费档勉强算，但视频要走 Files API 自己绕，音频也不算原生。这次 NVIDIA 直接把"视频+音频+图像+文本"四个口子全打开，还给免费名额，是有点反常。

## 这模型到底是个什么东西

先把名字拆开。Nemotron 是 NVIDIA 自家的开源系列，3 Nano Omni 是其中一条多模态线。30B-A3B 是 MoE 架构，总参数 30B，激活参数只有 3B。

Mamba2-Transformer 混合架构，再加 Conv3D 处理视频。视觉编码器是 NVIDIA 自家的 C-RADIO v4-H，音频编码器是 Parakeet。基座沿着 Qwen3-VL-30B-A3B-Instruct 一路调下来，训练里还混了 Qwen3.5-122B、Qwen2.5-VL-72B、GPT-OSS-120B 的合成数据。

训练数据 354M 样本、约 717B token，七成是 text+audio 对，两成是 text+image，剩下的是 video 和 video+audio。

最关键的一句话在模型卡的开头，"designed to function as a perception and context sub-agent in enterprise agent systems"。

它的官方定位不是给你聊天用的通用助手，是 NVIDIA enterprise agent 体系里负责"看见、听见、读懂"的那个子模块。你想想看，主 agent 调度任务，这个 omni 模型负责把摄像头画面、会议录音、PDF 截图、UI 截屏全部解析成文本，再交给规划层。

这个定位很重要，后面我会解释为什么。

## 我自己在脑子里跑了几个用例

我没有 Blackwell B200，但 OpenRouter 直接给免费 API，我就拿手头几个真实场景对着模型卡的能力清单挨个比。

**场景一，给短视频自动出中文字幕加要点。** 模型卡写视频最长 2 分钟，1080p 最多 128 帧 1FPS，720p 最多 256 帧 2FPS。两分钟正好覆盖一条小红书或抖音视频。把 mp4 直接丢进去，开 use_audio_in_video，让它一次性把画面里的字+人声+背景音都拿到，省掉先抽音频走 ASR 再走 OCR 那套流水线。模型卡提到视频 throughput 比"vision + speech 分离 pipeline"高 2 倍、算力低 2.5 倍，这正是它合并管线的收益。

**场景二，PDF 图表问答。** OCRBenchV2 跑 67.04，比上一代 Nano VL V2 的 54.8 高了 18%。Charxiv 图表推理 63.6，前代 41.3。我手头有一份港股研报 PDF，里面塞了二十多张折线和柱状图，每张都需要"图里 2024Q3 的环比增速是多少"这种细问。这种活我以前是 GPT-4o 做的，现在有个免费的 256K context 版本可以摸一摸。

**场景三，听播客自动做笔记。** 音频上限 1 小时，采样率 8kHz 起，开 enable_thinking 让它走 reasoning 模式，输出长摘要+时间戳。我估计这个用例里它会比 Whisper+GPT 这条传统链路顺手，因为不用自己拼上下文。

我还没真的把每条都跑完，但光是"OpenRouter 一个 API key、四模态、免费、256K"这个组合，已经够我把上面三条都迁移过来试一轮。

## 社区在聊什么

OpenRouter 的 Discord 频道里这个模型上线第一天就被钉到了 #new-models，有人贴了 PDF 截图问答的 demo，反馈是"图表识别比 Llama 3.2 Vision 准、但速度慢"，这跟它默认开 reasoning budget 16384 token 有关，不是模型本身慢。

r/LocalLLaMA 那边重点在量化版本。BF16 是 61.5GB、FP8 砍到 32.8GB、NVFP4 砍到 20.9GB，平均损失只有 0.4% 左右。20.9GB 这个数字意味着单卡 4090（24GB）刚好能塞下 NVFP4 版本本地跑。这条线讨论比 OpenRouter free 还热，因为本地化派的人觉得"反正都开源了，OpenRouter 的免费档只是入门饵，真要用还是自己部署 NVFP4 不限速"。

X 上做多模态 agent 的几个开发者关注的是 OSWorld 跑分。47.4 比前代 11.1 高出 4 倍多。OSWorld 是 GUI 自动化基准，分高意味着这个模型能看懂屏幕截图，知道按钮位置和点击逻辑。这正是 NVIDIA 把它定位成"perception sub-agent"的核心证据，浏览器 agent、桌面 agent 这条赛道它要切进去。

HN 上有一条评论扎到我，"NVIDIA finally has a model that's actually good *and* permissive"。NVIDIA Open Model Agreement 是允许商用部署的 license，全球可用。

## 我的判断

我认为 NVIDIA 这次走"开源模型 + OpenRouter 免费"是培育 enterprise 客户的钩子，不是慈善。

逻辑是这样。这个模型最佳运行环境是 Blackwell B200 和 Hopper H100/H200，NVFP4 量化也是 NVIDIA 自家的格式。开发者在 OpenRouter 免费档把 prompt 调通、把多模态 pipeline 搭起来，最后要上生产、要长 context、要低延迟、要高并发，自然会买 NVIDIA 的卡或者上 NVIDIA NIM。OpenRouter 这一段是"试用期"，把你的代码和习惯绑死在 Nemotron 调用约定上。

但这不影响我们用它。坦率讲，免费 256K 四模态在 2026 年 4 月这个时间点，OpenRouter 上没有第二个。Gemini 系列免费档有视频但要绕，Qwen 多模态没免费档，DeepSeek-VL 没视频。Nemotron 这个口子开多久不知道，趁还在的时候把能迁的工作流先迁过来。

还有一个我得罪人的判断。"Omni 模型"这个概念被吹了一年多，从 GPT-4o 到 Gemini 2.0 Flash 到一堆开源仿品，真正能在生产里跑的不多。原因不是模型不行，是没人愿意为"看视频+听音频"付溢价。NVIDIA 选择把它定位成 sub-agent 而不是 chat model，是承认了这件事。它不跟 ChatGPT 抢用户，它去当 agent 链路里那个不被用户感知的眼睛和耳朵。

这个定位比"我又做了一个对标 GPT-4o 的通用 omni 模型"诚实。

## 你可以现在做的

去 OpenRouter 找 nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free 这个 model id，绑一个 API key。先用图像问答试一张你手头的 PDF 截图，再用 video_url 丢一段两分钟以内的 mp4，最后用 audio_url 丢一段 30 秒会议录音。三个用例跑下来，你大概就知道它能不能替掉你现在某条多模态链路。

如果想本地跑，等社区出 NVFP4 的 GGUF 或者 Ollama 包，4090 单卡可以塞。模型卡提到 vLLM 0.20.0+、SGLang、llama.cpp 都已经支持，意思是这周内会有不少教程冒出来。

OpenRouter 免费档总归有限速，真正要扛流量的活，还是得想清楚自己愿意为这双"机器眼睛"出多少钱。

## 相关链接

- 模型卡，https://openrouter.ai/models/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free
- HuggingFace 仓库，https://huggingface.co/nvidia/Nemotron-3-Nano-Omni-30B-A3B-Reasoning
- NVIDIA Open Model License，HuggingFace 仓库内附

---
相关实体:: [[nvidia|NVIDIA]] | [[nemotron|Nemotron]] | [[openrouter|OpenRouter]]
相关主题:: [[multimodal|多模态]] | [[ai-pricing|AI 定价]] | [[agent-frameworks|Agent 框架]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
