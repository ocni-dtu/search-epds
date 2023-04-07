export interface SearchResult {
    total_count: number,
    items: SearchItem[]
}

export interface SearchItem {
    name: string,
    url: string
}

export const searchGitHub = async (query: string): Promise<SearchResult> => {
    const url = `https://api.github.com/search/code?q=${query}%20repo:opensource-construction/kbob`;
    const response = await fetch(url, {});

    return response.json();
};
