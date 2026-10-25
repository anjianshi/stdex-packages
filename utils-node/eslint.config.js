import configs from '@stdex/presets-eslint-node'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ...configs,
  {
    basePath: 'src/prisma',
    rules: {
      // prisma 相关方法需要保证返回的是 PrismaPromise 而不能是经过 async function 转过的 Promise，所以不能把函数标记为 async function
      '@typescript-eslint/promise-function-async': 'off',

      // prisma extension 需要用到 any 类型
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
])
