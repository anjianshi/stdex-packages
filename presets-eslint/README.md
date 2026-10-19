# 通用 ESLint 配置 - General ESLint Configurations

简体中文 | [English](./README_EN.md)

## 设计思路

### 精简规则

只开启尽量少的规则，目标是**减少 bug 率**，而不是**限制代码风格**。

### 只“检查”，不“格式化”

参考 [此文章](https://typescript-eslint.io/linting/troubleshooting/formatting/) 的思路，不开启代码样式规则，由专门的工具（如 `Prettier`）负责格式化。  
通过引入 `eslint-config-prettier`，把 ESLint 的 `Layout & Formatting` 规则和 TypeScript、React 插件的此类规则都排除，[完整列表](https://github.com/prettier/eslint-config-prettier/blob/main/index.js)。

---

## 包列表

| 包名                             | 场景                 |
| -------------------------------- | -------------------- |
| @stdex/presets-eslint-base       | 基础 JavaScript      |
| @stdex/presets-eslint-typescript | TypeScript           |
| @stdex/presets-eslint-react      | React + TypeScript   |
| @stdex/presets-eslint-node       | Node.js + TypeScript |

---

## 如何使用

### 安装

```sh
pnpm add --save-dev eslint @stdex/presets-eslint-xxx
```

### 配置 ESLint

建立 `eslint.config.mjs` 文件，这里以 React 场景为例：

```js
import { defineConfig } from 'eslint/config'
import reactConfigs from '@stdex/presets-eslint-react'

export default defineConfig([
  ...reactConfigs,

  // 其他配置
])
```

如果只想引入某个场景专属的配置，可以引入对应包的 `exclusive.mjs` 文件（`exclusive.mjs` 里不包括 JavaScript 基础配置，需要手动引入）。  
例如对于一个纯 JavaScript 的 Node.js 项目，只引入 Node.js 相关配置，不包括 TypeScript 配置内容：

```js
import { defineConfig } from 'eslint/config'
import baseConfigs from '@stdex/presets-eslint-base'
import nodeConfigs from '@stdex/presets-eslint-node/exclusive.mjs'

export default defineConfig([...baseConfigs, ...nodeConfigs])
```

### 配置 VS Code

1. 安装 VS Code 插件 `ESLint`

2. 修改 VS Code 设置（Code - Preferences - Settings）

```json
{
  "editor.tabSize": 2,
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,

  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
  "eslint.workingDirectories": [{ "mode": "auto" }]
}
```

#### 关于 ESLint `workingDirectories`

若 VS Code 的 workspace 配置成类似如下目录结构：

```js
projects/     // /Users/me/office/projects/
  proj-1/
  proj-2/
  ...

library/      // /Users/me/library/
  lib-1/
  lib-2/
```

也就是，workspace 下添加了多个独立的文件夹，每个独立文件夹下又有多个项目。
在开发这些项目（`proj-1`、`lib-1`...）时，VS Code 默认会把顶层目录作为 ESLint 的 `workingDirectory`，从那个目录下加载插件等依赖，导致找不到依赖。
在 VS Code 配置里指定 `{ "mode": "auto" }` 可解决此问题，它会让 VS Code 把 `package.json` 存在的目录作为 `workingDirectory`，也就能正常引入依赖了。

#### 关于 eslint.validate 配置

以前 VS Code 里还需要配置 `eslint.validate`，但它现在被 `eslint.probe` 代替了。  
且 `eslint.probe` 的默认值已符合需求，所以无需配置。

---

## 开发说明

### 如何更新 ESLint 规则

看 ESLint 及各插件的 ChangeLog，来补充、移除、调整规则定义。
(规则文件里只定义和默认值不同的规则，例如默认不开启，也没准备开启的规则就不写下来)
