import { donationTotal } from '../../shared/replicants'
import { getElementById } from '../../browser/browser'
export function setupDonationTotal (): void {
  donationTotal().on('change', (total) => {
    const dollars = Math.floor(total)
    const cents = Math.floor((total - dollars) * 100)
    getElementById('donationDollars').innerHTML = `${dollars}`
    getElementById('donationCents').innerHTML = '.' + `${cents}`.padStart(2, '0')
  })
}
