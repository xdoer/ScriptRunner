import { Command, flags } from '@oclif/command'
import { resolve, isAbsolute } from 'path'
import { promises, constants } from 'fs'
import * as tsNode from 'ts-node'
import { Config, Script } from './types'

class ScriptRunner extends Command {
  static description = 'run script'

  static flags = {
    version: flags.version({ char: 'v' }),

    help: flags.help({ char: 'h' }),

    list: flags.boolean({ char: 'l', description: 'print scripts list' }),

    run: flags.string({ char: 'r', description: 'run a script' }),

    config: flags.string({ char: 'c', description: 'specify the configuration file address' }),
  }

  async parseConfigPath(paths: string[]) {
    for (const path of paths) {
      try {
        await promises.access(path, constants.F_OK)
        return path
      } catch { }
    }
    throw new Error('script-runner config file is not found')
  }

  async loadConfig(filePath?: string): Promise<Config> {
    let configPaths: string[] = []

    if (!filePath) {
      configPaths = ['js', 'ts'].map(ext => resolve(process.cwd(), `scr.config.${ext}`))
    } else {
      if (isAbsolute(filePath)) {
        configPaths.push(filePath)
      } else {
        configPaths.push(resolve(process.cwd(), filePath))
      }
    }

    const configPath = await this.parseConfigPath(configPaths)

    this.compileTsCode(configPath)

    const configModule = require(configPath)
    return configModule.default ?? configModule
  }

  compileTsCode(dir: string) {
    tsNode.register({ dir, skipProject: true, transpileOnly: true, compilerOptions: { allowJs: true } })
  }

  runTs(script: Script) {
    const { module, args } = script
    this.compileTsCode(require.resolve(module))
    return require(module).default(...args)
  }

  runCjs(script: Script) {
    const { module, args } = script
    const loaded = require(module)
    return typeof loaded.default === 'function' ? loaded.default(...args) : loaded(...args)
  }

  runScript(script: Script) {
    switch (script.type) {
      case 'ts':
      case 'esm':
        this.runTs(script)
        break
      default:
        this.runCjs(script)
    }
  }

  async run() {
    const { flags } = this.parse(ScriptRunner)

    const config: Config = await this.loadConfig(flags.config)
    const { scripts = [], type = 'cjs' } = config || {}

    // run a script
    if (flags.run) {
      const module = flags.run
      const script = scripts.find((s, i) => (s.module === module) || (`${i + 1}` === module))
      if (!script) return this.error(`module ${module} not found`)
      return this.runScript({ type, ...script })
    }

    // print all scripts
    if (flags.list) {
      return scripts.forEach((script, idx) => this.log(`${idx + 1} ${script.module}`))
    }

    // run all scripts
    for (const script of scripts) {
      this.runScript({ type, ...script })
    }
  }
}

export = ScriptRunner
