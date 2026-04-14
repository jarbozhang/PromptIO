# 500 行 Python 扫出你日志里的 API Key，Simon Willison 的开发过程比工具本身更值得学

上周我在整理一批 Claude Code 的会话日志准备发出去，突然想到一个问题，这些日志里会不会藏着我的 API Key？

手动翻了两个文件就放弃了。日志太长，密钥可能以各种编码形式出现，JSON 转义、URL 编码、HTML 实体，光靠肉眼根本不靠谱。

然后我看到 Simon Willison 发了条推，说他刚写了个 CLI 工具干这事。从 0.1 到 0.3，两天时间，四个版本。代码量不大，但他的开发过程藏着几个我觉得很多人没意识到的东西。

## 这工具干嘛的

一句话，你告诉它你的密钥是什么，它帮你在一堆文件里找出来。

```
uvx scan-for-secrets $OPENAI_API_KEY $ANTHROPIC_API_KEY -d logs/
```

不需要安装，uvx 直接跑。扫完没发现就静默退出，发现了返回文件路径、行号和匹配到的编码类型。

听起来很简单对吧？grep 不就行了？

不行。因为你的密钥在日志里可能长这样，`sk-proj-abc\u0026def` 或者 `sk-proj-abc%26def`，同一个字符串被 JSON 转义、URL 编码、HTML 实体、Unicode escape 处理过之后，grep 根本匹配不上。

scan-for-secrets 会自动把你的密钥展开成六种编码变体，然后逐一扫描。这才是它真正解决的问题。

## 两天四个版本，每次只加一件事

让我拆一下这个迭代过程，因为我觉得它比工具本身更有价值。

**0.1** 只做了核心功能，接受密钥参数，扫描目录，匹配六种编码。Simon 说他用的是"README 驱动开发"，先把想要的功能写成文档，然后丢给 Claude Code 用 TDD 红绿灯的方式实现。

坦率讲，这个开发方式现在越来越常见了，但 Simon 的用法有个细节值得注意。他不是让 AI 从零开始设计，而是自己先想清楚 API 和行为，AI 只负责实现。设计权在人，执行权给 AI。

**0.1.1** 干了两件事，补文档和删代码。他发现 repr 转义跟 JSON 转义是重复的，直接砍掉。大部分人在 0.1.1 阶段的本能是"加功能"，Simon 的本能是"删冗余"。

**0.2** 加了流式输出，扫到一个就打印一个，不用等全部跑完。同时支持 `-d` 多目录和 `-f` 单文件扫描。

**0.3** 加了 `--redact` 参数，扫到密钥后直接替换成 REDACTED，而且会考虑不同编码方式下的替换。比如 JSON 里的 `sk-abc\u0026def` 会被正确替换，不会把转义搞乱。

四个版本，每个版本只解决一个问题。没有"我先把未来三个月的需求都想好"。

## 有个设计细节我觉得特别聪明

配置文件的设计。你可以在 `~/.scan-for-secrets.conf.sh` 里写 shell 命令，工具会执行这些命令拿到密钥。

```
echo $OPENAI_API_KEY
llm keys get gemini
awk -F= '/aws_secret_access_key/{print $2}' ~/.aws/credentials | xargs
```

为什么不用 JSON 或 YAML？因为密钥散落在各处，环境变量、密钥管理器、AWS 配置文件，没有一种声明式格式能统一描述"去哪儿拿密钥"这件事。用 shell 脚本作为配置格式，等于把"获取密钥"这个动作本身变成了配置。

说真的，这个思路我之前没想过。大部分人设计配置文件会本能地选 YAML 或 JSON，但有些场景下，可执行的配置比声明式的配置更合理。

## 社区里的多种声音

推文下面有人问，为什么不用 truffleHog 或者 gitleaks？这些工具用正则匹配已知的密钥模式（比如 `sk-` 开头的 OpenAI Key），不需要你提供密钥本身。

Simon 的回答很直接，这两类工具解决的是不同的问题。truffleHog 扫的是"看起来像密钥的东西"，scan-for-secrets 扫的是"你确定是密钥的东西"。前者适合 CI/CD 流水线做预防，后者适合你要分享文件之前做最后一道检查。

也有人提到一个实际场景，在用 Claude Code 或 Cursor 这类 AI 编程工具时，会话日志可能包含完整的环境变量输出。这种情况下你的密钥是以各种奇怪的编码出现在日志里的，传统的 secret scanner 反而扫不到。

还有开发者在 GitHub issues 里建议加个 `--fail-fast` 参数，扫到第一个就停。Simon 说暂时不加，因为"你通常想知道所有泄漏的位置，不只是第一个"。

我认为这个判断是对的。

## 我的判断

我是真的觉得这工具的价值不在工具本身。500 行 Python，六种编码匹配，说到底技术上没什么高深的。

但 Simon 在两天内从一个具体痛点出发，用 README 驱动 + AI 辅助 TDD 的方式，迭代出四个版本，每个版本解决一个明确的问题，没有多余功能，没有过度设计。这才是我觉得值得学的部分。

可能有些想法还不成熟，但我越来越觉得，AI 辅助编程的真正瓶颈不是"AI 能不能写代码"，而是"你能不能在动手之前把需求想清楚"。Simon 的 README 驱动开发就是一个极好的例子，文档就是 prompt，想清楚了 AI 执行起来才快。

反过来说，如果你连想要什么都描述不清楚，给你再强的模型也白搭。

## 你可以现在就试

跑一行命令就行。

```
uvx scan-for-secrets $OPENAI_API_KEY -d ./your-project/
```

如果你经常分享代码片段、会话日志或者项目目录，建议配一个 `~/.scan-for-secrets.conf.sh`，把你所有的密钥来源写进去，以后每次分享前跑一遍。

回到开头那个场景，我的 Claude Code 日志里到底有没有 API Key？跑了一下，还真扫出来两个。一个是 Anthropic 的 Key 出现在环境变量的 debug 输出里，另一个是 OpenAI 的 Key 以 JSON 转义的形式藏在一个 tool call 的参数里。

如果没跑这个工具，这两个密钥就跟着日志一起发出去了。

## 相关链接

- GitHub 仓库: https://github.com/simonw/scan-for-secrets
- Simon 的博客发布记录: https://simonwillison.net/2026/Apr/6/scan-for-secrets/
- 快速体验: `uvx scan-for-secrets --help`

---
相关实体:: [[simon-willison|Simon Willison]] | [[claude-code|Claude Code]]
相关主题:: [[supply-chain-security|供应链安全]] | [[ai-coding-tools|AI编程工具]]
