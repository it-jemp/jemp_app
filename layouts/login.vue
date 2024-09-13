<script setup lang="ts"></script>

<template>
  <Html>
    <Body>
      <Body>
        <UHeader>
          <template #logo>
            <NuxtImg class="h-8" src="/images/Logo_JEMP.webp" alt="JEMP logo" height="32" />
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
