export const getGitHubFile = async (url: string) => {
    const response = await fetch(url, {});
    const data = await response.json();
    const content = atob(data.content);
    return JSON.parse(content);
};
