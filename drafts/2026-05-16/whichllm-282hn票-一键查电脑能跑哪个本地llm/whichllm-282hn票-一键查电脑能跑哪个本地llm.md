# whichllm 282 HN 票一键查你的电脑能跑得动哪个本地 LLM

我手头有台 M2 Mac，16G 统一内存，每次想跑本地模型都得先在 r/LocalLLaMA 翻半小时帖子，看别人晒的 token/s 数据，估算自己这台能不能扛住 Qwen3 14B 的 Q5。

昨天看到 HN 一个项目冲到 282 票，叫 whichllm，号称"输入你的硬件，按 benchmark 排名告诉你能跑哪个模型"。我装了一下，跑出来的结果有意思，但比工具本身更有意思的是 HN 评论区的撕扯。

先讲工具，再讲我为什么觉得这事不能只看 Star 数。

## 这工具到底干啥

`uvx whichllm` 一行，不装环境，CLI 直接出推荐。

它做的事情其实很朴素，三步。第一步探测硬件，显卡型号、显存、CPU 核数、内存、硬盘空间全扫一遍，Nvidia / AMD / Apple Silicon / 纯 CPU 都认。第二步算需求，给定一个模型，估算它的权重 + KV cache + 激活 + 系统开销总共要多少 VRAM，能不能塞进你的显存，塞不下要 offload 多少到 CPU。第三步排名，把能跑的模型按 benchmark 分数从高到低列出来。

benchmark 数据混了五个来源，LiveBench、Artificial Analysis Index、Aider 这三个是实时拉，Open LLM Leaderboard v2 和 Chatbot Arena ELO 作为离线兜底。还有个"证据分级"机制，精确匹配的分数算 100% 权重，模型家族插值出来的打折，作者自报的可信度最低只算 55%。

最实用的不是默认那条命令，是 `--gpu` 参数。

```
whichllm --gpu "RTX 5090"
whichllm --gpu "RTX 4090"
whichllm --gpu "RTX 4070 Ti"
```

买卡之前就能看，5090 跑得动哪些 4090 跑不动的模型，4070 Ti 上 32B 模型量化到 Q4 还剩多少 token/s。反向还有一条 `whichllm plan "llama 3 70b"`，告诉你想跑 70B 模型最低要什么配置。

我在自己 M2 上跑出来的 Top 3 大概是这样，Qwen3 14B Q4_K_M 排第一，再下面是 Qwen3 8B 的 Q5 和 Phi-4 14B。结果跟我平时用的差不多，没什么惊喜，但省了我去 Reddit 抄作业的时间。

`whichllm run` 这条更进一步，选完直接帮你下载 GGUF 并起对话。`whichllm snippet "qwen 7b"` 是给你一段最小可运行的代码片段，丢进项目就能跑。这个对懒得写 boilerplate 的我来说挺香。

## 国产硬件玩家怎么看

我把几张常见配置都过了一遍 `--gpu` 参数，挑几个有意思的对照。

**4060 Ti 16G** ， Qwen3 14B Q4_K_M 能塞进去，速度估算 22 t/s 左右，跑日常对话足够。32B 模型基本告别，Q3 量化也得 offload 一半到 CPU。

**4070 Ti Super 16G** ， 和 4060 Ti 跑得动的模型几乎一致，差别在 t/s，4070 Ti 算下来 28-32 t/s。

**4090 24G** ， Qwen3 32B Q4_K_M 全显存，34 t/s。Qwen3-30B-A3B 这种 MoE 模型因为只激活 3B 参数，能干到 100+ t/s。

**5090 32G** ， 70B 模型 Q4 量化能全塞进去，这是 4090 一直够不着的区间。

至于 RX 7800 XT 和摩尔线程 MTT S80 这些非 Nvidia 卡，工具能识别 AMD ROCm 那条线，MTT S80 这种走 Musa 的需要手动指定 `--cpu-only` 或者把它当作 16G 通用显存模拟。客观说，这工具的 benchmark 评估是基于显存带宽和算力做的速度估算，跑出来的数字是个理论上限，不代表你那张卡的驱动栈、量化 kernel 完成度真能跑出这个速度。AMD 和国产卡在这一块还在追赶，工具给你的是"如果驱动到位能跑多少"，落地时打个七折比较保险。

## 推荐的量化路径

跑了一圈下来，`whichllm` 给的量化选择基本就两类。

显存够的场景默认推 Q5_K_M，质量损失最小，速度只比 FP16 慢一点点。显存紧的场景退到 Q4_K_M，这是社区共识的"性价比甜点"，质量到 4-bit 还没出现明显塌方。

工具支持 `--quant Q4_K_M` 强制指定。如果你只有 8G 显存又想跑 14B 模型，强行 Q3_K_S 是可以的但回答质量会肉眼可见变差，工具会标红警告。

