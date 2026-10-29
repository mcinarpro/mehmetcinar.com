---
title: I built my own learning tracker in a morning
description: No course fit my life, so I built my own curriculum – and a tracker that keeps me honest.
pubDatetime: 2026-10-29T12:00:00Z
tags: [dev]
draft: false
---

I want to learn electricity from zero. Evening classes or a real training course are not an
option: I do not have much time. But I am interested, so I will move forward at my own pace.

No course fit my life, so I built my own curriculum – and a tracker that keeps me honest:
[learn.mehmetcinar.com](https://learn.mehmetcinar.com).

## A curriculum made to measure

A real LMS takes you through one course from A to Z. I wanted the opposite: a tracker like an
LMS, for a curriculum I put together myself from YouTube videos, PDF courses and more.
It also leaves room for other made-to-measure curricula later.

Claude Code found the sources and proposed the curriculum: 28 courses split into 208 parts, in
five stages. I have not gone through every source yet. I did not have the time, and I wanted to
move forward, so I kept the curriculum it proposed. I will start with the basics, see what works
for me, and adapt it as I go.

## Progress in public

Anyone can see my progress. Only I can tick a part. That is on purpose: learning in public keeps
me accountable and on course. I have no audience yet. I would like to build one, with videos, but
I am not there yet.

## A morning with Claude Code

First commit at 09:35, last one at 12:20. Thirteen commits.

As with this site, I let Claude Code write the code and followed what it did. I knew roughly
where I wanted to go, so I guided it.

## The back end on Cloudflare

When I built sites with Next.js or Vite, I wrote the back end in Hono, and I tended to deploy it
on my VPS. This time it runs on Cloudflare: a Worker serves the app and its API, KV stores my
progress, and every push to `main` deploys. Domain, app, data, deployments – everything stays on
the same platform, and it fits in the free plan.

Discovering that was great.

## On its own subdomain

The tracker has its own repository and its own subdomain. The main site only links to it. The
idea is to stop cluttering the main site every time I want to add a feature.

## What was missing

Two things were missing, and we fixed them:

- Cloudflare's GitHub app only had access to this site's repository, so pushes to the new one did
  not deploy. We gave it access.
- The new subdomain did not resolve on my machine at first: my internet provider's DNS had cached
  the "not found" answer. Waiting was enough.

## One user, one token

There are no accounts. Only I can edit, with a secret edit token. Claude proposed it and I
accepted. When I add another app worth logging into, I will rework everything around a real
authentication system. For now I had no real use for it; I will build it at the right time.

## The stack

- React, Vite and TypeScript, from Cloudflare's template
- Hono for the API
- Cloudflare Workers and KV
- The curriculum in YAML files
- shadcn/ui and Tailwind CSS
- Claude Code
