<script setup lang="ts">
const props = defineProps<{
  tableName: string
  columnNames: string
}>()

const supabase = useSupabaseClient()
const toast = useToast()

const downloadCSV = async () => {
  const { data, error } = await supabase
    .from(props.tableName)
    .select(props.columnNames)
    .csv()

  if (error) {
    toast.add({
      title: "Errore",
      description: error.message,
      icon: "i-heroicons-x-circle-16-solid",
    })
    return
  }

  const blob = new Blob([data], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${props.tableName}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<template>
  <UButton
    class="md:inline-flex hidden"
    icon="i-heroicons-arrow-down-tray"
    label="CSV"
    color="gray"
    size="xs"
    @click="downloadCSV"
  />
</template>
