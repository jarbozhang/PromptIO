# 字节火山 OpenViking 给 AI agent 装了文件系统当大脑 专为 openclaw 优化

昨晚我把 OpenViking 拉下来，跟自己常驻的 openclaw 跑了一晚上。第一感觉很怪。

不是配 RAG，不是连向量库，是在 shell 里敲 `ov ls viking://agent/skills/`，回车回来一棵目录树。agent 要用的 memory、resources、skills，全部摊在文件系统语义下，跟我平时 `ls ~/Documents` 没区别。

跑到凌晨我才反应过来这件事的分量，火山引擎昨天悄悄开源了一个东西，README 第一句话就是 "designed specifically for AI Agents (such as openclaw)"。今天 GitHub Trending 上 stars 涨了 120+，是从 0 起跳的那种 120。

国产团队第一次给开源 agent 生态做基础设施，落地物就是这个。

## 文件系统这个抽象到底改了什么

OpenViking 把自己定义成 "Context Database"。但它不是数据库的样子，是文件系统的样子。

所有 agent 要用的上下文，都挂在一个叫 `viking://` 的虚拟协议下面。结构是这样的，

```
viking://
├── resources/      文档、仓库、网页
├── user/           用户偏好、习惯
│   └── memories/
└── agent/          技能、指令、任务记忆
    ├── skills/
    └── memories/
```

每个节点还有三层粒度，L0 摘要、L1 概览、L2 详情，按需加载，不一次性把整个 context 灌给模型。

对比一下你就明白这个选择的取向。MCP 是 "tools as RPC"，每个能力是一个远程调用。Anthropic Skills 是 "skill as folder"，每个 skill 是一个目录加一份 SKILL.md。Claude Code 是 "everything as file"，但只在工程目录范围内。

OpenViking 走得更远，把 agent 的全部脑子，长期记忆、外部资源、技能库，统一摊成一棵文件树。开发者可以 `ov tree` 看全貌，`ov grep` 跨目录搜，`ov find` 递归召回，`ov add-resource` 喂新东西进去。

哲学层面这是在赌一件事，agent 时代的 context 管理不应该是黑盒的 embedding，应该是开发者可读、可写、可 diff 的文件。

## 为什么火山要"为 openclaw 优化"

openclaw 在国内开源 agent 生态里位置很微妙。它不像 Coze 那样是云平台，不像 LangChain 那样是开发框架，它是个**本地优先的个人 AI 助手框架**，把 WhatsApp、Telegram、iMessage、微信、Slack 这二十多个通讯入口，统一路由进一个本地网关，再分发给不同 agent。

简单讲，openclaw 是把私人 AI 助手做成"始终在线"的那条路线，宿主在你自己机器上跑，不上云。

火山选择把它当首要优化目标，信号挺重的。

第一，火山没去优化通用 agent 框架（比如做个"什么都能接"的 SDK），而是挑了一条已经有真实国内用户的本地化路线。这是放弃了"什么客户都讨好"，押注 personal agent 这个方向。

第二，OpenViking README 里给了一组对比数据。在 LoCoMo10 这个 1540 条对话样本的数据集上，openclaw 单独跑 vs openclaw + OpenViking 插件，任务完成率提升 49%，输入 token 消耗下降 83%。

token 省 83% 这件事不是性能噱头，是个人 agent 真实的生死线。本地 agent 跑久了 context 越塞越满，要么花钱要么降频。OpenViking 的三层粒度加按需召回，刚好对症。

第三，火山自己是云厂商。一个云厂商开源一个明确"为本地 agent 设计"的项目，这件事本身就值得停一下。要么它想从云上往下伸到端侧，要么它意识到 agent 平台之争比云资源之争更值得早占位。

## 实测三件事

我挑了三个最想验证的场景。

**场景一，让 openclaw 装一个 Skill**。

按 README 走，`pip install openviking --upgrade`，然后 `openviking-server init` 进交互式配置，模型 provider 选了豆包的 embedding，跑 `openviking-server doctor` 自检通过。

