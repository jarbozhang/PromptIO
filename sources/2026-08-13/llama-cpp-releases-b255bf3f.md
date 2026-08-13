---
title: 'b10398: common: add system-level config file (#26118)'
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10398'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-12T22:02:27.000Z'
fetched_at: '2026-08-13T11:03:01.118Z'
---
common: Add CLI > ENV > models-presets > INI precedence
CLI flags have the highest precedence
ENV vars have the second-highest precedence
System and User configs have the lowest precedence

Linux/BSD/Mac

/etc/llama.cpp/config.ini < ${XDG_CONFIG_HOME:-~/.config}/llama.cpp/config.ini
Windows

%PROGRAMDATA%\llama.cpp\config.ini < %APPDATA%\llama.cpp\config.ini
fix UB
use common_get_env
ignore_unknown_keys
nits
add docs
Co-authored-by: Xuan Son Nguyen son@huggingface.co
