// Creates a Buttondown draft for each published Post that has no email yet.
//
//   BUTTONDOWN_API_KEY=… bun scripts/newsletter.ts            create the drafts
//   BUTTONDOWN_API_KEY=… DRY_RUN=true bun scripts/newsletter.ts   only list them
//
// Mehmet reviews each draft and sends it from the Buttondown dashboard.
import { readdir, readFile } from "node:fs/promises";
import config from "../astro-paper.config";

// Posts published before the newsletter existed are never mailed.
const NEWSLETTER_START = new Date("2026-10-30T00:00:00Z");
const POSTS_DIR = "src/content/posts";
const API = "https://api.buttondown.com/v1";

const key = process.env.BUTTONDOWN_API_KEY;
const dryRun = process.env.DRY_RUN === "true";
const log = (line: string) => process.stdout.write(`${line}\n`);

type Post = { title: string; description: string; url: string };

// The frontmatter fields read here are flat `key: value` lines.
function frontmatter(source: string) {
  const block = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
  const fields: Record<string, string> = {};
  for (const line of block.split("\n")) {
    const match = line.match(/^(\w+):\s*(.*)$/);
    if (match) fields[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
  return fields;
}

async function readPosts(): Promise<Post[]> {
  const files = (await readdir(POSTS_DIR)).filter(
    file => /\.mdx?$/.test(file) && !file.startsWith("_")
  );
  const posts: Post[] = [];
  for (const file of files) {
    const data = frontmatter(await readFile(`${POSTS_DIR}/${file}`, "utf8"));
    if (data.draft === "true") continue;
    if (new Date(data.pubDatetime) < NEWSLETTER_START) continue;
    const slug = file.replace(/\.mdx?$/, "");
    posts.push({
      title: data.title,
      description: data.description,
      url: new URL(`posts/${slug}/`, config.site.url).href,
    });
  }
  return posts;
}

async function buttondown(path: string, init?: RequestInit) {
  const response = await fetch(path.startsWith("http") ? path : `${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Token ${key}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Buttondown ${response.status}: ${await response.text()}`);
  }
  return response.json();
}

// Every email already in Buttondown, drafts included.
async function knownUrls() {
  const urls = new Set<string>();
  let next: string | null = "/emails";
  while (next) {
    const page: {
      results: { canonical_url?: string }[];
      next: string | null;
    } = await buttondown(next);
    for (const email of page.results) {
      if (email.canonical_url) urls.add(email.canonical_url);
    }
    next = page.next;
  }
  return urls;
}

if (!key) throw new Error("BUTTONDOWN_API_KEY is missing");

const known = await knownUrls();
const todo: Post[] = [];
for (const post of await readPosts()) {
  if (known.has(post.url)) continue;
  // Only mail a Post once it is live.
  const live = await fetch(post.url, { method: "HEAD" });
  if (!live.ok) {
    log(`not live yet: ${post.url}`);
    continue;
  }
  todo.push(post);
}

if (todo.length === 0) log("nothing to draft");

for (const post of todo) {
  if (dryRun) {
    log(`would draft: ${post.title}`);
    continue;
  }
  await buttondown("/emails", {
    method: "POST",
    body: JSON.stringify({
      subject: post.title,
      description: post.description,
      canonical_url: post.url,
      body: `${post.description}\n\n[Read the Post](${post.url})`,
      status: "draft",
    }),
  });
  log(`drafted: ${post.title}`);
}
