---
title: OpenMythos benchmarks
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1udq2ac/openmythos_benchmarks/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-23T18:56:48.000Z'
fetched_at: '2026-06-24T01:27:25.847Z'
---
Hey everyone! OpenMythos benchmarks are finally here sorry it took about a week to post these.
 The delay was mainly because SWE-bench results weren't matching up with Qwen 3.6 27B official numbers. Turns out Qwen used a different eval harness and also refined/filtered the benchmark problems, even there prev 3.5 (72.4 in SWE Verified ) version benchmark score is not matching with the numbers published in 3.6 (75 in SWE Verified). 
 https://preview.redd.it/n1hoj90rw29h1.png?width=1351&format=png&auto=webp&s=fb03ba37f908b8b5cc1c170434084dc47cd3ced9
 Anyway, here are the results across SWE-bench Pro, CyberGym, and cybench.
 OpenMythos holds up pretty well for a small cybersecurity-focused model! But it has capability to do better. So, will train it further.
 Also huge thanks to u/giveen for
 GGUF version: https://huggingface.co/jabbatheduck/OpenMythos-GGUF
 Demo: https://huggingface.co/spaces/build-small-hackathon/OpenMythos
 Model: https://huggingface.co/build-small-hackathon/OpenMythos
    submitted by    /u/RealKingNish  
 [link]   [comments]
