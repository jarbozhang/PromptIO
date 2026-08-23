---
title: NASA testing local LLM inference for future space missions
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uisspl/nasa_testing_local_llm_inference_for_future_space/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-29T13:39:06.000Z'
fetched_at: '2026-06-29T23:01:34.482Z'
---
Red Hat published a blog post last week about an initiative I supported with NASA researchers at Johnson Space Center building a medical AI assistant. It's called the Crew Medical Officer Digital Assistant (CMO-DA) and the system runs LLMs and other models on local hardware with zero cloud dependency, and they're using llama.cpp through RamaLama to manage inference.
 Astronauts on Moon or Mars missions can't call a doctor in real time. Light delay and communication blackouts make Earth-based telehealth... impractical. So NASA wants an onboard system that can help crew members diagnose and treat medical symptoms using AI with RAG on spaceflight medical literature.
 RamaLama is just an open source CLI tool (backed by Red Hat) that wraps llama.cpp and other inference engines (MLX, vLLM, more). You'd pull and run models the same way you pull and run container images, with auto GPU detection & passthrough. The project treats AI models as portable artifacts rather than bespoke installs, which really matters when you need reproducible and cryptographically verifiable deployments on edge or space hardware you can't reach.
 The CMO-DA started as a cloud-connected proof of concept, then the team moved it to a disconnected edge deployment running on HPE hardware. They're testing on the terrestrial twin of the HPE Spaceborne Computer that's aboard the ISS right now.
 NASA picked a local-first architecture because they didn't really have another option. The models need to run on whatever compute fits inside a spacecraft, and the outputs need to be reliable enough for medical decisions.
 I found this to be one of the most compelling use cases to help support that local and open LLMs are the future. Hope y'all do as well!
 RamaLama repo: https://github.com/containers/ramalama
    submitted by    /u/Careless-Car_  
 [link]   [comments]
