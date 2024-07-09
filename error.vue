<script setup lang="ts">
defineProps({
  /* eslint-disable-next-line vue/require-default-prop */
  error: Object as () => {
    statusCode: number
    fatal: boolean
    unhandled: boolean
    statusMessage?: string
    data?: unknown
    cause?: unknown
  },
})

const localePath = useLocalePath()
</script>

<template>
  <NuxtLayout>
    <p>Error</p>
  </NuxtLayout>
</template>
