<script setup lang="ts">
import { object, string, type InferType } from "yup"
import type { FormSubmitEvent } from "#ui/types"

const supabase = useSupabaseClient()
const toast = useToast()
const route = useRoute()

const { data: job } = await useAsyncData("profile", async () => {
  const { data } = await supabase
    .from("job_offers")
    .select("title, description, content")
    .eq("id", route.params.id)
    .single()
  return data
})

const schema = object({
  title: string().required("Required"),
  description: string().required("Required"),
  content: string().required("Required"),
})

type Schema = InferType<typeof schema>

const state = reactive({
  title: job.value?.title,
  description: job.value?.description,
  content: job.value?.content,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { error } = await supabase
    .from("job_offers")
    .update(event.data)
    .eq("id", route.params.id)
  if (error) {
    toast.add({
      title: "Errore",
      description: error.message,
      icon: "i-heroicons-x-circle-16-solid",
    })
  } else {
    toast.add({
      title: "Successo",
      description: "Offerta di lavoro modificata con successo",
      icon: "i-heroicons-check-circle-16-solid",
    })
    navigateTo("/jobs/" + route.params.id)
  }
}
</script>

<template>
  <UContainer class="py-12">
    <h2 class="mt-2 font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
      Aggiungi Offerta Di Lavoro
    </h2>
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 mt-8"
      @submit="onSubmit"
    >
      <UFormGroup label="Titolo" name="title">
        <UInput v-model="state.title" />
      </UFormGroup>

      <UFormGroup label="Descrizione Breve" name="description">
        <UInput v-model="state.description" />
      </UFormGroup>

      <UFormGroup label="Contenuto in MarkDown" name="content">
        <UTextarea v-model="state.content" autoresize :maxrows="15" :rows="5" />
      </UFormGroup>

      <UButton type="submit"> Invia </UButton>
    </UForm>
  </UContainer>
</template>
