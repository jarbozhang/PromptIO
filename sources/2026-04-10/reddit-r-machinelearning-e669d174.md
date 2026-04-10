---
title: >-
  [P] PCA before truncation makes non-Matryoshka embeddings compressible:
  results on BGE-M3 [P]
url: >-
  https://www.reddit.com/r/MachineLearning/comments/1sgt7ol/p_pca_before_truncation_makes_nonmatryoshka/
source: Reddit r/MachineLearning
source_type: rss
language: en
published: '2026-04-09T15:40:29.000Z'
fetched_at: '2026-04-10T00:43:27.829Z'
---
Most embedding models are not Matryoshka-trained, so naive dimension truncation tends to destroy them.
 I tested a simple alternative: fit PCA once on a sample of embeddings, rotate vectors into the PCA basis, and then truncate. The idea is that PCA concentrates signal into leading components, so truncation stops being arbitrary.
 On a 10K-vector BGE-M3 sample (1024d), I got:
  
512d: naive truncation 0.707 cosine, PCA-first 0.996
 384d: naive 0.609, PCA-first 0.990
 256d: naive 0.467, PCA-first 0.974
 128d: naive 0.333, PCA-first 0.933
  
I also compared this against other compression approaches on a larger multilingual corpus. A few representative points:
  
scalar int8: 4x compression, 0.9999 cosine, 97.2% Recall@10
 3-bit quantization: 10.6x, 0.978 cosine, 83.8% Recall@10
 PCA-384 + 3-bit quantization: 27.7x, 0.979 cosine, 76.4% Recall@10
 binary quantization: 32x, 0.758 cosine, 66.6% Recall@10
 PQ (M=16, K=256): 256x, 0.810 cosine, 41.4% Recall@10
  
The practical takeaway seems to be:
  
for non-Matryoshka models, naive truncation is usually not usable
 a one-time PCA fit can make truncation viable
 PCA + low-bit quantization fills a useful middle ground between scalar quantization and more aggressive binary/PQ approaches
  
One important limitation: cosine similarity degrades more slowly than Recall@10. In my runs, 27x compression still looked strong on cosine but recall dropped meaningfully. If recall is the priority, a less aggressive setting looked better.
 I’m mainly posting this for feedback on the method and evaluation, especially from people who’ve worked on embedding compression or ANN systems.
 Questions I’d love input on:
  
Is PCA the right baseline here, or is there a stronger linear baseline I should be comparing against?
 For retrieval, which metric would you treat as most decision-relevant here: cosine reconstruction, Recall@10, or something else?
 Have others seen similar behavior on non-Matryoshka embedding models?
  
   submitted by    /u/ah
