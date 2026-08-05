---
title: >-
  AGI Safety and Alignment at Google DeepMind: A Summary of Recent Work (July
  2026)
url: >-
  https://www.alignmentforum.org/posts/ZTdRtSWaw7JgqEtfa/agi-safety-and-alignment-at-google-deepmind-a-summary-of-1
source: Alignment Forum
source_type: rss
language: en
published: '2026-07-31T15:57:59.000Z'
fetched_at: '2026-08-05T11:02:01.195Z'
---
Cross-posted from our new Substack
It’s been nearly two years since our last major update here in August 2024 and we wanted to share another recap of our recent work with the AGI safety community. Things have changed a lot since then. We are now fully in the midgame, and focus more on landing things in production.
Who are we?
We are the AGI Safety and Alignment Team (ASAT), the main group at Google DeepMind working directly on technical approaches to existential risk from AI systems. Last year we published An Approach to Technical AGI Safety and Security, which remains the best place to read our overarching vision.
Highlights
Norms around chain of thought. Our impression is that our work meaningfully moved the field away from beliefs along the lines of “chain of thought is often unfaithful and so not worth using” towards beliefs along the lines of “chain of thought is a very useful tool that is worth preserving”, leading to a tentative industry consensus on its importance. We have also published substantial technical research that enables companies to preserve chain of thought transparency for longer than would have happened by default. 
We think this is a big deal: extending the period where model reasoning is relatively transparent enables better science on more powerful AI systems, better model forensics on future warning shots, and stronger bootstrapping of control monitors.
Frontier Safety. We substantially strengthened the Frontier Safety Framework (FSF), and were the first company to introduce a section on misalignment in such a framework. The scope of Frontier Safety has grown a lot over the past two years, and is now a cross-functional effort including many teams across Google. We believe the FSF played a key role in maintaining Google’s situational awareness around severe risks, and particularly around starting to develop mitigations well in advance of when they would be needed. For example, this was particularly useful for landing probes, which are quite 
