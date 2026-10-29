# Side apps live on their own subdomain, in their own repo

An app that is not the Site itself – a tool, a tracker, a test of some technology – gets its
own repository named after its address (`learn.mehmetcinar.com`), its own Cloudflare Worker, and
its own subdomain of mehmetcinar.com. The Site only links to it, from the Projects page and from
the Posts that talk about it. This repo never takes an app's code, dependencies or design.

Each side app follows the same setup, so starting one is routine:

- the domain is declared in the app's wrangler config as a `custom_domain` route, so the first
  deploy creates the DNS record – no dashboard step for the name;
- Workers Builds deploys `main` on every push; other branches get preview URLs;
- the repo has its own `AGENTS.md` and, when it has a domain language, its own `GLOSSARY.md`;
- an app that should feel part of the Site copies its tokens and typeface rather than sharing
  a package;
- the light/dark choice is a `theme` cookie on `.mehmetcinar.com` – `light`, `dark` or
  `system` (no cookie means `system`) – which every app reads before rendering and writes only
  when the reader picks an option in its footer switcher, so one choice applies everywhere.

A template or a script for this setup comes with the second app, not before.

## Considered Options

- **A section of this repo** (`/learning/` and so on): one deploy, but every app brings its
  dependencies, build steps and runtime code into a static blog, and removing an app later
  means untangling it.
- **A path on the Site routed to another Worker** (`mehmetcinar.com/learning/*`): the same
  address space, but the app must be built for a base path and the routing has to win over the
  Site's own domain – more fragile than a subdomain for no gain a reader would notice.
