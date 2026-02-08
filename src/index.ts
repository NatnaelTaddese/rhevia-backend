import { Elysia } from "elysia";
import { auth } from "./auth";

export default new Elysia().mount(auth.handler).get("/", () => "Hello Elysia");
