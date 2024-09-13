<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from "v-calendar"
import "v-calendar/dist/style.css"
import { format } from "date-fns"

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator(value: string) {
      return ["date", "dateTime", "time"].includes(value)
    },
  },
  mask: {
    type: String,
    default: "d MMM, yyy",
  },
})
const modelValue = defineModel<Date | string>()

const attrs = {
  transparent: true,
  borderless: true,
  color: "primary",
  "is-dark": { selector: "html", darkClass: "dark" },
  "first-day-of-week": 2,
}

const attributes = [
  {
    key: "today",
    bar: true,
    dates: new Date(),
  },
]

const fillDate = (open: boolean) => {
  if (!modelValue.value && props.mode === "time" && open)
    modelValue.value = new Date()
}
</script>

<template>
  <UPopover
    :popper="{ placement: 'bottom-start' }"
    @update:open="fillDate($event)"
    :ui="{
      base: 'flex items-center gap-2',
    }"
  >
    <UButton
      :icon="
        mode === 'time'
          ? 'i-heroicons-clock'
          : 'i-heroicons-calendar-days-20-solid'
      "
      :label="modelValue ? format(modelValue, mask) : 'NULL'"
    />

    <template #panel="{ close }">
      <VCalendarDatePicker
        v-model="modelValue"
        v-bind="{ ...attrs, ...$attrs }"
        :mode="mode"
        is24hr
        :attributes="attributes"
        @close="close"
      />
      <UButton
        v-if="mode === 'time'"
        class="mr-2"
        icon="i-heroicons-x-mark"
        @click="modelValue = ''"
      />
    </template>
  </UPopover>
</template>

<style>
:root {
  --vc-gray-50: rgb(var(--color-gray-50));
  --vc-gray-100: rgb(var(--color-gray-100));
  --vc-gray-200: rgb(var(--color-gray-200));
  --vc-gray-300: rgb(var(--color-gray-300));
  --vc-gray-400: rgb(var(--color-gray-400));
  --vc-gray-500: rgb(var(--color-gray-500));
  --vc-gray-600: rgb(var(--color-gray-600));
  --vc-gray-700: rgb(var(--color-gray-700));
  --vc-gray-800: rgb(var(--color-gray-800));
  --vc-gray-900: rgb(var(--color-gray-900));
}

.vc-primary {
  --vc-accent-50: rgb(var(--color-primary-50));
  --vc-accent-100: rgb(var(--color-primary-100));
  --vc-accent-200: rgb(var(--color-primary-200));
  --vc-accent-300: rgb(var(--color-primary-300));
  --vc-accent-400: rgb(var(--color-primary-400));
  --vc-accent-500: rgb(var(--color-primary-500));
  --vc-accent-600: rgb(var(--color-primary-600));
  --vc-accent-700: rgb(var(--color-primary-700));
  --vc-accent-800: rgb(var(--color-primary-800));
  --vc-accent-900: rgb(var(--color-primary-900));
}
</style>
