<script setup lang="ts">
import type { NuxtError } from "#app"

defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <NuxtLayout>
    <UPage>
      <UPageError :error="error" />
    </UPage>
  </NuxtLayout>
</template>
