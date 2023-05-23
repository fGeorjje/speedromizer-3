import fetch from 'node-fetch'
import { Transition } from '../obs/obs'
import { ForwardingLogger } from '../../shared/logger'
const logger = new ForwardingLogger('foobar-playerControl')

export async function handleOBSTransition (transition: Transition, delay: Promise<void>): Promise<void> {
  if (transition === Transition.TO_INTERMISSION) {
    // immediately play, pause so window title can be parsed. await delay, then unpause
    void post('http://localhost:8880/api/player/next')
    void post('http://localhost:8880/api/player/pause')
    await delay
    void post('http://localhost:8880/api/player/play')
  } else if (transition === Transition.TO_GAME) {
    await delay
    void post('http://localhost:8880/api/player/stop')
  }
}

async function post (url: string): Promise<void> {
  try {
    await fetch(url, { method: 'POST' })
  } catch (error) {
    logger.info(`POST to ${url} failed: `, error)
  }
}
