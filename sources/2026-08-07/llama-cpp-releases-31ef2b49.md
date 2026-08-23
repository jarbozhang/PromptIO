---
title: b10289
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10289'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-05T20:09:39.000Z'
fetched_at: '2026-08-07T11:01:31.032Z'
---
server: harden the file_glob_search directory walk (#26626)
server: don't walk Windows junctions in file_glob_search
std::filesystem reports a junction as a plain directory, so the symlink
read the reparse tag and treat a symlink and a mount point as links,
look junk directory names up case insensitively on Windows, where NTFS
test that a junk directory stays selectable while its contents stay out
server: report a directory the walk could not read
a directory that fails to open or to iterate was skipped in silence, so
skip_permission_denied never reaches this path, so an error here is an
server: simplify the file_glob_search listing plumbing
return a small result struct instead of two out params and a caller path
scope the error code to the directory being read, act on the status code
check the deadline when a directory is popped, not only per entry, so a
read the path parameter once, and reject an invalid limit the way an
normalize the resolved path, so a "." or ".." a caller typed reaches
ui: expire cached picker searches
the cache grew for the lifetime of the component: entries went stale
drop expired entries when a new result is stored
server: address review from @ngxson
trim comments to one line each, and drop two that restate the code
rename junk_lookup_name to get_effective_name, and move it and the link
merge the Windows and Linux link checks into one is_link, so symlinks are
server: convert tool paths as UTF-8 on Windows
a narrow path uses the active code page there, so a file name came back
convert explicitly at every crossing between a std::string, which always
read the home directory through the wide environment, since the narrow
the walker no longer normalizes separators by hand, since paths now come
server: fold the platform branch inside console_output_to_utf8
match the shape of the other helpers, one definition with the #if inside,
inline the single caller helper and trim the comment
Website:
https://llama.app
macOS/iOS:
macOS Apple Silicon (arm64)
m
