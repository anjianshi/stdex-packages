import { styleText, type InspectColor } from 'node:util'
import formatters from '../../formatters.js'
import { LogHandler, LogLevel, type LogInfo } from '../../logger.js'

export class NodeConsoleHandler extends LogHandler {
  log(info: LogInfo) {
    const { logger, level, args } = info
    const method = NodeConsoleHandler.consoleMethods[level]

    const levelColor = NodeConsoleHandler.levelColors[level]
    const levelName = formatters.level(info)
    const loggerColor = NodeConsoleHandler.getLoggerColor(logger)
    const prefix = [
      styleText('white', `[${formatters.time(info)}]`),
      styleText(levelColor, `[${levelName}]`),
      logger ? styleText(loggerColor, `[${logger}]`) : '',
    ].join('')
    method(prefix, ...args)
  }

  static readonly consoleMethods = {
    [LogLevel.Debug]: console.debug.bind(console),
    [LogLevel.Info]: console.info.bind(console),
    [LogLevel.Warning]: console.warn.bind(console),
    [LogLevel.Error]: console.error.bind(console),
  }

  /**
   * 各日志等级对应的标志颜色
   * 可选的颜色列表：https://nodejs.org/api/util.html#modifiers
   */
  static readonly levelColors: Record<LogLevel, InspectColor> = {
    [LogLevel.Debug]: 'whiteBright',
    [LogLevel.Info]: 'white',
    [LogLevel.Warning]: 'yellowBright',
    [LogLevel.Error]: 'redBright',
  }

  // 可供 logger 选择的颜色
  // 支持的颜色列表：https://nodejs.org/api/util.html#modifiers
  private static readonly loggerColors: InspectColor[] = [
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'greenBright',
    'yellowBright',
    'blueBright',
    'magentaBright',
    'cyanBright',
  ]
  private static readonly loggerColorMap = new Map<string, InspectColor>()
  static getLoggerColor(logger: string) {
    if (!NodeConsoleHandler.loggerColorMap.has(logger)) {
      const color =
        NodeConsoleHandler.loggerColors[
          NodeConsoleHandler.loggerColorMap.size % NodeConsoleHandler.loggerColors.length
        ]!
      NodeConsoleHandler.loggerColorMap.set(logger, color)
    }
    return NodeConsoleHandler.loggerColorMap.get(logger)!
  }
}
