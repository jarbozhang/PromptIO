---
title: >-
  NVIDIA H200 Disassembly & Liquid-Cooling Installation with EK-Pro H200 NVL
  Water Block
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uy0k62/nvidia_h200_disassembly_liquidcooling/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-16T11:48:36.000Z'
fetched_at: '2026-07-16T23:01:10.319Z'
---
This is a full teardown video of the NVIDIA H200 NVL and installation of an EK-Pro H200 NVL Water Block, covering the disassembly, prep and mount process, including:
  
PCB separation from the stock cooler using Torx T6, T9, and T10 drivers plus a plastic spudger
 Complete removal of factory thermal pads and paste using denatured alcohol and a non-abrasive cloth, working from the center of the PCB outward
 Cutting and placing new thermal pads across the VRM, inductor, and backplate chip zones, then applying a thin, even layer of thermal compound to the die
 Aligning the PCB to the water block with light, even pressure
 Securing the retention bracket with the four original screws in a criss-cross pattern
 Reassembling the backplate with seven M2.5x6 and four M2.5x10 screws
  
Once assembled, it undergoes a 24-hour leak test with the pump powered independently, allowing for leak detection with no risk to the PCB, before stress testing the GPU under load to ensure maximum sustained performance.
 We currently deploy up to 8x H200 GPUs custom liquid-cooled, in the LM TEK RM-4U8G server rack.
 In testing, a fully populated 8x H200 liquid-cooled server rack draws around 6,800–7,000W under sustained load including CPU and cooling solution. Stress-tested at 30°C ambient, it holds GPU package temps at 76–81°C under full load across all 8 GPUs, with the platform rated up to 35°C ambient.
    submitted by    /u/EKbyLMTEK  
 [link]   [comments]
