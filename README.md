# ScriptRunner

管理，解析和执行你的脚本

## 前言

当项目遇到大量重复性代码，我们会想到编写脚本完成重复性工作。

当项目越大，脚本数量也会越来越多，如何管理是难题，如何复用也是难题。

脚本复用，可以将一些定制化的数据通过函数传参传入，这也意味着，脚本需要导出一个函数。

如何管理？可以使用一个入口文件，在入口文件中引入并配置和执行所有的脚本，这样，启动项目时，先运行脚本入口文件即可。

上面介绍的流程有几个缺陷。

> - 全量执行。脚本导出函数，意味着脚本不能直接使用 node 执行，如果项目只需要执行脚本 A，那么只能执行入口脚本文件，此时所有脚本都会执行。
> - 脚本模块规范。所有脚本都只能使用同一种模块规范，才能在入口文件中进行引用。否则还需要借助三方工具进行代码转换

ScriptRunner 可以很好的解决上述问题。它是一款 CLI 工具，可以管理和执行 cjs, esm 和 ts 的代码，你可以用自己喜欢的语法编写脚本。它会根据注册的模块，批量或者单独的执行脚本，一切随你的喜好而来。

## 安装

```bash
npm i @xdoer/script-runner
```

## 使用

### 注册命令

当你全局安装时，命令会被全局注册，意味着你可以在任意地方运行 `scr` 命令。

当安装到项目中时，你可以直接在 shell 中运行

```bash
./node_modules/.bin/scr
```

你也可以将 scr 写到 package.json 的 script 中， 通过 `npm run scr` 来运行命令

```ts
script: {
  "scr": "scr"
}
```

### 配置文件

ScriptRunner 支持直接解析和执行 cjs、esm 和 ts 的脚本代码，配置文件同样支持 cjs，esm 与 ts。[示例请查看:example](example/README.md)

```js
module.exports = {
  scripts: [
    {
      module: "@prequest/response-types-generator",
      type: "cjs",
      args: [
        {
          data: [
            {
              path: "https://cnodejs.org/api/v1/topics",
            },
          ],
        },
      ],
    },
    {
      module: "@prequest/response-types-generator/es6/index.js",
      type: "esm",
      args: [
        {
          data: [
            {
              path: "https://cnodejs.org/api/v1/topics",
            },
          ],
        },
      ],
    },
    {
      module: "@prequest/response-types-generator/src/index.ts",
      type: "ts",
      args: [
        {
          data: [
            {
              path: "https://cnodejs.org/api/v1/topics",
            },
          ],
        },
      ],
    },
  ],
};
```

## 编写脚本规范

编写的脚本需要默认导出一个函数，ScriptRunner 会根据配置文件中配置的模块，查找脚本，并将配置的 `args` 参数传递到脚本中执行。这样的好处在于，我们的脚本可以根据传参，执行不同的逻辑，也为脚本发布 NPM 包，供他人使用提供了便利

## CLI 命令

> - `scr -v` 版本查看
> - `scr -h` 查看帮助
> - `scr -l` 查看配置的脚本
> - `scr -r 1` 或者 `scr -r index.js` 执行第一个脚本或者执行 module 为 index.js 的脚本
> - `scr -c /User/xdoer/a.js` 指定配置文件
