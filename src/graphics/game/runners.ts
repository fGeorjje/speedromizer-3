import { type RunDataActiveRun } from 'speedcontrol-util/types/speedcontrol'
import { speedcontrolUtil } from '../../browser/speedcontrol'
import { runnerPlates } from './plates'

export function setupRunners (): void {
  speedcontrolUtil.runDataActiveRun.on('change', update)
}

function update (run: RunDataActiveRun): void {
  const teams = (run?.teams ?? [])
  const players = teams.flatMap(team => team.players)
  runnerPlates.forEach((plate, index) => {
    const player = players[index]
    if (player === undefined) return
    plate.setName(player.name)
    plate.setPronouns(player.pronouns ?? '')
    plate.setTwitch(player.social.twitch ?? '')
    plate.setHost(false)
  })
}
