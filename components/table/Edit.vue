<script setup lang="ts">
const props = defineProps<{
  tableName: string
  fields: {
    name: string
    type: string
    label: string
    required: boolean
  }[]
  columnId: string
  identifier: string | number
}>()
const isOpen = defineModel<boolean>()
</script>

<template>
  <div>
    <UModal v-model="isOpen" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Modifica ID {{ identifier }}
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div> </template
        >
        <FormEdit
          :table-name="tableName"
          :fields="props.fields"
          :column-id="columnId"
          :identifier="identifier"
        />
      </UCard>
    </UModal>
  </div>
</template>
