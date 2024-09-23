import path from 'node:path'
import { type CollectionEntry, type ContentEntryMap } from 'astro:content'
import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { uniq } from 'lodash-es'
import type { MaybePromise } from 'astro/actions/runtime/utils.js'
import { getFirstCommitTime, getLastCommitTime } from './git'
import { readMap } from './map'
import { getMarkdownFilePath } from './file'

export type ArticleTag = string | number

interface IImage {
  src: string
  width: number
  height: number
  format: 'png' | 'jpg' | 'jpeg' | 'tiff' | 'webp' | 'gif' | 'svg' | 'avif'
}

export interface IPostInfo {
  collection: string
  ctime: Date
  description?: string
  id: string
  isDraft: boolean
  link: string
  mtime: Date
  tags: ArticleTag[]
  title?: string
  cover?: IImage
  banner?: string
  reading: {
    words: number
    minutes: number
    text: string
    time: number
  }
}

const infoCache = new Map<string, IPostInfo>()

type Entry = MaybePromise<CollectionEntry<keyof ContentEntryMap>>
export async function getPostInfo(entry: Entry) {
  const _entry = await entry
  return readMap(infoCache, `${_entry.collection}+${_entry.slug}`, async () => {
    const filePath = getMarkdownFilePath(_entry.collection, _entry.id)
    const ctime = _entry.data.date ?? _entry.data.ctime ?? _entry.data.pubDate ?? await getFirstCommitTime(filePath)
    const mtime = _entry.data.mtime ?? _entry.data.updatedDate ?? await getLastCommitTime(filePath)
    const tags = uniq(_entry.data.tags ?? path.dirname(_entry.slug).split('/'))
    const title = _entry.data.title ?? path.basename(_entry.slug)
    const readingTime = getReadingTimeFromMarkdown(_entry.body)
    const cover = _entry.data.cover ?? _entry.data.heroImage
    return {
      collection: _entry.collection,
      ctime,
      description: _entry.data.description,
      id: _entry.id,
      isDraft: _entry.data.draft ?? false,
      link: `/${_entry.collection}/${_entry.slug}/`,
      mtime,
      tags,
      title,
      cover,
      reading: {
        words: readingTime.words,
        minutes: readingTime.minutes,
        text: readingTime.text,
        time: readingTime.time,
      },
    }
  })
}

export async function getAllPostsInfo(collection: MaybePromise<Entry[]>) {
  const entries = await Promise.resolve(collection)
  return Promise.all(entries.map(e => getPostInfo(e)))
}

export async function getSafePostsInfo(collection: MaybePromise<Entry[]>) {
  const posts = await getAllPostsInfo(collection)
  return posts.filter(p => !p.isDraft)
}

export function getReadingTimeFromMarkdown(text: string) {
  const tree = fromMarkdown(text)
  const textOnPage = toString(tree)
  return getReadingTime(textOnPage)
}

export function aggreateByTag(posts: IPostInfo[]) {
  const res = new Map<string, IPostInfo[]>()
  posts.forEach((p) => {
    p.tags.forEach((t) => {
      if (!res.has(t.toString())) {
        res.set(t.toString(), [])
      }
      res.get(t.toString())?.push(p)
    })
  })
  return res
}

export function getTagLink(tag: ArticleTag) {
  return `/archive/tag/${(tag)}`
}
