---
title: DGX Spark and Overtemps
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1unavzr/dgx_spark_and_overtemps/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-04T14:45:45.000Z'
fetched_at: '2026-07-04T23:01:32.106Z'
---
For anyone who has a DGX-Spark and is having problems during these very hot summer months, you can underclock with:
 sudo nvidia-smi -lgc 0,900
 My temps dropped from 85C to 60C and this fixed my problem of overtemp lockups.
 Edit: Yes, I know that fans exist
    submitted by    /u/Simusid  
 [link]   [comments]
