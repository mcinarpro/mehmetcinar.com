# mehmetcinar.com – instructions for agents

Mehmet Cinar's personal Site: Posts in English about learning electricity from zero on his own
house, and about development tooling. A static Astro 7 site built on the AstroPaper theme, with
bun.

## Start here

1. `GLOSSARY.md`: the Site's language. Use its terms in code, content, issues and commits.
2. `docs/adr/`: the decisions and their reasons.
3. `DESIGN.md`: the visual system. Read it before any change to a page, a component or a style.

## Map

| Path                     | What it is                                                 |
| ------------------------ | ---------------------------------------------------------- |
| `astro-paper.config.ts`  | Site identity, features, socials, share links              |
| `src/content/posts/`     | Posts, in Markdown or MDX                                  |
| `src/content/pages/`     | Standalone pages rendered from Markdown (About)            |
| `src/styles/theme.css`   | Colour tokens for both themes                              |
| `src/pages/`             | Routes, including RSS, OG images and search                |
| `astro.config.ts`        | Markdown pipeline, code themes, fonts                      |

## Commands

```bash
bun install
bun run dev            # http://localhost:4321
bun run build          # astro check, astro build, Pagefind index
bun run lint
bun run format:check   # bun run format to fix
```

Agents start the dev server in background mode – `astro dev --background` – and manage it with
`astro dev stop`, `astro dev status` and `astro dev logs`.

## Rules

- **Everything written in the repo is in English**: content, code, comments, commit messages.
- **The repo describes the present only.** No reference to past setups, previous domains or
  deleted projects; a reader a year from now would not know what they are.
- **bun is the package manager.** Never add another lockfile.
- **Every UI change follows `DESIGN.md`.** Styles come from the tokens in
  `src/styles/theme.css`; never hard-code a colour in a component. A change that touches a
  colour or a Post layout keeps Lighthouse at 100 in Accessibility, Best Practices and SEO on a
  Post page.
- **Commits follow Conventional Commits** (`feat:`, `fix:`, `style:`, `docs:`, `chore:`).
  Agents propose the message; Mehmet commits and pushes. Never commit or push unasked.
- **`main` is production.** Work in progress lives on a branch.

## Writing Posts – the interview method

Mehmet is the author of every Post. An agent never writes a Post from nothing and never invents a
fact, an experience, a measurement or an opinion.

1. Mehmet dictates a few raw lines, in English or French.
2. The agent interviews him: one round of numbered questions at a time, until the Post's story,
   facts and opinion are all his.
3. The agent assembles his answers into an English Draft, keeping his own words where it can.
   Anything still missing is marked `TODO(Mehmet): …`, never filled in.
4. Mehmet reads the Draft aloud and corrects it. He decides when it is published.

A new Post is a Draft until Mehmet says otherwise:

```yaml
---
title: …
description: …          # one sentence, used in lists, RSS and search engines
pubDatetime: 2026-01-01T09:00:00Z
tags: [electricity]     # electricity, dev
draft: true
---
```

An electricity Post tells what Mehmet did and learned; it is not a how-to. Agents add no
technical advice he did not give, and flag any statement that looks unsafe.

## Astro documentation

Full documentation: https://docs.astro.build. Read the relevant guide before working on:

- [routing, pages, middleware](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [content collections](https://docs.astro.build/en/guides/content-collections/)
- [styling and Tailwind](https://docs.astro.build/en/guides/styling/)
