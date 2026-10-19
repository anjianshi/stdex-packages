import baseConfigs from '@stdex/presets-eslint-base'
import nodeConfigs from '@stdex/presets-eslint-node'
import reactConfigs from '@stdex/presets-eslint-react'
import { defineConfig } from 'eslint/config'

const configs = defineConfig([
  ...baseConfigs,
  {
    name: 'configs-for-demo-eslint-node',
    basePath: 'eslint/node',
    extends: nodeConfigs,
  },
  {
    name: 'configs-for-demo-eslint-react',
    basePath: 'eslint/react',
    extends: reactConfigs,
  },
  {
    name: 'configs-for-demo-typescript',
    basePath: 'typescript',
    extends: nodeConfigs,
  },
])
export default configs
