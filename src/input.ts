import { window } from 'vscode'
import type { IUnit } from './kiana'
import { validateIdiom } from './utils'

const title = '>>成语接龙<<'
const presetIdioms = [
  '【原罪】小试牛刀',
  '【原罪】举一反三',
  '【苦痛】信手拈来',
  '【苦痛】游刃有余',
  '【红莲】仰望星空',
  '【红莲】脚踏实地',
]

export async function showQuickPick() {
  const result = await window.showQuickPick(presetIdioms, {
    title,
    placeHolder: '请选择成语，以开始游戏',
    ignoreFocusOut: true,
  })
  return result
}

export async function showInputBox(preUnit: IUnit) {
  const { value: idiom, right: key } = preUnit
  const result = await window.showInputBox({
    title,
    value: '',
    prompt: '[KIANA]',
    placeHolder: `${idiom}[${key}] >>> 请接招`,
    ignoreFocusOut: true,
    validateInput: (input: string) => {
      return validateIdiom(key, input) ? null : `请输入以【${key}】开头的四字成语`
    },
  })
  return result
}
