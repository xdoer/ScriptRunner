import { ChildProcess } from "child_process";

export interface Script {
  module: string
  group?: number,
  args: any[]
  process?(sub: ChildProcess): void
}

export interface Config {
  scripts: Script[]
}
