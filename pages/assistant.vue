<script setup lang="ts">
import type { ChatMessage, ChatResponse } from "@/types/rag"

definePageMeta({ middleware: "auth", layout: false })

useHead({ title: "Assistente" })

interface Message {
  role: "user" | "assistant"
  content: string
  sources?: string[]
  error?: boolean
}

const SUGGESTIONS = [
  { label: "Strategia del board", text: "Qual è la strategia del board?" },
  { label: "KPI commerciali", text: "A che punto sono i KPI commerciali?" },
  { label: "Procedura di iscrizione", text: "Come funziona la procedura di iscrizione?" },
]

const messages = ref<Message[]>([
  {
    role: "assistant",
    content:
      "Ciao! Sono l'assistente interno di JEMP. Posso rispondere a domande sui documenti dell'associazione: strategia, KPI, verbali, procedure. Come posso aiutarti?",
  },
])

const inputMessage = ref("")
const isLoading = ref(false)
const scrollContainer = ref<HTMLElement>()
const textareaRef = ref<{ textarea?: HTMLTextAreaElement } | null>(null)

const isWelcomeState = computed(() => messages.value.length === 1 && !isLoading.value)

async function scrollToBottom() {
  await nextTick()
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
  }
}

async function sendMessage(text?: string) {
  const message = (text ?? inputMessage.value).trim()
  if (!message || isLoading.value) return

  inputMessage.value = ""
  messages.value.push({ role: "user", content: message })
  isLoading.value = true
  await scrollToBottom()

  try {
    const history: ChatMessage[] = messages.value
      .slice(-10)
      .filter((m) => !m.error)
      .map((m) => ({ role: m.role, content: m.content }))

    const response = await $fetch<ChatResponse>("/api/assistant/chat", {
      method: "POST",
      body: { message, history },
    })

    messages.value.push({ role: "assistant", content: response.reply, sources: response.sources })
  } catch (err: unknown) {
    const apiError = err as { data?: { message?: string } }
    messages.value.push({
      role: "assistant",
      content: apiError?.data?.message ?? "Si è verificato un errore. Riprova più tardi.",
      error: true,
    })
  } finally {
    isLoading.value = false
    await scrollToBottom()
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}
</script>

<template>
  <div class="flex flex-col h-dvh bg-white dark:bg-gray-950">
    <!-- Header -->
    <header
      class="shrink-0 flex items-center gap-3 px-4 h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
    >
      <UButton to="/" variant="ghost" color="gray" icon="i-heroicons-arrow-left" size="sm" />
      <div class="flex items-center gap-2.5 flex-1 min-w-0">
        <div
          class="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center shrink-0"
        >
          <UIcon name="i-heroicons-sparkles" class="w-4 h-4 text-gray-900" />
        </div>
        <div class="min-w-0">
          <p class="text-sm font-semibold leading-none text-gray-900 dark:text-white truncate">Assistente JEMP</p>
          <p class="text-xs text-gray-400 mt-0.5 leading-none hidden sm:block">Risponde dai documenti interni</p>
        </div>
      </div>
      <UColorModeButton size="sm" variant="ghost" color="gray" />
    </header>

    <!-- Welcome state -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <div v-if="isWelcomeState" class="flex-1 flex flex-col items-center justify-center px-4 pb-4">
        <div class="w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-6">
          <UIcon name="i-heroicons-sparkles" class="w-9 h-9 text-yellow-500" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Come posso aiutarti?</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm mb-10 leading-relaxed">
          Posso rispondere a domande sui documenti interni di JEMP: strategia, KPI, verbali e procedure.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
          <button
            v-for="s in SUGGESTIONS"
            :key="s.text"
            class="group text-left px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 dark:hover:border-yellow-500 transition-all duration-150 cursor-pointer"
            @click="sendMessage(s.text)"
          >
            <span class="block text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
              {{ s.label }}
            </span>
            <span class="block text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">
              {{ s.text }}
            </span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Chat messages -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
    >
      <div v-if="!isWelcomeState" ref="scrollContainer" class="flex-1 overflow-y-auto">
        <div class="max-w-2xl mx-auto px-4 py-6 space-y-6">
          <template v-for="(msg, index) in messages" :key="index">
            <!-- User message -->
            <div v-if="msg.role === 'user'" class="flex justify-end">
              <div
                class="max-w-[85%] sm:max-w-[70%] bg-yellow-400 text-gray-900 rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed"
              >
                {{ msg.content }}
              </div>
            </div>

            <!-- Assistant message -->
            <div v-else class="flex items-start gap-3">
              <div
                :class="[
                  'w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                  msg.error
                    ? 'bg-red-100 dark:bg-red-900/40'
                    : 'bg-yellow-100 dark:bg-yellow-900/30',
                ]"
              >
                <UIcon
                  :name="msg.error ? 'i-heroicons-exclamation-triangle' : 'i-heroicons-sparkles'"
                  :class="[
                    'w-4 h-4',
                    msg.error ? 'text-red-500' : 'text-yellow-600 dark:text-yellow-400',
                  ]"
                />
              </div>
              <div class="flex-1 min-w-0 pt-0.5">
                <p
                  :class="[
                    'text-sm leading-relaxed whitespace-pre-wrap',
                    msg.error
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-800 dark:text-gray-200',
                  ]"
                >
                  {{ msg.content }}
                </p>
                <div v-if="msg.sources && msg.sources.length > 0" class="flex flex-wrap gap-1.5 mt-2.5">
                  <UBadge
                    v-for="source in msg.sources"
                    :key="source"
                    variant="soft"
                    color="yellow"
                    size="xs"
                    icon="i-heroicons-document-text"
                  >
                    {{ source }}
                  </UBadge>
                </div>
              </div>
            </div>
          </template>

          <!-- Loading indicator -->
          <div v-if="isLoading" class="flex items-start gap-3">
            <div
              class="w-7 h-7 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center shrink-0"
            >
              <UIcon name="i-heroicons-sparkles" class="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div class="flex items-center gap-1 py-2">
              <span class="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce [animation-delay:-0.3s]" />
              <span class="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce [animation-delay:-0.15s]" />
              <span class="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Input area -->
    <div class="shrink-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-3">
      <div class="max-w-2xl mx-auto flex items-end gap-2">
        <UTextarea
          ref="textareaRef"
          v-model="inputMessage"
          :rows="1"
          autoresize
          placeholder="Scrivi un messaggio... (Invio per inviare, Shift+Invio per andare a capo)"
          :disabled="isLoading"
          class="flex-1"
          :ui="{ base: 'resize-none max-h-32 overflow-y-auto' }"
          @keydown="handleKeydown"
        />
        <UButton
          :disabled="isLoading || !inputMessage.trim()"
          icon="i-heroicons-paper-airplane"
          color="primary"
          size="md"
          class="mb-0.5 shrink-0"
          aria-label="Invia messaggio"
          @click="sendMessage()"
        />
      </div>
      <p class="text-center text-xs text-gray-400 mt-2 hidden sm:block">
        L'assistente risponde solo dai documenti interni sincronizzati.
      </p>
    </div>
  </div>
</template>
