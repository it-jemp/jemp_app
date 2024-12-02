<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | JEMP` : "JEMP"
  },
  meta: [
    { name: "description", content: "JEMP App" },
    { name: "theme-color", content: "#ffd100" },
  ],
  link: [
    { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
    { rel: "icon", href: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon-180x180.png",
      sizes: "180x180",
    },
    { rel: "mask-icon", href: "/maskable-icon-512x512.png", color: "#ffd100" },
    { rel: "manifest", href: "/manifest.webmanifest" },
  ],
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>
