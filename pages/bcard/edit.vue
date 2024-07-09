<script setup lang="ts">
import { object, string, type InferType } from "yup"
import type { FormSubmitEvent } from "#ui/types"

const phoneRegExp = /^(3[1-6][0-9])(\d{7})$/gm
const schema = object({
  position: string().required("Required"),
  cellphone: string().required("Required").matches(phoneRegExp, "Invalid cellphone number"),
  linkedin: string().required("Required"),
})

type Schema = InferType<typeof schema>

const state = reactive({
  position: "",
  cellphone: "",
  linkedin: "",
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
</script>

<template>
  <UContainer class="py-12">
    <h2 class="mt-2 font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
      Modifica Business Card
    </h2>
    <UForm :schema="schema" :state="state" class="space-y-4 mt-8" @submit="onSubmit">
      <UFormGroup label="Posizione" name="position">
        <UInput v-model="state.position" />
      </UFormGroup>

      <UFormGroup label="Cellulare" name="cellphone">
        <UInput v-model="state.cellphone" />
      </UFormGroup>

      <UFormGroup label="URL Profilo LinkedIn" name="linkedin">
        <UInput v-model="state.linkedin" />
      </UFormGroup>

      <UButton type="submit"> Salva </UButton>
    </UForm>
  </UContainer>
</template>
