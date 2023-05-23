import { type NowPlaying, nowPlaying } from '../../shared/replicants'
import { getElementById } from '../../browser/browser'
import textfit from '../textfit'

export function setupNowPlaying (): void {
  nowPlaying().on('change', update)
}

function update (np: NowPlaying | undefined): void {
  const element = getElementById('nowPlaying')
  if (np === undefined) {
    element.innerHTML = 'No song playing'
  } else {
    element.innerHTML = `${np.title} by ${np.artist}`
  }
  textfit(element, {
    alignHoriz: false,
    alignVert: true,
    multiLine: true
  })
}
