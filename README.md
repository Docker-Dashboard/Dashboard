# Docker App

This is a [Next.js](https://nextjs.org) made to be run within docker.

![Next Build](https://github.com/Docker-Dashboard/Dashboard/actions/workflows/build.yml/badge.svg)
![Docker Build](https://github.com/Docker-Dashboard/Dashboard/actions/workflows/dockerBuild.yml/badge.svg)
![Commits since last release](https://img.shields.io/github/commits-since/Docker-Dashboard/Dashboard/latest?logo=github&amp;label=Commits%20since%20last%20release)
![Commits in the last month](https://img.shields.io/github/commit-activity/m/Docker-Dashboard/Dashboard?logo=github&amp;label=Commits%20since%20last%20month)
![Last commit](https://img.shields.io/github/last-commit/Docker-Dashboard/Dashboard?logo=github&amp;label=Last%20commit)
![Repo Size](https://img.shields.io/github/repo-size/Docker-Dashboard/Dashboard?logo=github&amp;label=Repo%20size)
![Downloads](https://img.shields.io/github/downloads/Docker-Dashboard/Dashboard/total?logo=github&amp;label=GitHub%20Downloads)
![Docker Pulls](https://img.shields.io/docker/pulls/dockerdashboardteam/dashboard?label=Docker%20pulls)

## Getting Started

You will need to clone this repo to your computer to run it

Make sure to also install dependancies!

```bash
pnpm install
```

### Running in Docker

To run this project within docker, run:

```bash
docker compose up --build
```

Or build an image with :

```bash
docker build -t dashboard:latest
```

and make a docker-compose.yml file:

```bash
services:
  dashboard:
    image: dashboard:latest
    container_name: dashboard
    volumes:
      - /path/to/config:/config
    ports:
      - 3000:3000
    restart: unless-stopped
```

### Running without Docker

To run without Docker, you will need to first build the page:

```bash
npm run build
```

Then you can start the server:

```bash
node .next/standalone/server.js
```

### Running with development server

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Next.js

This project uses Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Based on

This project is based on:

- [Glance](https://github.com/glanceapp/glance)
- [Homepage](https://github.com/gethomepage/homepage)

## Supported apps

This app currently has support for the following apps:

- Jellyfin
- Seerr
- Pi-Hole (Basic support)
- GitHub releases
- Radarr
- Sonarr

## External services used

This projects uses the following external services:

- [selfh.st](https://selfh.st/icons/), used for automatically retreving icons
- [GitHub.com](https://github.com), used for the GitHub releases widget

## Planned widget additions

The following are planned to be added in the future:

- Calendar
- Weather
- Live Twitch channels
<!-- No idea on how to add Twitch channels to dashboard, feel free to try, it must only get which channels from user and nothing else -->
- Home Assistant
- Uptime Kuma
- and many more!
