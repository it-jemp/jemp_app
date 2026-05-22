<script setup lang="ts">
useHead({ title: "KPI Dashboard" })

const tabs = [
  { label: "Audit & IT", slot: "audit_it" },
  { label: "HR", slot: "hr" },
  { label: "Marketing", slot: "marketing" },
  { label: "Commerciale", slot: "commerciale" },
]

type Area = "audit_it" | "hr" | "marketing" | "commerciale"

const activeIdx = ref(0)

const embedUrls = reactive<Record<Area, string | null>>({
  audit_it: null,
  hr: null,
  marketing: null,
  commerciale: null,
})

const errors = reactive<Record<Area, string | null>>({
  audit_it: null,
  hr: null,
  marketing: null,
  commerciale: null,
})

const loading = reactive<Record<Area, boolean>>({
  audit_it: false,
  hr: false,
  marketing: false,
  commerciale: false,
})

async function loadEmbed(area: Area) {
  if (loading[area]) return
  loading[area] = true
  errors[area] = null
  embedUrls[area] = null
  try {
    const data = await $fetch<{ url: string }>(`/api/metabase-embed?area=${area}`)
    embedUrls[area] = data.url
  } catch (err: unknown) {
    const msg =
      err instanceof Error
        ? err.message
        : (err as { data?: { statusMessage?: string } })?.data?.statusMessage ?? String(err)
    errors[area] = msg
  } finally {
    loading[area] = false
  }
}

watch(
  activeIdx,
  (idx) => {
    const area = tabs[idx]?.slot as Area | undefined
    if (area && !embedUrls[area]) loadEmbed(area)
  },
  { immediate: true },
)
</script>

<template>
  <UContainer class="py-4">
    <UTabs :items="tabs" v-model="activeIdx">
      <template #audit_it>
        <KpiDashboardPanel
          area="audit_it"
          :url="embedUrls.audit_it"
          :loading="loading.audit_it"
          :error="errors.audit_it"
          @reload="loadEmbed('audit_it')"
        />
      </template>
      <template #hr>
        <KpiDashboardPanel
          area="hr"
          :url="embedUrls.hr"
          :loading="loading.hr"
          :error="errors.hr"
          @reload="loadEmbed('hr')"
        />
      </template>
      <template #marketing>
        <KpiDashboardPanel
          area="marketing"
          :url="embedUrls.marketing"
          :loading="loading.marketing"
          :error="errors.marketing"
          @reload="loadEmbed('marketing')"
        />
      </template>
      <template #commerciale>
        <KpiDashboardPanel
          area="commerciale"
          :url="embedUrls.commerciale"
          :loading="loading.commerciale"
          :error="errors.commerciale"
          @reload="loadEmbed('commerciale')"
        />
      </template>
    </UTabs>
  </UContainer>
</template>
