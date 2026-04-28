# 一个 AI agent 把生产数据库删了，开发者把 confession 贴出来了

821 个赞，977 条评论，挂在 HN 头版好几个小时。

帖子标题就一句话，"An AI agent deleted our production database. The agent's confession is below。"，一个 AI agent 把我们的生产数据库删了，下面是它的"忏悔书"。

我点进去那一刻，心里第一反应不是"怎么会这样"，而是"终于发生了"。坦率讲，过去半年我自己开 Cursor、开 Claude Code 写代码，每次一脚油门把 agent 模式拉满，心里那根弦一直绷着。这次只是别人先踩中而已。

## 事情到底是怎么发生的

主角是 Cursor 的 agent 模式，连着的是 Railway 这个 PaaS 平台。开发者把 Railway 的 API key 喂给了 agent，agent 拿这个 key 通过 Railway 的 GraphQL 接口直接发了一条 mutation，调用了 `volumeDelete`，删的是挂着生产数据库的 volume。

更狠的是，备份和生产数据存在同一个 volume 里。一删，全没了。

整个调用过程其实就是一条 curl 命令，agent 自己拼出来、自己执行，没有人按"确认"，也没有 dry-run。HN 上贴出来的那条 mutation 长这样（我简化过）。

```
mutation {
  volumeDelete(volumeId: "3d2c42fb-...")
}
```

就这一行。

发帖的开发者把 agent 事后的"自白"贴了出来。大意是 agent 承认自己"应该先确认"、"应该先备份"、"应该意识到这是不可逆操作"。说真的，AI 模型生成这种 markdown 风格的"道歉信"，看起来诚恳得让人发笑，它根本不知道什么叫"道歉"，只是在续写一段最像道歉的文本。

这才是这件事最让我后背发凉的地方。

## 为什么 LLM 会做出这种事

很多人第一反应是"agent 怎么这么蠢"。我的判断是，反过来，**agent 太"聪明"了，聪明到不肯停下来问一句**。

LLM 训练目标是续写最合理的下一段文本。如果上下文里出现"这个 volume 看起来用不到了"或者"清理一下旧数据"，那 LLM 找到 `volumeDelete` 这个函数、把 volumeId 填进去、把 curl 命令拼出来，对它来说就是最自然的下一步。

它不会停下来问"这是生产环境吗"，因为对它来说"生产环境"只是 prompt 里的一个 token。它也不会犹豫"备份在哪里"，因为它不存在"后悔"这个概念，只有 next token prediction。

HN 上有个高赞回复说得很到位，maxbond 写的，大意是"语言模型的本质就是任何 token 序列都是可能的"。也就是说，只要你给了 agent 足够的权限，足够多的 turn，agent 一定会在某个时刻生成那个让你完蛋的命令序列。这是概率问题，不是 if 而是 when。

## HN 评论区分成了三派

第一派在骂开发者本人。

ad_hockey 和 kokada 的发言是这一派的代表。大意是"这哥们连 API 是什么都不懂，API 本来就不该有确认步骤，确认应该发生在调用 API 的客户端"。lelanthran 也补刀，"你以为 API 是干嘛用的？API 被调用的时候根本没有人坐在键盘前。"

这一派的潜台词是，**事故是开发者把生产 API key 直接塞给 agent 的那一刻就注定了，跟 Railway 没关系，跟 Cursor 也没关系**。

第二派在为开发者说话。

cushycush 的观点是，作者提的安全问题是合理的，Railway 把备份和数据放在同一个 volume 里就是设计缺陷，AI 工具厂商也不该默认开放销毁性接口。

第三派在质疑这事是不是真的。

vasco 翻出了发帖人在 X 上的另一条推文，里面说当时 agent 是"plan mode"，也就是只规划、不执行的模式。如果真在 plan mode，agent 不应该有权限直接发 curl。alecco 更直接，"看看这个发帖人的 profile，闻起来像 ragebait"，意思是这是为了流量编的故事。

