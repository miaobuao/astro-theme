import { dirname, resolve } from 'node:path'
import process from 'node:process'

export function getMarkdownFilePath(collection: string, id: string) {
  return resolve(process.cwd(), 'src/content', collection, id)
}

export function getTagsFromId(id: string) {
  return dirname(id).split('/').map(d => d.trim())
}

export function getPublicFilePath(path: string) {
  if (path.startsWith('/')) {
    return resolve(process.cwd(), 'public', `.${path}`)
  }
  else {
    throw new Error('path must start with /')
  }
}

// export function getUrl(absPath: string) {
//   if(!isAbsolute(absPath)) {

//   }
//   // return relative()
// }
