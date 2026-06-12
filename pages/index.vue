<template>
  <UContainer class="flex flex-wrap gap-4 py-4">
    <UCard class="min-w-80 grow">
      <template #header>
        <h2 class="text-xl font-semibold">Registra Presenza</h2>
      </template>
      <RegistraPresenza />
    </UCard>

    <NuxtLink to="/kpi" class="w-full">
      <UCard class="w-full cursor-pointer hover:ring-2 hover:ring-primary transition-shadow">
        <div class="flex items-center gap-4">
          <UIcon name="i-heroicons-chart-bar" class="text-4xl text-primary shrink-0" />
          <div>
            <h2 class="text-xl font-semibold">Dashboard KPI</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Visualizza le dashboard di Audit & IT, HR, Marketing e Commerciale
            </p>
          </div>
          <UIcon name="i-heroicons-arrow-right" class="ml-auto text-xl text-gray-400" />
        </div>
      </UCard>
    </NuxtLink>

    <NuxtLink to="/eventi" class="w-full">
      <UCard class="w-full cursor-pointer hover:ring-2 hover:ring-primary transition-shadow">
        <div class="flex items-center gap-4">
          <UIcon name="i-heroicons-calendar" class="text-4xl text-primary shrink-0" />
          <div>
            <h2 class="text-xl font-semibold">Eventi Futuri</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Visualizza i prossimi eventi e attività dell'associazione
            </p>
          </div>
          <UIcon name="i-heroicons-arrow-right" class="ml-auto text-xl text-gray-400" />
        </div>
      </UCard>
    </NuxtLink>
  </UContainer>
</template>
