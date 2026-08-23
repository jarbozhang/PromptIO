---
title: 'PSA: DO NOT use Intel consumer platforms for multi-GPU setups'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v5x1h0/psa_do_not_use_intel_consumer_platforms_for/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-25T03:35:29.000Z'
fetched_at: '2026-07-25T11:01:40.185Z'
---
Since a lot more people are trying to build their own multi-GPU machines, I thought I should help to prevent a common mistake people make with building multi-GPU machines. Which is using an Intel consumer platform like Z890 for multi-GPU setups.
 Although the CPU provides 24 PCIe 5.0 lanes with 16x available to bifurcate to 8x8x on two PCIe x16 slots on the higher end boards, this is completely useless for AI inference/training workloads that require P2P between the GPUs.
 In my testing I used an Intel Core Ultra 7 270K Plus on an Asus Z890 Apex motherboard on the latest BIOS 3202 which is usually just my overclocking testbench system. I initially wanted to compare and see if a faster single-core more gaming-optimized CPU would help with GPU inference performance compared to the slow single-core performance on my Epyc based servers. As I am trying to optimize the throughput of the GPUs that I do have for my inference service considering everything has gone up in price even more. 
 Unfortunately it seems like if I wanted faster single-core performance of the desktop Intel CPUs I might need to try a PCIe switch board to attach the GPUs, especially since on Intel platforms you are also artifically limited to only 8x4x4x bifurcation on the main PCIe slot anyways.
 What I found is that there seems to be some sort of hardware/firmware limitation that prevents PCIe P2P to work correctly under the PCIe root complex of Arrow Lake CPUs.
 As seen in this issue where it does not even seem to correctly allow data packets between PCIe devices: https://github.com/NVIDIA/open-gpu-kernel-modules/issues/1253
 It not only does not work right but it also actually reduces bandwidth in half even if it worked:
 [P2P (Peer-to-Peer) GPU Bandwidth Latency Test] Device: 0, NVIDIA RTX A6000, pciBusID: 2, pciDeviceID: 0, pciDomainID:0 Device: 1, NVIDIA RTX A6000, pciBusID: 3, pciDeviceID: 0, pciDomainID:0 Device=0 CAN Access Peer Device=1 Device=1 CAN Access Peer Device=0 ***NOTE: In case a dev
