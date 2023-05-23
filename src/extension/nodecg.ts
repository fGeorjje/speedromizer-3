import { type NodeCG, getNodeCG } from '../shared/nodecg'

export const nodecg = getNodeCG<NodeCG.ServerAPI>()
export const bundleConfig = nodecg.bundleConfig as any
export type { NodeCG }
