import { Api } from "nocodb-sdk"
import { serverSupabaseUser } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    return {
      status: 401,
      body: "Unauthorized",
    }
  }

  const config = useRuntimeConfig(event)

  const api = new Api({
    baseURL: `https://${config.kuntur.domain}`,
    headers: {
      "xc-token": `${config.kuntur.token}`,
    },
  })

  const socio = await api.dbTableRow.findOne(
    "noco",
    config.kuntur.base,
    config.kuntur.sociTable,
    {
      fields: ["Id", "Email Jemp"],
      where: `(Email Jemp,eq,${user.email})`,
    },
  )

  return socio
})
