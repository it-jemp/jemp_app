<script setup lang="ts">
import { localeDate } from "@/utilities"

const supabase = useSupabaseClient()
const toast = useToast()

const rows = ref<object[]>([])

const { data: eventi, error } = await useAsyncData("eventi", async () => {
  const { data } = await supabase
    .from("eventi")
    .select("nome, data, codici_evento(codice)")
  return data?.map((e) => ({
    evento: e.nome,
    data: e.data && localeDate(e.data),
    codice: e.codici_evento.codice,
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
