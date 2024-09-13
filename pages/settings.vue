<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
})

const links = [
  {
    label: "Home",
    icon: "i-heroicons-home",
    to: "/settings",
    exact: true,
  },
  {
    label: "Anagrafica Socio",
    icon: "i-heroicons-user",
    to: "/settings/profile",
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
          V 0.0.1
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
