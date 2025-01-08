<script setup lang="ts">
const supabase = useSupabaseClient()
const route = useRoute()

const { data: profile } = await useAsyncData("profile", async () => {
  const { data } = await supabase
    .from("business_card")
    .select(
      "nome, cognome, ruolo, email_jemp, numero_cellulare, url_linkedin, avatar_url",
    )
    .eq("id", route.params.id)
    .single()
  return data
})
const isOpen = ref(false)

if (!profile.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  })
}
if (!profile.value.nome || !profile.value.cognome) {
  throw createError({
    statusCode: 404,
    message: "BCard non configurata",
    statusMessage: "Crea la tua BCard prima di visualizzarla",
    fatal: true,
  })
}

definePageMeta({
  layout: "bcard",
})
useHead({
  title: profile.value.nome + " " + profile.value.cognome,
})
</script>

<template>
  <UContainer
    v-if="profile && profile.nome && profile.cognome"
    class="py-24 sm:py-32 flex flex-col gap-6"
  >
    <h2
      class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl flex items-center gap-x-3"
    >
      <UAvatar
        :src="profile.avatar_url ?? ''"
        class="rounded-full"
        :alt="profile.nome + ' ' + profile.cognome"
        size="3xl"
      />
      <div>
        {{ profile.nome + " " + profile.cognome }}
        <p class="text-lg/8 text-gray-600 dark:text-gray-300 font-normal">
          {{ profile.ruolo }}
        </p>
      </div>
    </h2>

    <div class="text-lg/8 flex flex-col gap-5">
      <BcardList
        title="Email"
        :link-title="profile.email_jemp"
        :link="'mailto:' + profile.email_jemp"
        icon="i-heroicons-envelope"
      />
      <BcardList
        v-if="profile.numero_cellulare"
        title="Cellulare"
        :link-title="'+39 ' + profile.numero_cellulare"
        :link="'tel:+39' + profile.numero_cellulare"
        icon="i-heroicons-device-phone-mobile"
      />
      <BcardList
        v-if="profile.url_linkedin"
        title="LinkedIn"
        link-title="Collegati Ora"
        :link="profile.url_linkedin"
        icon="i-mdi-linkedin"
      />
    </div>

    <div class="flex flex-wrap gap-x-3 gap-y-2">
      <UButton icon="i-heroicons-qr-code" @click="isOpen = true" />
      <BcardVCard
        :nome="profile.nome"
        :cognome="profile.cognome"
        :ruolo="profile.ruolo ?? ''"
        :email="profile.email_jemp"
        :cellulare="profile.numero_cellulare ?? ''"
        :url-linkedin="profile.url_linkedin ?? ''"
      />
      <UButton color="gray" to="https://jemp.it">Scopri di più</UButton>
    </div>

    <BcardQRCode v-model="isOpen" />
  </UContainer>
</template>
