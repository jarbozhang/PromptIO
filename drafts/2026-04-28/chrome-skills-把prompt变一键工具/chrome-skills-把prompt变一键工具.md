# Chrome 加了 Skills，把你最好用的 prompt 变成一键工具

你那份"翻译润色 + 不改技术名词 + 输出三档语气"的 prompt，再也不用翻 Notion 文档复制粘贴了。Chrome 现在能直接把它存成"Skill"，下次在浏览器里打个斜杠 `/`，一键就跑。这是 Google 在 4 月 14 日推送给 Chrome 的新功能 Skills in Chrome，说到底是把"prompt 库"做进了浏览器原生菜单。

## 把事情讲清楚，Skills 到底是什么

Skills in Chrome 的核心动作只有一个，**把你最常用的 AI prompt 保存下来，下次一键调用**。

具体怎么用，

- **保存，** 在 Gemini in Chrome 的对话历史里，直接把任意一条 prompt 存成 Skill。
- **调用，** 在 Chrome 任意页面，按下 `/` 或者点 `+` 号按钮，从下拉里选你保存的 Skill。
- **管理，** 在 Gemini in Chrome 输入 `/` 后点指南针图标，进入 Skills 管理页，可以编辑、删除、新建。
- **模板库，** Google 提供了一个 ready-to-use 的 Skills library，常见场景（写邮件、对比商品参数、扫描文档要点等）有现成模板，可以一键加进自己的库再改 prompt。

它和 Chrome 里另一个新功能 AI Mode 不是一回事，但同源，AI Mode 是浏览器侧边栏式的 AI 搜索（4 月 16 日同步升级，支持跨 tab 搜索 + 图片/PDF 混合输入），Skills 则是把 prompt 工作流原子化、按需触发。两者共享同一个 `+` 菜单入口。

**可用范围（这是中国用户最关心的），**

- 平台，Mac / Windows / ChromeOS 桌面端，**还没有手机版**。
- 语言，Chrome 的语言必须设为 **English-US**（中文界面暂时看不到这个功能）。
- 账号，必须**登录 Chrome**（Google 账号）。
- AI Mode 升级目前只在美国，Skills 官方说法是"rolling out"，没明确国家清单，但前提是 Chrome 语言 = English-US。

**隐私，** Skills 沿用 Gemini in Chrome 的安全策略，关键动作（比如加日历事件、发邮件）会先要求确认，不会静默执行。

## 多平台真实反馈

社区研究层面 Reddit 和 X 这次拿到的样本量很薄（last30days 跑出来 0 条 HN/Reddit/X 命中，主要原因是功能刚发布两周、英文圈讨论散在 Gemini 大叙事里），所以这部分我尽量把对比讲清楚，别硬编不存在的"网友热评"。

把 Skills 放在现有 prompt 工具的图谱里看，

- **vs. Notion AI / 个人 prompt 文档，** 优势是"调用路径短了 10 步"，劣势是 Skill 内容存在 Google 这边、跨设备依赖账号同步，没法像 markdown 文档一样自由迁移。
- **vs. ChatGPT Custom GPTs，** Custom GPTs 是带知识库的"小机器人"，Skills 更轻，只是 prompt 模板 + Chrome 上下文（当前页面、tab 内容）。Skills 更像是 ChatGPT 的"Saved Prompts"功能直接做进了浏览器栏。
- **vs. Cursor Rules / `.cursorrules`，** Cursor Rules 是给代码 agent 的项目级人设，Skills 是给浏览器用户的任务级触发器，不在一个层。
- **vs. 浏览器扩展（Glasp、Sider、Monica 这类 prompt 收藏插件），** 这些第三方扩展过去三年填的就是这个坑，Skills 出现以后，原生 + 免费 + 跟 Gemini 深度绑定，第三方扩展会被压缩到"多模型支持 / 跨浏览器"这条窄路上。

## 我的判断

