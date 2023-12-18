# Search EPDs

Search EPDs is a simple web app that lets you search for EPDs through a Google-like interface.

The current implementation uses GitHub's search API to provide search results from
the [Table 7 repo](https://github.com/ocni-dtu/table7).

The ambition is to add more features such as:

- Displaying the top 10 EPDs with the lowest Global Warming Potential (GWP)
- Facilitating the download of specific EPDs
- Integrating additional databases, such as KBOB or Ökobau

https://github.com/ocni-dtu/search-epds/raw/main/public/EPD%20Search.webm

## Getting Started

Clone this repo and make sure you have npm 18 installed.

Install the dependencies with:

`npm install`

### Setup .env
Create a `.env` file containing:

```.dotenv
VITE_GITHUB_TOKEN=github_pat_....
VITE_GITHUB_REPO=...
VITE_GITHUB_REPO_PATH=...
```

Where the `VITE_GITHUB_REPO` is a repo containing [EPDx](https://epdx.kongsgaard.eu/) formatted EPDs and the `VITE_GITHUB_TOKEN` is a token with
read permissions to the repo. The `VITE_GITHUB_REPO_PATH` is a file path to further narrow the search down within the
repo, but it can be left as `/` to include the whole repo.

### Run Dev Server

`npm run dev`

### Build

`npm run build`

### Fix Formatting and Linting

`npm run fix`