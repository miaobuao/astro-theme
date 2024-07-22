import path from 'node:path'
import process from 'node:process'

const __dirname = path.resolve(process.cwd(), './src/utils')

export function getMarkdownFilePath(collection: string, id: string) {
  return path.resolve(__dirname, '../content', collection, id)
}

export function getTagsFromId(id: string) {
  return path.dirname(id).split('/').map(d => d.trim())
}
