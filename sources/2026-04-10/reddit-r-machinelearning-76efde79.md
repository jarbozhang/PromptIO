---
title: >-
  Anyone have an S3-compatible store that actually saturates H100s without the
  AWS egress tax? [R]
url: >-
  https://www.reddit.com/r/MachineLearning/comments/1sgn6vu/anyone_have_an_s3compatible_store_that_actually/
source: Reddit r/MachineLearning
source_type: rss
language: en
published: '2026-04-09T11:41:12.000Z'
fetched_at: '2026-04-10T00:43:27.830Z'
---
We’re training on a cluster in Lambda Labs, but our main dataset ( over 40TB) is sitting in AWS S3. The egress fees are high, so we tried to do it off Cloudflare R2. The problem is R2’s TTFB is all over the place, and our data loader is constantly waiting on I/O. Then the GPUs are unused for 20% of the epoch.
 Is there a zero-egress alternative that actually has the throughput/latency for high-speed streaming? Or are we stuck building a custom NVMe cache layer?
    submitted by    /u/regentwells  
 [link]   [comments]
