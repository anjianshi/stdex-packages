import { logger, getLogger, LogLevel } from '@stdex/logging'
import { config } from '@/lib/config.js'

logger.setLevel(config.inDev ? LogLevel.Debug : LogLevel.Info)
export { logger, getLogger }
