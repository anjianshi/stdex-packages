import { type Logger } from '@stdex/logging'
import { TaskManager } from '@stdex/utils/task-manager.js'
import {
  type Controllers,
  controllerClasses,
  initializeAppControllers,
} from '@/controllers/index.js'
import { getTransactionContextedPrismaClient, type AppPrismaClient } from '@/database.js'

interface Context {
  db: AppPrismaClient
  controllers: Controllers
}
class AppTaskManager extends TaskManager<Context, Logger> {
  getContext(name: string) {
    const db = getTransactionContextedPrismaClient()
    const controllersLogger = this.logger?.getChild(name).getChild('controllers')
    const controllers = initializeAppControllers(controllerClasses, db, controllersLogger)
    return {
      db,
      controllers,
    }
  }
}
export const tasks = new AppTaskManager()
