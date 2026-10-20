import typescriptConfigs from '@stdex/presets-eslint-typescript'
import { defineConfig } from 'eslint/config'
import reactExclusiveConfigs from './exclusive.mjs'

export default defineConfig([...typescriptConfigs, ...reactExclusiveConfigs])
