---
title: "Perhaps the craziest thing that was introduced on the Keras community call today: Keras Kinetic, a n"
source: "X @fchollet"
url: "https://x.com/fchollet/status/2040119594984284218"
date: "Fri Apr 03 17:29:49 +0000 2026"
likes: 181
reposts: 15
replies: 20
---

Perhaps the craziest thing that was introduced on the Keras community call today: Keras Kinetic, a new library that lets you run jobs on cloud TPU/GPU via a simple decorator -- like Modal but with TPU support.

When you call a decorated function, Kinetic handles the entire remote execution pipeline:

- Packages your function, local code, and data dependencies
- Builds a container with your dependencies via Cloud Build (cached after first build)
- Runs the job on a GKE cluster with the requested accelerator (TPU or GPU)
- Returns the result to your local machine (logs are streamed in real time, and the function's return value is delivered back as if it ran locally)