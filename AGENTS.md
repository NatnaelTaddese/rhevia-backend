# AGENTS

This file guides agentic coding tools working in this repo.

## Project Overview
- Runtime: Bun
- Language: TypeScript (strict)
- Web framework: Elysia
- Database: Neon + Drizzle ORM (Postgres)
- Migrations: drizzle-kit + custom push script

## Required Context
- Environment variables are loaded via `dotenv/config` in entry points.
- Required environment variables:
  - `DATABASE_URL` - Neon database connection URL
  - `DATABASE_URL_DIRECT` - Direct database connection for migrations
  - `BETTER_AUTH_URL` - Base URL for auth endpoints
  - `FRONTEND_URL` - CORS origin for frontend
  - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - OAuth credentials
  - `DOMAIN` - Cookie domain for cross-subdomain auth
- Path aliases from `tsconfig.json`:
  - `@/*` maps to repo root
  - `@/db` maps to `src/db/index.ts`
  - `@/auth` maps to `src/auth.ts`

## Build / Lint / Test Commands
There is no build or lint script configured right now.

### Development
- Start dev server (watch): `bun run dev`

### Database / Migrations
- Generate migrations: `bun run db:generate`
- Apply migrations: `bun run db:migrate`
- Generate + apply: `bun run db:push`

### Tests
- Current `test` script is a placeholder and exits with error.
- No single-test command exists yet.
- If you add tests, prefer Bun's runner:
  - All tests: `bun test`
  - Single test file: `bun test path/to/file.test.ts`
  - Single test name: `bun test -t "name"`

## Repository Structure
- `src/index.ts`: Elysia app entry point
- `src/db/index.ts`: Drizzle client setup
- `src/db/schema.ts`: Drizzle schema (exports from `auth-schema.ts`)
- `src/db/auth-schema.ts`: Better Auth Drizzle schema
- `src/db/migrations/`: SQL migrations
- `src/scripts/push-schema.ts`: migration runner
- `src/auth.ts`: Better Auth configuration
- `drizzle.config.ts`: Drizzle config
- `vercel.json`: Vercel deployment configuration

## Coding Standards

### Imports
- Use ESM imports (no `require`).
- Prefer named imports; avoid default unless the module defines it.
- Type-only imports should be `import type { ... }`.
- Use path aliases (`@/`) for internal modules instead of deep relatives.
- Keep import groups small and stable; avoid reordering unless needed.
- Example: `import { db } from "@/db";` instead of `import { db } from "../db";`

### Formatting
- Keep formatting close to existing style: 2-space indent, trailing commas where present.
- Prefer single-line statements when readable; break long lines in function calls.
- Use template strings for multi-part messages.
- Do not add non-ASCII characters unless already present in the file.

### Types
- `tsconfig.json` has `strict: true`.
- Avoid `any`; use explicit types or generics when necessary.
- Narrow unknown values with type guards before use.
- Keep database schema types close to Drizzle definitions.

### Naming
- Use `camelCase` for variables and functions.
- Use `PascalCase` for types and classes.
- Use `SCREAMING_SNAKE_CASE` for constants only when truly static.
- File names are `kebab-case` or `snake_case` only when already established; otherwise stick to existing.

### Error Handling
- Prefer explicit errors and early returns over nested conditionals.
- For scripts (like `push-schema.ts`), `process.exit` is acceptable.
- For server/runtime code, avoid `process.exit` and return proper responses.
- Log errors with context; avoid swallowing exceptions.

### Elysia Usage
- Keep route handlers small and pure.
- Use dependency injection or module boundaries for shared logic.
- Use clear HTTP status handling (when applicable).

### Database / Drizzle
- Keep schema definitions in `src/db/schema.ts`.
- Use `drizzle-orm/pg-core` primitives.
- Keep migrations in sync with schema.
- Use `db` from `src/db/index.ts` to avoid multiple clients.

### Better Auth
- Auth configuration is in `src/auth.ts`.
- Uses Drizzle adapter with Neon PostgreSQL.
- Plugins: anonymous auth, OpenAPI.
- Environment variables needed: `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `DOMAIN`.

## Agent Workflow Expectations
- Read nearby files for context before editing.
- Avoid refactors unless requested; keep changes minimal.
- Do not add new dependencies without explicit reason.
- Do not remove existing behavior unless the task requires it.

## Lint / Typecheck
There is no build or lint script configured right now.
- Run type checking: `bunx tsc --noEmit`
- Consider running this before committing changes.

## Lint / Typecheck
There is no build or lint script configured right now.
- Run type checking: `bunx tsc --noEmit`
- Consider running this before committing changes.

## Deployment
- Configured for Vercel deployment (`vercel.json`).
- App detects `import.meta.main` to conditionally start server.
- When imported as module (Vercel), exports the Elysia app instance.

## Cursor / Copilot Rules
- No `.cursor/rules`, `.cursorrules`, or `.github/copilot-instructions.md` found.

## Notes for Future Improvements
- Add a test runner script and update this file when it exists.
- Consider adding linting/formatting tooling (ESLint/Prettier/Biome).
