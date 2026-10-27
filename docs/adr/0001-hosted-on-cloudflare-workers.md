# The Site is hosted on Cloudflare Workers

The Site is a static Astro build served as Workers static assets, built and deployed by Workers
Builds on every push: `main` goes to production, every other branch gets a preview URL. The
domain is registered and its DNS served by Cloudflare too, so name, DNS and hosting live in one
place, at cost, with nothing to run.

## Considered Options

- **A self-managed VPS** behind a reverse proxy: full control, but a static site gains nothing
  from it and inherits the upkeep – OS updates, certificates, a deploy pipeline to write.
- **Vercel**: the same push-to-deploy flow and previews, but its free plan is for non-commercial
  use, and the Site may earn money one day.
