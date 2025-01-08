<script lang="ts" setup>
const props = defineProps<{
  fields: number
}>()
const model = defineModel<number | string>()

const data = ref<number[]>([])
const inputRefs = ref<HTMLElement[]>([])
const emit = defineEmits(["update:modelValue"])
defineExpose({
  clear() {
    data.value = []
  },
})

watch(
  data,
  (newVal) => {
    const newValue = newVal.join("")
    model.value = Number(newValue)
    if (
      newValue !== "" &&
      newValue.length === props.fields &&
      !newValue.includes("")
    ) {
      emit("update:modelValue", Number(newValue))
    }
  },
  { deep: true },
)

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const index = inputRefs.value.indexOf(target)

  if (target.value && index < props.fields - 1) {
    inputRefs.value[index + 1]?.focus()
  } else if (!target.value && index > 0) {
    inputRefs.value[index - 1]?.focus()
  }
}

const handlePaste = (e: ClipboardEvent) => {
  e.preventDefault()
  const pasteData = e.clipboardData?.getData("text")
  if (!pasteData) return
  for (let i = 0; i < pasteData.length && i < props.fields; i++) {
    data.value[i] = Number(pasteData[i])
  }
}
</script>

<template>
  <div class="flex gap-2" @input="handleInput($event)">
    <template v-for="(field, index) in fields" :key="index">
      <input
        :ref="
          (el) => {
            inputRefs[index] = el as HTMLElement
          }
        "
        v-model="data[index]"
        type="number"
        pattern="[0-9]*"
        max="9"
        min="0"
        class="border rounded w-10 h-10 text-center [&::-webkit-inner-spin-button]:appearance-none"
        @paste="handlePaste($event)"
      />
      <span
        v-if="(index + 1) % 3 === 0 && index + 1 !== fields"
        class="leading-10"
        >—</span
      >
    </template>
  </div>
</template>
