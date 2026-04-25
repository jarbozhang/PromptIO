# Unsloth 出 WebUI 了，本地跑 Gemma 4、Qwen3.5、DeepSeek 一个图形界面搞定

凌晨刷 GitHub Trending，看见 Unsloth 仓库一天涨了 200 多颗星。

点进去一看，标题改了，多了一行字，"Web UI for training and running open models like Gemma 4, Qwen3.5, DeepSeek, gpt-oss locally"。

我盯着那行字看了几秒，才反应过来这事的分量。

Unsloth 是过去一年 LoRA 圈最火的 Python 库，"2x faster, 70% less VRAM"是他们的招牌话术。以前要用它，得会写 Python，会装 CUDA，会调 LoRA 参数，会从 HuggingFace pull 模型。现在他们直接把这一整套塞进了一个浏览器界面，一行 curl 命令装好，本地起一个网页就能开训。

对中国独立开发者来说，那结果会怎样。

## 这个 WebUI 到底能干什么

先说我自己最关心的，它不是只能"跑模型"，是"跑+练"两件事都能。

下载 GGUF、加载 LoRA、跑推理，是一件事。这件事 LM Studio、Ollama 都做得不错，市场上不缺。

但 Unsloth Studio 把另一半也接进来了，下载完模型直接在同一个界面里启动微调任务，loss 曲线、显存占用、tokens/s 实时画在网页上。训完导出 GGUF 或者 safetensors，再切回推理 tab 装载，闭环。

支持的模型清单挺夸张，他们说覆盖 500+ 开源模型，重点点名了 Gemma 4、Qwen3.5、Qwen3.6、DeepSeek、gpt-oss、Llama 3.1/3.2、Mistral 系列。基本上你在 HuggingFace 能找到的主流开源模型，它都吃。

训练这边除了 LoRA，还支持全参数微调、强化学习、FP8 训练。Triton 自定义算子、多卡训练、tool calling 自愈、沙箱代码执行，基本是把过去一年开源圈攒出来的能力打了个包。

## 装起来比想象的简单

我看了下安装文档，简单到有点反常识。

macOS / Linux / WSL 用户，一行命令。

```
curl -fsSL https://unsloth.ai/install.sh | sh
unsloth studio -H 0.0.0.0 -p 8888
```

Windows 用户用 PowerShell，一行 irm。

跑完浏览器打开 localhost:8888，就是那个 WebUI。

我没在 4090 上验证，但根据他们文档里"2x faster, 70% less VRAM"这个反复出现的数字反推，24GB 显存的 4090 跑 Qwen 7B 的 LoRA 微调是绰绰有余的，14B 也大概率能跑，32B 量化后看运气。

M2 Max 用户先别激动，目前 macOS 端只支持 chat 和 data recipes 两个功能，训练靠 MLX 后端，他们说"coming soon"。你想想看，苹果 Silicon 想本地微调还得再等等，但本地推理是没问题的。

## 这事最值得说的，是门槛

我做过一段时间 LoRA 微调，知道这条路过去对小团队有多劝退。

环境是第一道坎，CUDA 版本对不上、PyTorch 装不进去、bitsandbytes 报奇怪的错，能耗掉一个新手一整个周末。第二道坎是数据格式，instruction、completion、chat template，每个模型一套规矩。第三道坎是参数，rank、alpha、learning rate、warmup steps，没经验全靠瞎试。第四道坎是看不见过程，loss 是降是升、显存够不够、模型有没有过拟合，都得你自己 print。

Unsloth 之前已经把第一二三道坎打掉了一大半，他们的 notebook 在 Colab 上跑得很顺，参数也给了合理默认。但 notebook 这个交互方式本身就有门槛，对纯做应用的开发者来说，看见 Jupyter 界面还是会怵。

WebUI 的意义就在这。把 notebook 换成网页表单，把 print 换成实时图表，把 import unsloth 换成点击按钮。对于一个会用 ChatGPT 但没写过 Python 的产品经理、设计师、小红书博主，他第一次有了"我也能微调一个自己的模型"的可能性。

