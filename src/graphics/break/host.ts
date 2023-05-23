import { getElementById } from '../../browser/browser'
import { type Commentator, currentHost } from '../../shared/replicants'

export function setupHost (): void {
  currentHost().on('change', update)
}

function update (host: Commentator | undefined): void {
  getElementById('hostName').innerHTML = host?.name ?? ''
  getElementById('hostPronouns').innerHTML = host?.pronouns ?? ''
}
