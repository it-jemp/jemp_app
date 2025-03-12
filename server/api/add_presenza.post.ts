import type { ITablePartecipazioni } from "@/interfaces/kuntur"
import { serverSupabaseUser } from "#supabase/server"
import * as Sentry from "@sentry/nuxt"

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const body: {
    id_socio: string
    id_evento: string
    tipologia: string
  } = await readBody(event)

  if (!user) {
    return {
      status: 401,
      body: "Unauthorized",
    }
  }

  const config = useRuntimeConfig(event)

  let tableId = ""
  const fields: {
    "Anagrafica Socio": {
      id: string
    }
    "Riunione Generale"?: {
      id: string
    }
    Evento?: {
      id: string
    }
  } = {
    "Anagrafica Socio": {
      id: body.id_socio,
    },
  }

  if (body.tipologia == "Riunione Generale") {
    tableId = config.kuntur.rgTable
    fields["Riunione Generale"] = {
      id: body.id_evento,
    }
  } else if (body.tipologia == "Evento") {
    tableId = config.kuntur.eventiTable
    fields["Evento"] = {
      id: body.id_evento,
    }
  } else {
    throw createError({
      statusCode: 500,
      statusMessage: "Tipologia Evento non trovata",
    })
  }

  try {
    const partecipazione = await $fetch<ITablePartecipazioni>(
      `https://${config.kuntur.domain}/api/table/${tableId}/record`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.kuntur.token}`,
          Accept: "application/json",
        },
        body: {
          records: [
            {
              fields: fields,
            },
          ],
        },
      },
    )
    return partecipazione
  } catch (error) {
    Sentry.captureException(error)
    return false
  }
})