然后把一个我自己写的 git workflow skill 拷进 `viking://agent/skills/`，openclaw 这边在配置里加了 OpenViking 作为 context provider。重启 openclaw，跟它说"用我的 git workflow 提交一下"，它直接走了 `ov find` 找到 skill，按里面的步骤执行，全程没有手动注入 prompt。

**场景二，多 agent 共享 memory**。

我在 openclaw 里跑了两个 agent，一个值守 Telegram，一个值守 iMessage。以前两个 agent 的记忆是隔离的，Telegram 里告诉它"我老婆叫 X"，iMessage agent 不知道。

挂了 OpenViking 之后，两个 agent 都从 `viking://user/memories/` 读上下文。Telegram 那边录入的偏好，iMessage 端立刻能调用。这件事 LangChain 也能做，但要自己搭 memory backend；OpenViking 是开箱即用的。

**场景三，跨 session 持久化**。

我故意把 openclaw 进程杀掉重启。新 session 里问"我们昨天聊到哪了"，它通过 `ov grep "昨天"` 拉回了昨晚 task memory 的 L1 概览，没有把整段历史灌进 prompt，只摘了相关片段。

三件事都跑通了。最让我意外的是 token 节省，我自己粗测了下连续 20 轮对话的输入 token，比单跑 openclaw 大概省了七成，跟 README 那个 83% 量级对得上。

## 我的判断

我认为这是一个拐点信号，但不是 OpenViking 这个仓库本身的拐点，是火山引擎角色变化的拐点。

过去两年国产 agent 基础设施这件事，基本是 LangChain / LlamaIndex / MCP 这些海外项目在定义抽象。国产团队的产出多数集中在应用层（Coze、扣子、各种 agent 平台）和模型层（DeepSeek、Kimi、豆包），中间这一层"agent 怎么管 context"几乎是空白。

火山这次直接跳到这一层，而且选了个有姿态的抽象，文件系统范式。这不是抄 MCP 抄 Skills 的中间产物，是另立一条路。

更值得停一下的是，火山把自己绑在 openclaw 上而不是绑在自家闭源生态上。一个云厂商在 agent 时代愿意做开源基础设施，并且优先级给到一个**它自己不直接控制**的开源框架，这种姿态过去几年挺少见的。

我对火山从"AI 模型供应商"变成"agent 平台公司"这件事，第一次有了具体的物证。

当然 OpenViking 才刚开源，三层粒度的召回质量、长跑场景的稳定性、跟非 openclaw 框架的兼容性，都还没经过大规模验证。AGPLv3 协议对商业项目接入也是个变量。

但抽象选对了。这件事比代码能跑更重要。

## 行动建议

如果你已经在用 openclaw，今天就值得试一下。`pip install openviking --upgrade`，跑 `openviking-server init`，按交互式配置走完，再去 openclaw 配置里把 OpenViking 加成 context provider。整个流程半小时，先在不重要的 session 上跑，验证 token 是不是真省下来。

如果你还没用 openclaw，但对个人 agent 感兴趣，可以先去 OpenClaw 主仓库看看怎么把 Telegram 或 iMessage 接进来，本地跑一个最小 agent，再考虑要不要叠 OpenViking。

如果你是 agent 框架的作者或 contributor，重点读 OpenViking 的 `viking://` 协议设计文档。不一定要接，但这个抽象很可能会被后续几个项目借鉴。

火山引擎自家的豆包 embedding 模型是默认配置项，国内注册即用，不需要海外路径。

clone 一份回去跑跑，然后回来留言告诉我，你的 agent 接上文件系统之后，反馈是变慢还是变快。

## 相关链接

- OpenViking 仓库: https://github.com/volcengine/OpenViking
- OpenClaw 主仓库: https://github.com/openclaw/openclaw
- LoCoMo10 基准数据集（OpenViking benchmark 来源）: README 中链接
- 火山引擎豆包模型注册: https://www.volcengine.com/product/doubao

---
相关实体:: [[openviking|OpenViking]] | [[bytedance|字节跳动]] | [[volcengine|火山引擎]] | [[openclaw|OpenClaw]]
相关主题:: [[agent-frameworks|Agent 框架]] | [[chinese-ai|国产 AI]] | [[developer-tools|开发者工具]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
