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
        <h2 class="text-xl font-semibold">Codici Evento</h2>
      </template>
      <CodiciEvento />
    </UCard>
  </UContainer>
</template>
