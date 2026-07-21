---
title: >-
  very notable trajectory comparison writeup here buried in the RLM paper from
  @a1zhang and @lateinteraction. an open secret of "frontier" model training is
  that even without trainin
source: X @swyx
url: 'https://x.com/swyx/status/2079411861150429402'
date: 'Tue Jul 21 03:43:15 +0000 2026'
likes: 100
reposts: 8
replies: 16
source_type: x
language: en
account_name: Shawn Wang (swyx)
fetched_at: '2026-07-21T11:00:53.178Z'
---
very notable trajectory comparison writeup here buried in the RLM paper from @a1zhang and @lateinteraction.

an open secret of "frontier" model training is that even without training on test, you can basically cheat by training on test lookalikes, enabling you to goalseek almost any benchmark number you want.

however when they are released open weights, 99% of the time the norm is that you do not get the datasets/rlenvs that would easily show you if someone was training on Temu Tbench, so there is plausible deniability. Alex and Omar discuss applying standard NLP distance metrics on hidden trajectories. There's no ultimate solution here, but they have some prelim explorations. It happens to support the finding that RLMs can generalize to unseen tasks that share latent structure observed in training.
