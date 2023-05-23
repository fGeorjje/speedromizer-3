import { getElementById } from '../../browser/browser'

export function setupRealWorldTimer (): void {
  setInterval(update, 1000)
}

function update (): void {
  const time = new Date().toString().substring(4, 24) + ' (EDT)'
  getElementById('realtime').innerHTML = time
}
