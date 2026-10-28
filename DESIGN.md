# DESIGN.md

The visual system of mehmetcinar.com, written to be followed by a person or an agent. The source
of truth is `src/styles/theme.css`; this file explains how to use it and what not to do.

The colour language follows Vercel's [Geist](https://vercel.com/geist): an achromatic chrome and
a single blue. The layout and the typeface come from the AstroPaper theme.

## The rule above all others

**The chrome is achromatic; a saturated colour always signals something.** Every grey has a
chroma of 0. Blue marks what you can act on – links, focus, selection – and nothing else. A
new element that adds colour "because it looks nice" breaks the system.

## Tokens

Seven variables in `src/styles/theme.css`, exposed to Tailwind as `bg-*`, `text-*` and
`border-*` through `@theme inline`. Light values sit under `:root, [data-theme="light"]`,
dark values under `[data-theme="dark"]`.

| Token                 | Role                                  | Light                   | Dark                   |
| --------------------- | ------------------------------------- | ----------------------- | ---------------------- |
| `background`          | page                                  | `oklch(1 0 0)`          | `oklch(0.145 0 0)`     |
| `foreground`          | primary text and icons                | `oklch(0.2 0 0)`        | `oklch(0.985 0 0)`     |
| `accent`              | links, focus, selection – the only hue | `oklch(0.55 0.222 259)` | `oklch(0.7 0.222 259)` |
| `accent-foreground`   | text on an accent fill                | `oklch(1 0 0)`          | `oklch(0.145 0 0)`     |
| `muted`               | subtle fill                           | `oklch(0.97 0 0)`       | `oklch(0.24 0 0)`      |
| `muted-foreground`    | secondary text                        | `oklch(0.51 0 0)`       | `oklch(0.76 0 0)`      |
| `border`              | hairlines, dividers                   | `oklch(0.922 0 0)`      | `oklch(0.325 0 0)`     |

`accent-foreground` is dark in the dark theme on purpose: white on the lighter dark-theme blue
falls to about 3:1.

## Contrast

Every text colour meets WCAG AA (4.5:1) on its background, in both themes. Measured values:
text 18–19:1, secondary text 5.7–9.2:1, accent 5.0–6.7:1. Borders are decorative and sit at
1.3–1.6:1.

`bun run lh:check` runs Lighthouse on the pages listed in `lighthouserc.json` after a build, and
CI fails below 100 in Accessibility, Best Practices or SEO. Add a new kind of page to that list
when one appears.

## Typography

- **Google Sans Code** for everything, loaded through Astro's font API (`astro.config.ts`,
  `--font-google-sans-code`, exposed as `font-app`). It is a monospaced face; the site's
  character comes from it.
- The same face feeds the generated Open Graph images (`src/pages/og.png.ts`,
  `src/pages/posts/[...slug]/index.png.ts`), which need its TTF files.
- Italic is real, not synthesised: the italic style is loaded.

## Code blocks

Shiki with `github-light-default` and `github-dark-default`. They are GitHub's accessible
variants: every token reaches 4.5:1. Do not switch to a theme without checking the contrast of
its comments and parameters first – `min-light`, `github-light`, `vitesse-light` and
`vitesse-dark` all fail.

## Lines and decoration

- Underlines and focus outlines are **solid**. No `decoration-dashed`, `decoration-wavy`,
  `outline-dashed` or `border-dashed`.
- The active navigation item is a plain underline, `decoration-2`, `underline-offset-8`.
- Dividers use `border-border`.

## Never

- Never hard-code a colour in a component. Use a token; if none fits, add one to `theme.css`
  for both themes.
- Never add a second accent hue. Blue is the only one.
- Never patch a colour with a manual `dark:` class. If a colour needs a dark-mode exception, the
  wrong token is in use.
- Never add an icon link without an accessible name (`aria-label` or screen-reader text).
