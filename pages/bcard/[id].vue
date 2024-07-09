<script setup lang="ts">
import vCardsJS from "vcards-js"
import QrcodeVue from "qrcode.vue"

const route = useRoute()
const url = ref("")
const profile = ref({
  name: "Stefano",
  surname: "Zoni",
  position: "CEO",
  mail: "stefanozoni@jemp.it",
  cell: "+39 3334582801",
  avatar: "https://avatars.githubusercontent.com/u/739984?v=4",
  linkedin: "https://www.linkedin.com/in/stefanozoni/",
})
const isOpen = ref(false)

/* if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  })
} */

definePageMeta({
  layout: "bcard",
})
useHead({
  title: profile.value.name + " " + profile.value.surname + " | JEMP",
})

//create a new vCard
const vCard = vCardsJS()

//set properties
vCard.firstName = profile.value.name
vCard.lastName = profile.value.surname
vCard.organization = "JEMP"
if (profile.value.cell) vCard.cellPhone = profile.value.cell
vCard.title = profile.value.position
vCard.url = "https://jemp.it"
vCard.workAddress.label = "Sede"
vCard.workAddress.street = "Via via via"
vCard.workAddress.city = "Milano"
vCard.workAddress.stateProvince = "MI"
vCard.workAddress.postalCode = "21047"
vCard.workAddress.countryRegion = "Italy"

onMounted(() => {
  const blob = new Blob([vCard.getFormattedString()], { type: "text/vcard" })
  url.value = URL.createObjectURL(blob)
})
</script>

<template>
  <UMain>
    <ULandingSection
      v-if="profile.name"
      :title="profile.name + ' ' + profile.surname"
      align="left"
      :ui="{
        wrapper: 'pb-0 sm:pb-0',
        title: 'flex items-center gap-x-3',
      }"
    >
      <template #title>
        <NuxtImg
          v-if="profile.avatar"
          :src="profile.avatar"
          class="rounded-full"
          alt="Avatar"
          format="webp"
          width="80"
          height="80"
        />
        {{ profile.name + " " + profile.surname }}
      </template>

      <template #description>
        <p class="text-lg/8 text-gray-600 dark:text-gray-300">
          {{ profile.position }}
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
            <a :href="'mailto:' + profile.mail">{{ profile.mail }}</a>
          </dd>
        </div>
        <div v-if="profile.cell" class="relative mt-6 pl-8 leading-7">
          <dt class="font-semibold text-gray-900 dark:text-white">
            <UIcon
              name="i-heroicons-device-phone-mobile"
              class="text-primary absolute left-0 top-1 h-5 w-5"
              aria-hidden="true"
            />
            <span>Cellulare</span>
          </dt>
          <dd class="leading-6 text-gray-500 dark:text-gray-400">
            <a :href="'tel:' + profile.cell">{{ profile.cell }}</a>
          </dd>
        </div>
        <div v-if="profile.linkedin" class="relative mt-6 pl-8 leading-7">
          <dt class="font-semibold text-gray-900 dark:text-white">
            <UIcon
              name="i-mdi-linkedin"
              class="text-primary absolute left-0 top-1 h-5 w-5"
              aria-hidden="true"
            />
            <span>LinkedIn</span>
          </dt>
          <dd class="leading-6 text-gray-500 dark:text-gray-400">
            <a :href="profile.linkedin">{{ profile.name + ' ' + profile.surname }}</a>
          </dd>
        </div>
      </template>
    </ULandingSection>

    <UContainer class="mt-8 flex flex-wrap gap-x-3 gap-y-1.5 pb-24 sm:pb-32">
      <UButton icon="i-heroicons-qr-code" @click="isOpen = true" />
      <UButton
        :to="url"
        :download="profile.name + profile.surname + '.vcf'"
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
          :value="'lmpsaronno.com/' + route.path"
          :size="200"
          level="M"
          render-as="svg"
          class="mx-auto my-2"
        />
      </UCard>
    </UModal>
  </UMain>
</template>