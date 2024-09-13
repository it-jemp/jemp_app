<script setup lang="ts">
import { format } from "date-fns"

const props = defineProps<{
  field: {
    name: string
    type: string
    label: string
    required: boolean
  }
}>()
const modelValue = defineModel<string | number | boolean | Date>()

const dateModel = ref(modelValue.value)

watch(dateModel, (value) => {
  modelValue.value = value && format(value, "yyyy-MM-dd")
})

const dateTimeModel = ref(modelValue.value)

watch(dateTimeModel, (value) => {
  modelValue.value = value && format(value, "yyyy-MM-ddTHH:mm")
})

const timeModel = ref(modelValue.value && "1900-01-01T" + modelValue.value)

watch(timeModel, (value) => {
  modelValue.value = value && format(value, "HH:mm")
})
</script>

<template>
  <DatePicker v-if="field.type === 'date'" v-model="dateModel" mode="date" />
  <DatePicker
    v-if="field.type === 'time'"
    v-model="timeModel"
    mode="time"
    mask="HH:mm"
    hide-time-header
  />
  <DatePicker
    v-if="field.type === 'timestamp'"
    v-model="modelValue"
    mode="dateTime"
    mask="d MMM, yyy - HH:mm"
  />
  <UToggle v-if="field.type === 'boolean'" v-model="modelValue" />
  <UInput
    v-if="field.type === 'integer'"
    v-model="modelValue"
    v-maska
    data-maska="0"
    data-maska-tokens="0:\d:multiple"
  />
  <UInput
    v-if="field.type === 'float'"
    v-model="modelValue"
    v-maska
    data-maska="0.99"
    data-maska-tokens="0:\d:multiple|9:\d:optional"
  />
  <UInput v-if="field.type === 'text'" v-model="modelValue" />
</template>
