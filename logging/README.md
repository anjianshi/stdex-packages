# 日志记录库

- 支持浏览器、Node.js 环境
- 可扩展性强（可继承子类或添加自定义 handler）
- 代码简洁，结构清晰

核心日志 API 从包的根入口导入；handler 使用独立的子路径入口：

```js
import { logger, LogLevel } from '@stdex/logging'
import { ConsoleHandler, FileHandler } from '@stdex/logging/handlers'
```
