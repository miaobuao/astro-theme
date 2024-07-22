import childProcess from 'node:child_process'
import process from 'node:process'
import lcid from 'lcid'

export function execSync(command: string, arguments_: string[]): string {
  return childProcess.execFileSync(command, arguments_, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim()
}

const defaultOptions = { spawn: true }
const defaultLocale = 'en-US'

function getStdOutSync(command: string, args) {
  return execSync(command, args)
}

function getEnvLocale(env = process.env) {
  return env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE
}

function parseLocale(string) {
  const env = {}
  for (const definition of string.split('\n')) {
    const [key, value] = definition.split('=')
    env[key] = value.replace(/^"|"$/g, '')
  }

  return getEnvLocale(env)
}

function getLocale(string) {
  return (string && string.replace(/[.:].*/, ''))
}

function getLocalesSync() {
  return getStdOutSync('locale', ['-a'])
}

function getSupportedLocale(locale, locales = '') {
  return locales.includes(locale) ? locale : defaultLocale
}

function getAppleLocaleSync() {
  return getSupportedLocale(
    getStdOutSync('defaults', ['read', '-globalDomain', 'AppleLocale']),
    getLocalesSync(),
  )
}

function getUnixLocaleSync() {
  return getLocale(parseLocale(getStdOutSync('locale', undefined)))
}

function getWinLocaleSync() {
  const stdout = getStdOutSync('wmic', ['os', 'get', 'locale'])
  const lcidCode = Number.parseInt(stdout.replace('Locale', ''), 16)
  return lcid.from(lcidCode)
}

function normalise(input) {
  return input.replace(/_/, '-')
}

const cache = new Map()

export function osLocaleSync(options = defaultOptions) {
  if (cache.has(options.spawn)) {
    return cache.get(options.spawn)
  }

  let locale
  try {
    const envLocale = getEnvLocale()

    if (envLocale || options.spawn === false) {
      locale = getLocale(envLocale)
    }
    else if (process.platform === 'win32') {
      locale = getWinLocaleSync()
    }
    else if (process.platform === 'darwin') {
      locale = getAppleLocaleSync()
    }
    else {
      locale = getUnixLocaleSync()
    }
  }
  catch {}

  const normalised = normalise(locale || defaultLocale)
  cache.set(options.spawn, normalised)
  return normalised
}
