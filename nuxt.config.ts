// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    preset: "bun",
  },

  runtimeConfig: {
    public: {
      baseUrl: "http://localhost:3000",
      appVersion: "1.0.0",
      kpi: {
        hr: "",
      },
    },
    kuntur: {
      token: "",
      domain: "",
      base: "",
      eventiTable: "",
      rgTable: "",
      sociTable: "",
    },
  },

  modules: ["@nuxt/eslint", "@nuxtjs/supabase", "@nuxt/ui", "@nuxt/image"],

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
