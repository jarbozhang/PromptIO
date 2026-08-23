---
title: Llama.cpp now has full MCP support!
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v6n33i/llamacpp_now_has_full_mcp_support/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-25T23:18:38.000Z'
fetched_at: '2026-07-26T11:00:55.541Z'
---
After a long and grueling effort spearheaded by ngxson, llama.cpp now fully supports MCP for all protocols. Over-the-web HTTP servers were already supported in the client (since they don't require any sort of plumbing), but stdio servers required real integration. After we modified the `llama-cli` terminal client to use the server instead of a separate model serving route, we could add MCP support to the already-existing native tools server.
 After the merging of https://github.com/ggml-org/llama.cpp/pull/26062, you can now use llama.cpp's WebUI as a full-fledged agentic chat. Configuration for the MCP servers can be provided either in a standard-JSON format config file or completely inline on the command-line for on-demand MCP configurations. Plugging in a dedicated coding MCP server like Serena lets you have a local-model-powered agentic coder without using any other external dependencies.
    submitted by    /u/ilintar  
 [link]   [comments]
