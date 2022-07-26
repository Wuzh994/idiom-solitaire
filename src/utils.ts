import fs from 'fs'
import path from 'path'

let cache: string[] | null = null
export function getIdiomsList() {
  if (!cache) {
    const targetPath = path.join(__dirname, '../resources/idioms.txt')
    const idioms = fs.readFileSync(targetPath, 'utf8').split('\n').map(i => i.trim()).filter(Boolean)
    cache = Array.from(new Set(idioms)).sort()
  }
  return cache
}

export function validateIdiom(key: string, text: string) {
  const isIdiom = getIdiomsList().includes(text)
  return text.startsWith(key) && isIdiom
}
