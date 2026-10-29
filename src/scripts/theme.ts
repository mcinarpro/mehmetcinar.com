// The reader's choice: light, dark or system. It is a `theme` cookie on .mehmetcinar.com,
// shared with every *.mehmetcinar.com app (ADR 0002). No cookie means "system".
type Choice = "light" | "dark" | "system";

const THEME_KEY = "theme";
const systemDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

function readCookie(): Choice | undefined {
  return document.cookie.match(/(?:^|; )theme=(light|dark|system)/)?.[1] as
    Choice | undefined;
}

// A choice made before the cookie existed lives only in localStorage.
function readChoice(): Choice {
  const legacy = localStorage.getItem(THEME_KEY);
  return (
    readCookie() ??
    (legacy === "light" || legacy === "dark" ? legacy : "system")
  );
}

function writeCookie(choice: Choice): void {
  const domain = location.hostname.endsWith("mehmetcinar.com")
    ? "; Domain=mehmetcinar.com"
    : "";
  document.cookie = `${THEME_KEY}=${choice}; Path=/; Max-Age=31536000; SameSite=Lax; Secure${domain}`;
}

function reflect(choice: Choice): void {
  const theme =
    choice === "system" ? (systemDark() ? "dark" : "light") : choice;
  const root = document.firstElementChild;
  root?.setAttribute("data-theme", theme);
  root?.classList.toggle("dark", theme === "dark");
  document
    .querySelectorAll<HTMLButtonElement>("[data-theme-choice]")
    .forEach(button =>
      button.setAttribute(
        "aria-checked",
        String(button.dataset.themeChoice === choice)
      )
    );

  // Fill <meta name="theme-color"> with the computed background colour so
  // Android's browser chrome matches the page background.
  const bg = window.getComputedStyle(document.body).backgroundColor;
  document
    .querySelector("meta[name='theme-color']")
    ?.setAttribute("content", bg);
}

function setup(): void {
  const legacy = localStorage.getItem(THEME_KEY);
  if (!readCookie() && (legacy === "light" || legacy === "dark"))
    writeCookie(legacy);
  reflect(readChoice());

  document
    .querySelectorAll<HTMLButtonElement>("[data-theme-choice]")
    .forEach(button =>
      button.addEventListener("click", () => {
        const choice = button.dataset.themeChoice as Choice;
        // The cookie is written only when the reader picks an option.
        writeCookie(choice);
        localStorage.setItem(THEME_KEY, choice);
        reflect(choice);
      })
    );
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

// While the choice is "system", follow the OS setting live; nothing is written.
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    if (readChoice() === "system") reflect("system");
  });
