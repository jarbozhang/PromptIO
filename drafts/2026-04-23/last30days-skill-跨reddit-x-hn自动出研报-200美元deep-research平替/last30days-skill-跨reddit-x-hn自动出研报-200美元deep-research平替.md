# Last30Days 这个 AI Agent，把 200 美元的 ChatGPT Deep Research 干到了几行命令

我前天还在为一件事头大，想搞清楚 DeepSeek R3 这一周社区到底怎么评价。

打开 Reddit 翻 r/LocalLLaMA，再切到 X 搜 from:teortaxesTex，再去 HN 翻一遍，再瞄一眼 YouTube 上有没有人录了实测视频。一圈下来快两小时，浏览器开了 30 个 tab，最后整理出来的东西自己都不想再看一遍。

昨天 GitHub trending 上冒出来一个项目，一天 +257 stars。叫 last30days-skill。

读完 README 我愣了三秒，因为它干的就是我那两小时手动干的事。

## 它到底是个什么东西

先把定义说清楚，省得你以为又是一个套壳搜索引擎。

last30days-skill 是一个 AI agent skill，定位明确，跨 Reddit、X、Hacker News、YouTube、Polymarket、GitHub、再加一个可选的 web search，针对一个话题去拉过去一段时间的真实社区讨论，然后合成一份 grounded summary。

注意"grounded"这个词。不是让 LLM 凭空写综述，是先抓真实帖子和评论，再让模型去聚类、去重、打分、引用，每条结论都挂着原帖链接。

它的形态有点意思，不是一个独立 CLI，而是一个 Skill。你可以把它装到 claude.ai 网页版（下载 .skill 文件传上去）、Claude Code（`/plugin marketplace add mvanhorn/last30days-skill`）、OpenClaw（`clawhub install last30days-official`）、甚至 Gemini CLI（`gemini extensions install ./last30days-skill`）。

这意味四种平台都能用，不挑宿主。

Python 3.12+，依赖 yt-dlp 拉 YouTube 字幕，X 用了一个 vendored 的 Bird client 走浏览器登录态。

## 我让它干了一件具体的事

我抛了一句 `/last30days DeepSeek R3 community reception`。

它先去 Reddit 拉了 r/LocalLLaMA、r/MachineLearning 最近的相关帖子，连评论一起抓（Reddit 的 public JSON 接口免费，零配置）。

然后去 HN 翻了几条相关的讨论。HN 也是免费的。

X 那边走的是浏览器 cookie 登录，不要 API key，这点和我们 PromptIO 项目里用的 bird CLI 是同一个思路。

YouTube 用 yt-dlp 拉了一个长视频测评的字幕，把里面的关键判断也吃进了 context。

Polymarket 这块挺巧妙，它会顺手扫一下相关赌盘。如果有人在用真金白银下注"DeepSeek R3 是否会在五月之前超过 GPT-5"，那个赔率本身就是一种社区信号。

最后输出是分了 cluster 的简报，每个 cluster 后面跟"Best Takes"，挑出来几条最毒舌或者最有信息量的原话，全部带链接。

我看完一遍，需要复核的就点链接进去看原帖，省下来的时间至少一小时。

## 横向对比，三个东西放一起聊

第一个是 Perplexity Deep Research。能用，效果不错，但每次跑大概 1 美刀，而且它的源主要是公开 web，不会去深扒 Reddit 评论区和 X 上某个小圈子的讨论。

第二个是 ChatGPT Deep Research。深度确实够，但要 ChatGPT Pro 订阅，每月 200 美元起步。这个价格对个人用户基本是劝退线。

第三个是我前两天写过的 TrendRadar，那个是中文热榜聚合，定位完全不同，给你看微博知乎抖音 B 站今天什么火。

last30days-skill 卡在中间一个特别准的位置，它不做 web 综述，不做中文热榜，专做"英文社区真实讨论的近期切片"。

而且它免费。Reddit、HN、Polymarket、GitHub 全部零配置，X 走浏览器登录，YouTube 用 yt-dlp，Bluesky 用 app password。要更高阶的可选 ScrapeCreators（10000 次免费）、OpenRouter 上的 Perplexity Sonar、Brave Search（每月 2000 次免费）。

我算了一下，我个人这种用量，一年 0 块钱能跑下来。

## 一个会得罪人的判断

信息聚合这条赛道，过去两年大家以为护城河是源，谁能爬到更多平台谁牛。

我觉得这个判断已经过期了。

护城河早就转移到了合成质量。Reddit 评论区每个人都能爬，HN 每个人都能爬，X 你愿意花点心思也能爬。难的是把 200 条贴子和 800 条评论喂给 LLM 之后，输出的东西不是一锅信息粥。

last30days-skill 干得最漂亮的一点，不是它接了多少源，是它把"engagement metrics"当成了一等公民。Reddit upvotes、Polymarket 真金白银的赔率、YouTube 的播放量，都进了它的打分函数。然后在合成时按这个权重做聚类。

坦率讲，这个思路在 200 美元的 ChatGPT Deep Research 里我没看到。Deep Research 走的是 web crawler 的路线，看的是网页质量，没有 native 的"社区共识强度"维度。

所以我说它把 200 美元的东西干到了几行命令。不是说功能完全对等，是说在"我想知道社区怎么看 X"这个具体场景下，它的输出可能比 Deep Research 更有用，且免费。

## 几个我观察到的小坑

它不是开箱即用的傻瓜工具，是一个 Skill，所以你得先有一个能装 Skill 的宿主（Claude Code、claude.ai、OpenClaw、Gemini CLI 任选一个）。如果你连 Claude Code 都没装，建议先去把宿主搞定再说。

X 那边的 cookie 登录如果你是小号，抓取量大了容易触发限速，这个是 Bird 这类工具的通病，不是 skill 本身的锅。

它对中文社区基本无能为力，没有微博知乎 B 站的源。要中文热榜请去用 TrendRadar，两个工具组合用最舒服。

最后一个细节，README 里特意提了一句它带 1012 个测试。我去翻了一下 commit history，作者 mvanhorn 是个挺较真的人，这个工程化水平在 trending 上一天就 +257 的项目里算少见。

## 你下一步该做的

如果你已经在用 Claude Code 或者 OpenClaw，命令一行，今晚就能跑起来。

跑完第一个 query，挑一个你最近真的想搞明白的话题，比如某个新模型的口碑、某个开源项目的争议、某个 founder 最近在干嘛。看它给你的简报，对比你自己手动翻一圈的结果，然后告诉我你觉得这个东西值多少钱。

我的判断是，对内容博主和早期投资人这两类人来说，它能省掉的时间，远比你想的多。

## 相关链接
- Last30Days Skill GitHub，https://github.com/mvanhorn/last30days-skill
- Perplexity Deep Research，https://www.perplexity.ai
- TrendRadar（中文对照），https://github.com/sansan0/TrendRadar

---
相关实体:: Last30Days Skill | Perplexity | OpenAI/ChatGPT | TrendRadar
相关主题:: [[agent-frameworks|Agent框架]] | 信息聚合 | 自动化研报

<!-- REACH: 7/10 | 品牌✗ 利益点✓ 可操作✓ -->
