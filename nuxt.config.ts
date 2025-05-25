// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/',
    head: {
      title: 'Blog',
    },
  },
  devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
  colorMode: {
    classSuffix: '', // Jadi `dark` bukan `dark-mode`
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://jsonplaceholder.typicode.com'
    }
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    "@pinia/nuxt",
  ],
    ui: {

    theme: {
      colors: [
        "primary",
        "secondary",
        "tertiary",
        "info",
        "success",
        "warning",
        "error",
      ],
    },
  },
})