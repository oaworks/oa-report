# README

## Running the site locally

Prerequisites:
- Running from the command line.
- Installing [Node.js](https://nodejs.dev/) and [Node Package Manager](https://www.npmjs.com/) or `npm`.

1. Clone this repository by typing in your terminal: `git clone https://github.com/oaworks/oa-report.git`
2. Change to its newly created directory: `cd oa-report/`
3. Install Eleventy for this project: `npm install @11ty/eleventy`
4. Set up environment variables so that you can access the API: 
   - Create a file named `.env` at the root of the project directory
   - Set either `ELEVENTY_API_ENDPOINT = "api"`(live API endpoint) or `ELEVENTY_API_ENDPOINT = "beta"` (dev)
   - Don’t forget to restart your local server whenever you make a change to this file
6. You can now run the server by entering `npm run start`
7. Direct your web browser to `http://localhost:8080/`
   - The full list of organisations will be found at `http://localhost:8080/orgs`
8. Always create a branch off `dev` when you make commits

## Running the site using Github Codespaces 

### Dev 

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/oaworks/oa-report/tree/dev?quickstart=1)

### Staging 

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/oaworks/oa-report/tree/staging?quickstart=1)

### Main 

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/oaworks/oa-report/tree/main?quickstart=1)
