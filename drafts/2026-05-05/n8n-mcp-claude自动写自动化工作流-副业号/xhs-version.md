# 本来要写 50 行 JSON，现在我用一句中文让 Claude 把 n8n workflow 拼好了

我做自动化两年，n8n 装了三遍卸了两遍。

不是工具不好，是它"可视化"那层皮骗了我太久。点开一个 HTTP Request 节点 30 多个字段，光研究一个 Google Sheets 节点的写入参数就能耗一下午。所谓的"无代码"，到了真要跑通的环节，还是逼你手写 JSON、对着官方文档翻字典。

这周看 GitHub trending，看到 n8n-mcp 单日涨了 496 颗星。作者 czlonkowski 干的事很单纯，把 n8n 全部 1650 个节点的 schema 整成数据库，做成 MCP server，让 Claude Code、Cursor 这种带 MCP 的 AI 客户端可以直接读节点定义。

意思是，你不用再翻 n8n 文档了。Claude 翻。

## 它解决的不是"AI 写代码"，是"AI 不再瞎猜 JSON"

之前不是没人尝试让 LLM 直接生成 n8n workflow 的 JSON。问题是模型没见过最新版 n8n 的节点 schema，大概率给你编一个看起来对、但导入进去全是红色感叹号的 workflow。每个字段名是不是 camelCase、enum 有没有这一项、required 字段漏没漏，全靠模型瞎蒙。

n8n-mcp 的解法很朴素，把 1650 个节点的属性、operations、文档全爬下来塞进 SQLite，再开 MCP 协议给 Claude 用。Claude 写 workflow 之前先查"这个节点支持哪些 operation""这个字段必填吗"，然后再拼 JSON。

仓库 README 说节点覆盖率 99%，还内置 2352 个 workflow 模板可以 fuzzy 搜索。我跑了两天，简单 workflow 一次过的概率有 70% 往上。

## 装它只要一行命令

如果你已经在用 Claude Code 或 Cursor，打开 MCP 配置文件加一段。

```
"n8n-mcp": {
  "command": "npx",
  "args": ["n8n-mcp"]
}
```

不需要 API key，不需要登录 n8n 账号。npx 第一次跑会下几十兆的节点数据库，之后启动很快。我装在 Claude Code 里，重启后输入 `/mcp` 看到 n8n-mcp 显示绿色就成了。

## 场景一，监控 GitHub release 推到企业微信

我盯了几个 AI 项目，新版本一发要第一时间跟进。以前是手动刷 release 页面，漏过好几次。

我跟 Claude Code 说的原话是。

> 帮我用 n8n 做一个 workflow。每小时检查一次 vllm-project/vllm 的最新 release，如果有新版本，把版本号、release notes 摘要发到企业微信群机器人。

Claude 先查 n8n-mcp 里 Schedule Trigger、HTTP Request、Code 几个节点的字段定义，再去模板库找有没有现成的 GitHub 监控模板，吐出来一个 5 节点的 workflow JSON。我导入 n8n，把 webhook key 填上，激活。

跑通了。中间踩了一个坑，Claude 一开始把 release notes 直接塞进企业微信的 markdown 字段，超过 4096 字符报错。我跟它说"加一个 Code 节点截到 1000 字以内并加省略号"，它直接补了一段 JS。

整个过程没碰过 n8n 可视化界面去拖节点，全在对话里完成。

## 场景二，闲鱼关键词监控

朋友想自动盯几个关键词，比如"iPhone 15 Pro Max 256 全新"，价格低于某个值就推送给他。

我跟 Claude 说。

> 用 n8n 做一个工作流，每 10 分钟用 HTTP Request 调闲鱼搜索接口，关键词是 iPhone 15 Pro Max 256，过滤价格低于 6500 的新发布商品，去重后推送到我的钉钉群。

闲鱼搜索接口需要登录态，Claude 主动问我能不能拿到 cookie，我贴过去后它把 HTTP Request 节点的 headers 字段填好。去重那块用了 n8n 的 Static Data 存上一轮的商品 ID 列表。

这个 workflow 跑了三天就抓到几条匹配的低价信息。这种活儿放半年前我得给他写 200 行 Python 加 cron，现在一句中文加一段 cookie 搞定，自动化能省下手动盯页面的时间。

要补一句，闲鱼接口随时会变，鉴权失效就得重新拉 cookie。这种依赖第三方私有接口的 workflow 不算"一劳永逸"，但维护成本比从头写代码低一个数量级。

## 它不是银弹，我也踩了几个坑

第一个坑是 Claude 生成的 workflow 偶尔过不了 n8n 的 Zod 校验，schema 看起来对，实际部署报错。我自己遇到过一次，最后是手动改了一个 connections 字段的格式才过。

第二个坑是部分国产服务节点（钉钉、企业微信）n8n 官方没原生支持，Claude 会自动用 HTTP Request 节点拼，但参数格式得你自己核对。这块 n8n-mcp 帮不了，因为它只懂官方节点。

第三个坑是 AI 生成的 workflow 默认很乐观，没考虑接口超时、字段为空、配额超限。建议手动补一个 Error Trigger 节点兜底。

## 我的判断

我认为这条路径值得上车。

不是 n8n-mcp 这工具有多神，是 MCP 加上现有自动化平台在解决一个真问题，把"想自动化但写不动 JSON 的人"和"会写 prompt 但不想学每个 SaaS 接口的人"接上了。

最大的变化是**做一个新自动化的边际成本变了**。以前心里要琢磨"这事值不值得我花一下午搞一个 workflow"，现在变成"我口述十分钟试一下，跑通就跑通了，跑不通也没浪费"。

## 行动建议

如果你还没装过 n8n，先在自己机器上 docker run 一个本地版玩玩，别上来就搞云服务器。

然后在 Claude Code 或 Cursor 里加上 n8n-mcp 的 MCP 配置，重启客户端。

第一个 workflow 不要挑复杂的，从"监控某个 RSS / GitHub release / 网页变化推到企业微信或钉钉"开始。这是 AI 生成成功率最高的类型，也是最常用的基建。

跑通了再上多关键词监控、群消息归档、定时整理这些有真实场景的活儿。

## 相关链接

- n8n-mcp 仓库 https://github.com/czlonkowski/n8n-mcp
- n8n 官方 https://n8n.io/

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
