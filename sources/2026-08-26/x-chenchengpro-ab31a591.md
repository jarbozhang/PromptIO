---
title: >-
  早上给 Bun 提了个 issue，robobun 很快响应并提了 pr fix 见 https://t.co/JXwelvihCU 从 issue 到
  PR，79 分钟。带回归测试：在 main 上失败，在它的分支上通过，ASAN 和 release 各跑了一遍。 很多人应该都有做类似的
  flow，但大部分的 merge 率应该不太高。有点好奇是怎么实现的
source: X @chenchengpro
url: 'https://x.com/chenchengpro/status/2092234537682063854'
date: 'Tue Aug 25 12:56:00 +0000 2026'
likes: 53
reposts: 4
replies: 38
source_type: x
language: zh
account_name: chenchengpro
fetched_at: '2026-08-26T11:05:03.043Z'
---
早上给 Bun 提了个 issue，robobun 很快响应并提了 pr fix 见 https://t.co/JXwelvihCU

从 issue 到 PR，79 分钟。带回归测试：在 main 上失败，在它的分支上通过，ASAN 和 release 各跑了一遍。

很多人应该都有做类似的 flow，但大部分的 merge 率应该不太高。有点好奇是怎么实现的，于是翻了一下 bun 仓库的 workflow，还找到一份对它做过逆向的研究文档。

一些有趣的地方：

1\ robobun 不是 GitHub App，就是个普通 user 账号。真正的编排器不在 GitHub 上，跑在 Bun 自己的机器里，对外完全看不到。GitHub Actions 里只有 lint 和治理，没有引擎。

2\ worker 就是普通的 Claude Code，照着仓库里公开的 CLAUDE.md、REVIEW.md 和 .claude/ 下的 hooks、skills 干活。

3\ REVIEW.md 是拿 2500 个已 merge PR 的 review 记录提炼的。审查者实际卡过什么，就写成什么规则，喂回给 agent。

4\ 真正管用的是一条发布门禁。每个 PR 必须附上机器跑出来的证据：测试在 main 上失败、在 PR 上通过，两份输出都贴进 PR body。证明不了，就得明说证明不了，理由还得从固定词表里选。

5\ 它从不 merge。开 PR 的同一秒把 Jarred 设为 assignee。审查交给另外两个 bot，merge 权只在两个人类手里。

现在它每天开约 142 个 PR，占这个仓库有史以来全部 PR 的 38%。merge 后被 revert 的比例 0.34%，人类作者是 1.33%。门禁上线后 1186 个 merge，零 revert。

瓶颈反而不在生成。两个人对每天 142 个 PR，median merge 时间 3.2 小时，积压着 2671 个 open PR。

看之前我以为秘密在模型，或者机器堆得够多。都不是。是让“没证据”这件事没法藏。agent 说“我修好了”不算数，门禁只认 main 上那个红色的测试。

仓库里还有个 slop 标签。人类一贴，PR 自动关闭，标题改成 “ai slop”。最后一道防线还是人。
