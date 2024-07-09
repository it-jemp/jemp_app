// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  nitro: {
    preset: "bun",
  },
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/image",
    "@nuxt/eslint",
    "@nuxtjs/supabase",
    "@nuxt/ui",
  ],
  extends: ['@nuxt/ui-pro'],
  piniaPersistedstate: {
    cookieOptions: {
      path: "/",
      // maxAge: 60 * 60 * 24 * 30,
      secure: true,
    },
  },
  supabase: {
    redirect: false,
  },
  ui: {
    icons: ['mdi', 'heroicons']
  }
})
