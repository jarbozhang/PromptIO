# Microsoft 把 VibeVoice 开源了，标榜 Frontier Voice AI 一天涨 757 颗星

一天 +757 颗星，仓库说明只有一行字，Open-Source Frontier Voice AI。

发出来的人是 Microsoft 官方，repo 名叫 VibeVoice。我刷到的时候第一反应是揉了揉眼睛，因为这家公司在语音生成这条赛道上已经安静太久了。微软自己最响亮的 TTS 项目还停留在 VALL-E 那篇论文，模型从来没真正开源过权重，给人留的印象就是"会发论文，不发模型"。

这次反着来了，模型在 Hugging Face 上挂着，license 是 MIT。

我顺着 README 翻了一圈，发现 Frontier 这个词不是营销话术，是把它放到一个明牌的位置上对标顶级闭源 TTS。如果你最近在做播客生成、有声书、对话式 agent，或者只是被语音 API 的账单刷过脸，这一篇值得花十分钟读完。

## 一个仓库塞了三个模型

VibeVoice 不是单一模型，是一个家族。

最大的那个叫 VibeVoice-ASR，7B 参数，做长语音识别，README 写支持单次跑 60 分钟音频，50 多种语言，能识别说话人，能打时间戳，能塞 hotwords 提升专业术语识别率。

中间那个 VibeVoice-TTS，1.5B 参数，做多说话人 TTS，单次最长输出 90 分钟，最多 4 个说话人。这个尺寸是真的很友好，1.5B 的语音模型跑在消费级显卡上完全没问题。

最小的 VibeVoice-Realtime，0.5B，主打实时流式合成，README 标的延迟是 300 毫秒左右。这个数字如果属实，已经够做实时对话 agent 了。

三个模型共享一个底层架构，连续语音 tokenizer 跑在 7.5 Hz 这种极低帧率上，再叠 next-token diffusion 和 LLM。坦率讲帧率压到 7.5 Hz 是这次最有意思的工程选择，等于把语音压成了"几乎是文本"的稀疏序列，长音频的算力消耗能掉一个数量级。

90 分钟单次 TTS 输出，背后就是这个低帧率撑起来的。

## 中文能跑，但要注意是哪个模型

这是中国独立开发者最关心的问题。我把三个模型的语言支持挨个对了一遍。

ASR 模型是全语种通吃，中文在第一梯队。TTS 模型 README 直接列了英文和中文，还提到 cross-lingual 能力，意思是用一个英文 voice prompt 也能合成中文，反过来也行。Realtime 那个 0.5B 是个例外，官方列了 9 种语言，里面没有中文，主打欧洲语种和日韩。

所以场景拆开看，长文本 TTS 跑中文播客、有声书、视频配音，1.5B 那个能直接用。要做实时中文对话 agent，目前这一版要么等微软更新，要么自己拿 1.5B 那个改改流式推理。

我的判断是 1.5B 这个 TTS 模型才是这次开源里对中文用户价值最大的那一块。

## 拿来跑的几个路径

最快能动手的方式不是 git clone，是直接去 Hugging Face 找 microsoft 组织页面，三个模型权重都在上面。配合 transformers 库或者 vLLM 之类的推理框架直接加载，跟跑一个普通 LLM 没本质区别。

如果你只想先听听效果，微软挂了一个 ASR 的在线 playground，地址 aka.ms/vibevoice-asr，浏览器直接打开就能上传音频测试，这个是最低门槛的尝鲜路径。Realtime 模型还附了一个 Colab notebook，照着跑就能听到流式语音输出。

本地部署的话，1.5B 的 TTS 模型按经验大概 6 到 8GB 显存能跑起来推理，3060 12GB 之类的卡就够了。0.5B 的 Realtime 模型门槛更低，4GB 显存级别的卡都能塞下。7B 的 ASR 大一些，但 ASR 不是高频 inference 场景，单卡批处理跑得动就行。

国内拉权重慢的问题，HF 镜像站 hf-mirror.com 之前一直能用，魔搭社区估计这两天也会有人搬运过去。

## 社区在讨论什么

GitHub issues 这两天涌进来的提问，基本集中在三件事。

第一件是 voice cloning，能不能给一段 5 秒钟的样本然后克隆任意人声。从 README 的描述看 TTS 模型是支持 voice prompt 的，但官方对克隆能力的描述非常克制，特意在文档里加了一段关于 deepfake 风险的免责声明，原话是"不推荐未经进一步测试就用于商业部署"。

第二件是延迟，0.5B Realtime 标的 300ms 是不是真的，这个还没看到第三方独立 benchmark，等几天会有人测出来。

第三件是和阿里通义实验室的 CosyVoice 系列、上海 AI Lab 的 OpenVoice 怎么比。这俩国产开源 TTS 在中文社区已经有相当成熟的生态，VibeVoice 进来要解决的不是"能不能跑"的问题，而是"凭什么换"的问题。我自己的判断是 VibeVoice 在长音频和多说话人这两个具体场景上有差异化优势，90 分钟单次输出是个相当激进的设计目标，国产开源里目前没有对标的。

但日常做 5 到 30 秒的短文本配音，CosyVoice 在中文上更熟更稳，没必要换。

## 我担心的一件事

写到这里我想说一句不一定讨喜的话。

微软这次开源的姿态非常漂亮，但 README 里那段 deepfake 免责声明我读了三遍，看得出来内部法务有顾虑。这种顾虑会不会变成下一步的功能阉割，比如克隆能力被限制，或者权重在某个点被悄悄替换成"安全版"，是我接下来会持续盯的事。

开源 TTS 这个赛道，模型权重一旦放出来就收不回去，但仓库本身、issue 区、demo 地址这些都是微软可以随时撤的。

所以你如果真的想用，今天就把权重拉下来存好。

## 行动建议

三件事，今天就能做完。

第一，去 Hugging Face 搜 microsoft/VibeVoice，把 1.5B TTS 那个权重 clone 到本地或者你自己的对象存储里，不到 10 分钟。

第二，打开 aka.ms/vibevoice-asr 那个 playground，传一段中文音频，看一下识别质量到不到你的产品要求。

第三，如果你手上有需要 30 分钟以上长语音生成的项目，比如有声书、长播客、知识付费课程，把 VibeVoice-TTS 加到你的候选列表里和 CosyVoice 跑一次盲测。

回到开头那 757 颗星。一天涨这么多不是因为微软的招牌响，是因为社区憋了太久没等到一个能塞下整本书的开源 TTS。

Frontier 这个词最终落不落得住，要看这周末第三方测评出来之后大家还愿不愿意继续点星。

## 相关链接

- VibeVoice 仓库, https://github.com/microsoft/VibeVoice
- Hugging Face 模型权重, https://huggingface.co/microsoft
- ASR 在线 playground, https://aka.ms/vibevoice-asr
- 项目主页, https://microsoft.github.io/VibeVoice
- HF 国内镜像, https://hf-mirror.com

---
相关实体:: [[microsoft|Microsoft]]
相关主题:: TTS | [[multimodal|多模态]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
