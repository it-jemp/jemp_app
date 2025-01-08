<script lang="ts" setup>
import QrcodeVue from "qrcode.vue"

const route = useRoute()
const model = defineModel<boolean>()
const toast = useToast()

const currentUrl = ref(useRuntimeConfig().public.baseUrl + route.path)

async function copyToClipboard() {
  await navigator.clipboard.writeText(currentUrl.value)
  toast.add({
    title: "Successo",
    description: "Link copiato con successo",
    icon: "i-heroicons-check-circle-solid",
  })
}
</script>

<template>
  <UModal v-model="model">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          @click="model = false"
        />
      </template>
      <QrcodeVue
        :value="currentUrl"
        :size="200"
        level="M"
        render-as="svg"
        class="mx-auto my-2"
      />
      <UButtonGroup orientation="horizontal" class="w-full pt-2">
        <UInput v-model="currentUrl" class="flex-grow" disabled />
        <UButton
          icon="i-heroicons-clipboard-document"
          color="gray"
          @click="copyToClipboard"
        />
      </UButtonGroup>
    </UCard>
  </UModal>
</template>
