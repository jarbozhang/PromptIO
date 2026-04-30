# ds2api 一夜涨 465 星，把 DeepSeek 客户端协议变 OpenAI/Claude 通用 API 中间件

一夜 +465 星，AGPL 协议，Go 写的，2.9k stars，752 forks。

我打开 GitHub Trending 第一眼看到 ds2api 的时候是这么个画面，今天一天就冲掉同榜大半数项目。

我盯着这个项目看了二十分钟，越看越确认它戳中了一个我自己也犯嘀咕的痛点，我想给 Cline 接 DeepSeek，但是不太想再为 Cline 那种"agent 一跑就消耗几十万 token"的玩法多付一份官方 API 钱。

## 它到底在干嘛

坦率讲，名字已经说完一半了，"DeepSeek to API"。

DeepSeek 你天天在用，对吧。chat.deepseek.com 的网页版、客户端、手机 app，登录之后就能聊。这是 DeepSeek 给个人用户白嫖的入口，免费、无限聊、不收 token 钱。

另一边是 platform.deepseek.com 的 API，按 token 计费，输入便宜输出贵，跑 agent 一不留神就几块钱出去了。

ds2api 干的事情，是把网页/客户端那个免费入口走的协议，逆向出来，再包成 OpenAI / Claude / Gemini 三种主流 API 的样子，让你像调官方付费 API 一样去调它，但实际上后面接的是你自己的 DeepSeek 个人账号。

接给 Cursor、Cline、Claude Code 这种工具，它们以为自己连的是付费 OpenAI 兼容端点，其实底层在帮你的浏览器打字。

我看完这个定位，心里第一反应是，难怪一天涨 465 星。

## 技术拆开看一眼

后端 Go，前端 React 管理台，接口分三套。

OpenAI 那套最常见，`POST /v1/chat/completions`、`POST /v1/responses`、`/v1/embeddings`、`/v1/files` 都齐了。Claude 那套放在 `/anthropic/v1/messages`，专门照顾 Claude Code 这种只认 Anthropic 协议的客户端。Gemini 那套也补齐了 `streamGenerateContent`。

部署方式给得很全。Release 里直接放了 Linux/Darwin/Windows、amd64/arm64 的预编译二进制，下下来 tar 解压、改 `config.json`、`./ds2api` 就跑起来了。Docker 给了 `docker-compose.yml`，默认 6011 端口映射到容器 5001。Vercel Serverless 也支持，流式响应走 Node Runtime，零成本部署到自己的 vercel 账号也行。Zeabur 还做了一键部署按钮。

这套部署全家桶我看下来的体感是，作者非常清楚目标用户画像，懒人开发者，不想搞运维。

多账号机制是最关键的，也是 stars 数能飙这么高的真正原因。

`config.json` 里 `accounts` 字段是个数组，每个账号支持邮箱/手机号 + 密码登录，自动刷 token。每个账号有独立的并发上限，环境变量 `DS2API_ACCOUNT_MAX_INFLIGHT` 默认 2，超过就排队，队列上限可配。请求头还能塞一个 `X-Ds2-Target-Account` 强制走某个账号。

也就是说，你手上有几个 DeepSeek 个人账号，丢进配置文件，前面挂上你自己的 API key（也是 `config.json` 里的 `keys` 字段自定义），客户端连上之后，请求会被分发到不同账号上轮转。

我看到这里，琢磨了一下我自己的场景。

## 我把自己代入了一遍

我本地有一个 Cline 装在 VS Code 里，平常用来重构老代码、写测试、读陌生项目。Cline 这种 agent 的特点是 token 消耗惊人，一次任务读个十几个文件、改五六处、再跑两轮 lint，输入输出加起来几十万 token 起步。

接官方 DeepSeek API，按 deepseek-chat 当前定价大概一次任务两三块。一天跑十次就是二三十块，一个月几百块。这个钱花不花得起？花得起。但是个人项目我是真有点心疼。

我的另一个选择是用 chat.deepseek.com 的网页版，但 Cline 不能直接连网页，它只认 OpenAI 兼容端点。

ds2api 卡的就是这个缝。

我假设我把它跑起来，docker compose 起一个本地服务，listen 在 5001。Cline 的 OpenAI 端点配 `http://localhost:5001/v1`，自定义 API key 就用我在 `config.json` 里写的那个。Cline 调用的时候像在调付费 API，实际上 ds2api 在背后帮我维持一个浏览器会话，把 prompt 喂给 DeepSeek 网页端、把流式输出再翻译回 OpenAI 协议。

理论上 token 不要钱了，agent 跑起来心理负担直接归零。

但是。

这里我必须刹一下车。

## 为什么我没有马上把它部署上去

第一，这是逆向客户端协议，不是官方 API。

