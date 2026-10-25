import { tasks } from './common.js'

void tasks.run({
  name: 'check-schools',
  interval: 1000 * 60,
  async executor({ db }, logger) {
    const count = await db.school.count({})
    logger?.info(`学校数量：${count}`)
  },
})
