import * as cp from 'child_process'
import { Script } from './types'

const processMap = new Map()

export default function runScript(script: Script) {
  const { module, args, subProcess } = script
  const loaded = require(module)
  const isExportDefaultFn = typeof loaded.default === 'function'

  if (!subProcess) return isExportDefaultFn ? loaded.default(...args) : loaded(...args)

  const exec = () => {
    const sub = cp.spawn('ts-node', ['-e', `require("${module}")${isExportDefaultFn ? '.default' : ''}(...${JSON.stringify(args)})`, '--skip-project'], {
      stdio: ['inherit', 'inherit', 'inherit']
    });
    processMap.set(module, sub)
    return sub
  }

  const prevProcess = processMap.get(module)
  if (!prevProcess) return exec()

  prevProcess.kill()
  prevProcess.on('close', exec)
}
