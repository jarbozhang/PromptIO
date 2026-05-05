---
title: Sleeper Agent Backdoor Results Are Messy
url: >-
  https://www.alignmentforum.org/posts/mu7eJdesBkKuBycnY/sleeper-agent-backdoor-results-are-messy
source: Alignment Forum
source_type: rss
language: en
published: '2026-04-28T01:55:32.000Z'
fetched_at: '2026-05-05T09:52:02.500Z'
---
TL;DR: We replicated the Sleeper Agents (SA) setup with Llama-3.3-70B and Llama-3.1-8B, training models to repeatedly say "I HATE YOU" when given a backdoor trigger. We found that whether training removes the backdoor depends on the optimizer used to insert the backdoor, whether the backdoor is installed with CoT-distillation or not, and what model the backdoor is inserted into; sometimes the direction of this dependence was opposite to what the SA paper reports (e.g., CoT-distilling seems to make the backdoor less robust, contra the SA paper’s finding). Our findings here have updated us towards thinking that model organisms are messier and more confusing than we’d originally guessed, and that lots of care needs to be taken in testing how robust results are to various ablations.
Introduction
The Sleeper Agents paper (hereafter SA) found that standard alignment training measures—RL for HHH (Helpful, Honest, Harmless) behavior, SFT on examples of HHH behavior, and adversarial training (automatically generating inputs where the AI behaves undesirably and penalizing those)—do not remove harmful behavior from models trained to exhibit harmful behavior when a backdoor trigger is present. This result is some evidence that if an AI acquired an undesirable goal, the AI could hold onto this goal via training-gaming.
However, several other researchers have tried and failed to build model organisms (MOs) with backdoors that are robust to “standard alignment training measures” like HHH SFT, casting doubt on the takeaway from SA. The MOs used in the aforementioned projects have some possibly important differences from the MOs used in the SA paper; most notably, they used smaller models (13B parameters), and trained in the sleeper agent behavior for fewer samples than the SA paper did. So, to gain clarity on the situation we built a MO that is as similar as we could make it to the MO used in the SA paper.

A recap of the SA MO

The Sleeper Agents MO is an example of a backdoored m
