import { resolve } from "path";

export default {
  scripts: [
    {
      module: resolve(process.cwd(), "example/cjs/index.js"),
      group: "1",
      args: [1, 1, 1, 1],
    },
    {
      module: resolve(process.cwd(), "example/es6/index.js"),
      type: "esm",
      group: "1",
      args: [1, 1, 1, 2],
    },
    {
      module: resolve(process.cwd(), "example/ts/index.ts"),
      type: "ts",
      args: [1, 1, 1, 1],
    },
  ],
};
