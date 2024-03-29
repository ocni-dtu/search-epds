export interface SearchResult {
  total_count: number
  items: SearchItem[]
}

export interface SearchItem {
  name: string
  url: string
  gwp?: { [key: string]: number }
}

export const searchGitHub = async (query: string): Promise<SearchResult> => {
  const url = `https://api.github.com/search/code?q=${query}%20repo:${import.meta.env.VITE_GITHUB_REPO}%20path:${
    import.meta.env.VITE_GITHUB_REPO_PATH
  }`
  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  }
  const response = await fetch(url, { headers })

  return response.json()
}
