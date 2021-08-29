# ScriptRunner

Parse and run your script.

## Install

```bash
npm i @xdoer/script-runner -D
```

## Usage

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
      module: "@prequest/response-types-generator/es6",
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
      module: "@prequest/response-types-generator/src",
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

run `scr` cmd.
