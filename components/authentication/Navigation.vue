<script setup lang="ts">
const redirectRoute = "/"

async function logout() {
  await navigateTo(redirectRoute)
}
</script>

<template>
  <UDropdown
    :items="[
      [
        {
          label: 'Settings',
          icon: 'i-heroicons-cog-8-tooth',
          to: '/settings',
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
      src="https://avatars.githubusercontent.com/u/739984?v=4"
      alt="Avatar"
    />
  </UDropdown>
</template>
