<script setup lang="ts">
import type { DashboardSidebarLink } from "@nuxt/ui-pro/types"

definePageMeta({
  layout: "dashboard",
})

const RBAC = useRBAC()

const { data: nav } = await useAsyncData("navigation", () =>
  fetchContentNavigation(queryContent("/db")),
)
const navigation = nav.value?.[0].children?.filter((e) => {
  if (e.children) {
    e.children = e.children.filter((e) => !RBAC.isRestrictedTable(e.table))
    return e.children.length > 0
  }
  return !RBAC.isRestrictedTable(e.table)
}) as unknown as DashboardSidebarLink[]
</script>

<template>
  <UDashboardLayout class="relative h-[calc(100vh-var(--header-height))]">
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardSidebar>
        <UDashboardSidebarLinks :links="navigation" />
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
