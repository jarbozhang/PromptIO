---
title: b9174
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9174'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-16T02:23:28.000Z'
fetched_at: '2026-05-16T14:12:21.056Z'
---
ui: Restructure repo to use tools/ui folder and ui / UI / llama-ui / LLAMA_UI naming (#23064)
webui: Move static build output from tools/server/public to build/ui directory
refactor: Move to tools/ui
refactor: rename CMake variables and preprocessor defines
Rename LLAMA_BUILD_WEBUI -> LLAMA_BUILD_UI (old kept as deprecated)
Rename LLAMA_USE_PREBUILT_WEBUI -> LLAMA_USE_PREBUILT_UI (old kept as deprecated)
Backward compat: old vars auto-forward to new ones with DEPRECATION warning
Rename internal vars: WEBUI_SOURCE -> UI_SOURCE, WEBUI_SOURCE_DIR -> UI_SOURCE_DIR, etc.
Rename HF bucket: LLAMA_WEBUI_HF_BUCKET -> LLAMA_UI_HF_BUCKET
Emit both LLAMA_BUILD_WEBUI and LLAMA_BUILD_UI preprocessor defines
Emit both LLAMA_WEBUI_DEFAULT_ENABLED and LLAMA_UI_DEFAULT_ENABLED
refactor: rename CLI flags (--webui -> --ui) with backward compat
Add --ui/--no-ui (old --webui/--no-webui kept as deprecated aliases)
Add --ui-config (old --webui-config kept as deprecated alias)
Add --ui-config-file (old --webui-config-file kept as deprecated alias)
Add --ui-mcp-proxy/--no-ui-mcp-proxy (old --webui-mcp-proxy kept as deprecated)
Add new env vars: LLAMA_ARG_UI, LLAMA_ARG_UI_CONFIG, LLAMA_ARG_UI_CONFIG_FILE, LLAMA_ARG_UI_MCP_PROXY
C++ struct fields: params.ui, params.ui_config_json, params.ui_mcp_proxy added alongside old fields
Backward compat: old fields synced to new ones in g_params_to_internals
refactor: update C++ server internals with backward compat
Rename json_webui_settings -> json_ui_settings (both kept in server_context_meta)
Rename params.webui usage -> params.ui (both synced, old still works)
JSON API emits both "ui"/"ui_settings" and "webui"/"webui_settings" keys
Server routes use params.ui_mcp_proxy || params.webui_mcp_proxy
Preprocessor guards use #if defined(LLAMA_BUILD_UI) || defined(LLAMA_BUILD_WEBUI)
refactor: rename CI/CD workflows, artifacts, and build script
Rename webui-build.yml -> ui-build.yml; artifact webui-build -> ui-build
Rename webui-publish.yml -> ui-publish.yml
