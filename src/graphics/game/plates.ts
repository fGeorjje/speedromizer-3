import { getElementById } from '../../browser/browser'

const plateTemplate = getElementById<HTMLTemplateElement>('plate')
let nextPlateId = 0
class Plate {
  element: HTMLElement
  constructor (type: string) {
    const container = getElementById(`${type}PlatesContainer`)
    const content = plateTemplate.content.cloneNode(true)
    container.appendChild(content)

    const element = container.lastElementChild
    if (element === null) throw new Error()
    this.element = element as HTMLElement

    const i = nextPlateId++
    element.id = `${type}${i}`
    element.className = `plate ${type}`
    this.setTalkingOpacity(0)
    this.setHost(false)
  }

  query (selector: string): HTMLElement {
    const element = this.element.querySelector(selector)
    if (element === null) throw new Error()
    return element as HTMLElement
  }

  setName (name: string): void {
    this.query('.name').innerHTML = name
  }

  setPronouns (pronouns: string): void {
    this.query('.pronouns').innerHTML = pronouns
  }

  setTwitch (twitch: string): void {
    this.query('.twitch').innerHTML = twitch
  }

  setTalkingOpacity (opacity: number): void {
    this.query('.talking').style.opacity = `${opacity}`
  }

  setHost (host: boolean): void {
    this.query('.host').style.display = host ? 'initial' : 'none'
  }
}

export const runnerPlates = [0, 0].map(i => new Plate('runner'))
export const commentatorPlates = [0, 0, 0, 0].map(i => new Plate('commentator'))
