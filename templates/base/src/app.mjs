import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import OpenApiValidator from 'express-openapi-validator'
import helmet from 'helmet'
import morgan from 'morgan'
// Local imports
import routes from './routes.mjs'
import config from './utils/config.mjs'
import logger from './utils/logger.mjs'
import middleware from './utils/middleware.mjs'

// Starting app
const app = express()
logger.info(`Connecting to ${config.PORT}`)

/****** Middleware ******/

// Base middleware
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(
  morgan(`:remote-addr - :remote-user [:date[web]] ':method :url HTTP/:http-version' :status :res[content-length]`),
)

// OpenAPI middleware
app.use(
  OpenApiValidator.middleware({
    apiSpec: './src/api/openapi.yaml',
    validateRequests: true,
    validateResponses: {
      removeAdditional: 'failing',
    },
    ignorePaths: /^((?!users).)*$/, // After defining OpenAPI for more paths, you can remove this
  }),
)

// Use routed endpoints
app.use('/api', routes)

// Heathcheck endpoint
app.get('/liveliness', (_, res) => {
  res.status(200).end()
})

// Error handler custom middleware
app.use(middleware.errorHandler)

export default app
