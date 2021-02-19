import Koa from 'koa'
import Router from 'koa-router'
import routes from './routes'
import json from 'koa-json'
import { buildError } from './utils/response'
import logger from 'koa-logger'

const app = new Koa()
const router = new Router()

app.use(logger())

router.use('/', routes.routes())


app.use(async (ctx, next) => {
  try {
    await next()
    const status = ctx.status || 404
    if (status === 404) {
      ctx.throw(404)
    }
  } catch (err) {
    ctx.status = ctx.status || 500
    if (ctx.status === 404) {
      app.use(
        json({
          pretty: false,
        }),
      )

      ctx.body = buildError({ code: 404, message: 'Not Found' })
    } else {
      ctx.body = buildError({ code: ctx.status, message: err.message })
    }
  }
})
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8080, () => console.log('Listening.'))
