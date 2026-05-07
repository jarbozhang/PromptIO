# 一周半把 Claude Code 改成会计 HR 能用的 Cowork，国产工具今晚就能复刻

1 月 12 日，Anthropic 在 macOS 桌面端推了一个新东西，叫 Cowork。官方账号在 X 上的描述只有一句，"Cowork lets you complete non-technical tasks much like how developers use Claude Code"。

翻成中国办公室能听懂的话，就是把过去给程序员用的 Claude Code 那套"给一个目标，agent 自己开文件、自己处理、自己交活"的模式，搬到了 HR 处理简历、会计整理发票、市场跑活动报销这些非技术任务上。

研究预览阶段，仅限 Claude Max 订阅用户，月费 100 到 200 美元。

## 这事的起点是 Anthropic 自己看到的"非典型用户"

Cowork 不是从 0 设计出来的产品。它的种子在 Claude Code 一年的使用数据里。

Anthropic 工程师 Boris Cherny 给 VentureBeat 的描述很具体，自从 Claude Code 上线后，团队发现一群很奇怪的用户，他们不写代码，但用这个终端工具做别的事。做假期出行规划、做 PPT、清理邮箱、读发票生成报销表。

也就是说，开发者工具被办公人群"误用"了，而且用得不算难受。

这个信号在传统产品逻辑里是 noise，但 Anthropic 的判断反过来。如果一个 CLI 工具都能被非工程师拿来跑日常任务，那把它包成桌面 GUI、加上文件读写授权、加上文件夹理解能力，应该能直接对到一个比开发者市场大十倍的人群。

Cowork 就是这个判断的产物。Anthropic 团队大约一周半就做完了，主要靠他们自己用 Claude Code 写。一个把 Claude Code 改造成办公 agent 的工具，是用 Claude Code 做出来的。

## 一周半做出一个产品，背后是两层东西

传统软件公司做一个企业级桌面 agent，从立项到能给外部用户测的版本，半年起步。Anthropic 给这事的预算是十天左右，且是把已有代码能力包装成另一个交付形态。

第一层，Anthropic 内部 dogfooding 的密度。工程师团队自己用 Claude Code 熟到能反过来用它生成 GUI、文件权限层、桌面打包流程，把 Claude Code 当工具偶尔用一下做不出这个速度。

第二层，agent 工具自身的复合效应。Claude Code 一年里被打磨成"给一个目标 agent 自己拆任务自己执行"的引擎，做任何新产品等于把这个引擎拿出来包一层壳。Cowork 表面是新产品，骨子里是 Claude Code 的另一种 UI。

VentureBeat 的标题用了 "no coding required"，但实际叙事里更值得注意的不是"用户不用写代码"，而是"开发团队也几乎没写多少新代码"。

## 设计思路是把 agent 的能力收回到文件夹里

Cowork 给非技术用户的入口很克制。不是开放式对话框让你随便问，而是围绕"打开一个文件夹，让 agent 在这个文件夹里干活"展开。

报销场景，把发票图片和 PDF 扔进一个文件夹，告诉 Cowork 整理成 expense report，agent 自己读、自己分类、自己生成 Excel。邮件场景，连接邮箱，让它清理 spam、归档 newsletter、按主题分类。市场场景，给一堆素材让它做幻灯片。

这种"目录即上下文"的设计逻辑，跟 Claude Code 在终端里"项目目录即上下文"是同一个心智模型。开发者熟悉的 cwd 概念，被翻译成办公人群熟悉的"我把东西放在这个文件夹里"。

不需要教用户什么是 prompt engineering，不需要教 RAG，不需要教什么叫 context window。把"你想干嘛"和"在哪些文件上干"两件事问清楚，剩下的交给 agent。

这件事在 Microsoft Copilot 那条线上其实是反着做的。Copilot 的形态是嵌入 Word、Excel、Outlook、Teams 这些已有应用，助手的能力被绑定在每个 SaaS 产品的边栏里。Cowork 走的是另一条，agent 是中心，文件和应用是 agent 操作的对象。

哪条对，市场会给答案。但 Anthropic 这条路径明显跟"把 AI 长在已有产品里"不一样。

## 国产桌面 AI 助手已经有三家在跑

回看国内，对话式桌面 AI 不是新东西。

