<script setup lang="ts">
import { object, number, type InferType } from "yup"
import type { FormSubmitEvent } from "#ui/types"

const schema = object({
  codice: number().typeError("Inserisci un numero valido"),
})

type Schema = InferType<typeof schema>

const state = reactive({
  codice: "",
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Codice Presenza" name="codice">
      <UInput v-model="state.codice" />
    </UFormGroup>
    <UButton type="submit"> Invia </UButton>
  </UForm>
</template>
