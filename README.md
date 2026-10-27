# Docker App

This is a [Next.js](https://nextjs.org) made to be run within docker.

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

- Jellyfin
- Seerr

## External services used

This projects uses the following external services:

- [selfh.st](https://selfh.st/icons/), used for automatically retreving icons
