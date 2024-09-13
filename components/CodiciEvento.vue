<script setup lang="ts">
const supabase = useSupabaseClient()

const { data: eventi } = await useAsyncData("eventi", async () => {
  const { data } = await supabase
    .from("codici_presenza")
    .select("evento(nome, data), codice")
    .order("evento(data)", { ascending: false })
  return data?.map((e) => ({
    evento: e.evento!.nome,
    data: e.evento!.data,
    codice: e.codice,
  }))
})
</script>

<template>
  <UTable :rows="eventi" />
</template>
