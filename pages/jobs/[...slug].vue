<script setup lang="ts">
const route = useRoute()
const supabase = useSupabaseClient()

const { data: job } = await useAsyncData("job", async () => {
  const { data } = await supabase
    .from("job_offers")
    .select("*")
    .eq("id", route.params.slug[0])
    .single()
  return data
})

if (!job.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  })
}
</script>

<template>
  <UContainer v-if="job">
    <UPageHeader :title="job.title" :description="job.description" />
    <UPage>
      <UPageBody prose>
        <MDC :value="job.content" />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
