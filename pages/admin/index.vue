<script setup lang="ts">
import type { IngestResult, IngestionLog } from "@/types/rag"

definePageMeta({ middleware: "auth" })

const user = useSupabaseUser()
const supabaseClient = useSupabaseClient()

const isUnauthorized = ref(false)
const totalChunks = ref(0)
const lastSync = ref<IngestionLog | null>(null)
const statsLoading = ref(true)

const isSyncing = ref(false)
const syncResult = ref<IngestResult | null>(null)
const syncError = ref<string | null>(null)

async function loadStats() {
  statsLoading.value = true
  try {
    const data = await $fetch<{ total_chunks: number; last_sync: IngestionLog | null }>("/api/assistant/stats")
    totalChunks.value = data.total_chunks
    lastSync.value = data.last_sync
  } catch (err: unknown) {
    const apiErr = err as { status?: number; data?: { statusCode?: number } }
    if (apiErr?.status === 403 || apiErr?.data?.statusCode === 403) {
      isUnauthorized.value = true
    } else {
      console.error("Errore caricamento statistiche", err)
    }
  } finally {
    statsLoading.value = false
  }
}

async function syncDocuments() {
  isSyncing.value = true
  syncResult.value = null
  syncError.value = null
  try {
    const result = await $fetch<IngestResult>("/api/assistant/ingest", { method: "POST" })
    syncResult.value = result
    await loadStats()
  } catch (err: unknown) {
    const apiErr = err as { data?: { message?: string } }
    syncError.value = apiErr?.data?.message ?? "Errore durante la sincronizzazione"
    console.error("Errore sincronizzazione", err)
  } finally {
    isSyncing.value = false
  }
}

async function logout() {
  await supabaseClient.auth.signOut()
  await navigateTo("/login")
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "—"
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(dateStr))
}

function syncStatusColor(status: IngestionLog["status"] | undefined): "green" | "red" | "yellow" {
  if (status === "completed") return "green"
  if (status === "failed") return "red"
  return "yellow"
}

function syncStatusLabel(status: IngestionLog["status"] | undefined): string {
  if (status === "completed") return "completata"
  if (status === "failed") return "fallita"
  return "in corso"
}

onMounted(loadStats)
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
    <div v-if="isUnauthorized" class="max-w-lg mx-auto mt-20 text-center">
      <UCard>
        <p class="text-gray-600 dark:text-gray-400 mb-4">Non hai i permessi per accedere a questa pagina.</p>
        <UButton to="/" variant="link">Torna alla home</UButton>
      </UCard>
    </div>

    <template v-else>
      <div class="max-w-3xl mx-auto space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Pannello Amministratore</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{{ user?.email }}</p>
          </div>
          <UButton variant="ghost" icon="i-heroicons-arrow-right-on-rectangle" color="gray" @click="logout">
            Esci
          </UButton>
        </div>

        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Knowledge Base</h2>
              <UButton to="/assistant" variant="link" trailing-icon="i-heroicons-arrow-right"> Apri assistente </UButton>
            </div>
          </template>

          <div v-if="statsLoading" class="flex justify-center py-8">
            <UIcon name="i-heroicons-arrow-path" class="animate-spin w-6 h-6 text-gray-400" />
          </div>

          <template v-else>
            <dl class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <dt class="text-sm text-gray-500 dark:text-gray-400">Chunk indicizzati</dt>
                <dd class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ totalChunks }}</dd>
              </div>
              <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <dt class="text-sm text-gray-500 dark:text-gray-400">Ultima sincronizzazione</dt>
                <dd class="text-sm font-medium text-gray-900 dark:text-white mt-1">
                  {{ formatDate(lastSync?.started_at) }}
                </dd>
              </div>
              <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <dt class="text-sm text-gray-500 dark:text-gray-400">Stato ultima sync</dt>
                <dd class="mt-1">
                  <UBadge v-if="lastSync" :color="syncStatusColor(lastSync.status)" variant="soft">
                    {{ syncStatusLabel(lastSync.status) }}
                  </UBadge>
                  <span v-else class="text-sm text-gray-400">—</span>
                </dd>
              </div>
            </dl>

            <UButton
              :loading="isSyncing"
              :disabled="isSyncing"
              icon="i-heroicons-arrow-path"
              @click="syncDocuments"
            >
              {{ isSyncing ? "Sincronizzazione in corso..." : "Sincronizza documenti" }}
            </UButton>

            <UAlert
              v-if="syncResult"
              class="mt-4"
              color="green"
              icon="i-heroicons-check-circle"
              title="Sincronizzazione completata"
            >
              <template #description>
                <ul class="text-sm space-y-0.5 mt-1">
                  <li>File processati: {{ syncResult.files_processed }}</li>
                  <li>Chunk inseriti: {{ syncResult.chunks_inserted }}</li>
                  <li>Durata: {{ syncResult.duration_ms }}ms</li>
                  <li v-if="syncResult.errors.length > 0">
                    Errori ({{ syncResult.errors.length }}):
                    <ul class="list-disc ml-4 mt-1">
                      <li v-for="err in syncResult.errors" :key="err">{{ err }}</li>
                    </ul>
                  </li>
                </ul>
              </template>
            </UAlert>

            <UAlert
              v-if="syncError"
              class="mt-4"
              color="red"
              icon="i-heroicons-exclamation-circle"
              title="Errore di sincronizzazione"
              :description="syncError"
            />
          </template>
        </UCard>
      </div>
    </template>
  </div>
</template>
