import { type Timer } from 'speedcontrol-util/types/speedcontrol'
import { speedcontrolUtil } from '../../browser/speedcontrol'
import { getElementById } from '../../browser/browser'

export function setupTimer (): void {
  requestAnimationFrame(updateCanvas)
  speedcontrolUtil.timer.on('change', update)
}

function update (timer: Timer): void {
  lastTimer = timer
  lastUpdate = Date.now()
  getElementById('timerMain').innerHTML = timer.time
  const decis = Math.floor(timer.milliseconds / 100) % 10
  getElementById('timerSmall').innerHTML = `.${decis}`
}

const canvas = getElementById<HTMLCanvasElement>('timerCanvas')
const ctx = (() => {
  const ctx = canvas.getContext('2d')
  if (ctx === null) throw new Error()
  return ctx
})()

let lastTimer: Timer | undefined
let lastUpdate = Date.now()
function updateCanvas (): void {
  window.requestAnimationFrame(updateCanvas)
  if (lastTimer?.state === 'finished') {
    ctx.fillStyle = 'rgba(0,80,0,1)'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    return
  }

  if (lastTimer === undefined || lastTimer.state !== 'running') {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    return
  }

  const milliseconds = lastTimer.milliseconds + Date.now() - lastUpdate
  const ticks = Math.floor(milliseconds / 125)
  const binary = (ticks >>> 0).toString(2)
  const columns = binary.length
  const columnWidth = canvas.width / columns
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < columns; i++) {
    if (binary[i] === '0') {
      ctx.fillStyle = 'rgba(48,40,40,1)'
    } else {
      ctx.fillStyle = 'rgba(40,48,40,1)'
    }
    ctx.fillRect(i * columnWidth, 0, columnWidth, canvas.height)
  }
}
