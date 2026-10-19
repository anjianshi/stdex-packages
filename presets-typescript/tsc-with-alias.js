import childProcess from 'node:child_process'

/**
 * 整理参数
 */
let argv = process.argv.slice(2)

const watch = argv.includes('--watch') || argv.includes('-w')
argv = argv.filter(arg => arg !== '--watch' && arg !== '-w')

const nodemonArgItem = argv.find(arg => arg.startsWith('--nodemon=') || arg === '--nodemon')
const nodemonArgv = nodemonArgItem
  ? nodemonArgItem === '--nodemon'
    ? []
    : nodemonArgItem.slice('--nodemon='.length).replace(/'"/g, '').split(' ')
  : null
argv = argv.filter(arg => arg !== nodemonArgItem)

if (watch) {
  const tsc = childProcess.spawn('npx', ['tsc', ...argv, '--watch', '--pretty'], {
    stdio: ['inherit', 'pipe', 'inherit'],
  })
  tsc.stdout.pipe(process.stdout)

  let isInitialBuildComplete = false
  tsc.stdout.on('data', data => {
    if (data.toString().includes('Watching for file changes')) {
      if (!isInitialBuildComplete) {
        isInitialBuildComplete = true

        childProcess.spawn('npx', ['tsc-alias', ...argv, '--watch'], { stdio: 'inherit' })

        if (nodemonArgv) {
          childProcess.spawn('npx', ['nodemon', ...nodemonArgv], { stdio: 'inherit' })
        }
      }
    }
  })
} else {
  const tsc = childProcess.spawn('npx', ['tsc', ...argv], { stdio: 'inherit' })
  tsc.on('exit', code => {
    if (code !== 0) {
      process.stderr.write(`[tsc] failed ${code}\n`)
      process.exit(1)
      return
    }
    console.log(`[tsc] finish`)

    const alias = childProcess.spawn('npx', ['tsc-alias', ...argv], {
      stdio: 'inherit',
    })
    alias.on('exit', code => {
      if (code !== 0) {
        process.stderr.write(`[tsc-alias] failed ${code}`)
        process.exit(1)
      } else {
        console.log(`[tsc-alias] finish`)
      }
    })
  })
}
