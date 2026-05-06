# Daemon Tools 装了 27 天的后门，国内装机党今晚自查这几个文件

如果你电脑里还装着 Daemon Tools Lite，今晚先别睡。

5 月 5 日卡巴斯基旗下 Securelist 披露，Daemon Tools 官方下载渠道在 **4 月 8 日到 5 月 5 日**之间分发的安装包被植入了后门，整整 27 天没人发现。Ars Technica 跟进时用的标题是"Widely used Daemon Tools disk app backdoored in monthlong supply-chain attack"。

国内对老 Windows 用户来说，这名字不陌生。挂载光盘镜像的年代，Daemon Tools 是装机包标配，当年卡饭论坛、远景论坛、吾爱破解上但凡讲"如何安装 XX 游戏"的帖子，第三步基本都是"用 Daemon Tools 加载这个 ISO"。15 年过去了，Reddit 上 r/pcmasterrace 那条 673 赞的热帖里有人感慨"我居然还以为这玩意儿早没了"，但你打开自己的开始菜单看一眼，可能比想象中还在用。

## 后门怎么钻进来的

先把事情讲清楚。

被污染的版本号是 **12.5.0.2421 到 12.5.0.2434**，这批安装包从 4 月 8 日开始挂在 daemon-tools 官网，谁去官网下载谁中招。攻击者并不是改了某个外挂 DLL，而是直接把后门塞进了 CRT 初始化代码里，所以呢只要你启动了任何一个被污染的二进制，恶意逻辑就在 main 函数之前先跑一遍。

被改过的可执行文件有三个，都躺在 `C:\Program Files\DAEMON Tools Lite` 下，

- `DTHelper.exe`
- `DiscSoftBusServiceLite.exe`
- `DTShellHlp.exe`

启动后的行为分两段。第一段是一个叫 `envchk.exe` 的信息收集器，把你的 MAC 地址、主机名、DNS 域、当前进程列表、已装软件清单、系统区域设置打包，POST 给 C2。C2 域名是 `env-check.daemontools[.]cc`，一个**典型的仿冒域名**，真正的官网是 `daemon-tools.cc`，攻击者抢注了一个长得几乎一样的子域，3 月 27 日就注册好了，只等版本上线。

第二段才是真后门。如果信息收集器认为你这台机器"值得继续搞"，会拉一个极简后门下来，能力包括下载文件、执行 shell 命令、把 shellcode 注入 `notepad.exe` 和 `conhost.exe` 这两个常见进程。Securelist 还在一台目标机上找到了一个完整的 QUIC RAT，C++ 写的，用 WolfSSL 库，支持 HTTP/UDP/TCP/WSS/QUIC/DNS/HTTP/3 七种协议混跑，这是显然准备打高价值目标的工程级武器，不是普通广告木马。

回连地址有两个，记下来一会儿要用，

- `env-check.daemontools[.]cc`
- `38.180.107[.]76`

## 国内用户为什么风险更大

这件事在国内有个特殊语境。

Daemon Tools 在国内有大量"年代沉淀用户"。一类是 30 岁上下的老玩家，当年装单机游戏离不开它，PC 一路升级也没卸；一类是公司行政发的旧办公本，IT 部门当年统一装的镜像里就带这个工具；还有一类是各种"装机包/万能工具箱"打包带的，用户根本不知道自己装了。

更麻烦的是，国内绕开官网的获取路径很多。卡饭、远景、吾爱破解这类老论坛历史上有大量"破解版/绿色版"流通，那些版本本身就脱离了官方更新通道，等于你既享受不到官方修复（如果未来有的话），也分不清自己手里这版是干净的老版本还是别人重打包带后门的版本。

这里得说一句，本号不教任何人去哪下、怎么破，盗版软件的来源风险一向比官方还高，这次出事的偏偏是官方渠道，但这不代表那些第三方包就更安全，恰恰相反，第三方打包者很可能也已经把官网那批被污染的安装器二次封装进了"系统装机包"。

Reddit r/pcmasterrace 那条帖子下面，72 赞的一条评论很有代表性，那位玩家是因为"装 Battlefield 6 beta 反作弊不让 Daemon Tools 跑才把它卸了"，他原话是"看来运气不错"。换成国内场景，相当一部分人根本不打这种带反作弊的 3A 大作，自己机器上有这个东西完全没意识。

## 今晚的自查清单

下面这套步骤按"由轻到重"排，照着走就行。

**第一步，确认有没有装。**

