# Docker App

This is a [Next.js](https://nextjs.org) made to be run within docker.

![Next Build](https://github.com/Docker-Dashboard/Dashboard/actions/workflows/build.yml/badge.svg)
![Docker Build](https://github.com/Docker-Dashboard/Dashboard/actions/workflows/dockerBuild.yml/badge.svg)

## Getting Started

You will need to clone this repo to your computer to run it

### Running in Docker

To run this project within docker, run:

```bash
docker compose up --build
```

Or build into image with :

```bash
docker build -t app:latest
```

and make a docker-compose.yml file:

```bash
services:
  app:
    image: app:latest
    container_name: app
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
npm run dev
```
<!-- or
```bash
yarn dev
```
or
```bash
pnpm dev
```
or
```bash
bun dev
``` -->

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Next.js

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

- none

## Planned widget additions

The following are planned to be added in the future:

- Calendar
- Weather
- Live Twitch channels
- GitHub releases
- Pi-Hole
- Seerr
- Jellyfin
- Uptime Kuma
- and many more!
