<script setup lang="ts">
defineProps<{
  area: string
  url: string | null
  loading: boolean
  error: string | null
}>()
defineEmits<{ reload: [] }>()
</script>

<template>
  <div class="mt-4">
    <div v-if="loading" class="flex items-center justify-center h-[70vh]">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl text-primary" />
    </div>

    <div v-else-if="error" class="flex flex-col items-center justify-center gap-4 h-[70vh]">
      <UAlert
        color="red"
        variant="soft"
        title="Errore caricamento dashboard"
        :description="error"
        icon="i-heroicons-exclamation-triangle"
        class="w-full max-w-xl"
      />
      <UButton
        icon="i-heroicons-arrow-path"
        variant="soft"
        @click="$emit('reload')"
      >
        Riprova
      </UButton>
    </div>

    <iframe
      v-else-if="url"
      :src="url"
      frameborder="0"
      class="w-full h-[80vh] rounded-lg"
      allowtransparency
      allowfullscreen
    />
  </div>
</template>
