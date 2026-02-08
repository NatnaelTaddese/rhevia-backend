import { Elysia } from "elysia";
import { auth } from "@/src/auth";

const app = new Elysia().mount(auth.handler).get("/", () => "Hello Elysia");

export default app;
