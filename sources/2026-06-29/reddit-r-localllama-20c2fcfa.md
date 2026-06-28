---
title: Script to monitor llama cpp and analyze memory usage
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ui0u4v/script_to_monitor_llama_cpp_and_analyze_memory/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-28T15:53:47.000Z'
fetched_at: '2026-06-28T23:00:58.435Z'
---
My goal has always been to be productive with commodity hardware. So far my workhorses have been the MoE editions of gemma 4 and Qwen 3.6 on an old desktop with a single 9060XT with 16GB ram.
 The problem has always been that every source is vague about Vram/ram requirements. Models are trained at 16 bits, many guides suggest the fast but obviously gimped Q4, while most peopel tend to get good results at Q6 or Q8. but this makes ram requirements hard to predict. So I decided to build a script that parses the verbose output of llama cpp and gives an easy to review summary.
 You can see the output on the attached image. It reads all buffer allocations, groups them by function and backend, and provides useful sums to help you realize what is going on in your setup and plan accordingly.
 I also get a few easy to groc stats that everyone should appreciate like t/s or MTP performance.
 Below is the actual script. It expects linux, and that your llama cpp command sits in a script called run.sh that includes the -v flag for verbose output.
 The script was vibe coded with chatgpt and probably still need some work to help with more graceful shutdown.
 I hope you guys find it useful
 #!/usr/bin/env bash set -euo pipefail RUN_SCRIPT="${RUN_SCRIPT:-./run.sh}" LOG_FILE="${LOG_FILE:-/tmp/llama-run.log}" MEM_FILE="${MEM_FILE:-/tmp/llama-mem.tsv}" STAT_FILE="${STAT_FILE:-/tmp/llama-stats.tsv}" INFO_FILE="${INFO_FILE:-/tmp/llama-info.tsv}" INTERVAL="${INTERVAL:-2}" : > "$LOG_FILE" : > "$MEM_FILE" : > "$STAT_FILE" : > "$INFO_FILE" parse_buffer_line() { sed -nE 's/.* ([A-Za-z0-9_]+)[[:space:]]+([A-Za-z]+) buffer size =[[:space:]]*([0-9.]+) MiB.*/\1:\2\t\3/p' } parse_info_line() { awk ' /llama_model_loader:/ && /general.name/ { line=$0 sub(/.*general.name[[:space:]]+str[[:space:]]*=[[:space:]]*/, "", line) if (line != "") print "model_name\t" line } /llm_load_print_meta:/ && /model ftype/ { line=$0 sub(/.*model ftype[[:space:]]*=[[:space:]]*/, "", line) if (line != "") print "model_quan
