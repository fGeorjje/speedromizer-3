import { type NodeCG } from './nodecg'
import { path, agent, id } from './browser'
import { type LogLevel, ForwardingLogger, type RemoteLogMessage } from '../shared/logger'

const defaultRemoteLevels: LogLevel[] = ['debug', 'info', 'warn', 'error']
let configLevelsRaw = nodecg.bundleConfig.remoteLoggingLevels as string[]
if (configLevelsRaw === undefined) {
  configLevelsRaw = defaultRemoteLevels
}

const configLevels = configLevelsRaw as LogLevel[]
export const remoteLogger: NodeCG.Logger = new (class extends ForwardingLogger {
  log (level: LogLevel, args: any[]): void {
    super.log(level, args)
    if (!configLevels.includes(level)) return
    const message: RemoteLogMessage = { level, path, agent, id, args }
    void nodecg.sendMessage('remoteLogMessage', message)
  }
})()

let erroring = false
window.onerror = (event, source?, lineno?, colno?, error?) => {
  if (erroring) { return }
  try {
    erroring = true
    remoteLogger.error(event, source, lineno, colno, error)
  } finally {
    erroring = false
  }
}
