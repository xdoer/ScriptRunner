import { resolve } from "path";

export default {
  scripts: [
    {
      module: resolve(process.cwd(), "example/cjs/index.js"),
      args: [1, 1, 1, 1],
    },
    {
      module: resolve(process.cwd(), "example/es6/index.js"),
      type: "esm",
      args: [1, 1, 1, 1],
    },
    {
      module: resolve(process.cwd(), "example/ts/index.ts"),
      type: "ts",
      args: [1, 1, 1, 1],
    },
  ],
};
