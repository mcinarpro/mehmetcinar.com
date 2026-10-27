import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://mehmetcinar.com/",
    title: "Mehmet Cinar",
    description: "A software developer learning electricity from zero, in public.",
    author: "Mehmet Cinar",
    profile: "https://mehmetcinar.com/about/",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Europe/Brussels",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/mcinarpro/mehmetcinar.com/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/mcinarpro" },
    { name: "linkedin", url: "https://www.linkedin.com/in/mehmet-cinar/" },
    { name: "x",        url: "https://x.com/mcinarpro" },
  ],
  shareLinks: [
    { name: "linkedin", url: "https://www.linkedin.com/sharing/share-offsite/?url=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});