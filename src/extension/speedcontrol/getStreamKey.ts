import { nodecg } from '../nodecg'
import { speedcontrolUtil } from './speedcontrol'
import { ForwardingLogger } from '../../shared/logger'
const logger = new ForwardingLogger('GetStreamKey')
const twitchAPIData = nodecg.Replicant('twitchAPIData', 'nodecg-speedcontrol')
twitchAPIData.on('change', (newVal: any, oldVal: any) => {
  if (newVal !== undefined && newVal.channelID !== oldVal?.channelID) {
    const channelID: string = newVal.channelID
    getStreamKey(channelID)
      .then(key => { logger.info(`Stream key for ${channelID} is ${key}`) })
      .catch(error => { logger.error(error) })
  }
})

async function getStreamKey (channelID: string): Promise<string> {
  const message = await speedcontrolUtil.sendMessage('twitchAPIRequest', {
    method: 'get',
    endpoint: `/streams/key?broadcaster_id=${channelID}`,
    data: {},
    newAPI: true
  })

  return message.body.data[0].stream_key
}
