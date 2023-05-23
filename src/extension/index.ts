import { setServerNodeCG } from '../shared/nodecg'

export default (nodecg: any): void => {
  setServerNodeCG(nodecg)
  require('./loadExtension')
}
