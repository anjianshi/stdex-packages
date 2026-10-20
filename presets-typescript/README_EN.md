# General TypeScript configuration and utility scripts

[简体中文](./README.md) | English

| File                                          | Use Case                                                                     |
| --------------------------------------------- | ---------------------------------------------------------------------------- |
| @stdex/presets-typescript/tsconfig-base.json  | Type-check with TypeScript and compile with another tool                     |
| @stdex/presets-typescript/tsconfig-build.json | Compile with tsc (for libraries and Node.js scripts, with ES6 module output) |
| @stdex/presets-typescript/tsconfig-vite.json  | Bundle with Vite                                                             |
| tsc-with-alias                                | Run tsc, tsc-alias, and nodemon together                                     |

## About TypeScript 7

TypeScript 7 is a major update. APIs that were previously exposed are no longer available, preventing `typescript-eslint` from supporting the new version of TypeScript.
(The TypeScript team expects to introduce new APIs in TypeScript 7.1.)
Although an official workaround is available (using TypeScript 7 for building and type-checking while using TypeScript 6 for ESLint), it adds considerable complexity to project configuration.
Therefore, this package will continue to use the older TypeScript 6 until the new APIs are released and `typescript-eslint` adds support for them.

## Usage

Install the dependencies:

```shell
pnpm add --save-dev @stdex/presets-typescript typescript
```

Create a `tsconfig.json` file in the project root and extend the configuration you need:

```json
{
  "extends": "./node_modules/@stdex/presets-typescript/tsconfig-build"
}
```

Notes:

1. When using `pnpm`, you must reference the `tsconfig` file with a relative path. Referencing it directly by package name will cause path resolution errors.
2. If you change the `include` setting in `tsconfig.json`, you may also need to update `compilerOptions.rootDir`.

## Configuring Path Aliases

Add the following to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Building with tsc

- First, add the `tsc-alias` dependency: `pnpm add --save-dev tsc-alias`.  
  Without `tsc-alias`, the build output retains the original aliased imports. It may even rewrite paths in type definitions that did not originally use aliases so that they do.
- Run the script provided by this package for a one-time build: `tsc-with-alias`
- Run a continuous watch build: `tsc-with-alias --watch`

To run another process such as `nodemon` alongside the build:

- First, add the dependency: `pnpm add --save-dev concurrently`
- Run during the build: `concurrently \"tsc-with-alias --watch\" && \"sleep xxx && nodemon xxx\"`.  
  Here, `sleep` is optional and allows time for the initial build to complete.

### Building with Vite

Add the same alias configuration from `tsconfig.json` to `resolve.alias` in `vite.config.js`.  
See <https://vitejs.dev/config/shared-options#resolve-alias> for details.

### Notes

Because `tsc-alias` reads the compiled files to replace aliased paths, the compiled file structure must match the source file structure.
For example, if `compilerOptions.rootDir` is not set in `tsconfig.json`, tsc may omit unnecessary parent directories when writing files to `outDir`. In other words, `src/a/b/c/index.js` might be emitted as `dist/index.js`.
In this situation, `tsc-alias` will not work correctly.

## Using tsc-with-alias

### Use Case 1: Building

`tsc-alias` must run after `tsc` finishes, and it accepts the same arguments as `tsc`.
This script lets you shorten `tsc xxx && tsc-alias xxx` to `tsc-with-alias xxx`, without having to manage execution order or repeat the arguments.

### Use Case 2: Watch Mode

When continuously watching and compiling code, `tsc` and `tsc-alias` need to run in parallel, and `tsc-alias` should start only after the initial `tsc` compilation finishes.
Running `tsc-with-alias xxx --watch` starts them in parallel while coordinating their startup order correctly.

### Use Case 3: Starting nodemon in Watch Mode

For backend service projects, you will usually want to start `nodemon` while continuously compiling the code so that the project runs or restarts automatically during development.
`nodemon` should also start only after the initial `tsc` compilation finishes.
Run `tsc-with-alias xxx --watch --nodemon=yyy` or `tsc-with-alias xxx --watch --nodemon` to start the processes in parallel while coordinating their startup order correctly.

In `--nodemon=yyy`, `yyy` represents the arguments passed to nodemon. To pass multiple arguments, use `--nodemon='aaa bbb ccc'`.
