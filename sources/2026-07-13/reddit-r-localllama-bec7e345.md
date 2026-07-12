---
title: Qwenthropic
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1uu3545/qwenthropic/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-12T02:40:01.000Z'
fetched_at: '2026-07-12T23:01:41.977Z'
---
Hey guys,
 I've been running Qwen 3.6-27b locally on an RTX 3090 for a while now, and it's been genuinely great at solving software issues. However, life happened and I recently had to use Opus 4.8 alongside the Zed editor and the Claude Code agent.
 While I can definitely see a noticeable jump in pure code quality (Opus is just better in that regard), what really blew me away was the procedure. When assigned a task, the Claude Code agent divides it into actionable steps, always checks the context before acting, makes backups, and runs multiple verifications to ensure the changes didn't break the system. On top of that, it runs additional functionality evaluations, warning you about potential bugs, performance bottlenecks, or race conditions.
 Honestly, this feels less like a raw model capability and more like an incredibly well-crafted system prompt and agent logic.
 So, I have two questions for this sub:
 1) Prompt Engineering for Agentic Behavior: How can I structure a system prompt (or workflow) to make my local Qwen replicate this kind of deep analytical, methodical, and "safe" behavior? Does anyone have examples of system prompts that enforce this step-by-step verification?
 2) Local Coding Agents/Frameworks: What agent or framework do you recommend for complex coding tasks? I currently use Zed and I'm very happy with its raw performance, but it lacks the ability to use sub-agents or plan complex, multi-step tasks. For context, my daily driver is Debian + KDE.
 Thanks in advance!
    submitted by    /u/Careful-Crow9831  
 [link]   [comments]
