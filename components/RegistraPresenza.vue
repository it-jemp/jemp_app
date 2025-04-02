<script setup lang="ts">
import { object, number, type InferType } from "yup"
import * as Sentry from "@sentry/nuxt"
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
  let socio: ISocio | null = null
  let eventi:
    | {
        data: string
        id: number
        id_kuntur: number | null
        nome: string
        tipologia: string
      }[]
    | null = null
  let partecipazione: ITablePartecipazioni | null = null
  try {
    // Get eventi from Supabase
    const { data, error } = await supabase.rpc("evento_from_codice", {
      codice_input: String(event.data.codice),
    })
    eventi = data
    if (error) {
      throw createError({
        statusCode: 500,
        message: error.message,
        statusMessage: "Errore durante il recupero dell'evento",
      })
    } else if (!eventi || eventi.length === 0) {
      throw createError({
        statusCode: 500,
        message: "Evento non trovato",
        statusMessage: "Evento non trovato",
      })
    }
    // Get socio ID from Teable using email_jemp
    socio = await $fetch<ISocio>("/api/socio")
    if (!socio) {
      throw createError({
        statusCode: 500,
        message: "Socio non trovato.",
        statusMessage:
          "Socio non trovato. Verificare la mail JEMP in Anagrafica Soci su Kuntur.",
      })
    }
    // Insert presenza
    partecipazione = await $fetch<ITablePartecipazioni>("/api/add_presenza", {
      method: "POST",
      body: {
        id_socio: socio.id,
        id_evento: eventi[0].id_kuntur,
        tipologia: eventi[0].tipologia,
      },
    })
    if (!partecipazione) {
      throw createError({
        statusCode: 500,
        message: "Errore durante l'inserimento della presenza",
        statusMessage: "Errore durante l'inserimento della presenza",
      })
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
      description: isNuxtError(error)
        ? error.statusMessage
        : "Errore sconosciuto",
      icon: "i-heroicons-x-circle-solid",
    })
    Sentry.captureException(error, {
      extra: {
        codice: event.data.codice,
        socio,
        eventi,
        partecipazione,
      },
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
