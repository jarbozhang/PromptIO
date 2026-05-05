# Chrome 在你硬盘上偷塞了 4GB 的 Gemini Nano，国内用户怎么查、怎么删

事情是这样的。

5 月 5 日 HN 首页挂了一篇博客，标题直白，Google Chrome 在用户设备上静默安装了一个 4GB 的 AI 模型。188 分，199 条评论，r/degoogle 那边同步顶到了 335 分。我把博客和评论区扒了一遍，本来以为是又一波"Google 又作恶"的抱怨贴，看完发现槽点其实非常具体，国内用户在不知情的情况下大概率已经中招了，关键是检测和清理路径都有，几行命令就能搞定。

先把事实链拉清楚。

Chrome 从 147 版本前后开始铺一个叫 Gemini Nano 的本地模型，给 chrome://flags 里的 prompt-api-for-gemini-nano 和 chrome://summarize 之类的功能做后端。下载这一步不弹窗、不询问、不在设置里露面，触发条件是机器硬件够格（Apple Silicon 16GB 以上内存、Windows/Linux 上有独显或够大显存）。够格了就会在后台跑 OnDeviceModelBackgroundDownload 这个 feature flag 默认开启的逻辑，把模型权重塞进你的用户目录。

文件大小博客原文是"approximately 4 GB"，HN 评论区有人晒出更糟的实测，sgbeal 在自己机器上 Stable 和 Unstable 两个 Chrome 加起来吃掉 8GB；bluehex 半年前磁盘告警才发现，Chrome 目录里堆了"多个版本的模型，约 12GB"，因为旧版本删除不彻底。

你大概想问，这跟我有什么关系，我装的是 Chrome 国内常见组合（Chrome 主体 + 各种插件），这玩意儿真的也偷偷下到我硬盘上了？

答案是，只要你装的是官方 Chrome、机器配置够、网络能正常拉 Google 的 update 服务，它就会装。国内用户其中一部分会因为网络问题没拉下来，但相当多一部分人本来就有各种方式让 Chrome 的 update 通道工作，模型早就静悄悄躺在那儿了。

下面是具体的查法和删法。

## 第一步，打开 chrome://components/

地址栏直接输入 chrome://components/，回车。在长长的组件列表里找 **Optimization Guide On Device Model**。如果这个条目存在并且版本号不是 0.0.0.0（比如显示 2025.8.8.1141 这种日期型版本号），恭喜，模型已经在你机器上。

旁边还有个更直接的页面，chrome://on-device-internals/，里面有 model-status 区块，能看到模型加载状态、存储大小、上次使用时间。这页是 Chrome 内部诊断页，HN 评论区里有人专门提到它比 components 页信息更全。

## 第二步，确认磁盘占用

模型权重文件叫 weights.bin，存放在用户目录下。三个系统的具体位置。

macOS，路径是 `~/Library/Application Support/Google/Chrome/Default/OptGuideOnDeviceModel/`，里面会有一个像 `2025.8.8.1141` 这种日期版本号的子目录，weights.bin 就在子目录里。

