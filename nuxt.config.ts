// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
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
    '@nuxtjs/color-mode'
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