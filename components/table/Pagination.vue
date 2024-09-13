<script setup lang="ts">
const props = defineProps<{
  pageFrom: number
  pageTo: number
  pageTotal: number
}>()
const page = defineModel<number>("page")
const pageCount = defineModel<number>("pageCount")
</script>

<template>
  <div class="flex flex-wrap justify-between items-center py-3.5 px-2">
    <div>
      <span class="text-sm leading-5">
        <span class="font-medium">{{ pageFrom + 1 }}</span>
        to
        <span class="font-medium">{{ pageTo + 1 }}</span>
        of
        <span class="font-medium">{{ pageTotal }}</span>
      </span>
    </div>
    <div class="flex items-center gap-1.5">
      <span class="hidden md:block text-sm leading-5">Rows per page:</span>
      <USelect
        v-model="pageCount"
        :options="[5, 10, 30, 50, 100]"
        size="xs"
        class="hidden md:block"
      />
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="pageTotal"
        size="xs"
      />
    </div>
  </div>
</template>
