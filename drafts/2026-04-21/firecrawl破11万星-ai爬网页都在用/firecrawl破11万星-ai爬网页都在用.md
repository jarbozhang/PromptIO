# Firecrawl 破 11 万星，为什么 AI Agent 都在用它爬网页

昨晚看到 Firecrawl 冲到 111,133 个 star，我愣了一下。

这玩意儿发布才两年，去年这个时候还不到 2 万 star。现在每个做 RAG、做 Deep Research、做竞品监控的 AI 应用里，打开 package.json 几乎都能翻到它的名字。

Shopify 在用，Zapier 在用，Canva 在用，连苹果和阿里都是它的客户。官网挂出来的 logo 墙有 8 万家公司。

一个爬虫工具凭什么这么猛？我这周拆开看了一下，发现它解决的其实不是"爬"的问题，而是"AI 到底怎么吃网页"这个问题。

## 传统爬虫已经不够用了

先说结论。你要是现在还在用 Puppeteer 手搓爬虫喂给 LLM，大概率是在做无用功。

我前段时间做一个 RAG 管线，需要抓几百个技术博客灌进去。第一版用 Crawlee + Cheerio，遇到三个坑。

第一，一半的站是 SPA，Next.js、Nuxt 渲染完才有内容，Cheerio 拿到的就是个空壳。第二，抓回来的 HTML 里混着导航、侧边栏、评论、广告、Cookie 同意条，喂给 Claude 之前得自己写一堆规则清洗。第三，动不动就被 Cloudflare 拦，代理池自己维护，轮换策略自己写。

搞了一周，我发现自己不是在做 AI 应用，是在做爬虫运维。

Firecrawl 干的事情就是把这三个坑一次性填掉。你传一个 URL，它吐出一段干净的 markdown。JS 渲染、代理轮换、广告剥离、转 markdown，全在它那边搞定。

API 长这样，一行命令，就是真的一行。

```
curl -X POST https://api.firecrawl.dev/v1/scrape \
  -H "Authorization: Bearer fc-xxx" \
  -d '{"url":"https://example.com"}'
```

返回 markdown，可以直接塞进 prompt。

## 三种用法，各自场景

Firecrawl 提供三条路径，选哪条取决于你的规模和预算。

**路线一，SaaS API**。去 firecrawl.dev 注册，500 credit 免费额度一次性给你，够你跑个 demo 验证想法。超了就按月付，Hobby 19 美元 3000 credit，Standard 99 美元 10 万 credit。一次 scrape 扣 1 个 credit，计费清晰。

**路线二，自托管**。仓库是 AGPL-3.0 开源的，docker-compose up 可以本地跑起来。注意这里有坑，GitHub issue #2583 里一堆人抱怨 RabbitMQ 启动时序问题，第一次 up 会失败，得再 up 一次。另外官方明确说了开源版和云版功能不一样，云版有闭源的反爬对抗逻辑，自托管版对付硬核反爬站会明显差一截。

**路线三，集成框架**。官方和社区维护了 LangChain、LlamaIndex、Dify、Flowise 的连接器。Python 装 `firecrawl-py`，Node 装 `@mendable/firecrawl-js`，Go、Rust、Java、Elixir 的 SDK 也都有。最近还上了 MCP server，Claude Code 和 Cursor 里能直接当工具用。

我自己的组合是，本地开发用 SaaS 的免费额度跑 demo，上了生产如果量大就自托管，遇到反爬硬骨头再切回 SaaS 单独处理那几个域名。

## 那跟 Jina Reader 比呢

这是个绕不开的问题。Jina Reader 是 Firecrawl 最直接的对手，中文开发者里用 Jina 的也不少，因为 Jina 是中国团队做的（新加坡注册，创始人中国人），文档有中文，客服也能直接聊。

但用法哲学完全不同。

Jina 的卖点是"零门槛"，任何 URL 前面加 `r.jina.ai/` 就能拿到 markdown，不要注册、不要 key、不要 SDK。真的一秒上手。

Firecrawl 更像一个完整平台。单页抓取只是起点，它还给你 crawl（整站爬）、map（列出全部 URL）、search（搜索+抓取一体）、extract（自然语言描述字段，它给你结构化 JSON）、agent（自主决定抓什么）。

