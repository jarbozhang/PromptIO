---
title: b10250
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10250'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-04T02:07:50.000Z'
fetched_at: '2026-08-04T11:02:38.777Z'
---
tests: add model resolution test on synthetic repo listings (#26172)
tests: add model resolution test on synthetic repo listings
Include download.cpp and arg.cpp inside a namespace with hf_cache
Covers the primary, shard, mmproj, sidecar and preset resolution on
tests: keep model resolution checks active and let the handler resolve
Replace assert with a REQUIRE macro alive in Release builds, key the
tests: fix model resolution build on fatal warnings CI and Windows
The namespaced copy of the sources leaves many static functions unused
tests: fix winsock inclusion order for the model resolution test
WIN32_LEAN_AND_MEAN and winsock2.h before windows.h, so http.h does
tests: link cpp-httplib to the model resolution test
The test compiles its own copy of download.cpp, which calls httplib
common_http_client
common: finish the http client wrapper
Add the virtual Head, Get and Post methods and the passthrough
tests: rewrite model resolution on the http client stub
Replace the namespace inclusion of the sources by a plain TU: the
Failures print the named case, the reordering and the actual versus
tests: fix the model resolution on Windows and the builds without TLS
Assert the exact expected paths composed like the cache does instead of
tests: make the model resolution failures self explanatory
Resume the paused log before the failure report so the CI shows why
common: hold the http client factory behind exported functions
The factory was an inline variable, and the Windows shared builds
common: add the http client factory source missed in the previous commit
common: typedef the http client factory callback
Address review from @ngxson
tests: serve the model resolution repos over the loopback
Replace the client stub by a real httplib server bound to the
common: add portable common_get_env and common_set_env helpers
Address review from @ngxson
common: drop the http client factory left without a caller
The loopback server made the stub substitution unnecessary, the client
commo
