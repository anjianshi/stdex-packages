import nodeExclusiveConfigs from '@stdex/presets-eslint-node/exclusive.mjs'
import typescriptConfigs from '@stdex/presets-eslint-typescript'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ...typescriptConfigs,
  {
    files: ['src/**/node.ts'],
    extends: nodeExclusiveConfigs,
  },
])
