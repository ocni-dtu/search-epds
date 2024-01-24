export const base64ToBytes = (base64: string) => {
  return Uint8Array.from(atob(base64), (m) => m.codePointAt(0) as number)
}
