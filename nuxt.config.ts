// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  devtools: { enabled: true },

  nitro: {
    preset: "bun",
  },

  runtimeConfig: {
    public: {
      baseUrl: "http://localhost:3000",
      appVersion: "1.0.1",
      kpi: {
        hr: "",
      },
    },
    kuntur: {
      token: "",
      domain: "",
      eventiTable: "",
      rgTable: "",
      sociTable: "",
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/supabase",
    "@nuxt/ui",
    "@nuxt/image",
    "@sentry/nuxt/module",
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

  sentry: {
    sourceMapsUploadOptions: {
      org: "jemp",
      project: "javascript-nuxt",
    },
  },

  sourcemap: {
    client: "hidden",
  },
})
