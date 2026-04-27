# 阿里 Qwen3.6 全家桶今天一口气上了 5 个模型，从 27B Dense 到 1T Max Preview 全有

今天早上刷 OpenRouter 的 New Models 页，我数了三遍才确认。

阿里通义千问一口气上了 5 个新条目，覆盖从 27B Dense 一直到接近 1T 参数的 Max Preview，全部带价格、全部能直接调。

这是我跟踪 OpenRouter 半年以来，单家厂商单日上线模型数量的新纪录。

## 5 个模型一口气铺出来，先把图谱画清楚

我把今天上线的 5 个全部抠出来，按规模从小到大排一遍，方便你直接对号入座。

**Qwen3.6 27B**，Dense 架构，262K 上下文，文本+图像+视频输入，$0.195 / $1.56（每 M token，下同）。Simon Willison 4 月 22 日实测过这一版，单卡能塞下，私有部署首选。

**Qwen3.6 35B A3B**，35B 总参/3B 激活的混合 MoE，262K 上下文，多模态，$0.16 / $0.97。比 27B Dense 还便宜一点，给"想要 MoE 吞吐效率但没必要上千亿"的场景准备。

**Qwen3.6 Flash**，1M 上下文，多模态，$0.25 / $1.50。对标高吞吐低延迟快响应，1M 窗口塞整本书、塞整个项目代码库都没问题。

**Qwen3.5 Plus 2026-04-20**，1M 上下文，多模态，$0.4 / $2.4。其实是 3.5 系列的小更新，给存量用户的平滑升级。

**Qwen3.6 Max Preview**，Sparse MoE 约 1 万亿总参，262K 上下文，明确为 agentic coding 和 tool use 优化，$1.30 / $7.80。

5 个排在一起看，是一张非常清晰的产品矩阵图。

## 为什么这次"集体发"比单个模型更值得关注

我看新模型有个习惯，先不看 benchmark，先看价格表。

价格表能告诉你一家厂商对自家模型的真实定位。

4 月 24 日 DeepSeek V4 Pro + Flash 双发刚把 OpenRouter 的价格底部压了一截，今天阿里这 5 个一字铺开，从最便宜的 35B A3B 到最贵的 Max Preview，每个价位段都精准卡位。

35B A3B 卡"批量任务、要便宜"，27B Dense 卡"本地能跑、私有部署"，Flash 卡"超长上下文、快响应"，Max Preview 卡"agentic coding、复杂工具调用"，3.5 Plus 给存量用户的平滑升级。

这种铺法不是临时拼凑，是产品经理坐下来画好矩阵的结果。坦率讲，国产模型从 DeepSeek 那波双发开始，发布节奏已经从"一次一个旗舰"变成"一次铺一个段位"，只是这次价格更狠。

## 我自己最关心的 3 个点

**第一，视频输入。** 5 个里面有 4 个支持 video 输入（Max Preview 例外，纯文本）。多模态从图像走到视频是很大一个台阶，丢一段会议录屏让模型总结、丢一段教程视频让模型转成文字步骤、丢一段产品演示让模型抓 bug，之前主流路径要么 Gemini，要么自己拼"视频抽帧 + 多帧图像理解"的土法。现在国产模型原生支持，价格在 $0.16 到 $0.40 / M prompt 区间。我准备把内部"会议录屏自动出纪要"那条管线切到 35B A3B 上跑一周看看。

**第二，Max Preview 的 agentic coding 定位。** 模型卡特别强调了 "optimized for agentic coding, tool use"，结合 Claude Code、Cursor、Cline 这些产品的爆发，所有厂商都在卷这个方向。我之前用 Qwen 3 系列做 multi-turn tool use 有个老坑，前几轮调用得很好，第 5、6 轮开始忘记 schema。Max Preview 这次重点优化工具调用，能不能把这个坑填上，我会专门拉个 benchmark 测一下。

