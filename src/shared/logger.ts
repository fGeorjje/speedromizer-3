import type NodeCG from '@nodecg/types'
import { getNodeCG } from './nodecg'

export class ForwardingLogger implements NodeCG.Logger {
  parent: NodeCG.Logger
  name: string
  constructor (name?: string, parent?: NodeCG.Logger) {
    this.parent = (parent !== undefined) ? parent : getNodeCG().log
    this.name = name ?? this.parent.name
  }

  log (level: LogLevel, args: any[]): void {
    if (this.name !== this.parent.name) { args = [`[${this.name}]`, ...args] }
    this.parent[level](...args)
  }

  trace = (...args: any[]): void => { this.log('trace', args) }
  debug = (...args: any[]): void => { this.log('debug', args) }
  info = (...args: any[]): void => { this.log('info', args) }
  warn = (...args: any[]): void => { this.log('warn', args) }
  error = (...args: any[]): void => { this.log('error', args) }
  replicants = (...args: any[]): void => { this.log('replicants', args) }
}

export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'replicants'
export interface RemoteLogMessage {
  level: LogLevel
  args: any[]
  path: string
  agent: string
  id: string
}
