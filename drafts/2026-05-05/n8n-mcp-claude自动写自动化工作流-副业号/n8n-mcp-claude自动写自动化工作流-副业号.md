# 本来要写 50 行 JSON，现在我用一句中文让 Claude 把 n8n workflow 拼好了

我做副业自动化两年了，n8n 装了三遍卸了两遍。

不是工具不好，是它"可视化"那层皮骗了我太久。点开一个 HTTP Request 节点，里面 30 多个字段，光研究一个 Google Sheets 节点的写入参数就能耗掉一下午。所谓的"无代码"，到了真要跑通的环节，本质还是逼你手写 JSON、对着官方文档翻字典。

直到这周看 GitHub trending，看到一个叫 n8n-mcp 的项目单日涨了 496 颗星。作者 czlonkowski，一个波兰开发者，干的事很单纯，把 n8n 全部 1650 个节点的 schema 整成一个数据库，做成 MCP server，让 Claude Code、Cursor、Windsurf 这种带 MCP 的 AI 客户端可以直接读到节点定义。

意思是，你不用再翻 n8n 文档了。Claude 翻。

## 它解决的不是"AI 写代码"，是"AI 不再瞎猜 JSON"

我先说清楚为什么这玩意儿值得装。

之前不是没人尝试让 ChatGPT 或 Claude 直接生成 n8n workflow 的 JSON。问题是 LLM 没见过最新版 n8n 的节点 schema，大概率给你编一个看起来对、但导入进去全是红色感叹号的 workflow。每个字段名是不是 camelCase、enum 选项有没有这一项、required 字段漏没漏，全靠模型瞎蒙。

n8n-mcp 的解法很朴素，把官方 1650 个节点的属性、operations、文档全爬下来塞进一个 SQLite，再开 MCP 协议给 Claude 用。Claude 写 workflow 之前先查一下"这个节点支持哪些 operation""这个字段必填吗"，然后再拼 JSON。

我跑了一下，仓库 README 说节点覆盖率 99%，还内置了 2352 个 workflow 模板可以直接 fuzzy 搜索。你描述需求，它先去模板库捞一个最像的，再按你的具体要求改字段。

这跟"让 AI 从零写 50 行配置"完全是两件事。前者准确率十不存一，后者按我这两天的体感，简单 workflow 一次过的概率有 70% 往上。

## 装它只要一行命令

副业号读者最关心这个，我直接说装法。

如果你已经在用 Claude Code 或者 Cursor，打开 MCP 配置文件，加一段。

```
"n8n-mcp": {
  "command": "npx",
  "args": ["n8n-mcp"]
}
```

就这样。不需要 API key，不需要登录 n8n 账号（除非你想让 Claude 直接调你 n8n 实例的 API 部署 workflow，那需要再配一个 N8N_API_URL）。npx 第一次跑会下大概几十兆的节点数据库，之后启动很快。

我自己装在 Claude Code 里，重启 Claude，输入 `/mcp` 看到 n8n-mcp 显示绿色就成了。

## 场景一，让 Claude 监控某个 GitHub 仓库的 release 推到我微信

这是我跑通的第一个 workflow，副业号用得最多。

我盯了几个 AI 项目，比如 vLLM、SGLang、Hermes，新版本一发我得第一时间跟进写文章。以前是手动刷 GitHub release 页面，漏过好几次。

我跟 Claude Code 说的原话是这样。

> 帮我用 n8n 做一个 workflow。每小时检查一次 vllm-project/vllm 的最新 release，如果有新版本，把版本号、release notes 摘要发到我的企业微信群机器人。机器人 webhook 是 https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxx。

Claude 干的事，先查 n8n-mcp 里 Schedule Trigger、HTTP Request、Code、HTTP Request 几个节点的字段定义，再去模板库找有没有现成的 GitHub 监控模板，然后给我吐出来一个 5 节点的 workflow JSON。我导入 n8n，把 webhook key 填上，激活。

跑通了。中间踩了一个坑，Claude 一开始把 release notes 直接塞进企业微信的 markdown 字段，超过 4096 字符报错。我跟它说"加一个 Code 节点，截到 1000 字以内并加省略号"，它直接补了一段 JS。

整个过程我没碰过 n8n 的可视化界面去拖节点，全在 Claude 对话里完成。

## 场景二，闲鱼新货监控（不是客服，是选货）

