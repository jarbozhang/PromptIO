---
title: b10271
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10271'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-04T18:56:37.000Z'
fetched_at: '2026-08-05T11:02:22.093Z'
---
ui: CWD for agent (#26518)
server : extend file_glob_search for UI pickers
ui : add per-conversation working directory with picker
ui : add path navigation and search scope to cwd picker
Treat path-like queries (starting with / or ~) as directory navigation
Assisted-by: Claude
db : persist per-call tool cwd on tool result messages
ui : abbreviate tool paths under home with a tilde
ui : show the per-call cwd on exec shell rows
ui : clarify the synthetic cwd message for the model
ui : reuse the trailing cwd row on a repeated pick
ui : don't jump when a cwd row is injected mid-chat
chore: Formatting
refactor: Cleanup comments
ui : unify working directory naming and add a synthetic-message flag
ui : render synthetic cwd rows without a scroll jump
ui : decouple the working directory picker into utils and sub-components
ui : add get_info tool call block
chore: Formatting
refactor: Cleanup
refactor: Cleanup
refactor: Cleanup
fix: UI
server : harden file_glob_search listing (kind enum, timeout, symlink guard, absolute base)
ui : use persisted isSynthetic flag for cwd rows, drop legacy formats
ui : cache picker search, fail visibly on native resolve
ui : escape glob metacharacters in picker search glob
ui : simplify auto-scroll pin
chore: Format
fix: Use SvelteMap
refactor: Post-review fixes
ui: accept Windows roots in the working directory picker
recognize a drive root (C:) and a UNC share (//host/share) as path
split below the root, so a bare drive resolves to its root rather than
rewrite backslashes into forward slashes only when the query carries a
paths keep travelling with forward slashes, which is what the server
Co-authored-by: Pascal admin@serveurperso.com
Website:
https://llama.app
macOS/iOS:
macOS Apple Silicon (arm64)
macOS Apple Silicon (arm64, KleidiAI enabled) DISABLED
macOS Intel (x64)
iOS XCFramework
Linux:
Ubuntu x64 (CPU)
Ubuntu arm64 (CPU)
Ubuntu s390x (CPU)
Ubuntu x64 (Vulkan)
Ubuntu arm64 (Vulkan)
Ubuntu x64 (ROCm 7.2)
Ubuntu x64 (OpenVINO)
Ubuntu x64 (