DeepSeek 没有授权任何人这么做。它的网页 chat 入口本来是给真人用户用的，前端会带设备指纹、行为特征，后端有风控。把它包成 API 自动调用，已经偏离了产品设计的本意。这种逆向中间件，作者自己在 README 里写得很清楚，"仅供学习、研究、个人实验和内部验证使用"，"请勿用于违反服务条款的场景"。

我读到这句话的体感是，作者很懂，免责写到位了，但也是因为他知道这事儿在合规上是灰区。

第二，账号有被封的风险。

就算 ds2api 多账号轮转做得再优雅，每个账号每秒只放 2 个 in-flight，说到底还是非自然的访问模式。哪天 DeepSeek 想收紧风控，账号封了就是封了，没地方申诉。

第三，稳定性是个未知数。

DeepSeek 网页端任何一次升级、任何一次协议字段变动，ds2api 都得跟进。开源仓库的 issue 区会出现一波"突然不能用了"的报告，作者要熬夜补丁。这种依赖关系跑生产是不现实的。

所以我会怎么用？

如果我要试，我会拿一个**专门用来折腾的 DeepSeek 账号**（不是我充过值的主账号），跑在本地 Docker，只接给我自己电脑上的 Cline，**只在个人学习项目里跑**。绝对不接到任何对外提供服务的产品上、不接到客户那边、不接到我自己的工作号。

一旦封号我也只是损失一个白嫖账号，不影响主路。

## 社区在吵什么

我翻了一下 Trending 评论区和 issue。

一类声音是"作者牛逼"，主要来自 Claude Code 用户，他们之前一直缺一个稳定的 DeepSeek 接入路径，ds2api 把 `/anthropic/v1/messages` 都铺好了，连 `sk-ant-*` 格式 key 兼容性都做了。这群人热情最高。

一类声音是疑虑型的，问"DeepSeek 知道这事儿吗？""会不会哪天直接被官方下架仓库？"。AGPL 协议的开源仓库官方很难直接打掉，但封账号是分分钟的事。

还有一类声音我觉得最值得琢磨，是中文开发者社区里对官方 API 计费的不满。

我的判断是，ds2api 的 stars 数飙这么快，**根本不是因为它技术上多惊艳**。逆向中间件这种东西国内不是第一次有了。它真正戳中的是一种情绪，国产模型的官方 API 计费虽然已经比 OpenAI 便宜一个数量级，但在 agent 时代依然贵得让个人开发者肉疼。

DeepSeek 把网页端做得太好了，免费无限聊，反而让付费 API 的体感落差变大。

这是 DeepSeek 商业化的一个现实考验。当一个公司同时维护一个免费产品入口和一个付费 API，**用户永远会想办法把前者变成后者**。

## 我的判断

ds2api 这种项目我认为长期不可持续。

逆向中间件是一场和官方风控的猫鼠游戏，谁都赢不了，最后无非是越来越难用、规避成本越来越高、用户慢慢散掉。

但它的 stars 曲线告诉了我两件事。

一是，国内开发者对 agent 时代的 token 计费焦虑是真实的、巨大的、还没被满足的。谁能把"高性价比 agent 推理"这件事在合规路径上解决好，就有一波直接的红利。OpenRouter 的国内可访问镜像、国产模型的 batch 折扣、Coze/扣子之类的免 token 平台，都是这个方向上的尝试。

二是，DeepSeek 自己应该认真考虑给个人开发者出一个"网页版同源"的低价 API tier。哪怕带每日上限、带速率限制，让真正在做小工具、做个人项目的开发者有个合规出路。否则这种 ds2api 类项目会一个接一个冒出来，封一个再来一个。

## 你现在要做什么

如果你只是听个响、看个热闹，把 GitHub 上的仓库点个 star 收藏起来，**不要部署**。

如果你是 Cline / Claude Code 的重度用户，agent 任务一天烧十几块的那种，可以拿一个专用账号、本地 Docker 跑一下，体验完整链路是怎么打通的，**用完就关**。

如果你已经在用 DeepSeek 官方付费 API 跑生产任务，**离这个项目远一点**，业务层面的稳定性和合规性都不在它的设计目标里。

我自己今天不会把它跑起来。但我会把仓库收藏，半年后回头再看，看作者还在不在维护、stars 还在不在涨、issue 区是不是已经全是"突然不能用了"。

那张曲线本身，比任何 benchmark 都更能说明国产 AI 用户当下真正的渴望是什么。

---

相关链接

- ds2api 仓库, https://github.com/CJackHwang/ds2api
- DeepSeek 官方 API 文档（合规路径）, https://platform.deepseek.com
- Cline VS Code 插件, https://github.com/cline/cline

---
相关实体:: [[ds2api|ds2api]] | [[deepseek|DeepSeek]] | [[CJackHwang|CJackHwang]]
相关主题:: [[ai-pricing|AI 定价]] | [[agent-frameworks|Agent 框架]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
