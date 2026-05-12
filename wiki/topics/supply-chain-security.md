# 主题追踪：供应链安全

npm/PyPI 包投毒、第三方库安全事件。

## 当前状态

Axios 供应链攻击是 2026 年 Q2 最大的安全事件之一。社会工程学攻击维护者 → RAT 木马 → 恶意版本 axios@1.14.1 和 axios@0.30.4 发布 → 3 小时后移除。[[openai|OpenAI]] 因此要求所有 macOS 用户紧急更新。

## 关键事件时间线

- 2026-03-31 凌晨 — Axios 维护者被社会工程学攻击
- 2026-03-31 — 恶意版本发布（plain-crypto-js 依赖），3 小时后移除
- 2026-04-11 — OpenAI 公开安全事件，要求 macOS 更新

## 我们的覆盖

| 日期 | 文章 | 角度 |
|------|------|------|
| 2026-05-12 | [[openai-daybreak-claude-mythos-ai漏洞挖掘工作流对照\|OpenAI Daybreak vs Claude Mythos vs Google GTIG：三家 AI 漏洞挖掘工作流对照]] | 9 |
| 2026-05-11 | [[mythos-curl-mozilla271-anthropic-ai安全\|Anthropic Mythos 在 Mozilla 之后又找到 curl 漏洞，Daniel Stenberg 一句话救了国内开发者]] | AI 找上游基础包漏洞 / curl 作者站台 |
| 2026-05-10 | [[claude-code-cve-39861-sandbox逃逸-国内开发者升级\|Claude Code 爆 CVE-2026-39861 sandbox 逃逸漏洞，国内开发者今晚把这一个版本删掉]] | AI 工具自身 CVE / 国内更新链路被动 |
| 2026-05-03 | [[apple-support-app泄露claude-md文件-国内开发者grep自家应用\|Apple 自家 Apple Support 应用里被人扒出 Claude.md 文件，国内开发者赶紧 grep 自家 app]] | AI coding 附属文件泄露 / 构建管线漏过 |
| 2026-05-06 | [[daemon-tools月度供应链攻击-国内装机党自查清单\|Daemon Tools 装了 27 天的后门，国内装机党今晚自查这几个文件]] | 桌面工具投毒 / 国内装机党自查 |
| 2026-05-01 | [[pytorch-lightning供应链攻击-shai-hulud-恶意包\|PyTorch Lightning 被 Shai-Hulud 主题恶意包污染，国内 ML 团队该跑一遍 audit]] | PyPI 投毒 / ML 工程师 audit |
| 2026-04-28 | [[openclaw-365k星跨平台个人ai助手-4月安全事件你不能不知道\|openclaw 365k 星 4 月安全事件复盘]] | 个人 AI 助手品类宿主 + 扩展面 / 供应链安全首次落地 |
| 2026-04-18 | Firebase密钥泄露13小时烧掉54000欧——Gemini API安全踩坑实录 | API Key 泄露/成本风险 |
| 2026-04-14 | [[openai紧急通知macos用户必须更新-axios供应链安全事件波及全行业|OpenAI紧急通知macOS用户更新，Axios供应链安全]] | 事件报道+行动建议 |
| 2026-04-12 | [[openai因axios投毒紧急更新macos应用-立刻升级|OpenAI因axios投毒紧急更新macOS应用]] | 紧急通知 |
| 2026-04-09 | [[karpathy差点被黑客搞了-npm包安全吗|Karpathy差点被黑客搞了，npm包安全吗]] | 个人视角 |

## 饱和度评估

**中高饱和** — 5 篇。2026-04-28 新增 [[openclaw\|openclaw]] 365k 星 4 月安全事件，把供应链安全从 npm 投毒 / Axios / Firebase API Key 扩展到"个人 AI 助手扩展面"这条新边界——365k 星量级的 TypeScript 圈最大宿主自身的扩展面安全也开始成为独立议题。

## 潜在下一个角度

- PyPI 供应链安全（目前只覆盖了 npm）
- AI 模型权重投毒（safetensors 安全性）
- CI/CD 管线安全
- 个人 AI 助手扩展面安全（openclaw / clawhub 为代表的"宿主 + 扩展集散点"安全审计实操）
