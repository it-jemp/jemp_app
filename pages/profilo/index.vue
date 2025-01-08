<script setup lang="ts">
import type { ISocio } from "@/interfaces/kuntur"

const { data: profile, error } = await useFetch<ISocio>("/api/socio")

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
        <UFormGroup label="Nome Cognome">
          <p>{{ profile?.fields["Nome Cognome"] }}</p>
        </UFormGroup>
        <UFormGroup label="Email Jemp">
          <p>{{ profile?.fields["Email Jemp"] }}</p>
        </UFormGroup>
        <UFormGroup label="Admin">
          <UIcon v-if="admin" name="i-heroicons-check-circle" class="h-5 w-5" />
          <UIcon v-else name="i-heroicons-x-circle" class="h-5 w-5" />
        </UFormGroup>
      </div>
    </UDashboardPanelContent>
  </div>
</template>
