import { getElementById } from '../../browser/browser'
import { flashingLights } from '../../shared/replicants'

export function setupFlashingLights (): void {
  flashingLights().on('change', (lights) => {
    getElementById('warning').style.display = lights ? 'initial' : 'none'
  })
}
