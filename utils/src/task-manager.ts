/**
 * 任务管理器
 * “任务”指定期重复执行的操作，例如清理缓存、定时刷新数据
 */
import { sleep, type GeneralLogger } from './lang/index.js'

export interface TaskOptions<Context, Logger extends GeneralLogger = GeneralLogger> {
  /** 任务名称 */
  name: string

  /** 两次执行的间隔，单位 ms */
  interval: number

  /** 任务单次执行函数，返回 false 以结束任务 */
  executor: TaskExecutor<Context, Logger>

  /** 单次执行抛出异常时，是否结束任务 */
  exitOnFailed?: boolean
}

/**
 * 任务单次执行函数，任务运行期间会多次被调用，返回 false 以结束任务。
 */
export type TaskExecutor<Context, Logger extends GeneralLogger = GeneralLogger> = (
  /** 此次执行的相关信息 */
  context: Context,

  /** 记录此次执行的额外日志。仅在初始化 TaskManager 时提供了 logger 的情况下有值 */
  logger?: Logger,
) => Promise<void> | Promise<undefined | boolean>

/**
 * 任务管理器，维护多项任务的运行。
 *
 * - 使用者需继承此类，提供 getContext() 的具体实现，来指定每次执行要提供给 executor 的信息。
 * - 通过 taskManager.run() 方法启动一项任务。
 * - 任务会一次接一次地重复执行，直到 executor 函数返回 false。
 */
export abstract class TaskManager<Context, Logger extends GeneralLogger = GeneralLogger> {
  constructor(protected logger?: Logger) {}

  /** 生成要传递给 executor 的上下文信息 */
  abstract getContext(taskName: string): Context

  /** 启动一项任务 */
  async run(options: TaskOptions<Context>) {
    this.logger?.info(`${options.name} task started`)
    let nextExecutionId = 1
    while (true) {
      const executionId = nextExecutionId++
      if (executionId >= Number.MAX_SAFE_INTEGER) nextExecutionId = 1

      const start = Date.now()
      this.logger?.info(`${options.name}#${executionId} task execute started`)
      try {
        const context = this.getContext(options.name)
        const result = await options.executor(context, this.logger)
        const cost = (Date.now() - start) / 1000
        this.logger?.info(`${options.name}#${executionId} task execute completed in ${cost}s`)
        if (result === false) {
          this.logger?.info(`${options.name} task finished`)
          break
        }
      } catch (err) {
        this.logger?.error(`${options.name}#${executionId} task execute failed`, err)

        if (options.exitOnFailed ?? false) {
          this.logger?.warn(`${options.name} task finished by failed`)
          break
        }
      }

      await sleep(options.interval)
    }
  }
}
