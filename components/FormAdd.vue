<script setup lang="ts">
import { object, string, date, boolean, number, type InferType } from "yup"
import type { FormSubmitEvent } from "#ui/types"

const props = defineProps<{
  tableName: string
  fields: {
    name: string
    type: string
    label: string
    required: boolean
  }[]
}>()

const supabase = useSupabaseClient()
const toast = useToast()

const schemaObject = props.fields.reduce((schema, column) => {
  switch (column.type) {
    case "date":
      schema[column.name] = date().nullable()
      break
    case "time":
      schema[column.name] = string().nullable()
      break
    case "boolean":
      schema[column.name] = boolean().nullable()
      break
    case "integer":
      schema[column.name] = number().integer().nullable()
      break
    case "float":
      schema[column.name] = number().nullable()
      break
    default:
      schema[column.name] = string().nullable()
  }
  if (column.required) {
    schema[column.name] = schema[column.name].required("Required")
  }
  return schema
}, {})

const schema = object(schemaObject)

type Schema = InferType<typeof schema>

const stateObject = props.fields.reduce((state, column) => {
  state[column.name] = ""
  return state
}, {})

const state = reactive(stateObject)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { error } = await supabase.from(props.tableName).insert(event.data)
  if (error) {
    toast.add({
      title: "Errore",
      description: error.message,
      icon: "i-heroicons-x-circle-16-solid",
    })
  } else {
    toast.add({
      title: "Successo",
      description: "Riga aggiunta con successo",
      icon: "i-heroicons-check-circle-16-solid",
    })
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup v-for="field in fields" :label="field.label" :name="field.name">
      <Input :field="field" v-model="state[field.name]" />
    </UFormGroup>
    <UButton type="submit"> Salva </UButton>
  </UForm>
</template>
