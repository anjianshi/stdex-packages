import formatters from '../../formatters.js'
import { type LogInfo, LogLevel, LogHandler } from '../../logger.js'

export class BrowserConsoleHandler extends LogHandler {
  log(info: LogInfo) {
    const color = (value = 'black') => `color: ${value};`
    const prefix =
      '%c' + [formatters.time(info), info.logger].map((v: string) => (v ? `[${v}]` : '')).join('')
    const prefixColor = info.logger ? color(BrowserConsoleHandler.getColor(info.logger)) : color()

    const values = [prefix, prefixColor, ...info.args]
    if (info.level === LogLevel.Debug) console.debug(...values)
    else if (info.level === LogLevel.Info) console.log(...values)
    else if (info.level === LogLevel.Warning) console.warn(...values)
    else console.error(...values)
  }

  // 按顺序给各主题分配颜色（参考自 https://github.com/chriskempson/base16 ）
  private static readonly colors = [
    '#dc9656',
    '#7cafc2',
    '#ba8baf',
    '#a16946',
    '#ab4642',
    '#86c1b9',
    '#a1b56c',
    '#f7ca88',
  ]
  private static readonly colorMap = new Map<string, string>()
  static getColor(name: string) {
    if (!BrowserConsoleHandler.colorMap.has(name)) {
      const nextIndex = BrowserConsoleHandler.colorMap.size % BrowserConsoleHandler.colors.length
      BrowserConsoleHandler.colorMap.set(name, BrowserConsoleHandler.colors[nextIndex]!)
    }
    return BrowserConsoleHandler.colorMap.get(name)!
  }
}
