# Lightricks 把 LTX-2 开源了，19B 音画联合还能本地训自己的 LoRA

我刷 GitHub Trending 时被 Lightricks/LTX-2 这个仓库晃了一下眼。

不是因为它今天涨了 78 颗星，是因为它仓库描述里那行字，"Official Python inference and LoRA trainer package for the LTX-2 audio–video generative model"。

audio–video 一起生，还配了官方 LoRA 训练包。这两件事单独拿出来，最近半年开源视频模型里都很少同时给齐。

## 先把它跟你熟悉的几个国产模型摆在一起

阿里的 Wan2.5 是闭源在线服务，质感是国内目前能直接用的天花板之一，但你拿不到权重。

腾讯 HunyuanVideo 开源，13B 左右，主要是文生视频，没有音画联合。

智谱 CogVideoX 5B 这一代是最容易在消费级卡上跑起来的开源视频模型，但同样不带音轨。

Lightricks 这家以色列公司国内不太熟，他们的 C 端产品是 Facetune 和 Videoleap，今年把 LTX-Video 开源到了 2.3 这一代，参数从最早 2B 涨到现在的 22B。这次新出的 LTX-2 仓库是 19B 这一档，定位更像是"可训练的开发者基线"。

## audio–video 联合到底是个什么东西

我自己做过一段时间剪辑，最烦的是这套流水线，文生视频生一段无声画面，再丢 ElevenLabs 配 BGM 或者用 Suno 配音乐，最后回 CapCut 对齐口型。三段工具三套提示词，对一次轴半小时没了。

LTX-2 的 pipeline 里直接有 `A2VidPipelineTwoStage`，输入一段 audio 文件，输出口型对得上画面对得上节拍的视频。反过来也行，文生视频时它一次会同时返回 `video_latent` 和 `audio_latent`，最后送进 vocoder 出声。

模型卡上自己承认了一个限制，没有人声的纯环境音生成质量会差一点。说人话就是这一代更适合做角色对白、唱跳、节奏剪辑这类音画强相关的内容，不太适合纯空镜配氛围音。

## 本地能不能跑得动

这是我看每个开源视频模型第一个问的问题。

仓库的训练 README 写得很直白，"Nvidia GPU with 80GB+ VRAM" 是标准训练配置，"For GPUs with 32GB VRAM (e.g., RTX 5090), use the low VRAM config"。也就是 5090 这一档消费卡能进 LoRA 训练流程，A100/H100 才是顺手档位。

推理这边好一些。它支持 sequential CPU offload、model CPU offload 和 VAE tiling 三件套，再叠一个 fp8 量化（`--quantization fp8-cast`），24G 显存的 4090 跑 768×512、121 帧（5 秒 24fps）是能压进去的。如果只是想看效果不想折腾，仓库里还有个 `ltx-2-19b-distilled-lora-384` 蒸馏版，8 步推理。

我的初步判断，自己有 4090 的可以本地玩推理，要训 LoRA 还是去租云卡更实在，AutoDL 上 A100 80G 一小时不到 10 块，训完一个 LoRA 也就十几块的事。

## 本地训 LoRA 才是这次的真正卖点

Lightricks 的训练包支持三种 LoRA 路线，motion（动作风格）、style（视觉风格）、likeness（人或物的"长相+声音"）。最后这个是有意思的，因为他们把 sound 也写进了 LoRA 训练目标里。你给一段你自己讲话的素材，理论上能训出一个"长得像你 + 声音像你"的小模型。

对国内创作者，这套东西能落到几个具体场景。

B 站二创和虚拟主播，训一个固定的角色 LoRA，从此你的视频里都是同一个虚拟形象，不用每次抽卡赌脸；抖音原创素材，训一个自己的视觉风格 LoRA，让所有片子有统一调性，平台算法识别"作者画像"会更稳；小红书 vlog，把自己常出镜的家、宠物、常用产品训成 LoRA，往后写脚本生镜头不再依赖实拍；电商商品视频，训一个商品 LoRA 之后，换场景换光影只需要换 prompt，比请模特拍 360 度展示便宜得多。

官方说"less than an hour in many settings"训完一个 LoRA。我估计这是 80G 卡 + 标准配置的数字，5090 + low VRAM 配置的实际时间会拉长，但一晚上跑完应该问题不大。

## 最小工作流

我把它整理成四步，按这个顺序走基本不踩坑。

第一步装环境。`git clone` 仓库后用 `uv sync --frozen`，比 pip 干净很多。文本编码器要单独下 Gemma 3，模型权重去 huggingface.co/Lightricks 拉 `ltx-2-19b-dev` 或 fp8 版本。

第二步跑文生视频 demo。直接用文档给的 `LTX2Pipeline.from_pretrained` 那段 13 行代码，prompt 写"a beautiful sunset over the ocean"先验证全链路通，注意 `width`/`height` 必须是 32 的倍数，`num_frames` 必须是 8n+1。

第三步准备 LoRA 训练数据。如果训角色或商品 LoRA，准备 5–20 张同一对象的不同角度图片或几段短视频片段；如果训风格 LoRA，准备 20–50 张同风格画面。带音频的 LoRA 需要原始视频段落，不能只给静态图。

第四步训练 + 推理。用 `ltx-trainer` 的 low VRAM 配置文件起训，训完得到一个 LoRA safetensors，加载回 `LTX2Pipeline` 时用 diffusers 的 `load_lora_weights` 接口挂上去，再生成新视频时你的角色或风格就稳定输出了。

## 我会怎么用它

我自己手上没有 80G 卡，所以打算先在 4090 上把 fp8 推理跑通，做几条 5 秒短片验证音画同步效果，再上 AutoDL 的 A100 训一个自己常用商品的 LoRA，看看能不能解决我那个"商品视频太贵又千篇一律"的老问题。

如果你是做短视频代运营、虚拟主播、独立电商的，这次的 LTX-2 我建议你优先级排到本周。开源视频模型的"可本地训练 + 音画联合"这一档，目前确实没有更好的备选。Wan2.5 闭源、Hunyuan 没音轨、CogVideoX 量级太小、Veo 3.1 Lite 是 API 不能动权重。

我们前几天写过 Pixelle-Video 那种"全自动短视频引擎"和 Veo 3.1 Lite 的便宜 API。这次 LTX-2 是另一条路，前者帮你省时间，LTX-2 帮你建壁垒。LoRA 训出来是你的，模型权重在你硬盘里，平台改规则也削不走你这部分能力。

## 相关链接

- 仓库，https://github.com/Lightricks/LTX-2
- HuggingFace 模型集合，https://huggingface.co/Lightricks
- LTX-2 模型卡，https://huggingface.co/Lightricks/LTX-2
- LTX-2.3 升级版（22B），https://huggingface.co/Lightricks/LTX-2.3
- Distilled LoRA（8 步推理），https://huggingface.co/Lightricks/ltx-2-19b-distilled-lora-384

实体 [[lightricks|Lightricks]] [[ltx-2|LTX-2]] [[wan-video|Wan]] [[hunyuan-video|HunyuanVideo]]
主题 [[ai-video|AI 视频]] [[multimodal|多模态]] [[creator-economy|创作者经济]] [[lora-training|LoRA 训练]]

<!-- REACH: 7/10 | 品牌一般（Lightricks 国内认知低，但 LoRA 训练是强信号） 利益点✓（开源+本地训自己的角色/商品 LoRA+音画联合） 可操作✓（仓库+训练包+四步工作流齐备） -->
