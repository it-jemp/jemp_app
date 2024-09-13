<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    text: any
    filter: string
    column: string
  }
  fields: {
    name: string
    type: string
    label: string
    required: boolean
  }[]
}>()

const field = computed(() => {
  return props.fields.find((field) => field.name === props.modelValue.column)
})

const filters = ["=", "!=", ">", "<", ">=", "<=", "text"]
</script>

<template>
  <UButtonGroup size="xs">
    <USelect
      v-model="modelValue.filter"
      placeholder="Filtro"
      :options="filters"
    />
    <USelect
      v-model="modelValue.column"
      placeholder="Colonna"
      :options="fields"
      value-attribute="name"
      @change="modelValue.text = ''"
    />
    <Input v-if="field" v-model="modelValue.text" :field="field" />
  </UButtonGroup>
</template>
