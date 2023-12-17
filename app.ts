import { Hono } from "https://deno.land/x/hono@v3.11.8/mod.ts"
import { serveStatic } from "https://deno.land/x/hono@v3.11.8/middleware.ts"
import { streamSSE } from "https://deno.land/x/hono@v3.11.8/helper/streaming/index.ts"

const app = new Hono()

app.get('/', serveStatic({ path: './public/index.html'}))

Deno.serve(app.fetch)