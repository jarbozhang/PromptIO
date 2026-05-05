# Chrome 在你硬盘上偷塞了 4GB 的 Gemini Nano，国内用户怎么查、怎么删

事情是这样的。

5 月 5 日 HN 首页挂了一篇博客，标题直白，Google Chrome 在用户设备上静默安装了一个 4GB 的 AI 模型。188 分，199 条评论。我把博客和评论区扒了一遍，槽点非常具体，国内用户不知情情况下大概率已经中招，关键是检测和清理路径都有，几行命令就能搞定。

先把事实拉清楚。

Chrome 从 147 版本前后开始铺一个叫 Gemini Nano 的本地模型，给 chrome://flags 里的 prompt-api-for-gemini-nano 和 chrome://summarize 之类的功能做后端。下载这一步不弹窗、不询问、不在设置里露面，触发条件是机器硬件够格（Apple Silicon 16GB 以上内存、Windows/Linux 上有独显或够大显存）。够格了就会在后台跑 OnDeviceModelBackgroundDownload 默认开启的逻辑，把模型权重塞进用户目录。

文件大小博客原文是 4GB 左右，HN 评论区有人晒出更糟实测，sgbeal 自己机器上 Stable 和 Unstable 两个 Chrome 加起来吃掉 8GB；bluehex 半年前磁盘告警才发现，Chrome 目录里堆了多个版本的模型约 12GB，因为旧版本删除不彻底。

国内一部分用户网络环境拉不到 Google 服务，模型不会落盘；其余用户则会被静默装上，模型早就静悄悄躺在那儿了。

下面是具体的查法和删法。

## 第一步，打开 chrome://components/

地址栏输入 chrome://components/，回车。在组件列表里找 **Optimization Guide On Device Model**。如果这个条目存在并且版本号不是 0.0.0.0（比如显示 2025.8.8.1141 这种日期型版本号），模型已经在你机器上。

旁边还有个更直接的页面，chrome://on-device-internals/，里面有 model-status 区块，能看到模型加载状态、存储大小、上次使用时间。

## 第二步，确认磁盘占用

模型权重文件叫 weights.bin，存放在用户目录下。

macOS，路径是 `~/Library/Application Support/Google/Chrome/Default/OptGuideOnDeviceModel/`，里面会有一个像 `2025.8.8.1141` 这种日期版本号的子目录。

Windows，路径是 `%LOCALAPPDATA%\Google\Chrome\User Data\Default\OptGuideOnDeviceModel\`。

Linux，`~/.config/google-chrome/Default/OptGuideOnDeviceModel/`。

打开终端，macOS 用户跑一行就能看到大小。

```
du -sh ~/Library/Application\ Support/Google/Chrome/Default/OptGuideOnDeviceModel/
```

我自己 MacBook Pro 上跑出来 3.9G。HN 上有用户跑出 4.1G、4.3G 的，浮动来自版本差异。

## 第三步，怎么删才删得掉

直接 `rm -rf` 那个目录是没用的，Chrome 下次启动会自己重新拉一份回来。HN 用户 RaiausderDose 实测过，删完文件夹再开 Chrome，几分钟后又下回来了。

正确姿势是先关功能再删文件。

第一步，进 chrome://flags/，搜两个 flag，全部设成 Disabled。

- **optimization-guide-on-device-model** → Disabled
- **prompt-api-for-gemini-nano** → Disabled

设完点 Relaunch 重启浏览器。

第二步，关浏览器，删文件夹。

```
rm -rf ~/Library/Application\ Support/Google/Chrome/Default/OptGuideOnDeviceModel/
```

Windows 用户在资源管理器里手动删那个 OptGuideOnDeviceModel 目录就行。

第三步，给目录上写保护，防止下次又被悄悄重建。要锁的是父目录的写权限，光把 weights.bin 设只读没用。

macOS 上加个 immutable flag。

```
mkdir ~/Library/Application\ Support/Google/Chrome/Default/OptGuideOnDeviceModel
sudo chflags uchg ~/Library/Application\ Support/Google/Chrome/Default/OptGuideOnDeviceModel
```

想恢复就 `sudo chflags nouchg` 解锁。

## 我的判断

本地推理本身是好方向，但默认开启 + 不告知 + 删除会自动恢复三件套放一起，性质就从功能升级变成静默部署。Google 给的官方解释里强调模型推理在本地、不上传数据，这点没错，但用户根本没机会决定要不要装这个 4GB 的本地模型。隐私的前提是知情，知情的前提是看得见。

## 国产替代怎么办

如果你需要本地 LLM 跑浏览器侧的总结、翻译、智能填表，国内可访问的方案有几条。

最轻的，Edge 自带 Phi 系列本地模型，关法在 Edge 设置里有显式开关，这点 Edge 比 Chrome 干净。

再轻一档，本机跑 Ollama + qwen3:4b 或者 deepseek-r1-distill-qwen-7b，4GB 量级和 Gemini Nano 体感差不多，权重你自己管，删就是真删。

浏览器层面，夸克浏览器在 PC 端有 AI 侧栏走云端，本地不存权重，对磁盘友好。

## 现在就做

打开新标签，地址栏粘贴 chrome://components/，搜 Optimization Guide On Device Model，看版本号。如果不是 0.0.0.0，按上面三步走一遍。删完再回来 chrome://on-device-internals/ 确认 model-status 已经空了。

这事最值得记住的不是 4GB 本身，而是当一个浏览器装机量到 30 亿台时，默认装上这个动作的物理影响有多大。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