这是一个挺重要的拐点。

## 社区在讨论什么

GitHub 上这一周 issue 涨得很快，我扒了一下，有几个反复出现的话题。

第一个是 Apple Silicon 训练什么时候能用。M 系列芯片用户问得最多，统一内存架构理论上对训练很友好，社区在等 MLX 后端落地。

第二个是模型导出 ollama 的 workflow。很多人想训完直接 push 到本地 Ollama 跑，目前 Studio 内置了 GGUF 导出，但和 Ollama 的衔接还得手动 modelfile，有人在提 PR 想把这个流程也封进 GUI。

第三个是数据准备。WebUI 把训练这一步简化了，但数据集质量这事 GUI 简化不了，issue 区里能看到很多"我用了你的默认参数为什么效果不行"的提问，下面 maintainer 一般会回，"看看你的数据"。

我的判断是，WebUI 这层壳子降低了启动门槛，但没降低真正做出有用模型的门槛。这是好事，至少能让更多人跨过第一步，剩下的事市场会教他们。

## 这件事对中国开发者的实际价值

我认为最大的红利在小工作室和独立开发者。

过去一年我看到不少中国独立开发者在做"私域知识 chatbot"、"垂类客服 agent"、"行业写作助手"这类东西，技术栈一般是 RAG + 一个开源 base model + Prompt Engineering。RAG 解决知识问题，但风格、口吻、特定任务的稳定性，RAG 解决不好，得靠微调。

可微调对这群人来说一直是奢侈品，要么花钱买 OpenAI 的 finetuning API（贵且数据出境），要么自己搭环境（学习成本高），要么去阿里云、火山的训练平台（按小时收费，调试期烧钱）。Unsloth Studio 把这个事拉到了"4090 一台机器，本地 GUI"的级别。

我做一个粗略测算，一台二手 4090 大概一万出头，电费忽略，能在自己工位上跑一个 7B 模型的 LoRA 微调，配合本地 Ollama 推理，整个 pipeline 不出公司内网。对法律咨询、医疗记录、客户档案这类敏感数据场景，价值不小。

当然得承认对面也有玩家。LLaMA Factory 在国内中文社区起步早，文档全，对中文模型支持好，命令行用户不少。HuggingFace 自家的 trl + autotrain 走的是云原生路线，在线协作好。Unsloth Studio 走的是另一条路，本地化、零代码、推理训练一体化，三家走的是三个方向，各有各的擅长场景。

短期内国内还会出现一批 Unsloth Studio 的二次封装，加上中文 UI、中文文档、和国产 GPU 适配，这是国内开发者一贯的玩法。

## 你今晚可以做什么

如果你手头有一张 30 系以上的 N 卡，curl 那行命令复制下来跑一遍，半小时之内能看到 WebUI。

如果你只想体验推理，不想折腾训练，先在 Studio 里下载一个 Qwen3.5 7B 的 GGUF，挂上一个开源 LoRA 跑一段对话，感受一下"本地全栈"这件事。

如果你正在做垂类 AI 应用，认真考虑下手收集 100 到 500 条高质量数据，不为了训出多炸的效果，就为了走完一遍"准备数据→微调→评估→部署"这个循环。这个循环你跑通一次，对开源模型生态的理解会上一个台阶。

我那行涨了 207 颗星的 trending，可能就是这个生态拐点的一个小小注脚。

下次再刷到 Unsloth 仓库的时候，希望你已经在自己的机器上跑过它了。

## 相关链接

- Unsloth GitHub 仓库，https://github.com/unslothai/unsloth
- Unsloth 官方文档，https://unsloth.ai/docs
- 安装脚本说明（Linux/macOS/WSL），https://unsloth.ai/install.sh
- Unsloth Discord 社区（讨论区），https://github.com/unslothai/unsloth#community

---
相关实体:: Unsloth | HuggingFace
相关主题:: [[local-inference|本地推理]] | [[ai-coding-tools|AI编程工具]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
