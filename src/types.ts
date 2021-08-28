export interface Script {
  module: string
  type: 'ts' | 'esm' | 'cjs',
  args: any[]
}

export interface Config {
  scripts: Script[]
}