速度上，Firecrawl 官方 P95 是 3.4 秒，Jina Reader 实测平均 7.9 秒。价格上，按 10 万页/月算，Firecrawl 大概是 Jina 的 1/4 到 1/5。

我的判断是，你只是偶尔抓单页喂给 LLM，Jina Reader 就够了，甚至更舒服。但一旦你的应用里出现"爬整站"、"结构化提取"、"定期监控竞品"这种需求，Firecrawl 的功能密度是 Jina 追不上的。

至于 Crawlee 和 Puppeteer，这俩其实不是一个赛道。它们是给工程师用的底层爬虫框架，你得自己写解析、自己处理反爬、自己转 markdown。适合有强定制需求的场景，不适合"我就想快速搞个 RAG"的场景。

## 社区里真实的声音

翻了翻 HN、GitHub issues 和知乎，有几个反馈值得说。

HN 上最常见的正面评价是"It just works"，尤其是对 JS 渲染页面。有人拿它爬了 Notion 公开页、Medium、Substack，一次成功。

负面反馈集中在两个地方。一是云服务偶尔会限流或者超时，尤其是 crawl 整站的时候，一个国外用户在 issue #2111 里吐槽跑大型 crawl 任务要手动重试。二是自托管版本明显功能缩水，issue #1254 里有用户直接说"自己部署了发现比我想象的差很多"。

知乎上有篇高赞文章专门讲 Firecrawl + Dify 搭 AI 客服知识库的完整流程，评论区有人实测抓量子位文章进知识库，效果挺好。但也有人指出 Firecrawl 对需要登录的站（比如公众号后台、内部 wiki）基本没办法，这是所有 SaaS 爬虫的共同短板。

B 站有个 UP 主做了"FireCrawl vs Jina Reader 实测对比"视频，播放量不低，结论和我上面判断一致。Jina Reader 轻量好用但功能单一，Firecrawl 重但全。

## 个人开发者 vs 企业，怎么选

坦率讲，选择路径可以简化成一棵决策树。

**每月需求 < 500 页**，直接用 Firecrawl 免费额度或者 Jina Reader，都不用付费。

**每月 500 到 10 万页，且你是个人或小团队**，买 Firecrawl Hobby 或 Standard。19 美元或 99 美元换来不用维护爬虫，省出来的时间做产品更值。

**每月超过 10 万页，且对数据隐私敏感**（比如你爬的内容有合规要求），考虑自托管。但要有心理准备，反爬能力是缩水的，可能需要自己补反检测逻辑。

**你是大厂，走 Enterprise 合同**，能拿到 SLA 和专属代理池，但这就不是公众号读者关心的场景了。

我个人的建议是，除非你团队里已经有懂反爬的工程师、且需求量巨大，否则直接用 SaaS。自托管看起来省钱，实际上踩坑时间成本远远高于那几百美元订阅费。

反正我在自己的项目里选了 SaaS，99 美元一个月，够跑一个中等规模的 RAG 数据管道，比我自己招一个实习生维护 Puppeteer 脚本便宜。

## 最后

回到开头那个 11 万 star 的数字。

我认为 Firecrawl 真正的护城河不是技术，是它站在了对的位置上，AI Agent 时代，"干净的网页内容"会变成和 OpenAI API 一样的基础设施。

Y Combinator 2024 年投了这家公司，2025 年又跟投了 1450 万美元的 A 轮，Shopify CEO 个人参与。资本用钱投票的方向很明确。

而对我们这些做 AI 应用的人来说，它就是你工具箱里该有的那把螺丝刀。今晚就去注册一下，500 credit 免费额度跑个 demo，比你再花一周手搓爬虫强得多。

你做 AI 应用的时候，爬网页这块用的是什么方案？评论区聊聊。

## 相关链接

- GitHub 仓库，[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)
- 官方定价页，[firecrawl.dev](https://firecrawl.dev/)
- 自托管文档，[SELF_HOST.md](https://github.com/firecrawl/firecrawl/blob/main/SELF_HOST.md)
- Jina Reader 对比，[r.jina.ai](https://jina.ai/reader/)
- 知乎高赞 Firecrawl + MCP 部署教程，[zhuanlan.zhihu.com](https://zhuanlan.zhihu.com/p/1916968465920668946)

---
相关实体:: Firecrawl | Y Combinator
相关主题:: AI工具链 | RAG

<!-- REACH: 7/10 | 品牌△ 利益点✓ 可操作✓ -->
