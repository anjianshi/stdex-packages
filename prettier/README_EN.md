# Shared Prettier Configuration

[简体中文](./README.md) | English

## Usage

### 1. Install the dependency:

```shell
pnpm add --save-dev @stdex/presets-prettier
```

This package includes Prettier, so you do not need to install it separately.

### 2. Reference the configuration.

Add `"prettier": "@stdex/presets-prettier/prettierrc"` to `package.json`,  
or create a `.prettierrc.js` file in the project root:

```js
module.exports = '@stdex/presets-prettier/prettierrc'
```

## Configuring VS Code

1. Install the `Prettier` extension for VS Code.

2. Add the following to your VS Code settings:

```json
"editor.formatOnSave": true,

// Add other language types as needed.
// Alternatively, set it as the default formatter for all file types: { "editor.defaultFormatter": "esbenp.prettier-vscode" }
"[javascript][javascriptreact][typescript][typescriptreact][json][jsonc]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
```

3. You can also paste the following settings into your VS Code settings as a global configuration. This enables formatting in temporary projects as well:

```json
"prettier.printWidth": 100,
"prettier.semi": false,
"prettier.singleQuote": true,
"prettier.arrowParens": "avoid",
```

### Formatting WXML

We recommend installing the `WXML - Language Service` extension for VS Code to make editing WXML files easier.
Add `"minapp-vscode.wxmlFormatter": "prettier"` to your VS Code settings to use Prettier for formatting WXML code.
