<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
})
useHead({
  title: "KPI",
})

const links = [
  {
    label: "HR",
    icon: "i-heroicons-users",
    to: "/kpi/hr",
    exact: true,
  },
]
</script>

<template>
  <UDashboardLayout class="relative h-[calc(100vh-var(--header-height))]">
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardSidebar>
        <UDashboardSidebarLinks :links="links" />
        <template #footer>
          <p>Version: {{ useRuntimeConfig().public.appVersion }}</p>
          <UColorModeButton />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>
    <UDashboardPage>
      <UDashboardPanel grow>
        <NuxtPage />
      </UDashboardPanel>
    </UDashboardPage>
  </UDashboardLayout>
</template>
