# Google Gemma 4 字节级最强开源模型 国产 Qwen DeepSeek 怎么追

DeepMind 在 4 月 2 日推出 Gemma 4，标题用了一个挑衅的词，byte for byte，单位字节最强开源。

意思直白，同样大小的权重文件，没有哪个公开模型比它更聪明。这句话过去几年是 Meta 的 Llama 在喊，去年是 Qwen 和 DeepSeek 轮流喊，现在轮到 Google 自己下场抢这个口号。

更耐人寻味的是 Reddit r/AskClaw 上有人直接评论，"Gemma 4 是 Google 的 DeepSeek 时刻"。这句话翻译过来是，是中国开源把 Google 逼急了。

## Gemma 4 这次到底放了什么

四个版本，覆盖了从手机到服务器的完整尺寸段。

E2B 和 E4B 是边端模型，参数有效激活量分别约 2B 和 4B，专门针对手机、笔记本本地跑。E2B/E4B 原生支持音频输入，加上多分辨率图像和视频处理，这是一个完整的多模态边端栈。

26B 走的是 MoE 路线，总参数 26B 但推理时只激活 3.8B，专门换低延迟。31B 是 Dense，最高质量档，主打微调底座。

上下文窗口，边端模型 128K，大模型 256K。原生 140 多种语言训练。许可证 Apache 2.0，完全可商用。

在 Arena AI 榜单上，31B 是当前开源第三，26B 是第六。Google 还放了一句话，"Gemma 4 在某些任务上能对抗 20 倍参数的模型"，这句话没有给具体 benchmark，更像市场表述。

但有一个细节值得注意。Gemma 4 这次专门为 agentic workflows 优化，原生支持函数调用、结构化 JSON 输出、系统指令。这跟过去开源模型"先把对话做强、function call 后期补"的路径完全不同，是把 agent 当成 first-class citizen 在设计。

这是 Google 这次想抢的位置。不是聊天最聪明的开源，是给 agent 当大脑最合适的开源。

## 国产开源的四条路线

把 Gemma 4 摆出来之后，国产开源各家在干什么就有意思了。

**Qwen3 路线，全尺寸覆盖 + 双思考模式**。阿里这一两年最稳定的输出节奏是"所有尺寸段都做齐"，从 0.5B 到 235B MoE 都有版本，加上 Coder、VL、Audio 等垂直变体。Qwen3 的核心打法是 thinking/non-thinking 双模式，一个模型同时承担推理和快速对话。这条路线对应 Gemma 4 的"E2B 到 31B 全尺寸"，但 Qwen 在小尺寸段（4B/8B）部署量上已经远超 Gemma 3，开发者社区习惯用 Qwen 系列做微调底座。

**DeepSeek V4 路线，极致 MoE + 推理压榨**。DeepSeek 一直走的是另一条路，不做全尺寸，把所有筹码押在大尺寸 MoE 上。V3 是 671B 总参数 / 37B 激活，V4 预计延续这个取向。DeepSeek 不跟 Gemma 4 比 4B 段，它跟 Gemma 4 的对位是"在同等推理成本下，谁能做出更强的代码和数学"。R1 的成功证明了，让一个超大 MoE 配合 RL 训练，可以在数学和编码上压制更大的 dense 模型。

**智谱 GLM 路线，多模态 + 国产芯片适配**。GLM-4.5 这一代开始往 agentic 方向靠，但更明显的差异是它在华为昇腾、寒武纪等国产芯片上的适配深度，这条路线是 Gemma 4 完全没碰的部分。Google 不需要考虑非英伟达硬件，智谱必须考虑。

**千问 Coder / DeepSeek Coder 路线，垂直 SOTA**。Gemma 4 没有专门的代码版本，它把代码能力打包进通用模型。Qwen3 Coder 和 DeepSeek Coder 走的是"代码能力做到比闭源 Claude 还强"的纯垂直路线，最近 Qwen3 Coder 480B 已经在 SWE-bench 上摸到 Claude Sonnet 同档。

四条路线翻译过来，Qwen 在抢"开发者默认底座"位置，DeepSeek 在抢"推理性价比之王"位置，智谱在抢"国产合规生态"位置，垂直 Coder 模型在抢"专用任务 SOTA"位置。Gemma 4 这次想抢的是第五个位置，"agent 默认大脑"。

