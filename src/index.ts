import { Elysia } from "elysia";
import { openapi, fromTypes } from "@elysiajs/openapi";
import { auth, OpenAPI } from "./auth";

const app = new Elysia()
  .use(
    openapi({
      references: fromTypes(),
      documentation: {
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths(),
      },
    }),
  )
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
export type App = typeof app;
