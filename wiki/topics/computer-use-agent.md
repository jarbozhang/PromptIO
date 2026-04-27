# 主题追踪：Computer Use Agent

让 AI Agent 直接操作真实电脑（鼠标、键盘、截图、系统调用），不再局限在 API 工具调用层。

## 当前状态

- **[[anthropic|Anthropic]] Claude Computer Use** — 商业起点，把"Agent 看屏幕 + 操作鼠标键盘"作为模型一等能力推出
- **[[trycua|trycua]]** — 2026-04-27 首次实操覆盖，把整套基础设施开源（macOS/Linux/Windows 跨平台），社区第一个能脱离单家厂商自建 Computer Use Agent 的栈

## 关键技术栈

桌面截图 + 像素级元素识别 + 鼠标/键盘动作合成 + Action Loop + 沙箱隔离 + 跨平台桌面适配

## 我们的覆盖

| 日期 | 文章 | 角度 |
|------|------|------|
| 2026-04-27 | [[trycua开源-computer-use-agent基础设施-macos-linux-windows都能跑\|trycua 把 Computer Use Agent 的整套基础设施开源了]] | 跨平台基础设施首次落地 |

## 相关实体

- [[trycua|trycua]] — 跨平台开源基础设施
- [[anthropic|Anthropic]] — 商业路线对照

## 相关主题

- [[agent-frameworks|Agent 框架]]

## 饱和度评估

**首次覆盖**（4/27）。1 篇/0 天，主题刚开。后续每出现一个能让 Computer Use Agent 跑通真实生产场景的方案都值得跟。

## 潜在下一个角度

- 实操跑通 trycua 完整 demo（Mac 跑通某个真实任务）
- Computer Use Agent 在企业自动化里的落地
- 国产是否有等效路线
- 安全边界：Agent 误操作 / 权限隔离 / 数据外泄风险
- 与 [[agent-frameworks|Agent 框架]] 中其他工具调用形式（MCP / API tool）的对比
