# Kimi K2.6 正式版今天凌晨偷跑，我顺手装了官方 kimi-cli，有几个反常识的发现

凌晨两点，我刷到 Latent Space 那条推送的时候愣了三秒。

Moonshot 没发博客、没开直播，直接把 Kimi K2.6 正式版挂上了 vLLM、OpenRouter、Cloudflare Workers AI、Baseten、MLX，顺手把官方 CLI 工具 kimi-cli 推上了 GitHub Trending，一天涨 76 颗星。

这节奏不像国产厂商，倒像当年 Anthropic 偷偷上 Opus 的那股邪劲。

我当时正准备睡，又爬起来装了一遍。下面是我这两个小时的所见所感。

## 先说最炸的一件事

K2.6 正式版是一个 1T 参数的 MoE 模型，激活 32B，384 个专家（8 路由 + 1 共享），MLA 注意力，原生 256K 上下文，原生多模态，还提供 INT4 量化版本。

这个配置不是冲着 GPT-5 去的，是冲着 Claude Opus 4.6 去的。

Latent Space 那篇文章的标题我翻译过来就是"全球最强开源模型刷新纪录，追上了 Opus 4.6，领先 DeepSeek v4"。措辞很克制，但潜台词是国产开源今天正式把对标线从"追 GPT-4"抬到了"追 Opus"。

Moonshot 公布的 benchmark 里，有几个数字我看完下意识皱眉。SWE-bench Multilingual 76.7，BrowseComp 83.2，HLE 带工具 54.0，Math Vision 带 Python 93.2。

这些数字如果为真，已经是开源的第一梯队。问题是，自测分从来只能信一半，我准备后面几天用 SWE-bench 自己跑一遍看看水不水。

## 然后是更让我意外的 kimi-cli

Moonshot 这次把官方 CLI 和模型同步发布。

这事对中国开发者来说比模型本身更重要。你想想看，Claude 有 Claude Code，OpenAI 有 Codex CLI，连阿里都出了 Qwen Code。国产大厂做"官方开发者 CLI 工具"的几乎没有，这是第一家。

而且动作是"官方发布"，不是"社区爱好者包了个壳"。这背后是产品定位的变化，Kimi 不再只卖 API，它开始抢终端入口。

我装的过程，坦率讲不如 Claude Code 丝滑。

GitHub 页面没给一键安装命令，跳到 moonshotai.github.io 的 Getting Started 才看到是 PyPI 包 `kimi-cli`。pip 装完之后，要先 `/login` 登录账号拿 token。首次运行我在这卡了一下，说实话我也不确定是我网络的问题还是它 OAuth 回调抽了，重连一次就好了。

装完之后，命令就三个入口，`kimi` 主程序，`kimi acp` 起 ACP 协议的 agent server，`kimi mcp` 管理 MCP server。

它有个我没想到的细节，Ctrl-X 可以在"AI 对话模式"和"普通 shell 模式"之间切。意思是你在同一个终端里，按下一个键就从"和 AI 聊天"变成"跑普通命令"。这个体验 Claude Code 没有，Codex CLI 也没有。

VS Code 扩展、zsh 插件、MCP 工具、ACP 协议全家桶都齐了。

有个小坑我踩到了，kimi-cli 内置 shell 还不支持 `cd` 命令。README 最后一行写得清清楚楚"Built-in shell commands like `cd` are not supported yet."。这个细节告诉我，这东西现在更像"对话里能跑 shell"，而不是真正替代你的 iTerm。离 Claude Code 那种把你 IDE 吃掉的体验还差一截。

## 社区那边吵得也挺有意思

GitHub Trending 上 kimi-cli 当天涨 76 星，评论区清一色"Kimi code preview 用得挺爽，正式版终于来了"。昨天我写过 K2.6-code-preview 上 OpenRouter 的事，今天看，那个 preview 就是今天正式版的前哨战。

Hacker News 的讨论串里有条评论我反复看了三遍。大意是"Kimi 的节奏开始像 2024 年的 DeepSeek，一个季度迭代一个大版本，开源权重 + 自带工具链，这套组合打法只有国产厂商能玩"。

知乎那边我扫了一圈，大部分还在讨论 API 价格和调用配额，没什么技术讨论。这点挺让我无奈的，每次国产模型发布，中文社区的关注点都集中在"免费额度多少"，英文社区在讨论"架构细节和 benchmark 有没有 cheat"。

Sebastian Raschka 去年底写过一篇 Kimi K2 的架构拆解，核心观点是 Kimi 的 MoE 路由和 DeepSeek-V3 很像，但专家数更多、单专家更小。这次 K2.6 的 384 专家配置延续了这条路线。技术上不是革命，是把同一条路走得更狠。

## 我会得罪人的判断

我认为，Moonshot 这次同步发 CLI，是在对国产大厂宣战。

你看国内现在做开发者工具的是谁。阿里 Qwen Code 起手晚，字节豆包根本没有独立 CLI，智谱 GLM 有 API 但没有自己的终端。Moonshot 一把推出 kimi-cli，等于告诉整个圈子，"我要抢 Claude Code 的位置，不是抢百度文心的位置"。

这是一个会得罪同行的定位。

但我也得泼一盆冷水。正式版和 Opus 4.6 对标这件事，我持保留态度。benchmark 归 benchmark，真实的编码 agent 体验还要看长程任务的稳定性。K2.6 宣称能跑 4000+ 次工具调用、12 小时连续运行、300 个并行子 agent，这些数字听起来很炸，但目前没有任何第三方实测复现。

国产开源模型的老毛病是，短 benchmark 打得漂亮，放到真实项目里跑几天就开始胡言乱语。我自己还在等 Aider leaderboard 和 SWE-bench 官方榜单更新。

说真的，我是真的希望这次不一样。

## 你可以今晚就动手

如果你今天就想试，三条路。

第一，`pip install kimi-cli` 装官方 CLI，体验一下同一家公司的模型 + 工具闭环。我个人觉得它的"Ctrl-X 切 shell"这个交互值得试一试。

第二，去 OpenRouter 调 K2.6 API，不用翻墙，Cloudflare Workers AI 也上架了。写代码任务直接丢进去。

第三，如果你有 96G 以上显存的本地机器，MLX 和 vLLM 都已经支持了 INT4 权重，周末可以本地跑一把。

我准备下周用 K2.6 跑一个真实的 SaaS 后端重构任务，看它在长程上下文里会不会像 preview 版那样中途失忆。

国产开源追上 Opus 这事到底真不真，一个周末就能验。

## 相关链接
- Moonshot AI 官网，https://moonshot.cn
- kimi-cli GitHub，https://github.com/MoonshotAI/kimi-cli
- Latent Space 报道，https://www.latent.space/p/ainews-moonshot-kimi-k26-the-worlds

---
相关实体:: Moonshot/Kimi | [[anthropic|Anthropic]]/Claude Opus | [[openai|OpenAI]]
相关主题:: 国产AI生态 | [[agent-frameworks|Agent框架]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