Windows，路径是 `%LOCALAPPDATA%\Google\Chrome\User Data\Default\OptGuideOnDeviceModel\`，结构一样。

Linux，`~/.config/google-chrome/Default/OptGuideOnDeviceModel/`。

打开终端，macOS 用户跑一行就能看到大小。

```
du -sh ~/Library/Application\ Support/Google/Chrome/Default/OptGuideOnDeviceModel/
```

我自己的 MacBook Pro 上跑出来 3.9G。HN 上有用户跑出 4.1G、4.3G 的，浮动来自版本差异。如果你装了多个 Chrome 通道（Stable、Beta、Canary、Unstable），每个通道都有自己的副本，互相不共享，这就是 sgbeal 那 8GB 的来源。

## 第三步，怎么删才删得掉

这是最坑的一段。直接 `rm -rf` 那个目录是没用的，Chrome 下次启动会自己重新拉一份回来。HN 用户 RaiausderDose 实测过，删完文件夹再开 Chrome，几分钟后又下回来了。

正确的删除姿势是先关功能再删文件。

第一步，进 chrome://flags/，搜两个 flag，全部设成 Disabled。

- **optimization-guide-on-device-model** → Disabled
- **prompt-api-for-gemini-nano** → Disabled

设完点 Relaunch 让浏览器重启。

第二步，关浏览器，删文件夹。

```
rm -rf ~/Library/Application\ Support/Google/Chrome/Default/OptGuideOnDeviceModel/
```

Windows 用户在资源管理器里手动删那个 OptGuideOnDeviceModel 目录就行。

第三步，给目录上写保护，防止下次又被悄悄重建。HN 用户 pmontra 提了个关键点，要锁的是父目录的写权限，光把 weights.bin 设只读没用，因为 Chrome 进程能写目录就能把整个文件夹推倒重来。

macOS 上加个 immutable flag。

```
mkdir ~/Library/Application\ Support/Google/Chrome/Default/OptGuideOnDeviceModel
sudo chflags uchg ~/Library/Application\ Support/Google/Chrome/Default/OptGuideOnDeviceModel
```

这样目录还在，但 Chrome 写不进去，自然也下不下来。想恢复就 `sudo chflags nouchg` 解锁。

## 社区里在吵什么

我把 HN 199 条和 Reddit 那几条高赞拉了一遍，反对意见基本分三类。

隐私层面，imglorp 那条比较有代表性，他认为 Chrome 长期定位就是用户行为遥测的入口，这次本地模型的部署只是把推理也下沉到客户端，"在任何宇宙里都不可能真做到隐私友好"。

带宽层面，德国用户 mschuster91 给了一个国内同样适用的视角，仍有大量地区用户走 16Mbps 级别的家庭宽带或者跑移动热点，4GB 一次推满半小时不止，热点用户直接把月流量包打掉一半。这事在国内三四线和农村宽带群体里同样成立，没人征求他们意见。

磁盘层面，同一个用户算了笔账，256GB 的 MacBook Air 系统占 50GB，Chrome 再吞 4GB 是 2% 磁盘空间，"在没有 opt-in 的前提下这比例不可接受"。

我的判断是，本地推理本身是好方向，但"默认开启 + 不告知 + 删除会自动恢复"三件套放一起，性质就从功能升级变成静默部署。Google 给的官方解释里强调"模型推理在本地，不上传数据"，这点没错，但用户根本没机会决定要不要装这个 4GB 的本地模型。隐私的前提是知情，知情的前提是看得见。

## 国产替代怎么办

如果你需要本地 LLM 跑浏览器侧的总结、翻译、智能填表，国内可访问的方案有几条。

最轻的，Edge 自带 Phi 系列本地模型，关法在 Edge 设置里有显式开关（这点 Edge 比 Chrome 干净）。

再轻一档，本机跑 Ollama + qwen3:4b 或者 deepseek-r1-distill-qwen-7b，4GB 量级和 Gemini Nano 体感差不多，权重你自己管，删就是真删。

浏览器层面国产替代，Arc 的国产分支、夸克浏览器在 PC 端有 AI 侧栏走云端，本地不存权重，对磁盘友好。

## 现在就做

打开一个新标签，地址栏粘贴 chrome://components/，搜 Optimization Guide On Device Model，看版本号。如果不是 0.0.0.0，就按上面三步走一遍。删完再回来 chrome://on-device-internals/ 确认 model-status 已经空了。

这事最值得记住的不是 4GB 本身，而是当一个浏览器装机量到 30 亿台的时候，"默认装上"这个动作的物理影响有多大。Google 自己给的 CO2 估算区间是 6000 到 60000 吨当量，规模就是这么放大出来的。

## 相关链接

- 原始博客（thatprivacyguy）, https://www.thatprivacyguy.com/blog/chrome-silent-nano-install/
- HN 讨论, https://news.ycombinator.com/item?id=48019219
- Reddit r/degoogle 讨论, https://www.reddit.com/r/degoogle/comments/1t4ckgk/google_chrome_silently_installs_a_4_gb_ai_model/
- Chrome 内部诊断页, chrome://on-device-internals/
- Chrome 组件页, chrome://components/

---

## 关联

相关实体, [[google|Google]] [[chrome|Chrome]] [[gemini-nano|Gemini Nano]]
相关主题, [[ai-privacy|AI 隐私]] [[ai-product-experience|AI 产品体验]]

```dataview
LIST
FROM "drafts"
WHERE contains(file.outlinks, this.file.link) OR contains(string(tags), "ai-privacy") OR contains(string(tags), "chrome")
SORT file.mtime DESC
LIMIT 10
```

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
<!-- xhs_pass: true -->
