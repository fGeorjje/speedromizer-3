import { flashingLights } from '../../shared/replicants'
import { getElementById } from '../../browser/browser'

const element = getElementById<HTMLInputElement>('flashingLights')
element.onchange = () => {
  flashingLights().value = element.checked
}
flashingLights().on('change', (checked) => {
  element.checked = checked
})
