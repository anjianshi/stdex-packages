import configs from '@stdex/presets-eslint-react'
export default [
  ...configs,
  {
    rules: {
      // 适配 Emotion CSS
      'react/no-unknown-property': ['error', { ignore: ['css'] }], // 适配 Emotion CSS

      // 适配 @stdex/utils 中的 useAsyncEffect
      'ts-react-hooks/exhaustive-deps': [
        'warn',
        {
          additionalHooks: '(useAsyncEffect)',
          allowAsyncHooks: '(useAsyncEffect)',
        },
      ],
    },
  },
]
