// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || "http://localhost:3000",
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/supabase",
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/image",
  ],

  extends: ["@nuxt/ui-pro"],

  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/bcard/view/*"],
    },
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
    types: "./interfaces/supabase.ts",
  },

  compatibilityDate: "2024-08-24",
})
