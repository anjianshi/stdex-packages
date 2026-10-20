async function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

async function run() {
  while (true) {
    await sleep(1000)
    console.log('loop 2')
  }
}

void run()
