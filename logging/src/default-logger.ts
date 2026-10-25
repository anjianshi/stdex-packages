/**
 * 提供一套默认配置好的 logger
 */
import { ConsoleHandler } from './handlers/index.js'
import { Logger } from './logger.js'

const defaultLogger = new Logger()
defaultLogger.addHandler(new ConsoleHandler())
export { defaultLogger as logger }

export function getLogger(name: string) {
  return defaultLogger.getChild(name)
}
