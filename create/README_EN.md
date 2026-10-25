# Project Templates

[简体中文](./README.md) | English

## Templates

| Directory   | Purpose         | Notes                                      |
| ----------- | --------------- | ------------------------------------------ |
| base        | Base template   | Configured with Prettier and ESLint        |
| service     | Backend service | TypeScript + starlight-server + Prisma ORM |
| site        | Frontend site   | TypeScript + React + Ant Design + Vite     |
| miniprogram | Mini program    | TypeScript + SCSS + gulp.js                |

---

## Usage

```shell
# This command runs `npm exec @stdex/create`, which executes the script specified by the `bin` field in this package's `package.json`.
npm init @stdex@latest {template} -- --name=xxx
```

- If `template` is omitted, the base template is used.
- If `name` is specified, a new directory with that name is created and the project is initialized inside it. Otherwise, the project is initialized in the current directory, which must be empty.

---

## Development Conventions

### Specifying Dependency Versions

Unless a specific version is required, set dependency versions in `package.json` to `latest`. They will be replaced with the actual version numbers when the project is initialized.

### Defining Variables

Place a `variables.json` file in the template root using the following format:

```json
[
  {
    "name": "VARIABLE_NAME", // Variable name
    "describe": "xxxx", // Variable description
    "defaults": "xxxx" // Default value; omitting this field makes the variable required
  },
  ...
]
```

You can then place placeholders in the form `{{VARIABLE_NAME}}` in any project file. During project initialization, they will be replaced with the actual variable values.

### Setup Script

You can create a `setup.js` file in the template root using the following format:

```js
// See the functions with the same names in create/src/index.js for details on using the functions in `context`.
export async function setup(context: { command, confirmPath, getDirectoryPath }) {
  // Do something
}
```

This function runs after the automatic project initialization process finishes. The script file is then deleted.

### Specifying .gitignore

Because installing an npm package automatically renames `.gitignore` to `.npmignore`, this file must be named `gitignore` (without the leading dot) in a template.
It is automatically renamed to `.gitignore` when the project is initialized.
