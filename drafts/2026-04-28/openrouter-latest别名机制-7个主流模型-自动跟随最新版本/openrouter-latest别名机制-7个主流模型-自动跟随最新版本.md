# OpenRouter 给 7 个主流模型一口气加了 Latest 别名，再也不用追模型版本号了

我前两天刚把生产环境里一个 Agent 的模型 ID 从 `claude-3-5-sonnet-20241022` 换成 `claude-sonnet-4-20250514`，刚换完三天，OpenRouter 一口气放出了 7 个 `~latest` 别名。

我盯着控制台看了两秒，骂了一句脏话。

这 7 个别名分别覆盖 Kimi、Claude Haiku、Claude Sonnet、Gemini Flash、Gemini Pro、GPT、GPT Mini，全是中国开发者最常用的主力档。规则只有一条，调用 `~moonshotai/kimi-latest`、`~anthropic/claude-sonnet-latest` 这种 ID，OpenRouter 帮你自动指向各家当前最新版本。

我知道有人会撇嘴，"不就是个别名吗，我自己 if-else 也能搞定"。等会再聊这个，先把事情讲清楚。

## 模型版本号是中国开发者最隐形的成本

我做过一段时间国内中型团队的咨询，发现一个反常识的现象，**真正拖慢国内 AI 产品迭代的不是算力也不是 API 价格，而是模型版本号**。

听起来很扯。但你想想看，一个最普通的场景。

你在 prod 跑 `gpt-4-turbo-2024-04-09`，老板某天开会说 "听说 GPT 又升级了，我们的客服效果是不是落后了"。你回去查一遍 OpenAI 文档，发现已经有 `gpt-4-1106-preview`、`gpt-4o-2024-05-13`、`gpt-4o-2024-08-06` 三个新版本。每个都得跑一遍 eval，每跑一次都要排几个小时的 GPU 队列。

最后你大概率发现升不升级差别不大，那一周白搭进去了。

更难受的是 Anthropic。Claude 的版本号像考古学，`claude-3-haiku-20240307`、`claude-3-5-haiku-20241022`、`claude-haiku-4-5-20250514` 一长串数字。我自己有一次记错了一位，整个 Agent 跑了半天才发现走的是老模型，回答质量下降一个档。

国产模型也好不到哪去。Kimi、DeepSeek、豆包都有版本快照机制，每次升级都有一个新 ID。你要么写一个 model registry 去维护，要么硬编码然后定期手动同步。

这就是 `~latest` 别名想解决的事。

## 7 个别名的具体配置

我把 7 个 ID 全列一下，你直接复制就能用。

`~moonshotai/kimi-latest`，256K 上下文，输入约 $0.74/M tokens，输出 $4.66/M。支持文本和图像，国内合规出海项目最常用的多模态档。

`~anthropic/claude-haiku-latest`，200K 上下文，输入 $1/M，输出 $5/M。Claude 家族里跑批量任务和写代码补全的实用档。

`~anthropic/claude-sonnet-latest`，1M 上下文，输入 $3/M，输出 $15/M。这次最让我意外的是上下文直接给到 1M，做长文档分析的同学可以省掉一层切片逻辑了。

`~google/gemini-flash-latest`，1M 上下文，输入 $0.5/M，输出 $3/M。全模态输入，文字图像音频视频都吃。

`~google/gemini-pro-latest`，1M 上下文，输入 $2/M，输出 $12/M。同样是全模态。

`~openai/gpt-latest`，1.05M 上下文，输入 $5/M，输出 $30/M。GPT 系列里的旗舰档。

`~openai/gpt-mini-latest`，400K 上下文，输入 $0.75/M，输出 $4.5/M。和 Kimi latest 价格几乎贴脸。

把这七个并排放在一起看，有一个数字会跳出来。**Gemini Flash 是这一档里上下文窗口最大、价格最低、模态最全的**。我自己跑过几个长文档摘要任务，flash 跑出来的质量在我这种偏宽松的评测标准下其实够用。

不是说 Flash 一定好，是说现在做模型选型，价格和能力的等高线已经被拉得很奇怪。OpenRouter 这次把 7 家放在一个统一的命名空间里，恰好把这种"奇怪"摊在你面前。

## 我的判断，真正的价值不在省事

回到开头那个 "不就是个别名吗" 的质疑。

我自己写过一个 model registry，就是个 yaml 文件加一个加载脚本，配上 LangChain 的 model wrapper 就能跑。从工程角度讲，确实没什么了不起。

但 `~latest` 别名的真正价值，不是帮你少写一个 yaml。**是它把"跟进最新模型"这件事的心智成本降到了零**。

我观察身边做 AI 应用的朋友，有一个很有意思的分化。有的团队每周都会扫一遍各家的模型更新，永远跑在最前沿。有的团队半年都不换一次模型，因为 "上次升级踩了坑，老板说稳定优先"。

后者更常见。我合作过的甲方里面至少七成是这种状态。

不是他们懒，是切换成本太高。每一次切换都要重新 eval、重新调 prompt、重新做回归测试。一旦有个团队成员请假，这事就拖一个月。

`~latest` 别名给 "稳定优先" 派一条妥协路径，你可以选择信任 OpenRouter 的判断，让它替你做版本跟随。当然代价是某次 OpenAI 偷偷改了 API 行为，你的 prod 可能也跟着抖一下。

我认为这个 trade-off 对大部分中小团队是划算的。**模型版本管理本来就不该是业务团队该花精力的事**。

唯一要小心的是 prompt 的鲁棒性。如果你的 prompt 高度依赖某个特定版本的模型行为（比如某个版本的 JSON 输出格式特别稳），latest 别名可能会让你某天突然破防。这种情况下还是老老实实锁版本号。

## 实际接入的最小例子

OpenRouter 的接入和 OpenAI SDK 完全兼容。

```python
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_KEY,
)
resp = client.chat.completions.create(
    model="anthropic/claude-sonnet-latest",
    messages=[...],
)
```

注意 `~` 在调用时不用打，OpenRouter 网页端展示用的前缀。实际 model 字段直接写 `anthropic/claude-sonnet-latest` 就行。

国内访问 OpenRouter 是国内云厂商的常用路径，我自己用的是 OpenRouter 的官方 API 直连。绝大部分国内主流云的出海账号都能稳定调通。

行动建议很简单，把你现有项目里最不重要的一条调用链（比如内部测试用的 chatbot），把模型 ID 改成 `~latest` 版本，跑一周看看。**如果一周内没踩坑，再决定要不要推到主链路**。

回到开头那条骂街。我那个刚换完版本号的 Agent，今晚下班前会改成 `claude-sonnet-latest`。下次 Anthropic 再升级，希望我能装作什么都没发生。

## 相关链接

- OpenRouter Models 页面，https://openrouter.ai/models
- Kimi Latest，https://openrouter.ai/models/~moonshotai/kimi-latest
- Claude Sonnet Latest，https://openrouter.ai/models/~anthropic/claude-sonnet-latest
- Gemini Flash Latest，https://openrouter.ai/models/~google/gemini-flash-latest
- GPT Latest，https://openrouter.ai/models/~openai/gpt-latest

---
相关实体:: [[openrouter|OpenRouter]] | [[openai|OpenAI]] | [[anthropic|Anthropic]] | [[google|Google]] | [[moonshot|Moonshot]]
相关主题:: [[ai-pricing|AI定价]] | [[agent-frameworks|Agent框架]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
