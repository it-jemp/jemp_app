import { Api } from "nocodb-sdk"
import { serverSupabaseUser } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const body: {
    id_socio: number
    id_evento: number
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
  const data: {
    anagrafica_socio_id: number
    riunione_generale_id?: number
    evento_id?: number
  } = {
    anagrafica_socio_id: body.id_socio,
  }

  if (body.tipologia == "Riunione Generale") {
    tableId = config.kuntur.rgTable
    data.riunione_generale_id = body.id_evento
  } else if (body.tipologia == "Evento") {
    tableId = config.kuntur.eventiTable
    data.evento_id = body.id_evento
  }

  const api = new Api({
    baseURL: `https://${config.kuntur.domain}`,
    headers: {
      "xc-token": `${config.kuntur.token}`,
    },
  })

  try {
    const partecipazione = await api.dbTableRow.create(
      "noco",
      config.kuntur.base,
      tableId,
      data,
    )
    return partecipazione
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Errore durante l'aggiunta della presenza a Kuntur",
    })
  }
})
