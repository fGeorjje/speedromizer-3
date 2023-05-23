import { spawn } from 'child_process'
import { executePowershellCommand } from '../powershell'
import { autoStreamStart, obsRunning } from '../../shared/replicants'
import { logger } from './obs'

void run()
async function run (): Promise<void> {
  const obsCurrentlyRunning = await executePowershellCommand(
    "if (Get-Process | Where-Object {$_.ProcessName -eq 'obs64'}) { Write-Output 'true'} else { Write-Output 'false' }"
  ) === 'true'

  logger.info('OBS Status: ', obsCurrentlyRunning)
  if (obsCurrentlyRunning) {
    obsRunning().value = true
    return
  }

  obsRunning().value = false

  const obsArgs = [
    '--collection "SRMZ3"',
    '--profile "SRMZ3"',
    '--scene "Break"',
    '--studio-mode',
    '--remote-debugging-port=9222',
    '--startvirtualcam'
  ]
  if (autoStreamStart().value) {
    obsArgs.push('--startstreaming')
  }
  spawn('obs64.exe', obsArgs, {
    cwd: 'C:/Program Files/obs-studio/bin/64bit',
    stdio: 'ignore',
    detached: true
  })
};
