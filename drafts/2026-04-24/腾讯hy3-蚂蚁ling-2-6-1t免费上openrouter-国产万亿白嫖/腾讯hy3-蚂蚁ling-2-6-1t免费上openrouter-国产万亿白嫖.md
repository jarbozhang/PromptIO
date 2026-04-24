# 腾讯 Hy3 和蚂蚁 Ling-2.6-1T 今天同日免费上 OpenRouter，国产万亿模型白嫖时代到了

今天 OpenRouter 的 new model 推送里，腾讯和蚂蚁在同一天甩出来两个大模型，Hy3 preview 和 Ling-2.6-1T，两个都是 MoE 架构，两个都是 262144 的超长上下文，两个都是 $0 prompt/$0 completion。

一天两个国产巨头，一起免费开路，这在 OpenRouter 历史上不多见。

我看到第二封推送邮件的时候愣了一下，以为自己刷新重复了。

## 这不是"又一个免费模型"

去年这时候，国产模型上 OpenRouter 的节奏还是"一个月听个响"，而且大部分是挂个 free tier 试水几天就转付费。

这次不一样。

腾讯 Hy3 preview 的官方描述写得很清楚，是 "designed for agentic workflows and production use"，也就是奔着 agent 生产场景去的，还支持 disabled/low/high 三档可配置推理等级。

蚂蚁 inclusionAI 的 Ling-2.6-1T 直接把"万亿参数旗舰"和"fast inference"这两个矛盾词写进了卡片，定位是"real-world agents that require fast execution and high efficiency at scale"。

两家都把 agent 当主战场，这个方向感非常一致。

## 先说 Hy3，腾讯这次不走寻常路

我看了 model card，Hy3 preview 的核心卖点是三档推理开关。

disabled 是纯指令模式，low 是轻量思考，high 是深度思考。这个设计和 Claude 的 thinking、GPT-5 的 reasoning effort 思路是一样的，但腾讯把控制权直接暴露给了开发者。

说实话我一开始挺关心 Hy3 和大家熟悉的混元系列是什么关系，模型 ID 是 tencent/hy3-preview 而不是 hunyuan，这点目前没看到官方明确说法，我就不瞎猜了。

有一点可以确认，它是 MoE，是 preview 版本，是奔着"能上生产"去调的，不是那种纯 benchmark 表演。

262144 的上下文，够你把一个中型代码仓库扔进去做 repo-level 的改写任务，或者接一个长对话的客服 agent 不用再切片。

我的判断是，腾讯这次想抢的是"国内 agent 开发者默认选型"这块地。以前大家做 agent，国外选 Claude，国内选 DeepSeek V3 或者 Qwen。Hy3 preview 免费挂出来，等于给国内开发者一个"免费+可配置思考深度+长上下文"的新组合拳。

## Ling-2.6-1T，蚂蚁把万亿模型直接开了

inclusionAI 是蚂蚁集团的开源品牌，这个之前在 HuggingFace 上已经放过好几个 Ling 系列的模型，现在直接把"2.6-1T"这个版本号往外推，1T 就是一万亿参数。

我第一反应，一万亿参数的模型，跑一次推理要烧多少卡？

结果蚂蚁卡片上直接写了"fast inference"架构，意思是它虽然总参数一万亿，但激活参数可能只是其中一小部分（典型 MoE 玩法），所以单次调用的成本控制得住。

这也是为什么他们敢免费放出来。

我认为万亿级 MoE 的免费放开，比小模型免费的意义大得多。因为它验证了一件事，国产团队已经有能力把万亿级模型的推理成本压到"可以当促销品送"的水平。

这对中国开发者太关键了。你想想看，以前我们做 RAG、做 agent，但凡涉及长上下文+复杂推理，默认思路就是"调一下 Claude Opus 或者 GPT-5"，一个月账单上千是常态。现在 Ling-2.6-1T 免费，262k 上下文，你哪怕只是用它做离线批处理、生成合成数据、做 agent eval，都能省下大笔 API 费。

## 怎么白嫖，三步搞定

其实吧，OpenRouter 的白嫖路径一直都那么几步，今天这两个模型也一样。

第一步，去 openrouter.ai 注册账号，支持 Google 登录，完全不需要信用卡。

第二步，Keys 页面创建一个 API key，起个名字，复制保存。

第三步，把 key 塞进你现有的 OpenAI 兼容客户端里，base_url 改成 https://openrouter.ai/api/v1，model 名字分别填 tencent/hy3-preview:free 和 inclusionai/ling-2.6-1t:free。

Cline、Cursor、Continue、Open WebUI 这些常用客户端全都兼容 OpenAI 接口，换个 base_url 和 model 就能跑。

有个坑我提前说一下，OpenRouter 的免费模型有 rate limit，默认每天 50 次左右，如果你充值 10 美金余额就能解锁到 1000 次/天。我自己的策略是免费额度用来跑日常 agent 任务，批量活用带缓存的收费版本。

另外 262k 的上下文虽然官方开放，但实际跑长 prompt 的时候，很多免费 tier 会有隐性的软限制，别指望一上来就塞满。先从 32k 试起，稳了再往上顶。

## 社区还在观望

目前 Hy3 和 Ling-2.6-1T 的评测数据都还没铺开，HuggingFace 的讨论区里 Ling 系列之前的版本有一些使用反馈，集中在"中文指令跟随不错但英文 reasoning benchmark 偏弱"，这个是 Ling 系列的老特点。

Hy3 preview 因为是 preview，目前没什么像样的第三方评测，只有 OpenRouter 卡片的官方描述。

所以老实讲，现在下结论"哪个更强"还早。我的建议是先拉一批你自己业务里最真实的 10-20 条 prompt，两个模型各跑一遍，对比输出，三分钟见真章，比看 benchmark 靠谱得多。

## 我最想说的一句

国产万亿级 MoE 开始"免费出厂"，这件事的长期意义，我认为比今年任何一次国产模型排行榜刷分都大。

以前中国开发者做 AI 产品，成本结构里最硬的一块就是 API 费，现在这块被腾讯和蚂蚁用两个免费万亿模型，直接按到了地板上。

打开 OpenRouter，把两个模型都加进你的 client 白名单，今晚就能试。

## 相关链接

- Tencent Hy3 preview (free)，https://openrouter.ai/models/tencent/hy3-preview:free
- inclusionAI Ling-2.6-1T (free)，https://openrouter.ai/models/inclusionai/ling-2.6-1t:free
- OpenRouter API 文档，https://openrouter.ai/docs

---
相关实体:: [[tencent|腾讯]] | [[ant-group|蚂蚁集团]]
相关主题:: [[ai-pricing|AI定价]] | [[agent-frameworks|Agent框架]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
