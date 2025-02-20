<script setup lang="ts">
import { object, string, number, type InferType } from "yup"
import type { FormSubmitEvent } from "#ui/types"

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const { data: profile } = await useAsyncData("profile", async () => {
  const { data } = await supabase
    .from("business_card")
    .select("nome, cognome, ruolo, numero_cellulare, url_linkedin, avatar_url")
    .eq("id", user.value!.id)
    .single()
  return data
})

const schema = object({
  nome: string().required("Richiesto"),
  cognome: string().required("Richiesto"),
  ruolo: string().required("Richiesto"),
  numero_cellulare: number().min(111111111).max(99999999999),
  url_linkedin: string(),
})

type Schema = InferType<typeof schema>

const state = reactive({
  nome: profile.value?.nome ?? "",
  cognome: profile.value?.cognome ?? "",
  ruolo: profile.value?.ruolo ?? "",
  numero_cellulare: profile.value?.numero_cellulare ?? "",
  url_linkedin: profile.value?.url_linkedin ?? "",
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { error } = await supabase
    .from("business_card")
    .update(event.data)
    .eq("id", user.value!.id)
  if (error) {
    toast.add({
      title: "Errore",
      description: error.message,
      icon: "i-heroicons-x-circle-solid",
    })
  } else {
    toast.add({
      title: "Successo",
      description: "Business Card modificata con successo",
      icon: "i-heroicons-check-circle-solid",
    })
    navigateTo("/bcard/view/" + user.value!.id)
  }
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4 mt-8"
    @submit="onSubmit"
  >
    <div class="flex items-center">
      <img
        :src="profile?.avatar_url ?? ''"
        class="rounded-full inline"
        alt="Avatar"
      />
      <p class="px-4">
        Per cambiarla modificala sul profilo di Google e poi riesegui il LogIn
      </p>
    </div>

    <UFormGroup label="Nome" name="nome">
      <UInput v-model="state.nome" />
    </UFormGroup>

    <UFormGroup label="Cognome" name="cognome">
      <UInput v-model="state.cognome" />
    </UFormGroup>

    <UFormGroup label="Posizione" name="ruolo">
      <UInput v-model="state.ruolo" />
    </UFormGroup>

    <UFormGroup label="Cellulare" name="numero_cellulare">
      <UInput v-model="state.numero_cellulare">
        <template #leading>
          <span class="text-gray-500 dark:text-gray-400 text-base sm:text-sm"
            >+39</span
          >
        </template>
      </UInput>
    </UFormGroup>

    <UFormGroup label="URL Profilo LinkedIn" name="url_linkedin">
      <UInput v-model="state.url_linkedin" />
    </UFormGroup>

    <UButton type="submit"> Salva </UButton>
  </UForm>
</template>
