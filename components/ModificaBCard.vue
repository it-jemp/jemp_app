<script setup lang="ts">
import { object, string, type InferType } from "yup"
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

const phoneRegExp = /^(3[1-6][0-9])(\d{7})$/gm
const schema = object({
  nome: string().required("Required"),
  cognome: string().required("Required"),
  ruolo: string().required("Required"),
  numero_cellulare: string()
    .required("Required")
    .matches(phoneRegExp, "Invalid cellphone number"),
  url_linkedin: string().required("Required"),
})

type Schema = InferType<typeof schema>

const state = reactive({
  nome: profile.value?.nome || "",
  cognome: profile.value?.cognome || "",
  ruolo: profile.value?.ruolo || "",
  numero_cellulare: profile.value?.numero_cellulare || "",
  url_linkedin: profile.value?.url_linkedin || "",
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
      icon: "i-heroicons-x-circle-16-solid",
    })
  } else {
    toast.add({
      title: "Successo",
      description: "Business Card modificata con successo",
      icon: "i-heroicons-check-circle-16-solid",
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
    <UFormGroup>
      <img
        :src="profile?.avatar_url || ''"
        class="rounded-full inline"
        alt="Avatar"
      >
      <p class="inline px-2">
        Per cambiarla cambiala sul profilo di Google e poi riesegui il LogIn
      </p>
    </UFormGroup>

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
      <UInput v-model="state.numero_cellulare" />
    </UFormGroup>

    <UFormGroup label="URL Profilo LinkedIn" name="url_linkedin">
      <UInput v-model="state.url_linkedin" />
    </UFormGroup>

    <UButton type="submit"> Salva </UButton>
  </UForm>
</template>
