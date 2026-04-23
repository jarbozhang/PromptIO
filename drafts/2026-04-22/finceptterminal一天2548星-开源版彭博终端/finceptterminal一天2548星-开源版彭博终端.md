# 一天涨 2548 个 star，这个开源项目想干掉 25000 美元的彭博终端

一个我昨天还没听过的项目，今天在 GitHub Trending 上一天涨了 2548 个 star。

项目叫 FinceptTerminal，定位很直接，开源版彭博终端。

彭博一个席位一年 25000 美元，FinceptTerminal 价格 0 元，AGPL-3.0 开源，还内嵌了 37 个 AI agent。

我第一反应是不信，第二反应是 clone 下来装一下。

## 为什么要看这个项目

做过量化或者看过行情的都知道，彭博终端那个黑底橘字的界面基本是金融圈的通用语言。一台机器一年 25000 美元，公司给不给配取决于你是不是"严肃的人"。

国内稍微对标的是同花顺 iFinD、Wind、东方财富 Choice，便宜一点，但企业版也是五位数起步。

个人开发者想做策略，只能拼凑 akshare、tushare、yfinance，自己写 UI，自己做数据清洗。

所以当一个项目把"Bloomberg-terminal-class performance"直接写在 README 里的时候，不管最后靠不靠谱，我都想打开看看。

## 这玩意到底是什么

先说清楚一点，源数据里 GitHub Trending 抓到的 stars 显示 0、stars_today +2548，很容易让人以为这是个刚建的项目。

我去仓库页确认了一下，总 star 数其实是 12.3k，不是 0。应该是 trending 抓取的时候漏了总数字段。一天 +2548 的增幅是真实的。

技术栈不是我以为的纯 Python。仓库语言占比 C++20 大概 38.9%，Python 60.5%，底下还有 CMake、Qt Script。

这说明它不是一个 Jupyter 套壳，是一个真正的桌面 App，用 Qt 做 UI，C++ 做性能敏感的部分，Python 做 agent 和数据层。

README 列的模块有这些，DCF 模型、组合优化、VaR 和 Sharpe 这些风险指标、衍生品定价、37 个 AI agent、加密货币和股票交易接口、海事追踪、地缘政治分析、强化学习模型。

数据连接器号称 100+，我看到的名字包括 Yahoo Finance、FRED、IMF、World Bank、Polygon、Kraken、DBnomics，还有 akshare。

akshare 出现在这里有意思，说明作者确实考虑了国内数据源。

## 我装了一下

macOS 的安装路径是这样的，

```
git clone https://github.com/Fincept-Corporation/FinceptTerminal.git
cd FinceptTerminal
chmod +x setup.sh && ./setup.sh
```

setup.sh 会拉 CMake 和 Ninja 把 C++ 层编出来，再装 Python 依赖。我的 M2 Mac 跑下来大概 8 分钟，中间 Qt 编译那段风扇起飞。

官方也提供 Docker 镜像，不想折腾编译的直接拉 `ghcr.io/fincept-corporation/fincept-terminal:latest` 就行，但 Docker 跑桌面 App 要转 X11，macOS 上得装 XQuartz，更麻烦。

跑起来之后 UI 确实像那么回事。主界面分几个 tab，Dashboard、Equity Research、Portfolio、News、Node Editor。

Node Editor 是我没想到的东西，类似 Comfy UI 那种拖节点的工作流，可以把"拉数据-算因子-画图"连成一条流程。

Dashboard 的行情流畅度比我预期好，可能就是 C++ 那 38.9% 的功劳。

AI agent 那块有意思，37 个 agent 分成三类，交易员框架里有 Buffett、Graham、Lynch、Munger、Klarman、Howard Marks 这些名字，相当于预置了几个价值投资风格的 prompt。还有宏观经济 agent 和地缘政治 agent。LLM 后端支持 OpenAI、Anthropic、Gemini、Groq、DeepSeek、MiniMax、OpenRouter、Ollama，国产模型和本地模型都顾到了。

我让 Buffett agent 看了一份 A 股财报，输出的东西像一个中等水平的 research note，不算惊艳但也不丢人。真要入库我肯定要换 prompt，毕竟内置的 prompt 还是美股语境。

## 社区怎么看

Issue 区能看到几类声音。

一类是量化新手，问"能不能接入 tushare""A 股数据怎么拉"，作者回复挺积极，akshare 已经在支持列表里。

一类是老金融，质疑"你这数据延迟多少毫秒""level-2 怎么处理"。作者的回答基本是"免费数据源能拿到什么就是什么，要低延迟得自己接券商 API"。这个态度我是服的，没吹牛。

还有一类是做基建的，在讨论 AGPL-3.0 这个许可证问题。AGPL 的传染性很强，任何商用都得开源衍生代码，这对想拿它做私募内部系统的团队是个坎。作者也给了商业授权通道，但价格没公开。

我翻了一下贡献者列表，26 个人，核心几个是印度背景的开发者，维护密度还可以，v4.0.1 是 4 月 15 日发的，最新是 v4.0.2。

## 我的判断

坦率讲，FinceptTerminal 的 trending 暴涨，有相当一部分是因为"彭博开源平替"这个故事讲得足够性感，而不是因为它真的能替代彭博。

彭博终端真正的护城河从来不是数据本身，是 30 年积累下来的买方卖方习惯，是彭博即时通讯 IB Chat 上交易员之间的约定俗成，是合规要求下审计轨迹的完整。

一个开源项目能抄模块，抄不来这套生态。我的判断是，开源替代方案在机构端成功的概率不到 10%。

但这不代表这个 repo 没价值。

我认为 FinceptTerminal 真正的市场在三类人身上。

第一类，个人量化玩家和独立策略开发者，他们不需要彭博，但需要一个比 Jupyter 好看、比自己写 Streamlit 省事的一站式环境。

第二类，金融相关的内容创作者、分析师和 KOL，自媒体做研报用，做展示用，截图放公众号比截 Wind 好看十倍。

第三类，中小金融机构的研究部门，本来就没预算上 Wind 企业版，用这个做内部原型完全够。

至于国内券商要不要抄这个 repo，我的看法是该抄。同花顺的桌面端 UI 停留在 2015 年，Choice 的 AI 功能还在拿 GPT-3.5 做花瓶。FinceptTerminal 在 Node Editor 和 agent 编排上的思路，国产平台三年内都看不到影子。

## 你该做什么

如果你是量化爱好者，就一条命令，clone 下来跑 setup.sh 试一晚上，看看 Node Editor 能不能搭出你想要的因子流水线。

如果你是金融内容创作者，装这个就是为了截图，它的 Dashboard 比你现在用的任何工具都像彭博。

如果你在券商或者三方数据商工作，打开 Issue 区看一眼社区在要什么，那就是你们下个版本该做的需求单。

一个开源项目能不能干掉彭博不重要，重要的是它已经让"金融数据终端"这个东西不再是 25000 美元起的生意了。

## 相关链接
- FinceptTerminal GitHub，https://github.com/Fincept-Corporation/FinceptTerminal
- GitHub Trending 排名，https://github.com/trending

---
相关实体:: FinceptTerminal | 彭博Bloomberg | 同花顺 | 东方财富
相关主题:: AI金融 | 开源工具 | 金融数据

<!-- REACH: 7/10 | 品牌✗ 利益点✓ 可操作✓ -->
