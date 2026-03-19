import type { ITablePartecipazioni } from "@/interfaces/kuntur"
import { serverSupabaseUser } from "#supabase/server"
import * as Sentry from "@sentry/nuxt"
import {
  dedupeTeableWrite,
  enqueueTeableWrite,
} from "../utils/teableWriteQueue"
import { enforceRateLimit } from "../utils/rateLimit"

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isRetryableTeableError(error: unknown) {
  if (!(error instanceof Error)) {
    return false
  }

  const message = error.message.toLowerCase()

  return (
    message.includes("deadlock") ||
    message.includes("unable to start a transaction") ||
    message.includes("timeout") ||
    message.includes("service unavailable")
  )
}

async function withRetry<T>(action: () => Promise<T>, maxRetries = 4) {
  let attempt = 0

  while (true) {
    try {
      return await action()
    } catch (error) {
      if (!isRetryableTeableError(error) || attempt >= maxRetries) {
        throw error
      }

      const delay = 500 * 2 ** attempt + Math.floor(Math.random() * 250)
      attempt++
      await wait(delay)
    }
  }
}

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const body: {
    id_socio: string
    id_evento: string
    tipologia: string
  } = await readBody(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    })
  }

  enforceRateLimit(`add_presenza:${user.id}`, 3000)

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

  async function registerPartecipazione() {
    return $fetch<ITablePartecipazioni>(
      `https://${config.kuntur.domain}/api/table/${tableId}/record`,
      {
        method: "POST",
        timeout: 10_000,
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
  }

  try {
    const requestKey = [tableId, body.id_socio, body.id_evento].join(":")

    const partecipazione = await dedupeTeableWrite(requestKey, () =>
      enqueueTeableWrite(() => withRetry(registerPartecipazione)),
    )

    if (!partecipazione) {
      Sentry.captureException(new Error("Failed to register partecipazione"), {
        extra: {
          body,
          user,
          tableId,
          fields,
        },
      })
    }

    return partecipazione
  } catch (error) {
    Sentry.captureException(error, {
      extra: {
        body,
        tableId,
        fields,
      },
    })
    return false
  }
})
