import { speedcontrolUtil } from '../../browser/speedcontrol'
import { getElementById } from '../../browser/browser'
import { type RunDataActiveRun } from 'speedcontrol-util/types/speedcontrol'
import textfit from '../textfit'

const gameName = getElementById('gameName')
const category = getElementById('category')
const platformAndYear = getElementById('platformAndYear')
const estimate = getElementById('estimate')

export function setupGameInfo (): void {
  speedcontrolUtil.runDataActiveRun.on('change', update)
}

function update (run: RunDataActiveRun): void {
  gameName.innerText = run?.game ?? ''
  textfit(gameName, {
    alignHoriz: true,
    alignVert: true,
    multiLine: true
  })

  category.innerText = run?.category ?? ''
  platformAndYear.innerText = [run?.system, run?.release].filter(e => e !== undefined).join(', ')

  let seconds = run?.estimateS ?? 0
  const hours = Math.floor(seconds / 3600)
  seconds -= hours * 3600
  const minutes = Math.floor(seconds / 60)
  seconds -= minutes * 3600
  const hoursString = `${hours}`
  const minutesString = `${minutes}`.padStart(2, '0')
  estimate.innerText = `EST ${hoursString}h${minutesString}m`
}
