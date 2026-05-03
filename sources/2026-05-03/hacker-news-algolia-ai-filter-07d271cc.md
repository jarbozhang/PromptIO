---
title: 'Show HN: Mljar Studio – local AI data analyst that saves analysis as notebooks'
url: 'https://mljar.com/'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-05-02T10:21:31.000Z'
fetched_at: '2026-05-03T12:56:06.233Z'
---
Hi HN,
I’ve been working on mljar-supervised (open-source AutoML for tabular data) for a few years. Recently I built a desktop app around it called MLJAR Studio.
The idea is simple: you talk to your data in natural language, the AI generates Python code, executes it locally, and the whole conversation becomes a reproducible notebook (*.ipynb file). So instead of just chatting with data, you end up with something you can inspect, modify, and rerun.
What MLJAR Studio does:
- Sets up a local Python environment automatically, runs on Mac, Windows, and Linux
- Installs missing packages during the conversation
- Built-in AutoML for tabular data (classification, regression, multiclass)
- Works with standard Python libraries (pandas, matplotlib, etc.)
- Works with any data file: CSV, Excel, Stata, Parquet ...
- Connects to PostgreSQL, MySQL, SQL Server, Snowflake, Databricks, and Supabase.
For AI: use Ollama locally (zero data egress), bring your own OpenAI key, or use MLJAR AI add-on.
I built this because I wanted something between Jupyter Notebook (flexible but manual) and AI tools that generate code but don’t preserve the workflow. Most tools I tried either hide too much or don’t give reproducible results and are cloud based
Demos:
- 60-second demo: https://youtu.be/BjxpZYRiY4c
- Full 3-minute analysis: https://youtu.be/1DHMMxaNJxI
Pricing is $199 one-time, with a 7-day trial.
Curious if this is useful for others doing real data work, or if I’m solving my own problem here.
Happy to answer questions.
Comments URL: https://news.ycombinator.com/item?id=47985077
Points: 65
# Comments: 10
