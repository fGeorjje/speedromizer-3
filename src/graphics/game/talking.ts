import { ardourMeters, type ArdourData } from '../../shared/replicants'
import { commentatorPlates, runnerPlates } from './plates'

export function setupTalking (): void {
  ardourMeters().on('change', update)
}

const meterMap = {
  Mic1: runnerPlates[0],
  Mic2: runnerPlates[1],
  Host: commentatorPlates[0],
  Comm1: commentatorPlates[1],
  Comm2: commentatorPlates[2],
  Comm3: commentatorPlates[3]
}

function update (replicant: Record<string, ArdourData>): void {
  console.log(JSON.stringify(replicant))
  for (const [meterName, plate] of Object.entries(meterMap)) {
    const data = replicant[meterName]
    let meter: number
    if (data === undefined || data.muted) {
      meter = -Infinity
    } else {
      meter = data.meter
    }
    const BOTTOM = -45
    const TOP = -30
    const RANGE = TOP - BOTTOM
    let opacity = (meter - BOTTOM) / (RANGE)
    opacity = Math.min(opacity, 1)
    opacity = Math.max(opacity, 0)
    plate.setTalkingOpacity(opacity)
  }
}
