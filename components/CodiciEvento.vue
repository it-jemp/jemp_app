<script setup lang="ts">
import { localeDate } from "@/utilities"

const supabase = useSupabaseClient()
const toast = useToast()

const rows = ref<object[]>([])

const { data: eventi, error } = await useAsyncData("eventi", async () => {
  const { data } = await supabase
    .from("codici_evento")
    .select("codice, eventi(nome, data)")
  return data?.map((e) => ({
    evento: e.eventi?.nome,
    data: e.eventi?.data && localeDate(e.eventi.data),
    codice: e.codice,
  }))
})
if (error.value) {
  toast.add({
    title: "Errore",
    description: error.value.message,
    icon: "i-heroicons-x-circle-solid",
  })
}

if (eventi.value) {
  rows.value = eventi.value
}
</script>

<template>
  <UTable :rows="rows" />
</template>
