/*
【一些规则不启用的理由】
【Reasons for disabling certain rules】

@typescript-eslint/consistent-type-definitions
    未能覆盖所有情况，有些时候必须用 type，不能用 interface，但它识别不出来。
    Does not cover all cases. In some situations, type must be used instead of interface, but the rule cannot detect them.

@typescript-eslint/no-invalid-void-type
    不能很好地覆盖所有情况，例如一个类型有个 generic type，是最终用于定义函数返回值的，本应允许是 void，但这条规则不允许。
    Does not handle all cases well. For example, if a generic type parameter is ultimately used as a function's return type, void should be allowed, but this rule rejects it.

@typescript-eslint/no-meaningless-void-operator
    和 no-confusing-void-expression 的规则冲突。
    Conflicts with the no-confusing-void-expression rule.

@typescript-eslint/prefer-optional-chain
    和其他规则起冲突。
    Conflicts with other rules.
*/
import { tsFiles } from './common.mjs'

export default {
  name: '@stdex/typescript',

  files: tsFiles,

  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },

  rules: {
    // 交给 @typescript-eslint/switch-exhaustiveness-check 规则来检查 switch
    // Leave `switch` statement checks to the `@typescript-eslint/switch-exhaustiveness-check` rule.
    'default-case': 'off',

    // Typescript 里 void 符号另有用途
    // `void` has other uses in TypeScript.
    'no-void': 'off',

    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    '@typescript-eslint/consistent-type-exports': [
      'error',
      { fixMixedExportsWithInlineTypeSpecifier: true },
    ],
    '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      { ignoreArrowShorthand: true, ignoreVoidOperator: true, ignoreVoidReturningFunctions: true },
    ],
    '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: false, ignoreRestArgs: true }],
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-unnecessary-condition': ['error', { allowConstantLoopConditions: true }],
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/prefer-enum-initializers': 'error',

    // 一个很常见的情况是在 Promise 中，我们得到了一个错误对象，知道它是 Error 但标注出的类型确是 unknown。
    // 如果我们选择用 reject(error as Error) 来抛出错误，@typescript-eslint/no-unnecessary-type-assertion 规则会报错，
    // 因为 reject 能接收任意类型，这个 `as Error` 被认为不必要。
    // 但不加 `as Error`，又会提示只能抛出 Error。
    // 所以这里干脆允许抛出 unknown。
    // A common case occurs with Promises: we receive an error object that we know is an `Error`, but its declared type is `unknown`.
    // If we use `reject(error as Error)`, the `@typescript-eslint/no-unnecessary-type-assertion` rule reports an error because `reject` accepts values of any type, making the `as Error` assertion unnecessary.
    // However, without `as Error`, another rule complains that only `Error` objects may be thrown.
    // Therefore, we simply allow `unknown` values to be thrown here.
    '@typescript-eslint/prefer-promise-reject-errors': ['error', { allowThrowingUnknown: true }],

    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
    '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],

    // 这个规则不能正确判断 object | null | boolean 的情况
    // This rule does not correctly handle the `object | null | boolean` case.
    '@typescript-eslint/strict-boolean-expressions': 'off',

    '@typescript-eslint/switch-exhaustiveness-check': 'error',

    // 此规则对有些情况适配的不好
    // This rule does not handle certain cases well.
    '@typescript-eslint/unbound-method': 'off',

    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-loop-func': 'off',
    '@typescript-eslint/no-loss-of-precision': 'error',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'React',
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        caughtErrors: 'none',
      },
    ],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/return-await': 'error',
    'import-x/no-duplicates': ['error', { 'prefer-inline': true, considerQueryString: true }],
  },
}
