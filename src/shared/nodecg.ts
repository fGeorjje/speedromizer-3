import type NodeCG from '@nodecg/types'

type NodeCGAPI = NodeCG.ServerAPI | NodeCG.ClientAPI
let nodecg: NodeCGAPI
export const setServerNodeCG = (serverNodeCG: NodeCGAPI): void => {
  nodecg = serverNodeCG
}
export function getNodeCG<T extends NodeCGAPI> (): T {
  if (nodecg === undefined) nodecg = (window as any).nodecg
  if (nodecg === undefined) throw new Error()
  return nodecg as T
}
export type { NodeCG }
