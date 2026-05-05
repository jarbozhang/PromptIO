# Apple 自家 Apple Support 应用里被人扒出 Claude.md 文件，国内开发者赶紧 grep 自家 app

5 月 1 日，X 上有个叫 aaronp613 的研究者发了一条帖，说他在 Apple Support 这个 app 的 v5.13 更新里翻到了几份 CLAUDE.md。

库克家的应用，在用户手机上躺着 Anthropic Claude Code 的项目说明书。

帖子很快被搬到 Hacker News，380 分 319 条评论，挂在前排几个小时。Reddit 那边五个版块同时炸开，r/ClaudeAI 单楼 2183 点赞 133 条评论，r/MacOS 1117 点赞，r/ClaudeCode、r/AITrailblazers、r/ios、r/tech_x 跟着一波接一波，加起来 5285 点赞 641 条评论。

这件事好玩在两层。第一层是吃瓜，Apple 把内部 prompt 当资源文件打包进 production 包了。第二层才是要紧的，写代码这件事现在的工业现状，已经把任何用 Claude Code、Cursor、Codex 的团队都暴露在同一个风险面下，包括正在读这篇文章的你。

我先把事情讲清楚，然后给你一条命令，cd 到自己的工程目录跑一下，看看自家 app 有没有同样的问题。

## CLAUDE.md 是什么，为什么不应该出现在二进制里

Claude Code 是 Anthropic 的命令行 coding agent。你在仓库根目录放一个 CLAUDE.md，agent 进项目第一件事就是读它，把里面的规矩吃进 context。这个文件通常写什么，项目的目录结构、构建命令、命名规范、不要碰的目录、内部术语、上线前的检查清单，有时候还有"产品的真实状态是什么样的，外部宣传别太当真"。

这是给 agent 的备忘录，不是给用户的资源。

正常的工程纪律，CLAUDE.md 应该在 .gitignore 里，或者至少在打包流水线里被排除。它不属于 app bundle，跟你 README.md、.env.example、internal docs 一个层级，开发期才看得见。

Apple 这次翻车的具体姿势是，Apple Support v5.13 的 app bundle 里直接带了几份 CLAUDE.md，跟着应用一起下发到所有装了这个 app 的用户设备上。aaronp613 用普通的 ipa 解包工具就能扒出来。Reddit r/tech_x 版块的科普帖一句话点透，"这文件本来不应该出现在 production app 里。"

## 社区是怎么消化这件事的

值得关注的不是吃瓜，是不同社区给出的不同反应，每一个都对应一种工程现实。

r/MacOS 那帖最尖酸。350 点赞的最高评论是"Explains a lot actually"，300 点赞紧跟着"They vibe coded Tahoe"，166 点赞补刀"Steve Jobs is turning in his grave"。Tahoe 是 macOS 26 的代号，Apple 这一代系统 bug 投诉密集，社区把这事当成"原来你们家也是 vibe coding"的实锤。

r/ClaudeCode 的反应完全相反，没人觉得意外。204 点赞最高评论是 popsikohl 的，"This isn't really a surprise to me. The world of coding has very quickly changed to be largely conducted by AI."第二条 123 点赞是 Whetmoisturemp 的反问，"lol are there actually people out there still hand writing code?"第三条 99 点赞，lurkingtonbear 直接说，"Every single one of my repos has a CLAUDE.md, and none of them were an accident."

r/ClaudeAI 那帖 2183 点赞，热门评论清一色在催 OP，"What is inside""I'd be interested in seeing the custom markdown that Apple is using internally""Anything juicy in there"。所有人都想看 Apple 的内部 prompt 长什么样，因为这种文件平时在 NDA 里，外人看不到。

三个社区拼起来就是 2026 年写代码的全景图。一线开发者已经默认 AI 协作，CLAUDE.md 就跟 .editorconfig 一样普及。中间层用户开始把 AI 工具的痕迹当成代码质量的负面信号。围观群众想看大厂内部到底怎么 prompt 自家产品。

aaronp613 这帖意外做了一件事，把 AI coding 工业化的现状，从 X 圈内人话题，推到了 macOS 用户和苹果开发者的日常视野里。

## 国内同类风险的真实尺寸

讲到这就该说自家了。

CLAUDE.md 这件事，Apple 不是孤例，只是被人最先扒出来。原因很简单，过去 12 个月用 Claude Code、Cursor、Aider、Cline、Codex 这一类 agent 的国内团队，凡是认真用的，仓库根目录都有自己的 prompt 备忘录。不一定叫 CLAUDE.md，可能叫 .cursorrules、.aider.conf、AGENTS.md、.codex/instructions.md，本质都一样，写给 agent 看的内部说明书。

