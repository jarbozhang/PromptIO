---
title: "This is a type of chart crime: when you plot value tuples from a timeseries on a 2D scatter plot lik"
source: "X @fchollet"
url: "https://x.com/fchollet/status/2040496223782891955"
date: "Sat Apr 04 18:26:24 +0000 2026"
likes: 913
reposts: 66
replies: 55
---

This is a type of chart crime: when you plot value tuples from a timeseries on a 2D scatter plot like this as if they were independent samples, you are leveraging temporal autocorrelation to magnify any existing x/y correlation and hide the actual variance.

You're also hiding temporal distribution drift (the typical value range for x and y, and the relation between them, change over long periods)