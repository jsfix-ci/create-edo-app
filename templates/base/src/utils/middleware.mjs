import logger from './logger.mjs'

export const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (err, _req, res, next) => {
  if (res.headersSent) return next(err)

  logger.error(err)

  const status = err.httpStatus ?? 500
  const message = err.message ?? 'Something Bad Happened'

  res.status(status).json({ message })
}

export default {
  unknownEndpoint,
  errorHandler,
}
