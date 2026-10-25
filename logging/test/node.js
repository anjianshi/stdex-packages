import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { FileHandler } from '../dist/handlers/index.js'
import { logger, LogLevel } from '../dist/index.js'

logger.setLevel(LogLevel.Debug)

const fileHandler = new FileHandler({
  dir: path.join(path.dirname(fileURLToPath(import.meta.url)), 'logs'),
})
logger.addHandler(fileHandler)

logger.debug('debug content', 1)
logger.info('info content', 2)
logger.warn('warning content', 3)
logger.error('error content', 4)
