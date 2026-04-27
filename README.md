# Rhevia Backend

Rhevia backend API built with Bun, Elysia, Better Auth, Neon Postgres, and
Drizzle ORM.

This service currently provides the authentication layer for Rhevia. Over time,
it is expected to grow into the main backend for the Rhevia movie and series
streaming app, supporting account, catalog, and app-facing API workflows.

## Requirements

- Bun
- A Neon Postgres database
- Google OAuth credentials

## Setup

Install dependencies:

```bash
bun install
```

Create a `.env` file in the project root:

```bash
DATABASE_URL="postgresql://..."
DATABASE_URL_DIRECT="postgresql://..."
BETTER_AUTH_URL="http://localhost:3000"
FRONTEND_URL="http://127.0.0.1:3001"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
DOMAIN="localhost"
```

`DATABASE_URL` is used by the runtime Drizzle client. `DATABASE_URL_DIRECT` is
used by Drizzle Kit when generating migrations.

## Development

Start the local server in watch mode:

```bash
bun run dev
```

The API listens on `http://localhost:3000` by default. Set `PORT` to override
the port.

Available local endpoints include:

- `GET /` returns `Hello Elysia`
- `/api/auth/*` is handled by Better Auth
- `/openapi` serves the OpenAPI UI
- `/openapi/json` serves the OpenAPI schema

## Scripts

```bash
bun run dev            # start the development server
bun run auth:generate  # regenerate the Better Auth Drizzle schema
bun run db:generate    # generate Drizzle migrations
bun run db:migrate     # apply migrations from src/db/migrations
bun run db:push        # generate and apply migrations
bun run db:studio      # open Drizzle Studio
```

The `test` script is currently a placeholder. To type-check the project, run:

```bash
bunx tsc --noEmit
```

## Database

Drizzle schema is exported from `src/db/schema.ts`, which also re-exports the
Better Auth tables from `src/db/auth-schema.ts`.

Migration files are stored in `src/db/migrations`.

Typical schema workflow:

```bash
bun run db:generate
bun run db:migrate
```

## Docker

Run the API with Docker Compose:

```bash
docker compose up --build
```

The compose setup reads environment variables from `.env`, mounts the project
directory into the container, and exposes port `3000`.

## Deployment

The app exports the Elysia instance from `src/index.ts` for Vercel. When the
file is executed directly, it starts a local listener; when imported by Vercel,
the exported app handles requests.

Configure the same environment variables in the deployment environment before
deploying.
