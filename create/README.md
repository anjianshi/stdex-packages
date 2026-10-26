# 项目模板 - Project Templates

简体中文 | [English](./README_EN.md)

## 模板列表

| 目录        | 内容     | 备注                                       |
| ----------- | -------- | ------------------------------------------ |
| base        | 基础模板 | 配置了 Prettier 和 ESLint                  |
| service     | 后端服务 | TypeScript + starlight-server + Prisma ORM |
| site        | 前端站点 | TypeScript + React + Ant Design + Vite     |
| miniprogram | 小程序   | TypeScript + SCSS + gulp.js                |

---

## 使用方法

```shell
# 这个命令本质上是执行 `npm exec @stdex/create`，即执行这个包 `package.json` 中的 `bin` 配置的脚本。
npm init @stdex@latest {template} -- --name=xxx
```

- 若不指定 `template`，则使用 `基础模板`。
- 若指定 `name`，则用指定名称新建一个文件夹然后初始化项目，否则在当前目录初始化项目（要求当前目录为空）

---

## 开发约定

### 指定依赖版本

除非有明确的版本需要，否则 `package.json` 中的依赖版本都指定为 `latest`，项目初始化时会替换为实际版本号。

### 定义变量

在模板根目录放置 `variables.json`，格式如下：

```json
[
  {
    "name": "VARIABLE_NAME", // 变量名
    "describe": "xxxx", // 变量介绍
    "defaults": "xxxx" // 变量默认值，此项不存在代表是必填变量
  },
  ...
]
```

然后在项目任意文件中，可用 `{{VARIABLE_NAME}}` 的形式放置占位符，在初始化项目时会替换为实际变量值。

### 初始化脚本

可以在模板根目录创建一个 `setup.js`，格式如下：

```js
// context 中各函数的用法见 create/src/index.js 中的同名函数
export async function setup(context: { command, confirmPath, getDirectoryPath }) {
  // do something
}
```

此函数会在项目自动初始化流程运行完执行，之后此脚本文件会被删除。

### 文件重命名

部分文件不方便以原文件名出现在模板目录里，因此改为以下划线开头。
在初始化项目时，会自动修正为应有的名称。

| 原文件名            | 模板中的文件名        | 原因                                                     |
| ------------------- | --------------------- | -------------------------------------------------------- |
| .gitignore          | \_gitignore           | 安装 npm 包时会自动把 `.gitignore` 重命名为 `.npmignore` |
| pnpm-workspace.yaml | \_pnpm-workspace.yaml | 会影响 pnpm 对工作区内包列表的判断                       |
| .env                | \_env                 | 会被误判为临时文件                                       |

因为安装 npm 包时会自动把 `.gitignore` 重命名为 `.npmignore`，因此模板里需要把此文件命名为 `gitignore`（不带开头的点）。
在初始化项目时会自动重命名为 `.gitignore`。
