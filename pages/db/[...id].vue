<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData("page", () =>
  queryContent(route.path).findOne(),
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  })
}
</script>

<template>
  <UDashboardNavbar :title="page.title" />
  <UDashboardPanelContent>
    <Table :table-name="page.navigation.table" :fields="page.fields" />
  </UDashboardPanelContent>
</template>
