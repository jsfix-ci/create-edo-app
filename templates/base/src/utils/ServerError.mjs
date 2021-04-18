class ServerError extends Error {
  constructor(message, httpStatus) {
    super(message)
    this.name = this.constructor.name
    this.httpStatus = httpStatus || 500
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ServerError
