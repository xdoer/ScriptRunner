const { resolve } = require("path");

module.exports = {
  scripts: [
    {
      module: resolve(__dirname, "../cjs/index.js"),
      args: [1, 1, 1, 1],
    },
    {
      module: resolve(__dirname, "../es6/index.js"),
      type: "esm",
      args: [1, 1, 1, 1],
    },
    {
      module: resolve(__dirname, "../ts/index.ts"),
      type: "ts",
      args: [1, 1, 1, 1],
    },
  ],
};
