# ppt-master 这个仓库, AI 生成的 PPTX 居然能直接改

GitHub Trending 今早冒出一个仓库叫 ppt-master, 作者 Hugo He, 一晚 +370 星, 总数 10.5k。

我点进去之前以为又是一个"AI 一键生成 PPT"的轮子。市面上这种太多, 路数一样, AI 排版完导出图片塞进 PPTX, 双击文字框发现是图, 一个字都改不了。

ppt-master 不走这条路。它生成的是 PowerPoint 原生 shapes, 文本框是文本框, 形状是形状, 连动画和翻页都是 OOXML 原生的。

## 为什么"原生可编辑"是分水岭

公司汇报场景里 AI 生成 PPT 一直卡在最后一公里。老板说"这页换个标题", 你打开整页是一张图, 字都改不了, 要么从头重做, 要么自己手搓贴回去。这就是为什么大多数人宁愿用模板, AI 的输出在协作链条里是个死胡同。

ppt-master 的承诺是每个元素都可点击可编辑。文本是文本框, 图表是 native chart, 转场是 PowerPoint 原生那一套。导出 .pptx 扔给同事, 在 Office 或 WPS 打开跟手搓的没区别。

## 怎么用, 门槛不低

git clone, pip install, Python 3.10+。它不是 CLI 也不是 Web 服务, 而是一套给 Cursor / Claude Code / VS Code 这类 AI IDE 用的 skill 集合。使用方式是在 IDE 对话框里跟 AI 说"把 report.pdf 做成 PPT", AI 调脚本, 分析内容、生成 SVG 设计稿、编译成 PPTX。输入支持 PDF、DOCX、图片、URL 和粘贴文本。

前提是你得有 AI IDE, 背后的 LLM 够强。作者推荐 Claude Opus 4.7, 官方 demo 12 页就是 Opus 4.7 跑的。

## 国内用户怎么用

文档列出支持的模型里 **Kimi 和 MiniMax 是国产**, 拿月之暗面或 MiniMax 的 API key 就能跑。DeepSeek 和 Qwen 文档没明说, 但它本质是 prompt + 工具调用框架, 跟 IDE 后接的 LLM 解耦, IDE 那层能挂上应该就能跑, 我没亲测, 谁先试出来欢迎留言。

12 页 PPT 用 Opus 4.7 跑一次约 1-3 美金, 换 Kimi 或 MiniMax 能再砍一个数量级。

## 我的判断

国内 AI PPT 产品不少, 模板花哨、按月订阅, 卖"非技术人不用动脑"。ppt-master 走另一条路, 开源 MIT、本地运行、PPTX 原生输出, 卖"技术人完全控制输出格式"。交集是偶尔做董事会汇报或客户提案的人。

国产 AI PPT 工具三四年一直停在"看着像 PPT、其实是图集"。ppt-master 把这件事从"图像合成"拽回到"结构化文档生成", 让 PowerPoint 自己渲染 OOXML。方向更难, 天花板更高, 做办公自动化的团队值得看看。

不想装环境, 作者 demo 在 hugohe3.github.io/ppt-master, 直接看 6 种样张。10.5k 星做参考, 代替不了你跑真实素材。

---

本文不涉及境外软件访问教程, 所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
