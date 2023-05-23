import { getElementById } from '../../browser/browser'
import { speedcontrolUtil } from '../../browser/speedcontrol'

for (let i = 60; i <= 180; i += 30) {
  getElementById<HTMLButtonElement>(`commercial${i}`).onclick = () => {
    void speedcontrolUtil.startTwitchCommercial(i)
  }
}

speedcontrolUtil.twitchCommercialTimer.on('change', (newVal) => {
  getElementById('commercialLeft').innerHTML = `Remaining: ${newVal?.secondsRemaining}`
})
