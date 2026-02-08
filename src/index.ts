import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { auth } from "./auth";

const app = new Elysia()
  .use(openapi())
  .mount(auth.handler)
  .get("/", () => "Hello Elysia");

// On Vercel, the file is imported as a module,
// so `import.meta.main` is `false` — it skips `.listen()` and
// Vercel uses the `export default app` to handle requests through its own runtime
if (import.meta.main) {
  const port = process.env.PORT ?? 3000;
  app.listen(port);
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  );
}

export default app;
