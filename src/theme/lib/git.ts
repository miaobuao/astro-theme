import { basename, dirname } from 'node:path'
import simpleGit, { type DefaultLogFields, type LogResult } from 'simple-git'

import { spawn } from 'cross-spawn'
import fs from 'fs-extra'
import { readMap } from './map'

const git = simpleGit()

const logsCache = new Map<string, LogResult<DefaultLogFields>>()
export async function getFileLog(filePath: string) {
  return readMap(logsCache, filePath, () => git.log({ file: filePath }))
}

const lastCommitDateCache = new Map<string, Date>()
export async function getLastCommitTime(filePath: string) {
  return readMap(lastCommitDateCache, filePath, async () => {
    const { latest } = await getFileLog(filePath)
    return latest?.date ? new Date(latest.date) : new Date()
  })
}

const firstCommitDateCache = new Map<string, Date>()
export async function getFirstCommitTime(filePath: string) {
  return readMap(firstCommitDateCache, filePath, async () => {
    const { all, total } = await getFileLog(filePath)
    const ctime = all[total - 1]?.date
    return ctime ? new Date(ctime) : new Date()
  })
}

const timestampCache = new Map<string, number>()
export function getGitTimestamp(file: string) {
  return readMap(timestampCache, file, () => {
    if (!fs.existsSync(file))
      return 0
    return new Promise<number>((resolve, reject) => {
      const child = spawn(
        'git',
        ['log', '-1', '--pretty="%ai"', basename(file)],
        { cwd: dirname(file) },
      )

      let output = ''
      child.stdout.on('data', d => (output += String(d)))

      child.on('close', () => {
        const timestamp = +new Date(output)
        timestampCache.set(file, timestamp)
        resolve(timestamp)
      })

      child.on('error', reject)
    })
  })
}
