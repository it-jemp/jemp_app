<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<template>
  <div class="flex flex-col flex-grow">
    <UDashboardPanelContent>
      <iframe
        :src="config.public.kpi.hr"
        frameborder="0"
        class="flex-grow"
        allowtransparency
      />
    </UDashboardPanelContent>
  </div>
</template>
