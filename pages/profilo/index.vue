<script setup lang="ts">
const { data: profile, error } = await useFetch<{
  Id: number
  "Email Jemp": string
}>("/api/socio")

if (!profile.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Socio non trovato",
    message: "Verificare la mail JEMP in Anagrafica Soci su Kuntur.",
    fatal: true,
  })
}

const admin = await isAdmin()
</script>

<template>
  <div>
    <UDashboardNavbar title="Profilo" />
    <UDashboardPanelContent>
      <div v-if="error">
        <p>Errore durante il caricamento del profilo</p>
      </div>
      <div v-else class="space-y-4">
        <UFormGroup label="ID Socio">
          <p>{{ profile?.Id }}</p>
        </UFormGroup>
        <UFormGroup label="Email Jemp">
          <p>{{ profile?.["Email Jemp"] }}</p>
        </UFormGroup>
        <UFormGroup label="Admin">
          <UIcon v-if="admin" name="i-heroicons-check-circle" class="h-5 w-5" />
          <UIcon v-else name="i-heroicons-x-circle" class="h-5 w-5" />
        </UFormGroup>
      </div>
    </UDashboardPanelContent>
  </div>
</template>
