import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

const STATIC_ROOT = './src/'

const app = new Hono()

app.use('*', ...getStaticHandlers(STATIC_ROOT))

export default app

function getStaticHandlers(root: string) {
  const rewriteRequestPath = (path: string) => `${path}.html`
  const first = serveStatic({ root });
  const second = serveStatic({ root, rewriteRequestPath });
  return [first, second]
}
