import { type IMessageEvent, w3cwebsocket as WebSocket } from 'websocket'
import { ForwardingLogger } from '../shared/logger'
import { ardourMeters } from '../shared/replicants'
import { bundleConfig } from './nodecg'

const logger = new ForwardingLogger('ardour')
let ws: WebSocket | undefined
connect()
function connect (): void {
  ws = new WebSocket(bundleConfig.ardour.websocketURI)
  ws.onopen = function () {
    ardourMeters().value = {}
    logger.info('Connected to Ardour websocket interface')
  }

  ws.onmessage = function (e: IMessageEvent) {
    try {
      onMessage(e.data as string)
    } catch (e) {
      logger.error(e)
      ws?.close()
    }
  }

  ws.onclose = function (e) {
    ws = undefined
    logger.error('Socket is closed.', e.reason)
    logger.info('Reconnect will be attempted in 1 second.')
    setTimeout(function () {
      connect()
    }, 1000)
  }

  ws.onerror = function (err) {
    logger.error(err)
    ws?.close()
    ws = undefined
  }
}

function onMessage (data: string): void {
  const json = JSON.parse(data)
  const stripId: number = json.addr?.[0] // check if this is actually always the strip id?
  const existingStrip = Object.values(ardourMeters().value).find(meter => meter.id === stripId)
  const value: any = json.val?.[0]
  if (json.node === 'strip_description') {
    const stripName = json.val[0]
    ardourMeters().value[stripName] = {
      id: stripId,
      meter: -Infinity,
      muted: true
    }
  }

  if (existingStrip === undefined) {
    return
  }

  if (json.node === 'strip_meter') {
    existingStrip.meter = value
  }

  if (json.node === 'strip_mute') {
    existingStrip.muted = value
  }
}
