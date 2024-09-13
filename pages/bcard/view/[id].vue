<script setup lang="ts">
import vCardsJS from "vcards-js"
import QrcodeVue from "qrcode.vue"

const supabase = useSupabaseClient()

const route = useRoute()
const url = ref("")

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

definePageMeta({
  layout: "bcard",
})
useHead({
  title: profile.value.nome + " " + profile.value.cognome + " | JEMP",
})

//create a new vCard
const vCard = vCardsJS()

//set properties
vCard.firstName = profile.value.nome
vCard.lastName = profile.value.cognome
vCard.organization = "JEMP"
if (profile.value.numero_cellulare)
  vCard.cellPhone = profile.value.numero_cellulare
vCard.title = profile.value.ruolo
vCard.email = profile.value.email_jemp
vCard.url = "https://jemp.it"
vCard.workAddress.label = "Sede"
vCard.workAddress.street = "Via Lario 8"
vCard.workAddress.city = "Milano"
vCard.workAddress.stateProvince = "MI"
vCard.workAddress.postalCode = "20159"
vCard.workAddress.countryRegion = "Italy"
vCard.photo.attachFromUrl(profile.value.avatar_url)
vCard.socialUrls["linkedIn"] = profile.value.url_linkedin

onMounted(() => {
  const blob = new Blob([vCard.getFormattedString()], { type: "text/vcard" })
  url.value = URL.createObjectURL(blob)
})
</script>

<template>
  <UMain v-if="profile && profile.nome && profile.cognome">
    <ULandingSection
      :title="profile.nome + ' ' + profile.cognome"
      align="left"
      :ui="{
        wrapper: 'pb-0 sm:pb-0',
        title: 'flex items-center gap-x-3',
      }"
    >
      <template #title>
        <UAvatar
          :src="profile.avatar_url || ''"
          class="rounded-full"
          :alt="profile.nome + ' ' + profile.cognome"
          size="3xl"
        />
        {{ profile.nome + " " + profile.cognome }}
      </template>

      <template #description>
        <p class="text-lg/8 text-gray-600 dark:text-gray-300">
          {{ profile.ruolo }}
        </p>
        <div class="relative mt-6 pl-8 leading-7">
          <dt class="font-semibold text-gray-900 dark:text-white">
            <UIcon
              name="i-heroicons-envelope"
              class="text-primary absolute left-0 top-1 h-5 w-5"
              aria-hidden="true"
            />
            <span>Email</span>
          </dt>
          <dd class="leading-6 text-gray-500 dark:text-gray-400">
            <a :href="'mailto:' + profile.email_jemp">{{
              profile.email_jemp
            }}</a>
          </dd>
        </div>
        <div
          v-if="profile.numero_cellulare"
          class="relative mt-6 pl-8 leading-7"
        >
          <dt class="font-semibold text-gray-900 dark:text-white">
            <UIcon
              name="i-heroicons-device-phone-mobile"
              class="text-primary absolute left-0 top-1 h-5 w-5"
              aria-hidden="true"
            />
            <span>Cellulare</span>
          </dt>
          <dd class="leading-6 text-gray-500 dark:text-gray-400">
            <a :href="'tel:' + profile.numero_cellulare">{{
              profile.numero_cellulare
            }}</a>
          </dd>
        </div>
        <div v-if="profile.url_linkedin" class="relative mt-6 pl-8 leading-7">
          <dt class="font-semibold text-gray-900 dark:text-white">
            <UIcon
              name="i-mdi-linkedin"
              class="text-primary absolute left-0 top-1 h-5 w-5"
              aria-hidden="true"
            />
            <span>LinkedIn</span>
          </dt>
          <dd class="leading-6 text-gray-500 dark:text-gray-400">
            <a :href="profile.url_linkedin">Collegati Ora</a>
          </dd>
        </div>
      </template>
    </ULandingSection>

    <UContainer class="mt-8 flex flex-wrap gap-x-3 gap-y-1.5 pb-24 sm:pb-32">
      <UButton icon="i-heroicons-qr-code" @click="isOpen = true" />
      <UButton
        :to="url"
        :download="profile.nome + profile.cognome + '.vcf'"
        icon="i-heroicons-arrow-down-tray"
      >
        Aggiungi ai Contatti
      </UButton>
      <UButton color="gray" to="https://jemp.it">Scopri di più</UButton>
    </UContainer>

    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            @click="isOpen = false"
          />
        </template>
        <QrcodeVue
          :value="'jemp-app.vercel.app' + route.path"
          :size="200"
          level="M"
          render-as="svg"
          class="mx-auto my-2"
        />
      </UCard>
    </UModal>
  </UMain>
</template>
