type ModuleType = 'ts' | 'esm' | 'cjs'

export interface Script {
  module: string
  type?: ModuleType
  args: any[]
}

export interface Config {
  scripts: Script[]
  type?: ModuleType
}
