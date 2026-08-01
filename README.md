# ENSI Knowledge

A Guide on how to survive your studies at ENSI. You will find tips, references, projects & cheat sheets.

## Contributions

This project is principally community driven and needs **your support**, every line **helps**.

Adding courses, cheat sheets, links to projects, exams and any content related to your field that would prove useful is welcome.

For an excellent markdown edit experience I highly recommend using [Marktext](https://github.com/marktext/marktext) as an editor instead of manually changing the markdown.

Even if you don't have content to add to the project you can check the [issues](https://github.com/YOUR_GITHUB_USERNAME/ensi-knowledge/issues) for any potential bugs and tasks.

New to open-source? Please read [this guide](https://www.dataschool.io/how-to-contribute-on-github/) on how to contribute to open-source projects.

## Setup

This project makes use of [Volta](https://volta.sh/) to manage the node and yarn versions.

Make sure [Volta](https://volta.sh/) is installed and configured on your system. This project relies on **specific** node & yarn versions.

### Unix/Linux

```bash
curl https://get.volta.sh | bash
```

### Windows

Follow this [guide](https://docs.volta.sh/guide/getting-started)

### Dependencies Installation

Install your dependencies. This project uses **Yarn Berry** with the `node-modules` linker, so a regular `node_modules/` folder is created.

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
