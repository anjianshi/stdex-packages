import { LogHandler, type LogInfo } from '../logger.js'
import { isBrowser, isPromiseLike } from '../utils.js'

/**
 * 这是一个用来实现跨平台的“中间层” handler。
 * 分别把用于浏览器和 Node.js 环境的两个 handler 指定给它，
 * 由它来决定实际使用哪一个。
 *
 * 在具体的 handler 加载完成前，提交过来的日志内容会被缓存，待加载完成后再输出。
 */
export abstract class CrossPlatformHandler<
  ConstructorArguments extends unknown[] = [],
> extends LogHandler {
  protected abstract loadForBrowser(...args: ConstructorArguments): LogHandler | Promise<LogHandler>
  protected abstract loadForNode(...args: ConstructorArguments): LogHandler | Promise<LogHandler>
  protected loadedHandler: LogHandler | null = null

  // handler 加载完成前提交过来的日志内容，会暂存在这里
  protected queue: LogInfo[] = []

  constructor(...args: ConstructorArguments) {
    super()
    const loading = isBrowser() ? this.loadForBrowser(...args) : this.loadForNode(...args)
    if (!isPromiseLike(loading)) {
      this.loadedHandler = loading
    } else {
      void loading.then(handler => {
        this.loadedHandler = handler
        while (this.queue.length) {
          const info = this.queue.shift()!
          this.loadedHandler.log(info)
        }
      })
    }
  }

  log(info: LogInfo) {
    // 若 handler 尚未加载完成，或者加载完成后还没把队列里的日志处理完，则把日志添加到队列里；
    // 否则直接交给 handler
    if (!this.loadedHandler || this.queue.length) {
      this.queue.push(info)
    } else {
      this.loadedHandler.log(info)
    }
  }
}