国内 app 厂商现在的暴露面比 Apple 还大，因为大家更卷、节奏更快、CI 流水线没那么严。一个典型场景，前端工程师为了让 Cursor 帮忙生成 UI，往项目里塞了一份 .cursorrules，里面写了"这个按钮文案不能改，是合规要求""这个接口走灰度，不要在生产环境调""上线前记得把测试 token 删掉"。然后构建脚本是 webpack copy-webpack-plugin 一把梭，把 src 目录下所有非代码文件都复制进 dist，再打包进 app。

CLAUDE.md / .cursorrules / AGENTS.md 就这样跟着进了 ipa 或者 apk。

iOS 这边问题更突出。Xcode 默认 Resources 目录里所有非源码文件都会进 bundle，很多团队 review 的时候只盯着 .swift 和 .m 文件，markdown 文件直接漏过。Android 这边稍好，gradle 默认对 assets 目录之外的文件比较严格，但如果有人手动把 docs 目录拷进 assets，一样翻车。

H5 和 React Native 项目最危险，构建产物经常带一堆奇怪的 .md 和 .json，没人会在意。

## 一条命令，先看自家有没有翻车

不绕弯，直接给可以跑的命令。

打开 terminal，cd 到你正在维护的 macOS / iOS / Android 项目根目录，把下面这行粘进去回车。

```
grep -ri "CLAUDE.md\|claude.md\|.cursorrules\|AGENTS.md\|.aider" --include="*.json" --include="*.gradle" --include="*.pbxproj" --include="*.lock" --include="*.yml" --include="*.yaml" .
```

这条命令在配置文件里搜，看 build 系统有没有显式或者隐式把 prompt 文件带进去。

接下来跑一遍真正的检查，针对已经构建好的 app 包。

iOS，找到 .ipa 或者 .app 文件，解压然后搜。

```
unzip -p YourApp.ipa | strings | grep -i "claude\|cursorrules\|aider\|agents.md"
```

或者更直接，把 .ipa 改后缀成 .zip 解压开，进 Payload/YourApp.app 目录跑。

```
find . -name "*.md" -o -name ".cursorrules" -o -name "AGENTS.md"
```

Android 这边把 .apk 当成 zip 解压，进解压目录跑同一条 find。

如果有任何输出，立即把这些文件加进 .gitignore + 构建 exclude list，重新出包，紧急更新一版上去。

## 我的判断

这事真正的教训不是"Apple 也会翻车"，是 AI coding 工具产生的"开发期附属文件"，已经多到工程团队没在认真清点。

CLAUDE.md 只是冰山一角，跟它一起在仓库里的还有 .vscode/settings.json 里的 LLM API key 残留、.env.local 里的 OpenAI 配置、Cursor 的 .cursor 缓存目录、各种 agent 跑过留下的 .agent-state.json。这些东西在 git 上你可能管住了，但构建脚本是另一回事。

正确的做法，把所有 AI agent 相关的文件路径，集中写进一份 .ai-artifacts.txt，然后在 .gitignore、Dockerfile 的 .dockerignore、Xcode 的 Build Phases、gradle 的 packagingOptions 里，全部 source 这一份清单。一处维护，多处生效。

不是说 AI coding 不能用，是说工程师该把"AI 留下的痕迹"当成第一类公民来管理，跟 .env 一个待遇。

Apple 这事三天后会被遗忘。但你自家 app 里的 CLAUDE.md 不会自己消失，下次发版还会带上去。

现在就去 grep。

---

相关链接

- HN 讨论原帖（380 分 319 评论），https://news.ycombinator.com/item?id=47973378
- Reddit r/ClaudeAI 主楼（2183 点赞），https://www.reddit.com/r/ClaudeAI/comments/1t0wch0/claudemd_files_in_apples_support_app/
- Reddit r/MacOS 主楼（1117 点赞），https://www.reddit.com/r/MacOS/comments/1t0pjqj/apple_accidentally_left_claudemd_files_in_todays/
- Anthropic Claude Code 官方关于 CLAUDE.md 的说明，https://docs.anthropic.com/en/docs/claude-code/memory

---
相关实体:: [[apple]] | [[anthropic]] | [[claude-code]]
相关主题:: [[supply-chain-security]] | [[ai-coding-tools]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
