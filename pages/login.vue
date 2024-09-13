<script setup lang="ts">
const supabase = useSupabaseClient()

definePageMeta({
  layout: "login",
})

const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

const signInGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectTo,
    },
  })
  if (error) console.log(error)
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
        },
      ]"
    />
  </UContainer>
</template>
