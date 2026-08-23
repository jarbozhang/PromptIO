---
title: >-
  Cursor 的代码托管平台 Origin 正式上线，用户可以从 GitHub 同步仓库开始使用。 Origin 简单说，就是 Cursor 自己做的
  GitHub。代码存储、Git 托管、代码审查、团队协作，一站式解决。但它和 GitHub 最大的区别在于设计前提：GitHub
  是为人类开发者的工作节奏设计的，一个作者、两个审查者、按顺序合并。Origin
source: X @dotey
url: 'https://x.com/dotey/status/2089412415108600221'
date: 'Mon Aug 17 18:01:53 +0000 2026'
likes: 162
reposts: 21
replies: 50
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-08-18T11:05:14.303Z'
---
Cursor 的代码托管平台 Origin 正式上线，用户可以从 GitHub 同步仓库开始使用。

Origin 简单说，就是 Cursor 自己做的 GitHub。代码存储、Git 托管、代码审查、团队协作，一站式解决。但它和 GitHub 最大的区别在于设计前提：GitHub 是为人类开发者的工作节奏设计的，一个作者、两个审查者、按顺序合并。Origin 从一开始就把 AI Agent 当成主要用户来设计。

这个定位背后有具体的技术支撑。在 Compile 大会的演示中，Origin 在单个仓库内跑到了每秒 22.6 次提交，每小时 29.6 万次克隆，全球同步延迟低于 400 毫秒，还内置了 AI 驱动的自动合并冲突解决。这些数字对应的场景是：当你同时跑十几个 AI 智能体在一个仓库里并行写代码、开分支、提交 PR 时，传统的 Git 托管平台会变成瓶颈，Origin 就是为了解这个瓶颈而生的。

Origin 的技术底子来自 Cursor 2025 年底收购的 Graphite 团队。Graphite 做的是“堆叠式 PR 管理”，也就是让多个有依赖关系的代码变更可以并行处理，天然适配 AI 智能体的工作方式。从落地策略看，Cursor 选择先上线代码审查层，再逐步迁移托管功能，降低用户从 GitHub 切换的门槛。目前第一步就是从 GitHub 同步仓库。

Origin 上线意味着 Cursor 的纵向整合闭环成型：编辑器、云端智能体、代码审查、代码托管，全部在一个产品内完成。对比之下，GitHub Copilot 走的是横向路线，在已有的 GitHub 基础设施上叠加 AI 功能，底层架构还是十年前的设计。

对开发者来说，短期内 Origin 更像是 Cursor 生态内的增值功能，不太可能让团队立刻把核心项目从 GitHub 搬走。但如果你已经在用 Cursor 的云端智能体跑后台任务，Origin 的价值会很直观：代码从生成到审查到合并，整个流程不用再跳出 Cursor。
