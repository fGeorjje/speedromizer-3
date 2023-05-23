// { level, path, agent, id, args }

import { nodecg } from './nodecg'
import { type RemoteLogMessage, ForwardingLogger } from '../shared/logger'

const logger = new ForwardingLogger('remote')
nodecg.listenFor('remoteLogMessage', (data) => {
  const message = data as RemoteLogMessage
  logger[message.level](...message.args, message.path, message.agent, message.id)
})
