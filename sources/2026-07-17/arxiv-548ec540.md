---
title: Screening of Biosecurity Features in Metagenomic Data with Evo 2 Probes
url: 'https://arxiv.org/abs/2607.14070v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jeremy Guntoro
  - Alexander Dack
  - Dylan Danno
  - Michaela Jančovičová
  - Križan Jurinović
categories:
  - q-bio.GN
  - cs.LG
  - q-bio.GN
published: '2026-07-15T17:38:02Z'
fetched_at: '2026-07-16T23:02:09.820Z'
---
Genomic foundation models such as Evo 2 learn rich sequence representations, but their value for biosecurity screening is largely unexplored. We ask how much biosecurity-relevant signal is linearly accessible in these representations by training minimal linear and attention probes on frozen Evo 2 layer-26 activations, without fine-tuning the underlying model. Across held-out metagenomic test sets, the probes detect antimicrobial resistance (AMR) with strong discrimination: a linear probe reaches a region-level ROC-AUC of 0.888 (mean-pool), rising to 0.977 with a single-head attention probe. The probes resolve finer-grained AMR drug-class subcategories and separate them from unrelated functional genes, providing additional evidence that the learned signal is not explained solely by generic functional-gene status. Bacterial virulence is also decodable, though more weakly (region-level ROC-AUC 0.833). The AMR probe retains comparable ranking performance on simulated short reads without retraining, enabling evaluation before assembly in settings where assembly is computationally costly or unreliable. It achieves a read-level ROC-AUC of 0.898 (mean-pool), comparable to the mean-pooled full-region result. Within SynGenome, AMR-associated prompt labels are only weakly recoverable from Evo 1.5-generated sequences; these prompt-derived labels do not establish the function of the generated response sequences. A complementary sparse-autoencoder analysis recovers interpretable resistance

Authors: Jeremy Guntoro, Alexander Dack, Dylan Danno, Michaela Jančovičová, Križan Jurinović
Categories: q-bio.GN, cs.LG, q-bio.GN
