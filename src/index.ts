import { Elysia } from "elysia";
import { auth } from "./auth";

const app = new Elysia().mount(auth.handler).get("/", () => "Hello Elysia");

if (import.meta.main) {
  const port = process.env.PORT ?? 3000;
  app.listen(port);
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  );
}

export default app;
