<script setup lang="ts">
import { readableDate } from "@/utilities"

useHead({
  title: "Eventi Futuri",
})

interface Evento {
  id: string
  nome: string
  tipologia: string
  target: string
  costo: number
  data: string
  durata: number
  numeroIscritti: number
  competenze: string[]
}

const search = ref("")
const selectedTipologia = ref("Tutte")
const selectedTarget = ref("Tutti")

// Fetch events from our secure API
const { data: eventi, pending, error, refresh } = await useFetch<Evento[]>("/api/eventi-futuri")

// Options for filter menus
const tipologieOptions = computed(() => {
  if (!eventi.value) return ["Tutte"]
  const list = new Set(eventi.value.map((e) => e.tipologia).filter(Boolean))
  return ["Tutte", ...Array.from(list)]
})

const targetOptions = computed(() => {
  if (!eventi.value) return ["Tutti"]
  const list = new Set(eventi.value.map((e) => e.target).filter(Boolean))
  return ["Tutti", ...Array.from(list)]
})

// Filtered and searched events
const filteredEventi = computed(() => {
  if (!eventi.value) return []
  return eventi.value.filter((e) => {
    const matchesSearch = e.nome.toLowerCase().includes(search.value.toLowerCase())
    const matchesTipologia =
      selectedTipologia.value === "Tutte" || e.tipologia === selectedTipologia.value
    const matchesTarget =
      selectedTarget.value === "Tutti" || e.target === selectedTarget.value
    return matchesSearch && matchesTipologia && matchesTarget
  })
})

// Format time from ISO date string
function formatTime(dateStr: string): string {
  if (!dateStr) return ""
  try {
    const d = new Date(dateStr)
    return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
  } catch {
    return ""
  }
}

// Function to map target tags to colors
function getTargetColor(target: string): string {
  const colors: Record<string, string> = {
    Tutti: "gray",
    Alumni: "indigo",
    Board: "red",
    "Audit & IT": "blue",
    Commerciale: "green",
    HR: "pink",
    "M&C": "orange",
    Network: "purple",
    Selezionati: "yellow",
    Studenti: "cyan",
  }
  return colors[target] || "primary"
}

// Function to map event types to colors
function getTipologiaColor(tipologia: string): string {
  const colors: Record<string, string> = {
    "Formazione JEMPers": "blue",
    "Formazione JEMPerini": "cyan",
    Workshop: "orange",
    "Evento Network": "purple",
    Teambuilding: "rose",
    "Evento Commerciale": "green",
    "Evento Recruitment": "emerald",
    "Evento Politecnico": "amber",
    "Evento Alumni": "violet",
    "Assemblea Generale": "indigo",
  }
  return colors[tipologia] || "primary"
}
</script>

<template>
  <UContainer class="py-6 max-w-5xl">
    <div class="flex flex-col gap-6">
      <!-- Header -->
      <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Prossimi Eventi
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Esplora le attività, le formazioni e i teambuilding proposti dall'associazione
          </p>
        </div>
        <UButton
          v-if="!pending"
          icon="i-heroicons-arrow-path"
          variant="ghost"
          color="gray"
          @click="refresh"
        >
          Aggiorna
        </UButton>
      </div>

      <!-- Filters Row -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <UInput
          v-model="search"
          icon="i-heroicons-magnifying-glass"
          placeholder="Cerca evento..."
          class="w-full"
        />
        <USelectMenu
          v-model="selectedTipologia"
          :options="tipologieOptions"
          icon="i-heroicons-tag"
          placeholder="Filtra per Tipologia"
        />
        <USelectMenu
          v-model="selectedTarget"
          :options="targetOptions"
          icon="i-heroicons-user-group"
          placeholder="Filtra per Target"
        />
      </div>

      <!-- Pending Loading State -->
      <div v-if="pending" class="flex flex-col gap-4">
        <UCard v-for="i in 3" :key="i" class="w-full">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div class="flex flex-col gap-2 grow">
              <USkeleton class="h-6 w-1/3" />
              <USkeleton class="h-4 w-2/3" />
            </div>
            <div class="flex gap-2 sm:self-center">
              <USkeleton class="h-6 w-16" />
              <USkeleton class="h-6 w-16" />
            </div>
          </div>
        </UCard>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex flex-col items-center justify-center gap-4 py-12">
        <UAlert
          color="red"
          variant="soft"
          title="Errore di caricamento"
          :description="error.statusMessage || 'Impossibile caricare gli eventi'"
          icon="i-heroicons-exclamation-triangle"
          class="max-w-xl"
        />
        <UButton icon="i-heroicons-arrow-path" variant="solid" color="red" @click="refresh">
          Riprova
        </UButton>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="filteredEventi.length === 0"
        class="flex flex-col items-center justify-center gap-2 py-16 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl"
      >
        <UIcon name="i-heroicons-calendar-days" class="text-5xl text-gray-400 dark:text-gray-600 mb-2" />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Nessun evento trovato</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
          Non ci sono eventi futuri attivi che corrispondono ai filtri selezionati.
        </p>
      </div>

      <!-- Events List -->
      <div v-else class="flex flex-col gap-4">
        <UCard
          v-for="evento in filteredEventi"
          :key="evento.id"
          class="group hover:ring-2 hover:ring-primary transition-all duration-300"
        >
          <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <!-- Event Details -->
            <div class="flex flex-col gap-3 grow">
              <div>
                <div class="flex flex-wrap items-center gap-2 mb-2">
                  <UBadge :color="getTipologiaColor(evento.tipologia)" variant="subtle">
                    {{ evento.tipologia }}
                  </UBadge>
                  <UBadge :color="getTargetColor(evento.target)" variant="solid">
                    {{ evento.target }}
                  </UBadge>
                </div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  {{ evento.nome }}
                </h2>
              </div>

              <!-- Quick Info Row -->
              <div class="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span class="flex items-center gap-1.5">
                  <UIcon name="i-heroicons-calendar" class="text-lg text-primary" />
                  {{ readableDate(evento.data) }} alle {{ formatTime(evento.data) }}
                </span>
                <span class="flex items-center gap-1.5">
                  <UIcon name="i-heroicons-clock" class="text-lg text-primary" />
                  {{ evento.durata }} ore
                </span>
                <span class="flex items-center gap-1.5">
                  <UIcon name="i-heroicons-currency-euro" class="text-lg text-primary" />
                  <span v-if="evento.costo === 0" class="font-medium text-green-600 dark:text-green-400">Gratuito</span>
                  <span v-else>{{ evento.costo }}€</span>
                </span>
                <span class="flex items-center gap-1.5">
                  <UIcon name="i-heroicons-users" class="text-lg text-primary" />
                  {{ evento.numeroIscritti }} iscritti
                </span>
              </div>

              <!-- Competencies tags -->
              <div v-if="evento.competenze && evento.competenze.length > 0" class="flex flex-wrap gap-1.5 mt-2">
                <span
                  v-for="comp in evento.competenze"
                  :key="comp"
                  class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-900/50"
                >
                  {{ comp }}
                </span>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
