const { a } = require("./test");

module.exports = function (...args) {
  const sum = args.reduce((t, c) => (t = t + c), a);
  console.log(sum);
};
