# Qwen3.6-27B 今天出了，27B Dense 干出旗舰级编程能力，本地显卡党有福了

16.8GB。

这是 Qwen3.6-27B 在 Unsloth 量化成 Q4_K_M 之后的体积。一张 24GB 的 4090 就能塞进去，还能留出一半显存给上下文。

更离谱的是，这个体积的模型，官方宣称"编程能力超过上一代旗舰 Qwen3.5-397B-A17B"。

你没看错。一个 27B 参数、可以塞进游戏显卡的 Dense 模型，据说在所有主流编程 benchmark 上都赢了上一代那个 397B 参数、17B 激活的 MoE 大怪兽。从 807GB 的模型权重，瘦到 55.6GB，一代的距离。

Simon Willison 在本地跑了一下，给的评价是 outstanding。我看完他发的那篇博客愣了几秒钟，心想阿里这次是真的要把"本地可跑旗舰"这件事做成了。

## 27B Dense，一个反潮流的选择

先把"Dense"和"MoE"的差别用一句话说清楚。

MoE 是说模型里有一堆"专家"，每次推理只激活一部分（比如 Qwen3.5-397B-A17B 就是 397B 总参数，17B 激活），benchmark 分数很好看，但显存要吃满全部参数才能装得下。

Dense 是老派路线，27B 就是 27B，没有藏着的参数，装载和激活的是同一份权重。对本地部署极其友好。

现在的行业潮流是什么？是 DeepSeek V3/V4、Kimi K2、MiniMax M1，一个比一个大，全走 MoE。昨天 DeepSeek V4 Pro/Flash 双发，OpenRouter 上国产 MoE 已经开始打价格战。

Qwen 偏偏反着来。同一天开源的 Qwen3.6 系列，27B Dense 是专门给本地推理留的一个口子。

我的判断是，这不是技术路线之争，是分工。DeepSeek 把 MoE 做到极致规模，走云端 API 路线；Qwen 知道自己有一堆用户就是冲着"本地能跑的开源旗舰"来的，干脆把 Dense 这条路吃透。两条腿走路，对中国独立开发者来说反而是好事。

因为 MoE 听起来很美，真落到你自己这台机器上就知道。17B 激活不代表只吃 17B 显存，全部 397B 权重都得装进去才能推理，一般人根本部署不起。

## Flagship-Level Coding 到底是个什么水平

Qwen 团队的原话是"delivers flagship-level agentic coding performance"。"旗舰级 agentic 编程能力"。

这里有两个词不能忽略。第一个是 agentic，说明不光是单次代码补全，是能在 agent 循环里连续决策、调工具、改文件的那种能力。第二个是 flagship-level，对标的是闭源那边的头部选手，Claude、GPT、Gemini。

具体 benchmark 数字官方给了一句"across all major coding benchmarks"都超过 Qwen3.5-397B-A17B，但没放详细跑分图。我也不打算替它吹。

真正值得在意的是 Simon 的实测。他用 `llama-server`（llama.cpp 的服务器模式）加载了 16.8GB 的 Q4_K_M 量化版本，开了 65536 tokens 上下文，开了 reasoning 模式。跑"画一只骑自行车的鹈鹕 SVG"这种经典测试，模型输出 4444 token，用时 2 分 53 秒，平均 25.57 tokens/s。生成速度不算惊艳，但对于本地跑一个号称旗舰的模型来说，这个速度能接入 Cursor、Cline、Claude Code 这类 agentic 编程工具了。

Simon 说他那条命令行是从 Hacker News 上一个叫 benob 的用户那抄来的。开源社区就是这样，大模型刚放出来几小时，命令行配方已经有人调好了。

## 显存账，到底多少卡能跑

粗略算一下。

fp16 全精度，27B 参数大约需要 54GB 显存。一张 A100 80GB 能装。
int8 量化，大约 27GB。一张 4090 24GB 勉强不够，两张能跑，或者用 A6000 48GB。
int4 量化（就是 Simon 用的 Q4_K_M），16.8GB。一张 4090 24GB 舒舒服服，留出空间给上下文和 KV 缓存。

坦率讲，这是过去两年我第一次看到一个"被吹成旗舰"的开源模型，能明确说出"一张 4090 就能本地跑"。

上一代 Qwen3.5-397B-A17B 需要什么？全精度 807GB，就算 int4 也要 200GB 以上。家里没 H100 集群基本告别。

所以这次 27B Dense 的发布对象很明确。是独立开发者，是想在本地跑 Claude Code 平替的人，是不想把代码发给 API 的安全敏感团队，是 Mac M3 Ultra 128GB 统一内存的 LLM 玩家，是手里有一张 4090 或者 5090 的 AI 编程爱好者。

这批人加起来，在中国至少几十万。

## 我的几个保留意见

说实话我也还没亲手在自己机器上跑。几点判断保留。

第一，"超过上一代 MoE 旗舰"这种话官方说的，benchmark 细节没完全放出来之前，我不完全采信。等 Aider leaderboard、SWE-bench 第三方跑分出来再说。

第二，Simon 测的 SVG 生成不是编程的真正战场。真正的战场是让它在一个十万行的 Python 项目里定位 bug、改代码、跑测试、提 PR。这种复杂 agentic 任务，27B Dense 能不能顶住，还得看社区接下来一两周的实测。

第三，编程模型的护城河早已不是单次生成质量，而是长上下文下的注意力保持和工具调用的稳定性。65K 上下文听起来够用，但跟 Claude 4.7 的 1M、GPT-5.5 的 400K 比还是少一个档。

但即便打折扣，这依然是 2026 年 4 月 22 日，开源届一个值得记住的时间点。

## 你今晚可以动的手

如果你手里有 24GB 以上显卡，或者 64GB 以上统一内存的 Mac，按这个顺序来。

`brew install llama.cpp` 装好 llama.cpp，或者 Windows 上直接下 release 二进制。

去 Hugging Face 搜 `unsloth/Qwen3.6-27B-GGUF`，下 Q4_K_M 那个 16.8GB 的文件。

用 `llama-server -hf unsloth/Qwen3.6-27B-GGUF:Q4_K_M -c 65536 --jinja --reasoning on` 跑起来。

把 `http://localhost:8080` 填进 Cline 或者任何 OpenAI API 兼容的客户端。

开始让它改你自己的代码，看它真不真的是旗舰级。

国产开源这一波，同一天 DeepSeek 走 MoE，Qwen 走 Dense，两条路一起推。中国 AI 用户不用再看云端 API 谁家打折，自己家这张 4090 就是最好的底牌。

---

相关链接

- Simon Willison 的评测原文 https://simonwillison.net/2026/Apr/22/qwen36-27b/
- Qwen 官方博客 https://qwenlm.github.io/
- HuggingFace 模型页 https://huggingface.co/Qwen
- Unsloth 量化版 https://huggingface.co/unsloth/Qwen3.6-27B-GGUF

---
相关实体:: [[alibaba|阿里]] | [[qwen|通义千问]] | [[deepseek|DeepSeek]]
相关主题:: [[local-inference|本地推理]] | [[ai-coding-tools|AI编程工具]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
