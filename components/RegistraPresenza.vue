<script setup lang="ts">
import { object, number, type InferType } from "yup"
import type { FormSubmitEvent } from "#ui/types"
import { localeDate } from "@/utilities"
import type { ISocio, ITablePartecipazioni } from "@/interfaces/kuntur"

const supabase = useSupabaseClient()
const toast = useToast()

const codeInput = useTemplateRef("codeInput")
const loading = ref(false)

const schema = object({
  codice: number()
    .typeError("Inserisci un numero valido")
    .min(100000, "Il codice deve essere di 6 cifre")
    .max(999999, "Il codice deve essere di 6 cifre")
    .integer(),
})

type Schema = InferType<typeof schema>

const state = reactive({
  codice: "",
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    // Get eventi from Supabase
    const { data: eventi, error } = await supabase.rpc("evento_from_codice", {
      codice_input: String(event.data.codice),
    })
    if (error) {
      throw new Error(error.message)
    } else if (eventi.length === 0) {
      throw new Error("Nessun evento trovato")
    }
    // Get socio ID from Teable using email_jemp
    const socio = await $fetch<ISocio>("/api/socio")
    if (!socio) {
      throw new Error(
        "Socio non trovato. Verificare la mail JEMP in Anagrafica Soci su Kuntur.",
      )
    }
    // Insert presenza
    const partecipazione = await $fetch<ITablePartecipazioni>(
      "/api/add_presenza",
      {
        method: "POST",
        body: {
          id_socio: socio.id,
          id_evento: eventi[0].id_kuntur,
          tipologia: eventi[0].tipologia,
        },
      },
    )
    if (!partecipazione) {
      throw new Error("Errore durante l'inserimento della presenza")
    } else {
      toast.add({
        title: "Presenza registrata",
        description: `Presenza registrata per l'evento ${eventi[0].nome} (${localeDate(eventi[0].data!)})`,
        icon: "i-heroicons-check-circle-solid",
      })
    }
  } catch (error) {
    toast.add({
      title: "Errore",
      description:
        error instanceof Error ? error.message : "Errore sconosciuto",
      icon: "i-heroicons-x-circle-solid",
    })
  }
  codeInput.value?.clear()
  loading.value = false
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Codice Presenza" name="codice">
      <CodeInput ref="codeInput" v-model="state.codice" :fields="6" />
    </UFormGroup>
    <UButton type="submit" :loading="loading"> Invia </UButton>
  </UForm>
</template>
