<script setup lang="ts">
import { readableDate } from "@/utilities"

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const { data: jobs } = await useAsyncData("jobs", async () => {
  const { data } = await supabase
    .from("job_offers")
    .select("*")
    .order("created_at", { ascending: false })
  return data
})

async function deleteJob(id: number) {
  const { error } = await supabase.from("job_offers").delete().eq("id", id)
  if (error) {
    toast.add({
      title: "Errore",
      description: error.message,
      icon: "i-heroicons-x-circle-16-solid",
    })
  } else {
    toast.add({
      title: "Successo",
      description: "Offerta di lavoro eliminata con successo",
      icon: "i-heroicons-check-circle-16-solid",
    })
  }
}
</script>

<template>
  <UContainer>
    <UPageHeader
      title="Offerte Di Lavoro"
      description="Panoramica delle offerte di lavoro per i JEMPers."
      :links="[
        {
          to: '/jobs/add',
          target: '_self',
          icon: 'i-heroicons-plus-16-solid',
        },
      ]"
    />
    <UPageBody>
      <UBlogList orientation="horizontal">
        <UBlogPost
          v-for="(post, index) in jobs"
          :key="index"
          :to="'/jobs/' + post.id"
          :title="post.title"
          :description="post.description"
          :date="readableDate(post.created_at)"
          :authors="[{ name: post.poster_name, avatar: {} }]"
          orientation="vertical"
        >
          <div v-if="post.poster_id === user!.id" class="pt-2 space-x-2">
            <UButton
              icon="i-heroicons-pencil-solid"
              size="xs"
              :to="'/jobs/edit/' + post.id"
            />
            <UButton
              icon="i-heroicons-trash-solid"
              size="xs"
              @click="deleteJob(post.id)"
            />
          </div>
        </UBlogPost>
      </UBlogList>
    </UPageBody>
  </UContainer>
</template>
