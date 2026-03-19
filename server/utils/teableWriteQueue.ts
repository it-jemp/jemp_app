let teableWriteQueue = Promise.resolve()
const inFlightRequests = new Map<string, Promise<unknown>>()

export function enqueueTeableWrite<T>(task: () => Promise<T>): Promise<T> {
  const run = teableWriteQueue.then(task, task)

  teableWriteQueue = run.then(
    () => undefined,
    () => undefined,
  )

  return run
}

export function dedupeTeableWrite<T>(
  key: string,
  task: () => Promise<T>,
): Promise<T> {
  const existing = inFlightRequests.get(key)

  if (existing) {
    return existing as Promise<T>
  }

  const run = task().finally(() => {
    inFlightRequests.delete(key)
  })

  inFlightRequests.set(key, run)

  return run
}
