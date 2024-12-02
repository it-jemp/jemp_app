<script lang="ts" setup>
const props = defineProps<{
  nome: string
  cognome: string
  ruolo: string
  email: string
  cellulare: string
  urlLinkedin: string
}>()
const url = ref("")

const vCard = `
BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:${props.nome} ${props.cognome}
N;CHARSET=UTF-8:${props.cognome};${props.nome};;;
EMAIL;CHARSET=UTF-8;type=WORK,INTERNET:${props.email}
TEL;TYPE=CELL:+39${props.cellulare}
LABEL;CHARSET=UTF-8;TYPE=WORK:Ufficio
ADR;CHARSET=UTF-8;TYPE=WORK:;;Via Lario 8;Milano;MI;20159;Italy
TITLE;CHARSET=UTF-8:${props.ruolo}
ROLE;CHARSET=UTF-8:Ruolo
ORG;CHARSET=UTF-8:JEMP
URL;type=WORK;CHARSET=UTF-8:https://jemp.it
X-SOCIALPROFILE;TYPE=linkedin:${props.urlLinkedin}
END:VCARD
`

onMounted(() => {
  const blob = new Blob([vCard], { type: "text/vcard" })
  url.value = URL.createObjectURL(blob)
})
</script>

<template>
  <UButton :to="url" :download="'A.vcf'" icon="i-heroicons-arrow-down-tray">
    Aggiungi ai Contatti
  </UButton>
</template>
