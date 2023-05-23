import { type Commentator, commentators } from '../../shared/replicants'
import { commentatorPlates as plates } from './plates'

export function setupCommentary (): void {
  commentators().on('change', update)
}

function update (commentators: Commentator[]): void {
  let size: string[]
  if (commentators.length === 0) {
    size = ['0px', '0px']
  } else if (commentators.length === 1) {
    size = ['100%', '100%']
  } else if (commentators.length === 2) {
    size = ['calc(50%)', '100%']
  } else {
    size = ['calc(50%)', 'calc(50%)']
  }

  plates.forEach((plate) => {
    plate.setName('')
    plate.setPronouns('')
    plate.setTwitch('')
    plate.element.style.display = 'none'
    plate.element.style.width = size[0]
    plate.element.style.height = size[1]
  })
  commentators.forEach((commentator, i) => {
    const plate = plates[commentator.index]
    plate.element.style.display = 'inherit'
    plate.setName(commentator.name)
    plate.setHost(commentator.host)
    plate.setPronouns(commentator.pronouns ?? '')
    plate.setTwitch(commentator.twitch ?? '')
  })
}
