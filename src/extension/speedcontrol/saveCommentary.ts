import { allCommentators, commentators, type Commentator } from '../../shared/replicants'
import { speedcontrolUtil } from './speedcontrol'

const runDataActiveRun = speedcontrolUtil.runDataActiveRun

function clone<T> (obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

runDataActiveRun.on('change', (run): void => {
  let newCommentators: Commentator[]
  if (run === undefined) {
    newCommentators = []
  } else {
    const runCommentators = allCommentators().value[run.id]
    if (runCommentators === undefined) {
      newCommentators = []
    } else {
      newCommentators = runCommentators
    }
  }

  commentators().value = clone(newCommentators)
})

commentators().on('change', (commentators: Commentator[]): void => {
  const run = runDataActiveRun.value
  if (run === undefined) {
    return
  }

  allCommentators().value[run.id] = clone(commentators)
})
