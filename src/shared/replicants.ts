import type NodeCG from '@nodecg/types'
import { getNodeCG } from './nodecg'
import { type AbstractReplicant } from '@nodecg/types/shared/replicants.shared'

/**
 * HACK: Cast any API instance to ServerAPI
 * [12:57 AM] Lange: it's a hack but it works
 * [12:57 AM] Lange: i wouldn't do it outside of this context
 * [12:57 AM] Lange: if you cast it in other places, you'll run into problems
 * https://discord.com/channels/754749209722486814/755576386579595394/1095120363744133250
 * Changed to ServerAPI so that replicant.value is always non-undefined
 */
const nodecg: NodeCG.ServerAPI = getNodeCG()

type Replicant<T> = AbstractReplicant<'server', T, NodeCG.Replicant.OptionsWithDefault<T>, false>
type LazyReplicant<T> = () => Replicant<T>

function replicant<T> (name: string, defaultValue: T): LazyReplicant<T> {
  let cached: Replicant<T> | undefined
  return () => {
    if (cached !== undefined) return cached
    cached = nodecg.Replicant<T>(name, { defaultValue })
    return cached
  }
}

export interface ArdourData {
  id: number
  meter: number
  muted: boolean
}
export const ardourMeters = replicant<Record<string, ArdourData>>('ardourMeters', {})

export interface NowPlaying {
  rawFoobarTitle: string
  title: string
  artist: string
}
export const nowPlaying = replicant<NowPlaying | undefined>('nowPlaying', undefined)
export const autoStreamStart = replicant<boolean>('autoStreamStart', false)
export const obsRunning = replicant<boolean>('obsRunning', false)

export const donationTotal = replicant<number>('donationTotal', 0)
export const polls = replicant<any[]>('polls', [])
export const challenges = replicant<any[]>('challenges', [])

export interface Commentator {
  name: string
  pronouns: string | undefined
  twitch: string | undefined
  host: boolean
  index: number
}
export const commentators = replicant<Commentator[]>('commentators', [])
export const allCommentators = replicant<Record<string, Commentator[]>>('allCommentators', {})
export const currentHost = replicant<Commentator | undefined>('currentHost', undefined)
export const cameras = replicant<boolean[]>('cameras', [])
export const flashingLights = replicant<boolean>('flashingLights', false)

export function setValueIfDifferent<T> (replicant: Replicant<T>, value: T): void {
  if (JSON.stringify(replicant.value) !== JSON.stringify(value)) {
    replicant.value = value
  }
}