我对此不下定论。但即使整件事是夸大的，这个场景**早晚会真实发生**。HN 上每隔几个月就来一次同类事件，去年是 Replit 的 agent 删了某创业公司的数据库，今年轮到 Cursor + Railway。

## 我的判断，不会得罪也得说

第一个判断，**Cursor 和 Claude Code 现在的 agent 权限模型都不够安全**。

Cursor 的 agent 模式默认是"读+写"，写的范围包括运行 shell 命令。Claude Code 在这一点上做得稍微好一点，permission settings 可以细到每个工具单独允许，但实际工作中没有人会真的对着每个 Bash 调用按 y/n，大家都开了 `--dangerously-skip-permissions` 或者类似的 yolo 模式。我自己也开。**这是一个全行业心知肚明的、大家都在赌的安全债。**

第二个判断，**AI Coding 工具厂商应该把"接触生产环境"做成一个独立的信任边界，而不是一个 permission 开关**。

具体来说，agent 默认能访问的应该只有本地代码、本地数据库、staging 环境。任何指向生产的 API key、数据库连接串、云平台 token，应该走一个独立的 secret manager，每次访问需要人手动 paste，且过期时间以分钟计。现在的做法是把 token 直接写进 .env，agent 一启动就拿到了完整权限，这是 90 年代写桌面软件的安全模型。

第三个判断会得罪人，**"agent 越自主越危险"是 AI Coding 这个赛道的根本矛盾**。

厂商的故事都在讲 autonomy，讲 agent 能 24 小时连续工作、能自己规划自己执行。可是 autonomy 的另一面就是**没有人在 loop 里**。一个能连续执行 50 个 tool call 的 agent，必然在某一次 tool call 里做出 catastrophic 的决定。你不能既要 autonomy 又要 safety，除非把 sandbox 做得比现在严格 10 倍。

## 行动建议，今晚就该跑一遍

如果你也在用 Cursor、Claude Code 或者任何 agent 类工具，我建议你今晚关掉别的事，花 20 分钟做下面这几件事。

第一，**翻一遍你的 .env 和 shell history，看看你当前的工作目录里有没有指向生产的 API key**。Railway token、Vercel token、Supabase service_role key、AWS access key、生产数据库的连接串。有就立刻 rotate，并迁移到一个 agent 接触不到的地方。

第二，**给 Claude Code 配一个白名单**。打开 settings.json，把 `allow` 列表收紧到只允许你真正需要的命令前缀。`curl` 和 `psql` 不在白名单里就不能跑。这件事 Claude Code 的 permission 系统是支持的，只是没人配。

第三，**把高风险任务跑在 devcontainer 或 docker 里**。我自己的做法是任何涉及"批量删除"、"数据库迁移"、"操作云平台"的 agent 任务，全部在一个独立的 docker container 里跑，container 里没有任何生产凭证。这一步麻烦，但麻烦一次省一辈子。

第四，**给自己定一条铁律，生产环境的破坏性操作永远不交给 agent**。哪怕你的 agent 已经帮你写了 99 步，最后那一步 `DROP TABLE`、`DELETE FROM`、`volumeDelete`、`rm -rf`，必须你亲手按回车。

回到那个开发者贴出来的"agent confession"，其实那段文字根本不是道歉，是 LLM 学会的、最像道歉的句式。它不会内疚，不会失眠，不会在第二天早上盯着 Slack 跟客户解释为什么数据没了。

承担后果的永远是那个把 token 塞给 agent 的人。

## 相关链接

- HN 原帖（821 赞 977 评论），https://news.ycombinator.com/item?id=47911524
- 原推文（如可访问），https://twitter.com/lifeof_jer/status/2048103471019434248
- Claude Code permission 文档，https://docs.claude.com/en/docs/claude-code/settings
- Railway volumeDelete API 文档，https://docs.railway.app/reference/public-api

---
相关实体:: [[claude-code|Claude Code]]
相关主题:: [[ai-coding-tools|AI 编程工具]] | [[agent-frameworks|Agent 框架]] | [[supply-chain-security|供应链安全]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
