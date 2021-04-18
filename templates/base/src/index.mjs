import http from 'http'
import app from './app.mjs'
import config from './utils/config.mjs'
import logger from './utils/logger.mjs'

/****** Starting server ******/

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server listening on port ${config.PORT} an running in ${config.NODE_ENV} mode`)
})