**第一，这是 Google 浏览器 AI 战略的关键一步，不是小修小补。** Chrome 全球桌面市占率 65% 左右，把 prompt 库做成浏览器一级菜单，等于宣告"AI 的入口不是聊天框，是地址栏"。Edge 这两年靠 Copilot 侧边栏冲了一波，Google 这次直接把 Gemini 嵌得更深，`/` 触发的不是搜索，是你保存的 Skill。

**第二，它会替代一类工具，那种"密码本式 prompt 收藏夹"。** 过去你要么存 Notion、要么用 PromptBase、要么装个 Sider，每次切场景都得切上下文。Skills 把这个动作压到一次按键。但它替代不了的是**有知识库 + 多步骤工作流**的工具，Skill 本质还是单 prompt，不是 agent，做不了 Custom GPTs 那种"上传 50 页 PDF 再问答"的事。

**第三，对中国用户实际能用多少？** 这条要分两层说，

- **Chrome 浏览器本身国内可装可用，没问题。**
- **Skills 功能依赖，（1）Chrome 界面切到 English-US；（2）登录 Google 账号；（3）Gemini in Chrome 要能正常调用。** 这三个条件，如果你能正常访问 Google 账号 + Gemini，那 Skills 就能用；访问不了，整个功能就是看个新闻。

所以更现实的中国用户路径，是把 Skills 当成"新交互范式的预演"，国内厂商一定会跟。豆包、元宝、Kimi 已经有桌面端，国产浏览器（夸克、UC、360）做"prompt 一键库"只是时间问题。Skills 这套 `/` 触发 + 模板库 + 一键调用的交互，会是未来一年浏览器 AI 的标配。

**第四，对独立开发者的影响。** 那些靠"prompt 模板订阅"赚钱的产品（PromptBase 一类）会被打疼。靠"prompt 管理插件"做的小工具，要么转向多浏览器多模型，要么死。但反过来，**Chrome Skills 没有市场分发机制**，官方 Skills library 是 Google 编的，不是用户上架的，这给"Skill 模板社区"留了一个窗口期。

## 行动建议，5 个值得立刻保存的 Skill 模板

如果你的环境能跑 Skills，下面这 5 条照搬就能用，按重要性排序，

**1. 邮件改写三档**
```
Rewrite this email in three tones: (1) formal/professional, (2) friendly/conversational, (3) brief/direct. Keep all factual content unchanged. Highlight any unclear parts with [需澄清].
```

**2. 当前网页 5 句话总结**
```
Summarize the current page in 5 bullets: (1) what it is, (2) the core claim, (3) supporting evidence, (4) what's missing or weak, (5) my action item if I were the reader.
```

**3. 中英技术翻译（保留专有名词）**
```
Translate to Simplified Chinese. Do NOT translate: product names, code, library names, model names. Match the tone of a Chinese tech blog (清晰、口语化、不端着). Output only the translation.
```

**4. 代码片段 review**
```
Review this code for: (1) bugs, (2) security issues, (3) readability. For each finding, give severity (High/Med/Low) and a one-line fix. Do not rewrite the whole file unless asked.
```

**5. 图片/截图转结构化说明**
```
Describe what's in the image as a product spec: (1) what the user sees, (2) the main interaction, (3) any text shown verbatim, (4) implied user need. Output as markdown bullets.
```

启用路径再走一次，Chrome 设置 → Languages → 把 English (United States) 拖到顶（确认 Chrome 界面语言切到英文）→ 重启浏览器 → 登录 Google 账号 → 打开任意页面 → 按 `/` → 看到 Skills 入口就成了。

如果你看不到这个功能，先确认上面三个条件都满足；功能是 rolling out 状态，部分账号可能晚几天。等今年下半年它进 Chrome stable 全量推送，再加上手机版，这个交互会变成所有人浏览器里的肌肉记忆。

提前练，不亏。

---
相关实体:: [[google|Google]]
相关主题:: [[ai-search|AI 搜索]] | [[ai-coding-tools|AI 工具]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
