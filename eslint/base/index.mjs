import eslintJs from '@eslint/js'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'

import importConfigs from './parts/import.mjs'
import mainConfig from './parts/main.mjs'
import selfConfig from './parts/self.mjs'

export default defineConfig([
  eslintJs.configs.recommended,
  eslintConfigPrettier,

  mainConfig,
  ...importConfigs,
  selfConfig,
])
