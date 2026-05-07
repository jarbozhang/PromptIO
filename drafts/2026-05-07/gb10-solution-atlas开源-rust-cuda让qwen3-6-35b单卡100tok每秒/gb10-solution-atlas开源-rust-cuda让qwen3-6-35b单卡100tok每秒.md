# DGX Spark 单卡跑 Qwen3.6-35B 100+ tok/s，这个 Rust 推理引擎把 PyTorch 整条栈丢出去了

---
相关实体:: [[qwen-family|Qwen]] | [[anthropic|Anthropic]] | [[claude-code|Claude Code]] | [[vllm|vLLM]] | [[nvidia|NVIDIA]] | [[avarok|avarok]]
相关主题:: [[local-inference|本地推理]] | [[ai-coding-tools|AI 编程工具]] | [[chinese-ai|国产 AI]]

我盯着 Atlas 那个 docker pull 命令看了半天，第一反应是这数据怕不是吹的。

DGX Spark（GB10 Blackwell）上跑 Qwen3.5-35B NVFP4，峰值 130 tok/s，sustained 111 tok/s，号称是 vLLM 的 3 倍。35B 的模型跑出 100+ 这个量级，单卡。我手边只有 4090，DGX Spark 摸不到，但 Reddit 那条原帖底下已经有人在追问"两张 GB10 能并联吗"，这说明真的有人买了。

avarok 这帮人这次直接把代码扔出来，仓库就一个名字，Atlas，Pure Rust + CUDA，没有 PyTorch，没有 Python runtime。镜像 2.5 GB，冷启动两分钟以内。

## 他们把 PyTorch 整条依赖链丢了，省下 20 GB 的"通用机械"

这是这次发布最有意思的一点。

avarok 的说法很直白，Spark 的瓶颈不是硅片，是 prompt 到 GPU 之间挤了 20+ GB 的"generic Python machinery"。他们重写了从 HTTP handler 到 kernel dispatch 的整条栈。

我的理解是这样。vLLM 这一类框架走的是"通用主义"路线，要兼容所有 NVIDIA 卡、所有量化格式、所有模型架构，所以中间层堆得很厚。PyTorch 调度、CUDA Graph、各种 fallback 路径、Python 解释器。每一层都不慢，加起来就是 20 GB。

Atlas 的路线刚好反过来，"四个芯片做好，胜过二十个芯片做烂"。当前先吃透 Blackwell 的 SM120/121，attention、MoE、GDN、Mamba-2 全部手工调优 CUDA kernel，没有 generic fallback。tensor core 上跑原生 NVFP4 + FP8，再叠 MTP（Multi-Token Prediction）speculative decoding 拿到 decode 阶段最高 3 倍吞吐。

这套思路在 inference engine 这个赛道其实不算新。llama.cpp 一直就是 C++ 手撸路线，TensorRT-LLM 也是 NVIDIA 自家深度优化。但 Atlas 把"Pure Rust"拉到台前，加上专门吃 GB10 这一颗芯片，姿态比上面两个都更激进。

## 模型矩阵里有一行让我停了下来

avarok 公布的实测列表，挑几个有意思的。

- Qwen3.5-35B（NVFP4 + MTP K=2），peak 130，sustained 111
- Qwen3.5-122B（NVFP4 + EP=2），decode ~50
- Qwen3-Next-80B-A3B（NVFP4 + MTP），~87
- Nemotron-3 Nano 30B（FP8），~88

Qwen3-Next-80B 跑到 87 tok/s 这个数字，比我预期的高。这个模型的 MoE 结构本来就吃工程优化，能在单台 Spark 上做到接近 90，意味着国产开源 80B 级别第一次在桌面级硬件上拿到了"流畅交互"的速度。Qwen3.6-35B-A3B-FP8 是 docker run 里默认拉的那个，意味着 avarok 对它的支持是 day one 级别的。

