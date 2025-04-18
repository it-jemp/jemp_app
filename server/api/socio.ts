import type { ITableSoci } from "@/interfaces/kuntur"
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

  const params = {
    fieldKeyType: "id",
    filter: JSON.stringify({
      conjunction: "and",
      filterSet: [
        {
          fieldId: "fldXnKNqC3jJGgmdREn",
          operator: "is",
          value: user.email,
        },
      ],
    }),
  }

  const url = new URL(
    `https://${config.kuntur.domain}/api/table/${config.kuntur.sociTable}/record`,
  )
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  const soci = await $fetch<ITableSoci>(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${config.kuntur.token}`,
      Accept: "application/json",
    },
  })
  const socio = soci["records"][0]

  return socio
})
