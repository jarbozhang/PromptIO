# Mac mini变身24小时AI编程站，三件套让你随时随地给AI派活

上周五晚上十点，我躺在床上刷手机，突然想到白天一个API对接的思路可能有问题。以前这种时候只能记个备忘，等明天到电脑前再说。但那天我直接掏出手机，SSH连回家里的Mac mini，打了一句指令让Claude Code去验证，翻了个身继续刷手机。五分钟后再看，它已经跑完了，结果证明我的直觉是对的。

这种体验一旦有了，就回不去了。

我最近把家里闲置的Mac mini改造成了一个24小时在线的AI编程工作台。整套方案不需要任何付费服务，核心就三样东西，SSH + tmux + Tailscale。配好之后，手机上随时能给Claude Code派活、看进度、补指令，不用正儿八经坐在电脑前。

## 为什么是Mac mini

你可能会说，这不就是远程开发吗，用个云服务器不行吗？

其实吧，跑Claude Code这种vibe coding场景，和传统远程开发有个关键区别。Claude Code的任务经常要跑几分钟甚至十几分钟，中间你根本不需要盯着。你需要的是一台一直开机、随时能连的机器，而不是一台高性能计算节点。

Mac mini功耗很低，待机大概6-8瓦，一个月电费几块钱。放在角落里24小时开机完全没有心理负担。而且macOS对开发工具的兼容性不用多说，brew装完该有的都有。

说真的，很多人家里都有一台吃灰的Mac mini。它可能是你手边最容易改造成AI工作台的设备。

## 三件套怎么配

先说结论，整个过程大概15分钟能搞定。

**第一步，打开Mac的远程登录。** 系统设置 → 通用 → 共享 → 远程登录，打开就行。这一步让你的Mac能接受SSH连接。

**第二步，装tmux。** `brew install tmux`，然后开一个命名session，`tmux new -s claude`。以后所有Claude Code的任务都在这个session里跑。tmux的关键作用是，就算你手机断网了、切后台了、锁屏了，Mac上的任务还在跑。重新连上之后 `tmux attach -t claude`，一切都还在，不丢进度。

**第三步，装Tailscale。** 这是整套方案里最值得聊的一环。Tailscale会把你的手机和Mac mini放进同一个私有网络（基于WireGuard），不需要公网IP，不需要配路由器端口转发，不需要动态DNS。两台设备装好登录同一个账号，互相就能直接通信。

手机上装个SSH终端（iOS推荐Termius或者Blink Shell），连Tailscale分配给Mac的IP地址就行。

这样你在外面用4G、用咖啡店WiFi，都能直接SSH回家里的Mac。

## 一个容易踩的坑

我自己配的时候遇到一个问题，Mac mini合盖或者长时间不用之后会进入深度睡眠，SSH连不上。解决方案是在系统设置里关掉"在电源适配器供电时使显示器自动进入睡眠"，或者终端执行 `sudo pmset -a sleep 0 displaysleep 0`。

另外，tmux session如果开太多不清理，时间久了会比较混乱。我的习惯是按项目命名session，`tmux new -s project-name`，定期用 `tmux ls` 看一眼，把不用的 kill 掉。

## 进阶玩法，手机跑本地大模型

说到Tailscale的远程方案，llama.cpp的作者ggerganov最近演示了一个更极客的用法。他在Mac Studio上用llama.cpp跑Gemma 4模型（26B参数的MoE版本，Q8量化），通过Tailscale把llama.cpp自带的WebUI暴露给手机。效果是在iPhone上打开浏览器就能用，推理速度达到300 tokens/s。

不需要第三方app，不需要云服务，纯本地推理，手机只是个显示终端。

这个思路和Claude Code远程方案其实是一回事，都是"算力放在家里，终端带着走"。区别只是一个跑的是coding agent，一个跑的是chat模型。

## 我的判断

我认为"个人AI工作站"会变成开发者的标配，就像十年前每个程序员都有一台NAS一样。

可能有人觉得，现在云端算力这么便宜，为什么要折腾本地？这个想法在大部分场景下是对的。但AI编程工具有个特殊的地方，它跑在你的代码仓库上，访问你的环境变量、你的配置文件、你的私有API。把这些东西放在自己控制的机器上，比放在任何一个云服务上都让人安心。

而且坦率讲，当你发现自己可以在地铁上给AI布置任务、到公司时代码已经写好等你review的时候，你对"工作时间"的理解会发生变化。不是说你要7x24小时工作，而是你可以用碎片时间把想法丢给AI，让它替你做那些需要时间但不需要创造力的部分。

Mac mini + SSH + tmux + Tailscale，总共花15分钟配置，零成本，但它把你和AI的协作方式从"面对面坐班"变成了"异步遥控"。

如果你家里有一台吃灰的Mac mini，今晚就可以试试。

## 相关链接

- Tailscale 官网，https://tailscale.com/
- tmux 速查手册，https://tmuxcheatsheet.com/
- llama.cpp 项目，https://github.com/ggerganov/llama.cpp
- ggerganov 的 Tailscale + llama.cpp 演示，https://x.com/ggerganov/status/2039804601810001921

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
