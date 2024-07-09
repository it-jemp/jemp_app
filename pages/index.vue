<script setup lang="ts">
</script>

<template>
  <UContainer class="flex flex-wrap gap-4 py-4">
    <UCard class="min-w-80 grow">
      <template #header>
        <h2 class="text-xl font-semibold">Registra Presenza</h2>
      </template>
      <RegistraPresenza />
    </UCard>
    <UCard class="min-w-80 grow">
      <template #header>
        <h2 class="text-xl font-semibold">Crea Evento</h2>
      </template>
      <CreaEvento />
    </UCard>
  </UContainer>
</template>