4 月 30 日号里写过 XianyuAutoAgent，那是闲鱼 AI 客服。这次的场景反过来，是给做闲鱼倒爷的朋友做的，他想自动盯几个关键词，比如"iPhone 15 Pro Max 256 全新"，价格低于某个值就推送给他。

我跟 Claude 说。

> 用 n8n 做一个工作流，每 10 分钟用 HTTP Request 调闲鱼搜索 API，关键词是 iPhone 15 Pro Max 256，过滤价格低于 6500 的新发布商品，去重后推送到我的钉钉群。商品链接、标题、价格、卖家位置都要带上。

闲鱼搜索接口需要登录态，Claude 主动问我能不能拿到 cookie，我把浏览器开发者工具里抓的 cookie header 贴过去，它把 HTTP Request 节点的 headers 字段填好了。去重那块它用了 n8n 的 Static Data 存上一轮的商品 ID 列表。

这个 workflow 上线第三天给朋友推了一台 5980 的成色 95 新机，他抢到转手赚了 800。这种活儿放半年前我得给他写 200 行 Python 加 cron，现在一句中文加一段 cookie 搞定。

要补一句，闲鱼接口随时会变，鉴权失效就得重新拉 cookie。这种依赖第三方私有接口的 workflow 不算"一劳永逸"，但维护成本比从头写代码低一个数量级。

## 它不是银弹，我也踩了几个坑

仓库 issues 里翻了一圈，跟我体感对得上。

第一个坑是 Claude 生成的 workflow 偶尔过不了 n8n 的 Zod 校验。issue #532 就是这个，schema 看起来对，实际部署报错。我自己遇到过一次，最后是手动改了一个 connections 字段的格式才过。

第二个坑是部分国产服务节点（比如钉钉、企业微信）n8n 官方没原生支持，Claude 会自动用 HTTP Request 节点拼，但参数格式得你自己核对一下。这块 n8n-mcp 帮不了你，因为它只懂官方节点。

第三个坑是 r/n8n 上 4 月有个老哥写了个长帖说"我浪费一年才搞懂 n8n 的正确姿势"，他强调的是**错误处理和边界情况**，AI 生成的 workflow 默认很乐观，没考虑接口超时、字段为空、配额超限。这些我建议你自己手动补一个 Error Trigger 节点兜底。

## 我的判断，副业号该不该上车

我认为该上。

不是说 n8n-mcp 这工具有多神，是这条技术路径，MCP 加上现有自动化平台，在解决一个真问题，把"想自动化但写不动 JSON 的人"和"会写 prompt 但不想学每个 SaaS API 的人"接上了。

n8n 自己也在卷 AI workflow 编辑器，但那个是云端付费版才有。n8n-mcp 把这能力解耦到本地，配合 Claude 的免费额度（或者 Cursor 的订阅），副业号花的钱就是一个云服务器跑 n8n 的月租，二十几块。

最大的变化是**做一个新自动化的边际成本变了**。以前我心里要琢磨"这事值不值得我花一下午搞一个 workflow"，现在变成"我口述十分钟试一下，跑通就跑通了，跑不通也没浪费"。

副业的本质是堆量。能把单个工作流的实验成本砍到十分之一，整个副业号的 ROI 就不一样了。

## 行动建议

如果你还没装过 n8n，先在自己机器上 docker run 一个本地版玩玩，别上来就搞云服务器。

然后在 Claude Code 或 Cursor 里加上 n8n-mcp 的 MCP 配置，重启客户端。

第一个 workflow 不要挑复杂的，从"监控某个 RSS / GitHub release / 网页变化推到微信"开始。这是 AI 生成成功率最高的类型，也是副业号最常用的基建。

跑通了再上闲鱼监控、小红书评论抓取、群消息归档这些有真实变现链路的活儿。

如果你跑通了一个有意思的 workflow，欢迎留言说说你的 prompt 和坑。我下一篇打算聚一组实测下来收益最高的副业 workflow 模板，把读者的真实案例也收进去。

## 相关链接

- n8n-mcp 仓库 https://github.com/czlonkowski/n8n-mcp
- n8n 官方 https://n8n.io/
- r/n8n 社区帖 "I wasted over 1 year building n8n workflows the wrong way" https://www.reddit.com/r/n8n/comments/1sqjyzt/

## Obsidian 关联

实体 [[n8n|n8n]] [[anthropic|Anthropic]] [[claude-code|Claude Code]] [[cursor|Cursor]]

主题 [[ai-monetization|AI 变现]] [[agent-frameworks|Agent 框架]] [[workflow-automation|工作流自动化]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
