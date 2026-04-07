---
title: 'Show HN: Travel Hacking Toolkit – Points search and trip planning with AI'
url: 'https://github.com/borski/travel-hacking-toolkit'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-04-04T02:26:42.000Z'
fetched_at: '2026-04-07T02:39:47.354Z'
---
I use points and miles for most of my travel. Every booking comes down to the same decision: use points or pay cash? To answer that, you need award availability across multiple programs, cash prices, your current balances, transfer partner ratios, and the math to compare them. I got tired of doing it manually across a dozen tabs.
This toolkit teaches Claude Code and OpenCode how to do it. 7 skills (markdown files with API docs and curl examples) and 6 MCP servers (real-time tools the AI calls directly).
It searches award flights across 25+ mileage programs (Seats.aero), compares cash prices (Google Flights, Skiplagged, Kiwi.com, Duffel), pulls your loyalty balances (AwardWallet), searches hotels (Trivago, LiteAPI, Airbnb, Booking.com), finds ferry routes across 33 countries, and looks up weird hidden gems near your destination (Atlas Obscura).
Reference data is included: transfer partner ratios for Chase UR, Amex MR, Bilt, Capital One, and Citi TY. Point valuations sourced from TPG, Upgraded Points, OMAAT, and View From The Wing. Alliance membership, sweet spot redemptions, booking windows, hotel chain brand lookups.
5 of the 6 MCP servers need zero API keys. Clone, run setup.sh, start 
searching.
Skills are, as usual, plain markdown. They work in OpenCode and Claude Code automatically (I added a tiny setup script), and they'll work in anything else that supports skills.
PRs welcome! Help me expand the toolkit! :)
https://github.com/borski/travel-hacking-toolkit
Comments URL: https://news.ycombinator.com/item?id=47635033
Points: 95
# Comments: 41
