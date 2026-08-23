---
title: GDM AI Control Roadmap
url: 'https://www.alignmentforum.org/posts/hEtkyKGoPpFeWnKkX/gdm-ai-control-roadmap'
source: Alignment Forum
source_type: rss
language: en
published: '2026-06-18T16:50:59.000Z'
fetched_at: '2026-06-19T14:35:51.353Z'
---
GDM has published an AI Control Roadmap! From the executive summary:

We present the GDM AI Control Roadmap (v0.1) – our plan for implementing and adopting internal guardrails designed to catch potential adversarial behaviour by AI agents, even as they become increasingly harder to oversee and contain.
We focus on system-level mitigations that limit the harm a misaligned AI system could cause. Specifically, this report provides:
• Threat modelling: Taking inspiration from cybersecurity, we adopt a conservative, worst-case approach to threat modelling throughout this paper, and assume a hypothetical AI adversary pursuing undesirable goals in internal deployment. We introduce TRAIT&R, a taxonomy of tactics and techniques available to such a hypothetical AI adversary, building on the established security framework MITRE ATT&CK. We categorise new hypothetical threats into three core areas: loss of control (e.g., rogue internal deployments), work sabotage (e.g., intentionally flawed alignment and safety research), and direct harm (e.g., critical asset destruction or exfiltration).
• Control invariants: We establish two defensive invariants that we aim to maintain, even as the hypothetical AI adversary becomes increasingly capable: i) reliable detection of misaligned intent or actions, and ii) effective prevention and response to attack attempts. For control to serve as an effective line of defence, our ability to detect and prevent attacks should exceed AI agents’ ability to evade detection and execute attacks.
• Capability-based mitigation ladders: Because controlling more capable models requires increasingly costly interventions, we link specific defensive measures to evolving model capabilities (such as the ability to reason opaquely or execute complex cyberattacks). As models get more powerful, our defences should escalate accordingly. We outline four Detection tiers (D1–D4) and three Prevention and Response tiers (R1–R3).
• A portfolio of practical defences: We sugg
