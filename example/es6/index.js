import { a } from "./test";

export default function (...args) {
  const sum = args.reduce((t, c) => (t = t + c), a);
  console.log(sum);
}
