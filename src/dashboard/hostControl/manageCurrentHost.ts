import { getElementById } from '../../browser/browser'
import { currentHost, commentators } from '../../shared/replicants'

void NodeCG.waitForReplicants(currentHost() as any, commentators() as any).then(() => {
  currentHost().on('change', replicantUpdate)
  commentators().on('change', replicantUpdate)
})

function replicantUpdate (): void {
  const current = currentHost().value
  getElementById('displayedHostName').innerHTML = current?.name ?? '?'
  getElementById('displayedHostPronouns').innerHTML = current?.pronouns ?? ''

  const next = commentators().value.find(c => c.host)
  getElementById<HTMLInputElement>('scheduledHostName').value = next?.name ?? '?'
  getElementById<HTMLInputElement>('scheduledHostPronouns').value = next?.pronouns ?? ''
}

getElementById<HTMLButtonElement>('update').onclick = () => {
  const name = getElementById<HTMLInputElement>('scheduledHostName').value
  const pronouns = getElementById<HTMLInputElement>('scheduledHostPronouns').value

  if (name === undefined) {
    currentHost().value = undefined
    return
  }

  currentHost().value = {
    name,
    pronouns: pronouns !== '' ? pronouns : undefined,
    twitch: undefined,
    host: true,
    index: -1
  }
}
