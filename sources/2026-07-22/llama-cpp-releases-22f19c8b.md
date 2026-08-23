---
title: b10078
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10078'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-21T22:40:57.000Z'
fetched_at: '2026-07-22T11:02:21.613Z'
---
vulkan: Refactor vk_queue to use per-instance mutexes and unique handles (#23570)
Refactor vk_queue to use per-instance mutexes and unique handles
integrates VK_KHR_internally_synchronized_queues, abstracting the queue submission into a polymorphic interface that completely bypasses host-side mutex locking when driver-side synchronization is supported
fix compilation error
fix duplicate pNext chain for VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR
add fallback defines for VK_KHR_internally_synchronized_queues
add null checks for queues in vk_device_struct destructor
use unique_ptr for outer queues to enforce exclusive ownership and optimize lifetime
use static constexpr for eInternallySynchronizedKHR
add lock guard to ggml_vk_create_aliased_queue for thread safety
initialize sync_query_features.internallySynchronizedQueues to VK_FALSE
reuse sync_query_features for internallySynchronizedQueues and simplify chaining
refactor internallySynchronizedQueues detection
fix internallySynchronizedQueues query guard
use eInternallySynchronizedKHR constant
fix self-referential alias for eInternallySynchronizedKHR
use macro for eInternallySynchronizedKHR fallback
fix internallySynchronizedQueues query timing in ggml-vulkan.cpp to prevent device creation mismatch
reset sync_query_features.pNext before reusing in device creation chain, also removed the redundant second probe call
refactor internally synchronized queues detection to use chained feature query and avoid redundant API calls
Update ggml/src/ggml-vulkan/ggml-vulkan.cpp
Co-authored-by: Jeff Bolz jbolz@nvidia.com
Update ggml/src/ggml-vulkan/ggml-vulkan.cpp
Co-authored-by: Jeff Bolz jbolz@nvidia.com
Update ggml/src/ggml-vulkan/ggml-vulkan.cpp
Co-authored-by: Jeff Bolz jbolz@nvidia.com
Update ggml/src/ggml-vulkan/ggml-vulkan.cpp
Co-authored-by: Jeff Bolz jbolz@nvidia.com
Update ggml/src/ggml-vulkan/ggml-vulkan.cpp
Co-authored-by: Jeff Bolz jbolz@nvidia.com
Update ggml/src/ggml-vulkan/ggml-vulkan.cpp
Co-authored-by
