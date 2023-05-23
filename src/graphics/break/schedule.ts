import { speedcontrolUtil } from '../../browser/speedcontrol'
import { getElementById } from '../../browser/browser'

const plateTemplate = getElementById<HTMLTemplateElement>('scheduleItemTemplate')
let nextScheduleId = 0
class ScheduleItem {
  element: HTMLElement
  constructor () {
    const container = getElementById('scheduleInner')
    const content = plateTemplate.content.cloneNode(true)
    container.appendChild(content)

    const element = container.lastElementChild
    if (element === null) throw new Error()
    this.element = element as HTMLElement

    const i = nextScheduleId++
    element.id = `${element.className}${i}`
  }

  set (selector: string, value: string): void {
    const element = this.element.querySelector(selector)
    if (element === null) throw new Error()
    const html = element as HTMLElement
    html.innerHTML = value
  }

  setVisible (visible: boolean): void {
    this.element.style.display = visible ? 'flex' : 'none'
  }
}

const runDataActiveRun = speedcontrolUtil.runDataActiveRun
const runDataArray = speedcontrolUtil.runDataArray
const scheduleItems = Array(5).fill(0).map(i => new ScheduleItem())
export function setupSchedule (): void {
  void NodeCG.waitForReplicants(runDataActiveRun as any, runDataArray as any).then(() => {
    runDataActiveRun.on('change', () => { update() })
    runDataArray.on('change', () => { update() })
  })
}

function update (): void {
  const run = runDataActiveRun.value
  const runs = runDataArray.value
  if (run === undefined || runs === undefined) throw new Error()
  const runIndex = runs.findIndex(_run => _run.id === run.id)
  if (runIndex === -1) throw new Error()
  scheduleItems.forEach(item => { item.setVisible(false) })
  let totalTimeElapsed = 0
  scheduleItems.forEach((item, scheduleIndex) => {
    const run = runs[runIndex + scheduleIndex]
    if (run === undefined) {
      item.setVisible(false)
      return
    }

    item.setVisible(true)
    item.set('.header', totalTimeElapsed === 0 ? 'Up Next' : formatTime(totalTimeElapsed))
    item.set('.game', run.game ?? '')
    item.set('.category', run.category ?? '')

    const players = run.teams.flatMap(t => t.players).map(p => p.name).join(', ')
    item.set('.players', players)

    totalTimeElapsed += (run.estimateS ?? 0)
    totalTimeElapsed += (run.setupTimeS ?? 0)
  })
}

function formatTime (seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  seconds -= hours * 3600
  const minutes = Math.floor(seconds / 60)

  const hoursString = hours !== 0 ? `${hours} hours${minutes !== 0 ? ', ' : ''}` : ''
  const minutesString = minutes !== 0 ? `${minutes} minutes` : ''
  return `In ${hoursString}${minutesString}`
}
