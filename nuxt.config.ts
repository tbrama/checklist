// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
        },
      ],
      title: "Checklilst",
    },
  },
  modules: ["nuxt-icon", "@nuxtjs/tailwindcss", "@vueuse/nuxt", "@pinia/nuxt"],
  ssr: false,
  runtimeConfig: {
    keyLs: process.env.KEY_LS,
  },
});
