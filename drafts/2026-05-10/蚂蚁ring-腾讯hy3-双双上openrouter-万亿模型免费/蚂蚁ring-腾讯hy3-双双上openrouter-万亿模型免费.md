# 蚂蚁 Ring-2.6-1T 万亿推理模型 + 腾讯 Hy3 preview 同天免费上 OpenRouter，国产万亿双子线

今天早上刷 OpenRouter 的 new models 列表，连续两条国产万亿。

蚂蚁 inclusionAI 把 Ring-2.6-1T 推上来了，free 档，prompt 和 completion 都标着 $0/1K。腾讯 Hy3 preview 同一天悄悄上线，1K prompt 0.000066 美分，几乎贴着 free 的天花板。两个模型 context 都是 262144 tokens。

我盯着这两条记录看了一会儿，心里冒出一个判断，5 月 8 日蚂蚁刚把 Ling-2.6-1T 放出来（chat 版本），今天 5 月 10 日 Ring 紧接着落地，蚂蚁这是把 chat 和 reasoning 拆成两条线在养，跟 DeepSeek 早期 V3 + R1 双线那套很像。腾讯 Hy3 同天插进来，国产万亿在海外开发者面前算是站成一个方阵了。

## Ring 跟 Ling 不是同一个东西

很多人会把 Ring 和 Ling 混为一谈，我自己一开始也差点弄错。

Ling-2.6-1T 是 chat 模型，5 月 8 日上的，定位是日常对话和指令跟随。Ring-2.6-1T 是推理模型，今天才上，定位是带"思考预算"的 agent workflow，OpenRouter 模型卡里写得很直白，1T 总参，63B 激活，专门针对 coding agent、tool use 和多轮 agent 流程优化。

也就是说，蚂蚁 inclusionAI 这两个月把 chat 路线和 reasoning 路线拆成了两个独立模型。Ring 里有个细节我特意翻了 Reddit，r/AI_Agents 里有人贴过，Ring-2.6-1T 支持 high 和 xhigh 两档 reasoning effort，按任务复杂度动态分配 token 预算，工具密集和多轮场景下 token 开销会比 fixed budget 模型低。

这是冲着 Claude Code、Cursor 这类 agent 场景去的。chat 模型扔进 agent loop 会浪费推理能力，推理模型扔进闲聊场景会烧 token，蚂蚁干脆做两个。

## 腾讯 Hy3 preview 走的是另一条路

Hy3 preview 的模型卡里有一句话很关键，"configurable reasoning levels across disabled, low, and high modes"。

三档可调，包括完全关闭推理。

Ring 是"reasoning 始终在，只调强度"，Hy3 是"reasoning 可以彻底关掉走 fast path"。同样是万亿 MoE，思路明显不一样。Hy3 这种设计对生产环境更友好，便宜任务直接 disabled 模式跑，复杂任务才打开 high 模式，成本可以按场景切。

定价上 Hy3 prompt 0.000066 美分/1K，completion 0.00026 美分/1K，跟 free 档差距非常小，对中国开发者来说几乎没有成本压力。

## 为什么是 OpenRouter 同天落地

我的判断是，国产万亿厂商现在把 OpenRouter 当成默认的海外 API 入口。

OpenRouter 的好处是，开发者不用自己绑各家厂商账号、不用谈各家配额，一个 API key 全家通吃。Ring 用 free 档把开发者拉进来试，Hy3 用接近免费的定价同天插队，两家都看准了 OpenRouter 这条流量入口。

对我们国内开发者来说，OpenRouter 反而是个意外的福利。国内访问 inclusionAI 自家的 API 要绑账号、走自家平台，访问腾讯混元也要走腾讯云控制台。但 OpenRouter 上 Ring free 档可以直接用 OpenAI SDK 协议调用，前缀换成 `inclusionai/ring-2.6-1t:free` 就行，腾讯 Hy3 同理换成 `tencent/hy3-preview`。一个 SDK，两个国产万亿，一个免费档一个准免费档。

## 多平台真实反馈

r/LocalLLaMA 那边今天讨论的焦点是开源问题。Ling 2.6 是 open weights 放出来过的，Ring 2.5 上一代也是 open weights，所以社区的预期是 Ring 2.6 大概率也会跟着开源。这条线如果走完，国内本地推理玩家又能多一个万亿尺寸的选择，跟之前 DeepSeek 系列形成搭子。

r/AI_Agents 里有人专门发帖问 Ring-2.6-1T 真实 agent 任务跑得怎么样。22 个赞 3 条评论，活跃度不算高，原因也很明显，刚上一两天，大部分人还没跑过完整 workflow，社区评价目前是观望期。

## 我的判断

国产万亿模型跑到 OpenRouter 上，和五月份这两周的整体趋势是一致的，国产厂商不再把"出海"当成宣传词，而是直接把 API 摆到全球开发者每天用的工具链上。

DeepSeek 之前已经把这条路趟出来了，蚂蚁和腾讯现在跟上的速度比想象中快。Ring 走 chat-reasoning 双线，Hy3 走 reasoning-on-demand 单模型多档，两种产品哲学同台，这件事对国产 AI 用户来说不是坏消息。

我比较好奇的反而是下一个问题，Ring 的 free 档官方说"for a week"，七天后转付费档时定价会跟 Ling 拉平还是单独定。如果 Ring 比 Ling 贵一截（reasoning 成本天然高），那国产万亿推理模型这条线的真实价格基线就立住了。

## 行动建议

如果你手上有 OpenRouter key，现在可以做三件事，

第一，把 `inclusionai/ring-2.6-1t:free` 接进你正在用的 coding agent 框架，用 high 模式跑一遍真实任务看看 token 利用率。free 档窗口短，趁着免费先把基线数据跑出来。

第二，把 `tencent/hy3-preview` 用 disabled 模式跑一遍便宜任务，对比一下你现在用的国产 chat 模型的吞吐和成本。Hy3 关闭推理后的 fast path 是它的差异化点。

第三，OpenRouter 模型页右上角有 chat 试用入口，不想动代码可以先在网页里聊几句，看看两个模型的中文表达和指令跟随水平。

国产万亿这条线今年还会继续加速，能在第一批就把基线建起来的开发者，后面切模型的时候会比临时抱佛脚的人省很多时间。

## 相关链接

- Ring-2.6-1T (free) on OpenRouter, https://openrouter.ai/models/inclusionai/ring-2.6-1t:free
- Tencent Hy3 preview on OpenRouter, https://openrouter.ai/models/tencent/hy3-preview
- r/LocalLLaMA Ring 2.6 1T 讨论帖, https://www.reddit.com/r/LocalLLaMA/comments/1t7bvmq/ring_26_1t/
- r/AI_Agents Ring 真实任务实测求助, https://www.reddit.com/r/AI_Agents/comments/1t83zn3/anyone_tried_new_free_for_a_week_1tmodel_on/

---
相关实体:: [[ant-group|蚂蚁集团]] | [[inclusion-ai|inclusionAI]] | [[tencent|腾讯]] | [[openrouter|OpenRouter]] | [[deepseek|DeepSeek]]
相关主题:: [[chinese-ai|国产 AI]] | [[ai-pricing|AI 定价]] | [[local-inference|本地推理]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
