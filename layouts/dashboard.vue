<script setup lang="ts">
const user = useSupabaseUser()

const navigation = [
  { label: "Home", to: "/" },
  ...((await isAdmin()) ? [{ label: "Codici Presenza", to: "/presenze" }] : []),
  {
    label: "Business Card",
    to: "",
    children: [
      {
        label: "Visualizza",
        to: `/bcard/view/${user.value && user.value.id}`,
      },
      {
        label: "Modifica",
        to: "/bcard/edit",
      },
    ],
  },
]
</script>

<template>
  <Html>
    <Body>
      <Body>
        <UHeader :links="navigation" to="/">
          <template #logo>
            <NuxtImg
              class="h-8"
              src="/images/Logo_JEMP.webp"
              alt="JEMP logo"
              height="32"
            />
          </template>

          <template #right>
            <AuthenticationNavigation />
          </template>

          <template #panel>
            <UNavigationTree :links="navigation" />
          </template>
        </UHeader>

        <UMain>
          <slot />
        </UMain>
      </Body>
    </Body>
  </Html>
</template>
