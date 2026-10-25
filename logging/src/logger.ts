/**
 * Logger 基础实现
 *
 * [对象结构]
 * logger
 *   childLogger
 *     name - logger 名称
 *     level - 记录哪些等级及以上的日志
 *
 *     log() {} - 记录日志
 *     debug() {}
 *     info() {}
 *     ...
 *
 *     handlers: [] - 日志信息最终是交给各 handler 来实际记录下来。
 *                    例如有的会输出到控制台，有的写入文件。
 */
import dayjs, { type Dayjs } from 'dayjs'

/**
 * 日志等级 Enum
 */
export enum LogLevel {
  Debug = 1,
  Info = 2,
  Warning = 3,
  Error = 4,
}

/**
 * 定义可以用哪些字符串（不区分大小写）代表对应的日志等级
 */
export const logLevelMap: Record<string, LogLevel> = {
  debug: LogLevel.Debug,
  info: LogLevel.Info,
  warn: LogLevel.Warning,
  warning: LogLevel.Warning,
  err: LogLevel.Error,
  error: LogLevel.Error,
}

/**
 * 规范化的日志信息
 */
export interface LogInfo {
  /** logger name。有多级 logger 的情况下，这是最初用来记录日志的 logger 名称 */
  logger: string

  /** 此条日志的日志等级 */
  level: LogLevel

  /** 日志记录时间 */
  time: Dayjs

  /** 日志内容 */
  args: unknown[]
}

/**
 * LogHandler
 */
export class LogHandler {
  log(info: LogInfo) {} // eslint-disable-line @typescript-eslint/no-unused-vars
}

export class Logger {
  level = LogLevel.Info
  handlers = new Set<LogHandler>()

  constructor(
    public name = '',
    public base: Logger | null = null, // 指定上级 logger，当前 logger 记录的日志也会传递给上级
  ) {}

  static getRealLevel(raw: LogLevel | string) {
    if (typeof raw === 'string') {
      raw = raw.toLowerCase()
      if (logLevelMap[raw] === undefined) throw new Error('Not supported log level: ' + raw)
      return logLevelMap[raw]!
    }
    return raw
  }

  setLevel(level: LogLevel | string) {
    this.level = Logger.getRealLevel(level)
  }

  addHandler(handler: LogHandler) {
    this.handlers.add(handler)
  }

  /**
   * 创建一个以当前 logger 为 base 的 child logger
   */
  getChild(name: string) {
    const fullname = this.name ? `${this.name}/${name}` : name
    type Constructor = new (...args: ConstructorParameters<typeof Logger>) => Logger
    // 这里加上 `as this` 才能让 TypeScript 判定，对继承了 Logger 的类调用此方法时，返回的是那个类而不是原始的 Logger 类的实例
    return new (this.constructor as Constructor)(fullname, this) as this
  }

  log(level: LogLevel | string, args: unknown[]) {
    level = Logger.getRealLevel(level)
    this.logByInfo({ logger: this.name, level, time: dayjs(), args })
  }
  protected logByInfo(info: LogInfo) {
    if (this.base) this.base.logByInfo(info)
    if (this.level > info.level) return
    for (const handler of this.handlers) {
      handler.log(info)
    }
  }

  debug(...args: any[]) {
    this.log(LogLevel.Debug, args)
  }
  info(...args: any[]) {
    this.log(LogLevel.Info, args)
  }
  warn(...args: any[]) {
    this.log(LogLevel.Warning, args)
  }
  error(...args: any[]) {
    this.log(LogLevel.Error, args)
  }
}
