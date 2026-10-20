import { flatConfigs as eslintImportXFlatConfigs, createNodeResolver } from 'eslint-plugin-import-x'

export default [
  eslintImportXFlatConfigs.recommended,
  {
    name: '@stdex/base/import',
    settings: {
      'import-x/resolver-next': [createNodeResolver()],
    },
  },
]
