import reactExclusiveConfigs from '@stdex/presets-eslint-react/exclusive.mjs'
import typescriptConfigs from '@stdex/presets-eslint-typescript'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ...typescriptConfigs,
  {
    basePath: 'src/react',
    extends: reactExclusiveConfigs,
  },
])
