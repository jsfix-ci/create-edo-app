import { Logger } from 'tslog'

const logger = new Logger({
  name: 'log',
  displayLoggerName: false,
  printLogMessageInNewLine: true,
  overwriteConsole: true,
})

export default logger
