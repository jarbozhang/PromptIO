---
title: "看了总裁 @Lonely__MH 的帖子，终于吃上细糠了！这里给大家整理了详细的教程 \U0001F4F1 让 DeepSeek Harness 接入 iMessage：手机发短信就能指挥你的 AI！ dsh-imessage 是一个第三方插件，为 DeepSeek Harness 增加 iMessage 通道：你在手机上给一个托管号码发短信，短信内容会变成 DSH 的提示"
source: X @xiangxiang103
url: 'https://x.com/xiangxiang103/status/2090270547880145177'
date: 'Thu Aug 20 02:51:48 +0000 2026'
likes: 50
reposts: 8
replies: 27
source_type: x
language: zh
account_name: xiangxiang103
fetched_at: '2026-08-21T11:05:03.418Z'
---
看了总裁 @Lonely__MH 的帖子，终于吃上细糠了！这里给大家整理了详细的教程

📱 让 DeepSeek Harness 接入 iMessage：手机发短信就能指挥你的 AI！

dsh-imessage 是一个第三方插件，为 DeepSeek Harness 增加 iMessage 通道：你在手机上给一个托管号码发短信，短信内容会变成 DSH 的提示词，AI 的最终回答会通过 iMessage 回发给你。出门在外，掏出手机就能让 AI 干活。

⚠️ 先分清两个环境（最容易踩的坑）：

Web 端 = 命令行 dsh web 启动的界面，插件装到 web profile
桌面端 = DSH Desktop 应用，插件装到 desktop profile

两套互不读取！桌面端不会看 web profile，装错等于白装。

▍安装（按你的环境选一条）

Web 端：
npm install -g @deepseek-ai/dsh
dsh plugin --profile web add dsh-imessage
dsh web

桌面端：
dsh plugin --profile desktop add dsh-imessage
然后完全退出并重新打开 DSH Desktop。

⚠️ 如果安装时提示 Ignored build scripts: protobufjs，编辑对应 profile 目录下的 pnpm-workspace.yaml，加上：
allowBuilds:
  protobufjs: true
然后重新执行 add 命令，看到 postinstall: Done 即成功。可用 dsh plugin --profile <web|desktop> list 验证。

▍启用配置（Settings → iMessage，三张卡片）

① Authorize 授权：点击后浏览器自动跳转 Photon 授权页（弹窗被拦截就手动打开页面链接并输入验证码），用邮箱注册/登录 Photon 账号并同意授权。
② 填你的发送号码：E.164 格式，如 +14155552671，保存。插件只响应这个号码。
③ 记下分配的托管号码：之后用你的号码向它发短信即可。

▍使用

普通文字 = DSH 提示词；以 / 开头的真实指令用 // 转义，如 //review this route
命令：/help /new /sessions /switch /status /stop /approve /deny /answer
仅文本、仅 1v1 私聊；附件、群聊、SMS 会被忽略
只有最终回答会回发短信，中间推理只在界面可见

常见问题：桌面端没有 iMessage 页 = 装错 profile 或没重启；invalid-phone = 号码格式不对；auth-expired = 重新授权。

🔗 插件仓库：https://t.co/p5YnkZaorh
