<script setup lang="ts">
const user = useSupabaseUser()
const toast = useToast()

definePageMeta({
  layout: "login",
})

watch(
  user,
  () => {
    if (user.value) {
      if (
        Math.abs(
          new Date().getTime() - new Date(user.value.created_at).getTime(),
        ) <=
        60 * 1000 // 1 minute
      ) {
        toast.add({
          title: "Benvenuto!",
          icon: "i-heroicons-check-circle-16-solid",
          description: "Completa il tuo profilo.",
        })
        return navigateTo("/settings/profile")
      } else {
        toast.add({
          title: "Bentornato!",
          icon: "i-heroicons-check-circle-16-solid",
          description: "Login effettuato con successo",
        })
        return navigateTo("/")
      }
    }
  },
  { immediate: true },
)
</script>

<template>
  <UContainer class="py-4">Waiting for login...</UContainer>
</template>
