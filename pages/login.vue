<script setup lang="ts">
const supabase = useSupabaseClient()
const toast = useToast()

definePageMeta({
  layout: "login",
})
useHead({
  title: "Login",
})

const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

const signInGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectTo,
    },
  })
  if (error) {
    toast.add({
      title: "Errore",
      description: error.message,
      icon: "i-heroicons-x-circle-solid",
    })
  }
}
</script>

<template>
  <UContainer class="py-4">
    <UAuthForm
      class="mx-auto"
      title="Login"
      :providers="[
        {
          label: 'Google',
          click: signInGoogle,
          icon: 'i-mdi-google',
        },
      ]"
    />
  </UContainer>
</template>
