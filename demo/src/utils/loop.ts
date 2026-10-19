import { sleep } from '@stdex/utils/index.js'

async function run() {
  while (true) {
    await sleep(1000)
    console.log('loop 2')
  }
}

await run()