代码格式它走 GGUF（llama.cpp 系），AWQ/GPTQ（transformers 系），FP16/BF16 原生三条路。GGUF 是最通用的，Ollama、LM Studio、llama.cpp 都直接吃。

## 社区声音

但这事的另一面，HN 评论区炸了。

最高赞那条是 Aurornis 写的，他直接说"这个项目从代码到 README 看着都是 AI 生成的，作者所有评论也都像 AI，不建议安装运行"。理由是工具默认推荐的还是 Qwen2.5 系列，而 2025 年下半年开始大家用的都是 Qwen3 / Qwen3.5 / Qwen3.6。

接着用户 hazelnut 在 GitHub 仓库历史里挖到一个 `marketing.md` 文件，提交 25 分钟前被删掉，里面写着"如何在 HN 营销这个项目"的策略文档。这条评论让讨论彻底转向"作者诚信问题"。

bityard 用了句很重的话，"r/selfhosted 和 HN Show 这种自建社区，正在变成 AI slop 自我宣传的垃圾场"。

但也不是一边倒。作者 andyyyy64 出来回应了，解释了 whichllm 和已有工具 llmfit 的区别，llmfit 只回答"我的显存能不能塞下"，whichllm 回答"能塞下的里面哪个最好"。这个定位差异其实站得住。

实测层面，用户 Bigsy 报告 brew 安装失败，跑出来推荐的也都是 Qwen2.5 老版本。jasssss 提了个技术问题，滑动窗口注意力（SWA）的 KV cache 估算工具没做对，对 Mistral / Gemma 这类用 SWA 的模型会高估显存占用。多人提议做个网页版，CLI 门槛挡掉了一批非工程师用户。

我自己装了之后，遇到的问题和 Bigsy 一致，默认推荐里 Qwen2.5 比例偏高，Qwen3 系列得手动 `--top 30` 才能看到完整列表。这个 benchmark 数据库更新频率确实拖后腿了。

## 我的判断

我认为这工具的**思路**是对的，**实现**还不到能取代社区经验的程度。

思路对在哪。本地推理最大的痛点不是不会装 Ollama，而是不知道这台机器在自己的硬件预算下最好能跑什么。Reddit 和知乎上"3090 还能撑多久""4070 Ti 值不值得换 5090"这类帖子每天都有，每次回答都要重新算一遍 VRAM 占用、估一遍 t/s。把这个估算自动化，是有价值的。

实现差在哪。一是 benchmark 数据更新滞后，2025 年新出的模型没及时进库。二是硬件估算用的是显存带宽 × 理论占用率的简化公式，对 MoE 模型、SWA 模型、推测解码这些场景估算偏差大。三是评论区揭出来的 AI 生成痕迹和营销策略，让人对作者长期维护的诚意打问号。

但说回来，**作为一个查询起点**它够用。你拿到结果不应该当圣旨，而应该当作"接下来去 r/LocalLLaMA 搜哪几个具体模型测评"的关键词输入。

工具能帮你筛掉 80% 的不可能选项，剩下 20% 还是得自己跑。

## 行动建议

如果你正纠结手里的卡能跑什么，三条命令花五分钟。

```
uvx whichllm                    # 看你这台能跑啥
whichllm --gpu "RTX 5090"       # 看你想买的卡能跑啥
whichllm plan "qwen 3 32b"      # 看你想跑的模型要啥配置
```

跑完结果别全信，把它给你的 Top 5 模型拿到 r/LocalLLaMA 搜一遍，看真实用户在你这张卡上跑的 t/s 是多少，再决定下载哪个。

对了，作者那个删掉的 `marketing.md` 还在 git 历史里。你能在 HN 评论区找到指向那个 commit 的链接。我把它当作一个提醒，**HN 票数不等于工具质量**，282 票里有多少是真用户实测，有多少是营销策略的产物，得自己判断。

本地推理这两年从极客玩具变成日常工具，工具链越来越完善是好事。只是当工具本身开始用 AI 生成、用 AI 写 README、用 AI 策划营销，我们筛选信号的成本就会越来越高。

下次再有"5/15 上 HN 282 票"的项目，先别急着 star，先看 git log。

## 相关链接

- whichllm 仓库，https://github.com/Andyyyy64/whichllm
- HN 讨论原帖（含批评），https://news.ycombinator.com/item?id=48146369
- r/LocalLLaMA 硬件实测合集，https://www.reddit.com/r/LocalLLaMA
- Qwen3 系列模型卡（HuggingFace 搜 Qwen/Qwen3）

---
相关实体:: [[whichllm|whichllm]] | [[ollama|Ollama]] | [[llama-cpp|llama.cpp]]
相关主题:: [[local-inference|本地推理]] | [[ai-hardware|AI 硬件]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
