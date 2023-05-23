import { commentators, type Commentator } from '../../shared/replicants'

const MAX_COMMENTATORS = 4
const inputsContainer = document.getElementById('commentaryInputs') as HTMLDivElement
function createInput (className: string, type: string = 'text'): HTMLInputElement {
  const input = document.createElement('input')
  input.type = type
  input.className = className
  inputsContainer.appendChild(input)
  return input
}

const names: HTMLInputElement[] = []
const pronouns: HTMLInputElement[] = []
const twitch: HTMLInputElement[] = []

for (let i = 0; i < MAX_COMMENTATORS; i++) {
  const input = document.createElement('span')
  input.innerHTML = i === 0 ? 'Host' : `Comm${i}`
  inputsContainer.appendChild(input)
  names.push(createInput('name'))
  pronouns.push(createInput('pronouns'))
  twitch.push(createInput('twitch'))
}

const updateButton = document.getElementById('update') as HTMLButtonElement
updateButton.onclick = () => {
  const getTextInput: ((e: HTMLInputElement) => string | undefined) =
    (e: HTMLInputElement) => e.value !== '' ? e.value : undefined

  const nameInputs = names.map(getTextInput)
  const pronounsInputs = pronouns.map(getTextInput)
  const twitchInputs = twitch.map(getTextInput)

  const values: Commentator[] = []
  for (let i = 0; i < MAX_COMMENTATORS; i++) {
    const name = nameInputs[i]
    if (name === undefined) continue
    values.push({
      name,
      pronouns: pronounsInputs[i],
      twitch: twitchInputs[i],
      host: i === 0,
      index: i
    })

    commentators().value = values
  }
}

commentators().on('change', (newVal) => {
  [...names, ...pronouns, ...twitch].forEach(e => {
    e.value = ''
  })
  newVal?.forEach((commentator) => {
    const i = commentator.index
    names[i].value = commentator.name
    pronouns[i].value = commentator.pronouns !== undefined ? commentator.pronouns : ''
    twitch[i].value = commentator.twitch !== undefined ? commentator.twitch : ''
  })
})
