import OBSWebSocket, { type OBSWebSocketError } from 'obs-websocket-js'
import { sleep } from '../../shared/sleep'
import { obsRunning } from '../../shared/replicants'
import { ForwardingLogger } from '../../shared/logger'
import { handleOBSTransition as handleSpeedcontrol } from '../speedcontrol/handleRunAdvance'
import { handleOBSTransition as handleFoobar } from '../foobar/playerControl'

export const logger = new ForwardingLogger('obs')
const obs = new OBSWebSocket()
let fromScene: string = ''

obs.on('ConnectionClosed', (error) => {
  void onConnectionClosed(error)
})

async function onConnectionClosed (error: OBSWebSocketError): Promise<void> {
  obsRunning().value = false
  logger.error(`OBS connection closed: ${JSON.stringify(error)}`)
  await sleep(1000)
  await connect()
}

void connect()
async function connect (): Promise<void> {
  try {
    const { obsWebSocketVersion, negotiatedRpcVersion } = await obs.connect()
    obsRunning().value = true
    logger.info(`Connected to OBS websocket ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`)
    fromScene = (await obs.call('GetCurrentProgramScene')).currentProgramSceneName
  } catch (error) {
    logger.error('Failed to connect')
  }
}

obs.on('SceneTransitionStarted', () => {
  void onSceneTransitionStarted()
})

async function onSceneTransitionStarted (): Promise<void> {
  const delay = sleep(4000) // stinger length
  const toScene = (await obs.call('GetCurrentProgramScene')).currentProgramSceneName
  let transition: Transition
  const wasBreak = fromScene.includes('Break')
  const nowBreak = toScene.includes('Break')
  if (wasBreak && !nowBreak) {
    transition = Transition.TO_GAME
  } else if (!wasBreak && nowBreak) {
    transition = Transition.TO_INTERMISSION
  } else {
    return
  }

  fromScene = toScene

  void handleSpeedcontrol(transition, delay)
  void handleFoobar(transition, delay)
}

export enum Transition {
  TO_GAME,
  TO_INTERMISSION
}
