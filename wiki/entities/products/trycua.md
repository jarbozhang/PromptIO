# trycua

跨平台 Computer Use Agent 开源基础设施，2026-04-27 把整套"让 Agent 操作真实电脑"的栈完整开源，覆盖 macOS / Linux / Windows。

## 定位

1. **整套基础设施开源** — 不只是 SDK，而是包含运行时、沙箱、平台适配、工具协议在内的端到端栈
2. **跨平台** — macOS / Linux / Windows 三大桌面 OS 全覆盖，对标 [[anthropic|Anthropic]] Claude Computer Use 但脱离单家厂商绑定
3. **降低 Computer Use Agent 自建门槛** — 之前要自己拼桌面控制 + 截图 + Action Loop，现在一份开源仓库直接搭

## 首次覆盖

2026-04-27

## 我们的覆盖

| 日期 | 文章 | 角度 |
|------|------|------|
| 2026-05-10 | [[字节ui-tars-desktop-552星-多模态agent桌面栈\|字节 UI-TARS-desktop 一夜 552 星，国产多模态 agent 桌面栈把 Computer Use 跑给你看]] | 同赛道国产对照 / 自带模型差异化 |
| 2026-05-03 | [[agent-desktop-53命令-本地桌面自动化-不用截图操控native-apps\|不让 AI 看截图猜坐标了，agent-desktop 让它直接读 Mac 的 UI 结构]] | a11y CLI 路线 / 同赛道对照 |
| 2026-04-27 | [[trycua开源-computer-use-agent基础设施-macos-linux-windows都能跑\|trycua 把 Computer Use Agent 的整套基础设施开源了]] | Computer Use Agent 跨平台基础设施首次落地 |

## 相关主题

- [[agent-frameworks|Agent 框架]]
- [[computer-use-agent|Computer Use Agent]]

## 相关实体

- [[anthropic|Anthropic]] — Claude Computer Use 是商业对照方
- [[claude-code|Claude Code]] — 同属"让 Agent 真正动手"的工具栈

## 注意

首次入库。trycua 把 Computer Use Agent 从"Anthropic 产品演示"拉到"任何人能在自己电脑上跑"，是 Computer Use Agent 主题从空白走向首次实操覆盖的关键节点。后续跟踪点：实测稳定性、社区是否在上面起教程、是否被国产 Agent 项目集成。
