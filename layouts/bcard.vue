<script setup lang="ts">
</script>

<template>
  <Html>
    <Body>
      <Body>
        <UHeader :links="navigation" to="/">
          <template #logo>
            JEMP
            <UBadge label="beta" variant="subtle" />
          </template>
        </UHeader>
        <UMain>
          <slot />
        </UMain>
        <UFooter>
          <template #left>
            Copyright © {{ new Date().getFullYear() }}. V 0.0.1
          </template>
          <template #right>
            <UColorModeButton />
          </template>
        </UFooter>
      </Body>
    </Body>
  </Html>
</template>
