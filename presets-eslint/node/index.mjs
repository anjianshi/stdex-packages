import typescriptConfigs from '@stdex/presets-eslint-typescript'
import { defineConfig } from 'eslint/config'
import nodeExclusiveConfigs from './exclusive.mjs'

export default defineConfig([...typescriptConfigs, ...nodeExclusiveConfigs])