文档里还提了 Minimax2.7、Gemma 也都在跑。

## docker pull 一行起，OpenAI + Anthropic API 同端口

我没机会摸到 Spark，但安装命令已经在 README 里了，对照看了一下确实就是两条。

```bash
docker pull avarok/atlas-gb10:latest
docker run -d --name atlas --network host --gpus all --ipc=host \
  -v ~/.cache/huggingface:/root/.cache/huggingface \
  avarok/atlas-gb10:latest serve Qwen/Qwen3.6-35B-A3B-FP8 \
  --port 8888 --speculative --enable-prefix-caching
```

最有杀伤力的细节在最后，OpenAI + Anthropic API 跑在同一个端口。

也就是说你的 Claude Code、Cline、OpenCode、Open WebUI，配置里把 base_url 一改，这个本地 35B 就能直接顶上去。我自己的 Claude Code 工作流大概 70% 是改代码、查 API、写测试，35B 这个量级配上 100+ tok/s，理论上日常打字速度跟得上。

这是我觉得这个项目对中国读者最有现实意义的地方。手上有 RTX 6000 Pro Blackwell、或者将来等到 Strix Halo 这一档的硬件，本地接 Claude Code 就不再是纸面方案。

## 社区第一反应不算友好

Reddit 原帖底下，最高赞的回复是个泼冷水的。

> Sorry guys, I hate to be a sourpuss... 你们花了不少心血，但你们得证明自己比社区现有方案强在哪。

这话我觉得是公道话。Atlas 现在最大的问题是**只在 GB10 上跑**。DGX Spark 是一台 NVIDIA 自家工作站，市面上能拿到的人非常少。3 倍 vLLM 的数字漂亮，但 vLLM 也不是为 Spark 这一颗 SM120 调过的，对比的公平性社区会继续追问。

avarok 的回应是给出了路线图，正在和 Spectral Compute 合作做 Strix Halo 移植，AMD 已经发了硬件，RTX 6000 Pro Blackwell 也在排期。"同一套 kernel 哲学，每颗芯片单独适配"。这个表述有点像 llama.cpp 早期，先吃透 Apple Silicon，再慢慢往外扩。

## 我的判断

我认为 Atlas 短期内最大的价值不是给中国用户立刻用上，DGX Spark 国内能搞到的人是少数派。

真正值得国产推理引擎团队（vLLM 的中国分支、SGLang、LMDeploy）盯一下的，是 Atlas 这套"砍掉 Python，按芯片精调"的路线能不能复制。我们这边卡多、卡杂，过去几年走的都是"一份代码兼容一切"的路，但 Blackwell、Hopper、Ada 这些代际之间的差异越来越大，generic 路径的损耗会被进一步放大。

Pure Rust 不是关键，"敢砍 20 GB 中间层"这件事才是关键。

中国开发者能从这事里抠到的具体行动，我建议两条。一是关注 Atlas 的 Strix Halo 移植，AMD AI MAX+ 395 国内已经能买到，如果半年内 Atlas 真的把同样的速度搬到 Strix Halo，本地 35B 跑 Claude Code 这条路就彻底落地。二是 GitHub 上盯一下他们的 CUDA kernel 实现，attention 和 MoE 这两块的手写代码本身就值得读。

我估计明天就会有人在 r/LocalLLaMA 上发"我用 Atlas 接了 Cline 跑了一天的对比"。等那篇出来，再决定要不要为这个引擎掏卡。

## 相关链接

- Atlas GitHub 仓库（搜索 avarok atlas）
- Reddit 原帖讨论 https://www.reddit.com/r/LocalLLaMA/comments/1t5p2yv/the_gb10_solution_atlas_is_now_open_source_the/
- Qwen3.6-35B-A3B-FP8 模型卡（HuggingFace 搜 Qwen/Qwen3.6-35B-A3B-FP8）
- DGX Spark 介绍页（NVIDIA 官网）

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
