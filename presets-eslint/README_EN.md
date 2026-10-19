# General ESLint Configurations

[简体中文](./README.md) | English

## Design Philosophy

### Keep Rules to a Minimum

Enable as few rules as possible. The goal is to **reduce bugs**, not to **enforce a coding style**.

## Separate Linting from Formatting

Following the approach described in [this article](https://typescript-eslint.io/linting/troubleshooting/formatting/), code-style rules are not enabled; formatting is handled by dedicated tools such as `Prettier`.  
By including `eslint-config-prettier`, ESLint's `Layout & Formatting` rules and equivalent rules from the TypeScript and React plugins are disabled. See the [complete list](https://github.com/prettier/eslint-config-prettier/blob/main/index.js).

---

## Packages

| Package                          | Use Case             |
| -------------------------------- | -------------------- |
| @stdex/presets-eslint-base       | Basic JavaScript     |
| @stdex/presets-eslint-typescript | TypeScript           |
| @stdex/presets-eslint-react      | React + TypeScript   |
| @stdex/presets-eslint-node       | Node.js + TypeScript |

---

## Usage

### Installation

```sh
pnpm add --save-dev eslint @stdex/presets-eslint-xxx
```

### Configuring ESLint

Create an `eslint.config.mjs` file. The following example is for a React project:

```js
import { defineConfig } from 'eslint/config'
import reactConfigs from '@stdex/presets-eslint-react'

export default defineConfig([
  ...reactConfigs,

  // Other configurations
])
```

To include only the configuration specific to a particular use case, import the corresponding package's `exclusive.mjs` file. The `exclusive.mjs` file does not include the basic JavaScript configuration, so you must import it separately.  
For example, in a JavaScript-only Node.js project, you can include only the Node.js configuration without any TypeScript configuration:

```js
import { defineConfig } from 'eslint/config'
import baseConfigs from '@stdex/presets-eslint-base'
import nodeConfigs from '@stdex/presets-eslint-node/exclusive.mjs'

export default defineConfig([...baseConfigs, ...nodeConfigs])
```

### Configuring VS Code

1. Install the `ESLint` extension for VS Code.

2. Update your VS Code settings (`Code` > `Preferences` > `Settings`):

```json
{
  "editor.tabSize": 2,
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,

  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
  "eslint.workingDirectories": [{ "mode": "auto" }]
}
```

#### About ESLint `workingDirectories`

Suppose the VS Code workspace has a directory structure like this:

```js
projects/     // /Users/me/office/projects/
  proj-1/
  proj-2/
  ...

library/      // /Users/me/library/
  lib-1/
  lib-2/
```

In other words, the workspace contains multiple independent top-level folders, each of which contains several projects.
When working on these projects (`proj-1`, `lib-1`, and so on), VS Code uses the top-level folder as ESLint's `workingDirectory` by default and attempts to load plugins and other dependencies from that folder. As a result, the dependencies cannot be found.
Setting `{ "mode": "auto" }` in the VS Code configuration resolves this issue. It instructs VS Code to use the directory containing `package.json` as the `workingDirectory`, allowing dependencies to be loaded correctly.

#### About the `eslint.validate` Setting

Previously, `eslint.validate` also had to be configured in VS Code, but it has since been replaced by `eslint.probe`.  
The default value of `eslint.probe` already meets these requirements, so no additional configuration is needed.

---

## Development Notes

### Updating ESLint Rules

Review the changelogs for ESLint and its plugins to determine which rule definitions need to be added, removed, or adjusted.
(Rule files only define rules whose settings differ from their defaults. For example, rules that are disabled by default and are not intended to be enabled are omitted.)
