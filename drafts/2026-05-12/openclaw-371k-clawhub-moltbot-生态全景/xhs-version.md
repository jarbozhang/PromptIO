# openclaw 37 万星了，但我劝你先别装

家人们，今天 GitHub Trending 上 openclaw 又冲上来了 🦞

371100 颗星，76756 个 fork。这是我第三次看见它出现在 trending，前两次我都跳过了，因为只是星数往上挪。但今天我想停下来聊一下，因为这条生态线在过去三周里"长出形状"了。

我没有要吹它，恰恰相反，这篇是劝你**先别急着装**。

## 先把这条线的名字钉清楚

openclaw 这个名字特别容易混，我整理了一下 👇

- **openclaw 主仓库** —— TypeScript 写的跨平台个人 AI 助手，371k 星
- **clawhub** —— 扩展和插件的集散地，社区 skill 都丢这
- **clawdbot** —— 自动化机器人，把助手能力绑到 IM、邮件、定时任务
- **moltbot** —— 实验性 agent，名字里的 molt 是"蜕壳"
- **hermes-agent** —— NousResearch 维护的开源持久 agent，13 万星

最有意思的一条信号：hermes-agent 在 GitHub topics 字段里主动挂上了 openclaw、clawdbot、moltbot 的标签。这是仓库**主动靠过来站队**，不是别人贴的，搜索和推荐都吃这个字段。

## 这三周到底发生了什么

第一件事，4 月有一波安全事件。官方原话是"安全报告比 curl 多 60 倍，至少 20% 的 skill 贡献是恶意的"。扩展面越大，暴露面越大，这是绕不开的底色。

第二件事，hermes-agent 把 topics 字段绑过来。Reddit 上有个热评写得很到位："hermes 扩展数量没 openclaw 多，但它最重要的一点是稳定，我不需要每隔几天就 debug 它。"

第三件事，Spotify 开了 agent 入口，第一批合作名单里 openclaw 排第一个。一行 curl 就能装上 Save to Spotify CLI，agent 写完播客直接进个人订阅。这是 openclaw 第一次拿到面向消费者 app 的分发口子 🎧

## 社区在吵什么

r/LocalLLaMA 上一条 899 赞的帖子，标题是"openclaw 25 万星，我唯一找到的可靠用法是每日新闻摘要"。

热评原话：
- "你忘了它最主要的用法，在 github 上给自己刷 star" 🌟
- "还是个安全噩梦载体，别忘了"
- "我用了几天就扔了，不如自己写个最简单的 wrapper"

r/openclaw 自家社区还有一条 154 赞的帖子，标题是"3 个月了，我放弃了，openclaw 成了一个吞钱坑"。作者写："我花在伺候它基础设施上的时间，比真正干活的时间还多。"

37 万星不等于 37 万忠实用户，这事得说清楚。

## 我的判断

openclaw 这条生态今天的真实状态：**底座最大，但用法最散，分发口子在打开，稳定性是已知短板**。

底座大是真的，37 万星 + 跨平台 + clawhub 扩展集散，TypeScript 圈没第二个项目做到这个覆盖。

但用法散也是真的，社区里反复出现的就是"装了不知道干嘛""稳定性差到要不停 debug"。

hermes-agent 现在跟 openclaw 走的是互补路线，一个底座广但记忆弱，一个扩展少但稳定强。**组合起来比单跑 openclaw 像样得多。**

## 给中国用户的实操建议

1️⃣ **先别急着装主仓库**。安全事件还没真正过去，想跑个人 AI 助手的话，hermes-agent 作为入口比 openclaw 安全。

2️⃣ **模型走国内 API**。直接打 DeepSeek、Kimi、Qwen 官方 API，或者 OpenRouter，token 成本能砍掉一大截。Reddit 那条 money pit 帖子核心抱怨就是国外模型把账单跑爆了。

3️⃣ **本地跑也行**。Unsloth 五月初有教程，本地跑 Gemma 4 和 Qwen 3.6 的 GGUF 模型，24GB 内存够用。

4️⃣ **clawhub 挑扩展三件套**：看 commit 频率 → 看 issue 响应 → 看是不是只有一个匿名维护者。三条全过再装。

5️⃣ **保持观望也是一个动作**。Reddit 上有一条评论我印象很深："等三个月再看一次，如果你身边真有人在用，再装。" 这个标准放在今天仍然成立。

下次再看到 openclaw 冲上 trending，我大概率还是会跳过。除非 clawhub 的审计机制真的上线，或者 hermes-agent 这条线长出新形态。

家人们，星数好看不代表能干活，记住这一句 🫡

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