豆包桌面版 2024 年下半年上 Mac 和 Windows，主打"全局浮窗"，选中文字呼出助手，做翻译、改写、总结。腾讯元宝桌面版 2025 年初推出，定位类似，但深度绑定微信生态。Kimi 桌面客户端定位在长文档分析和资料整理。

这三家共同特征是 agent 围绕"对话"展开，你在浮窗里跟它说话，它在浮窗里给答案，要不要让它读电脑文件、操作其它应用是有限勾选项。

Cowork 的差异在于一开始就把"文件操作权限"当成默认能力。读一个文件夹下所有发票、改 Excel、生成 PDF、写本地文件，是 day-1 功能不是 day-365 功能。

豆包元宝 Kimi 是"AI 助理嵌入桌面"，Cowork 是"agent 直接操作桌面"，前者把 AI 当聊天对象，后者把 AI 当能动手的同事。技术上国内大模型不缺工具调用和文件读写能力，差的是产品形态的决心。

## 给国内做 AI 产品的几个观察点

第一，Anthropic 把开发者工具沉淀给办公人群这条路打通后，国内 Claude Code 对标团队（百度 CoBuddy、字节 DeerFlow、Aider 二次开发）还都在做开发者市场，把同一套 agent 引擎包成办公版本的事还没看到正式发布。

第二，文件夹作为 agent 上下文这件事，在中国办公场景里要怎么落。白领日常工作很多发生在企业微信、钉钉、飞书的云文档里，桌面文件夹的中心地位比北美低。一个 Cowork-like 的国产产品只盯本地文件会错过最大入口，先做云文档版本技术难度又更高。

第三，订阅价格。100 到 200 美元每月在国内是劝退价，独立卖 99 元每月的转化数据参考既往 SaaS 并不乐观，这事大概率会绑定金山 WPS、企业微信、钉钉的生产力套餐去做。

Cowork 上线时间太短，Reddit r/ClaudeCode 关于 Anthropic 给 Pro 用户砍 Claude Code 配额的讨论盖过了 Cowork 本身，等 1 到 2 个月数据出来再看这条产品线能不能真的打到办公人群。

## 不用等国产 Cowork，今晚自己拼一个

Cowork 月费 100 到 200 美元、仅限 macOS，国内多数读者用不了。但"目录即上下文"这个心智模型不用等国产大厂抄，桌面端开源工具拼一下就能复刻七成效果。

第一步，桌面客户端用 Cherry Studio 或 LobeChat 桌面版，两者都开源、跨 Mac/Windows、内置文件读写，LobeChat 的 file artifact 能直接读 PDF/Excel。

第二步，模型层填 DeepSeek 官方 API key，或走硅基流动、OpenRouter 转发 key 选 Kimi K2、Qwen3-Max，国内网络稳定且发票合规。

第三步，跑 Cowork 三个原版场景验证：把发票图片拖进对话让模型生成 Excel 报销表；把邮件导出成 mbox 让它归档；把素材文件夹丢给它生成幻灯片大纲。文件读写权限在客户端设置里手动开。

想更贴近 Claude Code 的 agent 形态，把 aider 接 DeepSeek，cd 到工作文件夹直接 `aider --model deepseek/deepseek-chat`，目录里文件自动进上下文边读边改，这就是国产版"目录即上下文"。

效果上限比不过 Cowork 原版，但报销整理、邮件分类、PPT 草稿这种活，一个晚上就能跑通，零订阅成本。下一波继续盯豆包、Kimi、元宝谁先把这套打包成正式产品。

## 相关链接

- VentureBeat 报道，[Anthropic launches Cowork, a Claude Desktop agent that works in your files](https://venturebeat.com/technology/anthropic-launches-cowork-a-claude-desktop-agent-that-works-in-your-files-no)
- Anthropic 官方账号 X 发布说明（搜 @claudeai 时间线 2026-01-12）
- 百度 CoBuddy 上 OpenRouter，[此前覆盖](https://openrouter.ai/baidu/cobuddy)

---
相关实体:: [[anthropic|Anthropic]] | [[claude-code|Claude Code]] | [[claude|Claude]] | [[microsoft|Microsoft]] | [[bytedance|字节跳动]] | [[doubao|豆包]] | [[kimi|Kimi]]
相关主题:: [[agent-frameworks|Agent 框架]] | [[ai-product-experience|AI 产品体验]] | [[chinese-ai|国产 AI]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
<!-- xhs_pass: false, reasons: [境外软件订阅价格直接涉及, 整体偏行业分析无可操作动作] -->
