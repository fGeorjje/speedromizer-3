import { cameras } from '../../shared/replicants'

const MAX_RUNNERS = 2
const elements: HTMLInputElement[] = []
for (let i = 0; i < MAX_RUNNERS; i++) {
  const input = document.createElement('input')
  input.type = 'checkbox'
  document.getElementById('cameraInputs')?.appendChild(input)
  input.onchange = () => {
    cameras().value = elements.map(e => e.checked)
  }
  elements.push(input)
}

cameras().on('change', (newVal) => {
  elements.forEach((e, index) => {
    if (newVal !== undefined) {
      e.checked = newVal[index]
    } else {
      e.checked = false
    }
  })
})
