import globals from 'globals'

// ESLint 配置文件内部允许使用 Node.js 环境下的内容
// Node.js-specific features can be used in ESLint configuration files.
export default {
  name: '@stdex/base/config-file-self',
  files: ['**/eslint.config.{js,cjs,mjs}'],
  languageOptions: {
    globals: globals.node,
  },
}
