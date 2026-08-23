---
title: We trained a cybersecurity-focused Mythos like LLM open weights on HuggingFace
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u6qw5b/we_trained_a_cybersecurityfocused_mythos_like_llm/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-15T19:36:11.000Z'
fetched_at: '2026-06-16T06:31:40.322Z'
---
We built OpenMythos for the Build Small Hackathon an open-source LLM trained specifically for cybersecurity tasks. Wanted to share our training approach since the RLVR setup was non-trivial and might be interesting to people doing similar domain-specific fine-tuning.
 The problem General-purpose LLMs are surprisingly bad at security. They hallucinate CVE details, miss real vulnerability patterns in code, and sound confident while being wrong in ways that matter. We wanted something that actually had security domain depth baked in.
 Data
  
Scraped 10K ArXiv cs.CR papers → filtered to ~1.84K high-quality records focused on coding vulnerabilities
 Structured CVE dataset with real affected code and remediation context
 Both open on Hugging Face (all links at end of this post)
  
Training pipeline
 Stage 1 - SFT Standard supervised fine-tuning on cybersecurity tasks: vulnerability identification, CVE explanation, code review for security issues, mitigation strategies. 
 Stage 2 - RLVR This is where it got interesting. SFT teaches the model to imitate good responses, but doesn't make it verify its own outputs. For security that gap is dangerous.
 We built a reward setup using GitHub repos with paired vulnerable/fixed branches. A verifier model checks each generated response against ground truth did it identify the right vulnerability? Is the fix actually correct? The reward signal flows from there.
 Post-RLVR the model got noticeably more precise. Less conflation of similar vuln classes, better calibration on uncertainty.
 Links
  
🤖 Demo: https://huggingface.co/spaces/build-small-hackathon/OpenMythos
 🧠 Model: https://huggingface.co/build-small-hackathon/OpenMythos
 📦 CVE Dataset: https://huggingface.co/datasets/build-small-hackathon/CVE_Vulnerailities_Detailed
 📄 ArXiv Filtered: https://huggingface.co/datasets/himanshu17HF/ArvixImport-Filtered-Final
  
Happy to go into detail on the RLVR setup or the filtering pipeline if anyone's curious. We're also looking for fe