**第三，27B Dense 的延续。** Simon Willison 4 月 22 日那篇实测写得很细，27B Dense 在 M3 Max 上跑 4-bit 量化能到 30+ tokens/s，单文件 80GB 左右，开发机完全可承受。今天上 OpenRouter 的这一版本和开源权重是同一套，只是多了云端推理。所以呢，本地开发、云端生产，一套权重一套 prompt 无缝切换。这个产品形态之前只在 Mistral 上看到过。

## 社区里这一两天在讨论什么

X 上昨晚就有人转 OpenRouter 的截图，国内技术群今早在传"Max Preview 价格只有 GPT-5.5 的几分之一"的对比图。

有人指出，Max Preview 虽然写了 1T 参数，但作为 sparse MoE，每次推理实际激活可能在百亿级别，延迟和真正的 1T dense 不是一个量级，提醒大家别被数字迷惑。

也有人晒了 Flash 的实测，1M 上下文加载整个 React 仓库（约 30 万 token），首 token 延迟约 8 秒，比之前 Qwen3 系列的长上下文表现好不少。

最有价值的一个问题，**35B A3B 的开源权重什么时候放出来**。模型卡写了 "open-weight"，但 Hugging Face 上目前还搜不到。如果这周内放权重，那基本就是中小公司私有部署的下一个默认选项。

## 我的判断

我认为这次发布的真正信号，不是某一个模型有多强，而是国产模型厂商从"追赶 SOTA"切换到了"全段位铺货"。

之前的发布逻辑是憋大招、对标 GPT-4 / Claude、跑分超过对手就赢。这种打法天花板是"我们也能做到 SOTA"，赢一次就被下一个版本盖过去，没有复利。

全段位铺货完全不一样。它不追求每一个段位都是 SOTA，但要求每一个段位都"够用 + 比国际同档便宜"。最后的结果是开发者做选型时，国产模型变成那个"先看一眼有没有合适的"的默认选项。

今天 5 个模型一起上，价格区间从 $0.16 到 $1.30 / M prompt，覆盖从便宜批量到复杂 agent 的所有主流场景。这不是技术胜利，是产品胜利。

但我得说一句不那么乐观的，**这种铺货策略对模型质量的稀释风险是存在的**。同时维护 5 条产品线，每一条都要持续优化，对厂商工程能力是巨大考验。Max Preview 标的是 Preview，3.5 Plus 是小更新，27B Dense 已经是 4 月初的版本，真正的 3.6 旗舰其实只有 35B A3B 和 Flash 两个。

铺得开是一回事，每一条都打磨好是另一回事。

## 你下一步可以做什么

如果你手里有现成的 LLM 应用，今天最值得做的一件事，是去 OpenRouter 把这 5 个 model_id 加到对照测试清单里，同样的 prompt 同样的 task，跑一遍延迟、质量、成本三个指标。先试 35B A3B，价格便宜到几乎可以无脑调用，多模态又齐全。

做 agentic coding 产品的，Max Preview 值得专门留一两个小时测 multi-turn tool use 的稳定性。有合规要求必须本地部署的，27B Dense 和云端是同一套权重，开发用云、生产用本地的混合模式可以试一下。

最后留一个问题，你觉得国产模型这种"全段位铺货"的打法能持续多久，是会让中国 AI 生态更繁荣，还是会陷入"5 个都能用，但没一个做到最好"的尴尬。评论区聊。

## 相关链接

- Qwen3.6 27B https://openrouter.ai/models/qwen/qwen3.6-27b
- Qwen3.6 35B A3B https://openrouter.ai/models/qwen/qwen3.6-35b-a3b
- Qwen3.6 Flash https://openrouter.ai/models/qwen/qwen3.6-flash
- Qwen3.6 Max Preview https://openrouter.ai/models/qwen/qwen3.6-max-preview
- Qwen3.5 Plus 2026-04-20 https://openrouter.ai/models/qwen/qwen3.5-plus-20260420

---
相关实体:: [[alibaba|阿里]] | [[qwen|通义千问]] | [[deepseek|DeepSeek]]
相关主题:: [[ai-pricing|AI定价]] | [[multimodal|多模态]] | [[local-inference|本地推理]] | [[agent-frameworks|Agent框架]]

<!-- REACH: 10/10 | 品牌✓ 利益点✓ 可操作✓ -->
