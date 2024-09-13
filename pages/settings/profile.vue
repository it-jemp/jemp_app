<script setup lang="ts">
const user = useSupabaseUser()

const fields = [
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
  {
    name: "sesso",
    type: "string",
    label: "Sesso",
    required: true,
  },
  {
    name: "codice_fiscale",
    type: "string",
    label: "Codice fiscale",
    required: true,
  },
  {
    name: "indirizzo_residenza",
    type: "string",
    label: "Indirizzo di residenza",
    required: true,
  },
  {
    name: "provincia_residenza",
    type: "string",
    label: "Provincia di residenza",
    required: true,
  },
  {
    name: "indirizzo_domicilio",
    type: "string",
    label: "Indirizzo di domicilio",
    required: true,
  },
  {
    name: "email_personale",
    type: "string",
    label: "Email personale",
    required: true,
  },
  {
    name: "numero_cellulare",
    type: "string",
    label: "Numero di cellulare",
    required: true,
  },
  {
    name: "email_jemp",
    type: "string",
    label: "Email JEMP",
    required: true,
  },
  {
    name: "data_entrata",
    type: "date",
    label: "Data di entrata",
    required: true,
  },
  {
    name: "anno_corso",
    type: "string",
    label: "Anno di corso",
    required: true,
  },
  {
    name: "matricola",
    type: "string",
    label: "Matricola",
    required: true,
  },
]
</script>

<template>
  <UDashboardNavbar title="Anagrafica Socio" />
  <UDashboardPanelContent>
    <FormEdit table-name="anagrafica_socio" :fields="fields" column-id="auth_id" :identifier="user!.id" />
  </UDashboardPanelContent>
</template>
