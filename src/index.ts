import { Command, flags } from '@oclif/command'
import * as requireFromString from 'require-from-string'
import { resolve, isAbsolute } from 'path'
import { readFileSync } from 'fs'
import { transpile } from 'typescript'
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

  loadConfig(filePath?: string) {
    if (!filePath) return require(resolve(process.cwd(), 'scr.config.js'))

    if (isAbsolute(filePath)) return require(filePath)

    return require(resolve(process.cwd(), filePath))
  }

  runTs(script: Script) {
    const { module, args } = script
    const modulePath = require.resolve(module)
    const fileString = readFileSync(modulePath, { encoding: 'utf8' })
    const jsCodeString = transpile(fileString)
    requireFromString(jsCodeString).default(...args)
  }

  runCjs(script: Script) {
    const { module, args } = script
    require(module)(...args)
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

  runScripts(scripts: Script[] = []) {
    for (const script of scripts) {
      this.runScript(script)
    }
  }

  async run() {
    const { flags } = this.parse(ScriptRunner)

    const config: Config = this.loadConfig(flags.config)
    const { scripts = [] } = config || {}

    // run a script
    if (flags.run) {
      const module = flags.run
      const script = scripts.find((s, i) => (s.module === module) || (`${i + 1}` === module))
      if (!script) return this.error(`module ${module} not found`)
      return this.runScript(script)
    }

    // print all scripts
    if (flags.list) {
      return scripts.forEach((script, idx) => this.log(`${idx + 1} ${script.module}`))
    }

    // run all scripts
    this.runScripts(scripts)
  }
}

export = ScriptRunner
