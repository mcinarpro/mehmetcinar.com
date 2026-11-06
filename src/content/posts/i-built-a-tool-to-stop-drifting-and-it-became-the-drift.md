---
title: I built a tool to stop drifting – and it became the drift
description: Five projects in parallel, one day, 34 commits – and the moment I saw I was making the same mistake again.
pubDatetime: 2026-11-06T20:00:00Z
tags: [dev]
draft: false
---

I have five projects running in parallel, and I zap from one to the other.

## The tool

So I built a tool to stop it: Undrift, a desktop app to plan the day and work in it.

- The day as time blocks, like Sunsama.
- Each task can open Claude Code in its project's folder, with a first message, in one click.
- A backlog for what waits without a day.

Why not Sunsama or Todoist? When I use other apps, something is always missing: I cannot fit them
into my whole flow. With Sunsama or Todoist, the data is stored with them, and I can do nothing with
it. I already have my data, and I want to put it to work. That is why I wanted a custom app, made
to measure.

## One day, 34 commits

First commit at 08:26, last one at 19:49, on 6 November. Thirty-four commits.

Claude Code wrote the code, one point at a time. I read every commit before it went in.

## The moment I stopped

At the end of the day, I felt I had gone round in circles. Several times now, I have built almost
the same project. So I said stop: I was making the same mistake again.

## What I keep

The template. I really love it: I worked hard on it, and it is a design I like. If tomorrow I
really need to build an app, I can start from it.

I froze it as a showcase: three screens – Today, Focus and Projects – on invented data, and a
back end down to the window.

![Undrift's Today screen: the sprint's tickets on the left, the day's tasks in the middle, the timeline on the right](@/assets/images/undrift-today.png)

![Undrift's Focus screen: a Claude Code session in a terminal, the time left in the block, and the branch's changes](@/assets/images/undrift-focus.png)

## Back to the work

So I went back to Home Sweet Plan, my family organizer, to keep building it and to test it with my
wife.

## The stack

- Tauri v2 and Rust
- React, Vite and TypeScript
- shadcn/ui and Tailwind CSS, in Vercel's Geist design
- dnd-kit for the drag and drop
- SQLite, in the working version
- Claude Code
