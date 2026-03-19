const rateLimitStore = new Map<string, number>()

export function enforceRateLimit(key: string, windowMs: number) {
  const now = Date.now()
  const nextAllowedAt = rateLimitStore.get(key) ?? 0

  if (nextAllowedAt > now) {
    const retryAfterMs = nextAllowedAt - now

    throw createError({
      statusCode: 429,
      statusMessage: `Attendi ${Math.ceil(retryAfterMs / 1000)} secondi prima di riprovare.`,
    })
  }

  rateLimitStore.set(key, now + windowMs)
}
