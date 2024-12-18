function generateUUID(): string {
  // Reference: https://stackoverflow.com/a/2117523/709884
  // And: https://stackoverflow.com/a/61011303/295606
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (s) => {
    const c = Number.parseInt(s, 10)
    return (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  })
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function getKeyByValue(object: any, value: any) {
  return Object.keys(object).find((key) => object[key] === value)
}

function getTimeInSeconds(): number {
  // https://stackoverflow.com/a/3830279/295606
  return Math.floor(new Date().getTime() / 1000)
}

export { generateUUID, getTimeInSeconds, getKeyByValue }
