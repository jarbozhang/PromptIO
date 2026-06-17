---
title: >-
  Hermes Studio v0.6.15 更新 - 精益求精 聊天侧栏完成重设计，并优化历史加载控制，长对话里的导航更清晰
  新增技能命令选择器，可以更快发现并从输入框插入可用的 skill 命令 新增 Claude 和 Gemini OAuth Provider，修正
  Gemini 模型 ID 规范化，并支持在模型选择器里手动刷新config.yaml 变
source: X @libapi_
url: 'https://x.com/libapi_/status/2066337243594424345'
date: 'Mon Jun 15 01:49:24 +0000 2026'
likes: 51
reposts: 7
replies: 41
source_type: x
language: zh
account_name: libapi_
fetched_at: '2026-06-17T03:16:02.868Z'
---
Hermes Studio v0.6.15 更新 - 精益求精

聊天侧栏完成重设计，并优化历史加载控制，长对话里的导航更清晰

新增技能命令选择器，可以更快发现并从输入框插入可用的 skill 命令

新增 Claude 和 Gemini OAuth Provider，修正 Gemini 模型 ID 规范化，并支持在模型选择器里手动刷新config.yaml 变更

Thinking 状态更新了指示器和工具栏布局，reasoning 进度更容易阅读，也不会打断消息流

深色主题下 input 和 select 等表单控件的边框恢复可见
Runtime 启动流程会先检查本地 runtime，再展示下载源选择，并在启动继续时保持检查状态可见

桌面端自更新不再被残留应用进程阻塞，Windows 退出时的 gateway 清理也更完整

应用退出时会停止托管的 gateways；在托管运行期间，异常退出的 gateway 仍会自动拉起

桌面端退出时会更平滑地关闭 server，减少 backend、bridge 和 gateway 孤儿进程残留

README 和官网展示改为一张动图 walkthrough，官网顶部 Hero 使用单独的静态预览图
