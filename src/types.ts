export interface Script {
  module: string
  group?: number,
  args: any[]
  subProcess?: boolean
}

export interface Config {
  scripts: Script[]
}