打开"控制面板 - 程序和功能"，搜 "DAEMON" 看有没有这个名字。或者去 `C:\Program Files\DAEMON Tools Lite` 看目录在不在。装机时间在 2026 年 4 月 8 日之后的，重点怀疑。

**第二步，看版本号。**

启动 Daemon Tools，菜单里"关于/About"会显示版本。如果是 **12.5.0.2421 到 12.5.0.2434** 区间任何一个，基本可以判定中招。早于这个区间的版本本身没事，但如果你这一个月内装过更新、或者装了别人的"装机包"，需要继续往下走。

**第三步，看进程和网络回连。**

打开任务管理器，看有没有这三个名字在跑，`DTHelper.exe`、`DiscSoftBusServiceLite.exe`、`DTShellHlp.exe`。然后用 `resmon.exe`（资源监视器）看"网络 - 带网络活动的进程"，重点关注上面三个进程有没有往陌生域名发请求。

更直接的办法，命令行跑一下，

```
nslookup env-check.daemontools.cc
```

如果能解析到 IP，说明这个仿冒域名还活着；如果你的机器在过去一个月内对这个域名发过请求（看 DNS 缓存，`ipconfig /displaydns | findstr daemontools`），那就是已经回连过了。

**第四步，看 Temp 目录残留。**

去 `C:\Windows\Temp` 找有没有这几个文件名，`envchk.exe`、`cdg.exe`、`cdg.tmp`、`imp.tmp`、`piyu.exe`。这是攻击链路上的暂存文件，正常 Windows 不会有这个组合。

**第五步，处置。**

如果前面四步都没命中，卸载 Daemon Tools 就完事了，Windows 10 之后系统已经原生支持双击挂载 ISO，这个工具的核心功能早就被替代。

如果命中了进程或网络回连那一步，**不要只是卸载**。后门进过 CRT 初始化、注入过 notepad/conhost，意味着持久化机制可能已经离开 Daemon Tools 自己的目录了。这种情况下最稳的做法是断网、备份个人数据（只复制文档/图片，不复制可执行文件）、重装系统。

如果机器上有过工作账号登录、SSH key、保存的浏览器密码、企业网络访问凭证，重装之后还要把这批凭证全部轮换一次。这台机器在 4 月 8 日之后可能给攻击者发过一份"机器画像"，账号密码这类东西默认假定已泄。

## 把这事放进供应链攻击的时间线看

最近一个月密集发生的供应链事件值得一起记一笔。

4 月 28 日，openclaw 365k token 内部凭证泄露事件，攻击面是云端 API key 链路。4 月 30 日，PyTorch Lightning 的 Shai-Hulud 蠕虫攻击 npm/PyPI 投毒。5 月 3 日，Apple Support 仓库一份 CLAUDE.md 把内部 prompt 和密钥写出去。今天又来一个 Daemon Tools 官方分发渠道被插后门的事件。

这串事件覆盖了云 API、开源包管理、AI agent 配置文件、桌面安装包四条不同的供应链路径。共同点是攻击者越来越倾向于**在你信任的渠道里下手**，你信任 PyPI、信任官网、信任 Apple 自家仓库、信任装了 15 年的老工具，攻击者就在这些信任锚点上动刀。

对国内用户特别有意义的一点是，Daemon Tools 这次事件提醒我们，**老软件不是安全的代名词**。一个工具用了 15 年没出过事，不代表第 16 年它的开发公司不会被攻破。装机党今晚清一遍系统里那些"装了从来不更新、也不知道还在不在跑"的工具，比追新热点重要得多。

相关链接

- Securelist 技术分析，[https://securelist.com/tr/daemon-tools-backdoor/119654](https://securelist.com/tr/daemon-tools-backdoor/119654)
- Ars Technica 报道，[https://arstechnica.com/security/2026/05/widely-used-daemon-tools-disk-app-backdoored-in-monthlong-supply-chain-attack/](https://arstechnica.com/security/2026/05/widely-used-daemon-tools-disk-app-backdoored-in-monthlong-supply-chain-attack/)
- Reddit r/pcmasterrace 讨论串（673 赞），[https://www.reddit.com/r/pcmasterrace/comments/1t4ahsq/](https://www.reddit.com/r/pcmasterrace/comments/1t4ahsq/)

Obsidian 关联，[[daemon-tools|Daemon Tools]] · [[supply-chain-security|供应链安全]] · [[ai-security|AI 安全]] · [[ai-product-experience|AI 产品体验]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
