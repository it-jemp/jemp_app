<script setup lang="ts">
import { object, number, type InferType } from "yup"
import type { FormSubmitEvent } from "#ui/types"

const supabase = useSupabaseClient()
const toast = useToast()

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
  const { error } = await supabase.rpc("add_presenza_interna", {
    code: event.data.codice,
  })
  if (error) {
    toast.add({
      title: "Errore",
      description: error.message,
      icon: "i-heroicons-x-circle-16-solid",
    })
  } else {
    toast.add({
      title: "Successo",
      description: "Presenza registrata con successo",
      icon: "i-heroicons-check-circle-16-solid",
    })
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Codice Presenza" name="codice">
      <CodeInput v-model="state.codice" :fields="6" />
    </UFormGroup>
    <UButton type="submit"> Invia </UButton>
  </UForm>
</template>
