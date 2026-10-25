/**
 * 写入文件日志
 */
import fs from 'node:fs'
import path from 'node:path'
import util from 'node:util'
import dayjs from 'dayjs'
import formatters from '../../formatters.js'
import { LogHandler, type LogInfo } from '../../logger.js'

export interface FileHandlerOptions {
  dir: string // 日志存放目录 Logs directory
  filePrefix: string // 日志文件名前缀 Prefix of the log file name
  maxLength: number // 单条日志最长多少字符 Maximum length of a single log message
  flushLength: number // 触发写入的缓存字符串数 Length of buffered strings that trigger a write operation
  flushInterval: number // 缓存定时写入间隔（单位：ms），为 0 则所有日志立刻写入 Buffered strings write interval, 0 means all logs are written immediately.
  format: util.InspectOptions // 对象字符串化时的格式选项，例如 depth 可控制对象显示到地几层
}

export class NodeFileHandler extends LogHandler {
  readonly options: FileHandlerOptions

  constructor(options?: Partial<FileHandlerOptions>) {
    super()

    this.options = {
      dir: path.resolve(process.cwd(), 'logs'),
      filePrefix: '',
      maxLength: 10000,
      flushLength: 100000,
      flushInterval: 1000,
      format: {},
      ...(options ?? {}),
    }

    this.initLogDir()

    // 进程退出前把尚未写入文件的日志强制写入
    // 这里必须用同步的方式来写，不然会写入不进去（可能是因为异步的话是放到下一个事件循环，但进程在这个事件循环内就退出了）
    process.on('exit', () => this.flush(true))
  }

  // Format log content
  log(info: LogInfo) {
    const { logger, args } = info
    const prefix =
      [
        `[${formatters.datetime(info)}]`,
        `[${formatters.level(info)}]`,
        logger ? `[${logger}]` : '',
      ].join('') + ' '

    const itemStrings: string[] = []
    let totalLength = prefix.length
    for (const item of args) {
      const itemString = this.stringifyDataItem(item)

      // 截断过长的日志内容 Truncate overly long log messages
      if (totalLength + itemString.length < this.options.maxLength) {
        itemStrings.push((totalLength === prefix.length ? '' : ' ') + itemString)
        totalLength += itemString.length
      } else {
        itemStrings.push(
          itemString.slice(0, this.options.maxLength - totalLength) + ' [too long, sliced]',
        )
        break
      }
    }

    this.pushBuffer(prefix, ...itemStrings, '\n')
  }

  protected stringifyDataItem(item: unknown) {
    // 去掉颜色控制字符
    if (typeof item === 'string') item = item.replace(/\x1b\[\d+m/g, '')

    // 利用 util.format() 获得和 console.log() 相同的输出（因为 console.log() 底层也是用的 util.format()）
    return util.formatWithOptions(this.options.format, item)
  }

  // Handle buffer & flush
  private buffer: string[] = []
  private bufferSize = 0
  private flushTimeoutId: NodeJS.Timeout | null = null

  protected pushBuffer(...strings: string[]) {
    this.buffer.push(...strings)
    this.bufferSize = strings.reduce((sum, v) => sum + v.length, this.bufferSize)
    if (this.options.flushInterval === 0 || this.bufferSize >= this.options.flushLength) {
      this.flush()
    } else {
      this.flushTimeoutId ??= setTimeout(() => this.flush(), this.options.flushInterval)
    }
  }

  protected flush(sync?: boolean) {
    if (this.flushTimeoutId) {
      clearTimeout(this.flushTimeoutId)
      this.flushTimeoutId = null
    }

    if (this.buffer.length) {
      const content = this.buffer.join('')
      this.buffer = []
      this.bufferSize = 0
      this.write(content, sync)
    }
  }

  // 文件系统交互 File system interaction
  get filepath() {
    const { dir, filePrefix } = this.options
    return path.join(
      dir,
      `${filePrefix ? `${filePrefix}-` : ''}${dayjs().format('YYYY-MM-DD')}.log`,
    )
  }

  protected initLogDir() {
    if (!fs.existsSync(this.options.dir)) fs.mkdirSync(this.options.dir)
  }

  protected write(content: string, sync = false) {
    if (sync) {
      fs.appendFileSync(this.filepath, content)
    } else {
      fs.appendFile(this.filepath, content, error => {
        if (error) console.error('[logger] write failed: ', error)
      })
    }
  }
}
