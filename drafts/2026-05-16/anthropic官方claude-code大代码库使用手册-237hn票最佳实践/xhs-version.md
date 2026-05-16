# Anthropic 官方 Claude Code 大代码库使用手册，237 HN 票最佳实践拆解

5 月 15 日 Anthropic 在官网放出一篇《How Claude Code works in large codebases》，第二天在 Hacker News 冲到 237 票 155 条评论 🔥

这不是又一篇产品博客，是 Anthropic 第一次把 Claude Code 在大型代码库里的工程化用法整理成方法论，并且承认了一件事，Claude Code 不做 RAG，不做向量检索，它就是靠 grep 和文件系统一格一格趟过去。

这件事对国内开发者很重要。亿级行的怪物代码库，过去半年试用 Claude Code 的团队几乎都撞过同一堵墙，Claude 在 monorepo 根目录起手就开始失忆。Anthropic 这次给出的不是技巧，是一套配置范式，可以平移到任何本地大型 repo。

## 一、为什么 Claude Code 不做 RAG

Anthropic 在文中把 Claude Code 的导航策略写得很直白，「traverses the file system, reads files, uses grep to find exactly what it needs」。它不做向量化，不建索引，每次会话靠遍历文件系统加 grep 完成符号检索。

官方给出的理由是 RAG 在代码场景里有结构性失败模式，向量召回的是相似而不是引用，结果经常返回过期或不存在的代码片段，导致幻觉。Claude 选择放弃这一层，让模型在原始文件系统上跑，至少看到的代码一定是当前真实存在的。

这个设计在小型 repo 上无懈可击，到大型 repo 上立刻出问题。HN 用户在评论里直接戳穿，「grep 和 find 在真正大的代码库上会超时」。

## 二、Harness 比模型更重要

这是官方在文中最重要的一句话，「the harness matters as much as the model」。Harness 指模型外面的脚手架，七个组件构成 Claude Code 的完整能力面 🛠️

**CLAUDE.md**，每次会话自动加载的上下文文件，官方推荐「lean and layered」，根目录写概览，子目录写局部约定。

**Hooks**，关键时刻触发的脚本。stop hook 在会话结束时建议更新 CLAUDE.md，start hook 在启动时按当前分支或任务动态加载团队上下文。

**Skills**，可复用的专家知识，采用「progressive disclosure」按需加载。

**Plugins**，企业级配置打包。

**LSP**，Language Server Protocol，让 Claude 用符号级导航而不是文本匹配，对 TypeScript、Rust、Java 这种强类型语言尤其关键。

**MCP servers**，对接内部工具、文档、Jira、企业 wiki 的标准协议。

**Subagents**，隔离的 Claude 实例，把「探索」和「编辑」切开，各用各的 context window。

七件套里，国内团队最容易忽略的是 LSP 和 Subagents。

## 三、三种官方配置范式

文章中段给出三套来自实际部署的配置 pattern。

### Pattern 1，让代码库变得可导航

官方给的清单非常具体。

第一，不要在 repo 根目录起 Claude，而是在子目录起。这条对国内 monorepo 的人是反常识的，过去大家都习惯在根目录 init，结果 Claude 第一件事就是 ls 根目录，看到几百个一级目录直接放弃。

第二，把测试命令 scope 到子目录。monorepo 的全量测试跑一次几十分钟，Claude 默认会跑全量然后超时。官方推荐在每个子目录的 CLAUDE.md 里写清楚「本目录的测试怎么跑」。

第三，写 `.claudeignore`，排除生成代码、构建产物、vendor 目录。

第四，目录结构不清晰时建 codebase map。一份 markdown，列出每个一级目录是什么、和谁交互、谁负责。

第五，强类型语言部署 LSP server 🎯

### Pattern 2，CLAUDE.md 的维护节奏

官方明确写了，「每三到六个月做一次 configuration review」。原因是模型在升级，老的指令可能从「引导」变成「束缚」。

HN 用户 luodaint 的经验值得贴在这里，「在生产环境跑了六个月 Claude Code，最后只有 50 行以下的约束活下来了，更长的架构指引要么被忽略要么造成混乱」。CLAUDE.md 不是文档，是上下文预算。

### Pattern 3，组织层面的 DRI

第三个 pattern 跳出技术层，谈组织。官方要求「指定一个 DRI（directly responsible individual）」专门负责 Claude Code 配置。

这一条对国内大厂尤其重要。设一个 DRI，等于把 AI 编程工具治理化，和 lint、CI、code owner 是同一级别的基础设施。

## 四、Subagent 编排和 context window 管理

Claude Code 的主会话有一个 context window，假设是 200K token。在大型 repo 里，光是把相关目录 grep 一遍、读几个核心文件、看一遍 git log，这个窗口很快就吃掉一半。

Subagent 的设计目的是让「探索」在一个独立窗口里跑，结论压缩成几百 token 回到主窗口。

一个典型流程，主 Claude 接到「修一个支付链路上的 bug」任务，先 spawn 一个 explore subagent，让它去 grep 整条支付链路、读每个相关文件、整理出一份调用链摘要返回，主 Claude 只接收摘要，然后再 spawn 一个 edit subagent 去改具体文件。

这个模式在亿级行代码库上的收益是数量级的 ✨

## 五、Sandbox 隔离

官方在「organizational ownership」那一节里夹带了一句安全实践，配 permission policy 时建议起手就锁紧，再按团队建立信任逐步放开。

所以 sandbox 不能只靠 Claude Code 自己的 permission 配置，要在 OS 层加一道。国内团队常用的是 Docker container 或 Firecracker microVM 跑 Claude Code，把网络出向、文件写入路径、可执行命令在容器层卡死。

## 六、国内开发者本地复现路径

把上面这套方法论落到中国开发者的实操路径，不需要访问 Claude.ai 🚀

国内目前可走的路径是 OpenRouter 或者 Claude API 镜像，配合 Claude Code CLI 本地跑。CLI 是开源的，二进制可以从 Anthropic 仓库直接装，调用走自定义 endpoint。这条路 5 月初 openclaw 社区有过完整 writeup，跑得通。

跑通后照着官方七件套配，优先级建议这样排，CLAUDE.md 层级化第一，LSP 第二，subagent 编排第三，hooks 第四，MCP 第五。

亿级行代码库的上手路径，第一步永远是子目录起，不要在根目录硬刚。先选一个你最熟的业务模块，建一个 200 行以内的 CLAUDE.md，列清楚这个模块的入口、关键接口、测试命令、踩坑点。跑两周回头看，把没用上的删掉。

三到六个月做一次 review，这条 Anthropic 的建议在国内团队尤其值得守，因为国内 AI 编程节奏比硅谷快，Qwen、DeepSeek、Kimi 的本地化能力每两个月一变。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
