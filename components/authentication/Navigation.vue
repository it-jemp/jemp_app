<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  location.reload()
  if (error) {
    toast.add({
      title: "Errore",
      description: error.message,
      icon: "i-heroicons-x-circle-solid",
    })
  } else {
    toast.add({
      title: "Successo",
      description: "Logout effettuato con successo",
      icon: "i-heroicons-check-circle-solid",
    })
  }
}
</script>

<template>
  <UDropdown
    :items="[
      [
        {
          label: 'Profilo',
          icon: 'i-heroicons-user',
          to: '/profilo',
        },
      ],
      [
        {
          label: 'Logout',
          icon: 'i-heroicons-arrow-right-end-on-rectangle',
          click: logout,
        },
      ],
    ]"
  >
    <UAvatar
      :src="user && user.user_metadata.avatar_url"
      :alt="user && user.user_metadata.full_name"
    />
  </UDropdown>
</template>
