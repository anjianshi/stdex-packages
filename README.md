# 基础扩展库 - Standard Extension Packages

JavaScript / TypeScript 实用工具集，随各类项目开发不断完善。

## 开发思路

- 有用、好用即可，不求高大上和完美。
- 保证代码和概念清晰、易懂，避免奇技淫巧。
- 预留扩展空间，不强制使用习惯。

## 项目内容

详细介绍见各项目自己的 README。  
未额外说明的，均同时兼容浏览器和 Node.js 环境。

### 功能模块

| 目录                      | 内容             | 特点                         | 包名             |
| ------------------------- | ---------------- | ---------------------------- | ---------------- |
| [server](./server/)       | 后端服务框架     | 功能完备，经过真实项目验证   | @stdex/server    |
| [logging](./logging/)     | 日志记录库       | 内置功能丰富，扩展性强       | @stdex/logging   |
| [request](./request/)     | HTTP 请求库      | 可靠、可定制                 | @stdex/request   |
| [validator](./validator/) | 数据验证、格式化 | 支持 TypeScript 类型自动推理 | @stdex/validator |

### 工具库

| 目录                                | 内容                          | 包名                  |
| ----------------------------------- | ----------------------------- | --------------------- |
| [utils](./utils/)                   | 通用工具库                    | @stdex/utils          |
| [utils-frontend](./utils-frontend/) | 浏览器环境及 React 应用工具库 | @stdex/utils-frontend |
| [utils-node](./utils-node/)         | Node.js 脚本及后端服务工具库  | @stdex/utils-node     |

### 预设配置

| 目录                                        | 内容                         | 包名                      |
| ------------------------------------------- | ---------------------------- | ------------------------- |
| [presets-eslint](./presets-eslint/)         | ESLint 配置                  | @stdex/presets-eslint-xxx |
| [presets-prettier](./presets-prettier/)     | Prettier 配置                | @stdex/presets-prettier   |
| [presets-typescript](./presets-typescript/) | TypeScript 配置及工具脚本    | @stdex/presets-typescript |
| [create](./create/)                         | 项目模版，快速初始化各类项目 | @stdex/create             |
