/* eslint @typescript-eslint/await-thenable: 0 */
import { nodecg } from './nodecg'
import { donationTotal, polls, challenges, setValueIfDifferent } from '../shared/replicants'
import { ForwardingLogger } from '../shared/logger'
import TiltifyClient from 'tiltify-api-client-v5'

const config = nodecg.bundleConfig.tiltify as any
const logger = new ForwardingLogger('tiltify')
const client = new TiltifyClient(config.clientId, config.clientSecret)
async function getCampaignId (): Promise<string> {
  const campaign = await client.Campaigns.getBySlug(...config.campaign.split('/'))
  console.log(campaign)
  return campaign.id
}
const campaignId = getCampaignId()

async function askTiltifyForDonationTotal (): Promise<void> {
  const id = await campaignId
  const result = await client.Campaigns.get(id)
  setValueIfDifferent(donationTotal(), parseFloat(result.amount_raised.value))
}

async function askTiltifyForPolls (): Promise<void> {
  const id = await campaignId
  const result = await client.Campaigns.getPolls(id)
  setValueIfDifferent(polls(), result)
}

async function askTiltifyForChallenges (): Promise<void> {
  const id = await campaignId
  const result = await client.Campaigns.getChallenges(id)
  setValueIfDifferent(challenges(), result)
}

function runInterval (func: (() => Promise<void>), interval: number): void {
  setTimeout(() => {
    func()
      .catch((error) => { logger.error(error) })
      .finally(() => {
        runInterval(func, interval)
      })
  }, interval)
}

runInterval(askTiltifyForDonationTotal, 1000)
runInterval(askTiltifyForChallenges, 5000)
runInterval(askTiltifyForPolls, 5000)
