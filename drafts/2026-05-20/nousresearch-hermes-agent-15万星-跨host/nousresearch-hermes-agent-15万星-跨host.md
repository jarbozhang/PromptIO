# NousResearch hermes-agent 冲上 GitHub Trending 15.8 万星 会成长的 agent 到底长啥样

打开 GitHub Trending 第一名是 NousResearch 的 hermes-agent，15.8 万星，2.5 万 fork。这个数字我看了两遍。

去年这个时候，单个开源 agent 项目能冲到 5 万星已经算社区现象级。15.8 万是另一个量级，相当于 Next.js 加上 LangChain 的合计体量。我把它 clone 下来跑了大半天，看完 README 又翻了 Skills 目录，第一次比较确定地觉得，跨 host agent 这个形态可能会成。

不是说 hermes-agent 自己有多惊艳，而是它把一件事讲清楚了，同一个 Skill 应该能在 claude-code、codex、openclaw 这些不同的 agent host 上一致跑起来。这件事 Cursor 没在做，Devin 也没在做，但仓库 topics 里挂着 `claude-code`、`codex`、`openclaw`、`clawdbot`、`moltbot` 一串名字的时候，方向已经不需要解释了。

## NousResearch 是谁

NousResearch 不是一个新名字。Hermes 系列开源模型从 Hermes 2 开始就是 Llama 微调圈的常客，Hermes 3 是去中心化 AI 那一拨人最常 fine-tune 的基座之一。这个团队的标签一直比较清晰，不做闭源，不做大公司站队，专注在"开源社区能用的工程化产物"。

所以 hermes-agent 不是凭空冒出来的项目。它继承了 Hermes 模型那一套去中心化思路，只是从模型层下沉到了 agent 层。README 里写得很直白，Use any model you want，Nous Portal、OpenRouter、NVIDIA NIM、OpenAI、自建 endpoint，一条 `hermes model` 命令切换。

模型这一层做解耦，业内做的人已经不少。真正不一样的是它把 host 这一层也解耦了。

## 跨 host 到底是什么意思

先说 Cursor 是怎么做的。Cursor 是把 agent 能力嵌进自己的 IDE，你想用它的能力，就得用它的编辑器。Skill 这个概念在 Cursor 里基本是 rules 文件，绑死在 Cursor 工程里。换个工具，规则就废了。

hermes-agent 走的是另一条路。它符合 `agentskills.io` 的开源 Skill 标准，这个标准简单讲就是规定了 Skill 的目录结构、metadata、调用约定。同一份 Skill 目录，理论上 claude-code 能加载，codex 能加载，openclaw 能加载，hermes-agent 自己也能加载。

我把仓库里一个写 git commit message 的 Skill 拎出来试了一下，结构是标准的 `SKILL.md` 加几个辅助脚本。把这个目录拖到我本地的 claude-code 项目里，claude-code 直接识别。再丢到 openclaw 里，也能跑。两边输出的 commit message 风格略有差异，但都遵循了 Skill 里写的格式约束。

这就是跨 host 的含义。Skill 是资产，host 是消费者，资产不绑定消费者。

差异在哪里。Cursor 是把 IDE 当作 agent 的家，你的 prompt 工程沉淀在 Cursor 里。hermes-agent 是把 Skill 目录当作 agent 的家，你的沉淀跟 host 解耦。前者像 IDE 时代的 VSCode 插件，后者更像 Unix pipe，一个工具产出的东西另一个工具直接消费。

## 跨三个 host 跑同一个 Skill

我选了一个相对复杂的 Skill 测试，仓库自带的一个 `code-review` Skill，做 PR diff 分析。

claude-code 加载这个 Skill，丢给它一个我自己仓库的 PR，输出是结构化的 review，分了"潜在 bug""测试覆盖""命名问题"三段。codex 加载同样的 Skill，跑同一个 PR，输出结构基本一致，措辞偏简洁。openclaw 加载之后，输出多了一段对 commit message 的 review，因为 openclaw 的默认 system prompt 更强调工程规范。

三个 host 行为不完全一致，但 Skill 定义的"必须包含的三段"都保留了。也就是说，Skill 决定了骨架，host 决定了肉。这个分工我觉得是对的，host 之间的差异本来就该保留，强行统一反而失去意义。

跑下来最直接的感受是，我以后写 Skill 不需要再问"这个 prompt 是给 Cursor 写还是给 Claude Code 写"。写一份就够了。

## 我的判断

开源 agent 生态过去两年一直在分裂。每个工具都在自定义自己的 Skill 格式、rules 格式、memory 格式，agent A 用得很顺的东西到 agent B 完全废掉。这个分裂的代价是社区沉淀不下去，大家都在重复造轮子。

我的判断是，分裂正在收敛。`agentskills.io` 这个标准虽然现在还很初期，但 hermes-agent 这种体量的项目站出来作为参考实现，加上 claude-code 和 codex 都在 topics 里被点名，意味着头部 host 已经在事实上承认这个标准。OpenViking 那一拨也在做类似的事情。下一步的竞争重心会从"谁的 agent 更聪明"转移到"谁的 Skill 市场更丰富"。

Cursor 这种 IDE-centric 路线我并不觉得会输，它在编码场景的体验优势短期不会被替代。但 IDE 之外的场景，Discord bot、Telegram 助手、长期运行的服务器 agent，hermes-agent 这种独立进程 + 跨 host Skill 的形态会吃掉很大一块。

至于 openclaw 生态在 topics 里被标注，我倾向理解为一个信号，Nous Research 这种比较挑剔的团队愿意把 openclaw 当作目标平台，说明 openclaw 在 Skill 加载这一层做的事情得到了认可。

## 行动建议

如果你已经在用 claude-code 或者 codex，最快的体验路径是

一，`curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash` 装 hermes，跑一遍内置的 Hello World，感受一下独立 agent 进程是什么体感。

二，去仓库的 `skills/` 目录挑一个你用得上的 Skill，比如 code-review 或者 commit-message，拷贝到你 claude-code 项目的 `.claude/skills/` 下面，看 claude-code 能不能直接消费。能消费就说明你的工作流已经接到了这个生态。

三，写 Skill 的时候按 `agentskills.io` 的格式来。不为了今天能用，是为了明年换 host 的时候你的沉淀不归零。

我最初打开这个仓库是好奇 15.8 万星到底在涨什么。看完一圈，觉得涨的不是 hermes-agent 这个项目本身，是大家都在等一个跨 host 的标准实现，然后有人终于把它做出来了。

## 相关链接

- 仓库主页 https://github.com/NousResearch/hermes-agent
- Agent Skills 开源标准 https://agentskills.io
- NousResearch 官网 https://nousresearch.com

---
相关实体:: [[nousresearch|NousResearch]] | [[hermes-agent|hermes-agent]] | [[claude-code|Claude Code]] | [[codex|Codex]] | [[openclaw|OpenClaw]]
相关主题:: [[agent-frameworks|Agent 框架]] | [[developer-tools|开发者工具]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
