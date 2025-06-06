import posts from '../../public/mds/posts.json'

export interface PostMeta {
  slug: string
  title: string
  summary: string
  date: string
}

export function getPosts(): PostMeta[] {
  return posts as PostMeta[]
}

export function getPost(slug: string): PostMeta | null {
  return (posts as PostMeta[]).find((p) => p.slug === slug) || null
}

import { parse } from 'path'

interface Post {
  slug: string
  title: string
  summary: string
  date: string
  html: string
}

// Load all markdown files under ../posts as raw strings
const files = import.meta.glob('../posts/*.md', { as: 'raw', eager: true }) as Record<string, string>

type FrontMatter = { [key: string]: string }

function parseFrontMatter(raw: string): { attributes: FrontMatter; body: string } {
  const fmMatch = /^---\n([\s\S]+?)\n---\n?/m.exec(raw)
  if (!fmMatch) return { attributes: {}, body: raw }
  const fmLines = fmMatch[1].split(/\n/)
  const attrs: FrontMatter = {}
  for (const line of fmLines) {
    const [key, ...rest] = line.split(':')
    attrs[key.trim()] = rest.join(':').trim()
  }
  const body = raw.slice(fmMatch[0].length)
  return { attributes: attrs, body }
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.*)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br/>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')
}

function buildPost(path: string, raw: string): Post {
  const slug = parse(path).name
  const { attributes, body } = parseFrontMatter(raw)
  return {
    slug,
    title: attributes.title || slug,
    summary: attributes.summary || '',
    date: attributes.date || '',
    html: markdownToHtml(body.trim()),
  }
}

const allPosts: Post[] = Object.entries(files).map(([path, raw]) => buildPost(path, raw))

export function getPosts() {
  return allPosts.map(({ slug, title, summary, date }) => ({ slug, title, summary, date }))
}

export function getPost(slug: string) {
  return allPosts.find((p) => p.slug === slug) || null
}