## 社区怎么看

Reddit r/AskClaw 上那条 54 赞 17 评的帖子，标题是 "Google 送了我们私有 AI agent，Gemma 4 能在 iPhone 上离线跑，到底能做什么"。

帖子核心观点很直接，Gemma 4 的发布是 Google 在回应中国开源的绝对统治力。原话是 "Google finally responded to the absolute dominance of the Chinese llm models"。

但下面立刻有人浇冷水。这位评论者认为，Gemma 4 现阶段在能力上是被"lobotomized"（叶切术，被砍弱）的，作为"离线 agent 能在手机上跑"的展示很酷，但要真的接进 Claude Code 当生产力工具，还差得远。

这个声音在 Hacker News 和其他社区暂时还没起来，Reddit 这一条算是早期的社区共识雏形。

值得参考的判断有两个。一是 Gemma 4 在边端的存在感会比中端强，2B/4B 段它的多模态原生能力（特别是音频）暂时没有国产开源对手。二是 Google 想用 agent 优化做差异化，但 Qwen 和 DeepSeek 都在快速补 function calling，这个窗口能保持多久不好说。

## 我的判断

Gemma 4 这次最值得国产团队学的，不是模型本身，是它的产品定位逻辑。

Google 没有去跟 Qwen 比"我也能从 0.5B 做到 235B"，也没有去跟 DeepSeek 比"我的 MoE 激活效率更高"。它选择了一个新位置，把 agent 工作流当成 day-one 设计目标，而不是模型训完之后再做适配。

这条路是有商业逻辑的。2026 年的开源模型不会再靠"通用对话更聪明"赢市场，因为这条曲线已经到了边际收益递减阶段，前 10 名差距越来越小。真正的差距在"被 agent 框架接入的难度"上，一个原生支持结构化输出、稳定 function call、长上下文的模型，开发者在用 LangGraph、CrewAI、Claude Code 这些 agent 框架时，会自然选它。

国产开源里，Qwen3 在补这块，DeepSeek 在补这块，但路线选择上还在"先把对话和推理做强，工具调用稳定性单独追"的思路里。

边端这块倒是国产开源相对薄弱的位置。Qwen3 4B 性能够强，但多模态尤其是原生音频还没跟上。手机上跑一个能听语音、看图、调本地工具的私有 agent，这件事 Gemma 4 抢到了第一波声量，国产端侧模型在下半年大概会出现一波跟进。

普通开发者短期不用焦虑选哪个。每条路线都有它最合适的场景，做 agent 应用看 Gemma 4 和 Qwen3，做代码场景看 Qwen3 Coder 和 DeepSeek，做国产部署看 GLM，做极致推理性价比看 DeepSeek V4。开源生态分化是好事，垄断的开源生态对所有人都不好。

## 怎么动手

Gemma 4 权重已经在 Hugging Face 上，HF 镜像（hf-mirror.com）国内可直接拉。E2B/E4B 用 llama.cpp 或 Ollama 加载，最低 4-8GB 显存就能跑。26B MoE 推理时 3.8B 激活，单张 24GB 卡就能跑量化版本。

OpenRouter 已经接入 Gemma 4 31B 的 API，按 token 付费的形式可以直接调用，不用自己部署。

想做对比测试，把 Gemma 4 4B、Qwen3 4B、Phi-4 mini 放一起跑同一组 agentic 任务（function calling、JSON 输出、多步规划），自己感受下差异，这比看任何 benchmark 都直接。

## 相关链接

- Gemma 4 官方博客，https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/
- Hugging Face Gemma 4 集合，https://huggingface.co/collections/google/gemma-4
- HF 国内镜像，https://hf-mirror.com
- Qwen3 系列开源仓库，https://github.com/QwenLM/Qwen3
- DeepSeek V3 论文，https://github.com/deepseek-ai/DeepSeek-V3

---
相关实体:: [[google|Google]] | [[deepmind|DeepMind]]
相关主题:: [[open-models|开源模型]] | [[chinese-ai|国产 AI]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
