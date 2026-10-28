---
title: I built my personal site in one evening with Claude Code
description: From an empty folder to a live site on its own domain in about three and a half hours. What the AI did, what I did, and where I said no.
pubDatetime: 2026-10-28T06:20:00Z
tags: [dev]
draft: false
---

I wanted something of my own, next to my job: a place to share what I build and what I learn. I
also wanted to test something. How far can AI go on a real project?

So I built this site in one evening with Claude Code. First commit at 20:41, last one at 00:01.
Eighteen commits later, the site was live on mehmetcinar.com.

## How we split the work

Claude edited the files, searched the web and measured the results. I made the decisions, ran
the commands and reviewed every change before it went in.

That split is the point. I stayed in the loop: I understood every step and kept control of my
own project. When the AI does everything, you end up lost in your own code.

## The steps

1. **Start from a theme.** AstroPaper, an open-source blog theme for Astro.
2. **Clean up.** Remove the demo posts and the files I did not need.
3. **Design.** Colours inspired by Vercel: neutral greys and one blue, only for links.
4. **Measure.** The theme promises a Lighthouse score of 100 everywhere. That is true on its home
   page, not on a post. Code comments were hard to read, some links had no name for screen
   readers, and a missing icon caused an error. After the fixes: 100 in accessibility, best
   practices and SEO.
5. **Write.** An About page, a Projects page and my first post.
6. **Deploy.** Cloudflare Workers. Every push to `main` goes live, and every other branch gets its
   own preview URL.

## Where the AI was wrong

To build previews, Claude told me to use `wrangler versions upload`. The Cloudflare dashboard
asked for something else: `wrangler preview`. Cloudflare had launched a new Previews feature a
month earlier.

I asked Claude to check. It searched, found the new documentation and fixed the configuration.
The lesson: an AI's knowledge has a date. When something does not match, make it read the
current docs.

## Where I said no

**The font.** Claude switched the site to Geist, Vercel's typeface. It worked, but I did not like
it. I kept the theme's original font, with the Vercel colours.

**The tooling.** Claude proposed two tools to enforce the format of my commit messages. For a
personal site with one author, that is too much. One line in the agent guide does the job.

AI often over-engineers. So do I, to be honest. The hard part is keeping it simple.

## What it cost

- Domain: $10.46 a year
- Hosting: free, on Cloudflare
- Claude Code: my existing subscription
- Time: one evening

## My verdict

AI is a fast pair programmer, not an autopilot. I let it write the code, never decide what my
site says or how it looks.

## The stack

- Astro 7 with the AstroPaper theme
- Tailwind CSS, with Vercel-inspired colour tokens
- Cloudflare Workers, deployed on every push
- bun
- Claude Code
