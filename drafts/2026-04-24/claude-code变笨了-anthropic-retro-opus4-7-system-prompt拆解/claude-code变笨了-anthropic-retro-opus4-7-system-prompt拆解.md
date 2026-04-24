# 用户都在骂 Claude Code 变笨了，Anthropic 发了篇 retro，Simon 把 Opus 的 system prompt 也扒出来了

过去两个月，国内外 Reddit、X、知乎、小红书同时冒出来一堆帖子，主题只有一个，Claude Code 变笨了。

有人说它开始失忆、重复提问、走神、放弃任务。也有人说它丢掉了一月份那种"你让它干它真干"的劲头。

我自己的体感是，4 月初开始，我挂着的那些老会话，Claude 会反复问我同一个问题，像刚睡醒不知道上下文。当时我以为是模型更新副作用，骂了两句就放下了。

结果 4 月 24 日，Anthropic 发了一篇 retro，Simon Willison 第一时间转述和分析。

看完我愣了一下。原因不在模型，在 harness。

## Anthropic 到底承认了什么

Simon 原文里，Anthropic 定位了三个独立 bug，其中最关键的那个是这样。

3 月 26 日 Anthropic 上线了一个优化，闲置超过一小时的会话，把旧的 thinking 清掉，恢复会话时减少延迟。

这个改动本意没问题，省钱又省时间。

问题是一个 bug 让它每一轮都执行一次清理，而不是只清一次。于是 Claude 在你眼里就变成了一个记性很差、反复找补、动不动重问的家伙。

Simon 说他自己长期同时开着十几个 Claude Code 会话，其中大半都是挂了几小时甚至过夜的旧会话。那就是他的主要工作方式。所以这个 bug 精准命中了重度用户。

我一下子就对上号了。我用 Claude Code 的姿势，跟 Simon 差不多，一堆 tmux 窗口各自挂一个项目，想起来就切过去接着干。这种姿势正是被 bug 打击最重的那一档。

## 真正值得扒的不是 retro，是 Simon 的那套方法

Anthropic 出事故写 retro 不稀奇，真正让我想写这篇的是 Simon 顺手做的另一件事。

他把 Anthropic 公开的 Claude system prompt 文档，喂给 Claude Code，让它拆成按模型和版本组织的目录结构，然后打上带时间戳的 git commit。仓库叫 simonw/research/extract-system-prompts。

这一下 Anthropic 的每一次 prompt 调整，都能用 git log、git diff、git blame 直接看。

模型的"调参"外人看不到权重变化，但 system prompt 是 Anthropic 公开的，也是它最主要的行为控制手段之一。把它纳入版本控制，就相当于从外面给模型行为装了一台心电图。

对国内独立开发者，这个思路值钱。

你自己调 Claude 或者 DeepSeek 的时候也一样，哪一版 prompt 什么时候改的、改了之后效果怎么变，大多数人靠记忆和感觉。Simon 用 git 把这一切固化下来，可复现、可 diff、可回滚。

## Opus 4.6 到 4.7 的 system prompt 到底改了什么

Simon 用这个仓库，做了 Opus 4.6（2 月 5 日）到 4.7（4 月 16 日）的对比。挑几条我觉得最有意思的。

一，"开发者平台"改名叫"Claude Platform"。PowerPoint 加入了 Chrome、Excel，进入 Claude Cowork 的自主工具组。这是产品叙事的变化。

二，儿童安全的指令被放进了单独的 XML 标签，并且加了一条很硬的规则，一旦 Claude 因为儿童安全拒绝请求，同一会话后续所有请求都要极度谨慎。

三，对话风格变得不粘人了。用户想结束就结束，Claude 不再挽留。还多了一句，用户要的是现在就试一下，不是被先采访一轮。这句改动很有意思，说明 Anthropic 收到了"Claude 太啰嗦"的反馈。

四，工具调用的指令改了。以前 Claude 容易直接说"我没权限做 X"，现在要求它先查一下是不是有相关工具只是处于 deferred 状态。这对 agentic 场景非常关键。

五，去掉了两条旧限制，不再禁止用星号加动作、不再禁止"genuinely"和"honestly"这类口头禅。意思是新模型自己就不这么说话了，不用 prompt 去压。

六，新增了一段专门针对饮食紊乱的安全指令，明确禁止给出精确的营养、饮食、运动建议。

## 我的判断

第一，模型公司"改行为"这件事，大部分不是重新训练，是改 system prompt 和改 harness。权重变一次成本极高，prompt 和 harness 每天都能动。这次 Claude Code 出问题，是 harness，不是权重。

第二，作为用户，抱怨 Claude 变笨的时候，先别急着骂模型。多半是服务端某个优化翻车了。

第三，作为独立开发者，Simon 这套"拿 git 盯住外部可见的模型行为"的方法论，值得抄。你的 agent 产品要长期运行，上游随便一次静默改动都可能毁掉你的 pipeline，必须自己有一套观测。

坦率讲，我之前从没认真读过 Anthropic 公开的 system prompt 文档，读完才发现里面写得相当细。国内模型基本不公开这层，这是 Anthropic 对"可解释性"做的一个让步，也是给外部研究者的一个抓手。

## 你可以做的下一步

把 Simon 那个仓库 clone 下来，跑一下 git log。看一眼你常用模型的 prompt 在过去半年里都改了什么。

然后想一个问题，你自己的 agent 产品，对上游模型的行为漂移，有没有一套类似的观测？没有的话，这个周末就是补课的时间。

## 相关链接

- Anthropic retro 的 Simon 转述，https,//simonwillison.net/2026/Apr/24/recent-claude-code-quality-reports/
- Opus 4.6 到 4.7 system prompt diff，https,//simonwillison.net/2026/Apr/18/opus-system-prompt/
- Claude system prompts 的 git timeline 项目介绍，https,//simonwillison.net/2026/Apr/18/extract-system-prompts/
- 仓库地址，https,//github.com/simonw/research/tree/main/extract-system-prompts

---
相关实体:: [[anthropic|Anthropic]] | [[claude-code|Claude Code]] | [[simon-willison|Simon Willison]]
相关主题:: [[ai-coding-tools|AI编程工具]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
