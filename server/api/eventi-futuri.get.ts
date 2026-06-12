import { serverSupabaseUser } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    })
  }

  const config = useRuntimeConfig(event)
  const token = config.kuntur.token
  const domain = "tea.kuntur.ovh"
  const tableId = "tbloOPaDAPr52sqZv5o"

  if (!token) {
    throw createError({
      statusCode: 503,
      statusMessage: "Configurazione Teable mancante (Token non configurato)",
    })
  }

  // Filter for future events only (Data > yesterday)
  const filter = JSON.stringify({
    conjunction: "and",
    filterSet: [
      {
        fieldId: "Data",
        operator: "isAfter",
        value: {
          mode: "yesterday",
          timeZone: "Europe/Rome",
        },
      },
    ],
  })

  // Order events by date ascending (soonest event first)
  const orderBy = JSON.stringify([
    {
      fieldId: "Data",
      order: "asc",
    },
  ])

  const url = new URL(`https://${domain}/api/table/${tableId}/record`)
  url.searchParams.append("fieldKeyType", "name")
  url.searchParams.append("viewId", "viwLUGLyWEmCbAX2Dm9")
  url.searchParams.append("cellFormat", "json")
  url.searchParams.append("filter", filter)
  url.searchParams.append("orderBy", orderBy)

  try {
    const data = await $fetch<{
      records: Array<{
        id: string
        fields: {
          Nome?: string
          Tipologia?: string
          Target?: string
          Costo?: number
          Data?: string
          Durata?: number
          "Numero Iscritti"?: number
          Competenze?: string[]
        }
      }>
    }>(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })

    return data.records.map((record) => ({
      id: record.id,
      nome: record.fields["Nome"] ?? "",
      tipologia: record.fields["Tipologia"] ?? "",
      target: record.fields["Target"] ?? "Tutti",
      costo: record.fields["Costo"] ?? 0,
      data: record.fields["Data"] ?? "",
      durata: record.fields["Durata"] ?? 0,
      numeroIscritti: record.fields["Numero Iscritti"] ?? 0,
      competenze: record.fields["Competenze"] ?? [],
    }))
  } catch (error: unknown) {
    const err = error as {
      statusCode?: number
      data?: { statusMessage?: string }
      message?: string
    }
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage:
        err.data?.statusMessage ||
        err.message ||
        "Impossibile recuperare gli eventi da Teable",
    })
  }
})
