---
title: >-
  Your Privacy My Cloak: Backdoor Attacks on Differentially Private Federated
  Learning
url: 'https://arxiv.org/abs/2606.17035v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Xiaolin Li
  - Ning Wang
  - Ninghui Li
  - Wenhai Sun
categories:
  - cs.LG
  - cs.CR
  - cs.LG
published: '2026-06-15T17:53:12Z'
fetched_at: '2026-06-16T06:33:00.401Z'
---
Prior research suggests that differential privacy (DP) inherently enhances the robustness of federated learning (FL) against backdoor attacks. In this paper, we challenge this assumption. Through an empirical analysis of two baseline attack strategies, we uncover a fundamental tension in DP-FL: while bypassing DP allows state-of-the-art defenses to detect and filter malicious updates, complying with DP inadvertently masks their distinguishing statistical characteristics. Consequently, existing defenses become ineffective as DP reduces the raw backdoor signal. Building on this masking effect, we propose RING, a novel attack that explicitly exploits DP to conceal malicious contributions while maximizing attack impact. By collaboratively crafting adversarial perturbations, compromised clients reconstruct a strong backdoor signal during aggregation without triggering anomaly detection. RING operates as a perturbation layer that is agnostic to the underlying backdoor technique, making it broadly applicable and composable with existing attacks -- a property that significantly amplifies the threat it poses to DP-FL. Extensive evaluations across four image and text datasets under non-iid distributions show that RING achieves an average attack success rate of 90.3% against six state-of-the-art defenses under a moderate privacy budget, an improvement of up to 26.08x over baseline strategies. Finally, we evaluate potential countermeasures and find that mitigating this threat incurs sign

Authors: Xiaolin Li, Ning Wang, Ninghui Li, Wenhai Sun
Categories: cs.LG, cs.CR, cs.LG
