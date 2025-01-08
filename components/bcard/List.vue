<script lang="ts" setup>
const _props = defineProps<{
  title: string
  linkTitle: string
  link: string
  icon: string
}>()
</script>

<template>
  <div class="relative pl-8 leading-7">
    <dt class="font-semibold text-gray-900 dark:text-white">
      <UIcon
        :name="icon"
        class="text-primary absolute left-0 top-1 h-5 w-5"
        aria-hidden="true"
      />
      <span>{{ title }}</span>
    </dt>
    <dd class="leading-6 text-gray-500 dark:text-gray-400">
      <a :href="link">{{ linkTitle }}</a>
    </dd>
  </div>
</template>
