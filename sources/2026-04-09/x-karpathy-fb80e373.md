---
title: "New supply chain attack this time for npm axios, the most popular HTTP client library with 300M week"
source: "X @karpathy"
url: "https://x.com/karpathy/status/2038849654423798197"
date: "Tue Mar 31 05:23:32 +0000 2026"
likes: 10521
reposts: 1118
replies: 555
---

New supply chain attack this time for npm axios, the most popular HTTP client library with 300M weekly downloads.

Scanning my system I found a use imported from googleworkspace/cli from a few days ago when I was experimenting with gmail/gcal cli. The installed version (luckily) resolved to an unaffected 1.13.5, but the project dependency is not pinned, meaning that if I did this earlier today the code would have resolved to latest and I'd be pwned.

It's possible to personally defend against these to some extent with local settings e.g. release-age constraints, or containers or etc, but I think ultimately the defaults of package management projects (pip, npm etc) have to change so that a single infection (usually luckily fairly temporary in nature due to security scanning) does not spread through users at random and at scale via unpinned dependencies.

More comprehensive article:
https://t.co/EJAZbqAPIQ