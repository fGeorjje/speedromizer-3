import { nowPlaying } from '../../shared/replicants'
import { executePowershellCommand } from '../powershell'

setInterval(() => {
  void checkFoobarTitle()
}, 250)

async function checkFoobarTitle (): Promise<void> {
  const stdout = await executePowershellCommand(
    "Get-Process | Where-Object {$_.Name -eq 'foobar2000'} | Select-Object MainWindowTitle | ConvertTo-Json"
  )

  if (stdout === undefined || stdout === '') {
    return
  }

  const rawFoobarTitle: string = JSON.parse(stdout.toString()).MainWindowTitle
  if (nowPlaying().value?.rawFoobarTitle === rawFoobarTitle) {
    return
  }

  try {
    const args = rawFoobarTitle.split('|||')
    const [artist, title] = args
    nowPlaying().value = { rawFoobarTitle, artist, title }
  } catch (error) {
    nowPlaying().value = undefined
  }
}
