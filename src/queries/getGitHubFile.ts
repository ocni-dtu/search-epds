import { base64ToBytes } from './base64Decode'
import { EPD } from 'epdx'

export const getGitHubFile = async (url: string): Promise<EPD> => {
  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  }
  const response = await fetch(url, { headers })
  const data = await response.json()
  const content = new TextDecoder().decode(base64ToBytes(data.content))
  return JSON.parse(content)
}
