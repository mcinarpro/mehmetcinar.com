# The Newsletter runs on Buttondown, driven by its API

Readers subscribe through a plain HTML form on the Site that posts to Buttondown; Buttondown keeps
the list, sends the confirmation email and handles unsubscribes. A daily GitHub Action creates a
Buttondown draft for each new Post once it is live, and Mehmet sends it from the dashboard. The
Site stays static: no server code, no API key in the Worker.

Buttondown's free plan covers the first 100 Subscribers and its API is free on every plan, so the
Action replaces the paid RSS-to-email add-on. Double opt-in is on and open and click tracking are
off, which keeps consent provable and the emails pixel-free. The list exports as CSV, so leaving
costs nothing.

Revisit at about 80 Subscribers: the Basic plan (9 $/month up to 1,000), or the list moved to a
Worker with D1 and Resend broadcasts.

## Considered Options

- **Cloudflare Email Sending from a Worker**: everything in one account, but its FAQ limits it to
  transactional email, it needs the Workers paid plan, and a newsletter sent through it would put
  at risk the account that hosts the Site.
- **A Worker with D1 and Resend**: the list stays in our own database and Resend adds one-click
  unsubscribe headers, but double opt-in, bounces and the signup endpoint are ours to build –
  weeks of upkeep for zero Subscribers.
- **listmonk on a VPS**: full ownership, but a server to patch, and an email relay to pay for
  anyway.
- **beehiiv, Kit, Substack**: built for growth and monetisation; sending through the API is not
  free on beehiiv, and Substack has no API to send.
