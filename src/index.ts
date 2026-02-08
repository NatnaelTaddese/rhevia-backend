import { Elysia } from "elysia";
import { auth } from "@/src/auth";

const app = new Elysia().mount(auth.handler).get("/", () => "Hello Elysia");

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
