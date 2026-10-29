const THEME_KEY = "theme";
const LIGHT = "light";
const DARK = "dark";

function readCookie(): string | undefined {
  return document.cookie.match(/(?:^|; )theme=(light|dark)/)?.[1];
}

// Shared with every *.mehmetcinar.com app (ADR 0002): one choice, everywhere.
function writeCookie(): void {
  const domain = location.hostname.endsWith("mehmetcinar.com")
    ? "; Domain=mehmetcinar.com"
    : "";
  document.cookie = `${THEME_KEY}=${themeValue}; Path=/; Max-Age=31536000; SameSite=Lax; Secure${domain}`;
}

function getPreferredTheme(): string {
  const stored = readCookie() ?? localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DARK
    : LIGHT;
}

// Reuse the value already set by the inline FOUC-prevention script if available.
let themeValue: string =
  (window as unknown as { __theme?: { value: string } }).__theme?.value ??
  getPreferredTheme();

function persist(): void {
  localStorage.setItem(THEME_KEY, themeValue);
  writeCookie();
  reflect();
}

function reflect(): void {
  const root = document.firstElementChild;
  root?.setAttribute("data-theme", themeValue);
  root?.classList.toggle("dark", themeValue === DARK);
  document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue);

  // Fill <meta name="theme-color"> with the computed background colour so
  // Android's browser chrome matches the page background.
  const bg = window.getComputedStyle(document.body).backgroundColor;
  document
    .querySelector("meta[name='theme-color']")
    ?.setAttribute("content", bg);
}

function setup(): void {
  // A choice made before the cookie existed lives only in localStorage: share it.
  if (!readCookie() && localStorage.getItem(THEME_KEY)) writeCookie();
  reflect();
  document.querySelector("#theme-btn")?.addEventListener("click", () => {
    themeValue = themeValue === LIGHT ? DARK : LIGHT;
    persist();
  });
}

setup();

// Re-run after View Transitions navigation.
document.addEventListener("astro:after-swap", setup);

// Carry the theme-color value across View Transitions to prevent the
// Android navigation bar from flashing during page transitions.
document.addEventListener("astro:before-swap", event => {
  const color = document
    .querySelector("meta[name='theme-color']")
    ?.getAttribute("content");
  if (color) {
    (event as { newDocument: Document }).newDocument
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", color);
  }
});

// Sync with OS-level dark/light preference changes.
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches }) => {
    themeValue = matches ? DARK : LIGHT;
    persist();
  });
