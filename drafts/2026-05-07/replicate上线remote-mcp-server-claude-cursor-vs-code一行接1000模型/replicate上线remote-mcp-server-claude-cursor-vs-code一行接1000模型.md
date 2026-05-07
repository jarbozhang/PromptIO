# Replicate 把整个模型仓库做成了 MCP，Claude Code 一句话挑模型跑模型

---
相关实体:: [[replicate|Replicate]] | [[anthropic|Anthropic]] | [[claude-code|Claude Code]] | [[cursor|Cursor]] | [[bytedance|字节跳动]] | [[lobechat|LobeChat]]
相关主题:: [[agent-frameworks|Agent 框架]] | [[multimodal|多模态]] | [[ai-coding-tools|AI 编程工具]]

我以前每次想试 Replicate 上某个新出的视频模型，流程是这样。

打开 Replicate 网页找 model card，点 API 标签页复制 Python 片段，回到本地建个虚拟环境装 replicate 包，把 prompt、seed、num_frames 这些参数一个个填回代码，跑完想换个模型对比，整套流程再来一遍。一个晚上能跑通三个模型就算高产。

这周 Replicate 把这层壳掀了。

## 一个 URL 让 Claude 直接调 1000+ 个模型

5 月 6 号 Replicate 官博挂出 remote MCP server，地址就一行，`https://mcp.replicate.com`。Claude Desktop、Claude Code、Cursor、VS Code 的 Cline 插件，任何支持 MCP 协议的客户端，把这个 URL 填进配置，重启，里面就多出三类工具，discover、compare、run。

discover 用来按需求搜模型，"找几个支持首帧输入的视频模型"这种自然语言问题直接抛过去。compare 用来横评，"veo 3 和 veo 3 fast 有什么区别"它会拉两边的 schema、定价、推理速度告诉你。run 就是跑模型，"用 veo 3 fast 生成一段乌龟和兔子在奥运 100 米跑道的视频"，Claude 解析参数、调用、把结果链接甩回来。

我把它接到 Claude Code 里实测，配置文件就这一段。

```
{
  "mcpServers": {
    "replicate": {
      "url": "https://mcp.replicate.com"
    }
  }
}
```

第一次调用会跳一个浏览器授权页，让你贴 Replicate API token。token 不是直接交给 Claude，而是存在 Cloudflare KV 里，MCP server 充当中介。这是和很多本地 MCP 不一样的地方，它走的是 OAuth 那套思路。

授权完，回 Claude Code 里输入 `/mcp` 看到 replicate 是绿色就 OK 了。

## 跟之前直接写代码调 API 的差别

我之前写过一段调 Flux 的代码，22 行 Python，30% 是参数填表。现在我跟 Claude 说"用 Flux schnell 生成一张赛博朋克风格的猫，1024x1024，4 步采样"，它先去 discover 工具确认 black-forest-labs/flux-schnell 的 input schema，再调 run，回来给我一个 PNG 链接。

整个过程我没碰任何文档。

这才是 MCP 比 SDK 好用的本质。SDK 是"我知道我要调什么，帮我把 HTTP 包好"，MCP 是"我不知道我要调什么，先帮我想清楚再调"。前者优化的是输入输出，后者优化的是决策链路。

举个真实场景。我在做一个短视频项目，需要先用一个语音克隆模型生成旁白，再用一个口型同步模型把旁白对到角色脸上。以前我得先在 Replicate 翻 voice-cloning 标签，挑两三个候选，每个都看一遍 README、试一遍小样本，再去 lipsync 标签重复一遍。现在我直接跟 Claude 说"帮我对比 Replicate 上口型同步类目里得分最高的三个模型，按延迟和价格排序"，它一次给我表格。

配 Replicate 自带的 jq WebAssembly 过滤层，返回的 JSON 不会把 Claude 的上下文撑爆。这点是这个 MCP server 工程上做得比较细的，模型库这么大，没有响应裁剪 Claude 一次查询就 OOM。

## 中国读者怎么用

Replicate 在国内不能直接打开网页注册，这是绕不开的事实。但你不一定非要走它。

第一条路，如果你已经有 Replicate 账号和余额，把上面那段 MCP 配置直接加到本地 Claude Code 即可。Claude Code 本身可以接 DeepClaude、Kimi、Qwen 这类国产模型走 OpenAI 兼容协议，agent 部分跑国产，工具调用层走 Replicate，分工很自然。

第二条路，本号一直在追的 LobeChat，4 月底已经上了 MCP 商店，国内开发者接 MCP server 不用碰 Claude Desktop 也能玩。Cherry Studio 的 MCP 支持也铺开了。字节 Coze 的扣子空间在 2026 年初开放了 MCP 协议接入，阿里百炼、智谱也都在跟进。MCP 这个协议从 Anthropic 一家提出来，到今年已经是事实标准。

第三条路，自己跑本地。Replicate 的 MCP server 有 npm 包版本，源码里逻辑不复杂，主要是把 Replicate REST API 包成 MCP 工具。如果你只想要"给 Claude 一个调远程模型仓库的能力"这个能力本身，魔搭、HuggingFace 镜像站的模型清单也可以照样包一层 MCP 出来。这是国产 MCP server 接下来一年的机会窗口。

## 顺便说说 MCP 这个协议本身的状态

5 月 5 号我写过一篇 n8n-MCP，把 1650 个 n8n 节点的 schema 喂给 Claude 让它写自动化工作流。今天这篇是同一个套路在另一个方向上的复用，模型即工具。

我认为 MCP 在 2026 年最有意思的演化不是协议本身，是"什么东西适合做成 MCP server"这个问题被反复试。n8n 把节点做成工具，Replicate 把模型做成工具，再往后大概率是数据库、设计稿、CRM、ERP 都被包一层 MCP 给 agent 调。

对开发者的实际意义是，你以前学一个 SaaS 要花一天看文档，现在 agent 替你看，你只需要描述意图。但反过来，agent 能做对的前提是工具方提供了高质量的 schema 和元数据，n8n-mcp 那个项目作者花了大力气清洗 schema，Replicate 的 jq 过滤层也是一样的工程量。

这块工作没人替你做，做不好的 MCP server agent 用起来比 SDK 还慢。

## 行动建议

如果你手上已经有 Claude Code 或 Cursor，今晚就花 5 分钟把 `https://mcp.replicate.com` 加到配置里跑一圈。即使没有 Replicate 账号，光看 Claude 怎么用 discover 工具检索模型就够你理解一遍 MCP 的工作机制。

如果你在做国产 AI 产品，去看一眼 Replicate 这个 MCP server 的 OpenAPI 是怎么映射到三个核心动作的（discover/compare/run）。把模型仓库做成 MCP 这件事，国内模型平台谁先做谁先吃到下一拨 agent 流量。

## 相关链接

- Replicate 官博公告，https://replicate.com/blog/remote-mcp-server
- MCP server 地址，https://mcp.replicate.com
- MCP 协议规范，https://modelcontextprotocol.io
- 5/5 n8n-MCP 文章（同主题另一面），drafts/2026-05-05/n8n-mcp-claude自动写自动化工作流-副业号

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
