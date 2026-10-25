# 通用 TypeScript 配置及工具脚本 - Shared TypeScript configuration and utility scripts.

简体中文 | [English](./README_EN.md)

| 文件                                          | 场景                                                            |
| --------------------------------------------- | --------------------------------------------------------------- |
| @stdex/presets-typescript/tsconfig-base.json  | 仅用 TypeScript 包进行类型检查，用其他工具编译代码              |
| @stdex/presets-typescript/tsconfig-build.json | 用 tsc 执行编译（支持编译类库和 Node.js 脚本，输出 ES6 Module） |
| @stdex/presets-typescript/tsconfig-vite.json  | 用 Vite 打包                                                    |
| tsc-with-alias                                | 组合运行 tsc 和 tsc-alias 以及 nodemon。                        |

## 关于 TypeScript 7

TypeScript 7 是一次大更新，随着此次更新，以往对外提供的 API 变得不可用了，这导致 `typescript-eslint` 无法对接新版的 TypeScript。
（官方预计 TypeScript 7.1 将会引入新版本的 API）
虽然官方也提供了变相解决方案，即构建和类型检查用 7，ESLint 用 6，但这给项目配置增添了很多麻烦。
所以在新 API 发布，且 `typescript-eslint` 完成适配前，暂时仍使用老的 TypeScript 6。

## 使用方式

安装依赖：

```shell
pnpm add --save-dev @stdex/presets-typescript typescript
```

在项目根目录建立 `tsconfig.json`，然后引用所需的文件：

```json
{
  "extends": "./node_modules/@stdex/presets-typescript/tsconfig-build"
}
```

注意：

1. 在使用 `pnpm` 的情况下，必须使用相对路径来引用 `tsconfig 文件，不能直接通过包名来引用，不然路径计算会出错。
2. 若修改了 `tsconfig.json` 中的 `include` 内容，有可能需要同步修改 `compilerOptions.rootDir`

## 配置 path alias

在 `tsconfig.json` 中添加：

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 使用 tsc 构建

- 先添加 `ts-alias` 依赖：`pnpm add --save-dev ts-alias`。  
  不用 `ts-alias` 的话，构建结果会保留原始带 alias 的引用，甚至在类型定义里会把原本没用引用的路径改为使用引用。
- 单次构建运行此包提供的脚本：`tsc-with-alias`
- 持续监听构建运行：`tsc-with-alias --watch`

如果在构建的同时还要运行其他内容，例如 `nodemon`：

- 先添加依赖：`pnpm add --save-dev concurrently`
- 构建时运行：`concurrently \"tsc-with-alias --watch\" && \"sleep xxx && nodemon xxx\"`。  
   其中，`sleep` 是可选的，它是为了等待第一次构建完成。

### 使用 Vite 构建

在 `vite.config.js` 的 `resolve.alias` 里添加和 `tsconfig.json` 中一致的配置，  
详见：<https://vitejs.dev/config/shared-options#resolve-alias>。

### 注意事项

因为 `tsc-alias` 是读取编译后的文件来替换 alias 内容，所以编译后的文件结构必须和编译前一致才行。
例如没有在 `tsconfig.json` 里设置 `compilerOptions.rootDir` 的话，tsc 输出内容到 outDir 时会尝试省略一些不必要的上级目录，即 `src/a/b/c/index.js` 可能输出成 `dist/index.js`。
此时 `tsc-alias` 就无法正常工作。

## 使用 tsc-with-alias

### 用法一：构建时使用

`tsc-alias` 需要在 `tsc` 运行完毕后运行，其传参与 `tsc` 一致。
通过此脚本，可以把原本的 `tsc xxx && tsc-alias xxx` 简写为 `tsc-with-alias xxx`，
不用处理先后顺序，也不用重复传参。

### 用法二：watch 时使用

在监听并持续编译代码时，`tsc` 和 `tsc-alias` 需要并行运行，
且 `tsc-alias` 应在 `tsc` 第一次编译完成后再开始运行。
使用 `tsc-with-alias xxx --watch`，可实现它们的并行运行并妥善控制运行时机。

### 用法三：watch 的同时启动 nodemon

对于后端服务类项目，开发时通常希望在持续编译代码的同时启动 `nodemon` 来自动运行/重启项目。
`nodemon` 也需要在 `tsc` 第一次编译完成后再开始运行。
使用 `tsc-with-alias xxx --watch --nodemon=yyy` 或者 `tsc-with-alias xxx --watch --nodemon`
可实现它们的并行运行并妥善控制运行时机。

其中 `--nodemon=yyy` 的 yyy 是要传给 nodemon 的参数，如果有多个参数要传，可以这样写：`--nodemon='aaa bbb ccc'`
