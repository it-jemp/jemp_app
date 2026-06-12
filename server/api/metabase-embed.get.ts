import { createHmac } from "node:crypto"
import { serverSupabaseUser } from "#supabase/server"

const AREAS = ["audit_it", "hr", "marketing", "commerciale"] as const
type Area = (typeof AREAS)[number]

function signMetabaseJwt(payload: object, secret: string): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url")
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const unsigned = `${header}.${body}`
  const signature = createHmac("sha256", secret).update(unsigned).digest("base64url")
  return `${unsigned}.${signature}`
}

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
  }

  const area = getQuery(event).area as Area
  if (!AREAS.includes(area)) {
    throw createError({ statusCode: 400, statusMessage: "Area non valida" })
  }

  const config = useRuntimeConfig(event)
  const { siteUrl, secretKey, dashboardAuditIt, dashboardHr, dashboardMarketing, dashboardCommerciale } =
    config.metabase as {
      siteUrl: string
      secretKey: string
      dashboardAuditIt: string
      dashboardHr: string
      dashboardMarketing: string
      dashboardCommerciale: string
    }

  if (!siteUrl || !secretKey) {
    throw createError({ statusCode: 503, statusMessage: "Metabase non configurato (siteUrl o secretKey mancante)" })
  }

  const dashboardMap: Record<Area, string> = {
    audit_it: dashboardAuditIt,
    hr: dashboardHr,
    marketing: dashboardMarketing,
    commerciale: dashboardCommerciale,
  }

  const dashboardId = Number(dashboardMap[area])
  if (!dashboardId) {
    throw createError({ statusCode: 503, statusMessage: `Dashboard per "${area}" non configurata` })
  }

  const payload = {
    resource: { dashboard: dashboardId },
    params: {},
    exp: Math.round(Date.now() / 1000) + 10 * 60,
  }

  const token = signMetabaseJwt(payload, secretKey)

  return { url: `${siteUrl}/embed/dashboard/${token}#bordered=false&titled=false` }
})
