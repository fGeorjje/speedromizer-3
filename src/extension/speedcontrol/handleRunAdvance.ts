import { speedcontrolUtil } from './speedcontrol'
import { Transition } from '../obs/obs'

export async function handleOBSTransition (transition: Transition, initialDelay: Promise<void>): Promise<void> {
  if (transition !== Transition.TO_INTERMISSION || speedcontrolUtil.timer.value.state !== 'finished') {
    return
  }

  await initialDelay
  void speedcontrolUtil.sendMessage('changeToNextRun')
}
