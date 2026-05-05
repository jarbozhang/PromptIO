# Apple 官方 app 把内部 AI 提示词打包进了用户手机，国内开发者赶紧自查

5 月 1 日，研究者 aaronp613 在 Apple Support v5.13 的 app 包里翻出了几份 CLAUDE.md。

库克家的应用，在用户手机上带着 Anthropic Claude Code 的项目说明书。这件事在 Hacker News 挂了几个小时前排，Reddit 几个版块加起来 5000 多赞、600 多条评论。

我看完之后第一反应不是吃瓜，是想到了自家仓库。

## CLAUDE.md 是什么，为什么不该出现在用户手机里

Claude Code 是 Anthropic 的命令行 coding agent。你在仓库根目录放一个 CLAUDE.md，agent 一进项目就把里面的规矩读进 context。

这个文件通常写什么。项目目录结构、构建命令、命名规范、哪些接口走灰度不要碰、上线前的检查清单，有时候还有一些只给内部 agent 看的产品说明。

这是给 AI 工具的备忘录，不是给用户的资源文件。

正常情况下它应该在 .gitignore 里，或者打包流水线里被排掉。它和 .env.example、internal docs 是一个层级，开发期文件，不属于 app bundle。

Apple 这次的问题是，Apple Support v5.13 的 app bundle 直接带着这几份 CLAUDE.md 发到所有装了这个 app 的用户设备上。用普通的 ipa 解包工具就能扒出来。

## 三个社区，三种反应，拼出了 2026 年写代码的全景图

r/MacOS 那帖最尖酸。350 赞的最高评论是"Explains a lot actually"，300 赞紧跟着"They vibe coded Tahoe"。Tahoe 是 macOS 26 的代号，这一代系统 bug 投诉一直很密集，社区把这事当成"你们家也是 vibe coding"的实锤。

r/ClaudeCode 的反应完全相反，没人觉得意外。最高评论是"This isn't really a surprise to me. The world of coding has very quickly changed to be largely conducted by AI."另一条是"lol are there actually people out there still hand writing code?"

r/ClaudeAI 那帖 2000 多赞，热门评论清一色在催"What is inside""Anything juicy in there"。所有人都想看 Apple 内部 prompt 长什么样，因为这种文件平时在 NDA 里，外人看不到。

三个社区拼起来就是现在写代码的真实状态。一线开发者已经默认 AI 协作，CLAUDE.md 就跟 .editorconfig 一样普及。中间层用户开始把 AI 工具的痕迹当成代码质量的负面信号。围观群众想看大厂内部到底怎么 prompt 自家产品。

## 国内团队的风险比 Apple 还大

CLAUDE.md 只是这一波被扒出来最显眼的，但同类文件在国内团队的仓库里普遍存在。

用过 Claude Code、Cursor、Aider、Cline 这一类 agent 的团队，仓库根目录基本都有自己的 prompt 备忘录。不一定叫 CLAUDE.md，可能叫 .cursorrules、AGENTS.md、.aider.conf、.codex/instructions.md，本质都一样，给 AI 工具看的内部说明书。

国内 app 团队的暴露面更大，节奏更快、CI 流水线没那么严。一个典型场景，前端工程师为了让 Cursor 帮生成 UI，往项目里塞了一份 .cursorrules，里面写了"这个接口走灰度不要在生产环境调""上线前记得把测试 token 删掉"。然后 webpack 的 copy-webpack-plugin 一把梭，把 src 下所有非代码文件都复制进 dist，再打包进 app。

.cursorrules 就这样跟着进了 ipa 或者 apk。

iOS 这边问题更突出。Xcode 默认 Resources 目录里所有非源码文件都会进 bundle，很多团队 review 时只盯 .swift 和 .m，markdown 文件直接漏过。H5 和 React Native 项目最危险，构建产物经常带一堆奇怪的 .md 和 .json，没人在意。

## 一条命令，先检查自家 app 包

打开 terminal，cd 到项目根目录，粘进去跑。

```
grep -ri "CLAUDE.md\|.cursorrules\|AGENTS.md\|.aider" --include="*.json" --include="*.gradle" --include="*.pbxproj" --include="*.yml" --include="*.yaml" .
```

这条在配置文件里搜，看 build 系统有没有显式或隐式把 prompt 文件带进去。

然后检查已构建的包。iOS 把 .ipa 改后缀成 .zip 解压，进 Payload/YourApp.app 目录跑。

```
find . -name "*.md" -o -name ".cursorrules" -o -name "AGENTS.md"
```

Android 把 .apk 当成 zip 解压，进解压目录跑同一条 find。

有任何输出，立刻把这些文件加进 .gitignore 和构建 exclude list，重新出包。

## 我的判断

这事真正的教训不是"Apple 也会翻车"，是 AI coding 工具产生的"开发期附属文件"，已经多到团队没在认真清点。

跟 CLAUDE.md 一起躺在仓库里的，还有 .vscode/settings.json 里的 LLM API key 残留、.env.local 里的模型配置、各种 agent 跑过留下的 .agent-state.json。这些东西在 git 层面你可能管住了，构建脚本是另一回事。

正确的做法是把所有 AI agent 相关的文件路径集中写进一份清单，然后在 .gitignore、.dockerignore、Xcode Build Phases、gradle packagingOptions 里统一 source 这一份清单。一处维护，多处生效。

不是说 AI coding 不能用，是说得把"AI 留下的痕迹"当成第一类公民来管理，跟 .env 一个待遇。

Apple 这件事三天后会被遗忘。但你自家 app 里的 .cursorrules 不会自己消失，下次发版还会带上去。

现在就去 grep 一下。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
