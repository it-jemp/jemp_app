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
      icon: "i-heroicons-x-circle-16-solid",
    })
  } else {
    toast.add({
      title: "Successo",
      description: "Anagrafica modificata con successo",
      icon: "i-heroicons-check-circle-16-solid",
    })
  }
}
</script>

<template>
  <UDropdown
    :items="[
      [
        {
          label: 'Logout',
          icon: 'i-heroicons-arrow-right-end-on-rectangle',
          click: logout,
        },
      ],
      [
        {
          label: 'Settings',
          icon: 'i-heroicons-cog-8-tooth',
          to: '/settings',
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
