import { type Logger, logger as rootLogger, adaptDebugLib } from '@stdex/logging'
import { FileHandler } from '@stdex/logging/handlers'
import debug from 'debug'
import config from '@/config.js'

export { type Logger, rootLogger }

rootLogger.setLevel(config.DEBUG ? 'debug' : 'info')
rootLogger.addHandler(new FileHandler({ dir: config.LOGS_DIR }))
adaptDebugLib(debug, '*', rootLogger)
