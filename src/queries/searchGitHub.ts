export interface SearchResult {
    total_count: number,
    items: SearchItem[]
}

export interface SearchItem {
    name: string,
    url: string
}

export const searchGitHub = async (query: string): Promise<SearchResult> => {
    const url = `https://api.github.com/search/code?q=${query}%20repo:ocni-dtu/table7%20path:/table7`;
    const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    };
    const response = await fetch(url, { headers });

    return response.json();
};
