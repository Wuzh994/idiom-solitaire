import fs from 'fs'
import path from 'path'

export function getIdiomsList() {
  const targetPath = path.join(__dirname, '../resources/idioms.txt')
  const idioms = fs.readFileSync(targetPath, 'utf8').split('\n').map(i => i.trim()).filter(Boolean)
  return Array.from(new Set(idioms)).sort()
}

// TODO 校验成语
export function validateIdiom(key: string, text: string) {
  const reg = /^[\u4E00-\u9FA5]{4}$/g
  return text.startsWith(key) && reg.test(text)
}
