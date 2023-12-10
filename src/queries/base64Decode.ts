export const base64ToBytes = (base64: string) => {
  const binString = atob(base64)
  // @ts-ignore
  return Uint8Array.from(binString, (m) => m.codePointAt(0))
}
