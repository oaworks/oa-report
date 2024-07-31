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
   - Set `ELEVENTY_BASE_URL` to your localhost
   - Set `ELEVENTY_NUMBER_REPORTS` to the number of reports you’d like to generate 
   - Don’t forget to restart your local server whenever you make a change to this file
6. You can now run the server by entering `npm run start`
7. Direct your web browser to `http://localhost:8080/`
   - The full list of organisations will be found at `http://localhost:8080/orgs`
8. Always create a branch off `dev` when you make commits

## Running the site using Github Codespaces 

| `dev` | `staging` | `main` |
|---|---|---|
| [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?ref=dev&repo=360205065&skip_quickstart=true&machine=basicLinux32gb&devcontainer_path=.devcontainer%2Fdev%2Fdevcontainer.json&geo=EuropeWest) | [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?ref=staging&repo=360205065&skip_quickstart=true&machine=basicLinux32gb&devcontainer_path=.devcontainer%2Fstaging%2Fdevcontainer.json&geo=EuropeWest) | [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?ref=main&repo=360205065&skip_quickstart=true&machine=basicLinux32gb&devcontainer_path=.devcontainer%main%2Fdevcontainer.json&geo=EuropeWest) |


## Viewing the various servers 

| `dev` (https://dev.oa.report) | `staging` (https://staging.oa.report) | `main`  (https://oa.report) |
|---|---|---|
| Uses the `beta` API | Uses the live API | Uses the live API |
| [![Netlify Status](https://api.netlify.com/api/v1/badges/df11cc41-9d85-4801-95c0-63a9fd3342e3/deploy-status)](https://app.netlify.com/sites/dev-oa-report/deploys) | [![Netlify Status](https://api.netlify.com/api/v1/badges/7c35f45b-9e1b-471e-a307-9ffd7b067b2a/deploy-status)](https://app.netlify.com/sites/staging-oa-report/deploys) | [![Netlify Status](https://api.netlify.com/api/v1/badges/4ef5986a-f5cc-48e9-972e-ddf37eb3a79e/deploy-status)](https://app.netlify.com/sites/oareport/deploys) |
