import { exec } from 'child_process'
import { ForwardingLogger } from '../shared/logger'
const logger = new ForwardingLogger('powershell_executor')

export async function executePowershellCommand (command: string): Promise<string | undefined> {
  if (command.includes('"')) {
    throw new Error('Command cannot contain double quotes')
  }

  const fixedCommand = command.split(/\r?\n/).join('')
  const cmdCommand = `cmd /d/s/c powershell.exe -command "${fixedCommand}"`
  const fixUnicodeCmd = `@chcp 65001 >nul & ${cmdCommand}`
  return await new Promise((resolve, reject) => {
    exec(fixUnicodeCmd, { shell: 'cmd.exe' }, (error, stdout, stderr) => {
      if (error != null) {
        logger.error(error, stderr, command)
        resolve(undefined)
      } else {
        resolve(stdout.trim())
      }
    })
  })
}
