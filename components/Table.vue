<script setup lang="ts">
import { format } from "date-fns"

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

// Columns
const column_names = props.fields.map((field) => field.name).join(", ")
const columns = props.fields.map((field) => ({
  key: field.name,
  label: field.label,
  sortable: true,
}))
const selectedColumns = ref(columns)
const columnsTable = computed(() =>
  columns.filter((column) => selectedColumns.value.includes(column)),
)

// Pagination
const sort = ref({
  column: columns[0].key,
  direction: "desc",
})
const page = ref(1)
const pageCount = ref(10)
const { data: pageTotal } = await useAsyncData("pageTotal", async () => {
  const { count, error } = await supabase
    .from(props.tableName)
    .select("*", { count: "exact", head: true })
  if (error)
    toast.add({
      title: "Errore",
      description: error.message,
      icon: "i-heroicons-x-circle-16-solid",
    })
  return count
})
const pageFrom = computed(() => (page.value - 1) * pageCount.value)
const pageTo = computed(() =>
  Math.min(page.value * pageCount.value - 1, pageTotal.value),
)

// Filters
const filter = reactive({
  text: "",
  filter: "",
  column: "",
})

// Data
const { data: rows, status } = await useAsyncData(
  "rows",
  async () => {
    let query = supabase
      .from(props.tableName)
      .select(column_names)
      .order(sort.value.column, {
        ascending: sort.value.direction === "asc",
      })
      .range(pageFrom.value, pageTo.value)

    if (filter.text) {
      switch (filter.filter) {
        case "=":
          query = query.eq(filter.column, filter.text)
          break
        case "!=":
          query = query.neq(filter.column, filter.text)
          break
        case ">":
          query = query.gt(filter.column, filter.text)
          break
        case ">=":
          query = query.gte(filter.column, filter.text)
          break
        case "<":
          query = query.lt(filter.column, filter.text)
          break
        case "<=":
          query = query.lte(filter.column, filter.text)
          break
        case "text":
          query = query.ilike(filter.column, "%" + filter.text + "%")
          break
        default:
          break
      }
    }

    const { data, error } = await query
    if (error)
      toast.add({
        title: "Errore",
        description: error.message,
        icon: "i-heroicons-x-circle-16-solid",
      })

    props.fields.forEach((field) => {
      if (field.type === "date") {
        data.forEach((row) => {
          row[field.name] = format(new Date(row[field.name]), "dd/MM/yyyy")
        })
      }
    })

    return data
  },
  { watch: [sort, filter, pageCount, pageFrom] },
)

// Edit
const editOpen = ref(false)
const id = ref()
const openEdit = (i: string | number) => {
  id.value = i
  editOpen.value = true
}

// Add
const addOpen = ref(false)
const openAdd = () => {
  addOpen.value = true
}
</script>

<template>
  <div class="divide-y divide-gray-200 dark:divide-gray-700">
    <div class="flex justify-between items-center w-full px-2 py-3">
      <div class="flex gap-1.5 items-center">
        <TableFilter v-model="filter" :fields="fields" />
      </div>

      <div class="flex gap-1.5 items-center">
        <USelectMenu
          v-model="selectedColumns"
          :options="columns"
          multiple
          icon="i-heroicons-view-columns"
          size="xs"
          color="gray"
        />
        <UButton
          icon="i-heroicons-plus-circle"
          color="gray"
          size="xs"
          @click="openAdd"
        />
        <TableCsvDownload
          :table-name="tableName"
          :column-names="column_names"
        />
      </div>
    </div>
    <UTable
      v-model:sort="sort"
      :loading="status === 'pending'"
      :columns="columnsTable"
      :rows="rows"
      @select="openEdit($event[columns[0].key])"
      sort-mode="manual"
    />

    <TablePagination
      :pageFrom="pageFrom"
      :pageTo="pageTo"
      :pageTotal="pageTotal"
      v-model:page="page"
      v-model:pageCount="pageCount"
    />
  </div>
  <TableEdit
    v-model="editOpen"
    :table-name="tableName"
    :fields="fields"
    :column-id="columns[0].key"
    :identifier="id"
  />
  <TableAdd v-model="addOpen" :table-name="tableName" :fields="fields" />
</template>
