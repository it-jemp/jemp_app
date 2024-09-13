<script setup lang="ts">
const fields = [
  {
    name: 'id_socio',
    type: 'number',
    label: 'ID Socio',
    required: true,
    sortable: true,
  },
  {
    name: "nome",
    type: "string",
    label: "Nome",
    required: true,
  },
  {
    name: "cognome",
    type: "string",
    label: "Cognome",
    required: true,
    sortable: true,
  },
  {
    name: "luogo_nascita",
    type: "string",
    label: "Luogo di nascita",
    required: true,
  },
  {
    name: "data_nascita",
    type: "date",
    label: "Data di nascita",
    required: true,
  },
]
</script>
<template>
  <UContainer>
    <Table :fields="fields" table-name="anagrafica_socio" />
  </UContainer>
</template>
