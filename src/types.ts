type ModuleType = 'ts' | 'esm' | 'cjs'

export interface Script {
  module: string
  group?: number,
  type?: ModuleType
  args: any[]
}

export interface Config {
  scripts: Script[]
}
