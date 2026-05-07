---
title: An Open Benchmark for Testing RAG on Realistic Company-Internal Data
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1t5c5qn/an_open_benchmark_for_testing_rag_on_realistic/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-05-06T12:58:23.000Z'
fetched_at: '2026-05-07T10:33:23.088Z'
---
We built a corpus of 500,000 documents simulating a real company, and then let RAG systems compete to find out which one is the best.
 Introducing EnterpriseRAG-Bench, a benchmark for testing how well RAG systems work on messy, enterprise-scale internal knowledge.
 Most RAG benchmarks are built on public data: Wikipedia, web pages, papers, forums, etc. That’s useful, but it doesn’t really match what a lot of people are building against in practice: Slack threads, email chains, tickets, meeting transcripts, PRs, CRM notes, docs, and wikis.
 So we tried to generate a synthetic company that behaves more like a real one.
 The released dataset simulates a company called Redwood Inference and includes about 500k documents across:
  
Slack
 Gmail
 Linear
 Google Drive
 HubSpot
 Fireflies
 GitHub
 Jira
 Confluence
  
The part we spent the most time on was not just “generate a lot of docs.” It was the methodology for making the docs feel like they belong to the same company.
 At a high level, the generation pipeline works like this:
  
Create the company first We start with a human-in-the-loop process to define the company: what it does, its products, business model, teams, initiatives, market, internal terminology, etc.
 Generate shared scaffolding From there we generate things like high-level initiatives, an employee directory, source-specific folder structures, and agents.md files that describe what documents in each area should look like. For example, GitHub docs in the released corpus are pull requests and review comments, not random GitHub issues.
 Generate high-fidelity project documents We break company initiatives into smaller projects/workstreams. Each project gets a set of related docs across sources: PRDs, Slack discussions, meeting notes, tickets, PRs, customer notes, etc. These documents are generated with awareness of each other, so you get realistic cross-document links and dependencies.
 Generate high-volume documents more cheaply For the bulk of the corpus,
